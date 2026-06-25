"use client";

import TimelineWrapper from "../components/TimelineWrapper";
import LeftHand from "../components/LeftHand";
import RightHand from "../components/RightHand";
import { motion } from "framer-motion";

const TimelineContainer = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative h-[90vh] lg:h-[70vh] flex flex-col items-center justify-center pt-12 md:pt-16"
    >
      {/* Hand Images */}
      <LeftHand />
      <RightHand />

      <div className="mycontainer relative z-10 flex flex-col items-center w-full px-4">
        <h1 className="text-normal-active-blue mb-12 md:mb-16 font-anton tracking-wider uppercase md:text-5xl text-4xl">
          Timeline
        </h1>
        <TimelineWrapper />
      </div>
    </motion.section>
  );
};

export default TimelineContainer;
