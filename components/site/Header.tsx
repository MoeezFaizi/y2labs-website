"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ease, springs } from "@/lib/motion";
import { nav } from "@/lib/site";

/**
 * Floating pill header from the Figma component (1920x126).
 *
 * The pill is white at 90% with a 10px backdrop blur and sits over whatever
 * section is beneath it. It shrinks its outer padding once the page has
 * scrolled so the pill tucks closer to the top edge — the design shows the
 * spacious resting state, this is the scrolled counterpart.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 flex justify-center"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: ease.expoOut, delay: 0.1 }}
    >
      <div
        className="w-full px-gutter transition-all duration-500 ease-[var(--ease-expo-out)] xl:px-[240px]"
        style={{ paddingBlock: scrolled ? 10 : 20 }}
      >
        <div className="mx-auto flex w-full max-w-[1350px] items-center justify-between gap-6 rounded-[60px] bg-white/90 px-5 py-3 backdrop-blur-[10px] md:px-[30px] md:py-[20px]">
          {/* Logo — the actual Figma wordmark (blue Y2 + black LABS). */}
          <Link href="/" aria-label="Y2 Labs — home" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Y2 LABS" width={146} height={40} className="h-8 w-auto md:h-10" />
          </Link>

          <nav className="hidden items-center gap-[30px] xl:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative shrink-0 whitespace-nowrap text-body-18 font-medium text-grey-400 transition-colors hover:text-black"
              >
                {item.label}
                {/* Underline grows from the left on hover. */}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-light-blue-2 transition-transform duration-300 ease-[var(--ease-expo-out)] group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {/* Wrapper owns the responsive hiding — the Button base class is
                `inline-flex`, which would override `hidden` on the button. */}
            <div className="hidden sm:block">
              <Button href="/contact">Book discovery call</Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-full border border-grey-200 xl:hidden"
            >
              <motion.span
                className="block h-[1.5px] w-4 bg-black"
                animate={open ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                transition={springs.snappy}
              />
              <motion.span
                className="block h-[1.5px] w-4 bg-black"
                animate={open ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                transition={springs.snappy}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Mobile"
              className="mx-auto mt-2 max-w-[1350px] overflow-hidden rounded-[32px] bg-white/95 backdrop-blur-[10px] xl:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: ease.expoOut }}
            >
              <ul className="flex flex-col p-5">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, ease: ease.expoOut }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-grey-100 py-3 text-body-20 font-medium text-grey-400 last:border-0 hover:text-black"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <li className="pt-4 sm:hidden">
                  <Button href="/contact" size="lg" className="w-full">
                    Book discovery call
                  </Button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
