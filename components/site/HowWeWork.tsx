"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { howWeWork } from "@/lib/site";

/**
 * Six-step process. Mirrors the Figma frame: left-aligned title, then an
 * accordion on the left (14px row padding, hairlines, first row open showing
 * its 22/32 body) and the exported gradient illustration on the right. Rows
 * open with the prototype's ~640ms spring.
 */
export function HowWeWork() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="how-we-work" className="bg-canvas py-section">
      <div className="container-content">
        <h2 className="text-h3">
          <TextReveal text={howWeWork.title} />
        </h2>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid items-start gap-12 lg:grid-cols-[651px_649px] lg:justify-between lg:gap-[50px]">
          <ol>
            {howWeWork.steps.map((step, i) => {
              const isOpen = open === i;
              return (
                <li key={step.title} className="border-b border-grey-100">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`hww-panel-${i}`}
                    className="group flex w-full items-center gap-3 py-[14px] text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={step.icon}
                      alt=""
                      className={`shrink-0 object-contain transition-[width,height] duration-[350ms] ${
                        isOpen ? "size-[30px]" : "size-[26px]"
                      }`}
                      loading="lazy"
                    />
                    <span
                      className={`text-body-24 font-medium transition-colors duration-[350ms] ${
                        isOpen ? "text-black" : "text-body group-hover:text-black"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`hww-panel-${i}`}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.64,
                          ease: [0.34, 1.3, 0.64, 1],
                        }}
                      >
                        <p className="pt-[10px] pb-[14px] text-body-22 font-medium text-body">
                          {step.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <Reveal preset="scaleIn" className="relative">
            <AssetImage
              src="/how-we-work/illustration.png"
              alt="The delivery cycle: discovery, scoping, prototyping, delivery, launch, partnership"
              width={649}
              height={560}
              className="mx-auto h-auto w-full max-w-[649px] object-contain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
