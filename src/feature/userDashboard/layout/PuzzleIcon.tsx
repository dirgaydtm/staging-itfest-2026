import { cn } from "@/shared/utils/cn";
import { type JSX } from "react";

interface PuzzleIconProps {
  icon: JSX.Element;
  isActive: boolean;
  isOverdue: boolean | string;
  themeColorClass: string;
}

export const PuzzleIcon = ({
  icon,
  isActive,
  isOverdue,
  themeColorClass,
}: PuzzleIconProps) => {
  return (
    <div
      className={cn(
        "w-16 h-16 md:w-24 md:h-24 transition-all duration-500 flex justify-center items-center",
        // Hapus styling pada div pembungkus yang bisa berbenturan dengan SVG
        "[&>svg]:w-full [&>svg]:h-full", 
        
        // 1. Inactive: Gunakan warna dari tema
        !isActive && !isOverdue && `[&>svg>path]:fill-current ${themeColorClass}`,

        // 2. Active/Selesai: Menyala putih dengan drop-shadow
        isActive && "[&>svg>path]:fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]",

        // 3. Diproses: Berkedip
        isActive && "animate-pulse",

        // 4. Telat/Gagal: Merah dan gelap
        isOverdue && "[&>svg>path]:fill-red-500/50 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
      )}
    >
      {/* PENTING: Pastikan di dalam puzzles.tsx, tag <path> tidak memiliki 
        atribut `fill="..."` yang hardcoded (seperti fill="#E8F0F5"), 
        agar bisa di-override oleh Tailwind. Hapus atribut `fill` tersebut dari SVG.
      */}
      {icon}
    </div>
  );
};