import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export type FAQ = {
  question: string;
  answer: string;
};

export type AffiliateProduct = {
  name: string;
  url: string;
  description?: string;
};

export type ArticleMeta = {
  title: string;
  description: string;
  category: string;
  readTime: number;
  publishedAt: string;
  slug: string;
  keywords?: string[];
  faqs?: FAQ[];
  affiliateProducts?: AffiliateProduct[];
};

export type Article = {
  meta: ArticleMeta;
  content: string;
};

// Category display names and slugs
export const CATEGORIES: Record<string, string> = {
  'peptides': 'Peptides',
  'mold-recovery': 'Mold Recovery',
  'cci': 'CCI & Upper Cervical',
  'mcas': 'MCAS & Histamine',
  'protocols': 'Protocols',
  'supplements': 'Supplements',
};

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs.readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));
}

export function getArticleBySlug(slug: string): Article | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      readTime: data.readTime || estimateReadTime(content),
      publishedAt: data.publishedAt || data.date || '',
      slug: realSlug,
      keywords: data.keywords || [],
      faqs: data.faqs || [],
      affiliateProducts: data.affiliateProducts || [],
    },
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => (a.meta.publishedAt > b.meta.publishedAt ? -1 : 1));
  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (article) => article.meta.category === category
  );
}

export function getCategories(): { slug: string; name: string; count: number }[] {
  const articles = getAllArticles();
  const categoryCounts: Record<string, number> = {};

  articles.forEach((article) => {
    const cat = article.meta.category;
    if (cat) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  return Object.entries(CATEGORIES)
    .filter(([slug]) => categoryCounts[slug] && categoryCounts[slug] > 0)
    .map(([slug, name]) => ({
      slug,
      name,
      count: categoryCounts[slug] || 0,
    }));
}

export function getRelatedArticles(currentSlug: string, category: string, limit: number = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.meta.slug !== currentSlug)
    .filter((a) => a.meta.category === category)
    .slice(0, limit);
}

const testsDirectory = path.join(process.cwd(), 'src/content/tests');

export type TestMeta = {
  title: string;
  intent: string;
  category: string;
  stage: string;
  whyItMatters: string;
  whatItCanShow: string[];
  image: string;
  icon: string;
  affiliateAngle: string;
  nextTestSlug?: string;
  faqs?: FAQ[];
};

export type TestContent = {
  meta: TestMeta;
  content: string;
};

export function getTestBySlug(slug: string): TestContent | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(testsDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    meta: {
      title: data.title || '',
      intent: data.intent || '',
      category: data.category || '',
      stage: data.stage || '',
      whyItMatters: data.whyItMatters || '',
      whatItCanShow: data.whatItCanShow || [],
      image: data.image || '',
      icon: data.icon || '',
      affiliateAngle: data.affiliateAngle || '',
      nextTestSlug: data.nextTestSlug || '',
      faqs: data.faqs || [],
    },
    content,
  };
}
