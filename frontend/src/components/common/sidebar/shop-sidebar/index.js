import React from "react";
import { useRouter } from "next/navigation";
// internal
import ShopCategory from "../../shop-filtering/shop-category";
import ShopColor from "../../shop-filtering/shop-color";
import ShopGemstone from "../../shop-filtering/shop-gemstone";
import ShopPrice from "../../shop-filtering/shop-price";

const ShopSidebar = ({ all_products }) => {
  const router = useRouter();
  const handleReset = () => {
    router.push("/shop");
  };
  return (
    <div className={`shop__sidebar on-left`}>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_category">
          <ShopCategory />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_color">
          <ShopColor />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_gemstone">
          <ShopGemstone />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion" id="shop_price">
          <ShopPrice />
        </div>
      </div>
      <div className="shop__widget tp-accordion">
        <div className="accordion">
          <button onClick={handleReset} className="tp-btn w-100">
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
