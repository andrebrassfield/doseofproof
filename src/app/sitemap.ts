import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";

export const dynamic = "force-static";

const BASE_URL = "https://doseofproof.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/content`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/lead-magnet`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/doctors-miss-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programs/30-day-mold-detox`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work-with-me`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/vault`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/intake`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/recommend/peptides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/recommend/mold-detox`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/recommend/diagnostics`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Legal
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/medical-disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Blog articles (both /content/ and /blogs/ routes)
  const articlePages: MetadataRoute.Sitemap = articles.flatMap((article) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/content/${article.meta.slug}`,
        lastModified: article.meta.publishedAt ? new Date(article.meta.publishedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ];

    if (article.meta.category) {
      entries.push({
        url: `${BASE_URL}/blogs/${article.meta.category}/${article.meta.slug}`,
        lastModified: article.meta.publishedAt ? new Date(article.meta.publishedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    return entries;
  });

  // Category pages
  const categories = [...new Set(articles.map((a) => a.meta.category).filter(Boolean))];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/blogs/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
