import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ handle: string }>;
};

const productData: Record<string, {
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  description: string;
  benefits: string[];
  testimonials: Array<{ quote: string; author: string }>;
  guarantee: string;
}> = {
  "peptide-protocol-database": {
    title: "Peptide Research Index",
    subtitle: "Monthly Subscription",
    price: "$29",
    period: "/mo",
    description: "A monthly-curated index of FDA briefing documents, federal advisory committee dockets, and peer-reviewed research on peptide science. Educational bridge only — no compounds sold, no dosing protocols, no sourcing.",
    benefits: [
      "Monthly digest of FDA briefing documents and PCAC dockets",
      "Plain-English summaries of peer-reviewed peptide research",
      "Regulatory status tracker: 503A compounding pathway eligibility",
      "Telehealth provider network directory (Marek Health, Lifeforce)",
      "Compliance-first sourcing checklist — never buy from gray market",
      "Substack delivery for monthly research notes",
    ],
    testimonials: [],
    guarantee: "30-day money-back guarantee. Cancel anytime.",
  },
  "30-day-mold-detox": {
    title: "30-Day Mold Detox Program",
    subtitle: "Educational Workbook",
    price: "$149",
    description: "The supplement stack, testing schedule, and environmental protocol I used to reduce my own mycotoxin burden. Educational reference only — work with a licensed physician for personal protocol design.",
    benefits: [
      "Daily supplement reference stack (educational — not a prescription)",
      "Weekly testing schedule with CPT codes",
      "Environmental remediation checklist",
      "Symptom tracking templates",
      "Dietary guidelines for mold recovery",
      "30-day email support",
    ],
    testimonials: [
      { quote: "Followed this protocol for 30 days. My mycotoxin levels dropped 40%. The structure made all the difference.", author: "Marcus W." },
      { quote: "Finally a mold protocol that's data-driven, not fear-based. The testing schedule alone is worth 10x the price.", author: "Sarah K." },
    ],
    guarantee: "30-day money-back guarantee. If you don't see improvement, full refund.",
  },
  "doctors-miss-guide": {
    title: "The Tests Doctors Miss",
    subtitle: "Digital Guide",
    price: "$47",
    description: "26 blood, urine, and environmental tests that standard labs skip — with functional ranges and CPT codes for insurance.",
    benefits: [
      "CIRS Panel, MCAS Panel, Mycotoxin checklists",
      "Functional vs conventional range cheat sheet",
      "Pre-loaded CPT billing codes for insurance",
      "Click-and-clone Notion Lab Results database",
      "Interpretation guide for each test",
      "Questions to ask your doctor",
    ],
    testimonials: [
      { quote: "Took this to my doctor. He'd never heard of half these tests. Now I'm getting the full workup.", author: "Jennifer L." },
      { quote: "The CPT codes alone saved me $800 in lab costs. Insurance covered tests I thought were out-of-pocket.", author: "David R." },
    ],
    guarantee: "30-day money-back guarantee.",
  },
  "protocol-vault": {
    title: "Protocol Vault Access",
    subtitle: "Annual Membership",
    price: "$199",
    period: "/yr",
    description: "Full access to all protocols, spreadsheets, and databases — updated continuously with new research.",
    benefits: [
      "All current and future protocols",
      "Spreadsheet and database templates",
      "Priority research updates",
      "Private community access",
      "Monthly Q&A calls",
      "Protocol customization support",
    ],
    testimonials: [
      { quote: "This is the operating system I wish I had when I started my recovery. Everything in one place, constantly updated.", author: "Alex M." },
      { quote: "The community alone is worth it. Having others who understand the journey makes everything easier.", author: "Rachel S." },
    ],
    guarantee: "30-day money-back guarantee. Cancel anytime.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = productData[handle];
  if (!product) return {};

  return {
    title: `${product.title} | Dose of Proof`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = productData[handle];

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-24 text-center">
          <h1 className="text-4xl font-bold text-white">Product not found</h1>
          <Button href="/shop" className="mt-8">Back to Shop</Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/60">{product.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
                {product.subtitle}
              </span>
              <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white">
                {product.title.split(" ").slice(0, -1).join(" ")} <br />
                <span className="text-white/60">{product.title.split(" ").slice(-1)}</span>
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">
                {product.price}<span className="text-lg text-muted font-normal">{product.period || ""}</span>
              </div>
              <p className="text-xl text-muted leading-relaxed mb-8">
                {product.description}
              </p>
              
              <Button href={`/api/checkout?product=${handle}`} size="lg" className="w-full md:w-auto mb-4">
                Get Started →
              </Button>
              <p className="text-xs text-muted font-mono uppercase tracking-widest text-center md:text-left">
                Secure checkout via Shopify
              </p>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BrandIcon id="filecode" className="w-5 h-5 text-accent" />
                What&apos;s Included
              </h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {product.testimonials.map((t, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-8 bg-zinc-950/40">
                <p className="text-white font-medium italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-accent text-sm font-bold">— {t.author}, Verified Member</p>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-8 border border-green-500/20 rounded-2xl p-8 bg-green-500/5 flex flex-col sm:flex-row items-center gap-6">
            <BrandIcon id="checkmark-shield" className="w-12 h-12 text-green-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-sm text-muted">{product.guarantee}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 p-6 border border-red-500/20 rounded-xl bg-red-500/5">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Medical Disclaimer</h3>
                <p className="text-xs text-muted">
                  This product documents personal experience and research. Not medical advice. Always consult a licensed healthcare provider before starting any protocol.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
