"use client";

import { useEffect, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const atTop = el.scrollTop <= 0;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return;
      e.preventDefault();
      el.scrollTop += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const displayedAnnouncements = data
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date_announcement).getTime() -
        new Date(a.date_announcement).getTime()
    );

  return (
    <DashboardCard title="Announcement">
      <div className="h-full flex flex-col min-h-0">
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
        >
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
        </div>

        <p className="shrink-0 mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-center">
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