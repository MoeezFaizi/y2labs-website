import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Y2 Labs cookie policy.",
};

export default function CookiesPage() {
  return (
    <main className="container-content pt-[clamp(8rem,12vw,13.625rem)] pb-[clamp(3rem,5vw,4.375rem)]">
      <h1 className="text-h2">Cookie Policy</h1>
      <p className="mt-6 text-body-18 text-grey-400">
        Y2 Labs uses cookies to enhance your browsing experience and analyze site traffic.
      </p>
      <p className="mt-4 text-body-18 text-grey-400">
        By continuing to use our website, you consent to our use of cookies in accordance with this policy.
      </p>
    </main>
  );
}
