"use client";

interface GradientAccentProps {
  variant?: "subtle" | "medium" | "strong";
  direction?: "horizontal" | "vertical" | "diagonal";
}

const GradientAccent = ({ variant = "subtle", direction = "horizontal" }: GradientAccentProps) => {
  const intensities = {
    subtle: "rgba(201,168,76,0.15)",
    medium: "rgba(201,168,76,0.25)",
    strong: "rgba(201,168,76,0.35)",
  };

  const directions = {
    horizontal: `linear-gradient(90deg, transparent, ${intensities[variant]}, transparent)`,
    vertical: `linear-gradient(180deg, transparent, ${intensities[variant]}, transparent)`,
    diagonal: `linear-gradient(135deg, transparent, ${intensities[variant]}, transparent)`,
  };

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: directions[direction],
        willChange: "transform",
      }}
    />
  );
};

export default GradientAccent;
