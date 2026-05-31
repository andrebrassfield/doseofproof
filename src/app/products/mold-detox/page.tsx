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
            <span className="text-white/60 truncate">30-Day Mold Detox</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
                Digital Course
              </span>
              <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white">
                30-Day Mold Detox <br />
                <span className="text-white/60">Protocol</span>
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">$197</div>
              <p className="text-xl text-muted leading-relaxed mb-8">
                The exact 4-week protocol to open drainage pathways, introduce binders, and clear mycotoxins without crashing your system.
              </p>
              
              <Button href="https://shop.doseofproof.com/product/30-day-mold-detox-protocol" size="lg" className="w-full md:w-auto mb-4">
                Buy Now →
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

          {/* Medical Disclaimer */}
          <div className="mt-16 p-6 border border-red-500/20 rounded-xl bg-red-500/5">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-muted">
                  This protocol documents my personal experience and research. I am not a doctor. The information shared here is not medical advice and is not intended to diagnose, treat, cure, or prevent any disease. Always consult your physician before starting any detox protocol or supplement regimen.
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
                href="/blogs/mold-recovery/mold-detox-diet"
                className="group p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">
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
