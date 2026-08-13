"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/* ------------------------------------------------------------------ */
/*  Get in Touch — underline-style form + office map (Figma: 760px)    */
/* ------------------------------------------------------------------ */

const inputCls =
  "w-full h-[54px] border-b border-grey-200 bg-transparent px-[14px] text-body-16 font-medium text-black transition-colors placeholder:text-body focus:border-light-blue-2 focus:outline-none";

export function GetInTouch() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <section className="bg-canvas py-[clamp(3.5rem,7vw,6.25rem)]">
      <div className="container-content">
        <div className="grid items-start gap-12 lg:grid-cols-[625px_625px] lg:gap-[100px]">
          <div>
            <Reveal preset="fadeUp" index={0}>
              <p className="text-body-20 font-medium uppercase text-grey-400">
                Contact
              </p>
            </Reveal>
            <h2 className="mt-[14px] text-h3">
              <TextReveal text="Get in Touch" />
            </h2>

            <form
              className="mt-[40px]"
              onSubmit={(e) => {
                e.preventDefault();
                // No backend wired up yet — point this at your form handler.
                setState("sending");
                setTimeout(() => setState("sent"), 900);
              }}
            >
              <div className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                  <input
                    name="firstName"
                    required
                    placeholder="First Name"
                    aria-label="First Name"
                    className={inputCls}
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    className={inputCls}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Business Email"
                    aria-label="Business Email"
                    className={inputCls}
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    className={inputCls}
                  />
                </div>
                <textarea
                  name="usage"
                  placeholder="How do you plan to use AI?"
                  aria-label="How do you plan to use AI?"
                  className={`${inputCls} h-[114px] resize-none py-[14px]`}
                />
              </div>

              <button
                type="submit"
                disabled={state !== "idle"}
                className="group mt-[26px] inline-flex h-[46px] items-center gap-[10px] rounded-full bg-light-blue-2 px-[18px] py-[10px] text-body-16 font-medium uppercase tracking-[0.04em] text-white transition-colors duration-[350ms] ease-[var(--ease-in-out)] hover:bg-primary disabled:opacity-70"
              >
                {state === "sent" ? "message sent" : "Send Message"}
                <span
                  aria-hidden
                  className="text-[20px] leading-none transition-transform duration-[350ms] ease-[var(--ease-expo-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </button>
            </form>
          </div>

          <Reveal preset="fadeUp" index={1}>
            <div className="overflow-hidden rounded-[12px] border border-grey-200 lg:h-[560px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/contact/map.png"
                alt="Map — Y2 Labs office, SAIF Zone, Sharjah"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Frequently Asked Questions (Figma: 1290px, 8 rows, first open)     */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What services does Y2 Labs provide?",
    a: "We specialize in AI solutions, custom software development, web applications, cloud engineering, automation, UI/UX design, branding, and enterprise digital transformation.",
  },
  {
    q: "What industries do you work with?",
    a: "We work with startups, SMEs, enterprises, government organizations, and public-sector institutions — anywhere technology decisions carry real operational consequences.",
  },
  {
    q: "Can you build a custom AI solution for my business?",
    a: "Yes. We design and develop AI-powered solutions tailored to your workflows, documentation, and decision structures — not generic automation layered onto existing systems.",
  },
  {
    q: "Do you offer end-to-end product development?",
    a: "Absolutely. From discovery and strategy to design, development, and launch — and we stay accountable for how the product runs in production.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines depend on complexity. Small projects may take a few weeks; platform-scale programmes are phased so you see working software early and often.",
  },
  {
    q: "Do you work with startups as well as large enterprises?",
    a: "Yes. Whether you're validating a startup idea or scaling an enterprise platform, the same senior operators deliver — the engagement shape changes, the standards don't.",
  },
  {
    q: "Can you modernize or improve an existing application?",
    a: "Yes. We help businesses redesign, optimize, migrate, and modernize existing systems incrementally, without disrupting your operations.",
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Yes. We offer ongoing maintenance, monitoring, performance optimization, and continuous improvement so your system keeps running long after launch.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-content py-section">
      <h2 className="text-center text-h3">
        <TextReveal text="Frequently Asked Questions" />
      </h2>
      <Reveal preset="fadeUp" index={1}>
        <p className="mt-[18px] text-center text-body-28 font-medium text-grey-400">
          Find quick answers to the most common questions about our services
          and process.
        </p>
      </Reveal>

      <div className="mt-[clamp(3.5rem,7vw,7.5rem)]">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal
              key={f.q}
              preset="fadeUp"
              index={Math.min(i, 3)}
              className="mt-[13px] border-t border-grey-200 pt-[13px] first:mt-0 first:border-t-0 first:pt-0"
            >
              <div>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-[18px] text-left"
                >
                  <span className="text-body-22 font-medium text-black">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[24px] leading-none font-light text-black transition-transform duration-[350ms]"
                  >
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-[18px] text-body-20 font-medium text-body">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
