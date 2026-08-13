import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { whoWeServe } from "@/lib/site";

/**
 * Five sector columns on white — 270×346 each, 40px icon at the top, caption
 * and body pinned to the bottom, #d2d2d2 hairline dividers between columns,
 * exactly the Figma layout.
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
            <Reveal
              key={item.title}
              preset="fadeUp"
              index={i}
              as="li"
              className={`group flex min-h-[280px] flex-col justify-between gap-10 py-[30px] lg:h-[346px] lg:min-h-0 lg:px-[18px] ${
                i > 0 ? "lg:border-l lg:border-grey-200" : "lg:pl-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                className="size-10 object-contain transition-transform duration-[350ms] ease-in-out group-hover:-translate-y-1"
                loading="lazy"
              />
              <h3 className="text-body-22 font-medium text-body transition-colors duration-[350ms] ease-in-out group-hover:text-black">{item.title}</h3>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
