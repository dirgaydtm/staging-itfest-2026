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
        <div className="flex flex-col sm:flex-row justify-between items-center md:items-start w-full md:py-4">

          {/* Left: Logo */}
          <FadeUp delay={0} className="flex items-center md:gap-12">
            <HoverSpring >
              <FloatSway>
                <Image
                  src={logoITFest}
                  alt="IT FEST Logo"
                  className="w-36 h-27 md:w-48 md:h-36"
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
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-0.75 w-[120%] bg-linear-to-r from-transparent via-white/50 to-transparent my-4"
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
    </footer>
  );
};

export default Footer;
