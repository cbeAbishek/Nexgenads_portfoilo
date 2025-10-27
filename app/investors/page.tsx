import type { Metadata } from 'next';
import InvestorsPageClient from '@/components/pages/InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Invest in NexGenAds | Ad-Tech Investment Opportunity in India | Seed Funding & Venture Capital',
  description: 'Join NexGenAds as an investor and help shape the future of advertising in Tamil Nadu and India. Discover a scalable, AI-driven business model with first-mover advantage in the Indian ad-tech market. Investment opportunities in programmatic advertising, DOOH, and digital marketing automation. Early-stage startup with high growth potential.',
  keywords: [
    'invest in Indian startup',
    'ad-tech investment India',
    'Coimbatore investment opportunity',
    'venture capital India',
    'seed funding startup',
    'angel investment India',
    'startup investment Tamil Nadu',
    'advertising technology investment',
    'early-stage startup investment',
    'Indian startup funding',
    'ad-tech venture capital',
    'SaaS investment India',
    'programmatic advertising investment',
    'digital marketing investment',
    'startup equity India',
    'technology investment Coimbatore',
    'high-growth startup India',
    'scalable business model',
    'first-mover advantage India',
    'advertising platform investment',
    'AI startup investment',
    'B2B SaaS investment',
    'Tamil Nadu venture capital',
    'startup pitch India',
    'investment deck ad-tech',
    'ROI advertising platform',
    'Series A funding India',
    'pre-seed investment',
    'startup valuation India',
    'growth potential startup',
  ].join(', '),
  openGraph: {
    title: 'Invest in NexGenAds | High-Growth Ad-Tech Startup India',
    description: 'Scalable AI-driven advertising platform with first-mover advantage. Join investors shaping the future of Indian ad-tech.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Investment Opportunity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invest in NexGenAds | Ad-Tech Startup Investment',
    description: 'Early-stage investment opportunity in India\'s advertising revolution',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
