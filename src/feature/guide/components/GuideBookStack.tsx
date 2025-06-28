"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { GuideBookData, GuideBooks } from "../data/GuideBookData";
import { Button } from "@/shared/components/ui/Button";

type ScreenSize = "mobile" | "tablet" | "desktop";

const GuideBookStack = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");

  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSwap = () => {
    setMobileActiveIndex((prevIndex) => (prevIndex + 1) % GuideBooks.length);
  };
  const nextGuidebookIndex = (mobileActiveIndex + 1) % GuideBooks.length;
  const nextGuidebookTitle = GuideBooks[nextGuidebookIndex].title;

  const renderCards = () => {
    return GuideBooks.map((guide, index) => (
      <GuideBookCard
        key={index}
        index={index}
        isActive={
          screenSize === "desktop"
            ? activeCard === index
            : screenSize === "mobile"
            ? mobileActiveIndex === index
            : true
        }
        onHover={() => screenSize === "desktop" && setActiveCard(index)}
        onLeave={() => screenSize === "desktop" && setActiveCard(null)}
        screenSize={screenSize}
        mobileActiveIndex={mobileActiveIndex}
        {...guide}
      />
    ));
  };

  if (screenSize === "mobile") {
    return (
      <div className="w-full flex flex-col items-center space-y-8 px-4 mt-8">
        <div className="relative w-full max-w-xs h-80">{renderCards()}</div>
        <Button className="text-sm" onClick={handleSwap}>
          Lihat {nextGuidebookTitle}
        </Button>
      </div>
    );
  }
  // --- AKHIR KODE BARU ---

  // --- BLOK TABLET TIDAK DIUBAH SAMA SEKALI ---
  if (screenSize === "tablet") {
    return (
      <div className="w-full px-4">
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
          {renderCards()}
        </div>
      </div>
    );
  }
  // --- AKHIR BLOK TABLET ---

  // --- BLOK DESKTOP TIDAK DIUBAH SAMA SEKALI ---
  return (
    <div className="w-full relative flex justify-center items-center min-h-[28rem] xl:min-h-[32rem] px-4">
      <div className="relative w-full max-w-xl xl:max-w-2xl">
        {renderCards()}
      </div>
    </div>
  );
  // --- AKHIR BLOK DESKTOP ---
};

// =======================================================================
// Komponen Anak: GuideBookCard
// =======================================================================
interface GuideBookCardProps extends GuideBookData {
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  screenSize: ScreenSize;
  // --- KODE BARU UNTUK MOBILE ---
  mobileActiveIndex: number;
  // --- AKHIR KODE BARU ---
}

