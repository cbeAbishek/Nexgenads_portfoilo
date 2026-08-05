import type { Metadata } from "next";
import PortfolioPageClient from "@/components/pages/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio | NexGenAds - Case Studies & Client Results",
  description:
    "Explore NexGen's portfolio - ERP, AI automation, mobile apps, branding, and growth marketing projects with measurable business results.",
  keywords:
    "NexGenAds portfolio, software case studies, ERP projects, AI automation projects, web development portfolio",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
