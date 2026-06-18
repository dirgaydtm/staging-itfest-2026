import React, {
  ClipboardEvent,
  KeyboardEvent,
  RefObject,
  useState,
  useEffect,
} from "react";
import { Button } from "@/shared/components/ui/Button";
import {
  ForgotPasswordResendButton,
  RegistrationResendButton,
} from "@/shared/components/ResendButton";

interface Props {
  verificationSuccess?: boolean;
  otp: string[];
  timeLeft: number;
  isPageReady: boolean;
  hasAccess: boolean;
  resendAvailable: boolean;
  loading: boolean;
  resendLoading: boolean;
  expiredError: string;
  errorMessage?: string;
  formatTime(sec: number): string;
  onChange(idx: number, v: string): void;
  onKeyDown(idx: number, e: KeyboardEvent<HTMLInputElement>): void;
  onPaste(e: ClipboardEvent<HTMLInputElement>): void;
  onVerify(): void;
  onResend(): void;
  inputRefs: RefObject<HTMLInputElement | null>[];
  clearErrors?: () => void;

  type?: "registration" | "forgot-password";
}

export const OtpForm: React.FC<Props> = ({
  verificationSuccess,
  otp,
  timeLeft,
  isPageReady,
  hasAccess,
  resendAvailable,
  loading,
  resendLoading,
  expiredError,
  errorMessage,
  formatTime,
  onChange,
  onKeyDown,
  onPaste,
  onVerify,
  onResend,
  inputRefs,
  clearErrors,
  type = "registration",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (verificationSuccess) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 2 : 100));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [verificationSuccess]);

  const handleInputChange = (index: number, value: string) => {
    if (clearErrors && (errorMessage || expiredError)) {
      clearErrors();
    }
    onChange(index, value);
  };

  const isExpired = timeLeft <= 0 || expiredError;

  if (!isPageReady && hasAccess)
    return (
      <div className="flex items-center justify-center">
        <span className="animate-spin w-8 h-8 border-b-2 border-white rounded-full" />
        <p className="text-white ml-2">Loading...</p>
      </div>
    );

  if (!hasAccess) {
    const redirectPath =
      type === "forgot-password" ? "/forgot-password" : "/register";
    const actionText =
      type === "forgot-password" ? "reset password" : "pendaftaran";
    const buttonText =
      type === "forgot-password"
        ? "Kembali ke reset password"
        : "Kembali ke halaman daftar";

    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-blue-400 rounded-3xl border-[3px] border-purple-300 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Akses Ditolak</h2>
          <p className="text-purple-100 mb-4">
            Silakan lakukan {actionText} terlebih dahulu.
          </p>
          <a
            href={redirectPath}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
          >
            {buttonText}
          </a>
        </div>
      </div>
    );
  }

  if (verificationSuccess) {
    const successMessage =
      type === "forgot-password"
        ? "Verifikasi berhasil! Silakan reset password Anda."
        : "Verifikasi Berhasil!";

    const redirectMessage =
      type === "forgot-password"
        ? "Mengalihkan ke halaman reset password..."
        : "Mengalihkan ke halaman login...";

    return (
      <div className="flex items-center justify-center z-50">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl scale-110"></div>

          <div className="relative bg-green-800/90 backdrop-blur-sm border border-green-700/50 rounded-2xl p-8 text-center shadow-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 p-[1px] bg-[length:200%_100%] animate-pulse">
              <div className="h-full w-full rounded-2xl bg-green-800/90"></div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-green-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 animate-spin">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2"></div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-white mb-2">
                {successMessage}
              </h2>
              <p className="text-green-100 mb-4 text-lg font-medium">
                {redirectMessage}
              </p>

              <div className="w-48 mx-auto">
                <div className="h-1 bg-green-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-green-300 font-leaguespartan">
                  {progress}% Complete
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-green-400/30 rounded-full animate-pulse"
                    style={{
                      height: Math.random() * 12 + 8,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main OTP form
  const instructionText =
    type === "forgot-password"
      ? "We've sent a 6-digit reset password code to your email."
      : "We've sent a 6-digit verification code to your email.";

  const buttonText = "Submit";
  const buttonLoadingText =
    type === "forgot-password" ? "Verifying Code..." : "Verifying...";

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-light-active-green/15 border border-white/30 backdrop-blur-md z-10 rounded-3xl p-8 space-y-6 font-leaguespartan">
        <div className="text-center">
          <h5 className="text-3xl font-bold">Email Verification</h5>
          <span>Enter the 6-digit code sent to your email</span>
        </div>
        {/* Instruction or Expired Message */}
        {isExpired ? (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center">
            <p className="text-white font-bold">
              {expiredError || "Kode OTP telah kadaluarsa!"}
            </p>
            <p className="text-red-100 text-sm mt-1">
              Please resend the OTP code to continue the verification.
            </p>
          </div>
        ) : (
          <div className="bg-green-400/20 border border-green-400 p-3 rounded-xl text-center">
            <p className="text-purple-100 mb-1">{instructionText}</p>
            <p className="font-bold text-yellow-500">
              Expired in: {formatTime(timeLeft)}
            </p>
          </div>
        )}

        {/* Error Messages (only for non-expired errors) */}
        {!isExpired && errorMessage && (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white">
            {errorMessage}
          </div>
        )}

        {/* OTP Input Fields - only show when not expired */}
        {!isExpired && (
          <div className="flex justify-center gap-2">
            {otp.map((d, i) => (
              <div key={i} className="relative">
                <input
                  ref={inputRefs[i] || null}
                  type="text"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  onPaste={onPaste}
                  className={`w-12 h-15 text-center text-xl text-black bg-white/90 border-2 rounded-xl focus:ring-purple-200 transition-colors font-semibold ${
                    errorMessage
                      ? "border-red-400 focus:border-red-500"
                      : "border-purple-300 focus:border-purple-500"
                  }`}
                  placeholder=""
                  autoComplete="one-time-code"
                  disabled={loading || resendLoading}
                />
                {!d && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-2 h-2 bg-black rounded-full opacity-30"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Verify Button - only show when not expired */}
        {!isExpired && (
          <Button
            variant="forauth"
            className="w-full"
            disabled={loading || otp.join("").length !== 6}
            onClick={onVerify}
          >
            {loading ? buttonLoadingText : buttonText}
          </Button>
        )}

        {/* Resend Button Section - always show but with different logic */}
        {type === "registration" ? (
          <RegistrationResendButton
            resendAvailable={resendAvailable || isExpired}
            resendLoading={resendLoading}
            timeLeft={timeLeft}
            onResend={onResend}
            formatTime={formatTime}
            variant="outline"
            size="md"
            className="w-full"
            showTimeRemaining={!resendAvailable && !isExpired}
          />
        ) : (
          <ForgotPasswordResendButton
            resendAvailable={resendAvailable || isExpired}
            resendLoading={resendLoading}
            timeLeft={timeLeft}
            onResend={onResend}
            formatTime={formatTime}
            variant="outline"
            size="md"
            className="w-full"
            showTimeRemaining={!resendAvailable && !isExpired}
          />
        )}
      </div>
    </div>
  );
};
