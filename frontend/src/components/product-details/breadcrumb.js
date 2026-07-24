import React from "react";
import Link from "next/link";
import Home from "@svg/home";

const ProductDetailsBreadcrumb = ({ title }) => {
  return (
    <section className="breadcrumb__area breadcrumb__style-9 include-bg eminence-prd-breadcrumb">
      <div className="container">
        <div className="breadcrumb__content p-relative z-index-1">
          <nav className="breadcrumb__list has-icon" aria-label="Breadcrumb">
            <span className="breadcrumb-icon">
              <Home />
            </span>
            <span>
              <Link href="/">Home</Link>
            </span>
            <span className="dvdr" aria-hidden="true">
              <i className="fa-regular fa-angle-right"></i>
            </span>
            <span>
              <Link href="/shop">Shop</Link>
            </span>
            <span className="dvdr" aria-hidden="true">
              <i className="fa-regular fa-angle-right"></i>
            </span>
            <span className="eminence-prd-breadcrumb__current">{title}</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBreadcrumb;
