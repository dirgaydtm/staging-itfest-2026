import React from "react";
import Ic_Leader from "@/assets/img/onboarding/leader.svg";
import Ic_Member from "@/assets/img/onboarding/member.svg";
import Image from "next/image";
import Link from "next/link";

interface ChooseRoleProps {
  onRoleSelect: (role: 'leader' | 'member') => void
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onRoleSelect }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-xl lg:text-4xl font-medium text-white font-neighbor text-center">
            CHOOSE YOUR <br /> ROLE
          </h1>
          <p className="text-md lg:text-lg text-center px-8 lg:px-20 font-changa text-white">
            Are you registering as a Team Leader or as a Team Member?
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3 pt-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 sm:px-6">
          <button 
            onClick={() => onRoleSelect('leader')}
            className="btn btn-primary w-full h-28 sm:h-24 md:h-28 lg:h-36 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-blue-100 flex flex-col items-center justify-center gap-1 hover:bg-blue-300 duration-300 hover:scale-105 active:scale-95"
          >
            <Image
              src={Ic_Leader}
              alt="Team Leader Icon"
              className="w-7 h-7 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mb-1"
            />
            <p className="font-changa text-xs sm:text-xs md:text-sm lg:text-base font-medium">
              Team Leader
            </p>
          </button>

          <button 
            onClick={() => onRoleSelect('member')}
            className="btn btn-primary w-full h-28 sm:h-24 md:h-28 lg:h-36 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-blue-100 flex flex-col items-center justify-center gap-1 hover:bg-blue-300 duration-300 hover:scale-105 active:scale-95"
          >
            <Image
              src={Ic_Member}
              alt="Team Member Icon"
              className="w-7 h-7 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mb-1"
            />
            <p className="font-changa text-xs sm:text-xs md:text-sm lg:text-base font-medium">
              Team Member
            </p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 pt-4">
          <p className="text-md lg:text-lg text-center px-8 lg:px-20 font-changa font-normal text-white">
            Don&apos;t wanna register yet?
          </p>
          <Link
            href="/"
            className="text-md lg:text-lg text-center px-8 lg:px-20 font-changa font-normal text-white underline hover:text-blue-300 duration-300"
          >
            <p className="underline font-changa text-md lg:text-lg text-center text-blue-250 font-bold text-shadow-[0_0_10px_rgb(59_130_246)]">
              I wanna see the website first
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;