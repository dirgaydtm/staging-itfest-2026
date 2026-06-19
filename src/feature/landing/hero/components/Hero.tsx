import { ArrowDown } from "lucide-react";
import LogoITFest from "@/assets/img/shared/logoITFest.png";
import Image from "next/image";
import FloatSway from "@/shared/animations/FloatSway";

const Hero = () => {

  return (
    <section className="relative w-full h-full flex z-20">
      <div className="mycontainer flex flex-col justify-center items-center w-full h-full text-white text-center -translate-y-10 gap-6 md:gap-8">
        <FloatSway duration={5}>
          <Image
            src={LogoITFest}
            alt="Logo IT Fest"
            className="w-full max-w-64 md:max-w-96 h-auto"
            draggable={false}
            priority
          />
        </FloatSway>
        <h1 className="text-light-red font-anton text-6xl md:text-8xl leading-[115%] tracking-[-0.96px] [text-shadow:0_0_12px_#686868]">
          IT FEST 2026
        </h1>
        <p className="text-white font-spartan text-lg md:text-xl leading-relaxed tracking-tight max-w-2xl">
          Visionary Design for Limitless Technological Breakthroughs
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="hover:scale-125 transition-transform duration-300"
        >
          <ArrowDown className="w-10 h-10 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;