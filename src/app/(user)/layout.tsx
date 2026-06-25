import React from "react";
import { ProtectedRoute } from "@/shared/components/protected/ProtectedRoutes";
import Navbar from "@/shared/components/Navbar";
// import Stars from "@/feature/hero/components/Stars";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute userOnly={true}>
      {/* <Stars /> */}
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}