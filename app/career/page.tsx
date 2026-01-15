import { Metadata } from "next";
import CareerPageClient from "@/components/pages/CareerPageClient";
import { getActiveJobOpenings } from "@/lib/content/careers";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Careers at NexGenAds | Join Our OOH Advertising Team",
  description: "Explore exciting career opportunities at NexGenAds. We're hiring for roles in outdoor advertising, DOOH operations, creative design, business development, and ad-tech engineering across Tamil Nadu.",
  keywords: [
    "NexGenAds careers",
    "outdoor advertising jobs",
    "DOOH jobs India",
    "advertising jobs Tamil Nadu",
    "ad-tech jobs Coimbatore",
    "OOH account manager jobs",
    "advertising careers India",
    "media jobs Tamil Nadu",
    "advertising job openings",
  ],
  canonical: "/career",
  ogType: "website",
});

export default function CareerPage() {
  const jobOpenings = getActiveJobOpenings();

  return <CareerPageClient jobOpenings={jobOpenings} />;
}
