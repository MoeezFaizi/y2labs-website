"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, staggerParent } from "@/lib/motion";

type PageHeroProps = {
  title: string;
  /** Optional node appended after the last title word (e.g. the rotating ticker). */
  titleTrailing?: ReactNode;
  /** Overrides the h1 aria-label when titleTrailing changes the spoken text. */
  ariaLabel?: string;
  /** Keyed artwork (transparent PNG) shown on the right of the headline. */
  art?: {
    src: string;
    alt?: string;
    /** Vertical alignment inside the hero; "bottom" suits grounded scenes. */
    align?: "center" | "bottom";
    className?: string;
    /** Extra classes on the art container (e.g. "lg:justify-start" to hug the column edge). */
    containerClassName?: string;
  };
  /** Product pages: which side of the RIAM / IT-Operations toggle is active. */
  productPill?: "riam" | "it-operations";
  /** Optional exact padding overrides (default suits the shared design). */
  ptClassName?: string;
  pbClassName?: string;
  /** Extra classes on the headline (e.g. nudge to the Figma y-position). */
  headingClassName?: string;
  /** Override the lg grid columns (product heroes need a wider title column). */
  colsClassName?: string;
};

const word = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: ease.expoOut } },
};

/**
 * Sub-page hero on the dark field — mirrors the Figma inner-page design:
 * large masked headline on the left, keyed artwork on the right, the curved
 * white sweep at the bottom-left, and (on product pages) the centred product
 * toggle pill.
 */
export function PageHero({ title, titleTrailing, ariaLabel, art, productPill, ptClassName, pbClassName, headingClassName, colsClassName }: PageHeroProps) {
  const words = title.split(" ");

  return (
    <section className="hero-field relative isolate overflow-hidden rounded-b-[40px] md:rounded-bl-[140px] md:rounded-br-none">
      <div className="container-content relative z-10">
        <div
          className={`grid items-center gap-10 ${ptClassName ?? (productPill ? "pt-[clamp(6rem,7.5vw,8.125rem)]" : "pt-[clamp(10rem,15vw,17rem)]")} ${colsClassName ?? "lg:grid-cols-[1.05fr_1fr]"} ${
            productPill
              ? (pbClassName ?? "pb-0")
              : (pbClassName ?? "pb-[clamp(7rem,10vw,10rem)]")
          }`}
        >
          <h1 className={`max-w-[760px] text-h1 text-white [text-wrap:wrap] ${headingClassName ?? ""}`}>
            <motion.span
              className="inline"
              variants={staggerParent(0.045, 0.1)}
              initial="hidden"
              animate="visible"
              aria-label={ariaLabel ?? title}
            >
              {words.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="inline-block overflow-hidden align-bottom"
                  aria-hidden
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={word}
                  >
                    {w}
                    {i < words.length - 1 ? "\u00A0" : null}
                  </motion.span>
                </span>
              ))}
              {titleTrailing ? (
                <span
                  className="inline-block overflow-hidden align-bottom"
                  aria-hidden
                >
                  <motion.span
                    className="inline-flex will-change-transform"
                    variants={word}
                  >
                    {" "}
                    {titleTrailing}
                  </motion.span>
                </span>
              ) : null}
            </motion.span>
          </h1>

          {art && (
            <motion.div
              className={`relative hidden justify-center self-stretch lg:flex ${
                art.align === "bottom" ? "items-end" : "items-center"
              } ${art.containerClassName ?? ""}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: ease.expoOut }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={art.src}
                alt={art.alt ?? ""}
                aria-hidden={!art.alt}
                className={`w-auto object-contain lg:max-w-none ${
                  art.className ?? "h-[clamp(320px,28vw,520px)]"
                }`}
              />
            </motion.div>
          )}
        </div>

        {productPill && (
          <motion.div
            className="flex justify-center pt-[clamp(4rem,6vw,7.1875rem)] pb-[clamp(6rem,11vw,12.25rem)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: ease.expoOut }}
          >
            <div className="flex items-center gap-1 rounded-full border border-white/12 bg-[#181b47]/90 p-[6px] backdrop-blur-sm">
              <ProductPillLink
                href="/product/riam"
                active={productPill === "riam"}
                label="RIAM"
              />
              <ProductPillLink
                href="/product/it-operations"
                active={productPill === "it-operations"}
                label="Intelligent It operations Platform"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProductPillLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-5 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-300 ${
        active
          ? "bg-white text-primary"
          : "text-white/75 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
