"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";

export default function Content() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-[80dvh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 mt-16 text-center">
          The Vault
        </h1>
        <p className="text-xl text-muted max-w-2xl mb-16 text-center mx-auto">
          I am documenting my complete protocol, research breakdowns, and recovery timeline. 
          Real data, raw scans, and what actually worked.
        </p>

        <div className="max-w-7xl mx-auto w-full mb-24 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Featured Article */}
            <Link href="/about" className="md:col-span-2 group bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                <svg className="w-full h-full object-cover" preserveAspectRatio="none">
                  <use href="/svgs/animated/animated-overlays.svg#scan-line-animation" />
                </svg>
              </div>
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-end relative z-10 min-h-[300px]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">CCI</span>
                  <span className="text-muted text-sm">6 min read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                  Why Upper Cervical Care Is the Root Cause Nobody Talks About
                </h2>
                <p className="text-muted text-lg max-w-2xl">
                  When C1-C2 instability knocks out the vagus nerve, your parasympathetic brake fails. Here is the mechanical proof.
                </p>
                <div className="mt-8 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                  Read article <BrandIcon id="check" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>

            {/* Article 2 */}
            <Link href="/about" className="md:col-span-1 group bg-zinc-950/80 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Mold</span>
                <span className="text-muted text-sm">8 min read</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                The Mold-Cancer Connection: What the Terrain Theory Actually Predicts
              </h3>
              <p className="text-muted mb-auto">
                My father's stage 4 lung cancer diagnosis and the 4 years of hidden mold exposure we both shared.
              </p>
              <div className="mt-6 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                Read article
              </div>
            </Link>

            {/* Article 3 */}
            <Link href="/about" className="md:col-span-1 group bg-zinc-950/80 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Peptides</span>
                <span className="text-muted text-sm">10 min read</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                BPC-157 vs GHK-Cu: The Tissue Repair Protocol Breakdown
              </h3>
              <p className="text-muted mb-auto">
                Comparing the top regenerative peptides for healing ligament laxity and systemic inflammation.
              </p>
              <div className="mt-6 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                Read article
              </div>
            </Link>

            {/* Article 4 */}
            <Link href="/about" className="md:col-span-1 group bg-zinc-950/80 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Protocol</span>
                <span className="text-muted text-sm">5 min read</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                The Doctors Miss Series: 6 Tests That Would Have Changed Everything
              </h3>
              <p className="text-muted mb-auto">
                Standard blood panels are designed to find diseases, not dysfunction. Here are the tests that matter.
              </p>
              <div className="mt-6 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                Read article
              </div>
            </Link>

            {/* Article 5 */}
            <Link href="/about" className="md:col-span-1 group bg-zinc-950/80 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Protocol</span>
                <span className="text-muted text-sm">7 min read</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                My 30-Day Mold Detox: What Actually Worked
              </h3>
              <p className="text-muted mb-auto">
                Binders, saunas, and the sequence of operations for clearing mycotoxins without crashing your system.
              </p>
              <div className="mt-6 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                Read article
              </div>
            </Link>

          </div>
        </div>
        <div className="p-8 border border-white/10 rounded-xl bg-zinc-950/50 max-w-xl mx-auto w-full relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg className="w-full h-full object-cover" preserveAspectRatio="none">
               <use href="/svgs/decorative/decorative-elements.svg#noise-texture" />
             </svg>
           </div>
           <h2 className="text-2xl font-bold tracking-tight mb-4">Get notified</h2>
           <p className="text-sm text-muted mb-6">Join the list to get new research breakdowns as soon as they drop.</p>
           <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
             <input 
               type="email" 
               placeholder="Email address" 
               className="h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
               required
             />
             <button type="button" className="h-12 bg-white text-black font-medium rounded-md hover:bg-accent hover:text-black transition-colors">
               Subscribe
             </button>
           </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
