import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { WordRotator } from "@/components/motion/WordRotator";
import { Faq, GetInTouch } from "@/components/site/ContactSections";
import { ContactCta } from "@/components/site/ContactCta";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's solve your biggest technology challenges. Get in touch with Y2 Labs — senior operators answer every enquiry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Solve Your Biggest"
        ariaLabel="Let's Solve Your Biggest Technology Challenges."
        titleTrailing={
          <WordRotator
            words={[
              "Intelligent Software",
              "Digital Products",
              "Business Growth",
              "AI Solutions",
            ]}
          />
        }
        ptClassName="pt-[clamp(6rem,7vw,8.125rem)]"
        pbClassName="pb-[clamp(3rem,5vw,5.4375rem)]"
        headingClassName="lg:self-start lg:mt-[99px]"
        art={{ src: "/contact/hero-headset.png", className: "h-[clamp(320px,42vw,811px)]" }}
      />
      <GetInTouch />
      <Faq />
      <ContactCta variant="image" />
    </>
  );
}
