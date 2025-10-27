import type { Metadata } from 'next';
import InvestorsPageClient from '@/components/pages/InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Invest in NexGenAds | Ad-Tech Investment Opportunity in India',
  description: 'Join NexGenAds as an investor and help shape the future of advertising in Tamil Nadu and India. Discover a scalable, AI-driven business model with a first-mover advantage.',
  keywords: 'invest in Indian startup, ad-tech investment, Coimbatore investment opportunity, venture capital India, seed funding startup',
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
