import { apiClient } from "@/api/core/core";
import {  SubmissionsResponse } from "@/feature/_user/dashboard/types/submission";
import { TeamProfileResponse } from "@/feature/_user/dashboard/types/teamProfile";

export const userService = {
    getMyTeamProfile: async (): Promise<TeamProfileResponse> => {
        const response = await apiClient.get<TeamProfileResponse>("users/my-team-profile");
        if (!response.data) {
            throw new Error("Failed to fetch team profile data");
        }
        return response.data;
    },

    getSubmissions: async (): Promise<SubmissionsResponse> => {
        const response = await apiClient.get<SubmissionsResponse>("users/progress");
        console.log('Submissions Response:', response);
        
        if (!response.data) {
            throw new Error("Failed to fetch submissions data");
        }
        
        return response.data;
    },

};