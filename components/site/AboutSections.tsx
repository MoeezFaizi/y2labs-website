import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/* ------------------------------------------------------------------ */
/*  Who We Are — heading left, bolded paragraphs right (About page)    */
/* ------------------------------------------------------------------ */

export function AboutWhoWeAre() {
  return (
    <section className="container-content py-section">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <h2 className="text-h2">
            <TextReveal text="Who We Are" />
          </h2>
          <Reveal preset="fadeUp" index={1}>
            <p className="mt-[18px] text-body-28 font-medium text-grey-400">
              We Build Technology for Real Operational Environments
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-[40px]">
          <Reveal preset="fadeUp" index={1}>
            <p className="text-body-34 font-medium text-body">
              <span className="font-semibold text-black">Y2 Lab</span> was
              founded by practitioners with decades of experience inside
              enterprise and{" "}
              <span className="font-semibold text-black">
                government systems where technology decisions carry operational
                consequences.
              </span>
            </p>
          </Reveal>
          <Reveal preset="fadeUp" index={2}>
            <p className="text-body-34 font-medium text-body">
              This is a <span className="font-semibold text-black">new firm</span>{" "}
              built on established operational experience across{" "}
              <span className="font-semibold text-black">AI</span>,{" "}
              <span className="font-semibold text-black">
                software engineering{" "}
              </span>
              ,{" "}
              <span className="font-semibold text-black">
                infrastructure, and digital transformation.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Our Values — five 270×346 cards, same component as WhoWeServe      */
/* ------------------------------------------------------------------ */

const values = [
  {
    icon: "/about/val-star.svg",
    label: "Continuous Digital Innovation",
    desc: "We embrace emerging technologies and continuously explore better ways.",
  },
  {
    icon: "/about/val-updates.svg",
    label: "Trusted Ethical Leadership",
    desc: "We build lasting relationships through honesty, transparency, and accountability.",
  },
  {
    icon: "/about/val-diamond.svg",
    label: "Delivering Exceptional Excellence",
    desc: "We are committed to delivering high-quality solutions with attention to every detail.",
  },
  {
    icon: "/about/val-agreement.svg",
    label: "Power Of Collaboration",
    desc: "We work closely with our clients, combining ideas and expertise to achieve shared success.",
  },
  {
    icon: "/about/val-rocket.svg",
    label: "Customer First Success",
    desc: "We put our clients at the center of everything we do, delivering solutions that create measurable value and lasting partnerships.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-white py-[clamp(3.5rem,7vw,6.25rem)]">
      <div className="container-content">
        <h2 className="text-center text-h3">
          <TextReveal text="Our Values" />
        </h2>
        <Reveal preset="fadeUp" index={1}>
          <p className="mt-[10px] text-center text-body-28 font-medium text-grey-400">
            The Foundation of our culture
          </p>
        </Reveal>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
          {values.map((v, i) => (
            <Reveal
              key={v.label}
              preset="fadeUp"
              index={i}
              as="li"
              className="lg:first:rounded-none"
            >
              {/* Figma prototype: ON_HOVER → 399:2629, SMART_ANIMATE,
                  EASE_IN_AND_OUT 350ms. Card → navy #1D1CA1 / border #2D345F,
                  icon slides up out of the card (30 → -40) and turns white,
                  label slides 252 → 30 and turns white, description
                  (always rendered in near-white #E2E2E2) slides 302 → 114. */}
              <div className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden border border-grey-200 bg-white px-[18px] py-[30px] transition-colors duration-[350ms] ease-in-out hover:border-[#2d345f] hover:bg-primary lg:-ml-px lg:block lg:h-[346px] lg:min-h-0 lg:first:ml-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.icon} alt="" aria-hidden className="size-10 transition-[transform,filter] duration-[350ms] ease-in-out group-hover:brightness-0 group-hover:invert lg:absolute lg:left-[18px] lg:top-[30px] lg:group-hover:-translate-y-[70px]" />
                <p className="text-body-22 font-medium text-body transition-[transform,color] duration-[350ms] ease-in-out group-hover:text-white lg:absolute lg:left-[18px] lg:right-[18px] lg:top-[252px] lg:group-hover:-translate-y-[222px]">{v.label}</p>
                <p className="hidden text-body-18 font-normal text-[#e2e2e2] lg:absolute lg:left-[18px] lg:right-[18px] lg:top-[302px] lg:block lg:transition-transform lg:duration-[350ms] lg:ease-in-out lg:group-hover:-translate-y-[188px]">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Our Direction — mission / vision cards (1350×1180, 20px overlap)   */
/* ------------------------------------------------------------------ */

const direction = [
  {
    tag: "Our Mission",
    title: "Empowering Businesses Through Brilliant Ideas",
    body: "Our mission is to deliver best-in-class AI solutions and engineering services that measurably accelerate our clients' growth — built on transparency, craftsmanship, and a genuine commitment to long-term partnership.",
    points: [
      "Deliver measurable ROI through intelligent automation",
      "Co-create solutions with clients, not just for them",
      "Maintain the highest standards of engineering craft",
    ],
    art: "/about/art-radar.png",
    artW: 340,
    artH: 340,
    check: "/about/check-mission.svg",
    bg: "bg-primary",
    motion: "",
    artMotion: "",
  },
  {
    tag: "Our Vision",
    title: "To Be a Global Leader in Digital Innovation ",
    body: "Our vision is to become a global leader in digital innovation by delivering cutting-edge solutions that empower businesses to grow, adapt, and thrive in an ever-evolving digital world.",
    points: [
      "Shape the global AI landscape with research-driven products",
      "Make enterprise-grade AI accessible to every business size",
      "Maintain the highest standards of engineering craft",
    ],
    art: "/about/art-eye.png",
    artW: 400,
    artH: 185,
    check: "/about/check-vision.svg",
    bg: "bg-light-blue",
    motion:
      "lg:transition-transform lg:delay-[400ms] lg:duration-1000 lg:ease-[cubic-bezier(0.83,0,0.19,0.99)] lg:group-hover/dir:-translate-y-[462px]",
    artMotion:
      "lg:transition-transform lg:delay-[400ms] lg:duration-1000 lg:ease-[cubic-bezier(0.83,0,0.19,0.99)] lg:group-hover/dir:-translate-x-[15px]",
  },
];

export function AboutDirection() {
  return (
    <section className="container-content pt-[clamp(2rem,4vw,2.5rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
      <h2 className="text-center text-h3">
        <TextReveal text="Our Direction" />
      </h2>
      <Reveal preset="fadeUp" index={1}>
        <p className="mx-auto mt-[18px] max-w-[1062px] text-center text-body-28 font-medium text-grey-400">
          Driven by innovation, we create reliable digital solutions that
          empower businesses, inspire growth, and build lasting success.
        </p>
      </Reveal>

      {/* Figma prototype: MOUSE_ENTER on the whole block, 400ms delay,
          1000ms, cubic-bezier(0.83, 0, 0.19, 0.99) — the Vision card
          slides up 462px (offset 580 → 118) over the Mission card,
          and its eye art shifts 15px left. No background swap. */}
      <div className="group/dir mt-[clamp(3.5rem,7vw,6.25rem)] flex flex-col gap-6 lg:gap-0">
        {direction.map((card, i) => (
          <Reveal
            key={card.tag}
            preset="scaleIn"
            index={i}
            className={i > 0 ? "lg:relative lg:z-10 lg:-mt-5" : ""}
          >
            <article
              className={`group relative overflow-hidden rounded-[20px] p-8 md:p-[60px] lg:h-[600px] ${card.bg} ${card.motion}`}
            >
              <div className="relative grid h-full items-center gap-12 lg:grid-cols-[701px_520px] lg:gap-[9px]">
                <div>
                  <p className="text-body-28 font-medium text-blue">{card.tag}</p>
                  <h3 className="mt-5 text-h5 font-medium text-white [text-wrap:wrap]">
                    {card.title}
                  </h3>
                  <p className="mt-5 text-body-24 font-medium text-grey-200">
                    {card.body}
                  </p>
                  <ul className="mt-10 flex flex-col gap-5">
                    {card.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-3 text-body-22 font-medium text-grey-200"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.check}
                          alt=""
                          aria-hidden
                          className="size-8 shrink-0"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.art}
                  alt=""
                  aria-hidden
                  width={card.artW}
                  height={card.artH}
                  className={`mx-auto h-auto w-auto max-w-full object-contain ${card.artMotion}`}
                  loading="lazy"
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Y2 Lab Exists                                                  */
/* ------------------------------------------------------------------ */

export function AboutWhyExists() {
  return (
    <section className="container-content pt-[clamp(2rem,4vw,2.5rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <h2 className="text-h2">
            <TextReveal text="Why Y2 Lab Exists" />
          </h2>
          <Reveal preset="fadeUp" index={1}>
            <p className="mt-[18px] text-body-28 font-medium text-grey-400">
              We Build Technology for Real Operational Environments
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          <Reveal preset="fadeUp" index={1}>
            <p className="text-body-34 font-semibold text-black">
              Most AI{" "}
              <span className="font-medium text-body">
                and software initiatives fail because{" "}
              </span>
              execution, operations
              <span className="font-medium text-body">, and </span>
              technology
              <span className="font-medium text-body"> are misaligned.</span>
            </p>
          </Reveal>
          <Reveal preset="fadeUp" index={2}>
            <p className="text-body-34 font-medium text-body">
              <span className="font-semibold text-black">Y2 Lab</span> exists to
              bridge that gap helping organisations move from experimentation to
              <span className="font-semibold text-black">
                {" "}
                production-ready capability{" "}
              </span>
              through intelligent systems designed for{" "}
              <span className="font-semibold text-black">
                long-term operational use.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Our Approach AI — intro + three square principle cards             */
/* ------------------------------------------------------------------ */

const approachCards = [
  {
    title: "Governance",
    body: "Built-in governance, compliance, and oversight to ensure secure, controlled operations from day one.",
    icon: "/about/app-security.svg",
    card: "bg-[#d7fd33]",
    titleCls: "text-black",
    bodyCls: "text-body",
  },
  {
    title: "Reliability",
    body: "Built to ensure consistent speed, uptime, and reliability across mission-critical enterprise workloads.",
    icon: "/about/app-updates.svg",
    card: "bg-[#e7eaeb]",
    titleCls: "text-black",
    bodyCls: "text-body",
  },
  {
    title: "Scalability",
    body: "Built to expand seamlessly as your business grows—without compromising performance or reliability.",
    icon: "/about/app-conversations.svg",
    card: "bg-primary",
    titleCls: "text-white",
    bodyCls: "text-white",
  },
];

export function AboutApproach() {
  return (
    <section className="bg-[#f6f6f8] py-section">
      <div className="container-content">
        <h2 className="text-center text-h2">
          <TextReveal text="Our Approach AI" />
        </h2>
        <Reveal preset="fadeUp" index={1}>
          <p className="mt-[18px] text-center text-body-28 font-medium text-grey-400">
            Domain-Tuned AI Built Around Your Operations
          </p>
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,3.75rem)] flex flex-col gap-5">
          <Reveal preset="fadeUp" index={1}>
            <p className="text-body-34 font-medium text-body">
              We design{" "}
              <span className="font-semibold text-black">AI systems</span>{" "}
              trained around your organisation&apos;s workflows
              <span className="font-semibold text-black">
                , documentation, decision structures, and operational
                requirements not generic automation layered onto existing
                systems.
              </span>
            </p>
          </Reveal>
          <Reveal preset="fadeUp" index={2}>
            <p className="text-body-34 font-medium text-body">
              Every solution is designed with{" "}
              <span className="font-semibold text-black">governance</span>,{" "}
              <span className="font-semibold text-black">reliability</span>,{" "}
              <span className="font-semibold text-black">
                scalability, and adoption in mind from the start.
              </span>
            </p>
          </Reveal>
        </div>

        <ul className="mt-[clamp(3.5rem,7vw,6.25rem)] grid gap-6 md:grid-cols-3">
          {approachCards.map((c, i) => (
            <Reveal key={c.title} preset="fadeUp" index={i} as="li">
              <article
                className={`flex h-full min-h-[320px] flex-col justify-between border border-grey-200 px-[34px] py-[30px] lg:h-[514px] lg:min-h-0 ${c.card}`}
              >
                <div>
                  <h3 className={`text-body-28 font-medium ${c.titleCls}`}>
                    {c.title}
                  </h3>
                  <p className={`mt-[10px] text-body-20 ${c.bodyCls}`}>
                    {c.body}
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.icon} alt="" aria-hidden className="size-[60px]" />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The Principles that Drive Us — team                                */
/* ------------------------------------------------------------------ */

const team = [
  {
    photo: "/about/team-ethan.png",
    name: "Ethan Carter",
    role: "Chief Executive Officer (CEO)",
  },
  {
    photo: "/about/team-sophia.png",
    name: "Sophia Bennett",
    role: "Chief Technology Officer (CTO)",
  },
  {
    photo: "/about/team-liam.png",
    name: "Liam Anderson",
    role: "Lead AI & Software Engineer",
  },
];

export function AboutTeam() {
  return (
    <section className="container-content pt-[clamp(3.5rem,7vw,6.25rem)] pb-[clamp(3.5rem,7vw,6.25rem)]">
      <Reveal preset="fadeUp" index={0}>
        <p className="text-body-28 font-medium text-grey-400">Our Team</p>
      </Reveal>
      <h2 className="mt-[18px] text-h3">
        <TextReveal text="The Principles that Drive Us" />
      </h2>

      <ul className="mt-[clamp(3.5rem,7vw,6.25rem)] grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <Reveal key={m.name} preset="fadeUp" index={i} as="li">
            {/* Photo card — nameplate and social icons are part of the
                exported artwork, matching the Figma layout exactly. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="block overflow-hidden rounded-[16px]">
              <img
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                className="w-full object-cover transition-transform duration-[600ms] ease-in-out hover:scale-[1.04]"
                loading="lazy"
              />
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
