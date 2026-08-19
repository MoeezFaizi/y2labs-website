import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { whoWeServe } from "@/lib/site";

/**
 * Five sector cards on white — 270×346 each, same component and hover
 * choreography as the About "Our Values" cards (Figma ON_HOVER → 399:2629,
 * SMART_ANIMATE, ease-in-out 350ms): card → navy #1D1CA1 / border #2D345F,
 * icon slides up out of the card and turns white, label slides 252 → 30,
 * description (always rendered in near-white #E2E2E2) slides 302 → 114.
 */
export function WhoWeServe() {
  return (
    <section id="who-we-serve" className="bg-white py-section">
      <div className="container-content">
        <h2 className="text-h3">
          <TextReveal text={whoWeServe.title} />
        </h2>
        <Reveal preset="fadeUp" index={1}>
          <p className="mt-[10px] max-w-[869px] text-body-28 font-medium text-grey-400">
            {whoWeServe.lead}
          </p>
        </Reveal>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {whoWeServe.items.map((item, i) => (
            <Reveal key={item.title} preset="fadeUp" index={i} as="li">
              <div className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden border border-grey-200 bg-white px-[18px] py-[30px] transition-colors duration-[350ms] ease-in-out hover:border-[#2d345f] hover:bg-primary lg:-ml-px lg:block lg:h-[346px] lg:min-h-0 lg:first:ml-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon}
                  alt=""
                  className="size-10 object-contain transition-[transform,filter] duration-[350ms] ease-in-out group-hover:brightness-0 group-hover:invert lg:absolute lg:left-[18px] lg:top-[30px] lg:group-hover:-translate-y-[70px]"
                  loading="lazy"
                />
                <h3 className="text-body-22 font-medium text-body transition-[transform,color] duration-[350ms] ease-in-out group-hover:text-white lg:absolute lg:left-[18px] lg:right-[18px] lg:top-[252px] lg:group-hover:-translate-y-[222px]">
                  {item.title}
                </h3>
                <p className="hidden text-body-18 font-normal text-[#e2e2e2] lg:absolute lg:left-[18px] lg:right-[18px] lg:top-[302px] lg:block lg:transition-transform lg:duration-[350ms] lg:ease-in-out lg:group-hover:-translate-y-[188px]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
