// src/hooks/useForgotPasswordOtp.ts
import { forgotPasswordService } from "@/api/services/forgot-password";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useForgotPasswordOtp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [expiredError, setExpiredError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const init = () => {
      if (!forgotPasswordService.canAccessOTPPage()) {
        toast.error("Please reset your password first.");
        setHasAccess(false);
        return;
      }
      const rem = forgotPasswordService.getOTPTimeRemaining();
      setTimeLeft(rem);
      setIsPageReady(true);
      if (rem <= 0) {
        toast.warning("Your verification code has expired. Please tap resend to try again.");
        setResendAvailable(true);
      }
    };
    const t = setTimeout(init, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isPageReady || timeLeft <= 0) {
      if (isPageReady && timeLeft <= 0) {
        setExpiredError("Your verification code has expired. Please tap resend to try again.");
        setResendAvailable(true);
      }
      return;
    }
    const timer = setTimeout(() => {
      const rem = forgotPasswordService.getOTPTimeRemaining();
      setTimeLeft(rem);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isPageReady]);

  const clearErrors = () => {
    setErrorMessage("");
    setExpiredError("");
  };

  const verify = async () => {
    const code = otp.join("");
    if (!code) {
      setErrorMessage("Please enter the OTP code");
      return;
    }
    if (code.length !== 6) {
      setErrorMessage("OTP code must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      clearErrors();

      const res = await forgotPasswordService.verifyForgotPasswordOTP(code);
      if (res.status.isSuccess) {
        setVerificationSuccess(true);
        toast.success("OTP verification successful!");
        setTimeout(() => {
          window.location.href = " /forgot-password/reset-password";
        }, 2000);
      } else {
        setErrorMessage(res.message || "OTP verification failed");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "OTP verificatioin failed";

      if (
        msg.toLowerCase().includes("expired") ||
        msg.toLowerCase().includes("kadaluarsa")
      ) {
        setExpiredError("Your verification code has expired. Please tap resend to try again.");
        setResendAvailable(true);
        setTimeLeft(0);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setErrorMessage(msg);
        setOtp(["", "", "", "", "", ""]);
      }
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      setResendLoading(true);
      clearErrors();

      const res = await forgotPasswordService.resendForgotPasswordOTP();
      if (res.status.isSuccess) {
        toast.success("OTP has been resent to your email!");
        const rem = forgotPasswordService.getOTPTimeRemaining();
        setTimeLeft(rem);
        setResendAvailable(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setErrorMessage(res.message || "Failed to resend OTP");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to resend OTP";
      setErrorMessage(msg);
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return {
    otp,
    setOtp,
    timeLeft,
    isPageReady,
    hasAccess,
    resendAvailable,
    loading,
    resendLoading,
    expiredError,
    verificationSuccess,
    errorMessage,
    verify,
    resend,
    formatTime,
    clearErrors,
  };
}
