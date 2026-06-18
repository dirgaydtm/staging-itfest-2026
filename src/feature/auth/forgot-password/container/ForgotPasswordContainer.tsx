import React from "react";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import BackgroundAuth from "@/shared/components/layout/BackgroundAuth";

const ForgotPasswordContainer = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-darker-blue relative font-changa">
      <BackgroundAuth />
      <ForgotPasswordForm />
    </main>
  );
};

export default ForgotPasswordContainer;
