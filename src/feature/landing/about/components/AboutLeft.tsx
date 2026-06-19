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
          transition: { staggerChildren: 0.3 },
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
              transition: { duration: 0.8, ease: "easeInOut" },
            },
          }}
          className="h-px bg-white"
        ></motion.div>
        <motion.h2
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, ease: "easeOut" },
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
            hidden: { y: "100%", opacity: 0, rotateZ: 3 },
            visible: {
              y: 0,
              opacity: 1,
              rotateZ: 0,
              transition: {
                type: "spring",
                stiffness: 60,
                damping: 15,
                duration: 1,
              },
            },
          }}
          style={{ transformOrigin: "bottom left" }}
          className="font-leaguespartan lg:text-3xl text-4xl font-bold"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </motion.h1>
      </div>
    </motion.div>
  );
};
