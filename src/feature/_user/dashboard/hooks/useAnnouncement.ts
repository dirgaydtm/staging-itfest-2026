import { useEffect, useState } from "react";
import { userService } from "@/api/services/user";
import { Announcement } from "@/feature/_user/dashboard/types/announcement";

export const useAnnouncement = () => {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncement = async () => {
    try {
      const response = await userService.getAnnouncement(); // <- langsung array
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return { data, loading, error };
};
