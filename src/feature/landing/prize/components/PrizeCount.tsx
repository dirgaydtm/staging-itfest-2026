"use client";
import { useEffect, useState } from "react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import { useSlotMachineAnimation } from "../hooks/useCountAnimation";

const PrizeCount = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const [digits, isFinished] = useSlotMachineAnimation(
    isVisible,
    9000000,
    2000,
  );
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isFinished) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  const formattedValue = digits.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div
      ref={ref}
      className={`text-center font-anton font-normal relative text-6xl sm:text-6x sm:text-7xl lg:text-[128px] leading-[115%] tracking-[-1.28px] text-[#D0E0EA] [text-shadow:0_0_15px_rgba(232,240,245,0.75)] transition-transform duration-300 ${
        isShaking ? "animate-bounce-down " : ""
      }`}
    >
      <div className="flex items-center justify-center leading-none">
        <span className="md:mr-4">Rp.</span>
        <span className="tabular-nums">{formattedValue}</span>
        <span className="md:ml-4 -translate-y-3">++</span>
      </div>
    </div>
  );
};

export default PrizeCount;
