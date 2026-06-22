"use client";

import { TeamInformationData } from "@/api/services/admin";
import { Button } from "@/shared/components/ui/Button";
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";
import { CheckCircle, XCircle, RefreshCw, ExternalLink, ZoomIn, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

interface PaymentCardProps {
  teamInfo: TeamInformationData;
  onAcceptVerify?: () => void;
  onDenyVerify?: () => void;
  onResetVerify?: () => void;
  onCheckPayment?: () => void;
}

const PaymentCard = ({ 
  teamInfo, 
  onAcceptVerify, 
  onDenyVerify, 
  onResetVerify,
  onCheckPayment 
}: PaymentCardProps) => {
  // State untuk mengontrol modal preview gambar berukuran penuh
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col p-6 sm:p-8 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl text-white w-full">
        
        {/* Header Bagian Status Pembayaran */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Section</span>
            <h2 className="text-lg font-bold tracking-wide">Payment Verification</h2>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full border tracking-wide uppercase ${getPaymentStatusStyle(teamInfo.payment_status)}`}>
            {teamInfo.payment_status || "Pending"}
          </span>
        </div>

        {/* Grid Layout Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          
          {/* SISI KIRI (lg:col-span-7): Preview Langsung & Status Bukti */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1">
                Transaction Proof
              </span>
              <p className={`text-sm font-semibold ${teamInfo.payment_transaction ? 'text-green-400' : 'text-white/40'}`}>
                {teamInfo.payment_transaction ? '✓ Receipt File Available' : '⚠ No Uploaded Receipt Yet'}
              </p>
            </div>

            {/* Kotak Preview Gambar Langsung */}
            {teamInfo.payment_transaction ? (
              <div className="relative w-full h-48 bg-black/40 border border-white/10 rounded-xl overflow-hidden group">
                {/* Gambar Bukti Pendaftaran */}
                <img
                  src={teamInfo.payment_transaction}
                  alt="Payment Receipt Preview"
                  className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-102"
                />
                
                {/* Overlay Hover untuk Memicu Modal Zoom */}
                <div 
                  onClick={() => setIsPreviewOpen(true)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-200 cursor-pointer text-white"
                >
                  <ZoomIn size={24} className="animate-pulse" />
                  <span className="text-xs font-bold tracking-wide">Click to Enlarge</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-white/5 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs text-white/30">
                No receipt image preview display
              </div>
            )}
            
            {/* Tombol Cadangan untuk Membuka Link Tab Baru */}
            <Button
              type="button"
              size="normal"
              disabled={!teamInfo.payment_transaction}
              className="w-full sm:w-fit h-9 px-4 text-[11px] font-bold rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={onCheckPayment}
            >
              <ExternalLink size={12} />
              <span>Open Link in New Tab</span>
            </Button>
          </div>

          {/* SISI KANAN (lg:col-span-5): Panel Kendali Verifikasi */}
          <div className="lg:col-span-5 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8 w-full h-full justify-center">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1 lg:hidden">
              Verification Actions
            </span>

            <Button
              type="button"
              onClick={onAcceptVerify}
              disabled={!teamInfo.payment_transaction}
              className="w-full h-10 text-xs font-bold rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <CheckCircle size={14} />
              <span>Accept Verify</span>
            </Button>

            <Button
              type="button"
              onClick={onDenyVerify}
              disabled={!teamInfo.payment_transaction}
              className="w-full h-10 text-xs font-bold rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <XCircle size={14} />
              <span>Deny Verify</span>
            </Button>

            <Button
              type="button"
              onClick={onResetVerify}
              disabled={!teamInfo.payment_transaction}
              className="w-full h-10 text-xs font-bold rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <RefreshCw size={14} />
              <span>Reset Status Verify</span>
            </Button>
          </div>

        </div>
      </div>

      {/* MODAL INTERNAL UNTUK ZOOM PREVIEW GAMBAR STRUK */}
      {isPreviewOpen && teamInfo.payment_transaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#1A2831] border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Bar Atas Modal Pratinjau */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-xs font-bold text-white/60 tracking-wide uppercase px-1">
                Enlarged Receipt Preview
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Kontainer Gambar Resolusi Penuh */}
            <div className="w-full h-[60vh] md:h-[70vh] bg-black/20 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img
                src={teamInfo.payment_transaction}
                alt="Enlarged Payment Receipt"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Tombol Penutup di Kaki Modal */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="px-5 h-9 bg-white/5 border border-white/20 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                onClick={() => setIsPreviewOpen(false)}
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default PaymentCard;