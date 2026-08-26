import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Y2 Labs privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="container-content pt-[clamp(8rem,12vw,13.625rem)] pb-[clamp(3rem,5vw,4.375rem)]">
      <h1 className="text-h2">Privacy Policy</h1>
      <p className="mt-6 text-body-18 text-grey-400">
        Y2 Labs is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
      </p>
      <p className="mt-4 text-body-18 text-grey-400">
        We only collect information necessary to provide our services and will never sell your data to third parties.
      </p>
    </main>
  );
}
