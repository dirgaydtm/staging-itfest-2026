"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { TTimelineListData } from "../data/timelinedata";

interface TimelineListProps {
  list: TTimelineListData;
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const TimelineList: React.FC<TimelineListProps> = ({ list }) => {
  const { title, subtitle, date, className } = list;

  return (
    <motion.div
      variants={itemVariants}
      className="flex w-full items-center justify-center gap-8 md:gap-16 font-leaguespartan"
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-white font-bold text-base md:text-lg lg:text-xl">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-300 text-sm md:text-base mt-1">{subtitle}</p>
        )}
      </div>

      {/* Center Dot */}
      <div className="w-8 justify-center items-center shrink-0 hidden sm:flex">
        <div
          className={`w-4 h-4 rounded-full flex justify-center items-center border-2 ${"border-gray-300"}`}
        ></div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex justify-end text-center">
        <div
          className={`p-1 md:px-2 md:py-1 w-36 rounded-lg border text-sm md:text-base backdrop-blur-sm shadow-lg transition-all border-white/50 text-white ${className}`}
        >
          {date}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineList;
