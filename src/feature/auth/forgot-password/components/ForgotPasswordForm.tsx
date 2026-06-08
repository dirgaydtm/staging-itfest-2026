"use client";
import React, { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { forgotPasswordService } from "@/api/services/forgot-password";

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Email harus diisi");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Format email tidak valid");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPasswordService.requestForgotPassword({
        email: email.trim(),
      });

      if (response.status?.isSuccess) {
        setSuccessMessage(
          "Kode verifikasi telah dikirim ke email Anda. Mengarahkan ke halaman verifikasi..."
        );
        toast.success("Email reset password telah dikirim!");

        setTimeout(() => {
          window.location.href = "/forgot-password/verify-otp";
        }, 2000);
      } else {
        setErrorMessage(
          response.message || "Gagal mengirim email reset password"
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setErrorMessage(msg);
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mycontainer w-full md:w-4/5 lg:w-3/5 p-2 md:p-4">
      <div className="bg-light-active-green/15 border border-white/30 backdrop-blur-md z-10 mt-4 rounded-3xl border-purple-300 p-4 md:p-8 space-y-4 md:space-y-6 font-leaguespartan w-full max-w-xl">
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-400 p-2 md:p-3 rounded-xl text-center text-white text-sm md:text-base">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/20 border border-green-400 p-2 md:p-3 rounded-xl text-center text-white text-sm md:text-base">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <div className="text-center mb-4 md:mb-6">
              <h5 className="font-bold text-3xl">Forgot Password</h5>
              <p>Write your email below</p>
            </div>
            <label
              htmlFor="email"
              className="block text-white font-semibold mb-1 md:mb-2 text-sm md:text-base"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
                if (successMessage) setSuccessMessage("");
              }}
              className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl bg-white/90 text-black placeholder-gray-500 text-sm md:text-base"
              placeholder="Email"
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <Button
            type="submit"
            variant="forauth"
            className="w-full text-sm md:text-xl py-2 md:py-3 mt-8"
            disabled={loading || !email.trim()}
          >
            {loading ? "Mengirim..." : "Submit"}
          </Button>
          <div className="flex justify-center gap-1 text-sm sm:text-base">
            <span>Already have an account?</span>
            <Link
              className="text-glow text-light-active-blue hover:underline"
              href={"/login"}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
