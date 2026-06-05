"use client";

import clsx from "clsx";
import { useDashboardTheme } from "./DashboardThemeContext";

export type DashboardTab = "info" | "submit";

type Props = {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
};

const DashboardSideButtons = ({ active, onChange }: Props) => {
  const { theme, isRegistered } = useDashboardTheme();
  const submitDisabled = !isRegistered;

  return (
    <section className="flex lg:flex-col flex-row gap-4 w-full">
      <button
        type="button"
        onClick={() => onChange("info")}
        className={clsx(
          "py-4 px-6 font-changa font-bold md:text-lg text-base rounded-2xl transition w-full flex justify-center items-center",
          active === "info" ? theme.buttonActive : theme.buttonInactive,
        )}
      >
        Information
      </button>

      <button
        type="button"
        onClick={() => !submitDisabled && onChange("submit")}
        disabled={submitDisabled}
        className={clsx(
          "py-4 px-6 font-changa font-bold md:text-lg text-base rounded-2xl transition w-full flex justify-center items-center truncate",
          submitDisabled
            ? "bg-white/10 text-white/40 cursor-not-allowed"
            : active === "submit"
            ? theme.buttonActive
            : theme.buttonInactive,
        )}
      >
        Submit Your Work
      </button>
    </section>
  );
};

export default DashboardSideButtons;
