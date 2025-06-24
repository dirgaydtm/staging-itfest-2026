'use client';

import React, { useState } from "react";
import BoardingTemplate from "@/shared/components/onboarding/BoardingTemplate";

// Import semua komponen halaman
import PendaftaranForm from "../components/page1/PendaftaranForm";
import BiodataKetuaForm from "../components/page2/BiodataKetuaForm";
import TeamKTMForm from "../components/page3/TeamKTMForm";
import BiodataAnggota1Form from "../components/page4/BiodataAnggota1Form";
import BiodataAnggota2Form from "../components/page4/BiodataAnggota2Form";
import PendaftaranSelesaiForm from "../components/page5/SuccesForm";

import { TeamMember } from "@/api/services/pendaftaran";

const PendaftaranContainer = () => {
  // State untuk navigasi halaman
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk data form
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [teamName, setTeamName] = useState("");
  const [member1, setMember1] = useState<TeamMember>({ name: "", student_number: "" });
  const [member2, setMember2] = useState<TeamMember>({ name: "", student_number: "" });

  // Navigation functions
  const goToNext = () => {
    if (currentPage < 6) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Removed unused handleLoadingChange function

  // Helper function untuk mendapatkan nama kompetisi
  const getCompetitionName = () => {
    switch (selectedCompetition) {
      case 2:
        return "UI/UX DESIGN";
      case 3:
        return "BUSINESS PLAN";
      default:
        return "";
    }
  };

  // Render halaman berdasarkan currentPage
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <PendaftaranForm
            selectedCompetition={selectedCompetition}
            onCompetitionSelect={setSelectedCompetition}
            onNext={goToNext}
          />
        );
      
      case 2:
        return (
          <BiodataKetuaForm
            competitionId={selectedCompetition!}
            onNext={goToNext}
            onBack={goToPrevious}
          />
        );
      
      case 3:
        return (
          <TeamKTMForm
            teamName={teamName}
            onTeamNameChange={setTeamName}
            onNext={goToNext}
            onBack={goToPrevious}
          />
        );
      
      case 4:
        return (
          <BiodataAnggota1Form
            member1={member1}
            onMember1Change={setMember1}
            onNext={goToNext}
            onBack={goToPrevious}
          />
        );
      
      case 5:
        return (
          <BiodataAnggota2Form
            teamName={teamName}
            member1={member1}
            member2={member2}
            onMember2Change={setMember2}
            onNext={goToNext}
            onBack={goToPrevious}
          />
        );
      
      case 6:
        return (
          <PendaftaranSelesaiForm
            teamName={teamName}
            competitionType={getCompetitionName()}
          />
        );
      
      default:
        return (
          <PendaftaranForm
            selectedCompetition={selectedCompetition}
            onCompetitionSelect={setSelectedCompetition}
            onNext={goToNext}
          />
        );
    }
  };

  // Show loading overlay if loading
  if (isLoading) {
    return (
      <BoardingTemplate>
        <div className="md:mx-4 lg:mx-20 md:py-6 lg:py-12 h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white font-changa">Memproses pendaftaran...</p>
          </div>
        </div>
      </BoardingTemplate>
    );
  }

  return (
    <BoardingTemplate>
      <div className="md:mx-4 lg:mx-20 md:py-6 lg:py-12 h-full">
        {renderCurrentPage()}
      </div>
    </BoardingTemplate>
  );
};

export default PendaftaranContainer;