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
  const SITE_URL = "https://nexgenads.space";

  const foundersSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Abishek G.",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about`,
        email: "abishek@nexgenads.space",
      },
      {
        "@type": "Person",
        name: "Mohammed Jubair",
        jobTitle: "Co-founder & COO",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
