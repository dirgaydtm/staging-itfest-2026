"use client";

import Link from "next/link";
import DashboardCard from "../layout/DashboardCard";
import { useDashboardTheme } from "../layout/DashboardThemeContext";
import { competitionData } from "../../../shared/data/competitionData";

type CompetitionCategory = "BP" | "UI/UX" | "DML" | "Not Registered";

interface GuideBookInfoProps {
  competitionCategory?: CompetitionCategory;
}

const GuideBookInfo = ({ competitionCategory = "Not Registered" }: GuideBookInfoProps) => {
  const { theme } = useDashboardTheme();
  const isNotRegistered = competitionCategory === "Not Registered";
  const content = competitionData[competitionCategory as keyof typeof competitionData];

  const btnBase =
    "inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300";
  const btnActive = `${theme.buttonActive} text-light-blue hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(255,255,255,0.35)] active:scale-95`;

  if (isNotRegistered) {
    return null; // Don't show if not registered
  }

  return (
    <DashboardCard title="">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <p className="text-base sm:text-lg text-white/80 leading-relaxed text-left flex-1">
          Detailed requirements for each stage submission can be found in our guidebook. 
          Please review the guidebook carefully before submitting your work.
        </p>
        <Link 
          href={content.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${btnBase} ${btnActive} flex-shrink-0`}
        >
          View Guidebook
        </Link>
      </div>
    </DashboardCard>
  );
};

export default GuideBookInfo;
