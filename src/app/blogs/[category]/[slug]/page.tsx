import { getArticleBySlug, getAllArticles, getRelatedArticles, CATEGORIES } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.meta.category && a.meta.slug)
    .map((a) => ({
      category: a.meta.category,
      slug: a.meta.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.meta.title} | Dose of Proof`,
    description: article.meta.description,
    keywords: article.meta.keywords,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      images: ["/og-image.png"],
      type: "article",
      publishedTime: article.meta.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.description,
      images: ["/og-image.png"],
    },
  };
}

// Extract H2 headings from markdown for the table of contents
function extractTOC(content: string): { id: string; text: string }[] {
  const headingRegex = /^## (.+)$/gm;
  const toc: { id: string; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    toc.push({ id, text });
  }
  return toc;
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== category) {
    notFound();
  }

  const toc = extractTOC(article.content);
  const related = getRelatedArticles(slug, category, 3);
  const categoryName = CATEGORIES[category] || category;

  const components = {
    h1: (props: any) => (
      <h1
        className="text-4xl md:text-5xl tracking-tighter mb-8 mt-12 text-white"
        {...props}
      />
    ),
    h2: (props: any) => {
      const text = typeof props.children === "string" ? props.children : "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return (
        <h2
          id={id}
          className="text-2xl md:text-3xl tracking-tight mb-6 mt-12 text-white border-t border-white/10 pt-12 scroll-mt-24"
          {...props}
        />
      );
    },
    h3: (props: any) => (
      <h3
        className="text-xl tracking-tight mb-4 mt-8 text-white"
        {...props}
      />
    ),
    p: (props: any) => (
      <p
        className="text-lg text-muted leading-relaxed mb-8"
        {...props}
      />
    ),
    ul: (props: any) => (
      <ul
        className="list-disc pl-6 text-lg text-muted leading-relaxed mb-8 space-y-2"
        {...props}
      />
    ),
    ol: (props: any) => (
      <ol
        className="list-decimal pl-6 text-lg text-muted leading-relaxed mb-8 space-y-2"
        {...props}
      />
    ),
    li: (props: any) => <li className="pl-2" {...props} />,
    strong: (props: any) => (
      <strong className="text-white font-bold" {...props} />
    ),
    a: (props: any) => (
      <a
        className="text-accent hover:underline underline-offset-4"
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        className="border-l-2 border-accent pl-6 italic text-xl my-10 text-white/80"
        {...props}
      />
    ),
    table: (props: any) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse" {...props} />
      </div>
    ),
    th: (props: any) => (
      <th className="border-b border-white/20 py-3 px-4 text-white font-bold text-sm uppercase tracking-wider" {...props} />
    ),
    td: (props: any) => (
      <td className="border-b border-white/5 py-3 px-4 text-muted" {...props} />
    ),
  };

  // FAQ Schema JSON-LD
  const faqSchema =
    article.meta.faqs && article.meta.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.meta.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Navbar />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link href="/blogs" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <span>/</span>
            <Link
              href={`/blogs/${category}`}
              className="hover:text-accent transition-colors"
            >
              {categoryName}
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">
              {article.meta.title}
            </span>
          </nav>

          {/* Header */}
          <header className="mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              {categoryName}
            </span>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white">
              {article.meta.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted border-b border-white/10 pb-8">
              <span>{article.meta.readTime} min read</span>
              <span>•</span>
              <time dateTime={article.meta.publishedAt}>
                {new Date(article.meta.publishedAt).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </time>
            </div>
          </header>

          {/* Table of Contents */}
          {toc.length > 2 && (
            <div className="mb-16 p-6 border border-white/10 rounded-xl bg-zinc-950/50">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">
                In This Article
              </h2>
              <ol className="space-y-2">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-muted hover:text-accent transition-colors text-sm"
                    >
                      {i + 1}. {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={article.content} components={components} />
          </div>

          {/* FAQ Section */}
          {article.meta.faqs && article.meta.faqs.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {article.meta.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-white/10 rounded-lg overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="text-white font-medium pr-4">
                        {faq.question}
                      </span>
                      <span className="text-accent shrink-0 group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-muted">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Affiliate Products */}
          {article.meta.affiliateProducts &&
            article.meta.affiliateProducts.length > 0 && (
              <div className="mt-16 p-6 border border-accent/20 rounded-xl bg-accent/5">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BrandIcon id="capsule" className="w-5 h-5 text-accent" />
                  Products Mentioned
                </h3>
                <div className="space-y-4">
                  {article.meta.affiliateProducts.map((product, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                        {product.description && (
                          <p className="text-muted text-sm">
                            {product.description}
                          </p>
                        )}
                      </div>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-affiliate={product.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}
                        className="text-accent text-sm font-bold hover:underline shrink-0"
                      >
                        View Source →
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4 italic">
                  This page contains affiliate links. I may earn a commission at
                  no extra cost to you.
                </p>
              </div>
            )}

          {/* Shop CTA Banner */}
          <div className="mt-16 bg-zinc-900 border border-white/10 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Shop the Protocol</h3>
              <p className="text-muted text-sm max-w-md">
                Get the exact supplements, peptides, and advanced testing guides I use to maintain remission.
              </p>
            </div>
            <a href="https://shop.doseofproof.com" className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-black transition-colors hover:bg-white/90 shrink-0">
              Visit Store →
            </a>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-16 p-6 border border-red-500/20 rounded-xl bg-red-500/5">
            <div className="flex items-start gap-3">
              <BrandIcon id="warning" className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Medical Disclaimer
                </h3>
                <p className="text-xs text-muted">
                  This website documents my personal experience. I am not a
                  doctor. The information shared here is not medical advice and
                  is not intended to diagnose, treat, cure, or prevent any
                  disease. Always consult your physician before starting any new
                  treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">
                Related Articles
              </h2>
              <div className="grid gap-4">
                {related.map((r) => (
                  <Link
                    key={r.meta.slug}
                    href={`/blogs/${r.meta.category}/${r.meta.slug}`}
                    className="group flex items-center justify-between p-6 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                  >
                    <div>
                      <h3 className="text-white font-medium group-hover:text-accent transition-colors">
                        {r.meta.title}
                      </h3>
                      <p className="text-muted text-sm mt-1">
                        {r.meta.readTime} min read
                      </p>
                    </div>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
