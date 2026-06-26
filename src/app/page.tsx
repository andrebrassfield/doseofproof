"use client";
import { useEffect } from "react";
import Link from "next/link";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { RevealStagger, RevealItem } from "@/components/ui/RevealStagger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScanViewer } from "@/components/ui/ScanViewer";
import { DashboardPreview } from "@/components/ui/DashboardPreview";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { HomepageCapture } from "@/components/ui/HomepageCapture";
import { HeroScannerHud } from "@/components/ui/HeroScannerHud";

const commandCenterMetrics = [
  { label: "Root causes mapped", value: "3", detail: "CCI, mold, mast cells" },
  { label: "Primary signal", value: "C1-C2", detail: "mechanical irritation" },
  { label: "Current phase", value: "Rebuild", detail: "stabilize before scale" },
];

const commandCenterTracks = [
  {
    title: "Structural correction",
    body: "Upper cervical work, curve restoration, posture constraints, and post-adjustment signal tracking.",
    icon: "spine-neck",
    status: "Active",
  },
  {
    title: "Immune load reduction",
    body: "Mold exposure history, mycotoxin testing, MCAS patterns, histamine load, and detox tolerance.",
    icon: "inflammation-flame",
    status: "Sequencing",
  },
  {
    title: "Nervous-system output",
    body: "HRV, sleep, symptom logs, vagal tone work, and what actually moves the recovery trend.",
    icon: "heart-rate-vagal",
    status: "Tracked",
  },
];

const proofPathways = [
  {
    href: "/start-here",
    title: "Start Here",
    body: "The origin story, scans, timeline, and what Dose of Proof is actually building.",
    image: "/marketing-assets/images/personal-proof/combined-scans.png",
    icon: "scan-line",
  },
  {
    href: "/testing-roadmap",
    title: "Testing Roadmap",
    body: "The missing tests doctors rarely order when basic labs come back normal.",
    image: "/marketing-assets/images/doctors-miss-series/cirs-mold-panel.png",
    icon: "test-tube",
  },
  {
    href: "/protocol-vault",
    title: "Protocol Vault",
    body: "The living operating system: what I am doing, tracking, changing, and monetizing.",
    image: "/marketing-assets/images/personal-proof/protocol-infographic-landscape.png",
    icon: "folder-structure",
  },
];

