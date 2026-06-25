"use client";
import { cn } from "@/shared/utils/cn";
import { usePathname } from "next/navigation";
import { navItems } from "../data/nav-items";
import { AdminProfile } from "./AdminProfile";
import { useState, useMemo } from "react";
import SidebarItem from "./SidebarItem";
import { useAuth } from "@/shared/hooks/useAuth";

interface SidebarProps {
  profileData: {
    imageUrl: string;
    username: string;
    email: string;
  };
  onLogout: () => void;
}

export default function Sidebar({ profileData, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Filter nav items based on user's role_id
  const filteredNavItems = useMemo(() => {
    const userRoleId = user?.role_id;
    if (!userRoleId) return navItems;

    return navItems.filter((item) => {
      // If no allowedRoles defined, show to all
      if (!item.allowedRoles || item.allowedRoles.length === 0) return true;
      // Check if user's role_id is in allowedRoles
      return item.allowedRoles.includes(userRoleId);
    });
  }, [user?.role_id]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-[#B0BFC7]/20 border border-white/20 text-white backdrop-blur-md md:hidden shadow-lg cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Backdrop Blur */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ASIDE CONTAINER (Diubah menjadi h-screen & fixed/sticky agar pas setinggi layar monitor) */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 w-64 h-screen z-50 bg-[#B0BFC7]/10 border-r border-white/10 backdrop-blur-lg text-white p-6 flex flex-col transition-transform duration-300 ease-in-out overflow-hidden",
          "md:transform-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Profile Section - Tetap diam di atas */}
        <AdminProfile
          imageUrl={profileData.imageUrl}
          email={profileData.email}
          username={profileData.username}
        />
        
        {/* Navigation Menu - Ditambahkan overflow-y-auto agar jika menu panjang, hanya area ini yang bisa di-scroll */}
        <nav className="flex-1 overflow-y-auto pr-1 my-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <ul className="space-y-4">
            {filteredNavItems.map((item, idx) => (
              <SidebarItem
                key={idx}
                item={item}
                pathname={pathname}
                onItemClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </ul>
        </nav>

        {/* Logout Button - Terkunci kokoh di paling bawah kontainer screen tanpa terdorong keluar layar */}
        <button
          onClick={() => {
            setIsSidebarOpen(false);
            onLogout();
          }}
          className="flex items-center justify-center font-bold w-full px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/50 cursor-pointer text-sm shrink-0"
        >
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}