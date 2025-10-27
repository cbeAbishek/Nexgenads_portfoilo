import type { Metadata } from 'next';
import PartnersPageClient from '@/components/pages/PartnersPageClient';

export const metadata: Metadata = {
  title: 'Partner with NexGenAds | Join India\'s Leading Ad-Tech Ecosystem | Advertisers, Mediators, Designers',
  description: 'Become a partner in India\'s revolutionary advertising platform. Join as advertiser, mediator, designer, or ad space owner. Access AI-powered tools, transparent marketplace, and grow your business with NexGenAds. Partnership opportunities in Tamil Nadu and across India for advertising professionals.',
  keywords: [
    'advertising partnership India',
    'become advertising partner',
    'ad-tech partnership',
    'mediator partnership India',
    'designer collaboration platform',
    'advertiser network India',
    'ad space owner platform',
    'advertising ecosystem partnership',
    'Tamil Nadu advertising partners',
    'Coimbatore business partnership',
    'media buying partnership',
    'creative partnership platform',
    'advertising collaboration',
    'B2B partnership India',
    'advertising network join',
    'partner opportunities advertising',
    'advertising mediator jobs',
    'freelance designer platform',
    'ad space rental India',
    'advertising broker platform',
    'marketing partnership India',
    'digital advertising partnership',
    'outdoor advertising partnership',
    'DOOH partnership India',
    'cinema advertising partnership',
  ].join(', '),
  openGraph: {
    title: 'Partner with NexGenAds | Join India\'s Ad-Tech Revolution',
    description: 'Join our ecosystem of advertisers, mediators, designers & ad space owners. Grow your business with AI-powered platform.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Partnership Opportunities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner with NexGenAds | Advertising Ecosystem',
    description: 'Join advertisers, mediators, designers & ad space owners on India\'s leading ad-tech platform',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
