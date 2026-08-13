import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { kpis } from "@/lib/site";

/**
 * Three-up KPI strip on the light canvas. Numbers are H1-scale (70/92
 * Semibold); the unit sits baseline-aligned beside them at 30% black.
 */
export function KpiStats() {
  return (
    <section aria-label="By the numbers" className="container-content pt-[clamp(4rem,9vw,7.5rem)] pb-[clamp(3rem,7vw,5.3125rem)]">
      <dl className="flex flex-col gap-[clamp(2rem,4vw,3rem)] sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between">
        {kpis.map((kpi, i) => (
          <Reveal key={kpi.label} preset="fadeUp" index={i} className="flex flex-col gap-[12px]">
            <dd className="flex items-end gap-[12px] py-[3.5px]">
              <span className="text-h1 font-semibold text-black tabular-nums">
                <CountUp to={kpi.value} />
              </span>
              <span
                className={`${
                  kpi.suffixSize === "lg" ? "text-h4" : "text-body-24"
                } font-medium whitespace-pre-line text-black/30`}
              >
                {kpi.suffix}
              </span>
            </dd>
            <dt className="text-body-22 font-medium text-black">{kpi.label}</dt>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
