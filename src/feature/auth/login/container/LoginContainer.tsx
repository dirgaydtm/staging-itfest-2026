"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
import BackgroundAuth from "@/shared/components/layout/BackgroundAuth";
// import Stars from "@/feature/hero/components/Stars";

const LoginContainer = () => {
  const {
    email,
    password,
    error,
    loading,
    isAuthenticated,
    setEmail,
    setPassword,
    handleSubmit,
    logout,
  } = useLoginForm();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-darker-blue relative">
      <BackgroundAuth />
      <LoginForm
        email={email}
        password={password}
        error={error}
        loading={loading}
        isAuthenticated={isAuthenticated}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        logout={logout}
      />
      {/* <Stars /> */}
    </section>
  );
};

export default LoginContainer;
