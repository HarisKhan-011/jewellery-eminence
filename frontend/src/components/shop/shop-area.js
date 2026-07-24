import React, { useState } from "react";
// internal
import { ShopShortSelect, ShopShortTab, ShowingResult } from "./shop-top-bar";
import ProductGridItems from "./prd-grid-items";
import ProductListItems from "./prd-list-items";

const ShopArea = ({ products, shortHandler }) => {
  const [showingGridItems, setShowingGridItems] = useState(0);
  const [showingListItems, setShowingListItems] = useState(0);
  const [tabActive, setActiveTab] = useState("grid");

  const handleTab = (value) => {
    setActiveTab(value);
  };

  return (
    <section className="shop__area pb-60">
      <div className="container">
        <div className="shop__top eminence-shop-toolbar mb-35">
          <div className="eminence-shop-toolbar__inner">
            <ShowingResult
              show={
                tabActive === "grid" ? showingGridItems : showingListItems
              }
              total={products.length}
            />

            <div className="eminence-shop-toolbar__controls">
              <ShopShortTab handleTab={handleTab} activeTab={tabActive} />
              <ShopShortSelect shortHandler={shortHandler} />
            </div>
          </div>
        </div>

        <div className="shop__main">
          <div className="row">
            <div className="col-12">
              <div className="shop__tab-content mb-40">
                <div className="tab-content" id="shop_tab_content">
                  {tabActive === "grid" ? (
                    <ProductGridItems
                      itemsPerPage={9}
                      items={products}
                      setShowingGridItems={setShowingGridItems}
                    />
                  ) : (
                    <ProductListItems
                      itemsPerPage={5}
                      items={products}
                      setShowingListItems={setShowingListItems}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopArea;
