"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";

type CountUpProps = {
  to: number;
  /** Seconds. */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 to `to` the first time it scrolls into view. Uses a
 * MotionValue rather than React state so each frame doesn't re-render the tree.
 * Under `prefers-reduced-motion` it renders the final number immediately.
 */
export function CountUp({ to, duration = 1.6, className }: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  // Keep the target's decimals — 99.9 must count to "99.9", not round to "100".
  const decimals = (String(to).split(".")[1] ?? "").length;
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, to, { duration, ease: ease.expoOut });
    return () => controls.stop();
  }, [inView, reduced, count, to, duration]);

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {to}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
