import React from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import InformartionSucces from "./InformartionSucces";

const SuccesForm = () => {
  return (
    <section className="flex flex-col items-center justify-between h-full  ">
      <PageIndex index={5} title="Selesai" />
      <InformartionSucces />
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        <Button
          type="button"
          size={"normal"}
          className="w-full text-base sm:text-base disabled:opacity-50 -py-12"
        >
          Kembali
        </Button>
        <Button
          type="button"
          variant={"tertiary"}
          className="w-full text-base sm:text-base disabled:opacity-50 -py-12"
        >
          Kembali
        </Button>
      </div>
    </section>
  );
};

export default SuccesForm;
