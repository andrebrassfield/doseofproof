import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { TimelineScrubber } from "@/components/ui/TimelineScrubber";

export const metadata: Metadata = {
  title: "The Mold Toxicity Recovery Protocol | Dose of Proof",
  description: "The complete evidence-based guide to identifying hidden mold exposure, interpreting mycotoxins, and clearing biotoxins safely.",
  openGraph: {
    title: "The Mold Toxicity Recovery Protocol | Dose of Proof",
    description: "The complete evidence-based guide to identifying hidden mold exposure, interpreting mycotoxins, and clearing biotoxins safely.",
    images: [
      {
        url: "/api/og?title=Mold+Toxicity+Recovery+Guide&category=PILLAR&description=How+to+identify+hidden+mold%2C+interpret+mycotoxins%2C+and+stage+your+detox.",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function MoldToxicityHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Mold Toxicity Recovery Protocol: A Complete Biological Audit",
    "description": "Evidence-based strategies for identifying, testing, and detoxifying from environmental mold exposure and Chronic Inflammatory Response Syndrome (CIRS).",
    "author": {
      "@type": "Person",
      "name": "Andre Brassfield"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dose of Proof"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="flex-1 pt-32 pb-24 bg-background">
        <article className="max-w-5xl mx-auto px-6 lg:px-12">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Pillar Guides</span>
            <span>/</span>
            <span className="text-white/60">Mold Toxicity</span>
          </nav>

          <header className="mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              Environmental Load & Detox Staging
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white">
              The Mold Toxicity <br />
              <span className="text-white/60">Recovery Protocol</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted max-w-4xl leading-relaxed">
              An evidence-first blueprint to finding hidden environmental loads, mapping biotoxin inflammation, and staging your excretion pathways.
            </p>
          </header>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-16">
            <Image
              src="/marketing-assets/images/doctors-miss-series/cirs-mold-panel.png"
              alt="Mold toxicity research banner"
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>

          {/* Table of Contents */}
          <div className="p-6 border border-white/10 rounded-xl bg-zinc-950/50 mb-16 max-w-xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Guide Sections</h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#understanding-toxicity" className="text-muted hover:text-accent">1. Understanding Biotoxin Illness (CIRS)</a></li>
              <li><a href="#how-to-test" className="text-muted hover:text-accent">2. Mapping the Load: Mycotoxins vs. CIRS Markers</a></li>
              <li><a href="#detox-sequencing" className="text-muted hover:text-accent">3. Staging the Detox: The 4-Phase Protocol</a></li>
              <li><a href="#mold-diet" className="text-muted hover:text-accent">4. Nutrient Stacking & The Low-Histamine Shield</a></li>
              <li><a href="#remediation" className="text-muted hover:text-accent">5. Fixing the Environment: ERMI & Remediation</a></li>
            </ol>
          </div>

          {/* Section 1 */}
          <section id="understanding-toxicity" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">1. Understanding Biotoxin Illness (CIRS)</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Biotoxin illness is not an allergy. Standard allergists look for IgE-mediated histamine releases that cause sneezing, runny eyes, or hives. 
              But when mold mycotoxins enter a water-damaged building, they release microscopic chemical poisons that accumulate in lipid tissues.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              For about 25% of the population, genetic markers (HLA-DR genes) prevent the immune system from identifying and tagging these compounds. 
              As a result, the toxins circulate indefinitely, initiating a cascade of systemic inflammation known as **Chronic Inflammatory Response Syndrome (CIRS)**.
            </p>
            <div className="bg-zinc-950/50 border border-white/10 rounded-xl p-6 mb-6">
              <h4 className="text-white font-bold mb-3">The Common Symptoms of CIRS</h4>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted">
                <li className="flex items-center gap-2"><BrandIcon id="check" className="w-4 h-4 text-accent" /> Brain fog and memory loss</li>
                <li className="flex items-center gap-2"><BrandIcon id="check" className="w-4 h-4 text-accent" /> Chronic fatigue and muscle fatigue</li>
                <li className="flex items-center gap-2"><BrandIcon id="check" className="w-4 h-4 text-accent" /> Static shocks and neurological tingling</li>
                <li className="flex items-center gap-2"><BrandIcon id="check" className="w-4 h-4 text-accent" /> Food sensitivities and gut motility drops</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="how-to-test" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">2. Mapping the Load: Mycotoxins vs. CIRS Markers</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Getting well requires data. You cannot guess your way out of a biotoxin load. We divide our testing strategy into two primary categories: 
              measuring actual toxin excretion and measuring the biological damage (inflammatory signaling).
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-950/20">
                <h3 className="text-xl font-bold text-white mb-4">Urinary Mycotoxin Assays</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Measures the absolute presence of mold toxins like Ochratoxin A, Mycophenolic Acid, and Trichothecenes leaving your body.
                </p>
                <Link href="/tests/mycotoxin-urine-test" className="text-accent text-sm font-bold hover:underline">
                  Read Mycotoxins Guide →
                </Link>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-950/20">
                <h3 className="text-xl font-bold text-white mb-4">CIRS Blood Panels</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Measures immune signaling, inflammation, and barrier permeability markers like TGF-Beta 1, C4a, and MMP-9.
                </p>
                <Link href="/tests/cirs-mold-panel" className="text-accent text-sm font-bold hover:underline">
                  Read CIRS Markers Guide →
                </Link>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="detox-sequencing" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">3. Staging the Detox: The 4-Phase Protocol</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              The biggest mistake patients make is introducing heavy binders on day one. If your drainage pathways are closed, 
              the toxins mobilized by binders will recirculate in your blood, overloading your kidneys, liver, and skin.
            </p>
            
            <div className="mb-10">
              <TimelineScrubber />
            </div>

            <div className="space-y-6">
              {[
                { phase: "Phase 1: Drainage", desc: "Support liver filtration, biliary flow, and kidney output using dandelion root, milk thistle, and mineral buffers." },
                { phase: "Phase 2: Binding", desc: "Introduce binders matched to your urinary test. Ochratoxin A requires activated charcoal; Trichothecenes respond to Zeolite and modified citrus pectin." },
                { phase: "Phase 3: Biofilm Cleansing", desc: "Disrupt protective biofilms in the gut and sinuses, allowing antifungals to access hidden fungal colonization." },
                { phase: "Phase 4: Cellular Rebuild", desc: "Replenish cell membrane lipids with high-dose phosphatidylcholine and support mitochondrial energy production." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-4">
                  <div className="text-accent font-mono font-bold text-lg">0{i+1}</div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.phase}</h4>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section id="mold-diet" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">4. Nutrient Stacking & The Low-Histamine Shield</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Mold toxins block your body's natural parasympathetic brake, which often leads to severe mast cell activation (MCAS). 
              During active detox, eating a diet low in mold and histamines reduces the baseline inflammatory load.
            </p>
            <table className="w-full border-collapse text-left text-sm mb-6">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 text-white font-bold">Foods to Avoid (High Mold/Histamine)</th>
                  <th className="py-3 text-white font-bold">Foods to Prioritize (Low Mold/Histamine)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-muted">
                <tr>
                  <td className="py-3 pr-4">Leftovers, aged meats, and cheeses</td>
                  <td className="py-3">Freshly cooked grass-fed meats</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Grains, peanuts, and dried fruits</td>
                  <td className="py-3">Fresh low-histamine vegetables</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Fermented foods and alcohol</td>
                  <td className="py-3">Pure filtered water and mineral electrolytes</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 5 */}
          <section id="remediation" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">5. Fixing the Environment: ERMI & Remediation</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              You cannot detoxify in a moldy environment. Clean air is the foundation of recovery. 
              Standard home mold inspections look for visible damage, but hidden mold in crawlspaces or behind drywall requires advanced testing.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-8">
              An **ERMI (Environmental Relative Moldiness Index)** dust test uses PCR technology to identify key water-damaged indicator molds. 
              If your ERMI score is high, specialized remediation (dry ice blasting, structural sealing, and HEPA air scrubbing) must be completed.
            </p>

            <div className="border border-accent/20 rounded-2xl p-8 bg-accent/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Want the Complete Mold detox Guide?</h3>
                <p className="text-muted text-sm max-w-xl">
                  Step-by-step instructions on binding, testing, home remediation, and restoring your cellular health.
                </p>
              </div>
              <Button href="/products/mold-detox" size="lg" className="shrink-0">
                Get Mold Detox Guide →
              </Button>
            </div>
          </section>

        </article>
      </main>
      <Footer />
      <DisclaimerBanner />
    </>
  );
}
