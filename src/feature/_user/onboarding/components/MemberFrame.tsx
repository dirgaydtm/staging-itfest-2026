import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { useRouter } from "next/navigation";

interface MemberFrameProps {
  onBack: () => void;
}

const MemberFrame: React.FC<MemberFrameProps> = ({ onBack }) => {
  const router = useRouter();

  const handleGotIt = () => {
    router.push("/");
  };
  return (
    <section className="flex flex-col items-center justify-center h-full w-full md:px-8 lg:px-16 gap-12">
      <div className="text-center font-changa font-white flex flex-col items-center justify-center gap-4">
        <h3 className="font-bold text-2xl ">As a Team Member, great!</h3>
        <p className="text-md lg:text-lg text-center font-changa text-white">
          Just a heads-up: only Team Leaders can register the actual team.{" "}
          <br />
          Best to check in with your leader about it!
        </p>
      </div>

      <Button
        onClick={handleGotIt}
        type="button"
        size={"small"}
        className="w-full text-base sm:text-base disabled:opacity-50"
      >
        Got It
      </Button>
    </section>
  );
};

export default MemberFrame;
