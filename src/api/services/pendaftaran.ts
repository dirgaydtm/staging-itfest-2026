import { apiClient } from "../core/core";
import { ApiResponse } from "@/shared/type/TAuth";
import { AxiosError } from "axios";

export interface BiodataKetuaRequest {
  full_name: string;
  student_number: string;
  university: string;
  phone_number: string;
}

export interface TeamMember {
  name: string;
  student_number: string;
}

export interface UpsertTeamRequest {
  team_name: string;
  members: TeamMember[];
}

export interface BiodataKetuaResponse {
  id: string;
  full_name: string;
  student_number: string;
  university: string;
  major: string;
  created_at: string;
}

export interface UploadKTMResponse {
  id: string;
  file_url: string;
  uploaded_at: string;
}

export interface UpsertTeamResponse {
  team_id: string;
  team_name: string;
  members: TeamMember[];
  created_at: string;
}

class PendaftaranService {
  private static instance: PendaftaranService;

  public static getInstance(): PendaftaranService {
    if (!PendaftaranService.instance) {
      PendaftaranService.instance = new PendaftaranService();
    }
    return PendaftaranService.instance;
  }

  // Register biodata ketua
  async registerBiodataKetua(
    competitionId: number,
    data: BiodataKetuaRequest
  ): Promise<ApiResponse<BiodataKetuaResponse>> {
    try {
      const response = await apiClient.post<BiodataKetuaResponse>(
        `/competitions/register/${competitionId}`,
        data
      );
      
      if (response.status.isSuccess) {
        return response;
      }
      
      throw new Error(response.message || "Gagal menyimpan biodata ketua");
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat menyimpan biodata ketua";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.message || err.response?.data?.data;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        } else if (Array.isArray(apiMessage)) {
          errorMessage = apiMessage.join(", ");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    }
  }

  // Upload KTM
  async uploadKTM(file: File): Promise<ApiResponse<UploadKTMResponse>> {
    try {
      const formData = new FormData();
      formData.append('ktm', file);
      
      const response = await apiClient.post<UploadKTMResponse>(
        '/competitions/upload-ktm', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.status.isSuccess) {
        return response;
      }
      
      throw new Error(response.message || "Gagal mengupload KTM");
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat mengupload KTM";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.message || err.response?.data?.data;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        } else if (Array.isArray(apiMessage)) {
          errorMessage = apiMessage.join(", ");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    }
  }

  // Upsert team (add or edit team)
  async upsertTeam(data: UpsertTeamRequest): Promise<ApiResponse<UpsertTeamResponse>> {
    try {
      const response = await apiClient.patch<UpsertTeamResponse>(
        '/users/upsert-team', 
        data
      );
      
      if (response.status.isSuccess) {
        return response;
      }
      
      throw new Error(response.message || "Gagal menyimpan data tim");
    } catch (err) {
      let errorMessage = "Terjadi kesalahan saat menyimpan data tim";

      if (err instanceof AxiosError) {
        const apiMessage = err.response?.data?.message || err.response?.data?.data;
        if (typeof apiMessage === "string") {
          errorMessage = apiMessage;
        } else if (Array.isArray(apiMessage)) {
          errorMessage = apiMessage.join(", ");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      throw new Error(errorMessage);
    }
  }
}

export const pendaftaranService = PendaftaranService.getInstance();