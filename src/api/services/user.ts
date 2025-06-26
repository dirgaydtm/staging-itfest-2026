import { apiClient } from "@/api/core/core";
import { Announcement } from "@/feature/_user/dashboard/types/announcement";
import { PostSubmissionsResponse, SubmissionsResponse } from "@/feature/_user/dashboard/types/submission";
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

        if (!response.data) {
            throw new Error("Failed to fetch submissions data");
        }

        return response.data;
    },

    postSubmission: async (gdriveLink: string): Promise<void> => {
        const payload: PostSubmissionsResponse = {
            gdrive_link: gdriveLink
        };

        try {
            await apiClient.post("submissions/", payload);
        } catch (error) {
            throw new Error(`Failed to post submission: ${error}`);
        }
    },

    postPayment: async (formData: FormData): Promise<void> => {
        try {
            await apiClient.post("users/upload-payment", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        } catch (error) {
            throw new Error(`Failed to post payment: ${error}`);
        }
    },

    getAnnouncement: async (): Promise<Announcement[]> => {
        const response = await apiClient.get<Announcement[]>("users/announcement");

        if (!response.data || !Array.isArray(response.data)) {
            throw new Error("Invalid announcement data");
        }

        return response.data;
    }

}

