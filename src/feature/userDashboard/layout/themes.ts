export type CompetitionKey = "uiux" | "bp" | "dml";

export type DashboardTheme = {
  key: CompetitionKey;
  label: string;
  background: string;
  glowLeft: string;
  glowRight: string;
  buttonActive: string;
  buttonInactive: string;
  buttonText: string;
};

export const dashboardThemes: Record<CompetitionKey, DashboardTheme> = {
  uiux: {
    key: "uiux",
    label: "UI/UX",
    background:
      "radial-gradient(ellipse at top, #1f3a52 0%, #16293a 45%, #0e1d2a 100%)",
    glowLeft:
      "radial-gradient(circle at left center, rgba(102,155,188,0.35) 0%, rgba(102,155,188,0) 60%)",
    glowRight:
      "radial-gradient(circle at right center, rgba(102,155,188,0.30) 0%, rgba(102,155,188,0) 60%)",
    buttonActive:
      "bg-gradient-to-r from-[#3d6b8a] to-[#5c8ca9] text-white shadow-[0_0_18px_rgba(102,155,188,0.45)]",
    buttonInactive:
      "bg-white/5 hover:bg-white/10 text-light-red border border-white/10",
    buttonText: "text-light-red",
  },
  bp: {
    key: "bp",
    label: "Business Plan",
    background:
      "radial-gradient(ellipse at top, #3a1a20 0%, #2a1216 45%, #1a0a0d 100%)",
    glowLeft:
      "radial-gradient(circle at left center, rgba(193,18,31,0.35) 0%, rgba(193,18,31,0) 60%)",
    glowRight:
      "radial-gradient(circle at right center, rgba(193,18,31,0.30) 0%, rgba(193,18,31,0) 60%)",
    buttonActive:
      "bg-gradient-to-r from-[#6c0000] to-[#910e17] text-white shadow-[0_0_18px_rgba(193,18,31,0.45)]",
    buttonInactive:
      "bg-white/5 hover:bg-white/10 text-light-red border border-white/10",
    buttonText: "text-light-red",
  },
  dml: {
    key: "dml",
    label: "Digital Media Learning",
    background:
      "radial-gradient(ellipse at top, #2c2a24 0%, #1f1d18 45%, #14130f 100%)",
    glowLeft:
      "radial-gradient(circle at left center, rgba(190,180,160,0.30) 0%, rgba(190,180,160,0) 60%)",
    glowRight:
      "radial-gradient(circle at right center, rgba(190,180,160,0.25) 0%, rgba(190,180,160,0) 60%)",
    buttonActive:
      "bg-gradient-to-r from-[#726c60] to-[#beb4a0] text-white shadow-[0_0_18px_rgba(190,180,160,0.45)]",
    buttonInactive:
      "bg-white/5 hover:bg-white/10 text-light-red border border-white/10",
    buttonText: "text-light-red",
  },
};

export const defaultTheme: DashboardTheme = dashboardThemes.uiux;
