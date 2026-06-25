"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { TCategoryData } from "../data/category";

interface CategoryCardProps {
  item: TCategoryData;
  index: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      delay: index * 0.15,
    },
  }),
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { stiffness: 100, damping: 10, delay: 0.4 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const CategoryCard: React.FC<CategoryCardProps> = ({ item, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-light-blue/10 hover:bg-light-blue/20 border ${item.cardBorderClass} backdrop-blur-lg hover:border-white/40 rounded-3xl p-6.5 flex flex-col h-full shadow-xl ${item.hoverShadowClass} transition-shadow duration-300 relative overflow-hidden group`}
    >
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex lg:flex-col gap-4 not-lg:items-center">
        <motion.div
          variants={iconVariants}
          className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 relative z-10 ${item.colorClass} group-hover:scale-110 transition-transform duration-300`}
        >
          {item.icon}
        </motion.div>

        <h2 className="font-leaguespartan text-2xl md:text-3xl mb-3 font-bold tracking-tighter relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          {item.title}
        </h2>
      </div>

      <p className="text-white text-sm grow mb-4 font-leaguespartan leading-relaxed relative z-10">
        {item.description}
      </p>

      <motion.div variants={textVariants} className="relative z-10">
        <Link
          href={item.link}
          className={`flex items-center font-leaguespartan justify-center gap-2 px-5 py-2.5 rounded-md  font-semibold w-fit text-white ${item.buttonClass} hover:brightness-110 active:scale-95 transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
        >
          See details{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CategoryCard;
