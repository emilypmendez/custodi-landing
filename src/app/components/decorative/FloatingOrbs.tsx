"use client";

import { motion } from "framer-motion";

interface FloatingOrbsProps {
  count?: number;
  colors?: string[];
  intensity?: "light" | "medium" | "heavy";
}

const FloatingOrbs = ({ count = 3, colors = ["rgba(201,168,76,0.1)", "rgba(201,168,76,0.08)"], intensity = "light" }: FloatingOrbsProps) => {
  const orbIntensity = {
    light: { blur: "80px", opacity: 0.05 },
    medium: { blur: "100px", opacity: 0.08 },
    heavy: { blur: "120px", opacity: 0.12 },
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            backgroundColor: colors[i % colors.length],
            filter: `blur(${orbIntensity[intensity].blur})`,
            opacity: orbIntensity[intensity].opacity,
          }}
          animate={{
            x: [0, 50 - i * 30, 0],
            y: [0, 80 - i * 40, 0],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{
            x: i * 100 - 150,
            y: i * 100 - 100,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
