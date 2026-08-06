import type { MetadataRoute } from "next";
import { getSitePayload } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novessafoundation.org.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSitePayload();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/programs`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/impact`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/volunteer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/partners`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/donate`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/reports`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/careers`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.1 }
  ];

  const programRoutes: MetadataRoute.Sitemap = site.programs.map((program) => ({
    url: `${siteUrl}/programs/${program.slug}`,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const storyRoutes: MetadataRoute.Sitemap = site.stories.map((story) => ({
    url: `${siteUrl}/blog/${story.slug}`,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticRoutes, ...programRoutes, ...storyRoutes];
}
