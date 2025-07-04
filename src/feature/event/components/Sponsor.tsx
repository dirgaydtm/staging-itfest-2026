import Image from "next/image";
import React from "react";
import Tekno from "@/assets/img/event/teknoevent.png";
import TeknoCampus from "@/assets/img/event/teknoeventcampus.png";
import LombaUIUX from "@/assets/img/event/lombauiux.png";
import LombaTekno from "@/assets/img/event/lombatekno.png";

const Sponsor = () => {
  return (
    <div className="w-full bg-[#37176E] mt-10 flex justify-center items-center py-6">
      <div className="max-w-screen-lg flex flex-wrap justify-center gap-6">
        <Image className="w-1/3 sm:w-1/4 md:w-1/6" alt="Tekno" src={Tekno} draggable={false}/>
        <Image className="w-1/3 sm:w-1/4 md:w-1/6" alt="Tekno Campus" src={TeknoCampus} draggable={false}/>
        <Image className="w-1/3 sm:w-1/4 md:w-1/6" alt="Lomba UI/UX" src={LombaUIUX} draggable={false}/>
        <Image className="w-1/3 sm:w-1/4 md:w-1/6" alt="Lomba Teknologi" src={LombaTekno} draggable={false}/>
      </div>
    </div>
  );
};

export default Sponsor;
