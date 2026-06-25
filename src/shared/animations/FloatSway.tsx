import type { ReactNode, CSSProperties } from "react";

interface FloatSwayProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export default function FloatSway({
  children,
  className,
  duration = 5,
}: FloatSwayProps) {
  const style: CSSProperties = {
    animation: `float-sway ${duration}s ease-in-out infinite`,
    willChange: "transform",
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
