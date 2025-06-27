import React, { FC } from "react";
import { TNavLink } from "../type/Tnavlink";
import Link from "next/link";

interface NavlistProps {
  item: TNavLink;
  onClick?: () => void; // untuk close mobile menu
}

const Navlist: FC<NavlistProps> = ({ item, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Close mobile menu if callback provided
    if (onClick) {
      onClick();
    }

    // Check if we're on home page
    const isHomePage =
      window.location.pathname === "/" || window.location.pathname === "/home";

    if (isHomePage) {
      const target = document.querySelector(item.href);
      if (target) {
        const navbarHeight = 100;
        const targetPosition = (target as HTMLElement).offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = `/home/${item.href}`;
    }
  };

  return (
    <Link
      className="text-white text-xl font-bold font-changa hover:text-blue-200 transition-colors"
      href={item.href}
      onClick={handleClick}
    >
      {item.title}
    </Link>
  );
};

export default Navlist;
