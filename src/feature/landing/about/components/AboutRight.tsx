import { motion } from "framer-motion";

export const AboutRight = () => {
  return (
    <div className="flex-3 w-full relative">
      {/* Glowing left border */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 h-full w-1 bg-normal-hover-blue shadow-[0_0_20px_4px_rgba(147,197,253,0.5)] z-20 origin-top"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="bg-darker-blue backdrop-blur-sm border border-white/5 p-8 lg:p-10 h-full w-full rounded-r-lg relative z-10 overflow-hidden"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 1.0 },
            },
          }}
          className="flex flex-col gap-6 text-gray-200"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-sm font-leaguespartan md:text-base leading-relaxed text-justify"
          >
            IT FEST 2026 merupakan kompetisi teknologi tingkat nasional yang
            diselenggarakan oleh Keluarga Besar Mahasiswa Departemen Sistem
            Informasi (KBMDSI) Fakultas Ilmu Komputer Universitas Brawijaya.
            Mengusung tema “Advancing National Inovation through Digital
            Excellence”, ajang ini menghadirkan tiga cabang lomba utama, yaitu
            UI/UX, Business Plan, serta Digital Media Learning sebagai kategori
            terbaru.
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-sm md:text-base font-leaguespartan leading-relaxed text-justify"
          >
            IT FEST 2026 hadir sebagai wadah untuk meningkatkan kemampuan
            kompetisi dan portofolio nasional, sekaligus memacu kolaborasi
            generasi penerus bangsa.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};
