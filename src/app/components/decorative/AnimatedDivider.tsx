"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedDividerProps {
  variant?: "gradient" | "shimmer" | "glow";
}

const AnimatedDivider = ({ variant = "gradient" }: AnimatedDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  if (variant === "gradient") {
    return (
      <div ref={ref} className="relative h-px w-full overflow-hidden bg-[color:var(--border)]">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.5)] to-transparent"
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "400%" } : { x: "-100%" }}
          transition={{ duration: 2, ease: "linear" }}
        />
      </div>
    );
  }

  if (variant === "shimmer") {
    return (
      <div ref={ref} className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.8)] to-transparent blur-sm"
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "300%" } : { x: "-100%" }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    );
  }

  // glow variant
  return (
    // overflow-x-clip (not hidden) so the vertical glow shadow isn't clipped by the 1px height
    <div ref={ref} className="relative h-px w-full overflow-x-clip">
      <div className="absolute inset-0 bg-[color:var(--border)]" />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.6)] to-transparent shadow-[0_0_20px_rgba(201,168,76,0.3)]"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "400%" } : { x: "-100%" }}
        transition={{ duration: 2.5, ease: "linear" }}
      />
    </div>
  );
};

export default AnimatedDivider;
