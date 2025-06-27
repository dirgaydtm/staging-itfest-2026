import { ApiResponse, BlobResponse } from "@/shared/type/TAuth";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

class Core {
  private client: AxiosInstance;
  private static instance: Core;
  private readonly encryptionKey =
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "mangujoterbaik";

  private constructor() {
    this.client = axios.create({
      baseURL: "https://backend.itfest-filkom.com/api/v1",
      timeout: 40000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): Core {
    if (!Core.instance) {
      Core.instance = new Core();
    }
    return Core.instance;
  }

  private encryptToken(token: string): string {
    try {
      return CryptoJS.AES.encrypt(token, this.encryptionKey).toString();
    } catch (error) {
      console.error("Token encryption failed:", error);
      throw new Error("Token encryption failed");
    }
  }

  private decryptToken(encryptedToken: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.encryptionKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedToken) {
        throw new Error("Failed to decrypt token");
      }

      return decryptedToken;
    } catch (error) {
      console.error("Token decryption failed:", error);
      throw new Error("Token decryption failed");
    }
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.responseType === "blob") {
          config.headers["Accept"] = "application/octet-stream";
        }

        config.headers["X-Request-Time"] = Date.now().toString();

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = this.getAuthToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    try {
      const encryptedToken = Cookies.get("auth_token");
      if (encryptedToken) {
        try {
          return this.decryptToken(encryptedToken);
        } catch (error) {
          console.error("Failed to decrypt stored token:", error);
          this.handleAuthError();
          return null;
        }
      }
    } catch (error) {
      console.error("Failed to get token from cookies:", error);
    }
    return null;
  }

  private setAuthTokens(token: string): void {
    try {
      const encryptedToken = this.encryptToken(token);

      Cookies.set("auth_token", encryptedToken, {
        expires: 1 / 12,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    } catch (error) {
      console.error("Failed to encrypt and store tokens:", error);
      throw new Error("Failed to store authentication tokens");
    }
  }

  private handleAuthError(): void {
    try {
      // Remove auth-related cookies
      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      Cookies.remove("user_data", { path: "/" });

      // Redirect to login if we're on the client side
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during auth cleanup:", error);
    }
  }

  public getDecryptedToken(): string | null {
    return this.getAuthToken();
  }

  public setEncryptedAuthTokens(token: string): void {
    this.setAuthTokens(token);
  }

  // Helper method to check if user is authenticated
  public isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }

  // Method to manually logout (clear tokens)
  public logout(): void {
    this.handleAuthError();
  }

  // Add specific method for blob downloads
  public async getBlob(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BlobResponse> {
    const response = await this.client.get(url, {
      ...config,
      responseType: "blob",
      headers: {
        ...config?.headers,
        Accept: "application/octet-stream",
      },
    });

    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
    };
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  private handleApiError(error: unknown, suppressConsole = true): Error {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      if (!suppressConsole) {
        console.error("API Error:", {
          status: error.response?.status,
          message: errorMessage,
          url: error.config?.url,
        });
      }

      return new Error(errorMessage);
    }

    if (!suppressConsole) {
      console.error("Unexpected error:", error);
    }

    return new Error("An unexpected error occurred");
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }
}

export const apiClient = Core.getInstance();
