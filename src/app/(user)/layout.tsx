import React from "react";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ProtectedRoute } from "@/shared/components/protected/ProtectedRoutes";
import Navbar from "@/shared/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <ProtectedRoute>
          <Navbar />
          {children}
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
