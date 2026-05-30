import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";

export default function WorkWithMePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white font-bold">
              1-on-1 Consulting
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              I am not a doctor. I am a researcher who spent 4 years and 6 figures mapping the exact terrain of complex chronic illness, so you don't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Strategy Session</h3>
              <div className="text-3xl font-bold text-accent mb-6">$297 <span className="text-sm text-muted font-normal">/ 60 minutes</span></div>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-muted">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Deep dive into your current labs and protocols.
                </li>
                <li className="flex items-start gap-3 text-muted">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Identify the "missing tests" your doctor didn't run.
                </li>
                <li className="flex items-start gap-3 text-muted">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Sequence of operations (what to fix first).
                </li>
              </ul>
              
              <Link 
                href="/intake" 
                className="w-full h-12 flex items-center justify-center bg-white text-black font-bold rounded-lg hover:bg-accent transition-colors"
              >
                Apply for a Session
              </Link>
            </div>

            <div className="bg-zinc-900 border border-accent/20 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full object-cover" preserveAspectRatio="none">
                  <use href="/svgs/animated/animated-overlays.svg#pulse-ring-animation" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Ongoing Guidance</h3>
                <div className="text-3xl font-bold text-accent mb-6">$97 <span className="text-sm text-muted font-normal">/ month</span></div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    Direct email access to me.
                  </li>
                  <li className="flex items-start gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    Monthly protocol reviews.
                  </li>
                  <li className="flex items-start gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    Accountability and course correction.
                  </li>
                </ul>
                
                <Link 
                  href="/intake" 
                  className="w-full h-12 flex items-center justify-center bg-accent text-black font-bold rounded-lg hover:bg-white transition-colors"
                >
                  Apply for Guidance
                </Link>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-center">
            <h2 className="text-2xl tracking-tight mb-4 text-white font-bold border-t border-white/10 pt-16">Disclaimer</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Due to demand and my own ongoing recovery, I only take on a select number of clients per month. 
              Filling out the intake form does not guarantee a session. If I don't think I can help you based on your intake form, I will tell you directly and point you to someone who can.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
