import React from "react";
import { formatPkrAmount, getDiscountedPkrPrice } from "@utils/format-price";

const OrderSingleCartItem = ({ title, quantity, price, discount }) => {
  const unitPrice = getDiscountedPkrPrice(price, discount);

  return (
    <tr className="cart_item">
      <td className="product-name">
        {title} <strong className="product-quantity"> × {quantity}</strong>
      </td>
      <td className="product-total text-end">
        <span className="amount">{formatPkrAmount(unitPrice * quantity)}</span>
      </td>
    </tr>
  );
};

export default OrderSingleCartItem;
