export type CompetitionKey = "uiux" | "bp" | "dml";

export type DashboardTheme = {
  key: CompetitionKey;
  label: string;
  glowLeft: string;
  glowRight: string;
  buttonActive: string;
};

// Background sama untuk semua mode: darker-blue
export const dashboardBackground = "bg-darker-blue"; // = #243642

// Class untuk inactive button & disabled (sama lintas mode)
export const buttonInactiveClass =
  "bg-white/5 hover:bg-white/10 border border-white/10";
export const buttonDisabledClass =
  "bg-[#7c7c7c] text-light-blue/60 cursor-not-allowed";

// Class teks tombol (sama lintas mode)
export const buttonTextClass = "text-light-blue font-leaguespartan";

export const dashboardThemes: Record<CompetitionKey, DashboardTheme> = {
  uiux: {
    key: "uiux",
    label: "UI/UX",
    glowLeft:
      "radial-gradient(circle at center, rgba(102,155,188,0.55) 0%, rgba(102,155,188,0.15) 40%, transparent 75%)",
    glowRight:
      "radial-gradient(circle at center, rgba(102,155,188,0.55) 0%, rgba(102,155,188,0.15) 40%, transparent 75%)",
    buttonActive:
      "bg-gradient-to-r from-darker-blue to-dark-hover-blue shadow-[0_0_18px_rgba(102,155,188,0.35)]",
  },
  bp: {
    key: "bp",
    label: "Business Plan",
    glowLeft:
      "radial-gradient(circle at center, rgba(193,18,31,0.55) 0%, rgba(193,18,31,0.15) 40%, transparent 75%)",
    glowRight:
      "radial-gradient(circle at center, rgba(193,18,31,0.55) 0%, rgba(193,18,31,0.15) 40%, transparent 75%)",
    buttonActive:
      "bg-gradient-to-r from-darker-red2 to-dark-hover-red2 shadow-[0_0_18px_rgba(193,18,31,0.35)]",
  },
  dml: {
    key: "dml",
    label: "Digital Media Learning",
    glowLeft:
      "radial-gradient(circle at center, rgba(190,180,160,0.55) 0%, rgba(190,180,160,0.15) 40%, transparent 75%)",
    glowRight:
      "radial-gradient(circle at center, rgba(190,180,160,0.55) 0%, rgba(190,180,160,0.15) 40%, transparent 75%)",
    buttonActive:
      "bg-gradient-to-r from-darker-yellow to-dark-hover-yellow shadow-[0_0_18px_rgba(190,180,160,0.35)]",
  },
};

export const defaultTheme: DashboardTheme = {
  ...dashboardThemes.uiux,
  buttonActive:
    "bg-gradient-to-r from-dark-hover-blue to-normal-hover-blue text-white shadow-[0_0_18px_rgba(102,155,188,0.45)]",
};