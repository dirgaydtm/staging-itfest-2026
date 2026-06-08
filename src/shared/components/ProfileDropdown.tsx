"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Shield, Trophy } from "lucide-react";
import { User as UserType } from "../type/TAuth";
import Link from "next/link";
import ProfilePicture from "./ProfilePicture";

const ProfileDropdown = ({
  user,
  logout,
  isAdmin,
}: {
  user: UserType | null;
  logout: () => void;
  isAdmin: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 hover:scale-105 text-light-red">
        <ProfilePicture
          size={40}
          seed={user?.name || user?.email}
          className="size-6 rounded-full border border-white/20"
          alt="user profile"
        />
        <span className="font-leaguespartan font-medium">
          {user?.name || user?.email?.split("@")[0] || "Username"}
        </span>
        <ChevronDown className={`size-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute -right-4 top-full pt-6 w-52 z-50">
          <div className="rounded-2xl overflow-hidden border border-white/[0.12] backdrop-blur-lg bg-white/[0.06] shadow-2xl">
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/[0.10] min-w-0">
              <p className="text-light-red font-comucan text-sm font-medium truncate">
                {user?.name || "Hello!"}
              </p>
              <p className="text-light-red text-xs truncate font-changa">
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Menu */}
            <div className="flex flex-col">
              <Link
                href="/dashboard"
                className="w-full px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-all duration-200 text-light-red hover:text-[rgba(240,200,200,1)] hover:bg-white/[0.05] font-changa text-sm"
              >
                <Trophy size={15} />
                <span>Dashboard</span>
              </Link>

              {isAdmin && (
                <Link
                  href="/mangujo/admin/dashboard"
                  className="w-full px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-all duration-200 text-light-red hover:text-[rgba(240,200,200,1)] hover:bg-white/[0.05] font-changa text-sm"
                >
                  <Shield size={15} />
                  <span>Admin Panel</span>
                </Link>
              )}

              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full px-4 py-2.5 text-left flex items-center gap-3 cursor-pointer transition-all duration-200 text-red-300/70 hover:text-red-300 hover:bg-red-500/[0.08] border-t border-white/[0.08] font-changa text-sm"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;