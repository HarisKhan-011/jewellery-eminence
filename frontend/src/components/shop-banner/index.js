import Link from "next/link";
import Image from "next/image";
// internal
import banner from "@assets/img/eminence/bridal-jewellery-3d.png";
import { RightArrow } from "@svg/index";

const ShopBanner = () => {
  return (
    <section className="banner__area eminence-bridal-banner">
      <div className="container">
        <div className="eminence-bridal-banner__panel">
          <div className="eminence-bridal-banner__copy">
            <span className="eminence-bridal-banner__eyebrow">
              Bridal Jewellery Set
            </span>
            <h3 className="eminence-bridal-banner__title">
              <Link href="/shop?category=bridal-jewellery">
                Luminous gold pieces for unforgettable celebrations
              </Link>
            </h3>
            <p className="eminence-bridal-banner__text">
              Refined bridal styling with a radiant{" "}
              <span>gold</span> finish.
            </p>
            <div className="eminence-bridal-banner__action">
              <Link
                href="/shop?category=bridal-jewellery"
                className="tp-btn eminence-bridal-banner__btn"
              >
                Buy Now
                <RightArrow />
              </Link>
            </div>
          </div>

          <div className="eminence-bridal-banner__media">
            <Image
              src={banner}
              alt="Gold bridal necklace set with matching earrings"
              className="eminence-bridal-banner__image"
              sizes="(max-width: 767px) 88vw, (max-width: 1199px) 42vw, 520px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
