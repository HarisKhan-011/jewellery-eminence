"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "@components/common/logo";
import MobileMenus from "./mobile-menus";
import SocialLinks from "@components/social";
import SearchForm from "@components/forms/search-form";

const PHONE_DISPLAY = "03424495548";
const PHONE_HREF = "tel:03424495548";
const EMAIL = "eminencejewelery1@gmail.com";

const OffCanvas = ({ isOffCanvasOpen, setIsOffCanvasOpen }) => {
  useEffect(() => {
    document.body.classList.toggle("eminence-nav-locked", isOffCanvasOpen);
    return () => document.body.classList.remove("eminence-nav-locked");
  }, [isOffCanvasOpen]);

  const closeMenu = () => setIsOffCanvasOpen(false);

  return (
    <>
      <div
        className={`offcanvas__area offcanvas__area-1 eminence-mobile-nav ${
          isOffCanvasOpen ? "offcanvas-opened" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="offcanvas__wrapper eminence-mobile-nav__wrapper">
          <div className="offcanvas__close">
            <button
              onClick={closeMenu}
              className="offcanvas__close-btn offcanvas-close-btn"
              aria-label="Close menu"
              type="button"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>

          <div className="offcanvas__content eminence-mobile-nav__content">
            <div className="eminence-mobile-nav__top">
              <Link href="/" onClick={closeMenu} className="eminence-mobile-nav__logo">
                <Logo className="eminence-logo--mobile" sizes="(max-width: 767px) 42vw, 150px" />
              </Link>
            </div>

            <div className="eminence-mobile-nav__search d-xl-none">
              <SearchForm mobile />
            </div>

            <div className="mobile-menu-3 fix menu-counter mean-container d-xl-none eminence-mobile-nav__menu">
              <div className="mean-bar">
                <MobileMenus onNavigate={closeMenu} />
              </div>
            </div>

            <div className="eminence-mobile-nav__cta">
              <Link href="/shop" className="tp-btn-offcanvas" onClick={closeMenu}>
                Shop Jewellery
                <i className="fa-regular fa-chevron-right"></i>
              </Link>
            </div>

            <div className="eminence-mobile-nav__footer">
              <div className="offcanvas__social eminence-mobile-nav__social">
                <h3 className="offcanvas__social-title">Follow us</h3>
                <SocialLinks />
              </div>

              <div className="offcanvas__contact eminence-mobile-nav__contact">
                <a href={PHONE_HREF} className="eminence-mobile-nav__phone">
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="eminence-mobile-nav__email"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={closeMenu}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
        aria-hidden={!isOffCanvasOpen}
      />
    </>
  );
};

export default OffCanvas;
