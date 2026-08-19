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
 * Per-row artwork revealed on hover — the exact image fills exported from the
 * Figma instances. Rows 1–4 use scaleMode FILL (cover), row 5 uses FIT.
 */
const serviceArt = [
  { src: "/services/svc-1.jpg", fit: "object-cover" },
  { src: "/services/svc-2.jpg", fit: "object-cover" },
  { src: "/services/svc-3.jpg", fit: "object-cover" },
  { src: "/services/svc-4.jpg", fit: "object-cover" },
  { src: "/services/svc-5.jpg", fit: "object-contain" },
] as const;

/**
 * Numbered service rows. Desktop mirrors the Figma prototype exactly —
 * ON_HOVER → 591:2376, SMART_ANIMATE, ease-in-out 550ms: the row grows
 * 124 → 350px, the number 34 → 48px and recentres (40 → 146), the artwork
 * grows from an invisible 26.9×20 thumbnail (441.6, 52) to 350×270 (280, 40)
 * fading in, the heading 30 → 38px (42 → 67), and the description plus four
 * capability chips fade in, shifting 98 → 123. On mobile (no hover) the rows
 * keep the tap-to-open accordion.
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
                {/* ---- Desktop: Figma hover-expand row (124 → 350) ---- */}
                <div className="group relative hidden overflow-hidden shadow-[inset_0_-1px_0_0_var(--color-grey-300)] transition-[height] duration-[550ms] ease-in-out last:shadow-[inset_0_-1px_0_0_var(--color-grey-200)] lg:block lg:h-[124px] lg:hover:h-[350px]">
                  <span className="absolute left-0 top-[40px] w-[220px] text-[34px] leading-[44px] font-medium text-grey-300 transition-all duration-[550ms] ease-in-out group-hover:top-[146px] group-hover:text-[48px] group-hover:leading-[58px]">
                    {item.number}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={serviceArt[i].src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className={`absolute left-[441.6px] top-[52px] h-[20px] w-[26.9px] rounded-[14px] opacity-0 transition-all duration-[550ms] ease-in-out group-hover:left-[280px] group-hover:top-[40px] group-hover:h-[270px] group-hover:w-[350px] group-hover:opacity-100 ${serviceArt[i].fit}`}
                  />
                  <h3 className="absolute left-[690px] top-[42px] w-[660px] text-[30px] leading-[40px] font-semibold text-body transition-all duration-[550ms] ease-in-out group-hover:top-[67px] group-hover:text-[38px] group-hover:leading-[48px]">
                    {item.title}
                  </h3>
                  <div className="absolute left-[690px] top-[98px] w-[660px] opacity-0 transition-all duration-[550ms] ease-in-out group-hover:top-[123px] group-hover:opacity-100">
                    <p className="text-[20px] leading-[30px] font-medium text-grey-400">
                      {item.body}
                    </p>
                    <ul className="mt-[24px] grid grid-cols-2 gap-x-[4px] gap-y-[16px]">
                      {item.tags.slice(0, 4).map((tag) => (
                        <li key={tag} className="flex h-[30px] w-[274px] items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tagIcons[tag]}
                            alt=""
                            aria-hidden
                            className="size-6 shrink-0 object-contain"
                            loading="lazy"
                          />
                          <span className="text-[20px] leading-[28px] font-medium whitespace-nowrap text-grey-400">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ---- Mobile / touch: tap-to-open accordion ---- */}
                <div className="shadow-[inset_0_-1px_0_0_var(--color-grey-300)] last:shadow-[inset_0_-1px_0_0_var(--color-grey-200)] lg:hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${i}`}
                      className="group grid w-full grid-cols-[auto_1fr] items-center gap-6 py-[clamp(1.5rem,3vw,2.5rem)] text-left"
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
                        <div className="pb-10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={serviceArt[i].src}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="mb-6 h-auto w-full max-w-[350px] rounded-[14px] object-cover"
                          />
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
