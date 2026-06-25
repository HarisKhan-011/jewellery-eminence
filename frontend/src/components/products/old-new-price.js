import React from "react";
import { formatPkrAmount, formatPkrPrice, getDiscountedPkrPrice } from "@utils/format-price";

const OldNewPrice = ({originalPrice,discount}) => {
  const discountedPrice = getDiscountedPkrPrice(originalPrice, discount);

  return (
    <div className="product__price">
      <del className="product__ammount old-price">
        {formatPkrPrice(originalPrice)}
      </del>
      <span className="product__ammount new-price">
        {" "}
        {formatPkrAmount(discountedPrice)}
      </span>
    </div>
  );
};

export default OldNewPrice;
