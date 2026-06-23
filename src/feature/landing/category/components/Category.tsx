"use client";

import { category } from "../data/category";
import CategoryCard from "./CategoryCard";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Ellipse from "@/assets/img/landing/Ellipse.svg";

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Category = () => {
  return (
    <section className="w-full text-white flex flex-col items-center justify-center z-10 relative">
      <Image
        src={Ellipse}
        alt="Background Glow"
        className="w-full h-auto object-cover absolute top-full left-1/2 -translate-x-1/2 max-w-240 pointer-events-none opacity-50 z-0"
      />

      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col items-center text-center gap-3 mb-12 max-w-3xl relative z-10"
      >
        <motion.h1
          variants={textVariants}
          className="font-anton text-5xl text-normal-active-blue tracking-wide mb-1"
        >
          Choose Your Challenge
        </motion.h1>
        <motion.p
          variants={textVariants}
          className="text-sm md:text-lg text-white font-leaguespartan px-4"
        >
          Pilih kategori perlombaan yang sesuai dengan minat dan keahlianmu.
          <br /> Tunjukkan inovasi, kemampuan, dan kreativitas terbaikmu.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-280 perspective-[1000px] relative z-10">
        {category.map((item, index) => (
          <CategoryCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Category;
