"use client";

import { useState, useEffect, useCallback } from "react";
import { teamsService, TeamStagesData } from "@/api/services/admin";

interface UseTeamStagesReturn {
  stagesData: TeamStagesData | null;
  stagesLoading: boolean;
  stagesError: string | null;
  stagesRefetch: () => Promise<void>;
}

export const useTeamStages = (team_id: string): UseTeamStagesReturn => {
  const [stagesData, setStagesData] = useState<TeamStagesData | null>(null);
  const [stagesLoading, setLoading] = useState(true);
  const [stagesError, setError] = useState<string | null>(null);

  const fetchStagesData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teamsService.getTeamStages(team_id);

      if (response.status.isSuccess && response.data) {
        setStagesData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team stages"
      );
      console.error("Error fetching team stages:", err);
    } finally {
      setLoading(false);
    }
  }, [team_id]);

  const stagesRefetch = useCallback(async () => {
    await fetchStagesData();
  }, [fetchStagesData]);

  useEffect(() => {
    fetchStagesData();
  }, [fetchStagesData]);

  return {
    stagesData,
    stagesLoading,
    stagesError,
    stagesRefetch,
  };
};