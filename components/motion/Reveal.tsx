"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { fadeIn, fadeUp, scaleIn, viewportOnce } from "@/lib/motion";

const presets = { fadeUp, fadeIn, scaleIn } as const;

type RevealProps = {
  children: ReactNode;
  /** Which entrance to use. */
  preset?: keyof typeof presets;
  /** Stagger index — multiplied by 80ms inside the variant. */
  index?: number;
  /** Extra delay in seconds, applied on top of `index`. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered entrance. Fires once when ~25% of the element is in view.
 * Collapses to a plain fade when the user prefers reduced motion.
 */
export function Reveal({
  children,
  preset = "fadeUp",
  index = 0,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduced) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.3 } }}
        viewport={viewportOnce}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={presets[preset]}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
