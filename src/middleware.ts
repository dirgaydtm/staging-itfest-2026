import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import CryptoJS from "crypto-js";

const publicPaths = ["/login", "/register", "/forgot-password", "/", "/home"];
const adminPaths = ["/mangujo/admin"];
const userPaths = ["/dashboard", "/profile"];

interface JWTPayload {
  UserID: string;
  IsAdmin: boolean;
  role?: string;
  exp: number;
  [key: string]: string | boolean | number | undefined;
}

function decryptToken(encryptedToken: string): string | null {
  try {
    const encryptionKey =
      process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "mangujoterbaik";
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths, static files, and API routes
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(path)
    ) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/unauthorized"
  ) {
    return NextResponse.next();
  }

  // Get encrypted token from cookie
  const encryptedToken = request.cookies.get("auth_token")?.value;

  if (!encryptedToken) {
    console.log("No auth token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decrypt token
  const token = decryptToken(encryptedToken);

  if (!token) {
    console.error("Failed to decrypt token");
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Clear invalid cookie
    response.cookies.delete("auth_token");
    return response;
  }

  try {
    // Verify JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = (await jwtVerify(token, secret)) as {
      payload: JWTPayload;
    };

    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      console.log("Token expired");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }

    // Determine user role based on IsAdmin flag
    const isAdmin = payload.IsAdmin === true;
    const userRole = isAdmin ? "admin" : "user";

    // Check admin paths
    if (adminPaths.some((path) => pathname.startsWith(path))) {
      if (!isAdmin) {
        console.log(`Non-admin user trying to access admin path: ${pathname}`);
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Check user paths (both user and admin can access)
    if (userPaths.some((path) => pathname.startsWith(path))) {
      if (!["user", "admin"].includes(userRole)) {
        console.log(
          `Invalid role ${userRole} trying to access user path: ${pathname}`
        );
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // Add user info to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.UserID || "");
    requestHeaders.set("x-user-role", userRole);
    requestHeaders.set("x-is-admin", String(isAdmin));
    requestHeaders.set("x-decrypted-token", token);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("JWT verification failed:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)",
  ],
};
