"use client";
import { useState, useRef, useEffect } from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";
import Hamburger from "hamburger-react";
import useScroll from "../hooks/useScrollBar";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import { Shield, LogOut, Trophy, LogIn } from "lucide-react";

const NavbarContent = () => {
  const { isScroll } = useScroll(20);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, IsAdmin } = useAuth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed right-0 left-0 top-0 z-[100] hidden md:flex">
        <div
          className={`mx-auto relative transition-all duration-500 ${isScroll ? "w-full max-w-240 mt-3" : "w-full max-w-310 mt-6"
            }`}
        >
          <div className="absolute inset-0 rounded-[20px] bg-white/[0.06] backdrop-blur-lg border border-white/20 shadow-lg z-0" />

          <div
            className={`relative z-10 items-center flex justify-between py-2 transition-all duration-500 w-full ${isScroll ? "px-8" : "px-10"
              }`}
          >
            <Link
              className="w-1/5 transition-all duration-300 group hover:scale-105 flex items-center justify-start"
              href="/home"
            >
              <p className="font-comucan mt-2 text-4xl font-bold transition-all text-light-red group-hover:tracking-widest">
                ITFEST
              </p>
            </Link>

            <ul className="w-3/5 flex justify-center gap-7">
              {Navlink.map((item) => (
                <li key={item.id} className="relative group mt-1">
                  <Navlist item={item} />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-light-hover-red/60 to-transparent transition-all duration-300 group-hover:w-[200%]" />
                </li>
              ))}
            </ul>

            <div className="w-1/5 flex justify-end">
              {isAuthenticated ? (
                <ProfileDropdown user={user} logout={logout} isAdmin={IsAdmin ?? false} />
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-5 py-1 rounded-lg transition-all duration-300 hover:scale-105 bg-white/[0.08] hover:bg-white/[0.15] text-light-red hover:text-white border border-white/10 hover:border-white/25 shadow-lg font-comucan font-semibold"
                >
                  <span className="mt-0.5">Masuk</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`w-screen px-5 flex z-[100] fixed justify-between items-center lg:hidden transition-[padding] duration-300 ${isScroll ? "py-2.5" : "py-4"
          }`}
      >
        <Link href="/home">
          <h1 className="font-comucan text-2xl font-bold text-light-red">ITFEST</h1>
        </Link>

        <div className="relative" ref={mobileMenuRef}>
          <Hamburger size={22} color="white" toggled={isOpen} toggle={setIsOpen} />

          {isOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 z-[200] duration-200 rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-lg bg-light-active-green/15">
              <ul className="py-2 px-1">
                {Navlink.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-center px-4 py-2.5 text-light-red font-comucan text-base rounded-xl transition-all duration-200 hover:bg-white/[0.07] hover:text-light-hover-red hover:pl-6"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-white/[0.1] mx-3" />

              <div className="p-4">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 rounded-full">
                      <ProfilePicture
                        size={32}
                        seed={user?.name || user?.email}
                        className="size-8 rounded-full border border-white/20"
                        alt="user avatar"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-light-red font-leaguaspartan text-sm font-medium truncate">
                          {user?.name || user?.email?.split("@")[0] || "Hello!"}
                        </p>
                        <p className="text-light-red/50 text-xs font-changa truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={close}
                      className="flex items-center gap-2 px-1 rounded-xl text-light-red hover:bg-white/[0.07] transition-all duration-200 font-leaguespartan text-sm"
                    >
                      <Trophy className="size-4" />
                      Dashboard
                    </Link>

                    {IsAdmin && (
                      <Link
                        href="/mangujo/admin/dashboard"
                        onClick={close}
                        className="flex items-center px-1 gap-2 rounded-xl text-light-red hover:bg-white/[0.07] transition-all duration-200 font-leaguespartan text-sm"
                      >
                        <Shield className="size-4" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        close();
                      }}
                      className="flex items-center gap-2 px-1 rounded-xl text-red-300/70 hover:text-red-300 hover:bg-red-500/[0.08] transition-all duration-200 font-leaguespartan text-sm w-full"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={close}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-light-red hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 transition-all duration-200 font-comucan text-sm font-semibold w-full"
                  >
                    <LogIn className="size-4" />
                    <span>Masuk</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

const Navbar = () => (
  <AuthProvider>
    <NavbarContent />
  </AuthProvider>
);

export default Navbar;
