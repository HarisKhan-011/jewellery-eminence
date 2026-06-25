import Link from 'next/link';
// internal
import banner from '@assets/img/banner/banner-earrings.jpg';
import { RightArrow } from '@svg/index';

const ShopBanner = () => {
  return (
    <section className="banner__area">
      <div className="container">
        <div className="banner__inner include-bg" style={{backgroundImage:`url(${banner.src})`}}>
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="banner__content">
                <span>Gold Floral Stud Earrings</span>
                <h3 className="banner__title">
                  <Link href="/shop?category=earrings">Golden blooms for refined everyday shine</Link>
                </h3>
                <p>Polished floral studs in radiant <span>gold</span>.</p>

                <div className="banner__btn">
                  <Link href="/shop?category=earrings" className="tp-btn">
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