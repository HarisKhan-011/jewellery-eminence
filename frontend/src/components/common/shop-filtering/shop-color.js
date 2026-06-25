import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
// internal
import { metalFinishOptions } from "src/data/jewellery-categories";

const ShopColor = () => {
  const searchParams = useSearchParams();
  const activeMetal = searchParams.get("metal");
  const router = useRouter();

  const handleMetal = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("color");

    if (activeMetal === slug) {
      params.delete("metal");
    } else {
      params.set("metal", slug);
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `/shop?${nextQuery}` : "/shop");
  };

  return (
    <div className="accordion-item jewellery-filter-accordion">
      <h2 className="accordion-header" id="metal__widget">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#metal_widget_collapse"
          aria-expanded="true"
          aria-controls="metal_widget_collapse"
        >
          Metal / Finish
        </button>
      </h2>
      <div
        id="metal_widget_collapse"
        className="accordion-collapse collapse show"
        aria-labelledby="metal__widget"
        data-bs-parent="#shop_color"
      >
        <div className="accordion-body">
          <div className="shop__widget-list jewellery-filter-scroll jewellery-filter-scroll--compact">
            {metalFinishOptions.map((metal) => (
              <div key={metal.slug} className="shop__widget-list-item jewellery-metal-option">
                <input
                  type="checkbox"
                  id={`metal-${metal.slug}`}
                  checked={activeMetal === metal.slug}
                  onChange={() => handleMetal(metal.slug)}
                />
                <label htmlFor={`metal-${metal.slug}`} className="jewellery-filter-label">
                  <span
                    className="jewellery-metal-swatch"
                    data-swatch={metal.swatch}
                    aria-hidden="true"
                  />
                  {metal.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopColor;
