import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Dose of Proof",
  description: "Evidence-backed protocols, guides, and tools for chronic illness recovery.",
};

const products = [
  {
    handle: "peptide-protocol-database",
    title: "Peptide Protocol Database",
    subtitle: "Monthly Subscription",
    price: "$29/mo",
    description: "Dosing protocols, reconstitution guides, and sourcing links for BPC-157, TB-500, GHK-Cu, and more.",
    icon: "database",
    features: [
      "BPC-157 & TB-500 stacks",
      "Reconstitution calculators",
      "Verified sourcing links",
      "Monthly research updates",
    ],
  },
  {
    handle: "30-day-mold-detox",
    title: "30-Day Mold Detox Program",
    subtitle: "Complete Protocol",
    price: "$149",
    description: "The exact supplement stack, testing schedule, and environmental protocol I used to reduce my mycotoxin burden.",
    icon: "shield-check",
    features: [
      "Supplement stack with dosing",
      "Weekly testing schedule",
      "Environmental remediation guide",
      "Symptom tracking templates",
    ],
  },
  {
    handle: "doctors-miss-guide",
    title: "The Tests Doctors Miss",
    subtitle: "Digital Guide",
    price: "$47",
    description: "26 blood, urine, and environmental tests that standard labs skip — with functional ranges and CPT codes.",
    icon: "test-tube",
    features: [
      "26 advanced lab tests",
      "Functional vs conventional ranges",
      "CPT billing codes for insurance",
      "Notion tracker template",
    ],
  },
  {
    handle: "protocol-vault",
    title: "Protocol Vault Access",
    subtitle: "Annual Membership",
    price: "$199/yr",
    description: "Full access to all protocols, spreadsheets, and databases — updated continuously with new research.",
    icon: "folder-structure",
    features: [
      "All current protocols",
      "Spreadsheet templates",
      "Priority research updates",
      "Private community access",
    ],
  },
];

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-4 block">
              The Protocol Store
            </span>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6">
              Evidence-Backed <br />
              <span className="text-white/60">Recovery Tools</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              Every product is built from personal experience, PubMed citations, and verified sourcing. No hype. Just data.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Link
                key={product.handle}
                href={`/shop/product/${product.handle}`}
                className="group border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all bg-zinc-950/40"
              >
                <div className="flex items-start justify-between mb-6">
                  <BrandIcon id={product.icon} className="w-8 h-8 text-accent" />
                  <span className="text-accent font-bold text-xl">{product.price}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {product.title}
                </h2>
                <p className="text-accent text-sm font-mono uppercase tracking-widest mb-4">
                  {product.subtitle}
                </p>
                <p className="text-muted mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <BrandIcon id="check" className="w-4 h-4 text-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant="secondary">
                  View Details →
                </Button>
              </Link>
            ))}
          </div>

          {/* Trust Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <BrandIcon id="shield-check" className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Compliance First</h3>
              <p className="text-sm text-muted">Every protocol routes through PCAB-accredited pharmacies</p>
            </div>
            <div className="p-6">
              <BrandIcon id="book-open" className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">PubMed Backed</h3>
              <p className="text-sm text-muted">Every claim cites clinical research with PMIDs</p>
            </div>
            <div className="p-6">
              <BrandIcon id="arrows-clockwise" className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Always Updated</h3>
              <p className="text-sm text-muted">Protocols evolve as new research emerges</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
