import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import BackgroundAuth from "@/shared/components/layout/BackgroundAuth";

const ResetPasswordContainer = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-darker-blue relative font-leaguespartan px-4">
      <BackgroundAuth /> 
      <div className="z-10 w-full flex justify-center">
        <ResetPasswordForm />
      </div>
    </main>
  );
};

export default ResetPasswordContainer;