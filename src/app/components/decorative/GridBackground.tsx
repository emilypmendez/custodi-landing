"use client";

interface GridBackgroundProps {
  opacity?: number;
  cellSize?: number;
}

const GridBackground = ({ opacity = 0.03, cellSize = 50 }: GridBackgroundProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(201,168,76,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        willChange: "transform",
      }}
    />
  );
};

export default GridBackground;
