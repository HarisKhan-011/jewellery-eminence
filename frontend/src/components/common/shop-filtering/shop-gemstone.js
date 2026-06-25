import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
// internal
import { gemstoneOptions } from "src/data/jewellery-categories";

const ShopGemstone = () => {
  const searchParams = useSearchParams();
  const activeGemstone = searchParams.get("gemstone");
  const router = useRouter();

  const handleGemstone = (slug) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeGemstone === slug) {
      params.delete("gemstone");
    } else {
      params.set("gemstone", slug);
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `/shop?${nextQuery}` : "/shop");
  };

  return (
    <div className="accordion-item jewellery-filter-accordion">
      <h2 className="accordion-header" id="gemstone__widget">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#gemstone_widget_collapse"
          aria-expanded="true"
          aria-controls="gemstone_widget_collapse"
        >
          Gemstone
        </button>
      </h2>
      <div
        id="gemstone_widget_collapse"
        className="accordion-collapse collapse show"
        aria-labelledby="gemstone__widget"
        data-bs-parent="#shop_gemstone"
      >
        <div className="accordion-body">
          <div className="shop__widget-list jewellery-filter-scroll jewellery-filter-scroll--compact">
            {gemstoneOptions.map((gemstone) => (
              <div key={gemstone.slug} className="shop__widget-list-item">
                <input
                  type="checkbox"
                  id={`gemstone-${gemstone.slug}`}
                  checked={activeGemstone === gemstone.slug}
                  onChange={() => handleGemstone(gemstone.slug)}
                />
                <label
                  htmlFor={`gemstone-${gemstone.slug}`}
                  className="jewellery-filter-label"
                >
                  {gemstone.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopGemstone;
