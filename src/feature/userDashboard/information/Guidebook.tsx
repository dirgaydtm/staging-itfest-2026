"use client";

import Link from "next/link";
import { competitionData } from "../data/competitionData";
import { useDashboardTheme } from "../layout/DashboardThemeContext";

type CompetitionCategory = "BP" | "UI/UX" | "Digital Media" | "Not Registered";

type Props = {
  competitionCategory: CompetitionCategory;
};

const Guidebook = ({ competitionCategory }: Props) => {
  const { theme } = useDashboardTheme();
  const isNotRegistered = competitionCategory === "Not Registered";
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  return (
    <section className="h-full rounded-3xl bg-white/[0.06] backdrop-blur-lg border border-white/15 px-6 py-10 text-center font-leaguespartan text-light-blue flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        {isNotRegistered ? "Not Registered Yet" : content.title}
      </h2>

      {isNotRegistered ? (
        <Link
          href="/pendaftaran"
          className={`inline-flex items-center justify-center px-10 py-3 rounded-2xl text-light-blue font-bold transition ${theme.buttonActive}`}
        >
          Register Now!
        </Link>
      ) : (
        <Link
          href={content.link}
          className={`inline-flex items-center justify-center px-10 py-3 rounded-2xl text-light-blue font-bold transition ${theme.buttonActive}`}
        >
          Download Guidebook
        </Link>
      )}
    </section>
  );
};

export default Guidebook;