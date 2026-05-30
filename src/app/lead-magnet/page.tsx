"use client";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";

export default function LeadMagnet() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[100dvh] flex flex-col justify-center py-32 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/textures/texture-2.png')", backgroundSize: "cover" }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          <div className="flex-1 w-full max-w-xl">
             <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-accent/5">
                <Image 
                  src="/marketing-assets/lead-magnet/cover.png"
                  alt="The First 30 Days Mold Detox Checklist Cover"
                  fill
                  className="object-cover"
                  priority
                />
             </div>
          </div>

          <div className="flex-1 w-full">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-6 block">
              Free Download
            </span>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6">
              The First 30 Days:<br />
              <span className="text-white/50">Mold Detox Checklist</span>
            </h1>
            
            <p className="text-lg text-muted mb-8 leading-relaxed">
              When I realized the house was making me sick, the amount of conflicting advice was paralyzing. 
              This is the exact checklist I used to start stabilizing my terrain, mapping my symptoms, and taking control back from the broken system.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "The immediate environmental changes to stop the exposure",
                "The 3 binders to prioritize (and what to avoid)",
                "How to map your symptom baseline objectively",
                "The exact questions to ask your practitioner"
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-black/50 border border-white/10 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full object-cover" preserveAspectRatio="none">
                  <use href="/svgs/animated/animated-overlays.svg#pulse-ring-animation" />
                </svg>
              </div>
              <h3 className="font-bold mb-4 relative z-10">Send it to my inbox</h3>
              <form className="flex flex-col sm:flex-row gap-4 relative z-10" onSubmit={(e) => {
                e.preventDefault();
                window.open('/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf', '_blank');
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 h-14 bg-zinc-900 border border-white/20 rounded-lg px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
                  required
                />
                <Button size="lg" className="h-14 rounded-lg">Download PDF</Button>
              </form>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 relative z-10">
                <p className="text-xs text-muted">10MB PDF. No spam, just proof.</p>
                <a 
                  href="/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-accent hover:underline font-medium"
                >
                  Download Sample Pages
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
