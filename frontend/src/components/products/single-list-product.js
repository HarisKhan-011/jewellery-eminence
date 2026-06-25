import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import { CartTwo, Eye, HeartTwo } from "@svg/index";
import { ProductRating } from "./rating";
import { useDispatch, useSelector } from "react-redux";
import { add_cart_product, initialOrderQuantity } from "src/redux/features/cartSlice";
import { setProduct } from "src/redux/features/productSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";
import { formatPkrAmount, getDiscountedPkrPrice, getProductBasePrice } from "@utils/format-price";
import {
  getProductCategoryName,
  getProductImageAlt,
  getProductPrimaryImage,
  getProductRatingValue,
  getPublicProductImage,
} from "@utils/product-image";

const SingleListProduct = ({ product, imageIndex }) => {
  const { _id, title, discount } = product || {};
  // handle dispatch
  const dispatch = useDispatch();
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isWishlistAdded = wishlist.some((item) => item._id === _id);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const primaryImage = Number.isInteger(imageIndex)
    ? getPublicProductImage(imageIndex)
    : getProductPrimaryImage(product);
  const categoryName = getProductCategoryName(product);
  const rating = getProductRatingValue(product);
  const originalPrice = getProductBasePrice(product);
  const discountValue = Number(discount) || 0;
  const displayPrice = getDiscountedPkrPrice(originalPrice, discountValue);

  // handle quick view
  const handleQuickView = (prd) => {
    dispatch(initialOrderQuantity())
    dispatch(setProduct(prd))
  };

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <React.Fragment>
      <div className="product__list-item mb-30">
        <div className="row">
          <div className="col-xl-5 col-lg-5">
            <div className="product__thumb product__list-thumb p-relative fix m-img">
              <Link href={`/product-details/${_id}`}>
                {primaryImage && (
                  <Image
                    src={primaryImage}
                    alt={getProductImageAlt(product)}
                    width={335}
                    height={325}
                    sizes="(max-width: 991px) 100vw, 335px"
                    className="product-list-media__image"
                    loading="lazy"
                  />
                )}
              </Link>
              {discountValue > 0 && (
                <div className="product__badge d-flex flex-column flex-wrap">
                  <span className={`product__badge-item has-new`}>sale</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-7 col-lg-7">
            <div className="product__list-content">
              {categoryName && (
                <div className="product-card-meta mb-5">{categoryName}</div>
              )}
              <ProductRating rating={rating} className="product__rating-2" />

              <h3 className="product__list-title">
                <Link href={`/product-details/${_id}`}>{title}</Link>
              </h3>
              <div className="product__list-price">
                <span className="product__list-ammount">
                  {formatPkrAmount(displayPrice)}
                </span>
              </div>
              <p>
                Shop Eminence Jewellery for refined pieces, secure checkout,
                and complimentary care guidance with every order.
              </p>

              <div className="product__list-action d-flex flex-wrap align-items-center">
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className="product-add-cart-btn product-add-cart-btn-2"
                >
                  <CartTwo />
                  {isAddedToCart ? "Added" : "Add to Cart"}
                </button>
                <button
                  onClick={() => handleAddWishlist(product)}
                  type="button"
                  className={`product-action-btn product-action-btn-2 ${
                    isWishlistAdded ? "active" : ""
                  }`}
                >
                  <HeartTwo />
                  <span className="product-action-tooltip">
                    Add To Wishlist
                  </span>
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
                  <button
                    type="button"
                    className="product-action-btn product-action-btn-2"
                  >
                    <i className="fa-solid fa-link"></i>
                    <span className="product-action-tooltip">
                      Product Details
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleListProduct;
