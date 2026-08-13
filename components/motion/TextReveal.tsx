"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { maskUp, staggerParent, viewportOnce } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  /** Reveal each word individually, or the whole line as one mask. */
  by?: "word" | "line";
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
};

/**
 * Masked text entrance — each unit slides up from behind an overflow-hidden
 * wrapper. Words keep their natural wrapping because each is inline-block.
 */
export function TextReveal({
  text,
  by = "word",
  as = "span",
  className,
  stagger = 0.05,
  delay = 0,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;
  const units = by === "word" ? text.split(" ") : [text];

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <motion.span
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span className="inline-block will-change-transform" variants={maskUp}>
            {unit}
            {by === "word" && i < units.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
