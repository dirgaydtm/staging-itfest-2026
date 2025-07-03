"use client";

import React, { useState, useEffect } from "react";
import BoardingTemplate from "@/shared/components/onboarding/BoardingTemplate";

import PendaftaranForm from "../components/page1/PendaftaranForm";
import BiodataKetuaForm from "../components/page2/BiodataKetuaForm";
import TeamKTMForm from "../components/page3/TeamKTMForm";
import BiodataAnggota1Form from "../components/page4/BiodataAnggota1Form";
import BiodataAnggota2Form from "../components/page4/BiodataAnggota2Form";
import PendaftaranSelesaiForm from "../components/page5/SuccesForm";

import { TeamMember, BiodataKetuaRequest } from "@/api/services/pendaftaran";
import { useTeamProfile } from "../../dashboard/hooks/useTeamProfile";

const PendaftaranContainer = () => {
  const { data: teamProfile, loading: isProfileLoading } = useTeamProfile();

  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(
    null
  );
  const [teamName, setTeamName] = useState("");
  const [biodataKetua, setBiodataKetua] = useState<BiodataKetuaRequest>({
    full_name: "",
    student_number: "",
    university: "",
    phone_number: "",
  });
  const [ktmFile, setKtmFile] = useState<File | null>(null);
  const [member1, setMember1] = useState<TeamMember>({
    name: "",
    student_number: "",
  });
  const [member2, setMember2] = useState<TeamMember>({
    name: "",
    student_number: "",
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const isFillingForm = !(
        teamProfile &&
        teamProfile.competition_category &&
        teamProfile.competition_category !== "Not Registered"
      );

      if (isFillingForm && currentPage < 6 && !isSubmitting) {
        e.preventDefault();
        e.returnValue =
          "Apakah Anda yakin ingin pergi? Data yang belum disimpan akan hilang.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentPage, isSubmitting, teamProfile]);
  const goToNext = () => {
    if (currentPage < 6) setCurrentPage(currentPage + 1);
  };

  const goToPrevious = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin kembali? Kemajuan pada halaman ini akan hilang."
      )
    ) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
  };

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
            biodataKetua={biodataKetua}
            onBiodataKetuaChange={setBiodataKetua}
            onNext={goToNext}
            onBack={goToPrevious}
          />
        );
      case 3:
        return (
          <TeamKTMForm
            teamName={teamName}
            onTeamNameChange={setTeamName}
            ktmFile={ktmFile}
            onKtmFileChange={setKtmFile}
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
            biodataKetua={biodataKetua}
            ktmFile={ktmFile}
            competitionId={selectedCompetition!}
            onNext={goToNext}
            onBack={goToPrevious}
            setIsLoading={setIsSubmitting}
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

  if (isProfileLoading) {
    return (
      <BoardingTemplate>
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white font-changa">
              Memeriksa status pendaftaran...
            </p>
          </div>
        </div>
      </BoardingTemplate>
    );
  }

  if (
    teamProfile &&
    teamProfile.competition_category &&
    teamProfile.competition_category !== "Not Registered"
  ) {
    {
      return (
        <BoardingTemplate>
          <div className="h-full flex items-center justify-center text-center text-white">
            <div className="space-y-6">
              <h1 className="text-4xl font-robotech text-purple-100">
                Anda Sudah Terdaftar
              </h1>
              <p className="font-changa text-xl">
                Tim Anda{" "}
                <span className="font-bold text-yellow-300">
                  {teamProfile.team_name}
                </span>{" "}
                sudah terdaftar di kompetisi{" "}
                <span className="font-bold text-yellow-300">
                  {teamProfile.competition_category}
                </span>
                .
              </p>
              <p>Anda tidak dapat mengakses halaman ini lagi.</p>
            </div>
          </div>
        </BoardingTemplate>
      );
    }
  }

  if (isSubmitting) {
    return (
      <BoardingTemplate>
        <div className="h-full flex items-center justify-center">
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
