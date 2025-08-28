"use client";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Shield, Trophy } from "lucide-react";
import { User as UserType } from "../type/TAuth";
import Link from "next/link";
interface ProfileDropdownProps {
  user: UserType | null;
  logout: () => void;
  isAdmin: boolean;
}

const ProfileDropdown = ({ user, logout, isAdmin }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2  backdrop-blur-sm
          text-white transition-all duration-200 hover:border-blue-300 cursor-pointer
          ${isOpen ? "" : ""}
        `}
      >
        <div className="w-8 h-8 bg-blue-300  rounded-full flex items-center justify-center">
          <User size={18} className="text-black font-bold" />
        </div>

        <span className="font-medium text-sm">
          {user?.name || user?.email?.split("@")[0] || "Username"}
        </span>

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute  -left-4 xl:-right-4 mt-2 w-fit md:w-[120%] bg-blue-900/40 backdrop-blur-md rounded-[20px] shadow-xl z-50 border border-blue-400/30 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <div className="py-2 backdrop-blur-lg bg-gradient-to-b from-blue-900/20 to-blue-900/1">
            <div className="px-4 py-3 border-b border-blue-400/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-300/80 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm">
                  <User
                    size={20}
                    className="text-black font-bold rounded-full"
                  />
                </div>
                <div className="w-2/3">
                  <p className="text-white/90 font-medium text-sm">Hello!</p>
                  <p className="text-blue-200/80 text-xs truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link href={"/dashboard"}>
                <button className="w-full px-4 py-2 text-left text-white/90 transition-all duration-300 flex items-center gap-3 cursor-pointer hover:bg-purple-300">
                  <Trophy size={16} className="" />
                  <span className="text-sm">Dashboard</span>
                </button>
              </Link>

              {isAdmin && (
                <Link href="/mangujo/admin/dashboard">
                  <button className="w-full px-4 py-2 text-left text-white/90 hover:bg-blue-400/10 transition-all duration-300 flex items-center cursor-pointer gap-3">
                    <Shield size={16} className="text-blue-300/90" />
                    <span className="text-sm">Admin Panel</span>
                  </button>
                </Link>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-blue-400/20 pt-1">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-300/90 hover:bg-red-500/10 transition-all duration-300 flex items-center cursor-pointer gap-3"
              >
                <LogOut size={16} />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
