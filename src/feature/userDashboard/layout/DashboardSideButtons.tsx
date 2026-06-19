"use client";

import clsx from "clsx";
import { useDashboardTheme } from "./DashboardThemeContext";
import {
  buttonDisabledClass,
  buttonInactiveClass,
  buttonTextClass,
} from "./themes";

export type DashboardTab = "info" | "submit";

type Props = {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
};

const baseBtn =
  "py-4 px-6 font-bold md:text-lg text-base rounded-2xl transition w-full flex justify-center items-center";

const DashboardSideButtons = ({ active, onChange }: Props) => {
  const { theme, isRegistered } = useDashboardTheme();
  const submitDisabled = !isRegistered;

  return (
    <section className="flex lg:flex-col flex-row gap-4 w-full">
      <button
        type="button"
        onClick={() => onChange("info")}
        className={clsx(
          baseBtn,
          buttonTextClass,
          active === "info" ? theme.buttonActive : buttonInactiveClass,
        )}
      >
        Information
      </button>

      <button
        type="button"
        onClick={() => !submitDisabled && onChange("submit")}
        disabled={submitDisabled}
        className={clsx(
          baseBtn,
          buttonTextClass,
          "truncate",
          submitDisabled
            ? buttonDisabledClass
            : active === "submit"
            ? theme.buttonActive
            : buttonInactiveClass,
        )}
      >
        Submit Your Work
      </button>
    </section>
  );
};

export default DashboardSideButtons;