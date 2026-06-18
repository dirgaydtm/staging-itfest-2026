const starGlyphs = ["✦", "✧", "✶", "✦", "✧"];

function createSideStars(side: "left" | "right") {
    return Array.from({ length: 30 }, (_, index) => {
        const isLeft = side === "left";
        const top = Math.floor(Math.random() * 100);
        const animationDelay = `${(index % 5) * 0.35 + Math.random() * 0.2}s`;
        const animationDuration = `${2.2 + (index % 4) * 0.25 + Math.random() * 0.15}s`;

        return {
            id: `${side}-${index}`,
            top: `${top}%`,
            offset: `${Math.floor(Math.random() * 20)}%`,
            size: 14 + Math.floor(Math.random() * 18),
            rotate: -24 + Math.floor(Math.random() * 48),
            opacity: 0.55 + Math.random() * 0.35,
            glyph: starGlyphs[(index + (isLeft ? 1 : 2)) % starGlyphs.length],
            animationDelay,
            animationDuration,
        };
    });
}

export default function Stars({ className }: { className?: string }) {
    const leftStars = createSideStars("left");
    const rightStars = createSideStars("right");

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
        >
            {leftStars.map((star) => (
                <span
                    key={star.id}
                    className="absolute select-none font-bold text-white animate-pulse"
                    style={{
                        top: star.top,
                        left: star.offset,
                        fontSize: `${star.size}px`,
                        lineHeight: 1,
                        opacity: star.opacity,
                        transform: `rotate(${star.rotate}deg)`,
                        animationDelay: star.animationDelay,
                        animationDuration: star.animationDuration,
                        textShadow: "0 0 10px rgba(255,255,255,0.75), 0 0 18px rgba(255,255,255,0.25)",
                    }}
                >
                    {star.glyph}
                </span>
            ))}

            {rightStars.map((star) => (
                <span
                    key={star.id}
                    className="absolute select-none font-bold text-white animate-pulse"
                    style={{
                        top: star.top,
                        right: star.offset,
                        fontSize: `${star.size}px`,
                        lineHeight: 1,
                        opacity: star.opacity,
                        transform: `rotate(${star.rotate}deg)`,
                        animationDelay: star.animationDelay,
                        animationDuration: star.animationDuration,
                        textShadow: "0 0 10px rgba(255,255,255,0.75), 0 0 18px rgba(255,255,255,0.25)",
                    }}
                >
                    {star.glyph}
                </span>
            ))}
        </div>
    );
}