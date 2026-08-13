"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Pixels per second. Negative scrolls right-to-left reversed. */
  speed?: number;
  /** Pause the drift while the pointer is over the track. */
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Seamless horizontal ticker. The content is rendered twice and the track is
 * wrapped modulo the width of one copy, so there is no snap at the loop point.
 * Frame-driven rather than CSS-keyframed so the speed stays constant regardless
 * of content width.
 */
export function Marquee({
  children,
  speed = 60,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  /** Monotonic distance travelled, in px. Kept positive and wrapped on read. */
  const travelled = useRef(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (reduced || paused) return;
    const copyWidth = copyRef.current?.offsetWidth ?? 0;
    if (copyWidth === 0) return;

    // delta is in ms; convert to seconds for a px/sec speed.
    travelled.current += (speed * delta) / 1000;
    // Wrap so copy #2 slides exactly into copy #1's place — no snap.
    const wrapped = ((travelled.current % copyWidth) + copyWidth) % copyWidth;
    x.set(-wrapped);
  });

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      onPointerEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ x: reduced ? 0 : x }}
      >
        <div ref={copyRef} className="flex shrink-0 items-center">
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
