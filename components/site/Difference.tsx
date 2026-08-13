"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { difference } from "@/lib/site";

/**
 * The five commitments. Static layout matching the Figma frame 1:1 — header
 * (eyebrow + statement), then a row of 376×514 cards that starts at the
 * content-left edge and runs off the right side of the page, clipped exactly
 * like the design. Below `lg` it becomes a native swipe row. Cards lift on
 * hover at the prototype's 350ms ease-in-out.
 */
export function Difference() {
  return (
    <section className="overflow-hidden bg-white pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[300px_950px] lg:gap-[100px]">
          <Reveal preset="fadeUp">
            <p className="text-body-28 font-medium text-grey-400">{difference.eyebrow}</p>
          </Reveal>
          <Reveal preset="fadeUp" index={1}>
            <h2 className="text-h4">{difference.title}</h2>
          </Reveal>
        </div>
      </div>

      {/* Desktop: the clipped off-canvas row, exactly like the Figma frame. */}
      <ul className="mt-[clamp(3rem,6vw,5rem)] hidden gap-5 pl-[max(1.5rem,calc((100vw-84.375rem)/2+1.5rem))] lg:flex">
        {difference.items.map((item, i) => (
          <DifferenceCard key={item.title} {...item} index={i} />
        ))}
      </ul>

      {/* Below lg: swipe carousel. */}
      <ul className="mt-[clamp(3rem,6vw,5rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-gutter lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {difference.items.map((item, i) => (
          <DifferenceCard key={item.title} {...item} index={i} snap />
        ))}
      </ul>
    </section>
  );
}

type CardProps = {
  title: string;
  body: string;
  icon: string;
  bg: string;
  tone: "light" | "dark";
  index: number;
  snap?: boolean;
};

function DifferenceCard({ title, body, icon, bg, tone, index, snap }: CardProps) {
  const light = tone === "light";
  return (
    <motion.li
      className={`flex h-[420px] w-[300px] shrink-0 flex-col justify-between border border-grey-200 p-[30px] sm:h-[514px] sm:w-[376px] sm:px-[34px] ${
        snap ? "snap-center" : ""
      } ${light ? "text-white" : "text-black"}`}
      style={{ backgroundColor: bg }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1], delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } }}
    >
      <div className="flex flex-col gap-[10px]">
        <h3 className="text-body-28 font-medium">{title}</h3>
        <p className={`text-body-20 ${light ? "text-white" : "text-body"}`}>{body}</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="size-[60px] object-contain" loading="lazy" />
    </motion.li>
  );
}
