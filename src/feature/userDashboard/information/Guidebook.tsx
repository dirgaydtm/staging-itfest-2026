import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import crossCircle from "@/assets/img/_user/dashboard/crossCircle.webp";
import { competitionData } from "../../data/competitionData";
import Link from "next/link";

interface GuidebookProps {
  competitionCategory: "BP" | "UI/UX" | "Not Registered";
}

const Guidebook = ({ competitionCategory }: GuidebookProps) => {
  const isNotRegistered = competitionCategory === "Not Registered";
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  return (
    <div className="w-full max-w-xl h-full bg-blue-500 border-2 border-purple-300 rounded-4xl p-4 flex xl:flex-row flex-col items-center justify-center text-white space-y-4">
      <section className="flex flex-col items-center">
        {isNotRegistered ? (
          <div className="relative mb-4 translate-y-4 translate-x-2">
            <Image
              src={content.icon}
              alt="Blank Phone"
              className="object-contain w-30 z-10 glow-purple"
              width={150}
              height={150}
            />
            <Image
              src={crossCircle}
              alt="Cross Circle"
              className="object-contain w-14 absolute top-10 left-8 glitch"
            />
          </div>
        ) : (
          <Image
            src={content.icon}
            alt="Category Icon"
            width={300}
            height={300}
            className="w-36 min-w-24 p-2 object-contain"
          />
        )}
      </section>

      <section className="flex-1 text-center">
        <h2
          className={`mb-2 font-bold ${
            isNotRegistered
              ? "text-3xl text-white font-changa"
              : "text-4xl 2xl:text-5xl font-robotech text-purple-100"
          }`}
        >
          {isNotRegistered ? "Not registered yet" : content.title}
        </h2>

        <div className="flex justify-center">
          {isNotRegistered ? (
            <Link href={"/pendaftaran"}>
              <Button variant="primary" size="normal" className="2xl:w-60 w-48">
                Register Now
              </Button>
            </Link>
          ) : (
            <Link href={content.link}>
              <Button variant="primary" size="normal">
                <span className="text-xl">Download GuideBook</span>
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Guidebook;
