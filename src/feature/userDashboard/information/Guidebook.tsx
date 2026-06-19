"use client";

import Link from "next/link";
import { competitionData } from "../data/competitionData";
import { useDashboardTheme } from "../layout/DashboardThemeContext";

type CompetitionCategory = "BP" | "UI/UX" | "DML" | "Not Registered";

type Props = {
  competitionCategory: CompetitionCategory;
  isDeadlinePassed?: boolean;
};

const Guidebook = ({ competitionCategory, isDeadlinePassed = false }: Props) => {
  const { theme } = useDashboardTheme();
  const isNotRegistered = competitionCategory === "Not Registered";
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  const btnBase =
    "inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base transition";
  const btnDisabled = "bg-[#7c7c7c] text-light-blue/60 cursor-not-allowed";
  const btnActive = `${theme.buttonActive} text-light-blue`;

  const renderAction = () => {
    if (isNotRegistered) {
      if (isDeadlinePassed) {
        return (
          <span className={`${btnBase} ${btnDisabled}`} aria-disabled="true">
            Registration Closed
          </span>
        );
      }
      return (
        <Link href="/pendaftaran" className={`${btnBase} ${btnActive}`}>
          Register Now!
        </Link>
      );
    }

    if (isDeadlinePassed) {
      return (
        <span className={`${btnBase} ${btnDisabled}`} aria-disabled="true">
          Submission Closed
        </span>
      );
    }
    return (
      <Link href={content.link} className={`${btnBase} ${btnActive}`}>
        Download Guidebook
      </Link>
    );
  };

  return (
    <section className="h-full rounded-2xl sm:rounded-3xl bg-white/[0.06] backdrop-blur-lg border border-white/15 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-center font-leaguespartan text-light-blue flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
        {isNotRegistered ? "Not Registered Yet" : content.title}
      </h2>
      {renderAction()}
    </section>
  );
};

export default Guidebook;