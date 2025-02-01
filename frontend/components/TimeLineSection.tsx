import React from "react";
import AnimatedTimeline from "./AnimatedTimeline";

const TimeLineSection = () => {
  return (
    <div className="text-black-100 w-full flex justify-between items-center my-10 p-5">
      <div className="w-[50%] flex flex-col justify-center items-center gap-5">
        <AnimatedTimeline />
      </div>

      <div className="w-[50%] flex flex-col justify-center items-center gap-5">
        <h1 className="heading font-bold  text-yellow-500">
          Our 5-Phase Process at Work
        </h1>
        <p className="text-xl font-semibold max-w-[500px] text-center text-black-100 ">
          From the moment a case is reported, our streamlined process kicks into
          action. Every step—from verifying the initial report to launching a
          full-scale investigation, coordinating a prompt response, and ensuring
          proper follow-up—is designed to ensure swift, transparent, and
          effective handling. Our dedicated team works closely with community
          members and trusted partners, building a network of accountability and
          care. This comprehensive approach not only accelerates response times
          but also reinforces our commitment to keeping you informed every step
          of the way.
        </p>
      </div>
    </div>
  );
};

export default TimeLineSection;
