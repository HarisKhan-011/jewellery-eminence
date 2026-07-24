"use client";

import React, { useState } from "react";
import Link from "next/link";
import menu_data from "@layout/menu-data";

const MobileMenus = ({ onNavigate }) => {
  const [navTitle, setNavTitle] = useState("");

  const openMobileMenu = (menu) => {
    setNavTitle((current) => (current === menu ? "" : menu));
  };

  return (
    <nav className="mean-nav" aria-label="Mobile">
      <ul>
        {menu_data.map((menu, i) => (
          <React.Fragment key={i}>
            {!menu.hasDropdown && (
              <li>
                <Link href={menu.link} onClick={onNavigate}>
                  {menu.title}
                </Link>
              </li>
            )}
            {menu.hasDropdown && (
              <li className="has-dropdown">
                <Link href={menu.link} onClick={onNavigate}>
                  {menu.title}
                </Link>
                <ul
                  className="submenu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu.submenus.map((sub, index) => (
                    <li key={index}>
                      <Link href={sub.link} onClick={onNavigate}>
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`mean-expand ${
                    navTitle === menu.title ? "mean-clicked" : ""
                  }`}
                  onClick={() => openMobileMenu(menu.title)}
                  aria-expanded={navTitle === menu.title}
                  aria-label={`Expand ${menu.title}`}
                >
                  <i className="fal fa-plus"></i>
                </button>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenus;
