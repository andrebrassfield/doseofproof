import { getCategories, getAllArticles } from "@/lib/mdx";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";

const CATEGORY_ICONS: Record<string, string> = {
  peptides: "pill-capsule",
  "mold-recovery": "microscope",
  cci: "spine-neck",
  mcas: "heart-rate-vagal",
  protocols: "folder-structure",
  supplements: "lab-flask",
};

export const metadata: Metadata = {
  title: "Blog | Dose of Proof",
  description:
    "Evidence-based articles on peptides, mold recovery, CCI, MCAS, and functional health protocols.",
};

export default function BlogIndex() {
  const categories = getCategories();
  const recentArticles = getAllArticles().slice(0, 5);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <header className="mb-16">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-4 block">
              Research & Protocols
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
              The Blog
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/70 max-w-3xl leading-relaxed">
              Deep dives into the research, protocols, and mechanisms behind
              chronic illness recovery. No fluff. Just data.
            </p>
          </header>

          {/* Category Grid */}
          <section className="mb-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blogs/${cat.slug}`}
                  className="group flex items-center gap-4 p-6 border border-white/10 rounded-xl hover:border-accent/30 hover:bg-accent/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <BrandIcon
                      id={CATEGORY_ICONS[cat.slug] || "filecode"}
                      className="w-6 h-6 text-white group-hover:text-accent transition-colors"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold group-hover:text-accent transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-muted text-sm">
                      {cat.count} article{cat.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Articles */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">
              Latest Articles
            </h2>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <Link
                  key={article.meta.slug}
                  href={`/blogs/${article.meta.category}/${article.meta.slug}`}
                  className="group flex items-center justify-between p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-accent text-xs font-bold uppercase tracking-wider">
                        {article.meta.category}
                      </span>
                      <span className="text-muted text-xs">
                        {article.meta.readTime} min
                      </span>
                    </div>
                    <h3 className="text-lg text-white font-medium group-hover:text-accent transition-colors truncate">
                      {article.meta.title}
                    </h3>
                    <p className="text-muted text-sm mt-1 truncate">
                      {article.meta.description}
                    </p>
                  </div>
                  <span className="text-accent text-xl opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
