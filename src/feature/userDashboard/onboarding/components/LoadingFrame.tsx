import React from "react";

const LoadingFrame = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full w-full md:px-16 gap-12">
      <div className="text-center font-changa font-white flex flex-col items-center justify-center gap-8">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-ping"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-4">
          <h3 className="font-bold text-2xl animate-pulse">Taking you to Main Page...</h3>
          <p className="text-md lg:text-lg text-center font-changa text-white opacity-80">
            Please wait a moment while we prepare everything for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoadingFrame;