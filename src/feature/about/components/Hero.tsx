import React from "react";
import Ornament2 from "../../../assets/img/about/Ornament2.webp";
import Ornament3 from "../../../assets/img/about/Ornament3.webp";
import Ornament4 from "../../../assets/img/about/Ornament4.webp";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[100lvh] md:lg:h-[80lvh] lg:h-[70lvh] w-full font-changa ">
      <main className="text-white flex lg:flex-row lg:gap-4 gap-8 justify-around flex-col items-center lg:pt-50 pt-30">
        <div className="xl:w-xl lg:w-lg w-96 flex flex-col gap-4 mycontainer">
          <h1 className="font-neighbor lg:text-6xl text-4xl text-left">
            WHAT IS IT FEST?
          </h1>
          <p className="xl:text-2xl md:text-lg text-sm text-justify indent-7">
            IT FEST 2025 adalah kompetisi teknologi berskala nasional yang
            mengusung tema “Visionary Design for Technological Breakthrough”. IT
            FEST 2025 mendorong generasi muda untuk menghadirkan solusi
            teknologi yang inovatif dan berdampak ke masa depan. Tahun ini, IT
            FEST menghadirkan dua cabang lomba utama, yaitu Business Plan dan
            UI/UX Design. Melalui kompetisi ini, IT FEST menjadi wadah bagi
            talenta muda Indonesia untuk menunjukkan kemampuan terbaik mereka di
            bidang teknologi dan desain.
          </p>
          <div className="w-full flex lg:justify-end justify-center animate-pulse">
            <Image src={Ornament4} alt="ornament" className="w-50"></Image>
          </div>
        </div>

        <div className="xl:w-96 lg:w-80 w-72 relative">
          <Image src={Ornament2} alt="ornament" draggable={false}></Image>
          <Image
            src={Ornament3}
            alt="ornament"
            className="absolute bottom-0 mx-auto left-0 right-0 xl:w-64 lg:w-52 w-48"
            draggable={false}
          ></Image>
        </div>
      </main>
    </section>
  );
};

export default Hero;
