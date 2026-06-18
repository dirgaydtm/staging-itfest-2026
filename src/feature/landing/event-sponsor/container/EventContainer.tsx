import React from "react";

const EventContainer = () => {
  return (
    <section className="py-20 relative z-20 flex flex-col justify-center">
      <div className="mycontainer w-full mb-12">
        <h4 className="text-center text-normal-active-blue mb-12 md:mb-16 font-anton tracking-wider uppercase md:text-5xl text-4xl">
          EVENT PARTNER & SPONSOR
        </h4>
      </div>

      {/* Sponsor Strip Placeholder */}
      <div className="w-full h-40 md:h-56 bg-linear-to-r from-[#0D1422] via-[#0D1422] to-[#0E4C73] border-y border-white/5 shadow-inner">
        {/* Logos will go here */}
      </div>
    </section>
  );
};

export default EventContainer;
