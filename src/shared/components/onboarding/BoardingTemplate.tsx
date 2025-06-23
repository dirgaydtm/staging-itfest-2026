'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Robot from "@/assets/img/onboarding/robot_onboarding.svg";

const BoardingTemplate: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#171F74] md:bg-gradient-to-b from-slate-900 relative to-indigo-900 overflow-hidden h-screen">
      <div className="flex items-center h-full mycontainer pt-20 md:pt-22">
        {/* Left Panel */}
        <div className={`md:h-4/5 h-full w-full bg-[#171F74] md:rounded-l-2xl md:border-4 border-[#3F5DAA] 
                        transform transition-all duration-1000 ease-out delay-200
                        ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          {children}
        </div>
        
        {/* Right Panel */}
        <div className={`h-4/5 hidden md:w-full bg-[#3F5DAA] rounded-r-2xl border-4 border-[#3F5DAA] 
                        md:flex flex-col items-center justify-center gap-10
                        transform transition-all duration-1000 ease-out delay-500
                        ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          
          {/* Robot with bounce animation */}
          <div className="animate-bounce hover:animate-ping transition-all duration-300 flex justify-center items-center">
            <Image
              className={`xl:w-3/5 lg:w-64 w-48 transform transition-all duration-700 delay-1000
                         hover:scale-110 hover:rotate-2
                         ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y- opacity-0'}`}
              alt="robot onboarding"
              src={Robot}
              draggable={false}
            />
          </div>
          
          {/* Text content */}
          <div className={`xl:space-y-5 space-y-2 text-center 
                          transform transition-all duration-700 delay-1200
                          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="xl:text-2xl md:text-xl font-bold font-changa
                           transition-all duration-500 hover:scale-105 hover:text-yellow-300">
              Welcome to ITFEST!
            </h2>
            <p className="xl:text-xl md:text-sm font-changa
                          transition-all duration-500 delay-100 hover:text-white hover:scale-105">
              Compete, Collaborate, and Win <br/> Together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardingTemplate;