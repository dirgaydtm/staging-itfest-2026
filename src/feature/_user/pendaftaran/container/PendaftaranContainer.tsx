import React from "react";
import BoardingTemplate from "@/shared/components/onboarding/BoardingTemplate";
import PendaftaranForm from "../components/page1/PendaftaranForm";
import SuccesForm from "../components/page2/SuccesForm";

const OnboardingContainer = () => {
  return (
    <BoardingTemplate>
      <div className="md:mx-4 lg:mx-20 md:py-6 lg:py-12 h-full">
        <SuccesForm/>
      </div>
    </BoardingTemplate>
  );
};

export default OnboardingContainer;
