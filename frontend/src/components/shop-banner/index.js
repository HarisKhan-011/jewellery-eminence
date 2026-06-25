import Link from 'next/link';
// internal
import banner from "@assets/img/eminence/bridal-jewellery-hero.jpg";
import { RightArrow } from '@svg/index';

const ShopBanner = () => {
  return (
    <section className="banner__area">
      <div className="container">
        <div className="banner__inner include-bg" style={{backgroundImage:`url(${banner.src})`}}>
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="banner__content">
                <span>Bridal Jewellery Set</span>
                <h3 className="banner__title">
                  <Link href="/shop?category=bridal-jewellery">
                    Luminous gold pieces for unforgettable celebrations
                  </Link>
                </h3>
                <p>
                  Refined bridal styling with a radiant <span>gold</span> finish.
                </p>

                <div className="banner__btn">
                  <Link href="/shop?category=bridal-jewellery" className="tp-btn">
                    Buy Now
                    <RightArrow/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
