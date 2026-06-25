import React from "react";
import { formatPkrAmount, formatPkrPrice, getDiscountedPkrPrice } from "@utils/format-price";

const ProductDetailsPrice = ({ price, discount }) => {
  const discountValue = Number(discount) || 0;
  const discountedPrice = getDiscountedPkrPrice(price, discountValue);

  return (
    <div className="product__details-price">
      {discountValue > 0 ? (
        <>
          <span className="product__details-ammount old-ammount">
            {formatPkrPrice(price)}
          </span>
          <span className="product__details-ammount new-ammount">
            {formatPkrAmount(discountedPrice)}
          </span>
          <span className="product__details-offer">-{discountValue}%</span>
        </>
      ) : (
        <>
          <span className="product__details-ammount new-ammount">
            {formatPkrPrice(price)}
          </span>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPrice;
