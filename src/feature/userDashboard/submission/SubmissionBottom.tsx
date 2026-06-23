interface SubmissionBottomProps {
  status?: string;
  stageName?: string;
}

const SubmissionBottom = ({ status, stageName }: SubmissionBottomProps) => {
  // 1. Pesan Default (Muncul saat tahap awal / Payment)
  let messageTitle = "Message:";
  let messageContent =
    "Please submit your payment through....\nIf you have any problems, please tell our Contact Person at :....";

  // 2. Pesan Dinamis jika peserta Tidak Lolos / Ditolak (Sesuai catatan Figma)
  if (status === "tidak lolos" || status === "ditolak") {
    messageContent =
      "Thank you for participating and giving your best effort. Even if you didn't make it to the next stage, don't give up, because every step along the way is a step toward success!";
  }

  // 3. (Opsional) Pesan Dinamis jika peserta Lolos ke Final
  if (status === "lolos" && stageName === "Final Pitch Deck") {
    messageContent =
      "Congratulations on making it to the final stage! Please prepare your best pitch deck and stay tuned on our WhatsApp group for further information.";
  }

  return (
    <div className="w-full bg-white/[0.06] backdrop-blur-lg border border-white/20 rounded-4xl p-6 md:p-8 font-leaguespartan">
      <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
        {messageTitle}
      </h3>
      {/* whitespace-pre-line digunakan agar karakter \n bisa menjadi enter/baris baru */}
      <p className="text-white opacity-80 text-sm md:text-base whitespace-pre-line leading-relaxed">
        {messageContent}
      </p>
    </div>
  );
};

export default SubmissionBottom;