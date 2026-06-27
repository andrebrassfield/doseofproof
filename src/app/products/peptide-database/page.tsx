import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peptide Research Index | Dose of Proof",
  description:
    "A monthly-curated index of FDA briefing documents, federal advisory committee dockets, and peer-reviewed research on peptide science. Educational bridge only — no compounds sold, no dosing protocols, no sourcing.",
};

export default function PeptideDatabasePage() {
  return (
    <>
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
            <span className="text-accent">Peptide Database</span>
          </nav>

          {/* Poster-style page header */}
          <header className="mb-12">
            <span className="dop-yellow-box mb-6">Monthly Subscription</span>
            <h1 className="dop-poster-headline text-5xl md:text-7xl mt-6 mb-6">
              Peptide Research<br />
              <span className="text-muted">Index.</span>
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-accent font-mono">$29</span>
              <span className="text-lg text-muted font-mono">/mo</span>
              <span className="text-sm font-mono uppercase tracking-widest text-muted">USD · Cancel anytime</span>
            </div>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              A monthly-curated index of FDA briefing documents, federal advisory committee
              dockets, and peer-reviewed research on peptide science. Educational bridge only —
              no compounds sold, no dosing protocols, no sourcing.
            </p>
          </header>

          {/* Two-column: CTA + What's Inside */}
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch mb-16">
            <div className="border-2 border-accent bg-accent-muted p-8 flex flex-col justify-between">
              <div>
                <span className="dop-caption mb-3 block">Subscribe</span>
                <h2 className="text-2xl font-bold tracking-tight mb-3 text-white">
                  Plain-English research. Updated monthly.
                </h2>
                <p className="text-muted mb-8 text-sm leading-relaxed">
                  No hype. No dosing protocols. Just regulatory status, mechanism summaries,
                  and source-tracked citations.
                </p>
              </div>
              <div>
                <Button href="/shop/product/peptide-protocol-database" size="lg" className="w-full mb-3">
                  Subscribe Now →
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
                  "Monthly digest of FDA briefing documents and PCAC dockets",
                  "Plain-English summaries of peer-reviewed peptide research",
                  "Regulatory status tracker: 503A compounding pathway eligibility",
                  "Telehealth provider network directory (Marek Health, Lifeforce)",
                  "Compliance-first sourcing checklist — never buy from gray market",
                  "Substack delivery for monthly research notes",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compliance notice — replaced with poster-style hard-edged callout */}
          <div className="mb-12 border-l-4 border-accent p-6 md:p-8 bg-surface">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-6 h-6 text-accent mt-0.5 shrink-0" />
              <div>
                <span className="dop-caption mb-2 block">Compliance Notice</span>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
                  Educational research only.
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  This index is educational research only. We do not sell compounds, provide
                  dosing protocols, or facilitate sourcing. Any peptide access happens through
                  board-certified physicians and 503A compounding pharmacies — never through
                  integrated storefronts or gray-market channels.
                </p>
                <Link
                  href="/medical-disclaimer"
                  className="text-xs font-mono uppercase tracking-widest text-accent hover:text-accent-strong underline underline-offset-4 decoration-accent/60"
                >
                  Full medical disclaimer →
                </Link>
              </div>
            </div>
          </div>

          {/* Guarantee Block */}
          <div className="mb-12 border-2 border-proof-green rounded-md p-8 bg-proof-green/5 flex flex-col sm:flex-row items-center gap-6">
            <BrandIcon id="checkmark-shield" className="w-12 h-12 text-proof-green shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">100% Satisfaction Guarantee</h3>
              <p className="text-sm text-muted">
                Subscribe completely risk-free. Cancel anytime with a single click. If you
                don&apos;t find value in the research breakdowns within your first 30 days,
                ask for a full refund.
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
                  This database documents published research and federal regulatory process. I
                  am not a doctor. The information shared here is not medical advice and is not
                  intended to diagnose, treat, cure, or prevent any disease. Always consult
                  your physician before making any health decision.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="border-t border-stone pt-12">
            <span className="dop-caption mb-3 block">Related Reading</span>
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white uppercase">
              Continue the Research
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/blogs/peptides/ghk-cu-mechanism"
                className="group p-6 border border-stone rounded-md hover:border-accent transition-colors bg-surface"
              >
                <h3 className="text-white font-bold group-hover:text-accent transition-colors uppercase tracking-tight">
                  GHK-Cu Copper Peptide
                </h3>
                <p className="text-muted text-sm mt-2">
                  Complete mechanism guide.
                </p>
              </Link>
              <Link
                href="/lead-magnet/peptide-tracker"
                className="group p-6 border border-stone rounded-md hover:border-accent transition-colors bg-surface"
              >
                <h3 className="text-white font-bold group-hover:text-accent transition-colors uppercase tracking-tight">
                  2026 Safe Sourcing Peptide Tracker
                </h3>
                <p className="text-muted text-sm mt-2">
                  Compliance-first peptide sourcing guide with FDA status tracking.
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
