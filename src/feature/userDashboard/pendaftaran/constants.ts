export const COMPETITION_IDS = {
  UIUX: 2,
  BP: 3,
  DML: 4,
} as const;

export type CompetitionId =
  (typeof COMPETITION_IDS)[keyof typeof COMPETITION_IDS];

export const COMPETITIONS = [
  { id: COMPETITION_IDS.UIUX, title: "UI/UX Design" },
  { id: COMPETITION_IDS.BP, title: "Business Plan" },
  { id: COMPETITION_IDS.DML, title: "Digital Media Learning" },
];
