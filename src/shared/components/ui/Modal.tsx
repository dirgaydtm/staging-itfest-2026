import React, { useEffect } from 'react';
import { useDashboardTheme } from "@/feature/userDashboard/layout/DashboardThemeContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
};

const Modal = ({ isOpen, onClose, children, size = "md" }: ModalProps) => {
  const { theme } = useDashboardTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Kunci semua kontainer internal dashboard
      const backgroundContainers = document.querySelectorAll('.mycontainer, .overflow-y-auto, [class*="h-screen"], [class*="overflow-auto"]');
      backgroundContainers.forEach((el) => {
        if (!el.contains(document.activeElement) && el.id !== "modal-overlay") {
          el.setAttribute('data-old-overflow', (el as HTMLElement).style.overflow || 'auto');
          (el as HTMLElement).style.overflow = 'hidden';
        }
      });
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      const backgroundContainers = document.querySelectorAll('[data-old-overflow]');
      backgroundContainers.forEach((el) => {
        const oldOverflow = el.getAttribute('data-old-overflow') || 'auto';
        (el as HTMLElement).style.overflow = oldOverflow;
        el.removeAttribute('data-old-overflow');
      });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalThemeClass = {
    uiux: "bg-gradient-to-r from-darker-blue to-dark-hover-blue shadow-[0_0_18px_rgba(102,155,188,0.35)]",
    bp: "bg-gradient-to-r from-darker-red2 to-dark-hover-red2 shadow-[0_0_18px_rgba(193,18,31,0.35)]",
    dml: "bg-gradient-to-r from-darker-yellow to-dark-hover-yellow shadow-[0_0_18px_rgba(190,180,160,0.35)]",
  }[theme.key];

  const maxWidthClass = size === "lg" ? "max-w-5xl" : "max-w-md";

  return (
    <div
      id="modal-overlay"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[999] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 flex justify-center items-start lg:items-center min-h-screen overscroll-contain"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalThemeClass} rounded-2xl shadow-xl p-6 sm:p-8 w-full ${maxWidthClass} my-auto border border-white/10`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;