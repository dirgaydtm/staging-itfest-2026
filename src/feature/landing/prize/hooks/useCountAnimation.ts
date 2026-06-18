import { useState, useEffect } from "react";

const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const useSlotMachineAnimation = (
  isVisible: boolean,
  targetValue: number,
  duration: number = 4000
): [number[], boolean] => {
  const totalDigits = targetValue.toString().length;
  const [digits, setDigits] = useState<number[]>(new Array(totalDigits).fill(0));
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!isVisible) {
      setDigits(new Array(totalDigits).fill(0));
      setIsFinished(false);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);

      const current = Math.floor(targetValue * easedProgress);
      const currentString = current.toString().padStart(totalDigits, "0");
      setDigits(currentString.split("").map(Number));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setIsFinished(true);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, targetValue, duration, totalDigits]);

  return [digits, isFinished];
};
