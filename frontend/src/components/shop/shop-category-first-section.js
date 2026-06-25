import Link from "next/link";
import React from "react";
import { Home } from "@svg/index";
import {
  jewelleryCategories,
  shopTopCategorySlugs,
} from "src/data/jewellery-categories";

const shopTopCategories = [
  {
    title: "All",
    slug: "",
    href: "/shop",
  },
  ...shopTopCategorySlugs.map((slug) => {
    const category = jewelleryCategories.find((item) => item.slug === slug);
    return {
      ...category,
      href: `/shop?category=${category.slug}`,
    };
  }),
];

const ShopCategoryFirstSection = ({ activeCategory, isAllActive }) => {
  return (
    <section className="shop-category-first pt-25 pb-35">
      <div className="container">
        <div className="breadcrumb__list has-icon shop-category-first__breadcrumb">
          <span className="breadcrumb-icon">
            <Home />
          </span>
          <span>
            <Link href="/">Home</Link>
          </span>
          <span className="dvdr">
            <i className="fa-regular fa-angle-right"></i>
          </span>
          <span>Products</span>
        </div>

        <h1 className="shop-category-first__title">Shop Jewellery</h1>

        <p className="shop-category-first__intro">
          Explore rings, necklaces, diamonds, Breslate, bridal jewellery, and
          bespoke atelier pieces through a refined category-first shopping
          experience.
        </p>

        <nav className="shop-category-first__bar" aria-label="Shop categories">
          {shopTopCategories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              scroll={false}
              aria-current={
                category.slug
                  ? activeCategory === category.slug
                    ? "page"
                    : undefined
                  : isAllActive
                    ? "page"
                    : undefined
              }
              className={`shop-category-first__pill ${
                category.slug
                  ? activeCategory === category.slug
                    ? "is-active"
                    : ""
                  : isAllActive
                    ? "is-active"
                    : ""
              }`}
            >
              {category.title}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default ShopCategoryFirstSection;
