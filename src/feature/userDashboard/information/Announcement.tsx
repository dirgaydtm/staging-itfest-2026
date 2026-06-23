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

    let lastTouchY = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = lastTouchY - y;
      lastTouchY = y;
      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += delta;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const displayedAnnouncements = data
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date_announcement).getTime() -
        new Date(a.date_announcement).getTime(),
    );

  return (
    <DashboardCard title="Announcement">
      <div className="h-full flex flex-col min-h-0">
        <div
          ref={scrollRef}
          style={{ touchAction: "none", overscrollBehavior: "none" }}
          className="flex-1 min-h-0 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
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
          <span className="text-light-blue/60">
            Stay tuned at our social media{" "}
          </span>
          <span className={`font-semibold ${theme.accentText}`}>
            @itfest.filkom
          </span>
        </p>
      </div>
    </DashboardCard>
  );
};

export default Announcement;