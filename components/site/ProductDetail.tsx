"use client";

import { useEffect } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { PageHero } from "@/components/site/PageHero";
import {
  IconBrain,
  IconCircleCheck,
  IconCloudUpload,
  IconDatabase,
  IconGrid,
  IconHeadset,
  IconLock,
  IconNetwork,
  IconSearch,
  IconSettings,
  IconShareNodes,
  IconShieldCheck,
  IconStar,
  IconUsers,
} from "@/components/ui/icons";

type Product = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
};

/** Routes each product slug to its Figma-designed detail page. */
export function ProductDetail({ product }: { product: Product }) {
  // Product pages overlap the footer by 216px (Figma), not the usual 178px.
  useEffect(() => {
    const el = document.documentElement;
    el.style.setProperty("--fo-vw", "11.25vw");
    el.style.setProperty("--fo-max", "13.5rem");
    return () => {
      el.style.removeProperty("--fo-vw");
      el.style.removeProperty("--fo-max");
    };
  }, []);

  if (product.slug === "it-operations") return <ProductItOps />;
  return <ProductRiam />;
}

/* ================================================================== */
/*  Product 01 — RIAM (identity platform)                              */
/* ================================================================== */

const riamModules = [
  { icon: IconShareNodes, label: "Sync & Ingest" },
  { icon: IconStar, label: "Provisioning" },
  { icon: IconLock, label: "Authentication" },
  { icon: IconUsers, label: "Federation & SSO" },
  { icon: IconShieldCheck, label: "Credential Sync" },
  { icon: IconSettings, label: "Admin & Self-Service" },
];

