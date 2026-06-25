import React from "react";
import PriceItem from "./price-item";
// internal
import { jewelleryPriceRanges } from "src/data/jewellery-categories";

const ShopPrice = () => {
  return (
    <div className="accordion-item jewellery-filter-accordion">
      <h2 className="accordion-header" id="price__widget">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#price_widget_collapse"
          aria-expanded="true"
          aria-controls="price_widget_collapse"
        >
          Price
        </button>
      </h2>
      <div
        id="price_widget_collapse"
        className="accordion-collapse collapse show"
        aria-labelledby="price__widget"
        data-bs-parent="#shop_price"
      >
        <div className="accordion-body">
          <div className="shop__widget-list">
            {jewelleryPriceRanges.map((item) => (
              <PriceItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPrice;
