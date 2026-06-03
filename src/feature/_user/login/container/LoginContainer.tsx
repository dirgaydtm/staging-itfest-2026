"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
import Stars from "@/feature/hero/components/Stars";

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
      <Stars />
    </section>
  );
};

export default LoginContainer;
