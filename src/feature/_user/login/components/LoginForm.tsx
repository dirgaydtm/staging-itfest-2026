import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import Link from "next/link";
import { useTogglePassword } from "../../register/hooks/useTogglePassword";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  logout: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  loading,
  isAuthenticated,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      redirect("/home");
    }
  }, [isAuthenticated, redirect]);
  const passwordToggle = useTogglePassword();
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-green-500 shadow-lg rounded-3xl border-[3px] border-green-300 p-8 text-center transform transition-all scale-100 hover:scale-105">
          <div className="flex justify-center mb-2">
            <svg
              className="w-12 h-12 text-white animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m-6 6h6m-3 3a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            Login Berhasil!
          </h2>
          <p className="text-green-100 mb-4 text-lg font-medium">
            Mengalihkan ke halaman Home...
          </p>
          <div className="animate-spin w-8 h-8 border-b-4 border-white rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-400 space-y-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-2/5 rounded-3xl border-[3px] font-changa border-purple-300 p-6 sm:p-8 md:p-10 relative z-10 mt-4 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-200 text-sm bg-red-500/20 p-3 rounded border border-red-300/20">
            <div className="font-semibold">❌ Error:</div>
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm sm:text-base">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full"
            variant="primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm sm:text-base">
            Password
          </label>
          <div className="relative">
            <Input
              type={passwordToggle.isVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full pr-12"
              variant="primary"
            />
            <button
              type="button"
              onClick={passwordToggle.toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {passwordToggle.isVisible ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="text-sm text-right sm:text-sm text-white/80 text-glow">
          <Link href={"/forgot-password"} className="text-[#85FFF5]">
            Forgot password?
          </Link>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="normal"
            disabled={loading || !email || !password || isAuthenticated}
            className="w-full"
          >
            {loading
              ? "Logging in..."
              : isAuthenticated
              ? "Already Logged In"
              : "Login"}
          </Button>
        </div>

        <div className="flex justify-center gap-1 text-sm sm:text-base">
          <span>Belum punya akun?</span>
          <Link
            className="text-glow text-[#85FFF5] hover:underline"
            href={"/register"}
          >
            Daftar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
