import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import "./globals.css";

const description =
  "Y2 Lab designs AI systems, software, and digital infrastructure for organisations operating in high-stakes environments — from enterprise operations to government-scale workflows.";

export const metadata: Metadata = {
  title: {
    default: "Y2 LABS — Intelligence Built for Operations That Cannot Afford Failure",
    template: "%s — Y2 LABS",
  },
  description,
  openGraph: {
    title: "Y2 LABS",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050a24",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body>
        <ScrollProgress />
        <Header />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
