"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FormChipHeader from "../shared/FormChipHeader";

interface SuccesFormProps {
  teamName?: string;
  competitionType?: string;
}

const PendaftaranSelesaiForm: React.FC<SuccesFormProps> = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <FormChipHeader title="Finished" />

      <div className="flex flex-col items-center text-center gap-3 py-4">
        <h3 className="font-leaguespartan font-bold text-xl md:text-2xl text-light-blue">
          Registration Successful!
        </h3>
        <p className="font-leaguespartan text-sm md:text-base text-light-blue max-w-xs">
          Registration payment information is available on the Dashboard
        </p>
      </div>

      <button
        type="button"
        onClick={handleBack}
        className="w-full py-3 rounded-2xl border-[0.5px] border-light-blue bg-light-active-green/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-leaguespartan font-bold text-base text-light-green"
      >
        Back
      </button>
    </>
  );
};

export default PendaftaranSelesaiForm;