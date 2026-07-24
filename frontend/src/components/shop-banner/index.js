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
              Artificial Jewellery Edit
            </span>
            <h3 className="eminence-bridal-banner__title">
              <Link href="/shop">
                Elegant artificial jewellery for every celebration
              </Link>
            </h3>
            <p className="eminence-bridal-banner__text">
              Lightweight, radiant designs crafted for everyday glam and
              special moments — with a premium{" "}
              <span>gold-look</span> finish.
            </p>
            <div className="eminence-bridal-banner__action">
              <Link href="/shop" className="tp-btn eminence-bridal-banner__btn">
                Shop Collection
                <RightArrow />
              </Link>
            </div>
          </div>

          <div className="eminence-bridal-banner__media">
            <Image
              src={banner}
              alt="Eminence artificial jewellery necklace set with matching earrings"
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
