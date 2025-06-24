import React from "react";
import BoardingTemplate from "@/shared/components/onboarding/BoardingTemplate";
import PendaftaranForm from "../components/page1/PendaftaranForm";

const OnboardingContainer = () => {
  return (
    <BoardingTemplate>
      <div className="md:mx-4 lg:mx-20 md:py-6 lg:py-12 h-full">
        <PendaftaranForm />
      </div>
    </BoardingTemplate>
  );
};

export default OnboardingContainer;
