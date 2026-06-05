"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  CompetitionKey,
  DashboardTheme,
  dashboardThemes,
  defaultTheme,
} from "./themes";

type DashboardThemeContextValue = {
  selectedCompetition: CompetitionKey | null;
  setSelectedCompetition: (key: CompetitionKey | null) => void;
  theme: DashboardTheme;
  isRegistered: boolean;
};

const DashboardThemeContext = createContext<DashboardThemeContextValue | null>(
  null,
);

type ProviderProps = {
  children: ReactNode;
  initialCompetition?: CompetitionKey | null;
};

export const DashboardThemeProvider = ({
  children,
  initialCompetition = null,
}: ProviderProps) => {
  const [selectedCompetition, setSelectedCompetitionState] =
    useState<CompetitionKey | null>(initialCompetition);

  const setSelectedCompetition = useCallback(
    (key: CompetitionKey | null) => setSelectedCompetitionState(key),
    [],
  );

  const value = useMemo<DashboardThemeContextValue>(() => {
    const theme = selectedCompetition
      ? dashboardThemes[selectedCompetition]
      : defaultTheme;
    return {
      selectedCompetition,
      setSelectedCompetition,
      theme,
      isRegistered: selectedCompetition !== null,
    };
  }, [selectedCompetition, setSelectedCompetition]);

  return (
    <DashboardThemeContext.Provider value={value}>
      {children}
    </DashboardThemeContext.Provider>
  );
};

export const useDashboardTheme = () => {
  const ctx = useContext(DashboardThemeContext);
  if (!ctx) {
    throw new Error(
      "useDashboardTheme must be used within a DashboardThemeProvider",
    );
  }
  return ctx;
};
