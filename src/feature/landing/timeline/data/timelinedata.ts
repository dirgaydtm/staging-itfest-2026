export interface TTimelineListData {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  className?: string;
};


export const TimelineData: TTimelineListData[] = [
  {
    id: 1,
    title: "Open Registration",
    subtitle: "Start of the journey",
    date: "1 July 2026",
    className: "bg-normal-hover-blue/50 hover:bg-normal-hover-blue/80",
  },
  {
    id: 2,
    title: "Close Registration",
    subtitle: "Final day for Registration",
    date: "14 July 2026",
    className: "bg-light-active-blue/50 hover:bg-light-active-blue/80",
  },
  {
    id: 3,
    title: "Finalist Announcement",
    date: "18 August 2026",
    className: "bg-light-hover-red/50 hover:bg-light-hover-red/80",
  },
  {
    id: 4,
    title: "Technical Meeting",
    date: "22 August 2026",
    className: "bg-light-active-red2/50 hover:bg-light-active-red2/80",
  },
  {
    id: 5,
    title: "Final Pitching",
    subtitle: "The Climax of IT FEST",
    date: "29 August 2026",
    className: "bg-normal-red/50 hover:bg-normal-red/80",
  },
];
