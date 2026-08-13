"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { ease, staggerParent, viewportOnce } from "@/lib/motion";
import { hero } from "@/lib/site";

/** Word-level masked reveal for the H1, split so each line can wrap naturally. */
const word = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1, ease: ease.expoOut } },
};

const riseIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.5 + i * 0.12, ease: ease.expoOut },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The globe drifts up and fades slightly as the hero leaves — subtle depth,
  // not a full parallax, so it never detaches from the headline.
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const words = hero.headline.split(" ");

  return (
    <section
      ref={ref}
      className="hero-field relative isolate overflow-hidden rounded-b-[40px] pb-[clamp(4rem,10vw,9.875rem)] pt-[clamp(9rem,14vw,10.875rem)] md:rounded-bl-[140px] md:rounded-br-none"
    >
      {/* Glow + globe. The radial glow is CSS (see .hero-field) so the hero
          still reads correctly before the globe render is exported. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-[-12%] z-0 w-[46%] max-w-[662px] min-w-[380px] opacity-40 sm:opacity-100 lg:top-[10.875rem] lg:right-[3.375rem]"
        style={reduced ? undefined : { y: globeY, opacity: globeOpacity }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: ease.expoOut, delay: 0.2 }}
      >
        {/* Slow rotation reads as the network sphere turning. CSS keyframes,
            not a motion value, so SSR never parks it at the end state. */}
        <div className="globe-spin relative aspect-square">
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-blue)_55%,transparent)_0%,transparent_68%)] blur-2xl" />
          <AssetImage
            src="/hero/globe.png"
            alt=""
            width={662}
            height={696}
            priority
            sizes="(max-width: 1024px) 60vw, 662px"
            className="relative h-full w-full object-contain"
          />
        </div>
      </motion.div>

      <div className="container-content relative z-10">
        <div className="max-w-[948px]">
          <h1 className="text-h1 text-white [text-wrap:wrap]">
            <motion.span
              className="inline"
              variants={staggerParent(0.045)}
              initial="hidden"
              animate="visible"
              aria-label={hero.headline}
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
                    {i < words.length - 1 ? " " : null}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.div
            className="mt-[30px] flex max-w-[875px] flex-col gap-[26px]"
            variants={riseIn}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            {hero.paragraphs.map((p) => (
              <p key={p} className="text-body-20 text-grey-100">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="mt-[40px] flex flex-wrap items-center gap-[16px] sm:gap-[30px]"
            variants={riseIn}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <Button
              href={hero.primaryCta.href}
              variant="primary"
              size="lg"
              trailing={
                <AssetImage
                  src="/icons/video.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 shrink-0"
                />
              }
            >
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.div
            className="mt-[clamp(3rem,6vw,3.75rem)] flex flex-col gap-[20px]"
            variants={riseIn}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-body-18 font-medium text-grey-100">
              {hero.customersLabel}
            </p>
            <ul className="flex flex-wrap items-center gap-[40px]">
              {hero.customers.map((c) => (
                <li key={c.name}>
                  {/* Recoloured via mask, matching the Figma mask groups: the
                      exported PNG supplies the alpha, the token supplies ink. */}
                  <span
                    role="img"
                    aria-label={c.name}
                    className="block bg-grey-100 opacity-90 transition-opacity hover:opacity-100"
                    style={{
                      width: c.width,
                      height: c.height,
                      maskImage: `url(${c.src})`,
                      WebkitMaskImage: `url(${c.src})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
