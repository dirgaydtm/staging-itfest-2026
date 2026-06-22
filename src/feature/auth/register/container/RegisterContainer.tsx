import React from "react";
import RegisterForm from "../components/RegisterForm";
import BackgroundAuth from "@/shared/components/layout/BackgroundAuth";

const RegisterContainer = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-darker-blue relative">
      <BackgroundAuth />
      <RegisterForm />
    </section>
  );
};

export default RegisterContainer;
