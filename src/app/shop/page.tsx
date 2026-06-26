import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";
import { shopifyFetch, GET_PRODUCTS } from "@/lib/shopify/client";

export const dynamic = "force-dynamic";

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  priceRange: { minVariantPrice: ShopifyPrice };
  images: { edges: { node: { url: string; altText: string | null } }[] };
}

export const metadata: Metadata = {
  title: "Shop | Dose of Proof",
  description: "Evidence-first health workbooks, research indexes, and recovery tools. Educational bridge only — no compounds sold, no dosing protocols, no sourcing.",
};

const iconMap: Record<string, string> = {
  "what-doctors-miss-the-complete-testing-guide": "test-tube",
  "30-day-mold-detox-protocol": "calendar",
  "peptide-protocol-database": "database",
  "mold-detox-protocol": "shield",
  "what-doctors-miss": "test-tube",
  "doctors-miss-guide": "filecode",
};

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];
  if (process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN) {
    try {
      const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
        GET_PRODUCTS,
        { first: 10 }
      );
      products = data.products.edges.map((e) => e.node);
    } catch {
      products = [];
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-4 block">
              Shop
            </span>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6">
              Evidence-First <br />
              <span className="text-white/60">Protocols</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              Everything here is backed by data, not hype. Educational workbooks, research
              indexes, and tracking templates — no compounds sold, no dosing protocols, no
              sourcing. Health decisions happen with your physician.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.handle}`}
                className="group block border border-white/10 rounded-2xl p-8 bg-zinc-950 hover:border-accent/30 transition-all duration-300"
              >
                <BrandIcon id={iconMap[product.handle] ?? "package"} className="w-10 h-10 text-accent mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-bold text-accent">${product.priceRange?.minVariantPrice?.amount ?? "0"}</span>
                  <Button variant="secondary" size="sm">View Details →</Button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <BrandIcon id="checkmark-shield" className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">30-Day Guarantee</h3>
              <p className="text-sm text-muted">Full refund if you don&apos;t find value.</p>
            </div>
            <div className="text-center p-6">
              <BrandIcon id="lock" className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Secure Checkout</h3>
              <p className="text-sm text-muted">Powered by Shopify. Your data is safe.</p>
            </div>
            <div className="text-center p-6">
              <BrandIcon id="warning" className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Evidence-First</h3>
              <p className="text-sm text-muted">Every protocol cites PubMed data.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
