"use client";

import { useTeamInformation } from "../hooks/useTeamInformationData";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/shared/utils/formatDate";
import { Button } from "@/shared/components/ui/Button";
import PaymentCard from "../components/TeamInformation/PaymentCard";
import TeamInformationCard from "../components/TeamInformation/TeamInformationCard";
import { getCurrentStagesStyle } from "@/shared/utils/currentStagesStyle";
import Modal from "@/shared/components/ui/Modal";
import { teamsService } from "@/api/services/admin";
import { useTeamStages } from "../hooks/useTeamStages";

const TeamInformationContainer = () => {
  const params = useParams();
  const team_id = params.team_id as string;
  const { teamInformationData, loading, error, refetch } =
    useTeamInformation(team_id);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null as "accept" | "deny" | "reset" | null,
  });
  const { stagesData } = useTeamStages(team_id);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white font-leaguespartan text-sm">Loading team information...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-red-400 font-bold p-8">Error: {error}</div>;
  }
  if (!teamInformationData) {
    return <div className="text-center text-white/60 p-8">No team information found.</div>;
  }

  const handleAcceptVerify = () => {
    setModalState({ isOpen: true, type: "accept" });
  };

  const handleDenyVerify = () => {
    setModalState({ isOpen: true, type: "deny" });
  };

  const handleResetVerify = () => {
    setModalState({ isOpen: true, type: "reset" });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleConfirmAction = async () => {
    try {
      if (modalState.type === "accept") {
        await teamsService.verifyPayment(team_id);
      } else if (modalState.type === "deny") {
        await teamsService.denyPayment(team_id);
      } else if (modalState.type === "reset") {
        await teamsService.unverifyPayment(team_id);
      }
      await refetch();
    } catch (err) {
      console.error("Error updating payment status:", err);
    } finally {
      handleCloseModal();
    }
  };

  const handleCheckPayment = () => {
    if (teamInformationData?.payment_transaction) {
      window.open(teamInformationData.payment_transaction, "_blank");
    }
  };

  const handleCheckStudentCard = () => {
    if (teamInformationData?.student_card) {
      window.open(teamInformationData.student_card, "_self");
    }
  };

  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full w-full font-leaguespartan">
      <div className="">
        <Link
          href="/mangujo/admin/team-list"
          className="inline-block mb-6 text-white/80 font-bold hover:text-white transition-colors gap-2"
        >
          ← Back to Team List
        </Link>
      </div>

      <div className="text-white">
        <h1 className="text-2xl font-bold mb-8 tracking-wide">Team Details</h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Kolom Kiri & Tengah (Lebih besar) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TeamInformationCard
              onCheckStudentCard={handleCheckStudentCard}
              teamInfo={teamInformationData}
            />
            <PaymentCard
              teamInfo={teamInformationData}
              onAcceptVerify={handleAcceptVerify}
              onDenyVerify={handleDenyVerify}
              onResetVerify={handleResetVerify}
              onCheckPayment={handleCheckPayment}
            />
          </div>

          {/* Kolom Kanan */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Kartu Kategori Lomba (Menggunakan style gradasi figma asli) */}
            <div className="p-6 bg-gradient-to-r from-[#243642] to-[#3D5D71] rounded-2xl text-white text-center shadow-lg border border-white/10">
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-1">
                Competition Category
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                {teamInformationData.competition_category}
              </h2>
            </div>

            {/* Kartu Stages (Menggunakan style glassmorphism) */}
            <div className="p-6 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl">
              <h2 className="text-lg font-bold mb-4 tracking-wide border-b border-white/10 pb-2">
                Stages
              </h2>
              
              <div className="text-center py-2.5 rounded-xl mb-4 bg-white/5 border border-white/5">
                {stagesData &&
                  (teamInformationData.progress.stage_name === "Final" ? (
                    <p className="text-green-400 font-bold text-sm">
                      Sudah lolos ke tahap final (terakhir)
                    </p>
                  ) : (
                    <p className={`text-sm font-semibold ${getCurrentStagesStyle(teamInformationData.progress.stage_status)}`}>
                      {teamInformationData.progress.stage_status || "Belum ada status"}{" "}
                    </p>
                  ))}
              </div>

              <div className="text-center flex flex-col gap-1">
                <p className="text-base font-bold text-white">
                  {teamInformationData.progress.stage_name}
                </p>
                <p className="text-white/40 text-xs">
                  Until {formatDate(teamInformationData.progress.deadline)}
                </p>
                
                <Link
                  href={`${team_id}/stages`}
                  className="mt-5 w-full h-10 flex items-center justify-center bg-[#B0BFC7]/20 border border-white/20 hover:bg-[#B0BFC7]/30 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Open Stages Page
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Aksi (Diatur agar seirama dengan style modal warning sebelumnya) */}
      <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
        <div className="w-full max-w-[400px] bg-[#1A2831] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
          
          <div className={`w-full py-2 rounded-xl text-center text-white font-bold text-sm tracking-wide border ${
            modalState.type === "accept" 
              ? "bg-green-500/20 border-green-500/30" 
              : modalState.type === "deny" 
              ? "bg-red-500/20 border-red-500/30" 
              : "bg-yellow-500/20 border-yellow-500/30"
          }`}>
            {modalState.type === "accept" ? "Verify Action" : "Decline Action"}
          </div>

          <div className="text-center flex flex-col gap-2">
            <h4 className="font-bold text-lg text-white">
              {modalState.type === "accept" ? "Approve Payment Verification?" : "Reject Payment Verification?"}
            </h4>
            <p className="text-xs text-white/60 leading-relaxed px-1">
              Are you sure you want to{" "}
              <span className="font-bold text-white">
                {modalState.type === "accept" ? "ACCEPT" : modalState.type === "deny" ? "DENY" : "RESET"}
              </span>{" "}
              this team's payment status? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              className="w-1/2 h-10 border border-white/40 bg-transparent text-white text-xs font-bold rounded-xl transition-all hover:bg-white/10 cursor-pointer"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmAction}
              className={`w-1/2 h-10 text-white text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                modalState.type === "accept"
                  ? "bg-green-600/30 border-green-500/40 hover:bg-green-600/50"
                  : modalState.type === "deny"
                  ? "bg-red-600/30 border-red-500/40 hover:bg-red-600/50"
                  : "bg-yellow-600/30 border-yellow-500/40 hover:bg-yellow-600/50"
              }`}
            >
              Yes,{" "}
              {modalState.type === "accept" ? "Verify" : modalState.type === "deny" ? "Deny" : "Reset"}
            </button>
          </div>

        </div>
      </Modal>
    </section>
  );
};

export default TeamInformationContainer;