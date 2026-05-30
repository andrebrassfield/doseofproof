import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};
  
  return {
    title: `${article.meta.title} | Dose of Proof`,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.description,
      images: ['/og-image.png'],
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Define components for MDX rendering to ensure it matches the brand
  const components = {
    h1: (props: any) => <h1 className="text-4xl md:text-5xl tracking-tighter mb-8 mt-12 text-white" {...props} />,
    h2: (props: any) => <h2 className="text-2xl md:text-3xl tracking-tight mb-6 mt-12 text-white border-t border-white/10 pt-12" {...props} />,
    h3: (props: any) => <h3 className="text-xl tracking-tight mb-4 mt-8 text-white" {...props} />,
    p: (props: any) => <p className="text-lg text-muted leading-relaxed mb-8" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 text-lg text-muted leading-relaxed mb-8 space-y-2" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 text-lg text-muted leading-relaxed mb-8 space-y-2" {...props} />,
    li: (props: any) => <li className="pl-2" {...props} />,
    strong: (props: any) => <strong className="text-white font-bold" {...props} />,
    a: (props: any) => <a className="text-accent hover:underline underline-offset-4" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-2 border-accent pl-6 italic text-xl my-10 text-white/80" {...props} />,
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          
          <header className="mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              {article.meta.category}
            </span>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white">
              {article.meta.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted border-b border-white/10 pb-8">
              <span>{article.meta.readTime} min read</span>
              <span>•</span>
              <time dateTime={article.meta.publishedAt}>{new Date(article.meta.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</time>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            <MDXRemote source={article.content} components={components} />
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
