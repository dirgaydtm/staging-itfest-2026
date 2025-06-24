import React from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import ChooseLomba from "./ChooseLomba";

const PendaftaranForm = ({}) => {
  return (
    <section className="flex flex-col items-center justify-between h-full  ">
      <PageIndex index={1} title="Pilih Lomba" />
      <ChooseLomba/>
      <Button
        type="button"
        size={"normal"}
        className="w-full text-base sm:text-base disabled:opacity-50 -py"
      >
        Pilih Lomba
      </Button>
    </section>
  );
};

export default PendaftaranForm;
