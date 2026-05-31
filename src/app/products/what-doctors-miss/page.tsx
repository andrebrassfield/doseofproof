import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Doctors Miss: The Complete Testing Guide | Dose of Proof",
  description: "The exact 26 blood, urine, and environmental tests you need to find the root cause when standard labs come back 'normal'.",
};

export default function WhatDoctorsMissPage() {
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
            <span className="text-white/60 truncate">What Doctors Miss</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
                Digital Guide
              </span>
              <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white">
                What Doctors Miss: <br />
                <span className="text-white/60">The Complete Testing Guide</span>
              </h1>
              <div className="text-3xl font-bold text-accent mb-6">$47</div>
              <p className="text-xl text-muted leading-relaxed mb-8">
                The exact 26 blood, urine, and environmental tests you need to find the root cause when standard labs come back "normal".
              </p>
              
              <Button href="https://shop.doseofproof.com/product/what-doctors-miss-the-complete-testing-guide" size="lg" className="w-full md:w-auto mb-4">
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
                  "The CIRS Panel: TGF-beta 1, C4a, MSH, VIP, MMP-9, VEGF",
                  "Mycotoxin Urine Panel interpretation guide",
                  "Tick-borne illness hidden markers",
                  "Environmental testing (ERMI vs HERTSMI-2)",
                  "How to order tests yourself without a doctor",
                  "Reference ranges that actually matter (functional vs conventional)",
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
                  This guide documents my personal experience and research. I am not a doctor. The information shared here is not medical advice and is not intended to diagnose, treat, cure, or prevent any disease. Always consult your physician before ordering or interpreting laboratory tests.
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
                href="/blogs/mold-recovery/mold-illness-testing"
                className="group p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">
                  How to Test for Mold Illness
                </h3>
                <p className="text-muted text-sm mt-2">
                  The complete lab panel breakdown.
                </p>
              </Link>
              <Link
                href="/blogs/mold-recovery/cirs-diagnosis-checklist"
                className="group p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <h3 className="text-white font-medium group-hover:text-accent transition-colors">
                  CIRS Diagnosis Checklist
                </h3>
                <p className="text-muted text-sm mt-2">
                  The 26 symptoms of Chronic Inflammatory Response Syndrome.
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
