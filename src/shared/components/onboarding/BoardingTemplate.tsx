"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Robot from "@/assets/img/onboarding/robot_onboarding.png";

interface BoardingTemplateProps {
  children: React.ReactNode;
}

const BoardingTemplate: React.FC<BoardingTemplateProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#171F74] md:bg-gradient-to-b from-[#030D35] relative to-[#19217C] overflow-hidden h-screen">
      <div className="flex items-center h-full mycontainer pt-20 md:pt-22 font-white">
        {/* Left Panel */}
        <div
          className={`md:h-11/12 h-full w-full bg-[#171F74] md:rounded-l-2xl md:border-4 border-[#3F5DAA] 
                        transform transition-all duration-1000 ease-out delay-200
                           md:shadow-[-8px_0_20px_-8px_rgba(100,149,237,0.4),_0_8px_20px_-4px_rgba(100,149,237,0.4),_0_-8px_20px_-4px_rgba(100,149,237,0.4)]
                        ${
                          isLoaded
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-full opacity-0"
                        }`}
        >
          {children}
        </div>

        {/* Right Panel */}
        <div
          className={`h-11/12 hidden md:w-full bg-[#3F5DAA] rounded-r-2xl border-4 border-[#3F5DAA] 
                        md:flex flex-col items-center justify-center gap-4
                        transform transition-all duration-1000 ease-out delay-500
                        md:shadow-[8px_0_20px_-8px_rgba(100,149,237,0.4),_0_8px_20px_-4px_rgba(100,149,237,0.4),_0_-8px_20px_-4px_rgba(100,149,237,0.4)]
                        ${
                          isLoaded
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0"
                        }`}
        >
          <div className="animate-pulse transition-all duration-300 flex justify-center items-center">
            <Image
              className={`2xl:w-3/4 lg:w-3/5 w-48 transform transition-all duration-700 delay-1000
                         hover:scale-110 hover:rotate-2
                         ${
                           isLoaded
                             ? "translate-y-0 opacity-100"
                             : "translate-y- opacity-0"
                         }`}
              alt="robot onboarding"
              src={Robot}
              draggable={false}
            />
          </div>

          <div
            className={`xl:space-y-5 space-y-2 text-center 
                          transform transition-all duration-700 delay-1200
                          ${
                            isLoaded
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                          }`}
          >
            <h2 className="lg:text-3xl md:text-xl font-bold font-changa">
              Welcome to ITFEST!
            </h2>
            <p className="lg:text-2xl md:text-sm font-changa">
              Compete, Collaborate, and Win <br /> Together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardingTemplate;
