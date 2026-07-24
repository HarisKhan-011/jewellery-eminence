"use client";

import React, { useEffect, useRef, useState } from "react";
// internal
import SingleProduct from "./single-product";
import ErrorMessage from "@components/error-message/error";
import ProductLoader from "@components/loader/product-loader";
import { useGetShowingProductsQuery } from "src/redux/features/productApi";

const tabs = [
  { id: "top-rated", label: "Top Rated" },
  { id: "best-selling", label: "Best Selling" },
  { id: "latest-product", label: "Latest Products" },
];

const ShopProducts = () => {
  const { data: products, isError, isLoading } = useGetShowingProductsQuery();
  const [activeTab, setActiveTab] = useState("top-rated");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLabel =
    tabs.find((tab) => tab.id === activeTab)?.label || "Top Rated";

  const handleTabProduct = (value) => {
    setActiveTab(value);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  let content = null;

  if (isLoading) {
    content = <ProductLoader loading={isLoading} />;
  }

  if (!isLoading && isError) {
    content = <ErrorMessage message="There was an error" />;
  }

  if (!isLoading && !isError && products?.products?.length === 0) {
    content = <ErrorMessage message="No products found!" />;
  }

  if (!isLoading && !isError && products?.products?.length > 0) {
    const prd_items = products.products;
    const tabProducts = prd_items.filter((item) => item.itemInfo === activeTab);
    const show_prd =
      tabProducts.length >= 4
        ? tabProducts.slice(0, 4)
        : [
            ...tabProducts,
            ...prd_items.filter(
              (item) =>
                !tabProducts.some((selected) => selected._id === item._id)
            ),
          ].slice(0, 4);

    content = show_prd.map((product, index) => (
      <div
        key={product._id}
        className="col-6 col-md-4 col-lg-3 eminence-product-col"
      >
        <SingleProduct product={product} imageIndex={index} />
      </div>
    ));
  }

  return (
    <section className="product__popular-area pb-20">
      <div className="container">
        <div className="eminence-product-head">
          <div className="section__title-wrapper-13 eminence-product-head__title">
            <h3 className="section__title-13">Popular Products</h3>
          </div>

          <div className="product__tab tp-tab eminence-product-tabs">
            <div
              className="eminence-product-dropdown d-md-none"
              ref={dropdownRef}
            >
              <button
                type="button"
                className={`eminence-product-dropdown__trigger ${
                  menuOpen ? "is-open" : ""
                }`}
                aria-haspopup="listbox"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span>{activeLabel}</span>
                <span className="eminence-product-dropdown__chevron" aria-hidden="true" />
              </button>

              {menuOpen && (
                <ul
                  className="eminence-product-dropdown__menu"
                  role="listbox"
                  aria-label="Popular product filters"
                >
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <li key={tab.id} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          className={`eminence-product-dropdown__option ${
                            isActive ? "is-active" : ""
                          }`}
                          onClick={() => handleTabProduct(tab.id)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <ul
              className="nav nav-tabs eminence-product-tabs__list d-none d-md-flex"
              id="productTab"
              role="tablist"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <li
                    key={tab.id}
                    className="nav-item eminence-product-tabs__item"
                    role="presentation"
                  >
                    <button
                      className={`nav-link eminence-product-tabs__btn ${
                        isActive ? "active" : ""
                      }`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleTabProduct(tab.id)}
                    >
                      {tab.label === "Latest Products" ? "Latest" : tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="product__tab-wrapper">
          <div className="row g-2 g-sm-3 g-lg-4 eminence-product-grid">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopProducts;
