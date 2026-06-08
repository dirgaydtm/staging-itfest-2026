"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { SlSocialYoutube, SlSocialInstagram } from "react-icons/sl";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { motion } from "framer-motion";
import logoITFest from "@/assets/img/shared/logoITFest.webp";
import FadeUp from "@/shared/animations/FadeUp";
import FloatSway from "@/shared/animations/FloatSway";
import HoverSpring from "@/shared/animations/HoverSpring";

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang IT FEST 2026");
    window.open(`https://wa.me/6287754760836?text=${message}`, "_blank");
  };

  return (
    <footer className="relative bg-darker-blue text-white font-leaguespartan overflow-hidden border-t border-normal-hover-blue">

      <div className="relative z-10 max-w-360 mx-auto lg:px-8 md:px-28 px-8 xl:px-24 transition-all duration-300 py-7 flex items-center flex-col">
        {/* Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full py-4">

          {/* Left: Logo */}
          <FadeUp delay={0} className="flex items-center gap-12">
            <HoverSpring >
              <FloatSway>
                <Image
                  src={logoITFest}
                  alt="IT FEST Logo"
                  width={80}
                  height={80}
                  className="w-48 h-36"
                  draggable={false}
                />
              </FloatSway>
            </HoverSpring>
            <h2 className="font-anton text-[40px] font-normal leading-[115%] tracking-[-0.4px] text-center text-light-active-blue [text-shadow:0_0_15px_rgba(232,240,245,0.75)]">
              IT FEST
            </h2>
          </FadeUp>

          {/* Right: Contact + Social */}
          <div className="flex gap-12 md:gap-16">
            {/* Contact Us */}
            <FadeUp delay={1} className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-leaguespartan font-bold text-lg md:text-xl">Contact Us</h3>
              <HoverSpring className="cursor-pointer">
                <button
                  onClick={handleWhatsAppClick}
                  className="cursor-pointer border-0 bg-transparent p-0 flex items-center justify-center focus:outline-none"
                >
                  <PiWhatsappLogoLight className="size-10 text-light-active-blue" />
                </button>
              </HoverSpring>
            </FadeUp>

            {/* Social Media */}
            <FadeUp delay={2} className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-leaguespartan font-bold text-lg md:text-xl">Social Media</h3>
              <div className="flex gap-7 items-center">
                <HoverSpring>
                  <Link href="https://www.instagram.com/itfest.filkom/" target="_blank">
                    <SlSocialInstagram className="size-8 text-light-active-blue" />
                  </Link>
                </HoverSpring>
                <HoverSpring>
                  <Link href="https://www.youtube.com/@itfest_filkom" target="_blank">
                    <SlSocialYoutube className="size-10 text-light-active-blue" />
                  </Link>
                </HoverSpring>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-[3px] w-[120%] bg-linear-to-r from-transparent via-white/50 to-transparent my-8"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* Bottom */}
        <FadeUp delay={3} className="flex gap-1 justify-center items-center text-light-active-blue">
          Made with <Heart className="size-4" /> by{" "}
          <a href="https://instagram.com/lifeatpit/" target="_blank">PIT KBMDSI</a>
        </FadeUp>
      </div>

      {/* Background blur shape */}
      <svg width="1440" height="359" viewBox="0 0 1440 359" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <g filter="url(#filter0_f_2383_5294)">
          <path d="M236 -2161H1186.01L1096.56 43.6411L1204 1838.16L1168.52 2521H290.472L249.993 1838.16L341.446 162.304L236 -2161Z" fill="#00111A" fillOpacity="0.6" />
        </g>
        <defs>
          <filter id="filter0_f_2383_5294" x="-264" y="-2661" width="1968" height="5682" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_2383_5294" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
};

export default Footer;
