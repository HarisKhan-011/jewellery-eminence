const HeroHeading = ({ eyebrow, id, children }) => {
  return (
    <>
      <span className="slider__title-pre-13 eminence-hero-eyebrow">
        {eyebrow}
      </span>
      <h1
        id={id}
        className="slider__title-13 eminence-hero-title"
      >
        {children}
      </h1>
    </>
  );
};

export default HeroHeading;
