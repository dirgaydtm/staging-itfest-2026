"use client";

import React from "react";
import { useAnnouncement } from "../../hooks/useAnnouncement";

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

  const displayedAnnouncements = data
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date_announcement).getTime() -
        new Date(a.date_announcement).getTime()
    )
    .slice(0, 5);

  return (
    <section className="p-6 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 h-full">
      <h2 className="font-changa font-bold text-2xl text-center mb-4">
        Announcement
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center "></p>
      ) : displayedAnnouncements.length > 0 ? (
        <ul className="space-y-6 rounded-2xl max-h-84 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200">
          {displayedAnnouncements.map((item) => (
            <li
              key={item.id_announcement}
              className="bg-white/10 rounded-xl p-4"
            >
              <p className="text-sm whitespace-pre-line leading-relaxed">
                {item.message_announcement}
              </p>
              <p className="mt-2 text-xs text-purple-200 text-right">
                {formatDate(item.date_announcement)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No announcements yet...</p>
      )}

      <p className="mt-6 text-sm text-center flex flex-col">
        Stay tuned at our social media
        <span className="font-semibold text-purple-100">@itfest.filkom</span>
      </p>
    </section>
  );
};

export default Announcement;
