import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";

export const metadata: Metadata = {
  title: "MCAS & Histamine Intolerance Guide | Dose of Proof",
  description: "Identify the biological connections between mast cell activation (MCAS), histamine overload, and parasympathetic vagus nerve brake suppression.",
  openGraph: {
    title: "MCAS & Histamine Intolerance Guide | Dose of Proof",
    description: "Identify the biological connections between mast cell activation (MCAS), histamine overload, and parasympathetic vagus nerve brake suppression.",
    images: [
      {
        url: "/api/og?title=MCAS+and+Histamine+Overload&category=PILLAR&description=Understanding+mast+cell+triggering%2C+histamine+intolerance%2C+and+vagal+stabilization.",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function MCASHistamineHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "MCAS & Histamine Intolerance: Stabilizing the Mast Cell Shield",
    "description": "A review of mast cell activation syndrome, N-methylhistamine markers, low-histamine dietary blocks, and autonomic vagus nerve interactions.",
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
            <span className="text-white/60">MCAS & Histamine</span>
          </nav>

          <header className="mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              Immune Reactivity & Autonomic Buffers
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white">
              MCAS & Histamine <br />
              <span className="text-white/60">Intolerance</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted max-w-4xl leading-relaxed">
              When immune cells degranulate continuously, the body becomes reactive to its own environment. Explore how to stabilize your mast cell shield.
            </p>
          </header>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-16">
            <Image
              src="/marketing-assets/images/proof-cards/proof-inflammation-chart-1080x1080.png"
              alt="Mast cell activation diagram"
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>

          {/* Table of Contents */}
          <div className="p-6 border border-white/10 rounded-xl bg-zinc-950/50 mb-16 max-w-xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Guide Sections</h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#what-is-mcas" className="text-muted hover:text-accent">1. Mast Cell Activation Syndrome (MCAS) Explained</a></li>
              <li><a href="#vagus-connection" className="text-muted hover:text-accent">2. The Vagus Nerve: Your Innate Inflammation Brake</a></li>
              <li><a href="#diagnosing-mediators" className="text-muted hover:text-accent">3. Lab Diagnostics: Checking Tryptase & Histamine</a></li>
              <li><a href="#dietary-stabilizers" className="text-muted hover:text-accent">4. Stabilization: Quercetin, PEA, and Low-Histamine Eating</a></li>
              <li><a href="#sequencing-mold-neck" className="text-muted hover:text-accent">5. The Trifecta: Addressing Mold and Cervical Alignment</a></li>
            </ol>
          </div>

          {/* Section 1 */}
          <section id="what-is-mcas" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">1. Mast Cell Activation Syndrome (MCAS) Explained</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Mast cells are key first-responders of your innate immune system. They sit at the barriers of your body—your skin, gut lining, airways, and surrounding your nerves. 
              Their job is to scan for danger and release inflammatory mediators (like histamines, prostaglandins, and cytokines) to isolate threats.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              In **Mast Cell Activation Syndrome (MCAS)**, mast cells become hyper-reactive. 
              Instead of firing only during an acute infection, they degranulate continuously in response to minor environmental triggers, foods, temperature shifts, or stress.
            </p>
          </section>

          {/* Section 2 */}
          <section id="vagus-connection" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">2. The Vagus Nerve: Your Innate Inflammation Brake</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              The vagus nerve is the primary conduit of the parasympathetic nervous system. It directly monitors immune status and releases acetylcholine to tell macrophages and mast cells to stop releasing inflammatory cytokines. 
              This biological feedback loop is called the **cholinergic anti-inflammatory pathway**.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              When upper neck instability (CCI) compresses the vagus nerve, this feedback loop is disrupted. 
              The inflammation brake is released, leaving your mast cells in a state of hyper-alert, triggering systemic food sensitivities and autonomic swings.
            </p>
            <div className="bg-zinc-950/50 border border-white/10 rounded-xl p-6 mb-6">
              <Link href="/tests/vagal-tone-assessment" className="text-accent text-lg font-bold hover:underline block mb-2">
                HRV & Vagal Tone Assessment Guide →
              </Link>
              <p className="text-sm text-muted">Learn how Heart Rate Variability helps track your vagal output buffer.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="diagnosing-mediators" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">3. Lab Diagnostics: Checking Tryptase & Histamine</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              MCAS is a clinical diagnosis, but running key lab markers helps document the biochemical patterns of your flare-ups. 
              Standard markers include baseline tryptase, plasma histamine, and a 24-hour urine collection for prostaglandins and histamine metabolites.
            </p>
            <div className="bg-zinc-950/50 border border-white/10 rounded-xl p-6 mb-6">
              <Link href="/tests/mcas-histamine-panel" className="text-accent text-lg font-bold hover:underline block mb-2">
                MCAS & Histamine Lab Panel Guide →
              </Link>
              <p className="text-sm text-muted">Learn CPT codes, sample shipping guidelines, and optimal ranges.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="dietary-stabilizers" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">4. Stabilization: Quercetin, PEA, and Low-Histamine Eating</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Stabilizing hyper-reactive mast cells requires a combination of low-histamine diet modifications and natural mast cell stabilizers:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border border-white/10 rounded-xl p-5 bg-zinc-950/40">
                <h4 className="text-white font-bold mb-2">Dietary Controls</h4>
                <p className="text-xs text-muted leading-relaxed">Eat freshly cooked meats; avoid leftovers, aged meats, canned fish, and fermented foods.</p>
              </div>
              <div className="border border-white/10 rounded-xl p-5 bg-zinc-950/40">
                <h4 className="text-white font-bold mb-2">DAO Enzyme</h4>
                <p className="text-xs text-muted leading-relaxed">Diamine Oxidase (DAO) helps break down dietary histamine in your gut before absorption.</p>
              </div>
              <div className="border border-white/10 rounded-xl p-5 bg-zinc-950/40">
                <h4 className="text-white font-bold mb-2">Natural Stabilizers</h4>
                <p className="text-xs text-muted leading-relaxed">Quercetin, Luteolin, and PEA (Palmitoylethanolamide) stabilize mast cell membranes.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sequencing-mold-neck" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">5. The Trifecta: Addressing Mold and Cervical Alignment</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              You cannot stabilize MCAS long-term with diet and supplements alone if your cells are constantly triggered by environmental mycotoxins or mechanical C1-C2 joint friction.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-8">
              True recovery requires addressing the "trifecta":
            </p>
            <ol className="list-decimal pl-6 space-y-4 text-muted mb-8">
              <li>
                <strong className="text-white">Clear the Environment:</strong> Remove mold mycotoxins to eliminate the constant chemical trigger. Review our [Mold Toxicity Guide](/mold-toxicity).
              </li>
              <li>
                <strong className="text-white">Align the Spine:</strong> Fix upper neck C1-C2 misalignment to decompress the vagus nerve. Review our [Cervical Instability Guide](/craniocervical-instability).
              </li>
              <li>
                <strong className="text-white">Modulate Immune Signaling:</strong> Calm the mast cells using stabilizers while the mechanical and environmental roots are cleared.
              </li>
            </ol>
            
            <div className="border border-accent/20 rounded-2xl p-8 bg-accent/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Looking for the Peptide Database?</h3>
                <p className="text-muted text-sm max-w-xl">
                  Access exact research protocols for GHK-Cu and other inflammation-modulating peptides.
                </p>
              </div>
              <Button href="/products/peptide-database" size="lg" className="shrink-0">
                View Peptide Database →
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
