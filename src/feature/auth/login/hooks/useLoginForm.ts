"use client";

import React from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { authService } from "@/api/services/auth";

export const useLoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const { login, loading, user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await login(email, password);
      
      // Wait a bit to ensure token is saved
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Check if user is admin after successful login
      const isAdmin = authService.IsAdmin();
      
      console.log("Login successful, isAdmin:", isAdmin); // Debug log
      
      // Use window.location.href for full page reload to ensure middleware catches it
      if (typeof window !== "undefined") {
        if (isAdmin) {
          console.log("Redirecting to admin dashboard"); // Debug log
          window.location.href = "/mangujo/admin/dashboard";
        } else {
          console.log("Redirecting to user dashboard"); // Debug log
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      const errorMsg = (error as Error).message || "Login failed. Please try again.";
      
      // Check if error is due to email not verified
      if (errorMsg === "EMAIL_NOT_VERIFIED") {
        // Redirect to OTP page
        router.push("/otp");
      } else {
        setError(errorMsg);
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return {
    email,
    password,
    error,

    loading,
    user,
    isAuthenticated,

    setEmail,
    setPassword,
    setError,
    handleSubmit,
    logout,
    resetForm,
  };
};
