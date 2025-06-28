import React from "react";
import Ornament2 from "../../../assets/img/about/Ornament2.webp";
import Ornament3 from "../../../assets/img/about/Ornament3.webp";
import Ornament4 from "../../../assets/img/about/Ornament4.webp";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[100lvh] md:lg:h-[80lvh] lg:h-[70lvh] w-full font-changa -translate-y-20">
      <main className="text-white flex lg:flex-row lg:gap-4 gap-8 justify-around flex-col items-center lg:pt-52 pt-30">
        <div className="xl:w-xl lg:w-lg w-96 flex flex-col gap-6 mycontainer items-left justify-center">
          <h1 className="font-neighbor lg:text-6xl text-4xl text-left">
            WHAT IS IT FEST?
          </h1>
          <p className="xl:text-2xl/9 md:text-lg text-sm/6 text-justify">
            IT FEST 2025 adalah kompetisi teknologi berskala nasional yang
            mengusung tema “Visionary Design for Technological Breakthrough”. IT
            FEST 2025 mendorong generasi muda untuk menghadirkan solusi
            teknologi yang inovatif dan berdampak ke masa depan.
          </p>
          <p className="xl:text-2xl/9 md:text-lg text-sm/6 text-justify">
            Tahun ini, IT FEST menghadirkan dua cabang lomba utama, yaitu <strong>Business Plan</strong> dan
            <strong> UI/UX Design</strong>. Melalui kompetisi ini, IT FEST menjadi wadah bagi
            talenta muda Indonesia untuk menunjukkan kemampuan terbaik mereka di
            bidang teknologi dan desain.
          </p>
          <div className="w-full flex lg:justify-end justify-center animate-pulse">
            <Image src={Ornament4} alt="ornament" className="w-40 md:w-50 h-10 md:h-15"></Image>
          </div>
        </div>

        <div className="xl:w-140 lg:w-80 w-60 relative">
          <Image src={Ornament2} alt="ornament" draggable={false}></Image>
          <Image
            src={Ornament3}
            alt="ornament"
            className="absolute bottom-0 mx-auto left-0 right-0 xl:w-55 lg:w-52 w-38"
            draggable={false}
          ></Image>
        </div>
      </main>
    </section>
  );
};

export default Hero;
