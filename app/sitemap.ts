import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content";
import { services } from "@/lib/data/services";
import { portfolio } from "@/lib/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexgenads.space";

  const routes = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "weekly" as const },
    { path: "/products/1grow", priority: 0.9, freq: "weekly" as const },
    { path: "/portfolio", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/career", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
    { path: "/faq", priority: 0.6, freq: "monthly" as const },
    { path: "/support", priority: 0.5, freq: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/cookie-policy", priority: 0.3, freq: "yearly" as const },
    { path: "/survey", priority: 0.4, freq: "monthly" as const },
    { path: "/waitlist", priority: 0.4, freq: "monthly" as const },
    { path: "/investors", priority: 0.4, freq: "monthly" as const },
    { path: "/partners", priority: 0.4, freq: "monthly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = portfolio.map((p) => ({
    url: `${baseUrl}/portfolio/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.status === "published")
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate ?? post.publishDate),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries, ...blogEntries];
}
