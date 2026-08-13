import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { whoWeAre } from "@/lib/site";

/** Two-column intro: title/subtitle left, body + emphasised line right. */
export function WhoWeAre() {
  return (
    <section id="about" className="container-content pt-[clamp(4rem,8vw,6.25rem)] pb-[clamp(5rem,10vw,9.375rem)]">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <h2 className="text-h2">
            <TextReveal text={whoWeAre.title} />
          </h2>
          <Reveal preset="fadeUp" index={1}>
            <p className="mt-[18px] text-body-28 font-medium text-grey-400">
              {whoWeAre.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-[20px]">
          <Reveal preset="fadeUp" index={1}>
            <p className="text-body-34 font-medium text-body">
              We build systems designed for{" "}
              <span className="font-semibold text-black">real operational</span>{" "}
              environments where{" "}
              <span className="font-semibold text-black">reliability</span>
              <span className="text-black">,</span>{" "}
              <span className="font-semibold text-black">scalability</span>, and{" "}
              <span className="font-semibold">long-</span>
              <span className="font-semibold text-black">term ownership</span>
              <span className="font-semibold"> matter</span>.
            </p>
          </Reveal>
          <Reveal preset="fadeUp" index={2}>
            <p className="text-body-34 font-semibold text-primary">
              {whoWeAre.emphasis}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
