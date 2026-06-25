import Link from "next/link";
import Image from "next/image";
// internal
import payment from '@assets/img/footer/footer-payment.png';
import SocialLinks from "@components/social";
import CopyrightText from "./copyright-text";
import Logo from "@components/common/logo";
import {
  jewelleryCategories,
  shopTopCategorySlugs,
} from "src/data/jewellery-categories";

const footerCompanyLinks = [
  { url: "/about", title: "About Us" },
  { url: "/shop", title: "Shop Jewellery" },
  { url: "/contact", title: "Contact Us" },
  { url: "/faq", title: "FAQs" },
  { url: "/policy", title: "Privacy Policy" },
];

const footerShopLinks = shopTopCategorySlugs
  .map((slug) => jewelleryCategories.find((category) => category.slug === slug))
  .filter(Boolean)
  .map((category) => ({
    url: `/shop?category=${category.slug}`,
    title: category.title,
  }));

const footerSupportLinks = [
  { url: "/faq", title: "FAQs" },
  { url: "/contact", title: "Customer Care" },
  { url: "/terms", title: "Terms & Conditions" },
  { url: "/policy", title: "Privacy Policy" },
  { url: "/user-dashboard", title: "My Account" },
];

// single widget
function SingleWidget({ col, col_2, col_3, title, contents }) {
  return (
    <div
      className={`col-xxl-${col} col-xl-${col} col-lg-3 col-md-${col_2} col-sm-6`}
    >
      <div className={`footer__widget mb-50 footer-col-11-${col_3}`}>
        <h3 className="footer__widget-title">{title}</h3>
        <div className="footer__widget-content">
          <ul>
            {contents.map((l, i) => (
              <li key={i}>
                <Link href={l.url}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="footer__area footer__style-4"
          data-bg-color="footer-bg-white"
        >
          <div className="footer__top">
            <div className="container">
              <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget footer__widget-11 mb-50 footer-col-11-1">
                    <div className="footer__logo">
                      <Link href="/">
                        <Logo className="eminence-logo--footer" sizes="210px" />
                      </Link>
                    </div>

                    <div className="footer__widget-content">
                      <div className="footer__info">
                        <p>
                          Fine jewellery crafted for refined everyday moments
                          and unforgettable celebrations.
                        </p>
                        <div className="footer__social footer__social-11">
                          <SocialLinks/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SingleWidget
                  col="2"
                  col_2="4"
                  col_3="2"
                  title="Company"
                  contents={footerCompanyLinks}
                />
                <SingleWidget
                  col="2"
                  col_2="3"
                  col_3="3"
                  title="Collections"
                  contents={footerShopLinks}
                />
                <SingleWidget
                  col="2"
                  col_2="3"
                  col_3="4"
                  title="Support"
                  contents={footerSupportLinks}
                />

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget mb-50 footer-col-11-5">
                    <h3 className="footer__widget-title">Talk To Us</h3>

                    <div className="footer__widget-content">
                      <p className="footer__text">
                        Need help choosing a piece?{" "}
                        <Link href="/contact">Book a consultation</Link>
                      </p>
                      <div className="footer__contact">
                        <div className="footer__contact-call">
                          <span>
                            <a href="tel:+96474244763">+964 742 44 763</a>
                          </span>
                        </div>
                        <div className="footer__contact-mail">
                          <span>
                            <a href="mailto:support@eminencejewellery.com">
                              support@eminencejewellery.com
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container">
              <div className="footer__bottom-inner">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="footer__copyright">
                      <CopyrightText />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="footer__payment text-sm-end">
                      <Image src={payment} alt="payment" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
