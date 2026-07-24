import Link from "next/link";
// internal
import SocialLinks from "@components/social";
import CopyrightText from "./copyright-text";
import Logo from "@components/common/logo";

const footerCompanyLinks = [
  { url: "/about", title: "About Us" },
  { url: "/shop", title: "Shop Jewellery" },
  { url: "/contact", title: "Contact Us" },
  { url: "/policy", title: "Privacy Policy" },
];

const Footer = () => {
  return (
    <footer className="eminence-footer">
      <div
        className="footer__area footer__style-4"
        data-bg-color="footer-bg-white"
      >
        <div className="footer__top eminence-footer__top">
          <div className="container">
            <div className="eminence-footer__grid">
              <div className="eminence-footer__brand">
                <Link href="/" className="eminence-footer__logo">
                  <Logo className="eminence-logo--footer" sizes="200px" />
                </Link>
                <p className="eminence-footer__tagline">
                  Fine jewellery crafted for refined everyday moments and
                  unforgettable celebrations.
                </p>
                <div className="footer__social footer__social-11 eminence-footer__social">
                  <SocialLinks />
                </div>
              </div>

              <nav
                className="eminence-footer__nav"
                aria-label="Company links"
              >
                <h3 className="eminence-footer__heading">Company</h3>
                <ul className="eminence-footer__list">
                  {footerCompanyLinks.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="eminence-footer__contact">
                <h3 className="eminence-footer__heading">Talk To Us</h3>
                <p className="eminence-footer__help">
                  Need help choosing a piece?{" "}
                  <Link href="/contact">Book a consultation</Link>
                </p>
                <a
                  className="eminence-footer__phone"
                  href="tel:+923424495548"
                >
                  03424495548
                </a>
                <a
                  className="eminence-footer__email"
                  href="mailto:eminencejewelery1@gmail.com"
                >
                  eminencejewelery1@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom eminence-footer__bottom">
          <div className="container">
            <div className="footer__bottom-inner eminence-footer__bottom-inner">
              <div className="footer__copyright text-center">
                <CopyrightText />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
