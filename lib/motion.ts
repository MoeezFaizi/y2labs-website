import type { Transition, Variants } from "motion/react";

/** Shared easing curves. `expoOut` is the house curve for entrances. */
export const ease = {
  expoOut: [0.16, 1, 0.3, 1],
  quartOut: [0.25, 1, 0.5, 1],
  inOut: [0.65, 0, 0.35, 1],
  /** Figma's EASE_OUT prototype easing. */
  out: [0.25, 0.46, 0.45, 0.94],
} as const;

export const springs = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.9 },
  snappy: { type: "spring", stiffness: 320, damping: 28, mass: 0.6 },
  magnetic: { type: "spring", stiffness: 220, damping: 18, mass: 0.4 },
} satisfies Record<string, Transition>;

/** Viewport config used by every scroll-triggered reveal. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

/**
 * Fade + rise. `custom` is a delay multiplier so callers can stagger
 * without wrapping every item in a container variant.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: ease.expoOut },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: ease.quartOut },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.08, ease: ease.expoOut },
  }),
};

/** Parent that staggers its children's `visible` state. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Per-word/per-line text reveal, driven by a masked parent. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: ease.expoOut },
  },
};

/** Route-level transition used by the page shell. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.expoOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: ease.inOut } },
};