export default function Home() {
  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Animate X-ray scan — lock in place while text scrolls
        gsap.to('.scan-lock', {
          scrollTrigger: { trigger: '.scan-lock-container', start: 'top 20%', end: 'bottom bottom', scrub: true },
          y: -100,
          ease: 'none',
        });

        // Clinical diagram draw-on-scroll
        gsap.utils.toArray('svg path').forEach((path: any) => {
          try {
            const length = path.getTotalLength();
            gsap.fromTo(path,
              { strokeDasharray: length, strokeDashoffset: length },
              { strokeDashoffset: 0, scrollTrigger: { trigger: path, start: 'top 80%', scrub: 1 } }
            );
          } catch(e) {}
        });
      });
    })();
    return () => ctx?.revert();
  }, []);

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://doseofproof.com/#person",
        "name": "Andre Brassfield",
        "url": "https://doseofproof.com",
        "sameAs": [
          "https://x.com/andrebrassfield",
          "https://x.com/doseofproof"
        ],
        "jobTitle": "Health Optimization Researcher",
        "description": "Documenting the recovery terrain of CCI, MCAS, mold recovery, and evidence-backed health optimization."
      },
      {
        "@type": "WebSite",
        "@id": "https://doseofproof.com/#website",
        "url": "https://doseofproof.com",
        "name": "Dose of Proof",
        "publisher": { "@id": "https://doseofproof.com/#person" }
      },
      {
        "@type": "ItemList",
        "@id": "https://doseofproof.com/#proof-cards",
        "name": "Verified Personal Proof Cards",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "C1-C2 Instability (TyTron Scan Proof)",
            "description": "Confirmed craniocervical instability with TyTron paraspinal infrared scans showing vagus nerve irritation."
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "MCAS & Histamine Panel",
            "description": "Mast cell activation driven by structural failure and environmental toxins."
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "4 Years Hidden Mold Exposure",
            "description": "Lived in a hidden moldy house that overlapped with high mycotoxin burden."
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Loss of Cervical Curve (X-Ray Proof)",
            "description": "X-ray confirmed mechanical loss of normal curve, causing constant inflammatory guarding."
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* HERO SECTION — BADASS CLINICAL SCANNER (Brand Kit v2 / 2026-06-26)
            Two-column layout:
              • Left:  yellow mono caption, massive 4-line headline
                       (white → yellow second half), body copy, twin CTAs.
              • Right: <HeroScannerHud /> — DNA helix watermark (filtered yellow),
                       floating "INFLAMMATION -86%" / "VAGAL TONE +41%" callouts,
                       central PROOF plate, vertical ruler, corner brackets,
                       animated scanline.
        */}
        <section
          aria-labelledby="hero-headline"
          className="relative bg-background overflow-hidden border-b border-stone"
        >
          <div className="relative grid md:grid-cols-2 min-h-[100dvh]">
            {/* ── LEFT COLUMN: copy ───────────────────────────────────── */}
            <div className="relative flex flex-col justify-center px-6 lg:px-16 xl:px-20 pt-32 md:pt-0 max-w-2xl z-10">
              {/* Yellow mono caption */}
              <span className="dop-caption mb-8">
                Documenting The Recovery
              </span>

              {/* Massive 4-line headline — white, then yellow */}
              <h1
                id="hero-headline"
                className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(2.5rem,6vw,5.5rem)] mb-10"
              >
                <span className="block text-foreground">
                  Doctors told me I
                </span>
                <span className="block text-foreground">was fine.</span>
                <span className="block text-accent mt-2">
                  The scans told a
                </span>
                <span className="block text-accent">
                  different story.
                </span>
              </h1>

              {/* Body paragraph */}
              <p className="text-base md:text-lg text-foreground/90 max-w-[55ch] mb-10 leading-relaxed">
                I got tired of vague wellness advice and broken healthcare
                incentives. After 7 months of mystery symptoms, I stopped
                treating symptoms and started fixing the terrain. This is the
                proof file.
              </p>

              {/* Twin pill CTAs — yellow filled + yellow outlined */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/about"
                  size="lg"
                  className="font-mono uppercase tracking-widest text-xs"
                >
                  Read the Full Story
                </Button>
                <Button
                  href="/lead-magnet"
                  variant="secondary"
                  size="lg"
                  className="font-mono uppercase tracking-widest text-xs"
                >
                  Download 30-Day Checklist
                </Button>
              </div>

              {/* Micro-credential strip */}
              <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] md:text-xs font-mono uppercase tracking-widest text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Verified by TyTron + Lateral X-Ray
                </span>
                <span className="text-stone">|</span>
                <span>7+ months · Subject #001</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: scanner HUD ───────────────────────────── */}
            <div className="relative md:border-l border-stone min-h-[60vh] md:min-h-[100dvh]">
              <HeroScannerHud />
            </div>
          </div>

          {/* Soft fade at the bottom for transition into next section */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none z-10"
          />
        </section>

        {/* THE PROOF SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/marketing-assets/images/hero/section-the-proof-1920x600.png"
              alt="Section The Proof Background"
              fill
              sizes="100vw"
              className="object-cover opacity-[0.08] mix-blend-luminosity grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6">
              <div>
                <span className="dop-caption mb-3 block">Section 01 — Evidence</span>
                <h2 className="dop-poster-headline text-5xl md:text-7xl mb-4">The Proof.</h2>
                <p className="text-muted max-w-2xl">
                  Not just how I feel. The actual, verified data showing mechanical failure and toxic burden.
                </p>
              </div>
              <span className="dop-yellow-box text-xs">Verified</span>
            </div>

            <BentoGrid>
              <BentoGridItem
                title="C1-C2 Instability"
                description="Confirmed craniocervical instability with TyTron paraspinal infrared scans. The upper neck was irritating the vagus nerve."
                icon={<BrandIcon id="scan-line" className="w-6 h-6 text-accent" />}
                className="md:col-span-2 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-black rounded-lg relative overflow-hidden border border-stone">
                      <Image src="/marketing-assets/scans/tytron-scan.png" alt="TyTron Scan Proof" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
              <BentoGridItem
                title="MCAS & Histamine"
                description="Mast cell activation driven by structural failure and mold. The body's inflammation brake was broken."
                icon={<BrandIcon id="inflammation-flame" className="w-6 h-6 text-accent" />}
                className="md:col-span-1 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-black rounded-lg relative overflow-hidden border border-stone">
                      <Image src="/marketing-assets/images/proof-cards/proof-inflammation-chart-1080x1080.png" alt="Inflammation Chart" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
              <BentoGridItem
                title="4 Years Hidden Mold"
                description="Lived in a hidden moldy house that overlapped with my father's stage 4 lung cancer diagnosis."
                icon={<BrandIcon id="brain-circuit" className="w-6 h-6 text-accent" />}
                className="md:col-span-1 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-black rounded-lg relative overflow-hidden border border-stone">
                      <Image src="/marketing-assets/images/proof-cards/proof-mycotoxin-card-1080x1080.png" alt="Mycotoxin Test Result" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
              <BentoGridItem
                title="Loss of Cervical Curve"
                description="X-ray confirmed mechanical loss of normal curve, causing constant downstream inflammatory signals."
                icon={<BrandIcon id="spine-neck" className="w-6 h-6 text-accent" />}
                className="md:col-span-2 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-black rounded-lg relative overflow-hidden border border-stone">
                      <Image src="/marketing-assets/scans/lateral-xray.jpg" alt="Lateral Cervical X-Ray" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
            </BentoGrid>
          </div>
        </section>

        {/* INTERACTIVE SCAN EXPLORER */}
        <section className="py-12 px-6 lg:px-12 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center md:text-left">
              <span className="dop-caption mb-3 block">
                Interactive Biological Data
              </span>
              <h2 className="dop-poster-headline text-4xl md:text-6xl mb-3">Explore the paraspinal thermal scan</h2>
              <p className="text-muted text-sm mt-2 max-w-xl">
                Hover or click coordinates on the TyTron infrared scan to view paraspinal thermographic values and vagal nervous system signals.
              </p>
            </div>
            <ScanViewer
              imageSrc="/marketing-assets/scans/tytron-scan.png"
              altText="TyTron Paraspinal Thermography Scan"
              hotspots={[
                {
                  id: "vagus-nerve-base",
                  top: "25%",
                  left: "50%",
                  title: "Vagus Nerve Base (CN X)",
                  description: "Irritation at the occipitoatlantal junction blocks anti-inflammatory vagal signaling."
                },
                {
                  id: "thermal-asymmetry",
                  top: "60%",
                  left: "45%",
                  title: "Asymmetric Temperature Spikes",
                  description: "A thermal differential of 1.4°C indicates severe paraspinal autonomic guarding."
                },
                {
                  id: "c1-c2-displacement",
                  top: "40%",
                  left: "55%",
                  title: "C1-C2 Translation",
                  description: "Rotated atlas axis vertebra creates chronic pressure on the adjacent neurovascular structures."
                }
              ]}
            />
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-surface border-y border-stone scan-lock-container">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="dop-caption mb-4 block">Section 02 — Mechanism</span>
              <h2 className="dop-poster-headline text-4xl md:text-6xl mb-6">The natural brake was broken.</h2>
              <RevealStagger className="space-y-6 text-muted">
                <RevealItem>
                  <p>When the upper neck (C1-C2) irritates the vagus nerve, it knocks out the body's natural parasympathetic brake on inflammation.</p>
                </RevealItem>
                <RevealItem>
                  <p>Add 4 years of toxic mold exposure and suspected hEDS ligament laxity, and you get a body constantly guarding with knots and trigger points.</p>
                </RevealItem>
                <RevealItem>
                  <p>Doctors treat the individual symptoms. I had to fix the mechanical and environmental root cause.</p>
                </RevealItem>
              </RevealStagger>
            </div>
            <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden border border-stone bg-black/50 scan-lock sticky top-[20%]">
              <Image
                src="/marketing-assets/scans/ap-xray.jpg"
                alt="A-P Cervical X-Ray Mechanism Diagram"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
              />
            </div>
          </div>
        </section>

        {/* RECOVERY COMMAND CENTER */}
        <section id="recovery-command-center" className="py-24 px-6 lg:px-12 bg-background relative overflow-hidden border-b border-stone scroll-mt-24">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/images/textures/texture-dot-grid-1080x1080.png')", backgroundSize: "cover" }} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-end mb-12">
              <div>
                <span className="dop-caption mb-6 block">
                  Recovery Command Center
                </span>
                <h2 className="dop-poster-headline text-4xl md:text-6xl leading-[1.05] mb-6">
                  The protocol is not a stack.
                  <span className="block text-muted">It is a control system.</span>
                </h2>
              </div>
              <p className="text-lg text-muted leading-relaxed max-w-2xl lg:ml-auto">
                Every intervention has to answer one question: did it move the signal? This is the operating layer behind Dose of Proof: root cause, current action, tracked output, and next decision.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch">
              <DashboardPreview />

              <div className="grid gap-4">
                {commandCenterTracks.map((track) => (
                  <div key={track.title} className="group border border-stone rounded-2xl bg-surface p-6 hover:border-accent transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full border border-stone bg-surface-2 flex items-center justify-center text-accent group-hover:border-accent/60 transition-colors">
                        <BrandIcon id={track.icon} className="w-6 h-6" />
                      </div>
                      <span className="rounded-full border border-accent/40 bg-accent-muted px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-accent">
                        {track.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">{track.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{track.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-2 border-accent rounded-2xl bg-accent-muted p-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Want the actual operating system?</h3>
                <p className="text-sm text-muted max-w-2xl">
                  The full vault turns this homepage snapshot into a living map of tests, interventions, products, and weekly changes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button href="/protocol-vault" className="w-full sm:w-auto">
                  Open Protocol Vault
                </Button>
                <Button href="/testing-roadmap" variant="secondary" className="w-full sm:w-auto">
                  Map the Tests
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF PATHWAYS */}
        <section id="proof-pathways" className="py-24 px-6 lg:px-12 bg-surface scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="dop-caption mb-5 block">
                  Choose Your Entry Point
                </span>
                <h2 className="dop-poster-headline text-4xl md:text-5xl">
                  Follow the proof by what you need next.
                </h2>
              </div>
              <p className="text-muted max-w-xl">
                Story builds trust. Testing creates clarity. The vault turns clarity into a repeatable recovery engine.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              {proofPathways.map((path) => (
                <Link key={path.href} href={path.href} className="group border border-stone rounded-2xl overflow-hidden bg-background hover:border-accent transition-colors">
                  <div className="relative aspect-[16/10] bg-surface-2">
                    <Image
                      src={path.image}
                      alt={`${path.title} preview`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <BrandIcon id={path.icon} className="w-6 h-6 text-accent mb-6" />
                    <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">{path.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{path.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <span className="dop-caption mb-4 block text-center">Section 03 — Reality</span>
            <h2 className="dop-poster-headline text-4xl md:text-6xl text-center mb-16">The Reality of the Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "I had to stop Adderall because the brain fog was so thick I couldn't think straight.",
                "Burning pain in my face, neck, back, shoulders, stomach, and hips — and doctors kept telling me I was fine.",
                "Mold didn't just make me sick. It cost me years with my dad.",
              ].map((quote, i) => (
                <div key={i} className="p-8 border border-stone rounded-xl bg-surface flex flex-col justify-between">
                  <p className="text-lg text-white/90 italic mb-6">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center font-bold text-accent">D</div>
                    <div className="text-sm">
                      <p className="font-bold">Dre</p>
                      <p className="text-muted">Dose of Proof</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD MAGNET CTA SECTION */}
        <section className="py-32 px-6 lg:px-12 bg-surface border-t border-stone relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/images/textures/texture-dot-grid-1080x1080.png')", backgroundSize: "cover" }} />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="dop-yellow-box mb-6">Free PDF</span>
            <h2 className="dop-poster-headline text-4xl md:text-7xl mt-6 mb-6">The First 30 Days</h2>
            <p className="text-xl text-muted mb-10">
              Get the exact checklist I used to start stabilizing my terrain, mapping my symptoms, and taking control back from the broken system.
            </p>
            <Button href="/lead-magnet" size="lg">Get the Free Checklist</Button>
            <p className="text-xs text-muted mt-6 font-mono uppercase tracking-widest">No spam. Just proof.</p>
          </div>
        </section>

        {/* TRUST SIGNALS & DISCLAIMER */}
        <section className="py-16 px-6 lg:px-12 bg-background border-t border-stone relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center">

            <p className="dop-caption mb-8">Published &amp; Featured On</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="font-serif text-xl font-bold tracking-tight">Health Optimizers</div>
              <div className="font-sans text-xl font-black tracking-tighter">THE ROOT CAUSE</div>
              <div className="font-mono text-lg font-bold tracking-wider">VAGUS NERVE INST</div>
            </div>

            <div className="mt-24 pt-8 border-t border-stone text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-proof-red/10 text-proof-red mb-4">
                <BrandIcon id="warning" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Medical Disclaimer</h3>
              <p className="text-sm text-muted">
                This website documents my personal experience. I am not a doctor. The information, protocols, and timelines shared here are not medical advice and are not intended to diagnose, treat, cure, or prevent any disease. Always consult your physician or a qualified healthcare provider before starting any new treatment or making changes to your health regimen.
              </p>
            </div>

          </div>
        </section>
      </main>
      <HomepageCapture variant="inline" />
      <ExitIntentPopup />
      <Footer />
    </>
  );
}
