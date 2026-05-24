import { useEffect, useState } from "react";
import { userService } from "@/api/services/user";
import { SubmissionsResponse } from "../types/submission";

export const useSubmissions = () => {
  const [data, setData] = useState<SubmissionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const submissionsData = await userService.getSubmissions();
      setData(submissionsData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchSubmissions,
  };
};
