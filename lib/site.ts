/** Content and navigation for the marketing site, lifted from the Figma copy. */

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Our Product", href: "/product/riam" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Who We Serve", href: "/#who-we-serve" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  headline: "Intelligence Built for Operations That Cannot Afford Failure",
  paragraphs: [
    "Y2 Lab designs AI systems, software, and digital infrastructure for organisations operating in high-stakes environments from enterprise operations to government-scale workflows.",
    "Built by senior operators with real-world delivery experience across AI, automation, software, and infrastructure.",
  ],
  primaryCta: { label: "Book discovery call", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/#services" },
  customersLabel: "Our top customers",
  customers: [
    { name: "Logoipsum", src: "/logos/logoipsum.png", width: 188, height: 40 },
    { name: "Logo", src: "/logos/logo-2.png", width: 123, height: 40 },
    { name: "Logoi", src: "/logos/logo-3.png", width: 232, height: 40 },
  ],
} as const;

/**
 * KPI strip. `value` is the number the counter animates to; `suffix` renders
 * at a smaller size in 30% black, per the Figma spec.
 */
export const kpis = [
  {
    value: 3,
    suffix: "Core\nDomain",
    suffixSize: "sm",
    label: "AI, Software & Infrastructure",
  },
  { value: 100, suffix: "%", suffixSize: "lg", label: "Senior-Led Delivery Model" },
  { value: 13, suffix: "+", suffixSize: "lg", label: "Years Operational Experience" },
] as const;

/**
 * Dark expertise strip (Figma bg #01062c, h 202). The tool icons are the exact
 * 45px image assets exported from the Figma frame (nodes I1687:11772;1687:11655
 * …11691, duplicates removed) — rendered as an infinite marquee.
 */
export const expertise = {
  title: "Our Expertise",
  lead: "120+ tools across",
  icons: Array.from({ length: 27 }, (_, i) => `/expertise/${String(i + 1).padStart(2, "0")}.png`),
} as const;

export const whoWeAre = {
  title: "Who We Are",
  subtitle: "New Firm. Proven Operators.",
  body: "We build systems designed for real operational environments where reliability, scalability, and long-term ownership matter.",
  emphasis: "We are not learning on your time.",
} as const;

export const services = {
  title: "Our Services",
  lead: "We provide end-to-end technology services that help businesses automate processes, modernize operations, and build scalable digital solutions tailored to their goals.",
  items: [
    {
      number: "01",
      title: "Bespoke Software Development",
      body: "Custom software engineered around your operational workflows with AI integrated from the architecture stage.",
      tags: [
        "Domain-First Architecture",
        "AI-Native Design",
        "Sector Knowledge",
        "Built for Handover",
      ],
    },
    {
      number: "02",
      title: "AI Automation",
      body: "Domain-trained AI systems, workflow automation, and intelligent process integration are built for real operational use.",
      tags: [
        "Multi-Step Workflow",
        "LLM Integration",
        "Fine-Tuned Domain Models",
        "Document Processing",
        "Change Management",
      ],
    },
    {
      number: "03",
      title: "Website Development",
      body: "High-performance digital platforms designed for credibility, scalability, and AI-enhanced user experiences.",
      tags: [
        "CMS Integration",
        "AI-Enhanced Experiences",
        "Web Applications & Portals",
        "Performance Engineering",
        "Ongoing Optimisation",
      ],
    },
    {
      number: "04",
      title: "Visual Identity",
      body: "Strategic brand systems, UI/UX, and communication design for technology-driven organisations.",
      tags: [
        "Brand Identity",
        "UI/UX Design",
        "Design Systems",
        "Pitch & Proposal Materials",
        "Brand for New Ventures",
      ],
    },
    {
      number: "05",
      title: "Devops & Cloud Engineering",
      body: "Secure cloud infrastructure, CI/CD pipelines, monitoring, and deployment systems built from day one.",
      tags: [
        "CI/CD Pipelines",
        "Cloud Architecture",
        "Observability From Day One",
        "Security Built In",
        "Ongoing SRE Support",
      ],
    },
  ],
} as const;

