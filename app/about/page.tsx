import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import {
  AboutApproach,
  AboutDirection,
  AboutValues,
  AboutWhoWeAre,
  AboutWhyExists,
} from "@/components/site/AboutSections";
import { ContactCta } from "@/components/site/ContactCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Y2 Lab was founded by practitioners with decades of experience inside enterprise and government systems. Creating digital solutions for a smarter tomorrow.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Creating Digital Solutions for a Smarter Tomorrow"
        ptClassName="pt-[clamp(8rem,12vw,13.625rem)]"
        pbClassName="pb-[clamp(3rem,5vw,4.375rem)]"
        headingClassName="lg:self-start lg:mt-[61px]"
        art={{
          src: "/about/hero-city.png",
          align: "center",
          className: "h-[clamp(320px,38.5vw,740px)]",
        }}
      />
      <AboutWhoWeAre />
      <AboutValues />
      <AboutDirection />
      <AboutWhyExists />
      <AboutApproach />
      {/* Team section hidden for now — re-enable by restoring <AboutTeam /> (import from AboutSections). */}
      <ContactCta />
    </>
  );
}
