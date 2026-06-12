import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { getAllArticles } from "@/lib/mdx";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Vault | Dose of Proof",
  description: "Real data, raw scans, and what actually worked.",
};

export default function Content() {
  const articles = getAllArticles();
  
  if (articles.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-24 min-h-[80dvh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 mt-16">The Vault</h1>
          <p className="text-xl text-muted max-w-2xl">No articles found.</p>
        </main>
        <DisclaimerBanner />
        <Footer />
      </>
    );
  }

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1);

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
            <Link href={`/content/${featuredArticle.meta.slug}`} className="md:col-span-2 group bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                <svg className="w-full h-full object-cover" preserveAspectRatio="none">
                  <use href="/svgs/animated/animated-overlays.svg#scan-line-animation" />
                </svg>
              </div>
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-end relative z-10 min-h-[300px]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">{featuredArticle.meta.category}</span>
                  <span className="text-muted text-sm">{featuredArticle.meta.readTime} min read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                  {featuredArticle.meta.title}
                </h2>
                <p className="text-muted text-lg max-w-2xl">
                  {featuredArticle.meta.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                  Read article <BrandIcon id="check" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>

            {/* Remaining Articles */}
            {restArticles.map((article) => (
              <Link key={article.meta.slug} href={`/content/${article.meta.slug}`} className="md:col-span-1 group bg-zinc-950/80 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">{article.meta.category}</span>
                  <span className="text-muted text-sm">{article.meta.readTime} min read</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {article.meta.title}
                </h3>
                <p className="text-muted mb-auto">
                  {article.meta.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                  Read article
                </div>
              </Link>
            ))}

          </div>
        </div>

        <div className="p-8 border border-white/10 rounded-xl bg-zinc-950/50 max-w-xl mx-auto w-full relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/images/textures/texture-noise-grain-1080x1080.png')", backgroundSize: "cover" }} />
           <h2 className="text-2xl font-bold tracking-tight mb-4">Get notified</h2>
           <p className="text-sm text-muted mb-6">Join the list to get new research breakdowns as soon as they drop.</p>
           <NewsletterForm />
        </div>
      </main>
      <DisclaimerBanner />
      <Footer />
    </>
  );
}
