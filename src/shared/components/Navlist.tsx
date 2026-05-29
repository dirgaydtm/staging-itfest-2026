import Link from "next/link";
import { TNavLink } from "../type/Tnavlink";

const Navlist = ({ item, onClick }: { item: TNavLink; onClick?: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();

    const isHome = ["/", "/home"].includes(window.location.pathname);
    const target = isHome ? document.querySelector(item.href) : null;

    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 100,
        behavior: "smooth",
      });
    } else {
      window.location.href = `/home/${item.href}`;
    }
  };

  return (
    <Link
      className="text-lg font-comucan transition-all duration-300 text-light-red hover:text-light-hover-red"
      href={item.href}
      onClick={handleClick}
    >
      {item.title}
    </Link>
  );
};

export default Navlist;
