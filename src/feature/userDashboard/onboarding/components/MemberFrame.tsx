"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";

interface MemberFrameProps {
  onBack?: () => void;
}

const MemberFrame: React.FC<MemberFrameProps> = ({ onBack }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 lg:p-10 text-white select-none">
      <div className="w-full max-w-sm flex flex-col items-center justify-center gap-6 text-center">
        
        <div className="flex flex-col items-center justify-center gap-2.5 font-leaguespartan">
          <h3 className="text-lg lg:text-xl font-bold tracking-wide text-slate-100">
            As Team Member, great!
          </h3>
          
          <p className="text-xs lg:text-sm text-slate-300/90 leading-relaxed max-w-[280px] lg:max-w-[320px]">
            Just a heads-up: only Team Leaders can register <br /> the actual team.
          </p>
          
          <p className="text-xs lg:text-sm text-slate-300/90 leading-relaxed">
            Best to check in with your leader about it!
          </p>
        </div>

        <div className="w-full flex justify-center pt-2">
          <Button
            onClick={onBack}
            type="button"
            className="w-[136px] h-[36px] rounded-lg border border-white/10 
                       bg-normal-hover-blue/80 backdrop-blur-sm text-white text-xs lg:text-sm font-medium font-leaguespartan
                       hover:bg-normal-hover-blue hover:border-white/30 active:scale-[0.97] transition-all duration-300 
                       flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          >
            Back
          </Button>
        </div>

      </div>
    </div>
  );
};

export default MemberFrame;