import Link from "next/link";
import HeroHeading from "@components/common/hero-heading";

const aboutHighlights = [
  {
    number: "01",
    title: "Jewellery for real moments",
    description:
      "Explore daily pieces, thoughtful gifts, diamond jewellery and complete bridal sets with a clear shopping flow.",
  },
  {
    number: "02",
    title: "Simple online shopping",
    description:
      "Compare by category, metal, gemstone and price, then save favourites, manage your cart and checkout securely.",
  },
  {
    number: "03",
    title: "Personal customer care",
    description:
      "Our team is here for styling help, bridal selections, bespoke requests, delivery support, returns and exchanges.",
  },
];

const aboutValues = [
  {
    title: "Selected with intention",
    description:
      "Fine jewellery chosen for lasting beauty, comfortable wear and meaningful occasions.",
  },
  {
    title: "Clear before checkout",
    description:
      "Useful product details help customers compare designs before placing an order.",
  },
  {
    title: "Secure order journey",
    description:
      "Account, wishlist, cart, checkout and order tools keep each purchase easy to follow.",
  },
  {
    title: "Guidance when needed",
    description:
      "Support for bridal jewellery, bespoke pieces, styling questions and thoughtful gifting.",
  },
];

const heroFocus = [
  "Rings, necklaces, earrings and bracelets",
  "Diamonds, bridal jewellery and jewellery sets",
  "Bespoke atelier support for personal pieces",
];

const About = () => {
  return (
    <main className="eminence-about">
      <section className="eminence-about__hero">
        <div className="container">
          <div className="eminence-about__hero-layout">
            <div className="eminence-about__hero-copy">
              <HeroHeading eyebrow="About Eminence">
                Jewellery chosen for the moments you keep close.
              </HeroHeading>
              <p className="eminence-hero-description">
                Eminence Jewellery is an online jewellery store created for
                customers who want elegant pieces, trusted service and a smooth
                shopping experience from selection to delivery.
              </p>
              <div className="eminence-about__actions">
                <Link className="eminence-about__button" href="/shop">
                  Shop the collection
                </Link>
                <Link className="eminence-about__link" href="/contact">
                  Contact us
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div className="eminence-about__hero-note">
              <p>
                Our collections bring together jewellery for personal style,
                gifting, weddings and special occasions.
              </p>
              <ul>
                {heroFocus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="eminence-about__story">
        <div className="container">
          <div className="eminence-about__story-layout">
            <div className="eminence-about__section-heading">
              <span className="eminence-about__eyebrow">Our story</span>
              <h2>Fine jewellery, presented with care.</h2>
            </div>

            <div className="eminence-about__text">
              <p>
                We built Eminence Jewellery around a simple idea: choosing
                jewellery should feel beautiful, clear and reassuring. A
                customer may be shopping for a daily ring, a gift, a bridal set,
                a diamond piece or a custom design, and each journey deserves
                the same attention to detail.
              </p>
              <p>
                The website is designed to make that journey easier. You can
                browse by collection, filter by metal or gemstone, review prices
                in Pakistani Rupees, save favourites to your wishlist, complete
                checkout securely and return to your account for order updates.
              </p>
              <p>
                Behind the store is a focus on presentation, customer care and
                honest communication. If you need help choosing a piece, planning
                bridal jewellery or discussing a bespoke request, our team is
                ready to guide you before and after your order.
              </p>
            </div>
          </div>

          <div className="eminence-about__values">
            {aboutValues.map((value) => (
              <article className="eminence-about__value" key={value.title}>
                <span aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="eminence-about__highlights">
        <div className="container">
          <div className="eminence-about__section-heading">
            <span className="eminence-about__eyebrow">What matters to us</span>
            <h2>A thoughtful way to shop jewellery online.</h2>
          </div>

          <div className="row g-4">
            {aboutHighlights.map((item) => (
              <div className="col-lg-4" key={item.number}>
                <article className="eminence-about__highlight">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
