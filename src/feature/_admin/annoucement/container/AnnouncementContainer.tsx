'use client';

import React from 'react';
import AnnouncementForm from "../components/AnnouncementForm";
import AnnouncementList from "../components/AnnouncementList";
import { useGetAnnouncement } from "../hooks/useGetAnnouncement";
import { Loader2, Megaphone } from "lucide-react";

const AnnouncementContainer = () => {
  const { announcements, loading, error, refetch } = useGetAnnouncement();

  const handlePostSuccess = () => {
    console.log('Post successful, refetching announcements...');
    refetch(); 
  };

  return (
    // Menggunakan w-full, teks putih kontras, dan font-changa untuk konsistensi heading
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full w-full font-changa text-white">
      
      {/* Wrapper Judul Halaman dengan Ikon Dekoratif */}
      <div className="flex items-center gap-3 mb-8">
        <Megaphone className="w-6 h-6 text-white/60" />
        <h4 className="text-2xl md:text-3xl font-bold tracking-wide">
          Management Announcement
        </h4>
      </div>

      {/* Grid Konten Utama */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6 items-start w-full">
        
        {/* SISI KIRI (Form Pembuatan Pengumuman Baru) */}
        <div className="w-full lg:w-1/3 transition-all duration-300">
          <AnnouncementForm onSuccess={handlePostSuccess} />
        </div>
        
        {/* SISI KANAN (Daftar Pengumuman yang Aktif) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          
          {/* State Loading Kaca Transparan */}
          {loading && (
            <div className="h-48 w-full flex items-center justify-center bg-[#B0BFC7]/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="text-center space-y-3">
                <Loader2 className="w-8 h-8 text-white/40 animate-spin mx-auto" />
                <p className="text-white/60 font-leaguespartan text-xs tracking-wide">
                  Fetching latest announcements...
                </p>
              </div>
            </div>
          )}

          {/* State Error Alert Box Transparan Kemerahan */}
          {error && (
            <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center text-red-400 font-leaguespartan font-medium text-xs">
              ⚠ Error: {error}
            </div>
          )}

          {/* Render List Utama jika data berhasil dimuat */}
          {!loading && announcements && (
            <div className="w-full transition-all duration-300 animate-in fade-in duration-200">
              <AnnouncementList announcements={announcements} />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AnnouncementContainer;