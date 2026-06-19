import { TeamProfileResponse } from "../types/teamProfile";

export type CompetitionKey = "uiux" | "bp" | "dml";

export type DashboardTheme = {
  key: CompetitionKey;
  label: string;
  competitionTitle: string;
  glowLeft: string;
  glowRight: string;
  buttonActive: string;
  cardBackground: string;
  cardBorder: string;
  accentText: string;
};

export const dashboardBackground = "bg-darker-blue";

export const buttonInactiveClass =
  "bg-white/5 hover:bg-white/10 border border-white/10";
export const buttonDisabledClass =
  "bg-[#7c7c7c] text-light-blue/60 cursor-not-allowed";
export const buttonTextClass = "text-light-blue font-leaguespartan";

export const dashboardThemes: Record<CompetitionKey, DashboardTheme> = {
  uiux: {
    key: "uiux",
    label: "UI/UX",
    competitionTitle: "UI/UX Design",
    glowLeft:
      "radial-gradient(circle at center, rgba(102,155,188,0.55) 0%, rgba(102,155,188,0.15) 40%, transparent 75%)",
    glowRight:
      "radial-gradient(circle at center, rgba(102,155,188,0.55) 0%, rgba(102,155,188,0.15) 40%, transparent 75%)",
    buttonActive:
      "bg-gradient-to-r from-darker-blue to-dark-hover-blue shadow-[0_0_18px_rgba(102,155,188,0.35)]",
    cardBackground: "bg-white/5",
    cardBorder: "border border-white/10",
    accentText: "text-[#9fc4dd]",
  },
  bp: {
    key: "bp",
    label: "Business Plan",
    competitionTitle: "Business Plan",
    glowLeft:
      "radial-gradient(circle at center, rgba(193,18,31,0.55) 0%, rgba(193,18,31,0.15) 40%, transparent 75%)",
    glowRight:
      "radial-gradient(circle at center, rgba(193,18,31,0.55) 0%, rgba(193,18,31,0.15) 40%, transparent 75%)",
    buttonActive:
      "bg-gradient-to-r from-darker-red2 to-dark-hover-red2 shadow-[0_0_18px_rgba(193,18,31,0.35)]",
    cardBackground: "bg-white/5",
    cardBorder: "border border-white/10",
    accentText: "text-[#e8a0a8]",
  },
  dml: {
    key: "dml",
    label: "Digital Media Learning",
    competitionTitle: "Digital Media Learning",
    glowLeft:
      "radial-gradient(circle at center, rgba(190,180,160,0.55) 0%, rgba(190,180,160,0.15) 40%, transparent 75%)",
    glowRight:
      "radial-gradient(circle at center, rgba(190,180,160,0.55) 0%, rgba(190,180,160,0.15) 40%, transparent 75%)",
    buttonActive:
      "bg-gradient-to-r from-darker-yellow to-dark-hover-yellow shadow-[0_0_18px_rgba(190,180,160,0.35)]",
    cardBackground: "bg-white/5",
    cardBorder: "border border-white/10",
    accentText: "text-[#d8cdb6]",
  },
};

export const defaultTheme: DashboardTheme = {
  ...dashboardThemes.uiux,
  buttonActive:
    "bg-gradient-to-r from-dark-hover-blue to-normal-hover-blue shadow-[0_0_18px_rgba(102,155,188,0.45)]",
};

export const mapCategoryToKey = (
  category: TeamProfileResponse["competition_category"]
): CompetitionKey | null => {
  switch (category) {
    case "UI/UX":
      return "uiux";
    case "BP":
      return "bp";
    case "DML":
      return "dml";
    default:
      return null;
  }
};