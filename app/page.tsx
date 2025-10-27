import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';

export const metadata: Metadata = {
  title: 'NexGenAds - AI-Powered Advertising Platform | Digital Marketing Revolution in Tamil Nadu & India',
  description: 'Transform your advertising strategy with NexGenAds - the intelligent hub connecting brands, advertisers, media partners, designers, and ad space owners across Tamil Nadu and India. AI-driven platform for DOOH, cinema, outdoor advertising, and programmatic media buying. Built in Coimbatore to revolutionize local and national advertising ecosystems.',
  keywords: [
    'Tamil Nadu advertising platform',
    'Coimbatore ad-tech startup',
    'AI advertising platform India',
    'programmatic advertising India',
    'local brand marketing',
    'media buying platform India',
    'DOOH advertising Tamil Nadu',
    'outdoor advertising platform',
    'cinema advertising India',
    'digital marketing automation',
    'advertising intermediary platform',
    'ad space marketplace',
    'hyperlocal advertising India',
    'regional advertising solutions',
    'South India marketing platform',
    'Chennai advertising platform',
    'Madurai advertising solutions',
    'advertising technology India',
    'smart advertising platform',
    'transparent ad marketplace',
    'advertising ecosystem India',
    'media planning tools',
    'campaign management platform',
    'creative advertising platform',
    'designer collaboration tools',
    'advertising network India',
    'ad-tech innovation',
    'marketing automation India',
    'advertising mediator platform',
    'brand advertising solutions',
    'digital out of home India',
    'advertising management system',
    'startup India advertising',
    'B2B advertising platform',
    'advertising SaaS India',
  ].join(', '),
  openGraph: {
    title: 'NexGenAds - AI-Powered Advertising Platform for Tamil Nadu & India',
    description: 'Revolutionary advertising platform connecting brands, media partners, and designers. Transform your marketing with AI-driven solutions.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Platform - AI-Powered Advertising',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGenAds - AI Advertising Platform for India',
    description: 'Intelligent advertising ecosystem for Tamil Nadu brands. Connect with media partners, designers & ad spaces.',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
