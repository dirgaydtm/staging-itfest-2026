import { useState, useEffect } from "react";

const SubmissionBottom = () => {
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        className={`
        relative bg-white/[0.06] backdrop-blur-lg border border-white/20 
        p-6 rounded-4xl 
        transform transition-all duration-300 hover:shadow-purple-500/30
      `}
      >
        <div
          className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-70"
          style={{ top: `${scanLine}%`, transition: "top 0.05s linear" }}
        ></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg rotate-45 opacity-80"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-lg rotate-45"></div>
            </div>

            <div className="space-y-1">
              <div className="w-16 h-2 bg-purple-200 rounded-full opacity-80"></div>
              <div className="w-12 h-2 bg-purple-300 rounded-full opacity-60"></div>
              <div className="w-20 h-2 bg-purple-200 rounded-full opacity-70"></div>
            </div>
          </div>

          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute inset-3 bg-blue-600 rounded-full"></div>
            <div className="absolute inset-6 bg-purple-100 rounded-full animate-ping"></div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-200 rounded-full animate-pulse"></div>
              <div className="w-8 h-1 bg-purple-200 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></div>
              <div className="w-12 h-1 bg-indigo-200 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
              <div className="w-6 h-1 bg-purple-300 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-200 rounded-full opacity-60 animate-float"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i * 0.3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionBottom;
