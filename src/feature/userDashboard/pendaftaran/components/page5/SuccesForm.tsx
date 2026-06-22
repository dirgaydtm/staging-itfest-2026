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
      <FormChipHeader title="FINISHED" />

      <div className="flex flex-col items-center text-center gap-3 py-4">
        <h3 className="font-leaguespartan font-bold text-xl md:text-2xl text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
          Registration Successful!
        </h3>
        <p className="font-leaguespartan text-sm md:text-base text-slate-300/90 max-w-xs leading-relaxed">
          Registration payment information is available on the Dashboard
        </p>
      </div>

      <button
        type="button"
        onClick={handleBack}
        className="w-full py-2.5 rounded-xl border bg-white/15 border-white/30 hover:bg-white/25 text-white active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md font-leaguespartan font-semibold text-sm tracking-wide transition-all duration-300"
      >
        Back to Dashboard
      </button>
    </>
  );
};

export default PendaftaranSelesaiForm;