import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import React from "react";

const LeftSide = () => {
  return (
    <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
      <h4 className="font-anton font-normal text-4xl md:text-7xl leading-[110%] text-[#6b91a5] drop-shadow-md max-w-3xl">
        Get the
        <br />
        Competition Guide
      </h4>
      <p className="w-full text-base sm:text-lg mt-6 text-gray-200">
        Everything you need to know about the competition, in one place.
      </p>
      <Link
        href={
          "https://drive.google.com/drive/folders/1tKrksf-4iGy390OgF3hYitqJEB4753sM?usp=sharing"
        }
        className="w-full lg:w-auto"
      >
        <Button className="mt-8 w-full px-32 bg-[#5c8b9d] text-lg hover:bg-[#4a7282] text-white rounded-xl shadow-lg font-medium">
          View Guidebook
        </Button>
      </Link>
    </div>
  );
};

export default LeftSide;
