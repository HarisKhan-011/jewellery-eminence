'use client';
import React from "react";
// internal
import { Play } from "@svg/index";
import faq_bg from "@assets/img/eminence/bridal-jewellery-hero.jpg";
import SingleFaq from "@components/faq/single-faq";
import VideoModal from "@components/common/modals/modal-video";
import useModal from "@hooks/use-modal";

const faq_items = [
  {
    id: "about-one",
    title: "How do I choose the right jewellery piece?",
    show: true,
    desc: "Start with the occasion, preferred metal finish and the style you wear most. Our collections are arranged to make rings, earrings, necklaces and bridal pieces easy to compare.",
    parent: "faqaccordion",
  },
  {
    id: "about-two",
    title: "Can I save favourites before ordering?",
    desc: "Yes. Add pieces to your wishlist while browsing, then return to them when you are ready to compare designs or move them into your cart.",
    parent: "faqaccordion",
  },
  {
    id: "about-three",
    title: "Do you support bridal consultations?",
    desc: "You can contact the team for help shortlisting jewellery sets, coordinating pieces for an event, or discussing a more personal selection.",
    parent: "faqaccordion",
  },
];

const AboutFaqs = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
  return (
    <React.Fragment>
      <section className="faq__area p-relative">
        <div
          className="faq__video"
          style={{ backgroundImage: `url(${faq_bg.src})` }}
        >
          <div className="faq__video-btn">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setIsVideoOpen(true)}
              className="tp-pulse-border popup-video"
            >
              <Play />
            </a>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="faq__wrapper-2 faq__gradient-border faq__style-2 tp-accordion pl-160">
                <div className="faq__title-wrapper">
                  <span className="faq__title-pre">
                    Get in touch with us
                  </span>
                  <h3 className="faq__title">
                    Need help choosing the right piece?
                  </h3>
                </div>
                <div className="accordion" id="faqaccordion">
                  {faq_items.map((item) => (
                    <SingleFaq key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"FWrz3bT-YoE"}
      />
      {/* video modal end */}
    </React.Fragment>
  );
};

export default AboutFaqs;
