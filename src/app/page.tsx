"use client";
import { useEffect, useState } from "react";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalPan } from "@/components/ui/HorizontalPan";
import { RevealStagger, RevealItem } from "@/components/ui/RevealStagger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIcon } from "@/components/ui/BrandIcon";

export default function Home() {
  const [heroVariant, setHeroVariant] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setHeroVariant(searchParams.get("hero"));
    }
    
    let ctx: any;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Animate proof cards on scroll
        gsap.utils.toArray('.proof-card').forEach((card: any) => {
          gsap.fromTo(card, 
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0,
              scrollTrigger: { trigger: card, start: 'top 85%', scrub: 1 },
            }
          );
        });

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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="min-h-[100dvh] flex flex-col md:flex-row relative">
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pt-24 md:pt-0 max-w-4xl z-10">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-8">
              Documenting The Recovery
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.1] mb-6">
              {heroVariant === "B" ? (
                <>
                  The body has a natural inflammation brake.<br />
                  <span className="text-white/50">Mine was broken at C1-C2.</span>
                </>
              ) : (
                <>
                  Doctors told me I was fine.<br />
                  <span className="text-white/50">The scans told a different story.</span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted max-w-[65ch] mb-10 leading-relaxed">
              I got tired of vague wellness advice and broken healthcare incentives. 
              After 7 months of mystery symptoms, I stopped treating symptoms and started fixing the terrain. 
              This is my protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/about" size="lg">Read the Full Story</Button>
              <Button href="/lead-magnet" variant="secondary" size="lg">Download 30-Day Checklist</Button>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900/50 relative overflow-hidden hidden md:block border-l border-white/5">
             <div className="absolute inset-0 pointer-events-none z-20">
                <svg className="w-full h-full text-accent/20" preserveAspectRatio="none">
                  <use href="/svgs/decorative/decorative-elements.svg#corner-brackets-tl" />
                </svg>
             </div>
             <div className="absolute inset-0 pointer-events-none z-20 scan-line-bg" />
             <Image 
               src="/marketing-assets/scans/tytron-scan.png"
               alt="TyTron Paraspinal infrared scan"
               fill
               className="object-cover opacity-80 mix-blend-luminosity grayscale"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
          </div>
        </section>

        {/* THE PROOF SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl tracking-tighter mb-4">The Proof.</h2>
              <p className="text-muted max-w-2xl">Not just how I feel. The actual, verified data showing mechanical failure and toxic burden.</p>
            </div>
            
            <BentoGrid>
              <BentoGridItem 
                title="C1-C2 Instability"
                description="Confirmed craniocervical instability with TyTron paraspinal infrared scans. The upper neck was irritating the vagus nerve."
                icon={<BrandIcon id="scan-line" className="w-6 h-6 text-accent" />}
                className="md:col-span-2 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-zinc-900/50 rounded-lg relative overflow-hidden border border-white/5">
                     <Image src="/marketing-assets/scans/tytron-scan.png" alt="TyTron Scan Proof" fill className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
              <BentoGridItem 
                title="MCAS & Histamine"
                description="Mast cell activation driven by structural failure and mold. The body's inflammation brake was broken."
                icon={<BrandIcon id="inflammation-flame" className="w-6 h-6 text-accent" />}
                className="md:col-span-1 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-zinc-900/50 rounded-lg relative overflow-hidden border border-white/5">
                     <Image src="/marketing-assets/images/proof-cards/proof-inflammation-chart-1080x1080.png" alt="Inflammation Chart" fill className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
              <BentoGridItem 
                title="4 Years Hidden Mold"
                description="Lived in a hidden moldy house that overlapped with my father's stage 4 lung cancer diagnosis."
                icon={<BrandIcon id="brain-circuit" className="w-6 h-6 text-accent" />}
                className="md:col-span-1 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-zinc-900/50 rounded-lg relative overflow-hidden border border-white/5">
                     <Image src="/marketing-assets/images/proof-cards/proof-mycotoxin-card-1080x1080.png" alt="Mycotoxin Test Result" fill className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
              <BentoGridItem 
                title="Loss of Cervical Curve"
                description="X-ray confirmed mechanical loss of normal curve, causing constant downstream inflammatory signals."
                icon={<BrandIcon id="spine-neck" className="w-6 h-6 text-accent" />}
                className="md:col-span-2 min-h-[300px]"
                header={
                  <div className="flex-1 w-full h-full min-h-[150px] bg-zinc-900/50 rounded-lg relative overflow-hidden border border-white/5">
                     <Image src="/marketing-assets/scans/lateral-xray.jpg" alt="Lateral Cervical X-Ray" fill className="object-cover object-top opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700" />
                  </div>
                }
              />
            </BentoGrid>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        {/* THE PROBLEM SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-zinc-950 border-y border-white/5 scan-lock-container">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl tracking-tighter mb-6">The natural brake was broken.</h2>
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
            <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 scan-lock sticky top-[20%]">
              <Image 
                src="/marketing-assets/scans/ap-xray.jpg"
                alt="A-P Cervical X-Ray Mechanism Diagram"
                fill
                className="object-cover object-center opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
              />
            </div>
          </div>
        </section>

        {/* THE PROTOCOL SECTION */}
        <div className="bg-background pt-24 pb-12">
          <div className="px-6 lg:px-12 max-w-7xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl tracking-tighter">My Current Protocol.</h2>
          </div>
        </div>
        
        <HorizontalPan>
          <div className="flex gap-8 px-6 lg:px-12 pb-24 h-[60dvh] items-center">
            <div className="w-[85vw] md:w-[600px] h-full bg-zinc-900/30 border border-white/5 rounded-2xl p-8 flex flex-col shrink-0 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" viewBox="0 0 1000 600">
                <use href="/svgs/diagrams/clinical-diagrams.svg#vagal-pathway" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-bold tracking-tight mb-2">The Systemic View</h3>
                <p className="text-muted">Treating the vagus nerve and upper cervical spine to restore the autonomic nervous system.</p>
              </div>
            </div>
            {[
              {
                title: "Blair Upper Cervical",
                desc: "Precise adjustments by Dr. Jackson Chism to fix the mechanical root cause.",
                iconId: "firstaid",
                image: "/marketing-assets/images/personal-proof/cervical-xray.png"
              },
              {
                title: "Vagal Tone Work",
                desc: "Restoring the parasympathetic brake to calm the autonomic chaos.",
                iconId: "vagus",
                image: "/marketing-assets/images/proof-cards/proof-vagal-tone-1080x1080.png"
              },
              {
                title: "TOS Stretches",
                desc: "Gentle thoracic outlet stretches to reduce stress.",
                iconId: "thoracic",
                image: "/marketing-assets/images/proof-cards/proof-recovery-timeline-1080x1080.png"
              },
              {
                title: "Minerals & NAD+",
                desc: "Terrain stabilization and cellular redox support.",
                iconId: "capsule",
                image: "/marketing-assets/images/proof-cards/proof-protocol-stack-1080x1080.png"
              },
              {
                title: "Hydroxyzine",
                desc: "Managing the anxiety and MCAS overlap while the root heals.",
                iconId: "pill",
                image: "/marketing-assets/images/protocol-teardown/standard-anxiety-protocol.png"
              },
            ].map((item, i) => (
              <div key={i} className="proof-card w-[85vw] md:w-[400px] h-full bg-zinc-900/30 border border-white/5 rounded-2xl p-6 flex flex-col shrink-0 group hover:border-white/20 transition-colors">
                <div className="relative w-full aspect-[16/10] bg-zinc-950 rounded-xl overflow-hidden mb-6 border border-white/5">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700" 
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:text-accent group-hover:border-accent/30 transition-colors">
                    <BrandIcon id={item.iconId} className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </HorizontalPan>

        {/* SOCIAL PROOF SECTION */}
        <section className="py-24 px-6 lg:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl tracking-tighter text-center mb-16">The Reality of the Journey</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "I had to stop Adderall because the brain fog was so thick I couldn't think straight.",
                "Burning pain in my face, neck, back, shoulders, stomach, and hips — and doctors kept telling me I was fine.",
                "Mold didn't just make me sick. It cost me years with my dad.",
              ].map((quote, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-xl bg-zinc-950/50 flex flex-col justify-between">
                  <p className="text-lg text-white/90 italic mb-6">"{quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-accent">D</div>
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
        <section className="py-32 px-6 lg:px-12 bg-zinc-900 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/images/textures/texture-dot-grid-1080x1080.png')", backgroundSize: "cover" }} />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <BrandIcon id="check" className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl tracking-tighter mb-6">The First 30 Days</h2>
            <p className="text-xl text-muted mb-10">
              Get the exact checklist I used to start stabilizing my terrain, mapping my symptoms, and taking control back from the broken system.
            </p>
            <Button href="/lead-magnet" size="lg">Get the Free Checklist</Button>
            <p className="text-xs text-muted mt-6">Free PDF download. No spam, just proof.</p>
          </div>
        </section>

        {/* TRUST SIGNALS & DISCLAIMER */}
        <section className="py-16 px-6 lg:px-12 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            
            <p className="text-sm font-bold tracking-widest text-white/40 uppercase mb-8">Published & Featured On</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="font-serif text-xl font-bold tracking-tight">Health Optimizers</div>
              <div className="font-sans text-xl font-black tracking-tighter">THE ROOT CAUSE</div>
              <div className="font-mono text-lg font-bold tracking-wider">VAGUS NERVE INST</div>
            </div>

            <div className="mt-24 pt-8 border-t border-white/10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-red-500/10 text-red-500 mb-4">
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
      <Footer />
    </>
  );
}
