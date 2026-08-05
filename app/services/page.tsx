import type { Metadata } from "next";
import ServicesPageClient from "@/components/pages/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | NexGenAds - Software, AI Automation & Digital Growth",
  description:
    "Website & mobile app development, ERP/CRM, custom software, AI automation, AI chatbots, SaaS, digital marketing, SEO, GEO & AEO, branding, and cloud solutions from NexGen.",
  keywords:
    "software development services, AI automation, ERP CRM, SaaS development, SEO GEO AEO, digital marketing, NexGen",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
