import React from "react";
import LeftSide from "../components/LeftSide";
import GuideBookStack from "../components/GuideBookStack";

const GuideContainer = () => {
  return (
    <section className="min-h-screen py-32 relative z-20 flex flex-col justify-center">
      <div className="mycontainer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-2">
              <LeftSide />
            </div>

            <div className="order-1 lg:order-2 col-span-1 lg:col-span-2 xl:col-span-1 flex justify-center lg:justify-end">
              <GuideBookStack />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideContainer;
