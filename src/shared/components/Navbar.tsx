"use client";
import { useState } from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";
import Hamburger from "hamburger-react";
import { Button } from "./ui/Button";
import useScrollNavbar from "../hooks/useScrollBar";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";

const NavbarContent = () => {
  const { isVisible } = useScrollNavbar(100, 700);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, IsAdmin } = useAuth();

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed right-0 left-0 top-0 py-4 z-100 transition-transform duration-300 ${
          isVisible ? "translate-y-0 lg:bg-blue-500" : "-translate-y-full"
        }`}
      >
        <div className="mycontainer items-center lg:flex hidden justify-between">
          <div className="w-1/5 font-robotech text-white text-glow text-5xl mb-2 font-bold">
            <Link
              className="transition-transform hover:scale-105"
              href={"/home"}
            >
              <h1 className="transition-transform hover:scale-105">IT FEST</h1>
            </Link>
          </div>
          <ul className="w-3/5 flex justify-center gap-10">
            {Navlink.map((item) => (
              <div key={item.id} className="relative group">
                <Navlist item={item} />
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </div>
            ))}
          </ul>
          <div className="w-1/5 flex justify-end">
            {isAuthenticated ? (
              <ProfileDropdown
                user={user}
                logout={logout}
                isAdmin={IsAdmin ?? false}
              />
            ) : (
              <Link href={"/login"}>
                <Button variant={"primary"} size={"small"}>
                  Masuk
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`w-screen px-10 sm:px-14 md:px-16 bg-blue-500 flex z-100 py-4 fixed justify-between items-center lg:hidden transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="font-bold font-robotech text-white text-glow text-4xl">
          <Link href="/home">
            <h1>IT FEST</h1>
          </Link>
        </div>
        <div
          className={`${isOpen ? "bg-transparent " : "bg-[#171F74]"} rounded-lg`}
        >
          <Hamburger
            size={25}
            color={`${isOpen ? "white" : "white"}`}
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </nav>

      {isOpen && <MobileNav closeMobileMenu={closeMobileMenu} />}
    </>
  );
};

const MobileNav = ({ closeMobileMenu }: { closeMobileMenu: () => void }) => {
  const { isAuthenticated, user, logout, IsAdmin } = useAuth();

  return (
    <div className="h-screen w-screen inset-0 fixed bg-blue-500 top-0 left-0 z-50 flex flex-col items-center pt-24">
      <ul className="flex flex-col items-center gap-6 mb-8">
        {Navlink.map((item) => (
          <li key={item.id} className="text-white text-lg relative group">
            <Navlist item={item} onClick={closeMobileMenu} />
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        {isAuthenticated ? (
          <ProfileDropdown
            user={user}
            logout={logout}
            isAdmin={IsAdmin ?? false}
          />
        ) : (
          <Link href="/login">
            <Button variant={"primary"} size={"small"}>
              Daftar
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <AuthProvider>
      <NavbarContent />
    </AuthProvider>
  );
};

export default Navbar;
