'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
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
    <section className="product__category pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="product__category-slider">
              <Swiper
                className="product__category-slider-active swiper-container"
                slidesPerView={4}
                spaceBetween={30}
                loop={false}
                modules={[Scrollbar]}
                scrollbar={{
                  el: ".tp-scrollbar",
                  clickable: true,
                }}
                breakpoints={{
                  1601: {
                    slidesPerView: 4,
                  },
                  1400: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                }}
              >
                {homeJewelleryProducts.map((item) => (
                  <SwiperSlide key={item.title}>
                    <SingleCategory item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="tp-scrollbar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCategoryArea;
