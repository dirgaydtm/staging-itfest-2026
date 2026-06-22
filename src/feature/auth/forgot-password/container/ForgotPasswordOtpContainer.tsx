import { ForgotPasswordOTPPage } from "@/feature/auth/forgot-password/components/ForgotPasswordOtp";
import BackgroundAuth from "@/shared/components/layout/BackgroundAuth";
import React from "react";

const ForgotPasswordOtpContainer = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-darker-blue relative font-leaguespartan">
      <BackgroundAuth />
      <ForgotPasswordOTPPage />
    </main>
  );
};

export default ForgotPasswordOtpContainer;
