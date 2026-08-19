"use client";

import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { products } from "@/lib/site";

/** Pulls the leading integer out of "99.9%" / "500 +" so it can count up. */
function splitStat(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: null as number | null, rest: value };
  return { num: Number(match[1]), rest: match[2] };
}

/** Artwork on the right of each card — the exact renders from the Figma file. */
const artwork: Record<string, { src: string; width: number; height: number; bodyMaxW: number }> = {
  riam: { src: "/products/riam-flow.png", width: 399, height: 380, bodyMaxW: 575 },
  "it-operations": { src: "/products/ai-ops-illustration.png", width: 575, height: 413, bodyMaxW: 645 },
};

/**
 * Two dark product cards on the white canvas, stacked with the Figma file's
 * 20px overlap. Each card is 600px tall with 60px inner padding, copy and
 * stats on the left, the exported diagram artwork on the right. The whole
 * card links to the product page, lifting on hover at the prototype's 350ms.
 */
export function Products() {
  return (
    <section id="products" className="bg-white pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(3.5rem,7vw,5rem)]">
      <div className="container-content">
        <h2 className="text-h3">
          <TextReveal text={products.title} />
        </h2>
        <Reveal preset="fadeUp" index={1}>
          <p className="mt-[18px] text-body-28 font-medium text-grey-400">
            {products.lead}
          </p>
        </Reveal>

        {/* Figma prototype: MOUSE_ENTER on the whole block, 400ms delay,
            1000ms, cubic-bezier(0.83, 0, 0.19, 0.99) — the second card
            slides up 500px (offset 580 → 80) over the first, leaving an
            80px strip of it visible. No background swap, no lift. */}
        <div className="group/prod mt-[clamp(3rem,6vw,5rem)] flex flex-col gap-6 lg:gap-0">
          {products.items.map((product, i) => (
            <Reveal
              key={product.eyebrow}
              preset="scaleIn"
              index={i}
              className={i > 0 ? "lg:-mt-5 lg:relative lg:z-10" : ""}
            >
              <Link
                href={product.href}
                className={`group relative block overflow-hidden rounded-[20px] p-8 md:p-[60px] lg:h-[600px] ${
                  product.theme === "blue" ? "bg-light-blue" : "bg-primary"
                } ${
                  i > 0
                    ? "lg:transition-transform lg:delay-[400ms] lg:duration-1000 lg:ease-[cubic-bezier(0.83,0,0.19,0.99)] lg:group-hover/prod:-translate-y-[500px]"
                    : ""
                }`}
              >
                <span className="relative grid h-full gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[80px]">
                  {/* Left: copy + stats */}
                  <span className="flex flex-col justify-center">
                    <span className="block text-body-28 font-medium text-blue">
                      {product.eyebrow}
                    </span>
                    <span className="mt-5 block max-w-[482px] text-h5 font-medium text-white">
                      {product.title}
                    </span>
                    <span
                      className="mt-[14px] block text-body-24 font-medium text-grey-200"
                      style={{ maxWidth: artwork[product.slug].bodyMaxW }}
                    >
                      {product.body}
                    </span>

                    <span className="mt-10 flex flex-wrap gap-y-6">
                      {product.stats.map((stat, si) => {
                        const { num, rest } = splitStat(stat.value);
                        return (
                          <span
                            key={stat.label}
                            className={`flex flex-col ${
                              si > 0 ? "ml-5 border-l border-grey-200 pl-5" : ""
                            }`}
                          >
                            <span className="text-body-24 font-semibold text-white tabular-nums">
                              {num === null ? (
                                stat.value
                              ) : (
                                <>
                                  <CountUp to={num} />
                                  {rest}
                                </>
                              )}
                            </span>
                            <span className="mt-[10px] text-body-18 font-medium whitespace-pre-line text-grey-200">
                              {stat.label}
                            </span>
                          </span>
                        );
                      })}
                    </span>
                  </span>

                  {/* Right: the Figma diagram render — intrinsic size, centered
                      exactly as exported (399×380 / 575×413), never stretched. */}
                  <span className="relative flex items-center justify-center">
                    <AssetImage
                      src={artwork[product.slug].src}
                      alt=""
                      width={artwork[product.slug].width}
                      height={artwork[product.slug].height}
                      className="h-auto max-w-full object-contain"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
