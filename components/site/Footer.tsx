import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { footer } from "@/lib/site";

/**
 * Black footer (Figma: 1920×996). The particle-burst render sits on the left
 * as the section background; the white wordmark anchors the lower-left while
 * the right column carries the headline, contact pills, a gradient hairline,
 * the link columns and the legal bar — spaced exactly as the design.
 */
export function Footer() {
  return (
    <footer className="relative z-10 -mt-[clamp(6rem,var(--fo-vw,9.3vw),var(--fo-max,11.125rem))] overflow-hidden rounded-tl-[clamp(60px,7.3vw,140px)] bg-black text-white">
      {/* Particle-burst artwork, placed exactly as in the Figma file
          (640×780 at x=371, y=+170 inside the footer). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/footer/burst.png"
        alt=""
        aria-hidden
        className="absolute left-[371px] top-[170px] hidden h-[780px] w-[640px] lg:block"
        loading="lazy"
      />

      <div className="container-content relative z-10 pt-[clamp(5rem,14.65vw,17.875rem)] pb-[clamp(2rem,4vw,2.875rem)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_640px]">
          {/* Wordmark over the burst — lower-left, just above the link rows. */}
          <Reveal preset="fadeIn" className="flex items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.svg"
              alt="Y2 LABS"
              className="h-[49px] w-auto lg:mt-[237px]"
            />
          </Reveal>

          <div>
            <Reveal preset="fadeUp">
              <h2 className="text-body-34 font-medium text-white">{footer.headline}</h2>
              <p className="mt-[9px] max-w-[656px] text-body-16 text-white lg:whitespace-nowrap">{footer.lead}</p>
            </Reveal>

            <Reveal preset="fadeUp" index={1}>
              <div className="mt-[clamp(2rem,4vw,3.75rem)] flex flex-wrap items-center gap-5">
                <Magnetic strength={10}>
                  <Button
                    href={footer.cta.href}
                    variant="primary"
                    size="md"
                    trailing={
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/icons/video.svg" alt="" aria-hidden className="size-6" />
                    }
                  >
                    {footer.cta.label}
                  </Button>
                </Magnetic>
                <a
                  href={`tel:${footer.phone.replace(/[^\d+]/g, "")}`}
                  className="rounded-full border border-[#666666] px-[18px] py-[10px] text-[16px] leading-[24px] text-[#f5f5f7] transition-colors duration-[350ms] hover:border-white hover:bg-white hover:text-black"
                >
                  {footer.phone}
                </a>
                <a
                  href={`mailto:${footer.email}`}
                  className="rounded-full border border-[#666666] px-[18px] py-[10px] text-[16px] leading-[24px] text-[#f5f5f7] transition-colors duration-[350ms] hover:border-white hover:bg-white hover:text-black"
                >
                  {footer.email}
                </a>
              </div>
            </Reveal>

            {/* Gradient hairline above the link columns (right column only). */}
            <div
              aria-hidden
              className="mt-[clamp(2.5rem,5vw,4rem)] h-px w-full bg-gradient-to-r from-white/30 via-white/15 to-transparent"
            />

            {/* Link columns */}
            <div className="mt-[clamp(2.5rem,5vw,3.75rem)] grid gap-10 sm:grid-cols-[1fr_1fr_auto] sm:gap-[80px]">
              {footer.columns.map((col, i) => (
                <Reveal key={col.title} preset="fadeUp" index={i}>
                  <h3 className="text-body-20 font-medium text-white">{col.title}</h3>
                  <ul className="mt-[30px] flex flex-col gap-[14px]">
                    {col.links.map((link) => (
                      <li key={link.label} className="flex h-[30px] items-center">
                        <Link
                          href={link.href}
                          className="text-body-16 font-medium text-grey-200 no-underline decoration-light-blue decoration-2 underline-offset-[4px] transition-colors duration-[350ms] ease-in-out hover:text-light-blue hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}

              <Reveal preset="fadeUp" index={2}>
                <h3 className="text-body-20 font-medium text-white">Social</h3>
                <ul className="mt-[30px] grid w-fit grid-cols-2 gap-x-5 gap-y-[14px]">
                  {footer.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={s.label}
                        className="block transition-transform duration-[350ms] hover:-translate-y-0.5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.icon} alt="" className="size-6 object-contain" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Bottom bar */}
            <div className="mt-[clamp(2.5rem,5.47vw,6.5625rem)] flex flex-col gap-4 sm:h-[30px] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[16px] leading-[24px] text-[#f5f5f7]">{footer.copyright}</p>
              <ul className="flex flex-wrap gap-5">
                {footer.legal.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[16px] leading-[24px] text-white transition-colors duration-[350ms] hover:text-grey-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
