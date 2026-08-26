import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Y2 Labs' intelligent products — RIAM identity platform and AI-powered IT Operations Platform.",
};

export default function ProductsPage() {
  redirect("/product/riam");
}
