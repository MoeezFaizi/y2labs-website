"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ease, staggerParent } from "@/lib/motion";
import { services } from "@/lib/site";

/** Tag → icon, mirroring the Figma expanded service rows. */
const tagIcons: Record<string, string> = {
  "Domain-First Architecture": "/services/internet.svg",
  "AI-Native Design": "/services/ai-05.svg",
  "Sector Knowledge": "/services/package.svg",
  "Built for Handover": "/services/workflow.svg",
  "Multi-Step Workflow": "/services/grid-view.svg",
  "LLM Integration": "/services/internet.svg",
  "Fine-Tuned Domain Models": "/services/file-02.svg",
  "Document Processing": "/services/license.svg",
  "Change Management": "/services/exchange.svg",
  "CMS Integration": "/services/computer-settings.svg",
  "AI-Enhanced Experiences": "/services/ai-04.svg",
  "Web Applications & Portals": "/services/internet.svg",
  "Performance Engineering": "/services/ai-05.svg",
  "Ongoing Optimisation": "/services/auto-conversations.svg",
  "Brand Identity": "/services/crown.svg",
  "UI/UX Design": "/services/computer.svg",
  "Design Systems": "/services/grid-view.svg",
  "Pitch & Proposal Materials": "/services/arrow-up-right.svg",
  "Brand for New Ventures": "/services/airplane.svg",
  "CI/CD Pipelines": "/services/structure.svg",
  "Cloud Architecture": "/services/cloud-upload.svg",
  "Observability From Day One": "/services/eye.svg",
  "Security Built In": "/services/lock.svg",
  "Ongoing SRE Support": "/services/headset.svg",
};

/**
 * Numbered service accordion. Rows mirror the Figma collapsed state exactly —
 * 40px vertical padding, 10px between rows, #9ca3af hairlines — and the open
 * row reveals the body plus icon-tagged capabilities in two columns, animated
 * at the prototype's 550ms ease-in-out.
 */
export function Services() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" className="bg-white pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(3rem,5vw,3.75rem)]">
      <div className="container-content">
        <div className="text-center">
          <h2 className="text-h3">
            <TextReveal text={services.title} />
          </h2>
          <Reveal preset="fadeUp" index={1}>
            <p className="mx-auto mt-[18px] max-w-[1222px] text-body-28 font-medium text-grey-400">
              {services.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col gap-[10px]">
          {services.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.number} preset="fadeUp" index={i}>
                {/* 1px divider painted as inset shadow so it doesn't add layout
                    height — keeps each closed row exactly 124px like Figma. */}
                <div className="shadow-[inset_0_-1px_0_0_var(--color-grey-300)] last:shadow-[inset_0_-1px_0_0_var(--color-grey-200)]">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${i}`}
                      className="group grid w-full grid-cols-[auto_1fr] items-center gap-6 py-[clamp(1.5rem,3vw,2.5rem)] text-left md:grid-cols-2 md:gap-10"
                    >
                      <span className="text-body-34 font-medium text-grey-300 transition-colors duration-[550ms] ease-in-out group-hover:text-light-blue-2">
                        {item.number}
                      </span>
                      <span className="text-h6 font-semibold text-body transition-colors duration-[550ms] ease-in-out group-hover:text-black">
                        {item.title}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-panel-${i}`}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: ease.out }}
                      >
                        <div className="grid gap-6 pb-10 md:grid-cols-2 md:gap-10">
                          <div aria-hidden />
                          <div>
                            <p className="max-w-[660px] text-body-20 font-medium text-grey-400">
                              {item.body}
                            </p>
                            <motion.ul
                              className="mt-6 grid gap-x-1 gap-y-4 sm:grid-cols-2"
                              variants={staggerParent(0.05, 0.1)}
                              initial="hidden"
                              animate="visible"
                            >
                              {item.tags.map((tag) => (
                                <motion.li
                                  key={tag}
                                  variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 },
                                  }}
                                  transition={{ duration: 0.4, ease: ease.expoOut }}
                                  className="flex items-center gap-2"
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={tagIcons[tag]}
                                    alt=""
                                    className="size-6 shrink-0 object-contain"
                                    loading="lazy"
                                  />
                                  <span className="text-body-20 font-medium text-grey-400">
                                    {tag}
                                  </span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
