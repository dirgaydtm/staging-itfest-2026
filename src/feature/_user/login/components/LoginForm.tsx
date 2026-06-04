import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import Link from "next/link";
import { useTogglePassword } from "../../register/hooks/useTogglePassword";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, redirect]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  const passwordToggle = useTogglePassword();
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl scale-110"></div>

          {/* Main container */}
          <div className="relative bg-green-800/90 backdrop-blur-sm border border-green-700/50 rounded-2xl p-8 text-center shadow-2xl">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 p-[1px] bg-[length:200%_100%] animate-pulse">
              <div className="h-full w-full rounded-2xl bg-green-800/90"></div>
            </div>

            <div className="relative z-10">
              {/* Success icon */}
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
                  {/* Orbiting dots */}
                  <div className="absolute inset-0 animate-spin">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-48 mx-auto">
                <div className="h-1 bg-green-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-green-300 font-mono">
                  {progress}% Complete
                </div>
              </div>

              {/* Subtle data stream effect */}
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
  return (
    <div className="bg-light-active-green/15 border border-white/30 backdrop-blur-md space-y-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-2/5 rounded-3xl font-leaguespartan p-6 sm:p-8 md:p-10 relative z-10 mt-4 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-200 text-sm bg-red-500/20 p-3 rounded border border-red-300/20">
            <div className="font-semibold">❌ Error:</div>
            {error}
          </div>
        )}

        <div className="space-y-2">
          <h5 className="text-4xl text-center font-bold leading-16">Sign In</h5>
          <label htmlFor="email" className="block text-sm sm:text-base">
            Email
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
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
              placeholder="Password"
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

        <div className="text-sm text-right sm:text-sm">
          <Link href={"/forgot-password"} className="text-light-active-blue hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="forauth"
            size="normal"
            disabled={loading || !email || !password || isAuthenticated}
            className="w-full"
          >
            {loading
              ? "Logging in..."
              : isAuthenticated
              ? "Already Logged In"
              : "Sign In"}
          </Button>
        </div>

        <div className="flex justify-center gap-1 text-sm sm:text-base">
          <span>Don’t have an account?</span>
          <Link
            className="text-glow text-light-active-blue hover:underline"
            href={"/register"}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
