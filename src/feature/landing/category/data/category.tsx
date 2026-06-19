import { PenTool, Lightbulb } from "lucide-react";

export interface TCategoryData {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  buttonClass: string;
  cardBorderClass: string;
  hoverShadowClass: string;
  description: string;
  link: string;
}

export const category: TCategoryData[] = [
  {
    title: "UI/UX DESIGN",
    icon: <PenTool className="w-6 h-6" />,
    colorClass: "text-normal-blue border-dark-blue bg-normal-blue/20",
    buttonClass: "bg-normal-blue",
    cardBorderClass: "border-dark-blue",
    hoverShadowClass: "hover:shadow-[0_0_30px_rgba(102,155,188,0.8)]",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    link: "/onboarding",
  },
  {
    title: "BUSINESS PLAN",
    icon: <Lightbulb className="w-6 h-6" />,
    colorClass: "text-normal-red border-dark-hover-red bg-normal-red/20",
    buttonClass: "bg-normal-red",
    cardBorderClass: "border-dark-hover-red",
    hoverShadowClass: "hover:shadow-[0_0_30px_rgba(193,18,31,0.8)]",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    link: "/onboarding",
  },
  {
    title: "DIGITAL MEDIA LEARNING",
    icon: <Lightbulb className="w-6 h-6" />,
    colorClass: "text-normal-yellow border-dark-active-yellow bg-normal-yellow/20",
    buttonClass: "bg-dark-hover-yellow",
    cardBorderClass: "border-dark-active-yellow",
    hoverShadowClass: "hover:shadow-[0_0_30px_rgba(253,240,213,0.8)]",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    link: "/onboarding",
  },
];
