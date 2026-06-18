"use client";
import TimelineList from "./TimelineList";
import { TimelineData } from "../data/timelinedata";
import { motion } from "framer-motion";

const wrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const TimelineWrapper = () => {
  return (
    <motion.div
      variants={wrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-lg mx-auto flex flex-col gap-10 md:gap-14 relative z-10"
    >
      {TimelineData.map((list) => (
        <TimelineList key={list.id} list={list} />
      ))}
    </motion.div>
  );
};

export default TimelineWrapper;
