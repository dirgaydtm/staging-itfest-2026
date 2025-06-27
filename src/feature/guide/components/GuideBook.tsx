"use client";
import Image from "next/image";
import React, { useState } from "react";
import GuideBookPP from "@/assets/img/guide/guide.jpg";
import Link from "next/link";

const GuideBook = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const transformStyle = {
    transform: isHovered
      ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${
          -mousePosition.y * 15
        }deg) translateZ(20px) scale3d(1.02, 1.02, 1.02)`
      : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale3d(1, 1, 1)",
    transition: isHovered
      ? "transform 0.1s ease-out"
      : "transform 0.3s ease-out",
  };

  const shadowStyle = {
    boxShadow: isHovered
      ? `${mousePosition.x * 25}px ${
          mousePosition.y * 25
        }px 60px rgba(0, 0, 0, 0.3), 
         ${mousePosition.x * 10}px ${
          mousePosition.y * 10
        }px 20px rgba(0, 0, 0, 0.15)`
      : "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease-out",
  };

  const overlayStyle = {
    background: isHovered
      ? `linear-gradient(
          ${135 + mousePosition.x * 20}deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 50%,
          rgba(0, 0, 0, 0.1) 100%
        )`
      : "transparent",
    transition: "background 0.3s ease-out",
  };

  return (
    <Link
      href={
        "https://drive.google.com/drive/folders/1tKrksf-4iGy390OgF3hYitqJEB4753sM?usp=sharing"
      }
    >
      <div className="w-full relative  mb-4">
        <div
          className="w-full relative overflow-clip bg-white rounded-4xl min-h-[35rem] cursor-pointer"
          style={{ ...transformStyle, ...shadowStyle }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            className="w-full absolute z-0 h-full"
            width={500}
            alt="guidebook"
            height={500}
            src={GuideBookPP}
          />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={overlayStyle}
          />

          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(
            ${45 + mousePosition.x * 30}deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          )`,
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default GuideBook;
