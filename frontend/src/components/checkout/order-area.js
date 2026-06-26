import React from "react";
import { useSelector } from "react-redux";
// internal
import OrderDetails from "./order-details";
import LocalPaymentMethods from "./local-payment-methods";
import OrderSingleCartItem from "./order-single-cart-item";

const OrderArea = ({
  stripe,
  cardError,
  register,
  errors,
  discountAmount,
  shippingCost,
  cartTotal,
  handleShippingCost,
  setClientSecret,
  isCheckoutSubmit,
  selectedPaymentMethod,
  paymentFlowStatus,
}) => {
  const { cart_products } = useSelector((state) => state.cart);
  return (
    <div className="your-order mb-30 ">
      <h3>Your order</h3>
      <div className="your-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-total text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart_products?.map((item, i) => (
              <OrderSingleCartItem
                key={i}
                title={item.title}
                quantity={item.orderQuantity}
                price={item.originalPrice}
                discount={item.discount}
              />
            ))}
          </tbody>
          <tfoot>
            <OrderDetails
              register={register}
              errors={errors}
              discountAmount={discountAmount}
              cartTotal={cartTotal}
              shippingCost={shippingCost}
              handleShippingCost={handleShippingCost}
              setClientSecret={setClientSecret}
            />
          </tfoot>
        </table>
      </div>

      <LocalPaymentMethods
        register={register}
        errors={errors}
        selectedPaymentMethod={selectedPaymentMethod}
        cardError={cardError}
        stripe={stripe}
        cart_products={cart_products}
        isCheckoutSubmit={isCheckoutSubmit}
        paymentFlowStatus={paymentFlowStatus}
      />
    </div>
  );
};

export default OrderArea;
