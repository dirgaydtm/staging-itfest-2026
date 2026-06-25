import { motion } from "framer-motion";

export const AboutLeft = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="flex-2 flex flex-col gap-6 w-full"
    >
      <div className="flex items-center gap-4">
        <motion.div
          variants={{
            hidden: { width: 0, opacity: 0 },
            visible: {
              width: 64,
              opacity: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="h-px bg-white"
        ></motion.div>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className="font-leaguespartan text-xl font-bold tracking-wider uppercase"
        >
          What Is It Fest?
        </motion.h2>
      </div>

      <div className="overflow-hidden pb-2">
        <motion.h1
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 18,
                duration: 0.8,
              },
            },
          }}
          style={{ transformOrigin: "bottom left" }}
          className="font-leaguespartan lg:text-3xl text-4xl font-bold"
        >
          Getting to know IT FEST 2026
        </motion.h1>
      </div>
    </motion.div>
  );
};
