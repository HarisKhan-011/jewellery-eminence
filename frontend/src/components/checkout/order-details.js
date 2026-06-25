import React from "react";
// internal
import useCartInfo from "@hooks/use-cart-info";
import ErrorMessage from "@components/error-message/error";
import { convertToPkrAmount, formatPkrAmount } from "@utils/format-price";

const sameDayShippingCost = convertToPkrAmount(60);
const standardShippingCost = convertToPkrAmount(20);

const OrderDetails = ({
  register,
  errors,
  handleShippingCost,
  cartTotal,
  shippingCost,
  discountAmount,
}) => {
  const { total } = useCartInfo();

  return (
    <React.Fragment>
      <tr className="cart-subtotal">
        <th>Cart Subtotal</th>
        <td className="text-end">
          <span className="amount text-end">{formatPkrAmount(total)}</span>
        </td>
      </tr>
      <tr className="shipping">
        <th>Shipping</th>
        <td className="text-end">
          <ul>
            <li>
              <input
                {...register(`shippingOption`, {
                  required: `Shipping Option is required!`,
                })}
                id="flat_shipping"
                type="radio"
                name="shippingOption"
              />
              <label
                onClick={() => handleShippingCost(sameDayShippingCost)}
                htmlFor="flat_shipping"
              >
                <span className="amount">
                  Delivery: Today Cost: {formatPkrAmount(sameDayShippingCost)}
                </span>
              </label>
              <ErrorMessage message={errors?.shippingOption?.message} />
            </li>

            <li>
              <input
                {...register(`shippingOption`, {
                  required: `Shipping Option is required!`,
                })}
                id="free_shipping"
                type="radio"
                name="shippingOption"
              />
              <label
                onClick={() => handleShippingCost(standardShippingCost)}
                htmlFor="free_shipping"
              >
                Delivery: 7 Days Cost: {formatPkrAmount(standardShippingCost)}
              </label>
              <ErrorMessage message={errors?.shippingOption?.message} />
            </li>
          </ul>
        </td>
      </tr>

      <tr className="shipping">
        <th>Sub Total</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPkrAmount(total)}</span>
          </strong>
        </td>
      </tr>

      <tr className="shipping">
        <th>Shipping Cost</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPkrAmount(shippingCost)}</span>
          </strong>
        </td>
      </tr>

      <tr className="shipping">
        <th>Discount</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPkrAmount(discountAmount)}</span>
          </strong>
        </td>
      </tr>

      <tr className="order-total">
        <th>Total Order</th>
        <td className="text-end">
          <strong>
            <span className="amount">{formatPkrAmount(cartTotal)}</span>
          </strong>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default OrderDetails;
