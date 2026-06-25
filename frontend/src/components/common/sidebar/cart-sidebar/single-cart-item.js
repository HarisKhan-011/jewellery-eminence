import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { remove_product } from "src/redux/features/cartSlice";
import { formatPkrAmount, getDiscountedPkrPrice } from "@utils/format-price";
import { getProductImageAlt, getProductPrimaryImage } from "@utils/product-image";

const SingleCartItem = ({ item }) => {
  const { _id, originalPrice, title, orderQuantity, discount } =
    item || {};
  const dispatch = useDispatch();
  const primaryImage = getProductPrimaryImage(item);
  const unitPrice = getDiscountedPkrPrice(originalPrice, discount);

  // handle remove cart
  const handleRemoveProduct = (prd) => {
    dispatch(remove_product(prd));
  };
  return (
    <div className="cartmini__widget-item">
      {primaryImage && (
        <div className="cartmini__thumb">
          <Link href={`/product-details/${_id}`}>
            <Image
              src={primaryImage}
              alt={getProductImageAlt(item)}
              width={70}
              height={90}
              loading="lazy"
            />
          </Link>
        </div>
      )}
      <div className="cartmini__content">
        <h5>
          <a href={`/product-details/${_id}`}>{title}</a>
        </h5>
        <div className="cartmini__price-wrapper">
          <span className="cartmini__price">
            {formatPkrAmount(unitPrice * orderQuantity)}
          </span>
          <span className="cartmini__quantity">x{orderQuantity}</span>
        </div>
      </div>
      <button
        className="cartmini__del"
        onClick={() => handleRemoveProduct(item)}
      >
        <i className="fal fa-times"></i>
      </button>
    </div>
  );
};

export default SingleCartItem;
