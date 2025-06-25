import { participantService, TeamInformationData } from "@/api/services/admin";
import { useState, useEffect, useCallback } from "react";

interface UseTeamInformationReturn {
  teamInformationData: TeamInformationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeamInformation = (team_id: string): UseTeamInformationReturn => {
  const [teamInfo, setTeamInfo] = useState<TeamInformationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamInformationData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await participantService.getTeamInformation(team_id);

      if (response.status.isSuccess && response.data) {
        setTeamInfo(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team information"
      );
      console.error("Error fetching team information:", err);
    } finally {
      setLoading(false);
    }
  }, [team_id]);

  const refetch = useCallback(async () => {
    await fetchTeamInformationData();
  }, [fetchTeamInformationData]);

  useEffect(() => {
    fetchTeamInformationData();
  }, [fetchTeamInformationData]);

  return {
    teamInformationData: teamInfo,
    loading,
    error,
    refetch,
  };
};