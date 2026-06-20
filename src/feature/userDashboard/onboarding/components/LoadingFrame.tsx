"use client";

import React from "react";

const LoadingFrame = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 lg:p-10 text-white select-none">
      <div className="w-full max-w-sm flex flex-col items-center justify-center gap-8 text-center">
        
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 border-4 border-white/10 border-t-[#5c8ca9] rounded-full animate-spin shadow-[0_0_15px_rgba(92,140,169,0.3)]" />
          <div className="absolute w-14 h-14 border-4 border-transparent border-t-[#5c8ca9]/30 rounded-full animate-ping" />
        </div>
        
        <div className="flex flex-col items-center justify-center gap-2.5 font-leaguespartan">
          <h3 className="text-lg lg:text-xl font-bold tracking-wide text-slate-100 animate-pulse">
            Taking you to Main Page...
          </h3>
          <p className="text-xs lg:text-sm text-slate-300/85 leading-relaxed max-w-[280px]">
            Please wait a moment while we prepare everything for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingFrame;