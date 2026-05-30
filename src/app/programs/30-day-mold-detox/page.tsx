import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LemonsqueezyEmbed } from "@/components/ui/LemonsqueezyEmbed";
import { BrandIcon } from "@/components/ui/BrandIcon";

export default function MoldDetoxProgram() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              4-Week Intensive Protocol
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white font-bold">
              30-Day Mold Detox
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              The exact sequence of operations to open your drainage pathways, stabilize the terrain, and safely bind mycotoxins without crashing your system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold tracking-tight mb-6">Course Overview</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-sm">1</div>
                  <div>
                    <strong className="text-white block mb-1">Week 1: The Terrain</strong>
                    <span className="text-muted text-sm">Hydration, minerals, and opening the drainage pathways. Do not skip this.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-sm">2</div>
                  <div>
                    <strong className="text-white block mb-1">Week 2: Nervous System</strong>
                    <span className="text-muted text-sm">Calming the vagus nerve and limbic system so the body feels safe enough to detox.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-sm">3</div>
                  <div>
                    <strong className="text-white block mb-1">Week 3: Gentle Binders</strong>
                    <span className="text-muted text-sm">Introducing targeted binders to pull mycotoxins from the gut without recirculating them.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-sm">4</div>
                  <div>
                    <strong className="text-white block mb-1">Week 4: Cellular Support</strong>
                    <span className="text-muted text-sm">Glutathione, NAD+, and mitochondrial repair to rebuild the damage.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold tracking-tight mb-4">What's Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent" />
                    4 Video Modules (Over 2 hours)
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent" />
                    Supplement Protocol Cheat Sheet
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent" />
                    The "Herxheimer Relief" Protocol
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <BrandIcon id="check" className="w-5 h-5 text-accent" />
                    Lifetime Access
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900 border border-accent/20 rounded-2xl p-8 text-center mt-auto shadow-lg shadow-accent/5">
                <div className="text-4xl font-bold text-white mb-2">$197</div>
                <p className="text-sm text-muted mb-6">One-time payment.</p>
                <LemonsqueezyEmbed 
                  url="https://app.lemonsqueezy.com/checkout/buy/PLACEHOLDER-30-day-course" 
                  label="Enroll Now"
                  className="inline-flex w-full items-center justify-center h-14 px-8 text-lg font-medium text-black bg-white rounded-lg hover:bg-accent transition-colors"
                />
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
