"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useAuth } from "@/shared/hooks/useAuth";
import { useParticipant } from "../hooks/useParticipantData";
import TotalTeamsCard from "../components/TotalTeamsCard";
// import TotalPaymentsCard from "../components/TotalPaymentsCard";
import TotalEachCompe from "../components/TotalEachCompe";
import { Button } from "@/shared/components/ui/Button";
import { useDownloadTeams, useDownloadPayments } from "../hooks/useDownload";

const DashboardContainer = () => {
  const { user } = useAuth();
  const { totalAll, participantData, loading } = useParticipant();
  const [teamsMessage, setTeamsMessage] = useState<string>('');
  const [paymentsMessage, setPaymentsMessage] = useState<string>('');

  const {
    downloadTeams,
    isDownloading: isDownloadingTeams,
    error: teamsError,
    success: teamsSuccess
  } = useDownloadTeams();

  const {
    downloadPayments,
    isDownloading: isDownloadingPayments,
    error: paymentsError,
    success: paymentsSuccess
  } = useDownloadPayments();

  useEffect(() => {
    if (teamsError) {
      setTeamsMessage(teamsError);
    } else if (teamsSuccess) {
      setTeamsMessage('Teams data downloaded successfully!');
    } else {
      return;
    }

    const timer = setTimeout(() => {
      setTeamsMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [teamsError, teamsSuccess]);

  useEffect(() => {
    if (paymentsError) {
      setPaymentsMessage(paymentsError);
    } else if (paymentsSuccess) {
      setPaymentsMessage('Payments data downloaded successfully!');
    } else {
      return;
    }

    const timer = setTimeout(() => {
      setPaymentsMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [paymentsError, paymentsSuccess]);

  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full w-full">
      <DashboardHeader username={user?.name ? user?.name : user?.email} />
      
      {/* Grid Layout Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        
        {/* KIRI: Statistik Data Tim */}
        <div className="flex flex-col gap-6">
          <TotalTeamsCard totalAll={totalAll} isLoading={loading} />
          {/* <TotalPaymentsCard totalPayment="100" /> */}
          
          {/* Grid internal untuk pecahan 3 kompetisi agar rapi di mobile maupun desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TotalEachCompe
              total_bp={participantData?.total_bp}
              label="Business"
            />
            <TotalEachCompe
              total_uiux={participantData?.total_uiux}
              label="UI/UX"
            />
            <TotalEachCompe
              total_dml={participantData?.total_dml}
              label="DML"
            />
          </div>
        </div>

        {/* KANAN: Panel Export Aksi */}
        <div className="flex flex-col gap-5">
          <h4 className="text-xl font-changa text-white font-bold tracking-wide">
            Export Panel
          </h4>
          
          <div className="flex flex-col gap-4">
            <Button
              onClick={downloadTeams}
              disabled={isDownloadingTeams}
              type="button"
              size="normal"
              className={`w-full h-11 text-sm font-bold rounded-xl transition-all duration-300 ${
                teamsMessage 
                  ? (teamsError ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400') 
                  : 'bg-gradient-to-r from-[#243642] to-[#3D5D71] border-transparent text-white hover:scale-[1.01] shadow-md shadow-black/10'
              }`}
            >
              {isDownloadingTeams ? 'Downloading...' : teamsMessage || 'Download Teams Data'}
            </Button>

            <Button
              onClick={downloadPayments}
              disabled={isDownloadingPayments}
              type="button"
              size="normal"
              className={`w-full h-11 text-sm font-bold rounded-xl transition-all duration-300 ${
                paymentsMessage 
                  ? (paymentsError ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400') 
                  : 'bg-gradient-to-r from-[#243642] to-[#3D5D71] border-transparent text-white hover:scale-[1.01] shadow-md shadow-black/10'
              }`}
            >
              {isDownloadingPayments ? 'Downloading...' : paymentsMessage || 'Download Payments Data'}
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DashboardContainer;