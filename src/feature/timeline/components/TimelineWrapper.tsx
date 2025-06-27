import React from "react";
import TimelineList from "./TimelineList";
import { TimelineData } from "../data/timelinedata";

const TimelineWrapper = () => {
  return (
    <div className="w-full min-h-[30rem]  flex items-center gap-8 overflow-x-scroll   scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-blue-300   ">
      {TimelineData.map((list) => (
        <TimelineList key={list.id} list={list} />
      ))}
    </div>
  );
};

export default TimelineWrapper;
