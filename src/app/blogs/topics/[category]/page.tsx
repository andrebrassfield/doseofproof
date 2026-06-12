import { getArticlesByCategory, CATEGORIES } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = CATEGORIES[category];
  if (!name) return {};

  return {
    title: `${name} Articles | Dose of Proof`,
    description: `Evidence-based research and protocols for ${name.toLowerCase()}. Real data, raw scans, and what actually worked.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = CATEGORIES[category];

  if (!categoryName) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/blogs" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/60">{categoryName}</span>
          </nav>

          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
              {categoryName}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/70 max-w-3xl leading-relaxed">
              {articles.length} article{articles.length !== 1 ? "s" : ""} — evidence-based breakdowns, protocols, and research.
            </p>
          </header>

          {articles.length === 0 ? (
            <p className="text-muted text-lg">No articles in this category yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.meta.slug}
                  href={`/blogs/${article.meta.slug}`}
                  className="group bg-zinc-950/80 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-muted text-sm">
                      {article.meta.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                    {article.meta.title}
                  </h2>
                  <p className="text-muted mb-auto">
                    {article.meta.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-white font-medium group-hover:text-accent transition-colors">
                    Read article
                    <BrandIcon
                      id="check"
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
