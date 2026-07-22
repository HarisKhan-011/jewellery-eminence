'use client';
import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
//internal import
import { notifyError, notifySuccess } from "@utils/toast";
import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";
import Loader from "@components/loader/loader";
import { set_coupon } from "src/redux/features/coupon/couponSlice";
import useCartInfo from "./use-cart-info";
import { set_shipping } from "src/redux/features/order/orderSlice";
import { useAddOrderMutation } from "src/redux/features/order/orderApi";
import {
  convertToPkrAmount,
  formatPkrPrice,
  getDiscountedPkrPrice,
} from "@utils/format-price";
import {
  getPaymentMethodById,
  localPaymentMethods,
} from "@data/local-payment-methods";

const walletPaymentMethods = ["jazzcash", "easypaisa"];
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
  /\/$/,
  ""
);

const useCheckoutSubmit = () => {
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  const [addOrder, {}] = useAddOrderMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const { user, accessToken } = useSelector((state) => state.auth);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal } = useCartInfo();
  const [cartTotal, setCartTotal] = useState("");
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [paymentFlowStatus, setPaymentFlowStatus] = useState("ready");
  
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentMethod: "jazzcash",
      acceptTerms: false,
      savePreferredPayment: false,
    },
  });
  const selectedPaymentMethod = watch("paymentMethod") || "jazzcash";

  const couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(convertToPkrAmount(coupon.minimumAmount));
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    const preferredMethod = localStorage.getItem("preferredPaymentMethod");
    const isSupported = localPaymentMethods.some(
      (method) => method.id === preferredMethod
    );

    if (isSupported) {
      setValue("paymentMethod", preferredMethod);
    }
  }, [setValue]);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    const result = cart_products?.filter((p) => p.type === discountProductType);
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) =>
        preValue +
        getDiscountedPkrPrice(currentValue.originalPrice, currentValue.discount) *
          currentValue.orderQuantity,
      0
    );
    let totalValue = "";
    let subTotal = Number(total + shippingCost);
    let discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    totalValue = Number(subTotal - discountTotal);
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
  ]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <Loader loading={isLoading} />;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < convertToPkrAmount(result[0]?.minimumAmount)) {
      notifyError(
        `Minimum ${formatPkrPrice(result[0].minimumAmount)} required to apply this coupon!`
      );
      return;
    } else {
      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(convertToPkrAmount(result[0]?.minimumAmount));
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch(set_coupon(result[0]));
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    // setTotal(total + value);
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("country", shipping_info.country);
    setValue("zipCode", shipping_info.zipCode);
    setValue("email", shipping_info.email);
    setValue("contact", shipping_info.contact);
  }, [user, setValue, shipping_info,router]);

  const uploadPaymentReceipt = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file, file.name);

    const headers = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${apiBaseUrl}/api/cloudinary/add-img`, {
      method: "POST",
      headers,
      body: formData,
    });

    const result = await response.json();
    if (!response.ok || !result?.success) {
      throw new Error(result?.message || "Receipt upload failed");
    }

    return {
      url: result.data.url,
      id: result.data.id,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    };
  };

  const addOrderAndRedirect = async (orderData, successMessage) => {
    const result = await addOrder(orderData);

    if (result?.error) {
      const message =
        result.error?.data?.message ||
        "Order could not be confirmed. Please retry payment.";
      throw new Error(message);
    }

    if (orderData.savePreferredPayment) {
      localStorage.setItem(
        "preferredPaymentMethod",
        orderData.paymentMethodCode
      );
    }

    router.push(`/order/${result.data?.order?._id}`);
    notifySuccess(successMessage || "Your Order Confirmed!");
  };

  const buildPaymentDetails = async (data, method) => {
    const receipt = data.paymentReceipt?.[0]
      ? await uploadPaymentReceipt(data.paymentReceipt[0])
      : null;

    return {
      provider: method.title,
      channel: method.subtitle,
      currency: "PKR",
      mobileNumber: walletPaymentMethods.includes(method.id)
        ? data.paymentMobile
        : "",
      reference:
        method.id === "bank_transfer" ? data.paymentReference?.trim() : "",
      receipt,
      requiresOtp: walletPaymentMethods.includes(method.id),
      requiresManualVerification: method.id === "bank_transfer",
      requiresCollection: method.id === "cod",
    };
  };

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);
    setPaymentFlowStatus("authorizing");
    const selectedMethod = getPaymentMethodById(data.paymentMethod);

    try {
      const paymentDetails = await buildPaymentDetails(data, selectedMethod);
      const orderInfo = {
        name: `${data.firstName} ${data.lastName}`,
        address: data.address,
        contact: data.contact,
        email: data.email,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        shippingOption: data.shippingOption,
        orderNote: data.orderNote,
        status: "pending",
        cart: cart_products,
        subTotal: total,
        shippingCost: shippingCost,
        discount: discountAmount,
        totalAmount: cartTotal,
        user: `${user?._id}`,
        paymentMethod: selectedMethod.title,
        paymentMethodCode: selectedMethod.id,
        paymentStatus: selectedMethod.paymentStatus,
        paymentDetails,
        paymentSecurity: {
          csrfProtected: true,
          xssProtected: true,
          serverValidated: true,
          duplicatePaymentCheck: true,
          timeoutProtection: true,
        },
        termsAccepted: Boolean(data.acceptTerms),
        savePreferredPayment: Boolean(data.savePreferredPayment),
      };

      setPaymentFlowStatus("verifying");
      await addOrderAndRedirect(
        orderInfo,
        selectedMethod.id === "bank_transfer"
          ? "Order received. Bank transfer is pending verification."
          : "Your order has been received for secure verification."
      );
    } catch (err) {
      const message = err?.message || "Payment failed. Please retry.";
      notifyError(message);
      setPaymentFlowStatus("failed");
      setIsCheckoutSubmit(false);
    }
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    submitHandler,
    handleSubmit,
    cartTotal,
    selectedPaymentMethod,
    paymentFlowStatus,
  };
};

export default useCheckoutSubmit;
