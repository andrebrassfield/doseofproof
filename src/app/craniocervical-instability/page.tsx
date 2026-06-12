import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { ScanViewer } from "@/components/ui/ScanViewer";

export const metadata: Metadata = {
  title: "Craniocervical Instability & C1-C2 Care Guide | Dose of Proof",
  description: "Understand the mechanical root cause of nervous-system chaos, dynamic neck imaging, and upper cervical restoration.",
  openGraph: {
    title: "Craniocervical Instability & C1-C2 Care Guide | Dose of Proof",
    description: "Understand the mechanical root cause of nervous-system chaos, dynamic neck imaging, and upper cervical restoration.",
    images: [
      {
        url: "/api/og?title=CCI+and+C1-C2+Restoration&category=PILLAR&description=How+neck+mechanics+irritate+the+vagus+nerve+and+how+to+rebuild+stability.",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CraniocervicalInstabilityHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Craniocervical Instability (CCI) & C1-C2 Alignment: A Mechanical Review",
    "description": "Understanding atlantoaxial subluxation, cervical curve loss, vagus nerve compression, and upper cervical care.",
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
            <span className="text-white/60">CCI & Structure</span>
          </nav>

          <header className="mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              Structural Root Causes & Neuro-Mechanics
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white">
              Craniocervical <br />
              <span className="text-white/60">Instability (CCI)</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted max-w-4xl leading-relaxed">
              When structural alignment fails, the central nervous system becomes compromised. Explore how C1-C2 displacement irritates the vagus nerve.
            </p>
          </header>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-16">
            <Image
              src="/marketing-assets/scans/ap-xray.jpg"
              alt="Cervical spine mechanisms diagram"
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>

          {/* Table of Contents */}
          <div className="p-6 border border-white/10 rounded-xl bg-zinc-950/50 mb-16 max-w-xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Guide Sections</h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#structural-connection" className="text-muted hover:text-accent">1. The Skull-to-Neck Junction (Atlantoaxial Mechanics)</a></li>
              <li><a href="#vagus-compression" className="text-muted hover:text-accent">2. Vagus Nerve Compression and Autonomic Chaos</a></li>
              <li><a href="#cervical-lordosis" className="text-muted hover:text-accent">3. Loss of Cervical Curve (Military Neck)</a></li>
              <li><a href="#dynamic-imaging" className="text-muted hover:text-accent">4. Scanning for Proof: TyTron & DMX</a></li>
              <li><a href="#treatment-options" className="text-muted hover:text-accent">5. Rebuilding Stability: Adjustments, Isometrics, & PRP</a></li>
            </ol>
          </div>

          {/* Section 1 */}
          <section id="structural-connection" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">1. The Skull-to-Neck Junction (Atlantoaxial Mechanics)</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Your head weight (typically 10-12 pounds) is balanced entirely on the first cervical vertebra, C1, also known as the **Atlas**. 
              The Atlas sits on C2, the **Axis**, which features a bony peg (the dens) around which C1 rotates. 
              This joint junction provides over 50% of your head's rotation capacity.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Ligaments (alar, transverse, apical) hold this joint in strict alignment. 
              If these ligaments are stretched by trauma (whiplash) or systemic laxity (hEDS), 
              the joints rotate and shift excessively. This mechanical instability is known as **Craniocervical Instability (CCI)** or **Atlantoaxial Instability (AAI)**.
            </p>
          </section>

          {/* Section 2 */}
          <section id="vagus-compression" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">2. Vagus Nerve Compression and Autonomic Chaos</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              The vagus nerve (Cranial Nerve X) exits the brain stem through the jugular foramen, travelling directly in front of the C1 and C2 transverse processes. 
              When C1 or C2 rotate out of position, they place physical pressure or traction on the vagus nerve.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              This structural irritation releases the parasympathetic "brake" on your body's organs. 
              This mechanical issue can directly lead to heart rate spikes, digestive paralysis (gastroparesis), and mast cell activation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-950/20">
                <h3 className="text-xl font-bold text-white mb-3">Mechanical Symptom Staging</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>- Symptoms worsen when looking down (flexion)</li>
                  <li>- Rapid heart rate spikes when standing</li>
                  <li>- Feeling like the head is "too heavy"</li>
                </ul>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-zinc-950/20">
                <h3 className="text-xl font-bold text-white mb-3">Downstream Inflammation</h3>
                <ul className="space-y-2 text-sm text-muted">
                  <li>- Mast cells degranulate due to mechanical friction</li>
                  <li>- Blood-brain barrier permeability increases</li>
                  <li>- Constant state of chronic guarding</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="cervical-lordosis" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">3. Loss of Cervical Curve (Military Neck)</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              A healthy neck should have a forward lordotic curve of 35 to 45 degrees. 
              This curve acts as a shock absorber, distributing head weight evenly down your spine.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Due to modern posture or ligament laxity, many patients lose this curve, resulting in **military neck** or a reversed curve (kyphosis). 
              For every inch your head shifts forward, it adds 10 pounds of effective weight to the cervical muscles, pulling directly on C1 and C2.
            </p>
            <div className="bg-zinc-950/50 border border-white/10 rounded-xl p-6 mb-6">
              <Link href="/tests/cervical-curve-measurement" className="text-accent text-lg font-bold hover:underline block mb-2">
                Cervical Curve & C1-C2 Imaging Guide →
              </Link>
              <p className="text-sm text-muted">Learn how dynamic open-mouth X-rays measure C1-C2 coordinates.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="dynamic-imaging" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">4. Scanning for Proof: TyTron & DMX</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Static recumbent MRIs do not show mechanical instability. You need dynamic upright imaging.
            </p>
            
            <div className="mb-10">
              <ScanViewer
                imageSrc="/marketing-assets/scans/ap-xray.jpg"
                altText="A-P Cervical X-Ray Mechanism Diagram"
                hotspots={[
                  {
                    id: "left-translation",
                    top: "35%",
                    left: "48%",
                    title: "C1-C2 Alignment Shift",
                    description: "This vector shows lateral translation of C1 relative to C2 by 3.5mm, indicating alar ligament laxity."
                  },
                  {
                    id: "vagus-nerve-pathway",
                    top: "55%",
                    left: "52%",
                    title: "Vagus Nerve Pathway",
                    description: "The vagus nerve passes directly adjacent to the C1-C2 transverse processes. This shift puts mechanical traction on the vagal sheath."
                  },
                  {
                    id: "occipitoatlantal-junction",
                    top: "20%",
                    left: "50%",
                    title: "Occipitoatlantal Junction",
                    description: "The skull weight pivots directly on C1 here. Any asymmetry in muscular guarding pulls C1 out of alignment."
                  }
                ]}
              />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start border-b border-white/5 pb-4">
                <BrandIcon id="scan-line" className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">TyTron Paraspinal Thermography</h4>
                  <p className="text-muted text-sm leading-relaxed">Reads temperature differentials along the spine to trace autonomic nerve irritation. Consistency proves nerve compression.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-b border-white/5 pb-4">
                <BrandIcon id="dna-helix" className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="text-white font-bold mb-1">Digital Motion X-Ray (DMX)</h4>
                  <p className="text-muted text-sm leading-relaxed">A real-time video X-ray taken while moving your head. Measures alar ligament laxity directly in millimeters.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="treatment-options" className="mb-16 scroll-mt-24 border-t border-white/10 pt-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">5. Rebuilding Stability: Adjustments, Isometrics, & PRP</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              If your neck is unstable, stretching or standard rotary chiropractic adjustments can make the instability worse. 
              Stability requires a sequenced rehabilitation approach:
            </p>
            <ol className="list-decimal pl-6 space-y-4 text-muted mb-8">
              <li>
                <strong className="text-white">Precision Alignment:</strong> Light, non-rotational upper cervical techniques (Blair, NUCCA) to align C1 and C2.
              </li>
              <li>
                <strong className="text-white">Cervical Isometrics:</strong> Deep neck stabilizer strengthening (longus colli) to support joint coordinates.
              </li>
              <li>
                <strong className="text-white">Ligament Stiffening:</strong> If laxity is severe, regenerative therapies like prolotherapy or PRP (platelet-rich plasma) are used to encourage ligament thickening.
              </li>
            </ol>

            <div className="border border-accent/20 rounded-2xl p-8 bg-accent/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Need a testing roadmap?</h3>
                <p className="text-muted text-sm max-w-xl">
                  Learn exactly what tests to request from your practitioner to rule out upper neck mechanical pressure.
                </p>
              </div>
              <Button href="/testing-roadmap" size="lg" className="shrink-0">
                Map Neck Tests →
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
