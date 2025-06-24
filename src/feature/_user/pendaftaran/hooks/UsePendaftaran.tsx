import { useState, useCallback } from "react";
import { TeamMember } from "@/api/services/pendaftaran";

interface PendaftaranState {
  currentPage: number;
  selectedCompetition: number | null;
  teamName: string;
  member1: TeamMember;
  member2: TeamMember;
  isLoading: boolean;
}

interface UsePendaftaranReturn {
  state: PendaftaranState;
  actions: {
    setCurrentPage: (page: number) => void;
    setSelectedCompetition: (id: number | null) => void;
    setTeamName: (name: string) => void;
    setMember1: (member: TeamMember) => void;
    setMember2: (member: TeamMember) => void;
    setIsLoading: (loading: boolean) => void;
    goToNext: () => void;
    goToPrevious: () => void;
    reset: () => void;
  };
  computed: {
    getCompetitionName: () => string;
    isFirstPage: boolean;
    isLastPage: boolean;
    canProceed: boolean;
  };
}

const initialState: PendaftaranState = {
  currentPage: 1,
  selectedCompetition: null,
  teamName: "",
  member1: { name: "", student_number: "" },
  member2: { name: "", student_number: "" },
  isLoading: false,
};

export const usePendaftaran = (): UsePendaftaranReturn => {
  const [state, setState] = useState<PendaftaranState>(initialState);

  // Actions
  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const setSelectedCompetition = useCallback((id: number | null) => {
    setState(prev => ({ ...prev, selectedCompetition: id }));
  }, []);

  const setTeamName = useCallback((name: string) => {
    setState(prev => ({ ...prev, teamName: name }));
  }, []);

  const setMember1 = useCallback((member: TeamMember) => {
    setState(prev => ({ ...prev, member1: member }));
  }, []);

  const setMember2 = useCallback((member: TeamMember) => {
    setState(prev => ({ ...prev, member2: member }));
  }, []);

  const setIsLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const goToNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, 6)
    }));
  }, []);

  const goToPrevious = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1)
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // Computed values
  const getCompetitionName = useCallback(() => {
    switch (state.selectedCompetition) {
      case 2:
        return "UI/UX DESIGN";
      case 3:
        return "BUSINESS PLAN";
      default:
        return "";
    }
  }, [state.selectedCompetition]);

  const isFirstPage = state.currentPage === 1;
  const isLastPage = state.currentPage === 6;
  
  const canProceed = useCallback(() => {
    switch (state.currentPage) {
      case 1:
        return state.selectedCompetition !== null;
      case 2:
        return true; // Will be validated in the component
      case 3:
        return state.teamName.trim() !== "";
      case 4:
      case 5:
        return true; // Members are optional
      case 6:
        return false; // Last page, no proceed
      default:
        return false;
    }
  }, [state.currentPage, state.selectedCompetition, state.teamName]);

  return {
    state,
    actions: {
      setCurrentPage,
      setSelectedCompetition,
      setTeamName,
      setMember1,
      setMember2,
      setIsLoading,
      goToNext,
      goToPrevious,
      reset,
    },
    computed: {
      getCompetitionName,
      isFirstPage,
      isLastPage,
      canProceed: canProceed(),
    },
  };
};