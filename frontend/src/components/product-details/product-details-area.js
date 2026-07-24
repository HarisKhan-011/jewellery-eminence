"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
// internal
import { HeartTwo, CartTwo } from "@svg/index";
import { SocialShare } from "@components/social";
import ProductDetailsPrice from "./product-details-price";
import ProductQuantity from "./product-quantity";
import ProductDetailsCategories from "./product-details-categories";
import ProductDetailsTags from "./product-details-tags";
import { add_cart_product } from "src/redux/features/cartSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";
import {
  getProductCategoryName,
  getProductImageAlt,
  getProductImages,
  getProductPrimaryImage,
} from "@utils/product-image";

const ProductDetailsArea = ({ product }) => {
  const {
    _id,
    title,
    quantity,
    originalPrice,
    discount,
    tags,
    sku,
    description,
  } = product || {};
  const productImages = getProductImages(product);
  const primaryImage = getProductPrimaryImage(product);
  const categoryName = getProductCategoryName(product);
  const [activeImg, setActiveImg] = useState(primaryImage);

  useEffect(() => {
    setActiveImg(primaryImage);
  }, [primaryImage]);

  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const isWishlistAdded = wishlist.some((item) => item._id === _id);
  const inStock = Number(quantity) > 0;

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  const plainDescription =
    typeof description === "string"
      ? description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
      : "";
  const shortCopy =
    plainDescription.length > 0
      ? plainDescription.length > 180
        ? `${plainDescription.slice(0, 177).trim()}…`
        : plainDescription
      : "Shop Eminence Jewellery for refined pieces, secure checkout, and attentive care from selection to delivery.";

  return (
    <section className="product__details-area eminence-prd-details pb-115">
      <div className="container">
        <div className="row g-4 g-xl-5 align-items-start">
          <div className="col-xl-7 col-lg-6">
            <div className="product__details-thumb-tab eminence-prd-gallery">
              <div className="product__details-thumb-content w-img eminence-prd-gallery__main">
                {activeImg && (
                  <Image
                    src={activeImg}
                    alt={getProductImageAlt(product)}
                    width={960}
                    height={960}
                    priority
                    sizes="(max-width: 991px) 94vw, 52vw"
                    className="eminence-prd-gallery__image"
                  />
                )}
              </div>

              {productImages.length > 1 && (
                <div className="product__details-thumb-nav tp-tab eminence-prd-gallery__thumbs">
                  <nav aria-label="Product images">
                    <div className="eminence-prd-gallery__thumbs-track">
                      {productImages.map((img, i) => (
                        <button
                          key={`${img}-${i}`}
                          type="button"
                          onClick={() => setActiveImg(img)}
                          className={`eminence-prd-gallery__thumb ${
                            activeImg === img ? "is-active" : ""
                          }`}
                          aria-label={`View image ${i + 1}`}
                          aria-pressed={activeImg === img}
                        >
                          <Image
                            src={img}
                            alt={`${title} thumbnail ${i + 1}`}
                            width={96}
                            height={96}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </div>

          <div className="col-xl-5 col-lg-6">
            <div className="product__details-wrapper eminence-prd-info">
              <div className="eminence-prd-info__meta">
                {categoryName && (
                  <span className="eminence-prd-info__category">
                    {categoryName}
                  </span>
                )}
                <span
                  className={`product__details-stock eminence-prd-info__stock ${
                    inStock ? "is-in" : "is-out"
                  }`}
                >
                  {inStock ? `${quantity} In Stock` : "Out of Stock"}
                </span>
              </div>

              <h1 className="product__details-title eminence-prd-info__title">
                {title}
              </h1>

              <ProductDetailsPrice price={originalPrice} discount={discount} />

              <p className="eminence-prd-info__copy">{shortCopy}</p>

              <div className="eminence-prd-info__buy">
                <ProductQuantity />

                <div className="product__details-action eminence-prd-info__actions">
                  <button
                    onClick={() => handleAddProduct(product)}
                    type="button"
                    className="product-add-cart-btn product-add-cart-btn-3"
                    disabled={!inStock}
                  >
                    <CartTwo />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddWishlist(product)}
                    type="button"
                    className={`product-action-btn ${
                      isWishlistAdded ? "active" : ""
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <HeartTwo />
                    <span className="product-action-tooltip">
                      Add To Wishlist
                    </span>
                  </button>
                </div>
              </div>

              <div className="eminence-prd-info__facts">
                <div className="product__details-sku product__details-more">
                  <p>SKU</p>
                  <span>{sku || "—"}</span>
                </div>
                <ProductDetailsCategories name={categoryName} />
                <ProductDetailsTags tag={tags} />
              </div>

              <div className="product__details-share eminence-prd-info__share">
                <span>Share</span>
                <SocialShare />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsArea;
