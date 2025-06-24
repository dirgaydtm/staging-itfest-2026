"use client";

import { useState } from "react";
import { teamsService, SubmissionStatus } from "@/api/services/admin";

interface UseTeamStagesStatusReturn {
  updateStatus: (stageId: number, status: SubmissionStatus) => Promise<void>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeamStagesStatus = (
  team_id: string,
  onSuccess?: () => Promise<void>
): UseTeamStagesStatusReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (stageId: number, status: SubmissionStatus) => {
    try {
      setLoading(true);
      setError(null);

      await teamsService.updateStageStatus(team_id, stageId, status);
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        await onSuccess();
      }

    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : `Failed to update stage status to ${status}`
      );
      console.error(`Error updating stage status to ${status}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to refetch data'
      );
      console.error('Error refetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStatus,
    loading,
    error,
    refetch
  };
};