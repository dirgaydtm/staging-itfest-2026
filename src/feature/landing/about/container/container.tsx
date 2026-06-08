import React from "react";
import Hero from "../components/Hero";
import Background from "../components/Background";

const AboutContainer = () => {
  return (
    <main className="lg:min-h-[50rem] xl:min-h-[60rem] 2xl:min-h-[50rem] min-h-screen pb-40  lg:pb-0 relative bg-blue-350">
      <Background />
      <div className="mycontainer">
        <Hero />
      </div>
    </main>
  );
};

export default AboutContainer;
