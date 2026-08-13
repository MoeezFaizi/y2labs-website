"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Rotating word ticker from the Figma contact-hero component (1163:4772).
 * One word visible at a time; the stack advances on the prototype's cadence
 * (~400ms hold + ~1s travel) with its exact CUSTOM_SPRING
 * (mass 1, stiffness 100, damping 15). Words render in the component's
 * linear gradient (#1d1ca1 → #3884f4 → #5344d5).
 */
export function WordRotator({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  // +1 duplicate of the first word so the loop wraps without a rewind.
  const loop = [...words, words[0]];
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [rowH, setRowH] = useState(0);

  useEffect(() => {
    const first = listRef.current?.children[0] as HTMLElement | undefined;
    if (first) setRowH(first.offsetHeight);
  }, []);

  useEffect(() => {
    if (reduced || rowH === 0) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % loop.length);
    }, 1500);
    return () => clearInterval(t);
  }, [reduced, rowH, loop.length]);

  // When the duplicate first word is fully shown, snap back to the real one.
  useEffect(() => {
    if (index !== loop.length - 1) return;
    const t = setTimeout(() => {
      setInstant(true);
      setIndex(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    }, 1050);
    return () => clearTimeout(t);
  }, [index, loop.length]);

  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ height: rowH || undefined }}
    >
      <motion.div
        ref={listRef}
        className="flex flex-col"
        animate={{ y: -index * rowH }}
        transition={
          instant || reduced
            ? { duration: 0 }
            : { type: "spring", mass: 1, stiffness: 100, damping: 15 }
        }
      >
        {loop.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="block bg-[linear-gradient(100deg,#1d1ca1_0%,#3884f4_43%,#5344d5_100%)] bg-clip-text leading-[1.12] font-semibold whitespace-nowrap text-transparent"
          >
            {w}
          </span>
        ))}
      </motion.div>
    </span>
  );
}
