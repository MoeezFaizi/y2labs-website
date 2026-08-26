import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Y2 Labs terms of service.",
};

export default function TermsPage() {
  return (
    <main className="container-content pt-[clamp(8rem,12vw,13.625rem)] pb-[clamp(3rem,5vw,4.375rem)]">
      <h1 className="text-h2">Terms of Service</h1>
      <p className="mt-6 text-body-18 text-grey-400">
        These terms of service outline the rules and regulations for the use of Y2 Labs' website and services.
      </p>
      <p className="mt-4 text-body-18 text-grey-400">
        By accessing this website, we assume you accept these terms of service in full.
      </p>
    </main>
  );
}
