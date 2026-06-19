"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { useDashboardTheme } from "./DashboardThemeContext";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const DashboardCard = ({ children, title, className }: Props) => {
  const { theme } = useDashboardTheme();

  return (
    <section
      className={clsx(
        "h-full rounded-2xl sm:rounded-3xl backdrop-blur-lg px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 font-leaguespartan text-light-blue",
        theme.cardBackground,
        theme.cardBorder,
        className
      )}
    >
      {title && (
        <h2 className="font-bold text-xl sm:text-2xl text-center mb-4 sm:mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default DashboardCard;