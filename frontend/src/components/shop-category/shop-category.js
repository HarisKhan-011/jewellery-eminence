'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper";
// internal
import SingleCategory from "./single-category";

const homeJewelleryProducts = [
  {
    title: "Gold Floral Stud Earrings",
    img: "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 10_45_44 PM.png",
    href: "/shop?category=earrings",
  },
  {
    title: "Diamond Tennis Bracelet",
    img: "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_48 PM (1).png",
    href: "/shop?category=bracelets",
  },
  {
    title: "Gemstone Tennis Bracelets",
    img: "/assets/img/eminence/products/ChatGPT Image Jun 13, 2026, 11_05_49 PM (2).png",
    href: "/shop?category=bracelets",
  },
  {
    title: "Gold Chain Hand Bracelet",
    img: "/assets/img/eminence/products/anja.png",
    href: "/shop?category=bracelets",
  },
];

const ShopCategoryArea = () => {
  return (
    <section className="product__category eminence-category-strip pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="product__category-slider eminence-category-strip__slider">
              <Swiper
                className="product__category-slider-active swiper-container"
                slidesPerView={4}
                spaceBetween={28}
                loop={false}
                grabCursor
                watchOverflow
                modules={[FreeMode, Scrollbar]}
                freeMode={{
                  enabled: true,
                  sticky: false,
                  momentumRatio: 0.85,
                }}
                scrollbar={{
                  el: ".eminence-category-strip__scrollbar",
                  draggable: true,
                  hide: false,
                }}
                breakpoints={{
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 28,
                    freeMode: false,
                  },
                  992: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    freeMode: false,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 18,
                    freeMode: {
                      enabled: true,
                      sticky: false,
                    },
                  },
                  576: {
                    slidesPerView: 1.45,
                    spaceBetween: 14,
                    freeMode: {
                      enabled: true,
                      sticky: false,
                    },
                  },
                  0: {
                    slidesPerView: 1.18,
                    spaceBetween: 12,
                    freeMode: {
                      enabled: true,
                      sticky: false,
                    },
                  },
                }}
              >
                {homeJewelleryProducts.map((item) => (
                  <SwiperSlide key={item.title}>
                    <SingleCategory item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="tp-scrollbar eminence-category-strip__scrollbar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCategoryArea;
