"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { ease } from "@/lib/motion";
import { contactForm, testimonials } from "@/lib/site";

/**
 * Testimonial + discovery-call form on the rendered purple field.
 * Geometry mirrors the Figma CTA component: 180px top / 101px bottom padding,
 * a 669px glass testimonial card and a 641px #faf9f7 form card, both 730px
 * tall with a 40px gap. The carousel auto-advances every 7s and pauses on
 * hover/focus; with a single testimonial the four pips stay static, exactly
 * like the design.
 */
export function ContactCta({ variant = "form" }: { variant?: "form" | "image" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const id = setInterval(() => go(index + 1), 7000);
    return () => clearInterval(id);
  }, [index, paused, go]);

  const active = testimonials[index];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-primary">
      {/* The rendered purple-glass artwork from the Figma file. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cta/bg.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        loading="lazy"
      />
      {/* Curved notch, top-left. */}
      <div
        aria-hidden
        className="absolute -top-px left-0 -z-10 h-16 w-1/2 rounded-br-[64px] bg-white md:h-20"
      />

      <div className="container-content pt-[clamp(4rem,9.4vw,11.25rem)] pb-[clamp(4rem,9vw,10.875rem)]">
        <div className="grid items-stretch gap-8 lg:grid-cols-[669px_641px] lg:justify-center lg:gap-[40px]">
          {/* Testimonial */}
          <figure
            className="flex flex-col justify-between rounded-[20px] bg-[#111827]/50 p-8 md:p-10 lg:h-[730px]"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div>
              {/* Figma: the quote mark floats at the text block's top-left
                  (icon y = text y - 10); the quote's leading spaces clear it. */}
              <div className="relative min-h-[280px] sm:min-h-[320px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cta/quote.svg" alt="" aria-hidden className="absolute -top-[6px] left-0 h-9 w-auto sm:-top-[10px] sm:h-[50px]" />
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: ease.expoOut }}
                    className="whitespace-pre-wrap text-h6 font-medium text-white sm:text-[clamp(1.75rem,2.4vw,2.875rem)] sm:leading-[1.304]"
                  >
                    {active.quote}
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8">
              <div className="h-px w-full bg-[#d2d2d2]" />
              <figcaption className="mt-[30px] flex items-center gap-5">
                <div className="size-20 shrink-0 overflow-hidden rounded-[13px] bg-white">
                  <AssetImage
                    src={active.avatar}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-body-28 font-medium text-grey-100">{active.name}</p>
                  <p className="mt-1 text-body-18 font-medium text-grey-200">{active.role}</p>
                </div>
              </figcaption>

              {/* Pips — static set of four with a single testimonial (the design
                  ships one), interactive once real entries are added. */}
              <div className="mt-[30px] flex gap-[10px]" role="tablist" aria-label="Testimonials">
                {testimonials.length > 1 ? (
                  testimonials.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial ${i + 1}: ${t.name}`}
                      onClick={() => go(i)}
                      className={`h-[6px] overflow-hidden rounded-[10px] ${
                        i === index ? "w-[60px] bg-white" : "w-[20px] bg-[#666666]"
                      }`}
                    />
                  ))
                ) : (
                  <>
                    <span className="h-[6px] w-[60px] rounded-[10px] bg-white" />
                    <span className="h-[6px] w-[20px] rounded-[10px] bg-[#666666]" />
                    <span className="h-[6px] w-[20px] rounded-[10px] bg-[#666666]" />
                    <span className="h-[6px] w-[20px] rounded-[10px] bg-[#666666]" />
                  </>
                )}
              </div>
            </div>
          </figure>

          {variant === "form" ? <ContactFormCard /> : <LaptopCard />}
        </div>
      </div>
    </section>
  );
}

/** Product mock-up card used on the Contact and Product pages instead of the form. */
function LaptopCard() {
  return (
    <motion.div
      className="overflow-hidden rounded-[20px]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: ease.expoOut }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cta/laptop.png"
        alt="Y2 Labs website — Building Future with AI Solutions — on a laptop"
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

const field =
  "w-full rounded-[6px] border border-black/10 bg-white px-4 text-body-16 text-black transition-colors placeholder:text-black/40 focus:border-light-blue-2 focus:outline-none";
const label = "mb-1 block text-[14px] leading-[22px] text-black";

function ContactFormCard() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <motion.div
      className="rounded-[20px] bg-[#faf9f7] p-6 md:p-10 lg:h-[730px] lg:overflow-y-auto"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: ease.expoOut }}
    >
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/cta-phone.svg" alt="" className="mx-auto size-10" />
        <h2 className="mt-4 text-body-24 font-medium text-black">{contactForm.title}</h2>
        <p className="mx-auto mt-[10px] max-w-[530px] text-body-16 text-black/60">
          {contactForm.lead}
        </p>
      </div>

      <form
        className="mt-6 flex flex-col gap-[15px]"
        onSubmit={(e) => {
          e.preventDefault();
          // No backend wired up yet — point this at your form handler.
          setState("sending");
          setTimeout(() => setState("sent"), 900);
        }}
      >
        <div>
          <label className={label} htmlFor="cf-name">
            NAME
          </label>
          <input id="cf-name" name="name" required className={`${field} h-[47px]`} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="cf-phone">
              PHONE
            </label>
            <input id="cf-phone" name="phone" type="tel" className={`${field} h-[47px]`} />
          </div>
          <div>
            <label className={label} htmlFor="cf-email">
              BUSINESS EMAIL
            </label>
            <input id="cf-email" name="email" type="email" required className={`${field} h-[47px]`} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="cf-company">
              COMPANY NAME
            </label>
            <input id="cf-company" name="company" className={`${field} h-[47px]`} />
          </div>
          <div>
            <label className={label} htmlFor="cf-subject">
              SUBJECT
            </label>
            <select id="cf-subject" name="subject" defaultValue="" className={`${field} h-[47px]`}>
              <option value="" disabled>
                Select
              </option>
              {contactForm.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={label} htmlFor="cf-message">
            MESSAGE
          </label>
          <textarea
            id="cf-message"
            name="message"
            placeholder="Tell us about what you want to automate..."
            className={`${field} h-[91px] resize-y py-3`}
          />
        </div>

        <p className="text-[14px] leading-[20px] text-black/60">{contactForm.consent}</p>

        <motion.button
          type="submit"
          disabled={state !== "idle"}
          whileHover={{ scale: state === "idle" ? 1.02 : 1 }}
          whileTap={{ scale: state === "idle" ? 0.98 : 1 }}
          transition={{ duration: 0.2 }}
          className="group inline-flex w-fit items-center gap-[10px] rounded-full bg-light-blue-2 px-6 py-[14px] text-[16px] leading-[26px] font-medium tracking-[0.64px] text-white uppercase transition-colors duration-[350ms] hover:bg-primary disabled:opacity-70"
        >
          {state === "sent" ? "message sent" : contactForm.submit}
          <span
            aria-hidden
            className="text-[20px] leading-none normal-case transition-transform duration-300 ease-[var(--ease-expo-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
}
