import React from "react";

const social_links = [
  {
    link: "https://www.facebook.com/profile.php?id=61588802727303",
    target: "_blank",
    icon: "fa-brands fa-facebook-f",
    name: "Facebook",
  },
  {
    link: "https://www.instagram.com/eminence_jewelery/",
    target: "_blank",
    icon: "fa-brands fa-instagram",
    name: "Instagram",
  },
];

const SocialLinks = () => {
  return (
    <>
      {social_links.map((l, i) => (
        <a
          key={i}
          href={l.link}
          target={l.target}
          rel="noreferrer"
          aria-label={l.name}
        >
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
};

export default SocialLinks;


export function SocialShare() {
  return (
    <>
      {social_links.slice(0, 3).map((l, i) => (
        <a
          key={i}
          href={l.link}
          target={l.target}
          rel="noreferrer"
          aria-label={l.name}
        >
          <i className={l.icon}></i>
        </a>
      ))}
    </>
  );
}
