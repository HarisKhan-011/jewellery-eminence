import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const PaymentCardElement = ({ cardError }) => {
  return (
    <div className="eminence-card-gateway">
      <label>Card details</label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && (
        <p className="mt-15" style={{ color: "#b42318" }}>
          {cardError}
        </p>
      )}
    </div>
  );
};

export default PaymentCardElement;
