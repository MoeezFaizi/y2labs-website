import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { expertise } from "@/lib/site";

/**
 * Dark strip between the KPI band and Who We Are (Figma #01062c, 1920×202).
 * Heading + lead sit at the content-left edge; the tool icons are the exact
 * 45px assets from the Figma frame, drifting in an infinite marquee that runs
 * off the right edge just like the design's overflowing row.
 */
export function ExpertiseStrip() {
  return (
    <section aria-label={expertise.title} className="bg-[#01062c] py-[clamp(2.5rem,5vw,3.75rem)] text-white">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-0">
        {/* Aligns with the global content column's left edge. */}
        <Reveal
          preset="fadeUp"
          className="shrink-0 pl-[max(1.5rem,calc((100vw-90rem)/2+1.5rem))]"
        >
          <h2 className="text-body-28 font-medium whitespace-nowrap text-white">
            {expertise.title}
          </h2>
          <p className="mt-[10px] text-body-18 whitespace-nowrap text-grey-300">
            {expertise.lead}
          </p>
        </Reveal>

        {/* Icon ticker — starts after the heading block, runs off-canvas. */}
        <div className="flex h-[80px] flex-1 items-center overflow-hidden sm:pl-[100px]">
          <Marquee speed={345}>
            {expertise.icons.map((src) => (
              <span key={src} className="flex shrink-0 items-center pr-[70px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-[45px] w-auto object-contain"
                  loading="lazy"
                />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
