import { useEffect, useState } from "react";

const useSticky = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const stickyHeader = () => {
      setSticky(window.scrollY > 16);
    };

    stickyHeader();
    window.addEventListener("scroll", stickyHeader, { passive: true });
    return () => window.removeEventListener("scroll", stickyHeader);
  }, []);

  return { sticky };
};

export default useSticky;
