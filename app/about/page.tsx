import type { Metadata } from "next";
import AboutPageClient from "@/components/pages/AboutPageClient";

export const metadata: Metadata = {
  title:
    "About NexGenAds | AI-Driven Technology Company - Mission, Vision & Team",
  description:
    "NexGenAds is an AI-driven technology company from Coimbatore helping businesses build, automate, and scale through software, AI, and intelligent marketing. Learn about our mission, vision, values, and leadership.",
  keywords: [
    "NexGenAds company",
    "AI technology company India",
    "software company Coimbatore",
    "AI automation company",
    "digital transformation company",
    "NexGenAds mission vision",
    "NexGenAds team",
    "technology partner India",
  ].join(", "),
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NexGenAds | AI-Driven Technology Company",
    description:
      "We build, automate, and scale intelligent businesses with software, AI, and intelligent marketing.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
