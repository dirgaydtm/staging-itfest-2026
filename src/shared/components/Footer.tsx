"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, ArrowRight } from "lucide-react";
import { SlSocialInstagram } from "react-icons/sl";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { motion } from "framer-motion";
import logoITFest from "@/assets/img/shared/logoITFest.webp";
import sparkle from "@/assets/img/shared/sparkle.webp";
import FadeUp from "@/shared/animations/FadeUp";
import FloatSway from "@/shared/animations/FloatSway";
import HoverSpring from "@/shared/animations/HoverSpring";

const Footer = () => {
  const handleWhatsAppClick = (phone: string) => {
    const message = encodeURIComponent(
      "Halo, saya ingin bertanya tentang IT FEST 2026",
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const links = [
    { name: "Home", href: "#about" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Guidebook", href: "#guide" },
  ];

  return (
    <footer className="relative bg-darker-blue text-white font-leaguespartan overflow-hidden border-t border-normal-hover-blue">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[150%] bg-light-active-blue/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-full bg-[#6FC2F9]/10 blur-[100px] rounded-full mix-blend-screen" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-20 opacity-30"
        >
          <Image src={sparkle} alt="Sparkle" className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 opacity-20"
        >
          <Image src={sparkle} alt="Sparkle" className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:px-12 lg:px-16 flex flex-col gap-6">
        {/* Main Content Flex */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-2 w-full">
          {/* Brand & Description */}
          <div className="flex-3 flex flex-col items-start gap-6">
            <FadeUp delay={0} className="flex items-center gap-4">
              <HoverSpring>
                <FloatSway>
                  <Image
                    src={logoITFest}
                    alt="IT FEST Logo"
                    className="w-24 h-18 sm:w-32 sm:h-24 object-contain drop-shadow-[0_0_15px_rgba(232,240,245,0.4)]"
                    draggable={false}
                  />
                </FloatSway>
              </HoverSpring>
              <div className="flex flex-col">
                <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl font-normal leading-[115%] tracking-wide text-light-active-blue [text-shadow:0_0_15px_rgba(232,240,245,0.5)]">
                  IT FEST
                </h2>
                <p className="text-normal-active-blue font-bold tracking-widest text-sm mt-1">
                  2026
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={1}>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-lg">
                Kompetisi IT tingkat nasional oleh KBMDSI FILKOM UB dengan tema
                "Advancing National Inovation through Digital Excellence".
                Menghadirkan wadah kolaborasi dan inovasi generasi penerus
                bangsa.
              </p>
            </FadeUp>
          </div>

          {/* Quick Links */}
          <div className="flex-2 flex-col items-center hidden lg:flex">
            <div className="flex flex-col gap-5">
              <FadeUp delay={2}>
                <h3 className="tracking-wide font-leaguespartan font-bold text-lg md:text-xl text-white/90">
                  Quick Links
                </h3>
              </FadeUp>
              <div className="flex flex-col gap-3">
                {links.map((link, idx) => (
                  <FadeUp delay={2 + idx * 0.1} key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-white/70 hover:text-light-active-blue transition-colors duration-300 w-fit"
                    >
                      <ArrowRight className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300" />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Social Media */}
          <div className="flex-2 flex flex-col">
            <div className="flex flex-col gap-8 ">
              <div className="flex gap-12 md:gap-16 ">
                {/* Contact Us */}
                <FadeUp delay={3.1} className="flex flex-col items-start gap-3">
                  <h3 className="font-leaguespartan font-bold text-lg md:text-xl text-white/90">
                    Contact Us
                  </h3>
                  <div className="flex flex-col gap-2">
                    <HoverSpring className="cursor-pointer">
                      <button
                        onClick={() => handleWhatsAppClick("6287754760836")}
                        className="cursor-pointer border-0 bg-transparent p-0 flex items-center gap-3 focus:outline-none"
                      >
                        <PiWhatsappLogoLight className="size-8 text-light-active-blue drop-shadow-[0_0_8px_rgba(111,194,249,0.3)]" />
                        <span className="font-leaguespartan font-medium text-white/80 hover:text-white transition-colors">
                          Rasil
                        </span>
                      </button>
                    </HoverSpring>
                    <HoverSpring className="cursor-pointer">
                      <button
                        onClick={() => handleWhatsAppClick("6285811128272")}
                        className="cursor-pointer border-0 bg-transparent p-0 flex items-center gap-3 focus:outline-none"
                      >
                        <PiWhatsappLogoLight className="size-8 text-light-active-blue drop-shadow-[0_0_8px_rgba(111,194,249,0.3)]" />
                        <span className="font-leaguespartan font-medium text-white/80 hover:text-white transition-colors">
                          Naufal
                        </span>
                      </button>
                    </HoverSpring>
                  </div>
                </FadeUp>

                {/* Social Media */}
                <FadeUp delay={3.2} className="flex flex-col items-start gap-3">
                  <h3 className="font-leaguespartan font-bold text-lg md:text-xl text-white/90">
                    Social Media
                  </h3>
                  <div className="flex gap-7 items-center">
                    <HoverSpring>
                      <Link
                        href="https://www.instagram.com/itfest.filkom/"
                        target="_blank"
                        className="cursor-pointer border-0 bg-transparent p-0 flex items-center gap-3"
                      >
                        <SlSocialInstagram className="size-6 text-light-active-blue drop-shadow-[0_0_8px_rgba(111,194,249,0.3)]" />
                        <span className="font-leaguespartan font-medium text-white/80 hover:text-white transition-colors">
                          itfest.filkom
                        </span>
                      </Link>
                    </HoverSpring>
                  </div>
                </FadeUp>
              </div>

              <div className="flex flex-col gap-4">
                <FadeUp delay={3.3} className="flex flex-col items-start gap-3">
                  <h3 className="font-leaguespartan font-bold text-lg md:text-xl text-white/90">
                    Location
                  </h3>
                  <div className="flex items-start gap-3 text-white/70">
                    <MapPin className="size-5 shrink-0 mt-0.5 text-light-active-blue" />
                    <p className="text-sm">
                      Fakultas Ilmu Komputer, Universitas Brawijaya
                      <br />
                      Jl. Veteran No.8, Ketawanggede, Malang, Jawa Timur
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-[1px] w-full bg-linear-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <FadeUp delay={4}>
            <p>© 2026 IT FEST. All rights reserved.</p>
          </FadeUp>

          <FadeUp
            delay={4.2}
            className="flex gap-1.5 justify-center items-center text-light-active-blue font-medium"
          >
            Made with{" "}
            <Heart className="size-4 animate-pulse fill-light-active-blue" /> by{" "}
            <a
              href="https://instagram.com/lifeatpit/"
              target="_blank"
              className="hover:text-white transition-colors duration-300 relative group"
            >
              PIT KBMDSI
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-light-active-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
          </FadeUp>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
