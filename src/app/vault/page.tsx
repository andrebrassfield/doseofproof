import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function VaultPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-zinc-950">
        <article className="max-w-6xl mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <header className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.1] mb-6 text-white font-bold">
              The Protocol:<br />
              <span className="text-white/50">What I'm actually doing.</span>
            </h1>
            <p className="text-2xl text-accent font-serif italic mb-8">
              "I don't guess. I track, test, and adjust."
            </p>
            <p className="text-lg text-muted leading-relaxed">
              This is the exact, current framework I am using to stabilize my terrain, fix the mechanical drivers of my symptoms, and map the data.
            </p>

            {/* Warning Box */}
            <div className="border border-red-500/20 bg-red-500/5 p-4 rounded-lg mt-8 text-sm text-white/80 max-w-2xl mx-auto text-left flex gap-3">
              <span className="text-red-500 font-bold">⚠️</span>
              <p>
                <strong>Disclaimer:</strong> This page is a living document. It changes as my personal data changes. I have a philosophy degree, not a medical license. This protocol is my personal dataset. Always consult a specialist before starting any new treatment, especially with complex conditions like CCI or hEDS.
              </p>
            </div>
          </header>

          <div className="w-full h-1 my-12 text-white/10">
            <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
              <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
            </svg>
          </div>

          {/* Grid Layout: Content Column & Visual Column */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            
            {/* Content Column (Span 2) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Section 1: Mechanical */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-accent/10 text-accent font-mono text-xs px-2.5 py-1 rounded border border-accent/20">01</span>
                  <h2 className="text-3xl text-white font-bold tracking-tight">The Mechanical</h2>
                </div>
                <p className="text-accent font-mono text-xs uppercase tracking-wider">
                  Structure & Autonomic Nervous System
                </p>
                
                <p className="text-lg text-muted leading-relaxed">
                  You can't out-supplement a structural issue. Until the vagus nerve is free from mechanical compression at the atlas (C1-C2), the autonomic nervous system will stay locked in a sympathetic (fight-or-flight) state.
                </p>

                <div className="space-y-6 pl-4 border-l border-accent/30 my-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Upper Cervical Care (Blair adjustments)
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      Precise, high-precision Blair upper cervical adjustments with <strong><a href="https://chismchiropractic.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent underline transition-colors">Dr. Jackson Chism</a></strong>.
                    </p>
                    <ul className="text-sm text-white/70 space-y-1 pl-4 list-disc">
                      <li><strong>Current Cadence:</strong> 1x per week tracking alignment holding status.</li>
                      <li><strong>The Data:</strong> Scans verify mechanical alignment holding, reducing the structural stretch on the brainstem and carotid sheath.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Vagal Tone Work
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      Targeting the <strong><Link href="/blogs/protocols/vagus-nerve-exercises" className="text-white hover:text-accent underline transition-colors">cholinergic anti-inflammatory reflex</Link></strong> to reset autonomic homeostasis.
                    </p>
                    <ul className="text-sm text-white/70 space-y-1 pl-4 list-disc">
                      <li><strong>Interventions:</strong> Non-invasive vagus nerve stimulation (nVNS) therapy, structured diaphragmatic breathing, and targeted cold exposure to increase parasympathetic HRV response.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Physical Therapy & Decompression
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      Releasing tight anatomical channels without destabilizing connective tissue.
                    </p>
                    <ul className="text-sm text-white/70 space-y-1 pl-4 list-disc">
                      <li><strong>Interventions:</strong> <strong><Link href="/blogs/protocols/tos-stretches" className="text-white hover:text-accent underline transition-colors">Gentle Thoracic Outlet Syndrome (TOS) stretches</Link></strong> targeting the scalenes and sternocleidomastoid (SCM) to improve blood flow, while strictly avoiding adjustments that trigger hypermobile (hEDS) ligament laxity.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="w-full h-1 my-12 text-white/5">
                <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
                </svg>
              </div>

              {/* Section 2: The Terrain */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-accent/10 text-accent font-mono text-xs px-2.5 py-1 rounded border border-accent/20">02</span>
                  <h2 className="text-3xl text-white font-bold tracking-tight">The Terrain</h2>
                </div>
                <p className="text-accent font-mono text-xs uppercase tracking-wider">
                  Mast Cells, Mold & Cellular Energy
                </p>
                
                <p className="text-lg text-muted leading-relaxed">
                  Once structural decompression is established, the downstream chemical fire must be put out. I am targeting mast cell stabilization, mitochondrial recovery, and strict environmental defense.
                </p>

                <div className="space-y-6 pl-4 border-l border-accent/30 my-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      MCAS Stabilization & Histamine Management
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      Breaking the relentless inflammatory loop of histamine and mast cell degranulation.
                    </p>
                    <ul className="text-sm text-white/70 space-y-1 pl-4 list-disc">
                      <li><strong>Hydroxyzine:</strong> 25mg daily as a tactical bridge to block H1 receptors and stabilize the autonomic anxiety spikes.</li>
                      <li><strong>Natural Stabilizers:</strong> Daily intake of high-dose bioflavonoids (Quercetin, Luteolin) and Buffered Vitamin C to prevent mast cell trigger release. Read my full <strong><Link href="/blogs/mcas/mcas-treatment-protocol-2026" className="text-white hover:text-accent underline transition-colors">MCAS protocol</Link></strong>.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Mitochondrial & Redox Support
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      Supplying the critical cofactors required to repair cellular respiration and clean up toxic load.
                    </p>
                    <ul className="text-sm text-white/70 space-y-1 pl-4 list-disc">
                      <li><strong>NAD+ Therapy:</strong> Injections and liposomal formulations for mitochondrial repair and cellular energy production. See the detailed <strong><Link href="/blogs/supplements/nad-supplement-guide" className="text-white hover:text-accent underline transition-colors">NAD+ guide</Link></strong>.</li>
                      <li><strong>Trace Minerals:</strong> Purified electrolytes and concentrated minerals to restore cellular hydration depleted by autonomic stress.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Environmental Mold Detox
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      Strict avoidance of mycotoxin exposure and binding toxins currently in the body.
                    </p>
                    <ul className="text-sm text-white/70 space-y-1 pl-4 list-disc">
                      <li><strong>Interventions:</strong> Strict air filtration (HEPA and carbon filters) to prevent inhalant triggers, combined with specific binder schedules (activated carbon, bentonite clay) to clear existing mycotoxins.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="w-full h-1 my-12 text-white/5">
                <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
                </svg>
              </div>

              {/* Section 3: The Data */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-accent/10 text-accent font-mono text-xs px-2.5 py-1 rounded border border-accent/20">03</span>
                  <h2 className="text-3xl text-white font-bold tracking-tight">The Data</h2>
                </div>
                <p className="text-accent font-mono text-xs uppercase tracking-wider">
                  Biometric Monitoring & Objective Tracking
                </p>
                
                <p className="text-lg text-muted leading-relaxed">
                  Subjective feelings are liars. Objective data tells the truth. If you want to fix a complex, broken system, you have to map the variables.
                </p>

                <div className="space-y-6 pl-4 border-l border-accent/30 my-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      HRV & Sleep Tracking
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      Continuous monitoring of nightly autonomic balance using Oura Ring biometric sensors to measure heart rate variability (HRV) and deep sleep recovery trends.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Symptom Database & Input Logging
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      Custom-built SQL-backed tracking system mapping daily nutrition, supplement timing, alignments, weather changes, and subjective symptom severity to correlate triggers and holding patterns.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Clinical Imaging & Thermal Scans
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      Monthly paraspinal infrared thermography scans to monitor neurological holding patterns, verify vasomotor changes, and track alignment holding.
                    </p>
                  </div>
                </div>

                {/* Dashboard Image */}
                <div className="border border-white/10 rounded-xl overflow-hidden mt-8 relative bg-zinc-900/40">
                  <Image 
                    src="/marketing-assets/images/personal-proof/proof-dashboard-mockup.png" 
                    alt="Dose of Proof Daily Biometric Data Summary Dashboard" 
                    width={1000}
                    height={600}
                    className="w-full h-auto object-cover opacity-90"
                  />
                  <div className="p-4 bg-black/60 border-t border-white/5 text-xs text-muted text-center">
                    Screenshot of my custom-built daily biometric dashboard tracking autonomic balance and symptom recovery trends.
                  </div>
                </div>
              </section>

            </div>

            {/* Visual Column / Sidebar (Span 1) */}
            <div className="space-y-8">
              
              {/* Scan Card 1 */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/50 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent/80">
                  C1-C2 Structural Finding
                </h3>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/5">
                  <Image 
                    src="/marketing-assets/images/personal-proof/combined-scans.png" 
                    alt="Dre's C1-C2 Instability Cervical X-ray and TyTron Scan findings" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Actual dynamic X-ray and TyTron paraspinal scan results demonstrating the structural loss of curve and vagus nerve irritation at the atlas.
                </p>
              </div>

              {/* Scan Card 2 */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/50 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent/80">
                  Protocol Root Cause Map
                </h3>
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-black border border-white/5">
                  <Image 
                    src="/marketing-assets/images/personal-proof/protocol-infographic-landscape.png" 
                    alt="Protocol root cause restoration details infographic" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Visual roadmap targeting Dr. Chism adjustments, vagal stimulation, TOS releases, cellular energy cofactors, and MCAS stabilization.
                </p>
              </div>

              {/* Quick Facts Sidebar Widget */}
              <div className="border border-white/10 rounded-2xl bg-zinc-950/80 p-6 mt-4">
                <h3 className="text-accent text-sm font-bold uppercase tracking-wider mb-4">The Current Stack</h3>
                <ul className="space-y-4 text-sm text-white/90">
                  <li className="flex gap-3">
                    <span className="text-accent">•</span>
                    <span><strong>1. Structure:</strong> Blair adjustments, vagal stimulation, scalene release</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">•</span>
                    <span><strong>2. Mast Cells:</strong> Hydroxyzine (25mg), Quercetin, Buffered Vit C</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">•</span>
                    <span><strong>3. Redox:</strong> NAD+ Injections, Trace Minerals</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">•</span>
                    <span><strong>4. Environment:</strong> HEPA air filtration, Mycotoxin binders</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          <div className="w-full h-1 my-16 text-white/10">
            <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
              <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
            </svg>
          </div>

          {/* CTA Section */}
          <section className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Build Your Own Baseline</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
              You can't fix what you haven't mapped. If you are drowning in mysterious symptoms, stop guessing and start gathering data.
            </p>
            <p className="text-white/80 text-sm font-medium">
              Download the exact checklist of labs, scans, and specialists I used to finally get answers.
            </p>
            <div className="pt-4">
              <Button href="/lead-magnet" size="lg">
                Get the Terrain Mapping Checklist
              </Button>
            </div>
          </section>

        </article>
      </main>
      <Footer />
    </>
  );
}
