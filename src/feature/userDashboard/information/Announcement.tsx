"use client";

import { useAnnouncement } from "../hooks/useAnnouncement";
import DashboardCard from "../layout/DashboardCard";
import { useDashboardTheme } from "../layout/DashboardThemeContext";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Announcement = () => {
  const { data, loading, error } = useAnnouncement();
  const { theme } = useDashboardTheme();

  const displayedAnnouncements = data
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date_announcement).getTime() -
        new Date(a.date_announcement).getTime()
    )
    .slice(0, 5);

  return (
    <DashboardCard title="Announcement" className="flex flex-col">
      <div className="flex-1 flex flex-col">
        {loading ? (
          <p className="text-center text-sm text-light-blue/60">Loading...</p>
        ) : error ? null : displayedAnnouncements.length > 0 ? (
          <ul className="space-y-3">
            {displayedAnnouncements.map((item) => (
              <li
                key={item.id_announcement}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {item.message_announcement}
                </p>
                <p className={`mt-2 text-xs text-right ${theme.accentText}`}>
                  {formatDate(item.date_announcement)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-light-blue/60">
            No announcements yet...
          </p>
        )}

        <p className="mt-6 text-xs sm:text-sm text-center">
          <span className="text-light-blue/60">Stay tuned at our social media </span>
          <span className={`font-semibold ${theme.accentText}`}>
            @itfest_filkom
          </span>
        </p>
      </div>
    </DashboardCard>
  );
};

export default Announcement;