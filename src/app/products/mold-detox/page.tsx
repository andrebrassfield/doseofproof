import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "30-Day Mold Detox Protocol | Dose of Proof",
  description: "The exact 4-week protocol to open drainage pathways, introduce binders, and clear mycotoxins without crashing your system.",
};

export default function MoldDetoxPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "30-Day Mold Detox Protocol",
    "image": "https://doseofproof.com/marketing-assets/images/proof-cards/proof-mycotoxin-card-1080x1080.png",
    "description": "The exact 4-week protocol to open drainage pathways, introduce binders, and clear mycotoxins without crashing your system.",
    "offers": {
      "@type": "Offer",
      "price": "197.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://doseofproof.com/products/mold-detox"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8 font-mono uppercase tracking-widest text-xs">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-stone">/</span>
            <span className="text-muted">Products</span>
            <span className="text-stone">/</span>
            <span className="text-accent">30-Day Mold Detox</span>
          </nav>

          {/* Poster-style page header */}
          <header className="mb-12">
            <span className="dop-yellow-box mb-6">Digital Course</span>
            <h1 className="dop-poster-headline text-5xl md:text-7xl mt-6 mb-6">
              30-Day Mold Detox<br />
              <span className="text-muted">Protocol.</span>
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-accent font-mono">$197</span>
              <span className="text-sm font-mono uppercase tracking-widest text-muted">USD · One-time</span>
            </div>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              The exact 4-week protocol to open drainage pathways, introduce binders, and clear
              mycotoxins without crashing your system.
            </p>
          </header>

          {/* Two-column: CTA + What's Inside */}
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch mb-16">
            <div className="border-2 border-accent bg-accent-muted p-8 flex flex-col justify-between">
              <div>
                <span className="dop-caption mb-3 block">Enroll</span>
                <h2 className="text-2xl font-bold tracking-tight mb-3 text-white">
                  Get the full 4-week protocol.
                </h2>
                <p className="text-muted mb-8 text-sm leading-relaxed">
                  Lifetime access. No subscriptions. Mobile-ready PDF + interactive trackers.
                </p>
              </div>
              <div>
                <Button href="/shop/product/30-day-mold-detox-protocol" size="lg" className="w-full mb-3">
                  Buy Now →
                </Button>
                <p className="text-xs text-muted font-mono uppercase tracking-widest text-center">
                  Secure checkout via Shopify
                </p>
              </div>
            </div>

            <div className="dop-card p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
                <BrandIcon id="filecode" className="w-5 h-5 text-accent" />
                What&apos;s Inside
              </h3>
              <ul className="space-y-4">
                {[
                  "Week 1: Opening Drainage Pathways (Liver, Lymph, Kidneys)",
                  "Week 2: Binder Phasing (Charcoal, Bentonite, Zeolite)",
                  "Week 3: Biofilm Disruption & Anti-fungals",
                  "Week 4: Cellular Repair & NAD+ Replenishment",
                  "The Low-Histamine Mold Detox Diet Guide",
                  "Supplement dosing schedules and titration protocols",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The 4-Phase callout strip — poster-style horizontal layout */}
          <div className="mb-16 border-l-4 border-accent pl-6">
            <span className="dop-caption mb-2 block">Sequence Matters</span>
            <h3 className="text-3xl font-bold tracking-tight text-white mb-2">
              Drainage before binders. Always.
            </h3>
            <p className="text-muted max-w-2xl">
              Most people crash on binders because they skip drainage. This protocol sequences
              the four phases so the body can keep up with mobilization.
            </p>
          </div>

          {/* Guarantee Block */}
          <div className="mb-12 border-2 border-proof-green rounded-md p-8 bg-proof-green/5 flex flex-col sm:flex-row items-center gap-6">
            <BrandIcon id="checkmark-shield" className="w-12 h-12 text-proof-green shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">100% Risk-Free Guarantee</h3>
              <p className="text-sm text-muted">
                If you do not see a noticeable reduction in your chronic inflammatory symptoms or
                feel completely clear on how to safely sequence your binders, email me within 30
                days for a full refund.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mb-16 p-6 border-2 border-proof-red/40 rounded-md bg-proof-red/5">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-5 h-5 text-proof-red mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-widest font-mono">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  This protocol documents my personal experience and research. I am not a doctor.
                  The information shared here is not medical advice and is not intended to
                  diagnose, treat, cure, or prevent any disease. Always consult your physician
                  before starting any detox protocol or supplement regimen.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="border-t border-stone pt-12">
            <span className="dop-caption mb-3 block">Related Reading</span>
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white uppercase">
              Continue the Protocol
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/blogs/mold-recovery/mold-detox-diet"
                className="group p-6 border border-stone rounded-md hover:border-accent transition-colors bg-surface"
              >
                <h3 className="text-white font-bold group-hover:text-accent transition-colors uppercase tracking-tight">
                  Mold Detox Diet
                </h3>
                <p className="text-muted text-sm mt-2">
                  What to eat and what to avoid during detox.
                </p>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
