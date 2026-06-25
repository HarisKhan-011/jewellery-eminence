import React from "react";
import Link from "next/link";
import { shopSidebarCategories } from "src/data/jewellery-categories";

const ShopCategory = () => {
  const content = shopSidebarCategories.map((category, i) => (
      <div key={category.slug} className="card">
        <div className="card-header white-bg" id={`heading-${i + 1}`}>
          <h5 className="mb-0">
            <button
              className={`shop-accordion-btn ${i === 0 ? "" : "collapsed"}`}
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${i + 1}`}
              aria-expanded={i === 0 ? "true" : "false"}
              aria-controls={`#collapse-${i + 1}`}
            >
              {category.title}
            </button>
          </h5>
        </div>

        <div
          id={`collapse-${i + 1}`}
          className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
          aria-labelledby={`heading-${i + 1}`}
          data-bs-parent="#accordion-items"
        >
          <div className="card-body">
            <div className="categories__list">
              <ul>
                {category.children.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/shop?category=${item.slug}`}
                      scroll={false}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="accordion-item">
      <div className="sidebar__widget-content">
        <div className="categories">
          <div id="accordion-items">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
