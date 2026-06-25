'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import bridalSetImg from "@assets/img/eminence/bridal-jewellery-3d.png";
import { RightArrow } from "@svg/index";

const HeroBanner = () => {
  return (
    <section
      className="slider__area eminence-hero-section"
      aria-labelledby="eminence-hero-title"
    >
      <div className="eminence-hero-ambient" aria-hidden="true">
        <span className="eminence-hero-ambient__orb eminence-hero-ambient__orb--one" />
        <span className="eminence-hero-ambient__orb eminence-hero-ambient__orb--two" />
        <span className="eminence-hero-ambient__line" />
      </div>

      <div className="container eminence-hero-shell">
        <div className="row align-items-center eminence-hero-grid">
          <div className="col-lg-6 col-md-6">
            <div className="slider__content-13 eminence-hero-copy">
              <span className="slider__title-pre-13 eminence-hero-eyebrow">
                The Bridal Signature
              </span>

              <h1
                id="eminence-hero-title"
                className="slider__title-13 eminence-hero-title"
              >
                Made for your
                <span> unforgettable day.</span>
              </h1>

              <p className="eminence-hero-description">
                Discover an heirloom-inspired gold necklace set, sculpted with
                luminous stones and pearl details for celebrations that deserve
                something extraordinary.
              </p>

              <div className="slider__btn-13 eminence-hero-action">
                <Link
                  href="/shop?category=bridal-jewellery"
                  className="tp-btn-border eminence-hero-cta"
                >
                  Explore Bridal Jewellery
                  <span>
                    <RightArrow />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="eminence-hero-visual">
              <span className="eminence-hero-glow" aria-hidden="true" />
              <span
                className="eminence-hero-orbit eminence-hero-orbit--outer"
                aria-hidden="true"
              />
              <span
                className="eminence-hero-orbit eminence-hero-orbit--inner"
                aria-hidden="true"
              />

              <div className="eminence-hero-product">
                <Image
                  src={bridalSetImg}
                  alt="Realistic three-dimensional gold bridal necklace with matching earrings"
                  className="eminence-hero-product__image"
                  sizes="(max-width: 575px) 88vw, (max-width: 991px) 48vw, 620px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
