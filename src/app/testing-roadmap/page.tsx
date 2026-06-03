import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { diagnosticTests } from "@/lib/testing-roadmap";

export const metadata: Metadata = {
  title: "Testing Roadmap: What Doctors Miss",
  description:
    "A structured testing roadmap for mold, MCAS, CCI, vagal tone, and complex chronic symptoms.",
};

export default function TestingRoadmapPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28">
        <section className="px-6 lg:px-12 py-20 relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('/marketing-assets/images/hero/section-the-proof-1920x600.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          <div className="w-full max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-12 items-center min-w-0">
            <div className="min-w-0 max-w-full">
              <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-6 block">
                Diagnostic Roadmap
              </span>
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.05] mb-8 max-w-full">
                Stop guessing.
                <span className="block text-white/50">Map the terrain.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-[34rem] mb-10">
                This is the page for the person with normal basic labs and abnormal life. It organizes the tests that connect symptoms to mold, immune signaling, structure, histamine, and nervous-system output.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/products/what-doctors-miss" size="lg" className="w-auto max-w-full px-6 sm:px-8">
                  Get the Full Testing Guide
                </Button>
                <Button href="/lead-magnet" variant="secondary" size="lg" className="w-auto max-w-full px-6 sm:px-8">
                  Free Checklist
                </Button>
              </div>
            </div>
            <div className="relative w-full max-w-full min-w-0 aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
              <Image
                src="/marketing-assets/images/doctors-miss-series/cirs-mold-panel.png"
                alt="CIRS mold panel testing visual"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-contain opacity-90"
                priority
              />
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-20 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-4xl md:text-5xl tracking-tighter mb-4">The test sequence</h2>
                <p className="text-muted max-w-2xl">
                  Each page is built to become a useful search destination and a conversion path into the paid guide, affiliate tools, or intake.
                </p>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-accent">
                pSEO foundation: /tests/[slug]
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diagnosticTests.map((test) => (
                <Link
                  key={test.slug}
                  href={`/tests/${test.slug}`}
                  className="group border border-white/10 rounded-2xl overflow-hidden bg-black/40 hover:border-accent/50 transition-colors"
                >
                  <div className="relative aspect-[16/10] bg-zinc-900">
                    <Image
                      src={test.image}
                      alt={`${test.name} visual`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="text-xs font-mono uppercase tracking-widest text-accent">{test.category}</span>
                      <BrandIcon id={test.icon} className="w-5 h-5 text-white/50 group-hover:text-accent" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                      {test.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{test.intent}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-20 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.8fr] gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl tracking-tighter mb-6">
                Monetization without breaking trust.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Every test page has a job: explain the marker, show where it fits in the sequence, disclose affiliate relationships, and route the visitor to the right next step.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {["Paid guide", "Affiliate tools", "Consult intake"].map((label) => (
                  <div key={label} className="border border-white/10 rounded-xl p-5 bg-zinc-950/70">
                    <BrandIcon id="trending-up" className="w-5 h-5 text-accent mb-5" />
                    <p className="text-sm font-bold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[1200/628] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
              <Image
                src="/marketing-assets/images/lead-magnets/cta-get-tested-1200x628.png"
                alt="Get tested call to action"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
