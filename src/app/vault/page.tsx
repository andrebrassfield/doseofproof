import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LemonsqueezyEmbed } from "@/components/ui/LemonsqueezyEmbed";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Link from "next/link";

export default function VaultPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white font-bold">
              The Vault
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              My complete database of research, protocols, and raw data. Access the exact frameworks I used to rebuild my terrain.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Free Tier */}
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Free Access</h3>
              <div className="text-4xl font-bold text-white mb-6">$0</div>
              <p className="text-sm text-muted mb-8">
                The essentials to start your research and understand the terrain model.
              </p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-white/80">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  3 Foundational Protocols
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  The 30-Day Mold Detox PDF
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Newsletter Access
                </li>
              </ul>
              
              <Link 
                href="/content" 
                className="w-full h-12 flex items-center justify-center bg-zinc-900 border border-white/20 text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors mt-auto"
              >
                Read Free Articles
              </Link>
            </div>

            {/* Monthly Tier */}
            <div className="bg-zinc-900 border-2 border-accent rounded-2xl p-8 flex flex-col relative shadow-2xl shadow-accent/5 lg:-mt-4 lg:-mb-4 z-10">
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="absolute top-0 right-0 bg-accent text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">Full Access</h3>
              <div className="text-4xl font-bold text-accent mb-6">$19 <span className="text-sm text-muted font-normal">/ month</span></div>
              <p className="text-sm text-muted mb-8">
                Everything you need to execute the protocol and stay updated on the latest research.
              </p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-white">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <strong>Complete Article Vault</strong>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Private Discord Community
                </li>
                <li className="flex items-start gap-3 text-white">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Monthly Live Q&A Sessions
                </li>
                <li className="flex items-start gap-3 text-white">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Raw Lab & Scan Breakdowns
                </li>
              </ul>
              
              <LemonsqueezyEmbed 
                url="https://doseofproof.lemonsqueezy.com/checkout/buy/placeholder-monthly" 
                label="Subscribe Monthly"
                className="w-full h-14 flex items-center justify-center bg-accent text-black font-bold rounded-lg hover:bg-white transition-colors mt-auto text-lg"
              />
            </div>

            {/* Annual Tier */}
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Annual</h3>
              <div className="text-4xl font-bold text-white mb-6">$177 <span className="text-sm text-muted font-normal">/ year</span></div>
              <p className="text-sm text-muted mb-8">
                For those committed to the long-term rebuild. Save 22%.
              </p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-white/80">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Everything in Full Access
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <strong>Early Access to New Courses</strong>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  2 Months Free
                </li>
              </ul>
              
              <LemonsqueezyEmbed 
                url="https://doseofproof.lemonsqueezy.com/checkout/buy/placeholder-annual" 
                label="Subscribe Annually"
                className="w-full h-12 flex items-center justify-center bg-white text-black font-bold rounded-lg hover:bg-accent transition-colors mt-auto"
              />
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
