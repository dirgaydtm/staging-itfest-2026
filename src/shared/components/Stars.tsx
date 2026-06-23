const starGlyphs = ["✦", "✧", "✶", "✦", "✧"];

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function createSideStars(side: "left" | "right") {
  return Array.from({ length: 80 }, (_, i) => {
    const seed = side === "left" ? i : i + 100;
    const r = (offset: number) => seededRand(seed + offset);
    return {
      id: `${side}-${i}`,
      top: `${Math.floor(r(0) * 800)}vh`,
      offset: `${Math.floor(r(1) * 18)}%`,
      size: 13 + Math.floor(r(2) * 16),
      rotate: -24 + Math.floor(r(3) * 48),
      opacity: 0.5 + r(4) * 0.4,
      glyph: starGlyphs[(i + (side === "left" ? 1 : 2)) % starGlyphs.length],
      animationDuration: `${2.2 + (i % 4) * 0.35}s`,
      animationDelay: `${(i % 5) * 0.4}s`,
    };
  });
}

const LEFT_STARS = createSideStars("left");
const RIGHT_STARS = createSideStars("right");

export default function Stars({ className }: { className?: string }) {
  const renderStar = (star: (typeof LEFT_STARS)[0], side: "left" | "right") => (
    <span
      key={star.id}
      className="star-twinkle absolute select-none font-bold text-white"
      style={{
        top: star.top,
        [side]: star.offset,
        fontSize: `${star.size}px`,
        lineHeight: 1,
        opacity: star.opacity,
        transform: `rotate(${star.rotate}deg)`,
        animationDelay: star.animationDelay,
        animationDuration: star.animationDuration,
        willChange: "opacity",
      }}
    >
      {star.glyph}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        className ?? ""
      }`}
    >
      {LEFT_STARS.map((s) => renderStar(s, "left"))}
      {RIGHT_STARS.map((s) => renderStar(s, "right"))}
    </div>
  );
}
