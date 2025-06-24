
import { apiClient } from "../";
import { ApiResponse } from "@/shared/type/TAuth";

export interface BiodataKetuaRequest {
  full_name: string;
  student_number: string;
  university: string;
  major: string;
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
  // Register biodata ketua
  async registerBiodataKetua(
    competitionId: number,
    data: BiodataKetuaRequest
  ): Promise<ApiResponse<BiodataKetuaResponse>> {
    const response = await apiClient.post(
      `/competitions/register/${competitionId}`,
      data
    );
    return response.data;
  }

  // Upload KTM
  async uploadKTM(file: File): Promise<ApiResponse<UploadKTMResponse>> {
    const formData = new FormData();
    formData.append('ktm', file);
    
    const response = await apiClient.post('/competitions/upload-ktm', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Upsert team (add or edit team)
  async upsertTeam(data: UpsertTeamRequest): Promise<ApiResponse<UpsertTeamResponse>> {
    const response = await apiClient.patch('/users/upsert-team', data);
    return response.data;
  }
}

export const pendaftaranService = new PendaftaranService();