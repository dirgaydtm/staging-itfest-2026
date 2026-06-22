"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import SplitPanelLayout from "@/shared/components/layout/SplitPanelLayout";
import CenteredFormLayout from "@/shared/components/layout/CenteredFormLayout";

import PendaftaranForm from "../components/page1/PendaftaranForm";
import BiodataKetuaForm from "../components/page2/BiodataKetuaForm";
import TeamKTMForm from "../components/page3/TeamKTMForm";
import BiodataAnggota1Form from "../components/page4/BiodataAnggota1Form";
import BiodataAnggota2Form from "../components/page4/BiodataAnggota2Form";
import PendaftaranSelesaiForm from "../components/page5/SuccesForm";

import { TeamMember, BiodataKetuaRequest } from "@/api/services/pendaftaran";
import { useTeamProfile } from "../../hooks/useTeamProfile";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", when: "beforeChildren" },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.25, ease: "easeIn" } },
};

const PendaftaranContainer = () => {
  const { data: teamProfile, loading: isProfileLoading } = useTeamProfile();

  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(
    null,
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
          "Are you sure you want to leave? Unsaved data will be lost.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [currentPage, isSubmitting, teamProfile]);

  const goToNext = () => {
    if (currentPage < 6) setCurrentPage(currentPage + 1);
  };

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isProfileLoading) {
    return (
      <SplitPanelLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-blue mx-auto" />
            <p className="font-leaguespartan text-light-green">
              Checking registration status...
            </p>
          </div>
        </div>
      </SplitPanelLayout>
    );
  }

  if (
    teamProfile &&
    teamProfile.competition_category &&
    teamProfile.competition_category !== "Not Registered"
  ) {
    return (
      <SplitPanelLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center text-center"
        >
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-leaguespartan font-bold text-light-green">
              You are already registered
            </h1>
            <p className="font-leaguespartan text-lg text-light-blue">
              Your team{" "}
              <span className="font-bold">{teamProfile.team_name}</span> is
              already registered in{" "}
              <span className="font-bold">
                {teamProfile.competition_category}
              </span>
              .
            </p>
            <p className="font-leaguespartan text-light-green">
              You cannot access this page anymore.
            </p>
          </div>
        </motion.div>
      </SplitPanelLayout>
    );
  }

  if (isSubmitting) {
    return (
      <CenteredFormLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-blue mx-auto" />
            <p className="font-leaguespartan text-light-green">
              Processing registration...
            </p>
          </div>
        </div>
      </CenteredFormLayout>
    );
  }

  // ===== Halaman 1 (SplitPanelLayout) =====
  if (currentPage === 1) {
    return (
      <SplitPanelLayout>
        <AnimatePresence mode="wait">
          <motion.div
            key="page-1"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <PendaftaranForm
              selectedCompetition={selectedCompetition}
              onCompetitionSelect={setSelectedCompetition}
              onNext={goToNext}
            />
          </motion.div>
        </AnimatePresence>
      </SplitPanelLayout>
    );
  }

  // ===== Halaman 2–6 (CenteredFormLayout) =====
  const renderCurrentPage = () => {
    switch (currentPage) {
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
            competitionId={selectedCompetition!}
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
        return <PendaftaranSelesaiForm />;
      default:
        return null;
    }
  };

  return (
    <CenteredFormLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={`page-${currentPage}`}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col gap-5 w-full"
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </CenteredFormLayout>
  );
};

export default PendaftaranContainer;
