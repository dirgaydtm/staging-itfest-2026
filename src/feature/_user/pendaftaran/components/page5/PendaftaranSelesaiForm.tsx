'use client'
import React from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import { useRouter } from "next/navigation";

interface PendaftaranSelesaiFormProps {
  teamName: string;
  competitionType: string;
}

const PendaftaranSelesaiForm: React.FC<PendaftaranSelesaiFormProps> = ({
  teamName,
  competitionType,
}) => {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToHome = () => {
    router.push('/home');
  };

  return (
    <section className="flex flex-col items-center justify-between h-full">
      <PageIndex index={6} title="Selesai" />
      
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-4">
          

          <div className="space-y-2">
            <h3 className="font-bold font-changa text-2xl text-white">
              Pendaftaran Berhasil!
            </h3>
            <p className="text-purple-200 text-sm">
              Selamat! Tim Anda telah berhasil mendaftar
            </p>
          </div>
        </div>

        <div className="bg-blue-500/20 border border-blue-400 p-4 rounded-xl text-white text-sm space-y-2">
          <p className="font-semibold">📢 Langkah Selanjutnya:</p>
          <ul className="text-left space-y-1 text-xs">
            <li>✅ Cek email untuk konfirmasi pendaftaran</li>
            <li>✅ Pantau dashboard untuk update status</li>
            <li>✅ Siapkan berkas tambahan jika diperlukan</li>
            <li>✅ Tunggu pengumuman hasil seleksi</li>
          </ul>
        </div>
      </div>

      <div className="w-full space-y-2">
        <Button
          type="button"
          size="normal"
          className="w-full text-base"
          onClick={handleGoToDashboard}
        >
          Lihat Dashboard
        </Button>
        
        <Button
          type="button"
          size="normal"
          variant="tertiary"
          className="w-full text-sm"
          onClick={handleGoToHome}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </section>
  );
};

export default PendaftaranSelesaiForm;