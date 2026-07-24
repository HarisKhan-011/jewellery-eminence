"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import Menus from "./menus";
import Logo from "@components/common/logo";
import { Cart, Heart, User } from "@svg/index";
import useSticky from "@hooks/use-sticky";
import CartSidebar from "@components/common/sidebar/cart-sidebar";
import OffCanvas from "@components/common/off-canvas";
import useCartInfo from "@hooks/use-cart-info";

const Header = ({ style_2 = false }) => {
  const { sticky } = useSticky();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const { quantity } = useCartInfo();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user: userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <header className="eminence-header">
        <div className={`eminence-header__shell ${sticky ? "is-sticky" : ""}`}>
          <div
            className={`header__bottom-13 header__black-3 header__bottom-border-4 eminence-header__bar ${
              style_2 ? "header__bottom-13-white" : "grey-bg-17"
            } header__sticky ${sticky ? "header-sticky" : ""}`}
            id="header-sticky"
          >
            <div className="container">
              <div className="eminence-header__row">
                <div className="eminence-header__brand">
                  <Link href="/" className="eminence-header__logo-link">
                    <Logo
                      className="eminence-logo--header"
                      priority
                      sizes="(max-width: 767px) 118px, 148px"
                    />
                  </Link>
                </div>

                <nav
                  className="main-menu main-menu-13 eminence-header__nav d-none d-xl-block"
                  aria-label="Primary"
                  id="mobile-menu-3"
                >
                  <Menus />
                </nav>

                <div className="eminence-header__actions">
                  <div className="header__action-13 eminence-header__icons">
                    <ul>
                      {userInfo?.imageURL ? (
                        <li className="d-none d-md-inline-flex">
                          <Link href="/user-dashboard">
                            <Image
                              src={userInfo.imageURL}
                              alt="user img"
                              width={35}
                              height={35}
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </Link>
                        </li>
                      ) : userInfo?.name ? (
                        <li className="d-none d-md-inline-flex">
                          <Link href="/user-dashboard">
                            <h2 className="text-uppercase tp-user-login-avater">
                              {userInfo.name[0]}
                            </h2>
                          </Link>
                        </li>
                      ) : (
                        <li className="d-none d-md-inline-flex">
                          <Link href="/login" aria-label="Login">
                            <User />
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href="/wishlist" aria-label="Wishlist">
                          <Heart />
                          <span className="tp-item-count">
                            {wishlist.length}
                          </span>
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="cartmini-open-btn"
                          aria-label="Open cart"
                          onClick={() => setIsCartOpen(!isCartOpen)}
                        >
                          <Cart />
                          <span className="tp-item-count">{quantity}</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsOffCanvasOpen(true)}
                    type="button"
                    className="hamburger-btn hamburger-btn-black offcanvas-open-btn eminence-header__menu-btn d-xl-none"
                    aria-label="Open menu"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsOffCanvasOpen={setIsOffCanvasOpen}
      />
    </>
  );
};

export default Header;
