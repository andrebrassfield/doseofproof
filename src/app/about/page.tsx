"use client";

import { SafeImage as Image } from "@/components/ui/SafeImage";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function About() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Failed to submit.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-zinc-950">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.1] mb-6">
              The Hell That Built Dose of Proof
            </h1>
            <p className="text-2xl text-accent font-serif italic mb-8">
              "Don't tell me what to do with my body. Show me the proof."
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1 space-y-8 text-lg text-muted leading-relaxed max-w-[65ch]">
              <p>
                My name is Dre. I’m 30 years old, with a philosophy degree and a deep love for Stoicism. I spend my days architecting automated logistics systems and managing local-first fleets of software agents across the Northwest Arkansas and Oklahoma border. I know how to identify bottlenecks, secure infrastructure, and make complex systems communicate.
              </p>
              
              <p>
                For most of my life, I thought I was handling my own system pretty well. Until the last seven months broke me wide open.
              </p>

              <div className="space-y-4">
                <p>
                  It started subtly, then hit like a freight train. I found myself battling:
                </p>
                <ul className="space-y-3 pl-4 border-l border-accent/40 my-6">
                  <li className="flex items-start gap-2 text-white/90">
                    <span className="text-accent shrink-0 mt-1.5">•</span>
                    <span><strong>Flushing episodes</strong> that came out of nowhere.</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <span className="text-accent shrink-0 mt-1.5">•</span>
                    <span><strong>Heat sensitivity</strong> so severe I couldn’t function in normal temperatures.</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <span className="text-accent shrink-0 mt-1.5">•</span>
                    <span><strong>Widespread inflammation</strong> and deep, burning pain radiating through my face, neck, back, shoulders, stomach, and hips.</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <span className="text-accent shrink-0 mt-1.5">•</span>
                    <span><strong>Tight, "stuck" skin</strong> that forced my body to guard with severe muscle knots and trigger points.</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <span className="text-accent shrink-0 mt-1.5">•</span>
                    <span><strong>Thick brain fog</strong> so debilitating I had to stop taking Adderall.</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <span className="text-accent shrink-0 mt-1.5">•</span>
                    <span><strong>Crushing anxiety</strong> that became the loudest symptom of my daily life.</span>
                  </li>
                </ul>
              </div>

              <div className="w-full flex justify-center mt-12 mb-8 text-accent/50">
                <svg className="w-64 h-8" viewBox="0 50 400 40" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold tracking-tight">
                I was slowly disappearing.
              </h2>

              <p>
                I was pulling away from my wife, Madison, struggling to find the energy to even take our dog, Loki, outside, and barely holding together the backend of my business. I wasn't just losing my health; I was failing to show up for the people I loved most.
              </p>

              <p>
                Then, I stopped treating the symptoms and started auditing the system.
              </p>

              <p>
                X-rays and TyTron paraspinal infrared scans confirmed the structural root: <strong><Link href="/blogs/cci/craniocervical-instability-explained" className="text-white hover:text-accent underline transition-colors">craniocervical instability (CCI)</Link></strong> at C1-C2 with a complete loss of the normal cervical curve. My upper neck was physically compressing my <strong>vagus nerve</strong>, knocking out the body’s natural brake on inflammation—a process well-documented in clinical research on the cholinergic anti-inflammatory reflex (see <a href="https://pubmed.ncbi.nlm.nih.gov/12490958/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-mono text-sm">[Nature 2002]</a> and Hauser's work on cervical autonomic dysfunction <a href="https://pubmed.ncbi.nlm.nih.gov/25685246/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-mono text-sm">[Hauser et al., 2015]</a>). Suspected <strong><Link href="/blogs/protocols/doctors-miss-series" className="text-white hover:text-accent underline transition-colors">hypermobile Ehlers-Danlos Syndrome (hEDS)</Link></strong> explained the ligament laxity allowing all this mechanical chaos.
              </p>

              <div className="my-10 relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                <Image 
                  src="/marketing-assets/images/personal-proof/systemic-view-diagram.png"
                  alt="Systemic View of CCI Anatomy"
                  fill
                  className="object-cover opacity-90"
                />
              </div>

              <p>
                On top of the structural collapse, my environment had turned against me. I was experiencing <strong><Link href="/blogs/mcas/mcas-treatment-protocol-2026" className="text-white hover:text-accent underline transition-colors">mast cell activation (MCAS)</Link></strong>—a relentless cascade of histamine, leukotrienes, and downstream inflammatory signals—amplified by years of living in a toxic, moldy house.
              </p>

              <div className="my-10 relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                <Image 
                  src="/marketing-assets/images/personal-proof/mold-timeline-landscape.png"
                  alt="Mold Exposure Timeline"
                  fill
                  className="object-cover opacity-90"
                />
              </div>

              <div className="w-full flex justify-center mt-12 mb-8 text-accent/50">
                <svg className="w-64 h-8" viewBox="0 50 400 40" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold tracking-tight">
                Mold didn't just make me sick. It cost me years with my dad.
              </h2>

              <p>
                That mold exposure overlaps with the darkest chapter of my life. My dad quit smoking the day I was born and stayed clean for 21 years. We lived in that same house with hidden mold for about four years before he was diagnosed with stage 4 lung cancer in August 2018. He passed away that November. The terrain was fundamentally unstable long before I finally felt it break down in my own body.
              </p>

              <p>
                I’ve survived the medical gaslighting. I know the frustration of the fragmented, “treat one symptom at a time” model. I know the mental toll of trying to stay stoic while watching your own biology turn against you.
              </p>

              <div className="w-full flex justify-center mt-12 mb-8 text-accent/50">
                <svg className="w-64 h-8" viewBox="0 50 400 40" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#divider-horizontal" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold tracking-tight">
                But here’s the proof part:
              </h2>

              <p>
                I stopped outsourcing my health to a broken model and applied the exact same architecture I use for my logistics business to my own biology. I found the right specialists, like <strong><a href="https://chismchiropractic.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent underline transition-colors font-semibold">Dr. Jackson Chism</a></strong> for <strong><Link href="/blogs/cci/cci-upper-cervical-care" className="text-white hover:text-accent underline transition-colors">Blair upper cervical care</Link></strong> (an advanced, high-precision chiropractic framework represented by the <a href="https://www.blairchiropractic.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">Blair Chiropractic Society</a>). We aren't guessing—we have the scans, the X-rays, and the hard data. I am starting precise adjustments this week.
              </p>

              <p>
                I’ve built a proprietary, custom health-tracking database to monitor my inputs and outputs. I’m dialing in <strong><Link href="/blogs/protocols/vagus-nerve-exercises" className="text-white hover:text-accent underline transition-colors">vagal tone work</Link></strong>, <strong><Link href="/blogs/protocols/tos-stretches" className="text-white hover:text-accent underline transition-colors">gentle TOS stretches</Link></strong>, mineral balancing, <strong><Link href="/blogs/supplements/nad-supplement-guide" className="text-white hover:text-accent underline transition-colors">NAD+ redox support</Link></strong>, and terrain stabilization. I am no longer just chasing inflammatory mediators with medications—though Hydroxyzine has been a necessary tactical bridge for the anxiety and MCAS overlap. I am systematically attacking the upstream mechanical and environmental drivers.
              </p>

              <p>
                This isn’t a polished, aesthetic “healing journey.” It’s ugly, expensive, frustrating, and incredibly slow. But it is real.
              </p>

              <p>
                Dose of Proof exists because I got tired of vague wellness platitudes and misaligned healthcare incentives. I am done accepting partial answers. This brand is my proof—and hopefully yours—that when you accurately map the full terrain of your structure, your nervous system, and your environment, actual regeneration becomes possible.
              </p>

              <p>
                I’m sharing the raw data, the localized tracking protocols, the failures, the wins, and the mindset required to keep engineering a solution when your body is screaming at you to quit.
              </p>

              <div className="bg-white/5 border border-white/10 p-8 rounded-xl mt-12">
                <p className="text-white text-xl italic mb-4">
                  If you’re trapped in the same hell—mysterious symptoms, chronic pain, autonomic chaos, or just exhausted from being dismissed by a system that doesn't understand you—you are no longer alone.
                </p>
                <p className="text-accent font-bold">Welcome to Dose of Proof.</p>
              </div>

              {/* Actionable CTAs */}
              <div className="mt-16 space-y-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/vault" size="lg" className="flex-1 text-center justify-center">
                    See My Current Protocol
                  </Button>
                  <Button href="/blogs" variant="secondary" size="lg" className="flex-1 text-center justify-center">
                    Browse the Research
                  </Button>
                </div>

                {/* Checklist Promo Card */}
                <div className="border border-white/10 p-8 rounded-2xl bg-black/40 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-white/20 shadow-lg bg-zinc-900">
                    <Image 
                      src="/marketing-assets/lead_magnet_card.png"
                      alt="Checklist Cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-white mb-2">Get the Terrain Mapping Checklist</h3>
                    <p className="text-muted text-sm mb-4 leading-relaxed">
                      Not sure where to start? Download the free 30-Day Mold Detox Checklist to see exactly what labs and scans I used to stabilize my environment and map my symptoms.
                    </p>
                    <Button href="/lead-magnet" size="sm">
                      Download Free Checklist
                    </Button>
                  </div>
                </div>

                {/* Newsletter Opt-in Block */}
                <div className="border border-accent/20 bg-accent/5 p-8 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full object-cover animate-pulse" preserveAspectRatio="none">
                      <use href="/svgs/animated/animated-overlays.svg#pulse-ring-animation" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10 text-center sm:text-left max-w-2xl">
                    <h3 className="text-xl font-bold text-white mb-2">Follow the Data</h3>
                    <p className="text-muted text-sm mb-6 leading-relaxed">
                      I don't have the cure, but I share exactly what the data shows is working for me every week. Follow the progress.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to follow the progress" 
                        className="flex-1 h-12 bg-zinc-900/80 border border-white/10 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm disabled:opacity-50"
                        required
                        disabled={loading || success}
                      />
                      <Button type="submit" disabled={loading || success} className="h-12 px-6">
                        {loading ? "Subscribing..." : success ? "Subscribed!" : "Subscribe"}
                      </Button>
                    </form>
                    {success && (
                      <p className="text-accent text-xs mt-3 font-semibold">Success! Check your inbox to confirm your subscription.</p>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
               <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black border border-white/10">
                 <Image src="/marketing-assets/images/personal-proof/combined-scans.png" alt="Combined Scans" fill className="object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-500" />
               </div>
               <p className="text-xs text-muted mb-4">
                 Actual scans and X-rays confirming C1-C2 craniocervical instability. The data tells the truth.
               </p>

               <div className="bg-zinc-950/80 border border-white/10 rounded-xl p-6 mt-4">
                 <h3 className="text-accent text-sm font-bold uppercase tracking-wider mb-4">Quick Facts</h3>
                 <ul className="space-y-4 text-sm text-white/90">
                   <li className="flex gap-3">
                     <span className="text-accent">•</span>
                     <span><strong>C1-C2 Instability</strong> (CCI)</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent">•</span>
                     <span><strong>4 Years</strong> living in hidden mold</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent">•</span>
                     <span><strong>7 Months</strong> of mystery illness</span>
                   </li>
                   <li className="flex gap-3">
                     <span className="text-accent">•</span>
                     <span><strong>May 20, 2026</strong> - The day the scans proved it</span>
                   </li>
                 </ul>
               </div>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
