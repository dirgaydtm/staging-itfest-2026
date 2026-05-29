"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
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
    <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-900 relative">
      <div className="font-changa text-center text-white mb-6 z-20">
        <h5 className="text-4xl font-bold leading-16">Masuk</h5>
        <span className="text-lg">Akses Akunmu</span>
      </div>
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
