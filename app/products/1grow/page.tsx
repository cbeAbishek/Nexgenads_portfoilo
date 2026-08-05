import type { Metadata } from "next";
import ProductPageClient from "@/components/pages/ProductPageClient";

export const metadata: Metadata = {
  title:
    "1Grow | Sales & Marketing OS by NexGenAds - CRM, AI & WhatsApp Automation",
  description:
    "1Grow is an enterprise SaaS platform by NexGenAds that unifies CRM, lead management, AI assistance, WhatsApp integration, marketing automation, analytics, and reporting. Book a demo.",
  keywords:
    "1Grow, sales CRM, marketing automation, WhatsApp automation, AI sales assistant, lead management, SaaS platform India",
  alternates: { canonical: "/products/1grow" },
};

export default function OneGrowPage() {
  return <ProductPageClient />;
}
