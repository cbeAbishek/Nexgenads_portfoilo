import type { Metadata } from "next";
import HomePageClient from "@/components/pages/HomePageClient";

export const metadata: Metadata = {
  title:
    "NexGen | AI-Driven Technology Company - Software, AI Automation & Digital Growth",
  description:
    "NexGen is an AI-driven technology company helping businesses build, automate, and scale. Website & app development, ERP/CRM, AI automation, AI chatbots, SaaS, digital marketing, SEO, GEO & AEO.",
  keywords: [
    "AI technology company",
    "software development company India",
    "AI automation services",
    "web development",
    "mobile app development",
    "ERP development",
    "CRM development",
    "SaaS development",
    "AI chatbots",
    "WhatsApp automation",
    "digital marketing",
    "SEO GEO AEO",
    "digital transformation",
    "Coimbatore software company",
  ].join(", "),
  openGraph: {
    title: "NexGen | AI-Driven Technology Company",
    description:
      "We build, automate, and scale intelligent businesses with software, AI, and intelligent marketing.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGen | AI-Driven Technology Company",
    description:
      "We build, automate, and scale intelligent businesses with software, AI, and intelligent marketing.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
