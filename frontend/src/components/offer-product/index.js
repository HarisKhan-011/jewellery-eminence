'use client';
import React, { useState } from "react";
import Link from "next/link";
// internal
import SingleCoupon from "./single-coupon";

const jewelleryDealCoupons = [
  {
    _id: "eminence-gold-floral-stud-earrings",
    title: "Gold Floral Stud Earrings Offer",
    logo: "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 10_45_44 PM.png",
    discountPercentage: 10,
    couponCode: "EARRING10",
    endTime: "2025-01-01T00:00:00.000Z",
    minimumAmount: 100,
    productType: "Eminence Jewellery earrings",
  },
  {
    _id: "eminence-diamond-tennis-bracelet",
    title: "Diamond Tennis Bracelet Offer",
    logo: "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_48 PM (1).png",
    discountPercentage: 15,
    couponCode: "DIAMOND15",
    endTime: "2025-01-01T00:00:00.000Z",
    minimumAmount: 150,
    productType: "Eminence Jewellery bracelets",
  },
  {
    _id: "eminence-gemstone-tennis-bracelets",
    title: "Gemstone Tennis Bracelets Deal",
    logo: "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_49 PM (2).png",
    discountPercentage: 12,
    couponCode: "GEM12",
    endTime: "2025-01-01T00:00:00.000Z",
    minimumAmount: 120,
    productType: "Eminence Jewellery bracelets",
  },
  {
    _id: "eminence-gold-chain-hand-bracelet",
    title: "Gold Chain Hand Bracelet Offer",
    logo: "/assets/img/eminence/products/anja.png",
    discountPercentage: 20,
    couponCode: "LUXURY20",
    endTime: "2025-01-01T00:00:00.000Z",
    minimumAmount: 200,
    productType: "Eminence Jewellery bracelets",
  },
];

const OfferPopularProduct = () => {
  const [copiedCode, setCopiedCode] = useState("");
  const [copied, setCopied] = useState(false);


  const handleCopied = (code) => {
    setCopiedCode(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 3000);
  };

  return (
    <section className="product__coupon-area porduct__offer pt-120">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6 col-md-6">
            <div className="section__title-wrapper-13 mb-35">
              <h3 className="section__title-13">Deal of The Day</h3>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="product__offer-btn mb-30 text-md-end">
              <Link href="/shop" className="tp-btn">
                View All Products
              </Link>
            </div>
          </div>
        </div>

        <div className="product__coupon-area pb-120">
          <div className="container">
            <div className="row">
              {jewelleryDealCoupons.map((coupon) => (
                <SingleCoupon
                  key={coupon._id}
                  coupon={coupon}
                  handleCopied={handleCopied}
                  copied={copied}
                  copiedCode={copiedCode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferPopularProduct;
