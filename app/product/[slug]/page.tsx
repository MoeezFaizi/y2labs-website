import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/site/ContactCta";
import { ProductDetail } from "@/components/site/ProductDetail";
import { products } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.items.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: product.eyebrow, description: product.body };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = products.items.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <ContactCta variant="image" />
    </>
  );
}
