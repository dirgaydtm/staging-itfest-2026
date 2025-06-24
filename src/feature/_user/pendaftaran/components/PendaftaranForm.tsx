import React from "react";
import PageIndex from "./PageIndex";
import { Button } from "@/shared/components/ui/Button";

const PendaftaranForm = ({}) => {
  return (
    <section className="flex flex-col items-center justify-between h-full md:mx-4 lg:mx-20 md:py-6 lg:py-12 ">
      <PageIndex index={1} title="Pilih Lomba" />
      <Button
        type="button"
        size={"normal"}
        className="w-full text-base sm:text-base disabled:opacity-50"
      >
        Pilih Lomba
      </Button>     
    </section>
  );
};

export default PendaftaranForm;
