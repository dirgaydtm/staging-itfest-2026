import React from "react";
import Image from "next/image";
import { useDynamicStars } from "../hooks/useStars";

const Stars = () => {
  const stars = useDynamicStars(100);

  return (
    <div className="absolute top-0 h-screen w-full right-0 overflow-hidden ">
      {stars.map(({ id, src, style }) => (
        <Image key={id} src={src} alt="random star" style={style} unoptimized />
      ))}
    </div>
  );
};

export default Stars;
