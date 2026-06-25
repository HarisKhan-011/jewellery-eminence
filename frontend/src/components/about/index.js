import Image from "next/image";
import Link from "next/link";
import HeroHeading from "@components/common/hero-heading";

const aboutHighlights = [
  {
    number: "01",
    title: "Curated collections",
    description:
      "Explore rings, earrings, necklaces and occasion pieces selected for timeless style.",
  },
  {
    number: "02",
    title: "Made for every moment",
    description:
      "Find jewellery for everyday wear, thoughtful gifts and the celebrations that matter most.",
  },
  {
    number: "03",
    title: "A simple shopping experience",
    description:
      "Discover products, save favourites, manage your cart and order through one clear experience.",
  },
];

const About = () => {
  return (
    <main className="eminence-about">
      <section className="eminence-about__hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="eminence-hero-copy">
                <HeroHeading eyebrow="About Eminence">
                  Jewellery that belongs to your story.
                </HeroHeading>
                <p className="eminence-hero-description">
                  Eminence Jewellery is a modern online destination for pieces
                  that bring confidence, beauty and meaning to every occasion.
                </p>
                <p className="eminence-hero-description">
                  This project brings thoughtfully presented collections,
                  product discovery, wishlists, cart management and customer
                  accounts together in one refined shopping experience.
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
            </div>

            <div className="col-lg-6">
              <div className="eminence-about__image eminence-about__image--3d">
                <Image
                  src="/assets/img/eminence/bridal-jewellery-3d.png"
                  alt="A 3D gold bridal jewellery set from Eminence Jewellery"
                  fill
                  priority
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="eminence-about__highlights">
        <div className="container">
          <div className="eminence-about__section-heading">
            <span className="eminence-about__eyebrow">What matters to us</span>
            <h2>A thoughtful way to find something meaningful.</h2>
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
