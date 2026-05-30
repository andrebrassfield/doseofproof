import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export type ArticleMeta = {
  title: string;
  description: string;
  category: string;
  readTime: number;
  publishedAt: string;
  slug: string;
};

export type Article = {
  meta: ArticleMeta;
  content: string;
};

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
      readTime: data.readTime || 0,
      publishedAt: data.publishedAt || '',
      slug: realSlug,
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
