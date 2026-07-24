"use client";

// internal
import bg from "@assets/img/eminence/bridal-jewellery-hero.jpg";

const ShopCta = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section
      className="cta__area eminence-cta pt-50 pb-50 p-relative include-bg jarallax"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="container">
        <div className="cta__inner-13 white-bg eminence-cta__card">
          <div className="eminence-cta__grid">
            <div className="eminence-cta__content">
              <h3 className="cta__title-13 eminence-cta__title">
                Subscribe for Latest Trends &amp; Offers
              </h3>
              <p className="eminence-cta__copy">
                Be first to know about new arrivals, bridal edits, and seasonal
                offers.
              </p>
            </div>

            <form
              className="eminence-cta__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <label className="visually-hidden" htmlFor="eminence-cta-email">
                Email address
              </label>
              <input
                id="eminence-cta-email"
                className="eminence-cta__input"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <button type="submit" className="tp-btn eminence-cta__button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCta;
