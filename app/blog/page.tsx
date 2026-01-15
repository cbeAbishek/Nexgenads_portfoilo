import { Metadata } from "next";
import BlogListingClient from "@/components/pages/BlogListingClient";
import { blogPosts } from "@/lib/content";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Blog | OOH Advertising Insights & Industry Trends",
  description: "Expert insights on outdoor advertising, DOOH, billboard strategies, cinema advertising, and transit media. Industry best practices, case studies, and trends from India's OOH advertising landscape.",
  keywords: [
    "OOH advertising blog",
    "outdoor advertising insights",
    "DOOH trends",
    "billboard advertising guide",
    "cinema advertising strategy",
    "transit advertising tips",
    "programmatic OOH",
    "outdoor advertising India",
    "Tamil Nadu advertising",
    "advertising industry trends",
    "media buying strategies",
    "advertising case studies",
    "hyperlocal advertising",
    "outdoor advertising best practices",
  ],
  canonical: "/blog",
  ogType: "website",
});

export default function BlogPage() {
  return <BlogListingClient />;
}
