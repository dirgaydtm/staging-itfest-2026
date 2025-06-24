import React from "react";
import ButtonChoose from "./ButtonChoose";

const ChooseLomba = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full space-y-2">
      <h3 className="font-bold font-changa text-xl">Cabang Lomba</h3>
      <p className="font-normal text-center text-base">
        Pilih diantara 2 cabang lomba yang ingin kamu daftarkan
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-2 md:mt-2 lg:mt-4 active:shadow">
        <ButtonChoose title="UI/UX" />
        <ButtonChoose title="BUSINESS PLAN" />
      </div>
    </section>
  );
};

export default ChooseLomba;
