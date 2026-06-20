"use client";

import React, { useState } from "react";
import Ic_Leader from "@/assets/img/onboarding/leader.svg";
import Ic_Member from "@/assets/img/onboarding/member.svg";
import Image from "next/image";
import Link from "next/link";

interface ChooseRoleProps {
  onRoleSelect: (role: "leader" | "member") => void;
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<"leader" | "member" | null>(null);

  const handleNextSubmit = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-10 text-white select-none">
      <div className="w-full max-w-md flex flex-col items-center justify-center gap-6">
        
        {/* Header Title - Glassmorphism Pill */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 py-2.5 px-6 rounded-xl text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <h1 className="text-sm lg:text-base font-bold tracking-widest font-leaguespartan text-slate-200">
            CHOOSE YOUR ROLE
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xs lg:text-sm text-center px-4 font-leaguespartan text-slate-300/90 leading-relaxed">
          Are you registering as a Team Leader or as a Team Member?
        </p>

        {/* Grid Card Role */}
        <div className="grid grid-cols-2 gap-4 w-full px-2 pt-2">
          
          {/* Card Leader */}
          <button
            type="button"
            onClick={() => setSelectedRole("leader")}
            className={`w-full aspect-square rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all duration-300 backdrop-blur-xl
              ${
                selectedRole === "leader"
                  ? "border-cyan-400/80 bg-white/15 shadow-[0_0_20px_rgba(34,211,238,0.25),inset_0_1px_2px_rgba(255,255,255,0.2)] scale-[1.02]"
                  : "border-white/10 bg-slate-950/20 hover:bg-white/5 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${selectedRole === "leader" ? "scale-110" : "opacity-80"}`}>
              <Image
                src={Ic_Leader}
                alt="Team Leader Icon"
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
            </div>
            <p className={`font-leaguespartan text-xs lg:text-sm font-medium tracking-wide transition-colors ${selectedRole === "leader" ? "text-cyan-300" : "text-slate-300"}`}>
              Team Leader
            </p>
          </button>

          {/* Card Member */}
          <button
            type="button"
            onClick={() => setSelectedRole("member")}
            className={`w-full aspect-square rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all duration-300 backdrop-blur-xl
              ${
                selectedRole === "member"
                  ? "border-cyan-400/80 bg-white/15 shadow-[0_0_20px_rgba(34,211,238,0.25),inset_0_1px_2px_rgba(255,255,255,0.2)] scale-[1.02]"
                  : "border-white/10 bg-slate-950/20 hover:bg-white/5 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${selectedRole === "member" ? "scale-110" : "opacity-80"}`}>
              <Image
                src={Ic_Member}
                alt="Team Member Icon"
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
            </div>
            <p className={`font-leaguespartan text-xs lg:text-sm font-medium tracking-wide transition-colors ${selectedRole === "member" ? "text-cyan-300" : "text-slate-300"}`}>
              Team Member
            </p>
          </button>
        </div>

        {/* Button Next */}
        <div className="w-full px-2 pt-2">
          <button
            type="button"
            disabled={!selectedRole}
            onClick={handleNextSubmit}
            className={`w-full py-2.5 rounded-xl border font-leaguespartan font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-md
              ${
                selectedRole
                  ? "bg-white/15 border-white/30 hover:bg-white/25 text-white cursor-pointer active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                  : "bg-white/5 border-white/5 text-white/30 cursor-not-allowed"
              }`}
          >
            Next
          </button>
        </div>

        {/* Footer Link */}
        <div className="flex flex-col items-center justify-center gap-1 pt-2">
          <p className="text-xs lg:text-sm text-center font-leaguespartan text-slate-400/80">
            Don&apos;t wanna register yet?
          </p>
          <Link
            href="/"
            className="text-xs lg:text-sm text-center font-leaguespartan font-medium text-cyan-400/90 transition-all duration-300 hover:text-cyan-300 hover:underline"
          >
            I wanna see the website first
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ChooseRole;