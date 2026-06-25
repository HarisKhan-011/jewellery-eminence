import Image from "next/image";

export const EMINENCE_LOGO_SRC = "/assets/img/logo/eminence-logo-v2.png";

const Logo = ({
  className = "",
  imageClassName = "",
  width = 1707,
  height = 577,
  priority = false,
  sizes = "120px",
}) => {
  return (
    <span className={`eminence-logo ${className}`.trim()}>
      <Image
        src={EMINENCE_LOGO_SRC}
        alt="Eminence Jewellery"
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`eminence-logo__image ${imageClassName}`.trim()}
      />
    </span>
  );
};

export default Logo;
