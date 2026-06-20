"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  requireAdmin?: boolean;
  userOnly?: boolean;
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  userOnly = false,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, IsAdmin } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setAssetsLoaded(true);
      return;
    }
    const handleLoad = () => setAssetsLoaded(true);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const checkAuthorization = useCallback(() => {
    if (loading) {
      return;
    }
    setIsChecking(true);
    try {
      if (!isAuthenticated) {
        setIsAuthorized(false);
        router.push(fallbackPath);
        return;
      }
      if (userOnly && IsAdmin) {
        setIsAuthorized(false);
        router.push("/mangujo/admin/dashboard");
        return;
      }
      if (requireAdmin && !IsAdmin) {
        setIsAuthorized(false);
        router.push("/unauthorized");
        return;
      }
      setIsAuthorized(true);
    } catch (error) {
      console.error("Authorization check error:", error);
      setIsAuthorized(false);
      router.push(fallbackPath);
    } finally {
      setIsChecking(false);
    }
  }, [
    loading,
    isAuthenticated,
    IsAdmin,
    requireAdmin,
    userOnly,
    fallbackPath,
    router,
  ]);

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  if (loading || isChecking || isAuthorized === null || !assetsLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-darker-blue">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}