"use client";

import React, { useState } from "react";
import { formatDate } from "@/shared/utils/formatDate";
import { AnnouncementData } from "@/api/services/admin";
import { ChevronLeft, ChevronRight, Calendar, Bookmark } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

type AnnouncementListProps = {
  announcements: AnnouncementData[] | null;
};

const ITEMS_PER_PAGE = 3; // Ditingkatkan sedikit ke 3 agar layouting kanan layar terisi proporsional

const AnnouncementList = ({ announcements }: AnnouncementListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!announcements || announcements.length === 0) {
    return (
      <div className="font-changa text-white w-full">
        <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4">
          Active Announcements
        </h4>
        <div className="w-full p-8 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center text-white/40 text-sm">
          Belum ada announcement yang diterbitkan.
        </div>
      </div>
    );
  }

  const sortedAnnouncements = [...announcements].sort(
    (a, b) =>
      new Date(b.date_announcement).getTime() -
      new Date(a.date_announcement).getTime()
  );

  const totalAnnouncements = sortedAnnouncements.length;
  const totalPages = Math.ceil(totalAnnouncements / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = sortedAnnouncements.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="font-changa text-white w-full flex flex-col gap-4">
      
      {/* Header List */}
      <h4 className="text-xl md:text-2xl font-bold tracking-wide pl-1">
        Active Announcements
      </h4>

      {/* RENDER ITEMS (Style Glassmorphism Container) */}
      <div className="w-full flex flex-col gap-4 min-h-[320px]">
        {currentItems.map((announcement, index) => (
          <div
            key={announcement.id_announcement}
            className="p-5 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl text-white flex flex-col gap-3 w-full shadow-lg transition-all duration-300 hover:bg-[#B0BFC7]/15"
          >
            {/* Meta Informasi Atas */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2 text-white/90 font-bold text-sm">
                <Bookmark size={14} className="text-[#B0BFC7]" />
                <span>Index #{totalAnnouncements - (indexOfFirstItem + index)}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                <Calendar size={12} />
                <span>{formatDate(announcement.date_announcement)}</span>
              </div>
            </div>
            
            {/* Isi Pesan Pengumuman (Rata Kiri untuk Keterbacaan Optimal) */}
            <p className="text-sm text-white/80 leading-relaxed text-left font-leaguespartan whitespace-pre-wrap px-0.5">
              {announcement.message_announcement}
            </p>
          </div>
        ))}
      </div>

      {/* PANEL NAVIGASI PAGINASI (Style Muted Glass) */}
      {totalAnnouncements > 0 && (
        <div className="flex justify-between items-center mt-4 p-2 bg-white/5 border border-white/5 rounded-xl w-full h-12 px-4">
          <div className="w-24 flex justify-start">
            {currentPage > 1 && (
              <Button
                onClick={handlePrevPage}
                size="small"
                className="h-8 text-[11px] font-bold rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Prev</span>
              </Button>
            )}
          </div>

          <span className="text-xs font-semibold text-white/60 tracking-wider">
            Page {currentPage} of {totalPages}
          </span>

          <div className="w-24 flex justify-end">
            {currentPage < totalPages && (
              <Button
                onClick={handleNextPage}
                size="small"
                className="h-8 text-[11px] font-bold rounded-lg bg-gradient-to-r from-[#243642] to-[#3D5D71] border border-transparent text-white hover:scale-102 transition-all flex items-center gap-1 cursor-pointer shadow-sm shadow-black/10"
              >
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AnnouncementList;