"use client";
import React from "react";
import { TTimelineListData } from "../type/TTimelineList";
import { useTimelineAnimation } from "../hooks/useTimelineAnimation";

interface TimelineListProps {
  list: TTimelineListData;
}

const TimelineList: React.FC<TimelineListProps> = ({ list }) => {
  const { isVisible, lineWidth, elementRef } = useTimelineAnimation(list.id);

  const parseDate = (dateString: string): Date | null => {
    const months: { [key: string]: number } = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    };
    const parts = dateString.split(" ");
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
    return null;
  };

  const eventDate = parseDate(list.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getTimelineDetails = () => {
    if (!eventDate) return { status: "future" };
    const eventTime = eventDate.getTime();
    const todayTime = today.getTime();
    const diffTime = eventTime - todayTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Current or passed events (today or in the past)
    if (diffDays <= 0) return { status: "current" };

    // Upcoming events (within 7 days)
    if (diffDays <= 7) return { status: "upcoming" };

    // Future events (more than 7 days away)
    return { status: "future" };
  };

  const { status: timelineStatus } = getTimelineDetails();
  const isOdd = list.id % 2 !== 0;
  const isFirst = list.id === 1;
  const isLast = list.id === 6;

  // 3 kondisi: current/passed, upcoming (dekat), future (jauh)
  const isCurrent = timelineStatus === "current";
  const isUpcoming = timelineStatus === "upcoming";
  const isFuture = timelineStatus === "future";

  return (
    <div
      ref={elementRef}
      className={`font-changa flex items-center gap-8 transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {isFirst && (
        <div
          className={`h-4 w-4 rotate-45 ml-4 backdrop-blur-sm bg-gradient-to-br from-cyan-400/40 via-blue-500/50 to-purple-500/40 border-2 border-cyan-300/50 shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        ></div>
      )}

      <div
        className={`w-24 h-2 overflow-hidden rounded-full bg-gray-900/30 backdrop-blur-sm border border-cyan-300/20 relative shadow-[inset_0_0_10px_rgba(0,255,255,0.2)] transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div
          className={`h-full bg-gradient-to-r transition-all duration-500 ease-out rounded-full relative overflow-hidden ${
            isVisible
              ? isCurrent
                ? "timeline-progress-current timeline-charging-current"
                : isUpcoming
                ? "timeline-progress-upcoming timeline-charging-upcoming"
                : "timeline-progress-future timeline-charging-future"
              : "from-gray-600 via-gray-700 to-gray-800"
          }`}
          style={{ width: `${lineWidth}%` }}
        >
          {isCurrent && isVisible && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-cyan-400/80 to-cyan-400/30 animate-bounce rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[dataStream_2s_linear_infinite] rounded-full"></div>
            </>
          )}
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`w-20 h-20 rotate-45 backdrop-blur-sm transition-all duration-500 ease-in-out hover:scale-115 relative overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent
            ${
              isVisible
                ? `opacity-100 translate-x-0 scale-100 ${
                    isCurrent
                      ? "timeline-current timeline-glow-current"
                      : isUpcoming
                      ? "timeline-upcoming timeline-glow-upcoming"
                      : isFuture
                      ? "timeline-future timeline-glow-future"
                      : ""
                  }`
                : `opacity-0 scale-75 ${
                    isOdd ? "-translate-x-12" : "translate-x-12"
                  } bg-gray-800/50 border border-gray-600/30`
            }`}
        >
          {isCurrent && isVisible && (
            <>
              {/* Holographic core */}
              <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/80 via-transparent to-purple-500/80 rounded-sm animate-[hologramFlicker_1.5s_ease-in-out_infinite]"></div>

              {/* Energy scanner */}
              <div className="absolute inset-1 bg-gradient-to-tr from-transparent via-white/70 to-transparent rounded-sm animate-[dataStream_1.5s_linear_infinite]"></div>

              {/* Pulsing center */}
              <div className="absolute inset-3 bg-gradient-to-br from-cyan-300/60 via-purple-400/60 to-green-300/60 rounded-sm animate-pulse"></div>

              {/* Energy particles */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-[dataStream_0.8s_linear_infinite] rounded-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-400/20 to-transparent animate-[dataStream_1.2s_linear_infinite] rounded-sm"></div>

              {/* Outer energy field */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20 rounded-sm animate-[hologramFlicker_2s_ease-in-out_infinite]"></div>
            </>
          )}
        </div>

        <div
          className={`absolute min-w-72 ${
            isOdd ? "-bottom-30" : "-top-30"
          } flex flex-col items-center transition-all duration-500 delay-200
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className={`backdrop-blur-sm border rounded-xl p-3 relative text-center transition-all duration-300 ${
              isVisible
                ? isCurrent
                  ? "timeline-card-current"
                  : isUpcoming
                  ? "timeline-card-upcoming"
                  : "timeline-card-future"
                : "bg-gray-800/30 border-gray-600/20"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span
                className={`text-sm tracking-wider transition-colors duration-300 ${
                  isVisible
                    ? isCurrent
                      ? "timeline-text-current"
                      : isUpcoming
                      ? "timeline-text-upcoming"
                      : "timeline-text-future"
                    : "text-gray-400"
                }`}
              >
                {list.date}
              </span>
              {isUpcoming && isVisible && (
                <span
                  className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm border transition-all duration-300 animate-[almostReadyGlow_3s_ease-in-out_infinite]
                    bg-gradient-to-r from-[#85fff5]/20 via-[#8872d5]/30 to-[#3ab0ca]/20
                    border-[#85fff5]/40 text-[#85fff5]/90 font-medium tracking-wide
                    shadow-[0_0_10px_rgba(133,255,245,0.2)]
                  `}
                >
                  SOON
                </span>
              )}
            </div>
            <span
              className={`font-bold text-center block bg-clip-text transition-all duration-300 text-transparent ${
                isVisible
                  ? isCurrent
                    ? "timeline-title-current"
                    : isUpcoming
                    ? "timeline-title-upcoming"
                    : "timeline-title-future"
                  : "bg-gradient-to-r from-gray-300 to-gray-500"
              }`}
            >
              {list.title}
            </span>
          </div>
        </div>
      </div>

      {isLast && (
        <div
          className={`h-4 w-4 rotate-45 backdrop-blur-sm bg-gradient-to-br from-cyan-400/40 via-blue-500/50 to-purple-500/40 border-2 border-cyan-300/50 shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        ></div>
      )}
    </div>
  );
};

export default TimelineList;