export const products = {
  title: "Our Product",
  lead: "Intelligent solutions that streamline operations, enhance security, improve efficiency, and help organizations scale with confidence.",
  items: [
    {
      slug: "riam",
      href: "/product/riam",
      eyebrow: "RIAM",
      title: "One Identity Platform for Every System",
      body: "Manage identities, authentication, and access securely from one centralized platform.",
      theme: "navy",
      capabilities: [
        {
          title: "Single source of identity",
          body: "Sync from your existing systems of record so there's one authoritative record per person.",
        },
        {
          title: "Governed access reviews",
          body: "Approve or revoke entitlements with a complete, exportable audit trail.",
        },
        {
          title: "Authentication that fits",
          body: "SSO, MFA and conditional policy applied per application, not per estate.",
        },
        {
          title: "Deploy anywhere",
          body: "Cloud, on-premise or air-gapped — the same platform, the same controls.",
        },
      ],
      stats: [
        { value: "99.9%", label: "Availability" },
        { value: "500 +", label: "Applications" },
        { value: "24/7", label: "Monitoring" },
        { value: "Enterprise", label: "Grade Security" },
      ],
      flow: [
        { title: "Pull Identity Data", body: "RIAM pulls identity data in from your systems of record." },
        { title: "Manage in One Core", body: "RIAM manages it in one central core." },
        { title: "Deliver Governed Access", body: "Secure access across every connected application." },
        { title: "Deploy Anywhere", body: "Flexible deployment across any environment." },
      ],
    },
    {
      slug: "it-operations",
      href: "/product/it-operations",
      eyebrow: "Intelligent IT Operations Platform",
      title: "AI-Powered IT Operations Platform",
      body: "AI-powered IT operations with ITSM, CMDB, and intelligent automation.",
      theme: "blue",
      illustration: "/products/ai-ops-illustration.png",
      capabilities: [
        {
          title: "ITSM that people use",
          body: "Intake, triage and fulfilment in one queue, with automation applied where it earns its place.",
        },
        {
          title: "CMDB kept honest",
          body: "Discovery reconciles the estate continuously instead of drifting between audits.",
        },
        {
          title: "Alert correlation",
          body: "Related signals collapse into one actionable incident with probable cause attached.",
        },
        {
          title: "Runbook automation",
          body: "Codified remediation executes with approvals and a full audit trail.",
        },
      ],
      stats: [
        { value: "80%", label: "faster Resolution" },
        { value: "60%", label: "Automation Rate" },
        { value: "90%", label: "Alert Accuracy" },
      ],
      flow: [
        { title: "Detect", body: "Correlated signals across every monitored system." },
        { title: "Triage", body: "AI classifies, routes, and prioritises automatically." },
        { title: "Resolve", body: "Runbooks execute with a full audit trail." },
      ],
    },
  ],
} as const;

export const difference = {
  eyebrow: "The Y2 Labs Difference",
  title:
    "Five commitments that shape every engagement, from the first discovery call to production handover.",
  /**
   * Card scheme mirrors the Figma cards 1:1 (376×514, fills from the file):
   * lime → grey → navy → blue → slate, icon at the bottom, no numerals.
   * Copy is the Figma copy verbatim — the design repeats one body across the
   * first three cards.
   */
  items: [
    {
      title: "Operators, not theorists",
      body: "We've run the systems we build through production failures and compliance audits.",
      icon: "/difference/icon-1.svg",
      bg: "#d7fd33",
      tone: "dark",
    },
    {
      title: "Your world first",
      body: "We've run the systems we build through production failures and compliance audits.",
      icon: "/difference/icon-2.svg",
      bg: "#e7eaeb",
      tone: "dark",
    },
    {
      title: "End-to-end ownership",
      body: "We've run the systems we build through production failures and compliance audits.",
      icon: "/difference/icon-3.svg",
      bg: "#1d1ca1",
      tone: "light",
    },
    {
      title: "Built to integrate",
      body: "Works with your existing systems, not against them.",
      icon: "/difference/icon-4.svg",
      bg: "#51d2ff",
      tone: "dark",
    },
    {
      title: "Senior throughout",
      body: "No junior handoffs. Experienced people lead every phase.",
      icon: "/difference/icon-5.svg",
      bg: "#3c3c49",
      tone: "light",
    },
  ],
} as const;

