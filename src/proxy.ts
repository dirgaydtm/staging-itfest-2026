import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import CryptoJS from "crypto-js";

const publicPaths = ["/login", "/register", "/forgot-password", "/otp", "/"];
const adminPaths = ["/mangujo/admin"];
const userPaths = ["/dashboard", "/profile"];

function decryptToken(encryptedToken: string): string | null {
  try {
    const encryptionKey =
      process.env.ENCRYPTION_KEY || "mangujoterbaikmagelangan";
    const bytes = CryptoJS.AES.decrypt(encryptedToken, encryptionKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedToken) {
      throw new Error("Failed to decrypt token");
    }

    return decryptedToken;
  } catch (error) {
    console.error("Token decryption failed:", error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths and static files
  if (
    publicPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  console.log("[Middleware] Checking path:", pathname); // Debug log

  // mengambil decrypted token dari cookie atau header
  let encryptedToken = request.cookies.get("auth_token")?.value;

  if (!encryptedToken) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      encryptedToken = authHeader.replace("Bearer ", "");
    }
  }

  if (!encryptedToken) {
    console.log("[Middleware] No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decrypt token
  const token = decryptToken(encryptedToken);

  if (!token) {
    console.error("[Middleware] Failed to decrypt token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "itfest2026");
    const { payload } = await jwtVerify(token, secret);

    const isAdmin = payload.IsAdmin === true;
    console.log("[Middleware] User isAdmin:", isAdmin, "accessing:", pathname); // Debug log

    // Check admin paths - only admins can access
    if (adminPaths.some((path) => pathname.startsWith(path))) {
      if (!isAdmin) {
        console.log("[Middleware] Non-admin trying to access admin path");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Check user paths - only regular users can access, not admins
    if (userPaths.some((path) => pathname.startsWith(path))) {
      console.log("[Middleware] Checking user path, isAdmin:", isAdmin); // Debug log
      if (isAdmin) {
        console.log("[Middleware] Admin trying to access user dashboard, redirecting");
        // Redirect admin to admin dashboard if trying to access user dashboard
        return NextResponse.redirect(new URL("/mangujo/admin/dashboard", request.url));
      }
    }

    // Add decrypted token to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-decrypted-token", token);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("[Middleware] JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
