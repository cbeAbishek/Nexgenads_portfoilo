import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioProjectClient from "@/components/pages/PortfolioProjectClient";
import { portfolio, getPortfolioById } from "@/lib/data/portfolio";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return portfolio.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getPortfolioById(id);
  if (!item) return {};
  return {
    title: `${item.title} | NexGen Case Study`,
    description: item.summary,
    keywords: `${item.industry}, ${item.category}, case study, NexGen`,
    alternates: { canonical: `/portfolio/${id}` },
  };
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { id } = await params;
  const item = getPortfolioById(id);
  if (!item) notFound();
  return <PortfolioProjectClient item={item} />;
}
