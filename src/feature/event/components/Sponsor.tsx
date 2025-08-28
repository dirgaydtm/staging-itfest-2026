import Image from "next/image";
import React from "react";
import Tekno from "@/assets/img/event/teknoevent.png";
import TeknoCampus from "@/assets/img/event/teknoeventcampus.png";
import LombaUIUX from "@/assets/img/event/lombauiux.png";
import LombaTekno from "@/assets/img/event/lombatekno.png";
import Hotways from "@/assets/img/event/hotway.png";
import HTS from "@/assets/img/event/hts.png";
import MacroScope from "@/assets/img/event/macroscope.png";
import Idearium from "@/assets/img/event/idearium.png";
import SeedFinance from "@/assets/img/event/seeds.png";

const Sponsor = () => {
  return (
    <div className="w-full bg-[#37176E] mt-10 mb-30 flex justify-center items-center py-6">
      <div className="max-w-screen-lg mx-auto px-10 place-items-center grid grid-cols-2 lg:grid-cols-4 mt-10 gap-6">
        <Image
          className="w-full h-auto object-contain"
          alt="Tekno"
          src={Tekno}
          draggable={false}
        />
        <Image
          className="w-full h-auto object-contain"
          alt="Tekno Campus"
          src={TeknoCampus}
          draggable={false}
        />
        <Image
          className="w-full h-auto object-contain"
          alt="Lomba UI/UX"
          src={LombaUIUX}
          draggable={false}
        />
        <Image
          className="w-full h-auto object-contain"
          alt="Lomba Teknologi"
          src={LombaTekno}
          draggable={false}
        />
        <Image
          className="w-full h-auto object-contain"
          alt="Hotways"
          src={Hotways}
          draggable={false}
        />
        <Image
          className="w-full h-24 object-cover"
          alt="HTS"
          src={HTS}
          draggable={false}
        />
        <Image
          className="w-full h-24 object-cover"
          alt="MacroScope"
          src={MacroScope}
          draggable={false}
        />
        <Image
          className="w-full h-24 object-cover"
          alt="Idearium"
          src={Idearium}
          draggable={false}
        />
        <Image
          className="w-1/3 md:w-1/5 h-auto object-contain mb-6 last:col-span-2 lg:last:col-span-4"
          alt="Seed Finance"
          src={SeedFinance}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Sponsor;
