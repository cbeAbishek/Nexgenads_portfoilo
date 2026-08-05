import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageClient from "@/components/pages/ServicePageClient";
import { services, getServiceBySlug } from "@/lib/data/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | NexGen Services`,
    description: service.short,
    keywords: `${service.title}, ${service.category}, NexGen`,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePageClient service={service} />;
}