const GuideBookCard: React.FC<GuideBookCardProps> = ({
  index,
  isActive,
  onHover,
  onLeave,
  title,
  subtitle,
  href,
  glowColor,
  image,
  screenSize,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (screenSize !== "desktop") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setMousePosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    onLeave();
  };

  // SEMUA FUNGSI STYLE DI BAWAH INI (SEBELUM RENDER) TIDAK DIUBAH,
  // KECUALI PENAMBAHAN FUNGSI BARU KHUSUS MOBILE

  // --- FUNGSI ASLI, TIDAK DIUBAH ---
  const getResponsiveStyles = () => {
    const baseClasses =
      "w-full relative overflow-clip rounded-xl cursor-pointer transition-all duration-300";
    if (screenSize === "mobile") {
      return {
        containerClass:
          baseClasses +
          " min-h-[16rem] shadow-lg hover:shadow-xl bg-slate-900/20 backdrop-blur-sm border border-blue-400/30",
      };
    }
    if (screenSize === "tablet") {
      return {
        containerClass:
          baseClasses +
          " rounded-2xl min-h-[22rem] shadow-lg hover:shadow-xl hover:scale-[1.02] bg-slate-900/20 backdrop-blur-sm border border-blue-400/30",
      };
    }
    return {
      containerClass:
        baseClasses +
        " rounded-2xl xl:rounded-3xl min-h-[24rem] xl:min-h-[28rem] bg-slate-900/10 backdrop-blur-sm border border-blue-400/40",
    };
  };

  // --- FUNGSI ASLI, TIDAK DIUBAH ---
  const getDesktopCardStyle = () => {
    if (screenSize !== "desktop") return {};
    const baseRotation = index === 0 ? -6 : 6;
    const baseTranslateX = index === 0 ? -80 : 80;
    if (isActive) {
      return {
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${
              -mousePosition.y * 12
            }deg) translateZ(40px) scale3d(1.03, 1.03, 1.03) translateX(0px) rotateZ(0deg)`
          : `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(25px) scale3d(1.01, 1.01, 1.01) translateX(0px) rotateZ(0deg)`,
        zIndex: 20,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.4s ease-out",
      };
    }
    return {
      transform: `perspective(1000px) rotateZ(${baseRotation}deg) translateX(${baseTranslateX}px) translateZ(0px) scale3d(0.96, 0.96, 0.96)`,
      zIndex: 10,
      transition: "transform 0.4s ease-out",
    };
  };

  // --- FUNGSI ASLI, TIDAK DIUBAH ---
  const getShadowStyle = () => {
    if (screenSize !== "desktop") return {};
    const glowIntensity = isActive ? (isHovered ? 0.4 : 0.25) : 0.15;
    const shadowColor = "59, 130, 246";
    return {
      boxShadow: isActive
        ? isHovered
          ? `${mousePosition.x * 15}px ${
              mousePosition.y * 15
            }px 40px rgba(${shadowColor}, ${glowIntensity}),
               0px 0px 25px rgba(${shadowColor}, ${glowIntensity * 0.6}),
               inset 0px 0px 15px rgba(${shadowColor}, 0.08)`
          : `0px 10px 30px rgba(${shadowColor}, ${glowIntensity}),
               0px 0px 20px rgba(${shadowColor}, ${glowIntensity * 0.4})`
        : `0px 5px 20px rgba(${shadowColor}, ${glowIntensity})`,
      transition: "box-shadow 0.4s ease-out",
    };
  };

  const getMobileCardStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: "absolute",
      width: "100%",
      height: "100%",
      transition: "transform 0.5s ease-in-out",
      left: 0,
      top: 0,
    };
    if (isActive) {
      style.transform = "translateX(0) translateY(0) scale(1)";
      style.zIndex = 10;
      style.pointerEvents = "auto";
    } else {
      style.transform = "translateX(15%) translateY(10%) scale(0.9)";
      style.zIndex = 5;
      style.pointerEvents = "none";
    }
    return style;
  };

  const { containerClass } = getResponsiveStyles();

  const CardContent = (
    // Definisi CardContent ini tidak diubah
    <div className="w-full relative h-full">
      <div
        className={containerClass + " h-full"}
        style={screenSize === "desktop" ? getShadowStyle() : {}}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="w-full absolute z-0 h-full object-cover"
          width={900}
          alt={`${title} guide`}
          height={900}
          src={image}
        />
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-br ${glowColor} opacity-30`}
        />
        {/* ... sisa dari JSX CardContent ... */}
        <div className="absolute bottom-0 left-0 right-0 z-40 p-4 xl:p-6 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent">
          <div className="space-y-1">
            <h3 className="text-white font-bold text-lg xl:text-xl tracking-wide">
              {title}
            </h3>
            <p className="text-blue-200 text-sm xl:text-base font-light">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- BLOK RENDER AKHIR DIMODIFIKASI UNTUK MENAMBAHKAN KONDISI MOBILE ---

  if (screenSize === "desktop") {
    // Return untuk desktop tidak diubah
    return (
      <Link href={href}>
        <div
          className="absolute -top-[14rem] xl:-top-[16rem] left-1/2 w-60 xl:w-72 -translate-x-1/2"
          style={getDesktopCardStyle()}
        >
          {CardContent}
        </div>
      </Link>
    );
  }

  if (screenSize === "mobile") {
    // Return baru khusus untuk mobile
    return (
      <div style={getMobileCardStyle()}>
        <Link
          href={href}
          className="w-full h-full"
          tabIndex={isActive ? 0 : -1}
        >
          {CardContent}
        </Link>
      </div>
    );
  }

  // Return fallback untuk tablet, tidak diubah
  return (
    <Link href={href} className="h-full">
      {CardContent}
    </Link>
  );
};

export default GuideBookStack;