function ProductRiam() {
  return (
    <>
      <PageHero
        title="Transform Ideas into Operational Success."
        art={{ src: "/products/cube.png", className: "h-[clamp(320px,28vw,530px)]" }}
        productPill="riam"
        colsClassName="lg:grid-cols-[730px_1fr]"
      />

      {/* One identity platform — header + captioned capability diagram */}
      <section className="container-content pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(4.5rem,9vw,7.4375rem)]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
          <div>
            <h2 className="text-h2">
              <TextReveal text="One identity platform for every system you run." />
            </h2>
            <Reveal preset="fadeUp" index={1}>
              <p className="mt-[18px] text-body-28 font-medium text-grey-400">
                We Build Technology for Real Operational Environments
              </p>
            </Reveal>
          </div>
          <Reveal preset="fadeUp" index={1}>
            <p className="text-body-28 font-medium text-body">
              Manage identities, access, and user lifecycles across every
              enterprise application — from a{" "}
              <strong className="font-semibold text-black">
                single platform.
              </strong>{" "}
              <strong className="font-semibold text-black">RIAM</strong>{" "}
              centralizes login, account creation, permissions, and single
              sign-on (SSO) across all your systems, deployed on-premises, in
              the <strong className="font-semibold text-black">cloud</strong>,
              or <strong className="font-semibold text-black">hybrid.</strong>
            </p>
          </Reveal>
        </div>

        <Reveal preset="fadeUp" index={2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/products/identity-cells.png"
            alt="Connect everything, automate the lifecycle, and own your infrastructure — RIAM capability diagram"
            className="mt-[clamp(3.5rem,7vw,6.25rem)] hidden w-full sm:block"
            loading="lazy"
          />
          {/* Mobile: the three cells stacked so the text stays readable. */}
          <div className="mt-14 flex flex-col gap-10 sm:hidden">
            {[1, 2, 3].map((n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={n}
                src={`/products/identity-cell-${n}.png`}
                alt=""
                aria-hidden
                className="w-full"
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Cross-Border Payments .Fintech — identity-core diagram */}
      <section className="bg-canvas pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(4.5rem,9vw,7.4375rem)]">
        <div className="container-content">
          <h2 className="text-center text-h3">
            <TextReveal text="Cross-Border Payments .Fintech" />
          </h2>
          <Reveal preset="fadeUp" index={1}>
            <p className="mx-auto mt-[30px] max-w-[1062px] text-center text-body-24 font-medium text-body">
              RIAM pulls identity data in from your systems of record, manages
              it in one central core, and delivers governed access out to every
              connected application.
            </p>
          </Reveal>
          <Reveal preset="fadeUp" index={2}>
            {/* Wide flow diagram: swipeable on small screens so labels stay readable. */}
            <div className="-mx-gutter mt-[clamp(3.5rem,8vw,8.75rem)] overflow-x-auto px-gutter sm:mx-0 sm:overflow-visible sm:px-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/cross-diagram.png"
                alt="RIAM identity core diagram — HR & ERP, directories, databases and cloud IdPs feed six modules around one identity core, delivering to cloud applications, on-prem applications and federated partners"
                className="mx-auto w-[200%] max-w-none sm:w-full sm:max-w-[1252px]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Six Modules, One Core */}
      <section className="container-content py-section">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
          <h2 className="text-h2">
            <TextReveal text="Six Modules , One Core" />
          </h2>
          <Reveal preset="fadeUp" index={1} className="flex items-center">
            <p className="text-body-24 font-medium text-body">
              Each capability is a separate module that shares the same
              identity core. Deploy only the modules you need today, or adopt
              the complete platform—and add the rest as you grow.
            </p>
          </Reveal>
        </div>

        <ul className="mt-[clamp(3.5rem,7.5vw,8.375rem)] grid grid-cols-2 gap-px border border-grey-200 bg-grey-200 lg:grid-cols-3">
          {riamModules.map((m, i) => (
            <Reveal key={m.label} preset="fadeUp" index={i % 3} as="li">
              <div className="flex h-full min-h-[180px] flex-col justify-between bg-white p-[30px] lg:h-[267px]">
                <m.icon className="size-7 text-black" />
                <p className="text-body-16 font-medium text-black">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ================================================================== */
/*  Product 02 — Intelligent IT Operations Platform                    */
/* ================================================================== */

const itAgents = [
  {
    icon: IconNetwork,
    title: "Castrel AI RCA Agent",
    body: "Autonomously detects, diagnoses, and locates incident sources.",
    points: [
      ["Rapid Investigation:", "Completes complex troubleshooting in under 2 minutes"],
      ["High Accuracy:", "Achieves 77.2% Top-3 accuracy in identifying probable root causes."],
    ],
  },
  {
    icon: IconHeadset,
    title: "Request & Support Agents",
    body: "Provide voice/chatbot interaction, intelligent approval, and solution generation for service requests.",
    points: [],
  },
  {
    icon: IconShieldCheck,
    title: "Operation Assurance Agents",
    body: "Continuous protection through the incident lifecycle.",
    points: [
      ["Pre-event:", "Risk identification and enhancement plans"],
      ["In-event:", "Fast recovery to reduce business losses"],
      ["Post-event:", "Automated fault timelines and reporting"],
    ],
  },
] as const;

const framework = [
  {
    title: "1 Minute to Sense",
    body: "Detect an issue immediately through proactive monitoring.",
  },
  {
    title: "5 Minutes to Locate",
    body: "Rapidly identify the true root cause using AI RCA.",
  },
  {
    title: "10 Minutes to Act",
    body: "Resolve the problem autonomously or via remediation bots.",
  },
  {
    title: "Real-World Result",
    body: "A case study showed a reduction in MTTR from 100 minutes down to 16 minutes.",
  },
];

const cmdb = [
  {
    icon: IconSearch,
    title: "Auto-Discovery",
    body: "Automatically maps IT infrastructure|across hybrid and multi-cloud|environments (AWS, Alibaba Cloud,|Huawei Cloud, VMware).",
  },
  {
    icon: IconCircleCheck,
    title: "Data Governance",
    body: "Ensures high-quality data through 5|layers of quality control, including|standard reconciliation and|normalization.",
  },
  {
    icon: IconGrid,
    title: "Architecture & Dashboard",
    body: "Automatically maps IT infrastructure|across hybrid and multi-cloud|environments (AWS, Alibaba Cloud,|Huawei Cloud, VMware).",
  },
];

const businessValue = [
  {
    icon: IconBrain,
    title: "Smarter Decisions",
    body: "Breaks down skill barriers, making data-driven insights accessible to everyone in the team.",
    card: "bg-[#d7fd33]",
    titleCls: "text-black",
    bodyCls: "text-body",
    iconCls: "text-black",
  },
  {
    icon: IconDatabase,
    title: "Cost Optimization",
    body: "Provides a controllable and predictable TCO with an adaptable pricing model.",
    card: "bg-[#e7eaeb]",
    titleCls: "text-black",
    bodyCls: "text-body",
    iconCls: "text-black",
  },
  {
    icon: IconCloudUpload,
    title: "Flexible Deployment",
    body: "Available as On-premise (for data-sensitive industries like Gov/FSI), SaaS, or Perpetual Licenses.",
    card: "bg-primary",
    titleCls: "text-white",
    bodyCls: "text-white",
    iconCls: "text-white",
  },
];

function ProductItOps() {
  return (
    <>
      <PageHero
        title="Transform Ideas into Operational Success."
        art={{ src: "/products/cube.png", className: "h-[clamp(320px,28vw,530px)]" }}
        productPill="it-operations"
        colsClassName="lg:grid-cols-[730px_1fr]"
      />

      {/* Intro — The Blueprint for an AI-Powered Enterprise */}
      <section className="container-content pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(5rem,11vw,13.0625rem)]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
          <div>
            <h2 className="text-h2">
              <TextReveal text="Y2Labs Intelligent IT Operations Platform" />
            </h2>
            <Reveal preset="fadeUp" index={1}>
              <p className="mt-[18px] text-body-28 font-medium text-grey-400">
                The Blueprint for an AI-Powered Enterprise
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col gap-[40px]">
            <Reveal preset="fadeUp" index={1}>
              <p className="text-body-24 font-medium text-body">
                <strong className="font-semibold text-black">Y2Labs</strong>{" "}
                offers an integrated platform
                <br className="hidden lg:block" /> that serves as a{" "}
                <strong className="font-semibold text-black">
                  &quot;Single Pane of Glass&quot;
                </strong>
                <br className="hidden lg:block" /> by unifying IT Service
                Management
                <br className="hidden lg:block" />{" "}
                <strong className="font-semibold text-black">(ITSM)</strong> and
                an Intelligent{" "}
                <strong className="font-semibold text-black">CMDB.</strong>
              </p>
            </Reveal>
            <Reveal preset="fadeUp" index={2}>
              <p className="text-body-24 font-medium text-body">
                Built on a foundation of Agentic AI using
                <br className="hidden lg:block" />{" "}
                <strong className="font-semibold text-black">
                  Large Language Models
                </strong>{" "}
                (LLM), the
                <br className="hidden lg:block" /> solution transforms{" "}
                <strong className="font-semibold text-black">raw data</strong>{" "}
                into
                <br className="hidden lg:block" /> actionable intelligence to{" "}
                <strong className="font-semibold text-black">
                  automate
                </strong>
                <br className="hidden lg:block" />{" "}
                <strong className="font-semibold text-black">
                  manual-heavy operations.
                </strong>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core-Intelligent Agents */}
      <section className="bg-canvas py-section">
        <div className="container-content">
          <h2 className="text-center text-h3">
            <TextReveal text="Core-Intelligent Agents" />
          </h2>

          <div className="mt-[clamp(3.5rem,7vw,6.25rem)] grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[60px]">
            <Reveal preset="fadeUp" index={0}>
              <div className="flex flex-col justify-between divide-y divide-grey-200 border border-grey-200 bg-white px-[45px] py-[40px] lg:h-[729px]">
                {itAgents.map((a) => (
                  <article key={a.title} className="py-[28px] first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <a.icon className="size-6 shrink-0 text-black" />
                      <h3 className="text-body-24 font-semibold text-black">
                        {a.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-body-16 text-grey-400">{a.body}</p>
                    {a.points.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {a.points.map(([lead, rest]) => (
                          <li key={lead} className="text-body-16 text-grey-400">
                            <strong className="font-semibold text-black">
                              {lead}
                            </strong>{" "}
                            {rest}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal preset="fadeUp" index={1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/agents-orbit.png"
                alt=""
                aria-hidden
                loading="lazy"
                className="mx-auto w-full max-w-[560px] object-contain"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* The 1:5:10 Resolution Framework */}
      <section className="hero-field relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/deco-left.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 -z-10 hidden h-[70%] w-auto object-contain xl:block"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/deco-right.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden h-[85%] w-auto -translate-y-1/2 object-contain xl:block"
          loading="lazy"
        />
        <div className="container-content pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(5rem,10.5vw,12.5rem)]">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-[60px]">
            <h2 className="text-h3 text-white">
              <TextReveal text="The 1:5:10 Resolution Framework" />
            </h2>
            <Reveal preset="fadeUp" index={1} className="flex items-start">
              <p className="max-w-[520px] text-body-20 text-grey-200">
                Y2Labs enables organizations to achieve elite operational
                maturity through its proprietary framework:
              </p>
            </Reveal>
          </div>

          <ol className="mt-[clamp(3.5rem,6vw,5.625rem)] grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {framework.map((step, i) => (
              <Reveal
                key={step.title}
                preset="fadeUp"
                index={i}
                as="li"
              >
                {/* Ascending staircase offsets from the Figma layout. */}
                <div
                  className={
                    [
                      "",
                      "xl:pt-[96px]",
                      "xl:pt-[227px]",
                      "xl:pt-[332px]",
                    ][i]
                  }
                >
                  <h3 className="max-w-[220px] text-body-28 font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[260px] border-l border-white/30 pl-4 text-body-16 text-grey-300">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Process-Driven Intelligent CMDB */}
      <section className="container-content pt-[clamp(4.5rem,9vw,8.125rem)] pb-[clamp(5rem,11vw,13.625rem)]">
        <h2 className="text-center text-h3">
          <TextReveal text="Process-Driven Intelligent CMDB" />
        </h2>
        <Reveal preset="fadeUp" index={1}>
          <p className="mt-[18px] text-center text-body-24 font-medium text-body">
            The foundation for data-driven strategic decisions, featuring:
          </p>
        </Reveal>

        <ul className="mt-[clamp(3.5rem,7.5vw,8.25rem)] grid gap-10 md:grid-cols-3 lg:gap-[44px]">
          {cmdb.map((c, i) => (
            <Reveal key={c.title} preset="fadeUp" index={i} as="li">
              <c.icon className="size-10 text-black" />
              <h3 className="mt-5 text-body-28 font-medium text-black">
                {c.title}
              </h3>
              <p className="mt-3 text-body-16 text-grey-400">
                {c.body.split("|").map((line, li) => (
                  <span key={li} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Business Value & Deployment */}
      <section className="container-content pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
        <h2 className="text-center text-h3">
          <TextReveal text="Business Value & Deployment" />
        </h2>

        <ul className="mt-[clamp(3.5rem,7vw,6.25rem)] grid gap-6 md:grid-cols-3">
          {businessValue.map((c, i) => (
            <Reveal key={c.title} preset="fadeUp" index={i} as="li">
              <article
                className={`flex h-full min-h-[320px] flex-col justify-between p-[30px] lg:h-[516px] lg:min-h-0 ${c.card}`}
              >
                <div>
                  <h3 className={`text-body-24 font-semibold ${c.titleCls}`}>
                    {c.title}
                  </h3>
                  <p className={`mt-3 text-body-16 ${c.bodyCls}`}>{c.body}</p>
                </div>
                <c.icon className={`size-9 ${c.iconCls}`} />
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
