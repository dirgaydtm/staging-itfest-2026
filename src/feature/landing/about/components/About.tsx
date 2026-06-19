"use client";

import { Background } from "./Background";
import { AboutLeft } from "./AboutLeft";
import { AboutRight } from "./AboutRight";

const About = () => {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[70vh] w-full font-changa flex items-center justify-center md:px-4">
      <Background />

      <main className="text-white z-10 flex lg:flex-row flex-col gap-12 lg:gap-16 justify-between items-center w-full py-20">
        <AboutLeft />
        <AboutRight />
      </main>
    </section>
  );
};

export default About;
