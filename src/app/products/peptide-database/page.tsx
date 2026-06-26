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
                Peptide Research <br />
                <span className="text-white/60">Index</span>
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">$29<span className="text-lg text-muted font-normal">/mo</span></div>
              <p className="text-xl text-muted leading-relaxed mb-8">
                A monthly-curated index of FDA briefing documents, federal advisory committee
                dockets, and peer-reviewed research on peptide science. Educational bridge only —
                no compounds sold, no dosing protocols, no sourcing.
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

          {/* Compliance Banner — replaces testimonial section per hotfix/compliance-remediation-2026-06-24 */}
          <div className="mt-16 p-8 border border-amber-500/30 rounded-2xl bg-amber-500/[0.06]">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-amber-300 mb-2">
                  Compliance notice
                </h3>
                <p className="text-sm text-amber-100/80 leading-relaxed mb-3">
                  This index is educational research only. We do not sell compounds, provide
                  dosing protocols, or facilitate sourcing. Any peptide access happens through
                  board-certified physicians and 503A compounding pharmacies — never through
                  integrated storefronts or gray-market channels.
                </p>
                <Link
                  href="/medical-disclaimer"
                  className="text-xs font-mono uppercase tracking-widest text-amber-300 hover:text-amber-200 underline underline-offset-4"
                >
                  Full medical disclaimer →
                </Link>
              </div>
            </div>
          </div>

          {/* Guarantee Block */}
          <div className="mt-8 border border-green-500/20 rounded-2xl p-8 bg-green-500/5 flex flex-col sm:flex-row items-center gap-6">
            <BrandIcon id="checkmark-shield" className="w-12 h-12 text-green-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-sm text-muted">
                Subscribe completely risk-free. Cancel anytime with a single click. If you don't
                find value in the research breakdowns within your first 30 days, ask for a full
                refund.
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
                  This database documents published research and federal regulatory process.
                  I am not a doctor. The information shared here is not medical advice and is
                  not intended to diagnose, treat, cure, or prevent any disease. Always consult
                  your physician before making any health decision.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles — BPC-157 Dosage Guide cross-link removed per hotfix/compliance-remediation-2026-06-24 */}
          <div className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">
              Related Reading
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
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
              <Link
                href="/lead-magnet/peptide-tracker"
                className="group p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">
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
