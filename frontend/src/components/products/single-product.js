import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// internal
import { CartTwo, Eye, HeartTwo } from "@svg/index";
import { ProductRating } from "./rating";
import OldNewPrice from "./old-new-price";
import { formatPkrPrice, getProductBasePrice } from "@utils/format-price";
import {
  getProductCategoryName,
  getProductHoverImage,
  getProductImageAlt,
  getProductPrimaryImage,
  getProductRatingValue,
  getPublicProductImage,
} from "@utils/product-image";
import {
  add_cart_product,
  initialOrderQuantity,
} from "src/redux/features/cartSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";
import { setProduct } from "src/redux/features/productSlice";

const SingleProduct = ({ product, discountPrd = false, imageIndex }) => {
  const { _id, title, discount } = product || {};
  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isWishlistAdded = wishlist.some(item => item._id === _id);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const primaryImage = Number.isInteger(imageIndex)
    ? getPublicProductImage(imageIndex)
    : getProductPrimaryImage(product);
  const hoverImage = getProductHoverImage(product);
  const categoryName = getProductCategoryName(product);
  const rating = getProductRatingValue(product);
  const originalPrice = getProductBasePrice(product);
  const discountValue = Number(discount) || 0;

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle quick view
  const handleQuickView = (prd) => {
    dispatch(initialOrderQuantity())
    dispatch(setProduct(prd))
  };

  return (
    <React.Fragment>
      <div className="product__item p-relative transition-3 mb-50">
        <div className="product__thumb w-img p-relative fix">
          <Link href={`/product-details/${_id}`}>
            <span className="product-card-media">
              {primaryImage && (
                <Image
                  src={primaryImage}
                  alt={getProductImageAlt(product)}
                  fill
                  sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, (max-width: 1199px) 33vw, 25vw"
                  className="product-card-media__image"
                  loading="lazy"
                />
              )}
              {hoverImage && (
                <Image
                  src={hoverImage}
                  alt={`${title} alternate view`}
                  fill
                  sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, (max-width: 1199px) 33vw, 25vw"
                  className="product-card-media__image product-card-media__image--hover"
                  loading="lazy"
                />
              )}
            </span>
          </Link>

          {discountValue > 0 && (
            <div className="product__badge d-flex flex-column flex-wrap">
              <span
                className={`product__badge-item ${
                  discountPrd ? "has-offer" : "has-new"
                }`}
              >
                {discountPrd ? `-${discountValue}%` : "sale"}
              </span>
              {!discountPrd && (
                <span className={`product__badge-item has-offer`}>
                  {`-${discountValue}%`}
                </span>
              )}
            </div>
          )}

          <div className="product__action d-flex flex-column flex-wrap">
            <button
              type="button"
              className={`product-action-btn ${isWishlistAdded?"active":""}`}
              onClick={() => handleAddWishlist(product)}
            >
              <HeartTwo />
              <span className="product-action-tooltip">Add To Wishlist</span>
            </button>
            <button
              onClick={() => handleQuickView(product)}
              type="button"
              className="product-action-btn"
            >
              <Eye />
              <span className="product-action-tooltip">Quick view</span>
            </button>
            <Link href={`/product-details/${_id}`}>
            <button type="button" className="product-action-btn">
               <i className="fa-solid fa-link"></i>
              <span className="product-action-tooltip">Product Details</span>
            </button>
            </Link>
          </div>
          <div className="product__add transition-3">
            {isAddedToCart ? (
              <Link
                href="/cart"
                type="button"
                className="product-add-cart-btn w-100"
              >
                <CartTwo />
                View Cart
              </Link>
            ) : (
              <button
                onClick={() => handleAddProduct(product)}
                type="button"
                className="product-add-cart-btn w-100"
              >
                <CartTwo />
                Add to Cart
              </button>
            )}
          </div>
        </div>
        <div className="product__content">
          {categoryName && (
            <div className="product-card-meta">{categoryName}</div>
          )}
          <ProductRating rating={rating} className="product-card-rating" />
          <h3 className="product__title">
            <Link href={`/product-details/${_id}`}>{title}</Link>
          </h3>
          {discountValue <= 0 && (
            <div className="product__price">
              <span className="product__ammount">
                {formatPkrPrice(originalPrice)}
              </span>
            </div>
          )}
          {discountValue > 0 && (
            <OldNewPrice originalPrice={originalPrice} discount={discountValue} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