export const howWeWork = {
  title: "How We Work",
  steps: [
    {
      title: "Immersive Discovery",
      body: "Senior team maps your operations, constraints and failure modes.",
      icon: "/how-we-work/step-1.svg",
    },
    {
      title: "Honest Scoping",
      body: "Clear definition of what's achievable in your timeline and budget.",
      icon: "/how-we-work/step-2.svg",
    },
    {
      title: "Prototyping",
      body: "Test AI models and designs with your real data first.",
      icon: "/how-we-work/step-3.svg",
    },
    {
      title: "Iterative Delivery",
      body: "Two-week cycles with working software each review.",
      icon: "/how-we-work/step-4.svg",
    },
    {
      title: "Managed Launch",
      body: "Deployment and stabilization until your team owns it.",
      icon: "/how-we-work/step-5.svg",
    },
    {
      title: "Ongoing Partnership",
      body: "Most clients retain us to evolve solutions over time.",
      icon: "/how-we-work/step-6.svg",
    },
  ],
} as const;

export const whoWeServe = {
  title: "Who We Serve",
  lead: "Y2 Labs works with organisations where the cost of getting it wrong is high and the opportunity of getting it right is significant.",
  items: [
    {
      title: "Government & Public Organizations",
      body: "Secure digital solutions and AI automation designed for public organizations.",
      icon: "/who-we-serve/icon-1.svg",
    },
    {
      title: "Financial & Enterprise Solutions",
      body: "Scalable platforms, dashboards, and workflow automation for financial institutions and enterprise operations.",
      icon: "/who-we-serve/icon-2.svg",
    },
    {
      title: "Retail, Luxury & Growing Businesses",
      body: "Digital experiences and automation that help premium brands and ambitious businesses scale with confidence.",
      icon: "/who-we-serve/icon-3.svg",
    },
    {
      title: "Healthcare & Regulated Industries",
      body: "Reliable AI and digital systems built for organizations handling sensitive data and regulated processes.",
      icon: "/who-we-serve/icon-4.svg",
    },
    {
      title: "New Ventures with Serious Ambitions",
      body: "Founders and leadership teams who want their technology and brand built by people who have operated.",
      icon: "/who-we-serve/icon-5.svg",
    },
  ],
} as const;

/**
 * Only the one entry the design actually ships. Two further testimonials once
 * sat here (Daniel Okafor, Meridian Bank / Aisha Rahman, Public Health
 * Authority) attributed to people who appear nowhere in the Figma file — they
 * were sample copy, and their avatars had no source to export. Removed rather
 * than left 404ing. `ContactCta` hides the carousel chrome while this has a
 * single entry, so adding real ones back restores it automatically.
 */
export const testimonials = [
  {
    quote:
      "       Ministries, agencies, and public bodies undergoing digital transformation. We understand procurement constraints, data sovereignty requirements.",
    name: "Sarah Johnson",
    role: "Product Manager, TechNova",
    avatar: "/testimonials/sarah-johnson.png",
  },
] as const;

export const contactForm = {
  title: "Schedule a discovery call",
  lead: "Tell us about your goals, and we'll tailor our expertise to fit your needs. Fill out the form below, and we'll get back to you soon.",
  subjects: [
    "AI Automation",
    "Bespoke Software",
    "Website Development",
    "Visual Identity",
    "DevOps & Cloud",
    "Something else",
  ],
  consent: "We'll only use your info to respond to your inquiry.",
  submit: "send message",
} as const;

export const footer = {
  headline: "Automations that ship & keep running.",
  lead: "We design and deploy AI + workflow automations that help teams work smarter, not harder.",
  cta: { label: "Book a discovery call", href: "/contact" },
  phone: "1-200-345-6789",
  email: "hello@y2lab.com",
  columns: [
    {
      title: "Company",
      links: [
        { label: "Services", href: "/#services" },
        { label: "Who We Serve", href: "/#who-we-serve" },
        { label: "Our Work", href: "/product/riam" },
        { label: "How We Work", href: "/#how-we-work" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "About", href: "/about" },
        { label: "Our Products", href: "/product/riam" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: "/social/linkedin.svg" },
    { label: "Instagram", href: "https://instagram.com", icon: "/social/instagram.svg" },
    { label: "X", href: "https://x.com", icon: "/social/x.svg" },
    { label: "YouTube", href: "https://youtube.com", icon: "/social/youtube.svg" },
    { label: "Facebook", href: "https://facebook.com", icon: "/social/facebook.svg" },
  ],
  copyright: "2026 © . All rights reserved",
  legal: [
    { label: "Terms of service", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
