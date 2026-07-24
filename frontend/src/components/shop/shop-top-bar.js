"use client";

import React, { useEffect, useRef, useState } from "react";
// internal
import { Dots, Lists } from "@svg/index";

export function ShowingResult({ show, total }) {
  const safeShow = Number(show) || 0;
  const safeTotal = Number(total) || 0;

  return (
    <div className="eminence-shop-toolbar__result">
      <p>
        Showing <strong>1–{safeShow}</strong> of <strong>{safeTotal}</strong>{" "}
        results
      </p>
    </div>
  );
}

export function ShopShortTab({ handleTab, activeTab = "grid" }) {
  return (
    <div className="eminence-shop-toolbar__views" role="tablist" aria-label="Product layout">
      <button
        onClick={() => handleTab("grid")}
        className={`eminence-shop-toolbar__view-btn ${
          activeTab === "grid" ? "is-active" : ""
        }`}
        type="button"
        role="tab"
        aria-selected={activeTab === "grid"}
        aria-label="Grid view"
      >
        <Dots />
      </button>
      <button
        onClick={() => handleTab("lists")}
        className={`eminence-shop-toolbar__view-btn ${
          activeTab === "lists" ? "is-active" : ""
        }`}
        type="button"
        role="tab"
        aria-selected={activeTab === "lists"}
        aria-label="List view"
      >
        <Lists />
      </button>
    </div>
  );
}

const sortOptions = [
  { value: "Short Filtering", text: "Sort by" },
  { value: "Latest Product", text: "Latest" },
  { value: "Price low to high", text: "Price: Low to High" },
  { value: "Price high to low", text: "Price: High to Low" },
];

export function ShopShortSelect({ shortHandler }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(sortOptions[0]);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectOption = (option) => {
    setCurrent(option);
    setOpen(false);
    if (typeof shortHandler === "function") {
      shortHandler(option);
    }
  };

  return (
    <div className="eminence-shop-toolbar__sort" ref={ref}>
      <button
        type="button"
        className={`eminence-shop-toolbar__sort-trigger ${
          open ? "is-open" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{current.text}</span>
        <span className="eminence-shop-toolbar__chevron" aria-hidden="true" />
      </button>

      {open && (
        <ul className="eminence-shop-toolbar__menu" role="listbox">
          {sortOptions.map((option) => {
            const isActive = option.value === current.value;
            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`eminence-shop-toolbar__option ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() => selectOption(option)}
                >
                  {option.text}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
