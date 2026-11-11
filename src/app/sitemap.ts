import type { MetadataRoute } from "next";
import { pageEntries } from "@/data/search";
import { newsItems } from "@/data/news";
import { documentItems } from "@/data/documents";

const baseUrl = "https://www.plecenter.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-10");

  const pages = pageEntries.map((entry) => ({
    url: `${baseUrl}${entry.href === "/" ? "" : entry.href}`,
    lastModified,
    changeFrequency:
      entry.href === "/" || entry.href === "/news"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority: entry.href === "/" ? 1 : 0.7,
  }));

  const news = newsItems.map((item) => ({
    url: `${baseUrl}/news/${item.id}`,
    lastModified: new Date(item.dateISO),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const documents = documentItems.map((doc) => ({
    url: `${baseUrl}/documents/${doc.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...news, ...documents];
}
