import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.1] mb-6">
              I have a philosophy degree and a philosophy about health.
            </h1>
            <p className="text-2xl text-accent font-serif italic mb-8">
              "Don't tell me what to do with my body. Show me the proof."
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1 space-y-8 text-lg text-muted leading-relaxed max-w-[65ch]">
              <p>
                My name is Dre. I'm 30 years old with a philosophy degree and a deep love for Stoicism. For most of my life I thought I was handling things pretty well — until the last seven months broke me wide open.
              </p>
              
              <p>
                It started subtly and then hit like a freight train. Flushing episodes that came out of nowhere. Heat sensitivity so bad I couldn't function in normal temperatures. Widespread inflammation and deep, burning pain in my face, neck, back, shoulders, stomach, and hips. 
                My skin would literally feel like it was "stuck" and bunching up, forcing my body to subconsciously guard with knots and trigger points everywhere. 
                Brain fog so thick I had to stop taking Adderall. Crushing anxiety that became the loudest symptom of all.
              </p>

              <div className="w-full h-1 mt-12 mb-8 text-accent/50">
                <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#line-accent" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold tracking-tight">
                Doctors told me I was fine. The scans told a different story.
              </h2>

              <p>
                I was slowly disappearing from my own life — distant from friends, struggling to think straight, barely functioning as a human being, let alone a good friend or son.
              </p>

              <p>
                Then the pieces started connecting. X-rays and TyTron paraspinal infrared scans confirmed craniocervical instability (CCI) at C1-C2 with loss of normal cervical curve. The upper neck is irritating my vagus nerve, knocking out the body's natural brake on inflammation. 
              </p>

              <div className="my-10 relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900/50 border border-white/10">
                <svg className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80" viewBox="0 0 1000 600">
                  <use href="/svgs/diagrams/clinical-diagrams.svg#cci-anatomy" />
                </svg>
              </div>

              <p>
                Suspected hypermobile Ehlers-Danlos Syndrome (hEDS) explains the ligament laxity allowing all this chaos. On top of that, MCAS-like mast cell activation — histamine, leukotrienes, and constant downstream inflammatory signals — amplified by years of living in a toxic moldy house.
              </p>

              <div className="my-10 relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900/50 border border-white/10">
                <svg className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80" viewBox="0 0 1000 600">
                  <use href="/svgs/diagrams/clinical-diagrams.svg#mold-mechanism" />
                </svg>
              </div>

              <div className="w-full h-1 mt-12 mb-8 text-accent/50">
                <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#line-accent" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold tracking-tight">
                Mold didn't just make me sick. It cost me years with my dad.
              </h2>

              <p>
                That mold exposure overlapped with my dad's final years. He quit smoking the day I was born and stayed clean for 21 years. We lived in the same house with hidden mold for about four years before he was diagnosed with stage 4 lung cancer in August 2018 and passed in November. The terrain was unstable long before I felt it in my own body.
              </p>

              <p>
                I've been through the medical gaslighting, the fragmented "treat one symptom at a time" approach, and the mental toll of watching my body turn against itself while trying to stay stoic. I've felt the isolation of canceling plans, slow replies, and the guilt of not showing up for people I care about.
              </p>

              <div className="w-full h-1 mt-12 mb-8 text-accent/50">
                <svg className="w-full h-full" preserveAspectRatio="none" fill="currentColor">
                  <use href="/svgs/decorative/decorative-elements.svg#line-accent" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold tracking-tight">
                I'm not selling a cure. I'm documenting what actually worked.
              </h2>

              <p>
                I finally found the right specialists. I'm working with Dr. Jackson Chism (Blair upper cervical) — we have the scans, the X-rays, and the data. I'm starting precise adjustments. I've built a custom health tracking system. I'm dialing in vagal tone work, gentle TOS stretches, minerals, redox support (NAD+), and terrain stabilization instead of just chasing mediators with meds (though Hydroxyzine has been helpful for the anxiety/MCAS overlap).
              </p>

              <p>
                This isn't a polished "healing journey." It's ugly, expensive, frustrating, and slow. But it's real. I'm attacking the upstream mechanical and environmental drivers instead of managing symptoms forever.
              </p>

              <p>
                Dose of Proof exists because I got tired of vague wellness advice and broken healthcare incentives. I'm done accepting partial answers. This brand is my proof — and hopefully yours — that when you map the actual terrain (structure, nervous system, mast cells, mold, connective tissue), real progress becomes possible.
              </p>

              <div className="bg-white/5 border border-white/10 p-8 rounded-xl mt-12">
                <p className="text-white text-xl italic mb-4">
                  If you're in the same hell — mysterious symptoms, chronic pain, autonomic chaos, or just tired of being dismissed — you're not alone.
                </p>
                <p className="text-accent font-bold">Welcome to Dose of Proof.</p>
              </div>

            </div>

            <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
               <div className="relative aspect-square rounded-xl overflow-hidden grayscale contrast-125 bg-white/5 border border-white/10">
                 <Image src="/marketing-assets/scans/tytron-scan.png" alt="Dre's TyTron Scan" fill className="object-cover opacity-80" />
               </div>
               <div className="relative aspect-square rounded-xl overflow-hidden grayscale contrast-125 bg-white/5 border border-white/10">
                 <Image src="/marketing-assets/scans/lateral-xray.jpg" alt="Dre's X-ray" fill className="object-cover object-top opacity-80" />
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
