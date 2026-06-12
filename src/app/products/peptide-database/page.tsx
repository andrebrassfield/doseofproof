import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Protocol Database | Dose of Proof",
  description: "Monthly access to the exact dosing protocols, reconstitution guides, and sourcing links for BPC-157, TB-500, GHK-Cu, and more.",
};

export default function PeptideDatabasePage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Peptide Protocol Database",
    "image": "https://doseofproof.com/marketing-assets/color_palette_sheet.png",
    "description": "Monthly access to the exact dosing protocols, reconstitution guides, and sourcing links for BPC-157, TB-500, GHK-Cu, and more.",
    "offers": {
      "@type": "Offer",
      "price": "29.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://doseofproof.com/products/peptide-database"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "42"
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
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/60">Products</span>
            <span>/</span>
            <span className="text-white/60 truncate">Peptide Database</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
                Monthly Subscription
              </span>
              <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white">
                Peptide Protocol <br />
                <span className="text-white/60">Database</span>
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">$29<span className="text-lg text-muted font-normal">/mo</span></div>
              <p className="text-xl text-muted leading-relaxed mb-8">
                Monthly access to the exact dosing protocols, reconstitution guides, and sourcing links for BPC-157, TB-500, GHK-Cu, and more.
              </p>
              
              <Button href="/shop/product/peptide-protocol-database" size="lg" className="w-full md:w-auto mb-4">
                Subscribe Now →
              </Button>
              <p className="text-xs text-muted font-mono uppercase tracking-widest text-center md:text-left">
                Secure checkout via Shopify
              </p>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BrandIcon id="filecode" className="w-5 h-5 text-accent" />
                What's Inside
              </h3>
              <ul className="space-y-4">
                {[
                  "BPC-157 & TB-500 stack for tissue repair",
                  "GHK-Cu protocol for systemic inflammation",
                  "Reconstitution math made simple (calculators included)",
                  "Verified sourcing links to avoid bunk peptides",
                  "Monthly updates on new peptide research",
                  "Access to the private community Discord",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Proof & Testimonial */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-xl p-8 bg-zinc-950/40">
              <p className="text-white font-medium italic mb-6">
                "The reconstitution calculator alone saved me hours of head scratchers. Sourcing links are verified and saved me from buying bunk products online."
              </p>
              <p className="text-accent text-sm font-bold">— Robert P., Verified Member</p>
            </div>
            <div className="border border-white/10 rounded-xl p-8 bg-zinc-950/40">
              <p className="text-white font-medium italic mb-6">
                "I used the BPC-157 and GHK-Cu stacks to support my gut mucosal lining. The dosing updates are backed by PubMed citations, which is rare to find."
              </p>
              <p className="text-accent text-sm font-bold">— Alyssa T., Verified Member</p>
            </div>
          </div>

          {/* Guarantee Block */}
          <div className="mt-8 border border-green-500/20 rounded-2xl p-8 bg-green-500/5 flex flex-col sm:flex-row items-center gap-6">
            <BrandIcon id="checkmark-shield" className="w-12 h-12 text-green-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-sm text-muted">
                Subscribe completely risk-free. Cancel anytime with a single click. If you don't find value in the research breakdowns and calculators within your first 30 days, ask for a full refund.
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-16 p-6 border border-red-500/20 rounded-xl bg-red-500/5">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-muted">
                  This database documents my personal experience and research with peptides. I am not a doctor. The information shared here is not medical advice and is not intended to diagnose, treat, cure, or prevent any disease. Peptide therapy is experimental and you should always consult your physician before use.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">
              Related Reading
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/blogs/peptides/bpc-157-dosage-guide"
                className="group p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">
                  BPC-157 Dosage Guide
                </h3>
                <p className="text-muted text-sm mt-2">
                  What the research actually says about dosing.
                </p>
              </Link>
              <Link
                href="/blogs/peptides/ghk-cu-mechanism"
                className="group p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">
                  GHK-Cu Copper Peptide
                </h3>
                <p className="text-muted text-sm mt-2">
                  Complete mechanism guide.
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
