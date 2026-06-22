import React from 'react';
import { useDashboardTheme } from "@/feature/userDashboard/layout/DashboardThemeContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Tempat untuk konten
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // Jika tidak terbuka, jangan render apa-apa
  if (!isOpen) return null;

const { theme } = useDashboardTheme();

  // 3. Mapping warna background dan border yang sesuai dengan tema lomba
const modalThemeClass = {
  uiux: "bg-gradient-to-r from-darker-blue to-dark-hover-blue shadow-[0_0_18px_rgba(102,155,188,0.35)]",
  bp: "bg-gradient-to-r from-darker-red2 to-dark-hover-red2 shadow-[0_0_18px_rgba(193,18,31,0.35)]",
  dml: "bg-gradient-to-r from-darker-yellow to-dark-hover-yellow shadow-[0_0_18px_rgba(190,180,160,0.35)]",
}[theme.key];

  return (
    // Latar belakang overlay
    <div
      onClick={onClose} // Menutup modal saat latar belakang diklik
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-xs bg-opacity-50 transition-all duration-300 ease-in-out"
    >
      {/* Kontainer atau 'kartu' modal */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten di dalamnya diklik
        className={`${modalThemeClass} rounded-2xl shadow-lg p-8 m-4 max-w-md w-full`}
      >
        {children} {/* Di sinilah konten unik Anda akan ditampilkan */}
      </div>
    </div>
  );
};

export default Modal;