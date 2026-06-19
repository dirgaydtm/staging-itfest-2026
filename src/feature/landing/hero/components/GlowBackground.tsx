import { cn } from "@/shared/utils/cn";

export default function GlowBackground({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "absolute inset-0 pointer-events-none h-[200%]",
                className
            )}
        >
            <svg
                className="h-full w-full"
                viewBox="0 0 2040 2400"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_f_2635_3544)">
                    <ellipse cx="1020" cy="1370.64" rx="720" ry="728.735" fill="#4D748D" />
                </g>
                <g filter="url(#filter1_f_2635_3544)">
                    <ellipse cx="1020" cy="1196.57" rx="677.574" ry="685.685" fill="#5C8CA9" />
                </g>
                <g filter="url(#filter2_f_2635_3544)">
                    <ellipse
                        cx="1020"
                        cy="955.113"
                        rx="647.626"
                        ry="655.113"
                        fill="url(#paint0_linear_2635_3544)"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_f_2635_3544"
                        x="0"
                        y="341.906"
                        width="2040"
                        height="2057.47"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2635_3544" />
                    </filter>
                    <filter
                        id="filter1_f_2635_3544"
                        x="242.426"
                        y="410.884"
                        width="1555.15"
                        height="1571.37"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_2635_3544" />
                    </filter>
                    <filter
                        id="filter2_f_2635_3544"
                        x="72.374"
                        y="0"
                        width="1895.25"
                        height="1910.23"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2635_3544" />
                    </filter>
                    <linearGradient
                        id="paint0_linear_2635_3544"
                        x1="1020"
                        y1="300"
                        x2="1020"
                        y2="1610.23"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#C1121F" />
                        <stop offset="1" stopColor="#780000" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}