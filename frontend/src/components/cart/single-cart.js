import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
// internal
import {Minus,Plus} from "@svg/index";
import { add_cart_product, quantityDecrement, remove_product } from "src/redux/features/cartSlice";
import { formatPkrAmount, getDiscountedPkrPrice } from "@utils/format-price";
import { getProductImageAlt, getProductPrimaryImage } from "@utils/product-image";

const SingleCartItem = ({item}) => {
  const {_id,title,originalPrice,orderQuantity=0, discount} = item || {};
  const dispatch = useDispatch()
  const primaryImage = getProductPrimaryImage(item);
  const unitPrice = getDiscountedPkrPrice(originalPrice, discount);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd))
  }

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd))
  }

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd))
  }

  // handleChange
  const handleChange = (e) => {}
  return (
    <tr>
      <td className="product-thumbnail">
        <Link href={`/product-details/${_id}`}>
          {primaryImage && (
            <Image
              src={primaryImage}
              alt={getProductImageAlt(item)}
              width={125}
              height={125}
              loading="lazy"
            />
          )}
        </Link>
      </td>
      <td className="product-name">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>
      <td className="product-price">
        <span className="amount">{formatPkrAmount(unitPrice)}</span>
      </td>
      <td className="product-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span className="tp-cart-minus" onClick={()=> handleDecrement(item)}>
            <Minus/>
          </span>
          <input className="tp-cart-input" type="text" value={orderQuantity} onChange={handleChange} />
          <span className="tp-cart-plus" onClick={()=> handleAddProduct(item)}>
            <Plus/>
          </span>
        </div>
      </td>
      <td className="product-subtotal">
        <span className="amount">
          {formatPkrAmount(unitPrice * orderQuantity)}
        </span>
      </td>
      <td className="product-remove">
        <button type="submit" onClick={()=> handleRemovePrd(item)}>
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
};

export default SingleCartItem;
