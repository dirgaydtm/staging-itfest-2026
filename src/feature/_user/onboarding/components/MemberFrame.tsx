import React from "react";
import { Button } from "@/shared/components/ui/Button";

const MemberFrame = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full w-full md:px-16 gap-12">
      <div className="text-center font-changa font-white flex flex-col items-center justify-center gap-4">
        <h3 className="font-bold text-2xl ">As a Team Member, great!</h3>
        <p className="text-md lg:text-lg text-center font-changa text-white">
          Just a heads-up: only Team Leaders can register the actual team.{" "}
          <br />
          Best to check in with your leader about it!
        </p>
      </div>

      <Button
        type="submit"
        size={"small"}
        className="w-full text-base sm:text-base disabled:opacity-50"
      >
        Got It
      </Button>
    </section>
  );
};

export default MemberFrame;
