import Image from "next/image";
import { competitionData } from "../../data/competitionData";

interface SubmissionHeaderProps {
  competitionCategory: "BP" | "UI/UX" | "Not Registered";
  status: string;
  isDeadlineOver: boolean;
}

const SubmissionHeader = ({
  competitionCategory,
  status,
  isDeadlineOver,
}: SubmissionHeaderProps) => {
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  return (
    <header className="flex flex-col lg:flex-row lg:justify-between items-center overflow-x-auto bg-blue-500 border-2 mycontainer border-purple-300 p-4 rounded-4xl gap-8 mr-10 font-changa h-50">
      <section className="flex items-center gap-4 text-center">
        <Image
          src={content.icon}
          alt="Category Icon"
          width={100}
          height={100}
          className="w-36 min-w-24 p-2 object-contain"
        />

        <h2 className="text-4xl lg:text-5xl font-robotech text-purple-100 font-bold leading-tight">
          {content.title}
        </h2>
      </section>

      <section className="flex lg:flex-col flex-row items-center lg:items-start gap-2 truncate">
        <span className="text-xl lg:text-2xl font-bold text-white">
          Status:
        </span>
        <span
          className={`text-base md:text-base lg:text-xl font-normal truncate ${
            isDeadlineOver
              ? "text-red-400 font-semibold animate-pulse"
              : "text-white"
          }`}
        >
          {isDeadlineOver ? "Terlambat" : status}
        </span>
      </section>
    </header>
  );
};

export default SubmissionHeader;
