"use client";

interface GhostlyWatermarkProps {
  opacity?: number;
  scale?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

const GhostlyWatermark = ({ opacity = 0.08, scale = 1, position = "center" }: GhostlyWatermarkProps) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`pointer-events-none absolute ${positionClasses[position]}`}
      style={{
        opacity,
        transform: `scale(${scale})`,
        willChange: "transform",
      }}
    >
      <svg
        className="h-[400px] w-[400px]"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21V2Z"
          fill="rgba(201,168,76,0.15)"
        />
        <path
          d="M11 2L20 5.5V12C2 16.5 6 19.5 11 21C6 19.5 2 16.5 2 12V5.5L11 2Z"
          stroke="var(--custodi-gold)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21L11 2Z"
          stroke="var(--custodi-gold)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M2.25 14 Q2 7.5 20 5.5"
          stroke="var(--custodi-gold)"
          strokeWidth="0.9"
          fill="none"
          opacity="0.25"
        />
      </svg>
    </div>
  );
};

export default GhostlyWatermark;
