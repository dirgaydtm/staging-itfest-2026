"use client";

import { motion } from "framer-motion";
import { faqdata } from "../data/faqdata";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

const FaqContainer = () => {
  return (
    <section className="min-h-screen mycontainer relative z-20">
      <motion.h4
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-normal-active-blue mb-12 md:mb-16 font-anton tracking-wider uppercase md:text-5xl text-4xl"
      >
        FREQUENTLY ASKED QUESTION
      </motion.h4>
      <div className="w-full lg:w-[60%] mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {faqdata.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1, // Stagger effect based on index
                ease: "easeOut",
              }}
            >
              <AccordionItem
                value={`item-${faq.id}`}
                className="border-none rounded-xl overflow-hidden bg-light-blue/15 backdrop-blur-2xl border transition-colors"
              >
                <AccordionTrigger className="px-6 py-4 sm:py-5 sm:px-8 text-white hover:no-underline transition-colors duration-300">
                  <p className="text-sm sm:text-base font-medium">
                    {faq.question}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 sm:px-8 pt-6 text-white bg-dark-active-blue">
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqContainer;
