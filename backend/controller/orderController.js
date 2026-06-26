const { secret } = require("../config/secret");
const stripe = require("stripe")(secret.stripe_key);
const Order = require("../models/Order");
const Product = require("../models/Product");

const allowedPaymentMethods = {
  jazzcash: {
    label: "JazzCash",
    statuses: ["awaiting_gateway_authorization", "paid", "failed", "refunded"],
    initialStatus: "awaiting_gateway_authorization",
  },
  easypaisa: {
    label: "Easypaisa",
    statuses: ["awaiting_gateway_authorization", "paid", "failed", "refunded"],
    initialStatus: "awaiting_gateway_authorization",
  },
  bank_transfer: {
    label: "Bank Transfer",
    statuses: ["awaiting_manual_verification", "paid", "failed", "refunded"],
    initialStatus: "awaiting_manual_verification",
  },
  cards: {
    label: "Debit / Credit Cards",
    statuses: ["paid", "failed", "refunded"],
    initialStatus: "paid",
  },
  cod: {
    label: "Cash on Delivery",
    statuses: ["pending_collection", "paid", "failed"],
    initialStatus: "pending_collection",
  },
};

const createHttpError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toNumber = (value = 0) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const toSafeText = (value = "") =>
  String(value || "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 1000);

const getDiscountedPrice = (price = 0, discount = 0) => {
  const amount = toNumber(price);
  const discountAmount = toNumber(discount);
  return amount - (amount * discountAmount) / 100;
};

const getProductMap = async (cart = []) => {
  const productIds = cart
    .map((item) => item?._id)
    .filter((id) => id && /^[a-f\d]{24}$/i.test(String(id)));

  if (!productIds.length) return new Map();

  const products = await Product.find({ _id: { $in: productIds } })
    .select("originalPrice price discount quantity")
    .lean();

  return new Map(products.map((product) => [String(product._id), product]));
};

const calculateServerSubtotal = async (cart = []) => {
  const productMap = await getProductMap(cart);

  return Math.round(
    cart.reduce((subtotal, item) => {
      const product = productMap.get(String(item?._id));
      const quantity = Math.max(1, Math.trunc(toNumber(item?.orderQuantity)));

      if (product && product.quantity < quantity) {
        throw createHttpError("Requested quantity is no longer available.", 409);
      }

      const basePrice = product
        ? product.originalPrice ?? product.price
        : item?.originalPrice ?? item?.price;
      const discount = product ? product.discount : item?.discount;

      return subtotal + getDiscountedPrice(basePrice, discount) * quantity;
    }, 0)
  );
};

const validateOrderPayload = async (orderItems) => {
  if (!orderItems?.termsAccepted) {
    throw createHttpError("Terms and secure payment policy must be accepted.");
  }

  if (!Array.isArray(orderItems.cart) || orderItems.cart.length === 0) {
    throw createHttpError("Cart is empty.");
  }

  const paymentMethodCode = orderItems.paymentMethodCode;
  const method = allowedPaymentMethods[paymentMethodCode];
  if (!method) {
    throw createHttpError("Unsupported payment method.");
  }

  const paymentDetails = orderItems.paymentDetails || {};

  if (
    ["jazzcash", "easypaisa"].includes(paymentMethodCode) &&
    !/^03\d{9}$/.test(String(paymentDetails.mobileNumber || ""))
  ) {
    throw createHttpError("A valid mobile wallet number is required.");
  }

  if (paymentMethodCode === "bank_transfer") {
    if (!toSafeText(paymentDetails.reference)) {
      throw createHttpError("Bank transaction reference is required.");
    }

    if (!paymentDetails.receipt?.url) {
      throw createHttpError("Bank transfer receipt is required.");
    }
  }

  if (paymentMethodCode === "cards") {
    if (orderItems.paymentIntent?.status !== "succeeded") {
      throw createHttpError("Card payment was not verified by the gateway.");
    }
  }

  const requestedPaymentStatus =
    paymentMethodCode === "cards"
      ? "paid"
      : orderItems.paymentStatus || method.initialStatus;

  if (!method.statuses.includes(requestedPaymentStatus)) {
    throw createHttpError("Unsupported payment status for this method.");
  }

  const expectedSubtotal = await calculateServerSubtotal(orderItems.cart);
  const shippingCost = Math.max(0, Math.round(toNumber(orderItems.shippingCost)));
  const discount = Math.max(0, Math.round(toNumber(orderItems.discount)));
  const expectedTotal = Math.max(0, expectedSubtotal + shippingCost - discount);

  if (Math.abs(expectedSubtotal - Math.round(toNumber(orderItems.subTotal))) > 2) {
    throw createHttpError("Order subtotal verification failed.");
  }

  if (Math.abs(expectedTotal - Math.round(toNumber(orderItems.totalAmount))) > 2) {
    throw createHttpError("Order total verification failed.");
  }

  const duplicateReference =
    orderItems.paymentIntent?.id || toSafeText(paymentDetails.reference);

  if (duplicateReference) {
    const existingPayment = await Order.findOne({
      paymentMethodCode,
      $or: [
        { "paymentIntent.id": duplicateReference },
        { "paymentDetails.reference": duplicateReference },
      ],
    }).select("_id invoice");

    if (existingPayment) {
      throw createHttpError("Duplicate payment reference detected.", 409);
    }
  }

  return {
    paymentMethod: method.label,
    paymentStatus: requestedPaymentStatus,
    subTotal: expectedSubtotal,
    shippingCost,
    discount,
    totalAmount: expectedTotal,
    orderNote: toSafeText(orderItems.orderNote),
    paymentDetails: {
      ...paymentDetails,
      reference: toSafeText(paymentDetails.reference),
    },
    paymentSecurity: {
      ...orderItems.paymentSecurity,
      serverValidated: true,
      duplicatePaymentCheck: true,
      signatureVerified: paymentMethodCode === "cards",
      transactionLoggedAt: new Date().toISOString(),
    },
  };
};

// create-payment-intent
module.exports.paymentIntent = async (req, res) => {
  try {
    const product = req.body;
    const price = Number(product.price);
    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).send({
        success: false,
        message: "A valid payment amount is required.",
      });
    }

    const amount = price * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "pkr",
      amount: amount,
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to initialize payment intent.",
    });
  }
};
module.exports.addOrder = async (req, res) => {
  try {
    const orderItems = req.body;
    const normalizedOrder = await validateOrderPayload(orderItems);
    const newOrders = new Order({
      ...orderItems,
      ...normalizedOrder,
    });
    const order = await newOrders.save();

    res.status(200).send({
      success: true,
      message: "Order added successfully",
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).send({
      success: false,
      message: error.message || "Order could not be created.",
    });
  }
};

// get Orders
exports.getSingleOrder = async (req, res, next) => {
  try {
    const orderItem = await Order.findById(req.params.id).populate('user');
    res.status(200).json(orderItem);
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};
// updateOrderStatus
exports.updateOrderStatus = async (req, res) => {
  const newStatus = req.body.status;
  console.log('newStatus',newStatus)
  try {
    await Order.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: newStatus,
        },
      }, { new: true })
    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
    });
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};

// get Orders
exports.getOrders = async (req, res, next) => {
  try {
    const orderItems = await Order.find({}).sort({ createdAt: -1 }).populate('user');
    res.status(200).json({
      success: true,
      data: orderItems,
    });
  }
  catch (error) {
    console.log(error);
    next(error)
  }
};

exports.updatePaymentStatus = async (req, res) => {
  const newStatus = req.body.paymentStatus;
  const allowedStatuses = [
    "authorizing",
    "awaiting_gateway_authorization",
    "awaiting_manual_verification",
    "pending_collection",
    "paid",
    "failed",
    "refunded",
  ];

  if (!allowedStatuses.includes(newStatus)) {
    return res.status(400).json({
      success: false,
      message: "Unsupported payment status",
    });
  }

  try {
    await Order.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          paymentStatus: newStatus,
          "paymentSecurity.paymentStatusUpdatedAt": new Date().toISOString(),
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Payment status update failed",
    });
  }
};
