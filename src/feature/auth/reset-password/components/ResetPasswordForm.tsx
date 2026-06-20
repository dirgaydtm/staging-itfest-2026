"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { forgotPasswordService } from "@/api/services/forgot-password";
import { Eye, EyeOff } from "lucide-react";
import { useTogglePassword } from "@/feature/auth/register/hooks/useTogglePassword";

const ResetPasswordForm = () => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const passwordToggle = useTogglePassword();
  const confirmPassToggle = useTogglePassword();

  // Validasi akses halaman
  useEffect(() => {
    const forgotPassData = forgotPasswordService.getForgotPasswordData();
    if (!forgotPassData?.isOTPVerified || !forgotPassData) {
      window.location.href = "/login";
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPass.trim()) {
      setErrorMessage("Silakan masukkan password.");
      return;
    }
    if (newPass.length < 6) {
      setErrorMessage("Panjang password minimal 6 karakter.");
      return;
    }
    if (newPass !== confirmPass) {
      setErrorMessage("Konfirmasi password tidak sesuai.");
      return;
    }
    
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await forgotPasswordService.resetPass({
        password: newPass,
        confirm_password: confirmPass,
      });

      if (res?.status?.isSuccess) {
        window.location.href = "/login";
      } else {
        setErrorMessage(res?.message || "Reset password gagal.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan sistem saat mereset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="bg-light-active-green/15 border border-white/30 backdrop-blur-md w-full max-w-xl rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6"
    >
      <div className="text-center mb-4">
        <h4 className="font-bold text-3xl md:text-4xl text-white mb-2">
          Reset Password
        </h4>
        <p className="text-white/80 text-sm md:text-base">
          Use a new password
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white text-sm md:text-base relative">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="absolute top-1/2 -translate-y-1/2 right-3 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="newPass" className="block text-white text-sm md:text-base">
          New Password
        </label>
        <div className="relative">
          <Input
            type={passwordToggle.isVisible ? "text" : "password"}
            id="newPass"
            name="newPass"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder="Masukkan password baru"
            className="w-full pr-12"
            variant="primary"
            required
          />
          <button
            type="button"
            onClick={passwordToggle.toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            tabIndex={-1}
          >
            {passwordToggle.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPass" className="block text-white text-sm md:text-base">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            type={confirmPassToggle.isVisible ? "text" : "password"}
            id="confirmPass"
            name="confirmPass"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder="Konfirmasi password Anda"
            className="w-full pr-12"
            variant="primary"
            required
          />
          <button
            type="button"
            onClick={confirmPassToggle.toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            tabIndex={-1}
          >
            {confirmPassToggle.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="forauth"
          className="w-full py-3 text-base md:text-lg"
          disabled={loading || !newPass.trim() || !confirmPass.trim()}
        >
          {loading ? "Memproses…" : "Reset Password"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;