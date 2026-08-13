import { ContactCta } from "@/components/site/ContactCta";
import { Difference } from "@/components/site/Difference";
import { ExpertiseStrip } from "@/components/site/ExpertiseStrip";
import { Hero } from "@/components/site/Hero";
import { HowWeWork } from "@/components/site/HowWeWork";
import { KpiStats } from "@/components/site/KpiStats";
import { Products } from "@/components/site/Products";
import { Services } from "@/components/site/Services";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { WhoWeServe } from "@/components/site/WhoWeServe";

export default function Home() {
  return (
    <>
      <Hero />
      <KpiStats />
      <ExpertiseStrip />
      <WhoWeAre />
      <Services />
      <Products />
      <Difference />
      <HowWeWork />
      <WhoWeServe />
      <ContactCta />
    </>
  );
}
