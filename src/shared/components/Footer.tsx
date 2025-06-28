"use client";
import React from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoitfest from "../../assets/img/footer/logoitfest.webp";
import whatsapp from "../../assets/img/footer/whatsapp.webp";
import Tiktok from "@/assets/img/footer/tiktok.png";
const Footer = () => {
  const handleWhatsAppClick = (phoneNumber: string, name: string) => {
    const formattedNumber = phoneNumber.startsWith("0")
      ? "62" + phoneNumber.slice(1)
      : phoneNumber;

    const message = `Halo ${name}, saya ingin bertanya tentang IT FEST 2025`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };
  return (
    <footer className="min-h-[35rem] md:min-h-fit bg-linear-180 from-blue-500 to-blue-400 text-white font-changa border-t-5 border-blue-250">
      <div className="mycontainer mb-10 md:mb-20">
        <div className="pt-12 md:pt-24 flex lg:flex-row flex-col justify-center lg:justify-between gap-8 lg:gap-0">
          <section className="flex gap-y-4 flex-col justify-center md:gap-6 items-center lg:items-start">
            <div className="flex items-center gap-6 md:gap-10">
              <Image
                src={logoitfest}
                alt="Logo"
                className="w-20 h-20 md:w-30 md:h-30"
              />
              <p className="font-semibold font-robotech text-4xl md:text-7xl text-glow">
                IT FEST
              </p>
            </div>
            <p className="text-base md:text-xl text-center lg:text-left">
              © 2025 IT FEST 2025. All rights reserved. Universitas Brawijaya
            </p>
          </section>

          <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <h1 className="font-bold text-2xl md:text-3xl">Contact Us</h1>
              <div className="flex md:flex-col md:gap-0 flex-row gap-4">
                <div
                  className="flex items-center gap-3.5 cursor-pointer p-2 rounded-lg transition-colors"
                  onClick={() => handleWhatsAppClick("082132929575", "Devi")}
                >
                  <Image
                    src={whatsapp}
                    alt="whatsapp"
                    className="w-8 h-8 md:w-11 md:h-11"
                  />
                  <p className="text-base md:text-lg">Devi</p>
                </div>

                <div
                  className="flex items-center gap-3.5 cursor-pointer  p-2 rounded-lg transition-colors"
                  onClick={() => handleWhatsAppClick("082140456252", "Izza")}
                >
                  <Image
                    src={whatsapp}
                    alt="whatsapp"
                    className="w-8 h-8 md:w-11 md:h-11"
                  />
                  <p className="text-base md:text-lg">Izza</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center lg:items-start">
              <h1 className="font-semibold text-2xl md:text-3xl">
                Social Media
              </h1>

              <Link
                className="flex mt-2 items-center gap-3.5"
                href="https://www.instagram.com/itfest.filkom/"
              >
                <Instagram className="w-8 text-blue-200 h-8" />
                <p className="text-base md:text-lg">@itfest.filkom</p>
              </Link>
              <Link
                className="flex items-center gap-3.5"
                href="https://www.tiktok.com/@itfest_filkom"
              >
                <Image src={Tiktok} alt="whatsapp" className="w-8" />
                <p className="text-base md:text-lg">@itfest_filkom</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
      <div className="border-t-5 border-purple-border text-center py-4 md:py-6">
        Made with ❤️ by PIT KBMDSI
      </div>
    </footer>
  );
};

export default Footer;
