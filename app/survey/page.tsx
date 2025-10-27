import type { Metadata } from 'next';
import SurveyPageClient from '@/components/pages/SurveyPageClient';

export const metadata: Metadata = {
  title: 'NexGenAds Survey | Share Your Advertising Insights | Help Shape the Future of Ad-Tech in India',
  description: 'Participate in the NexGenAds stakeholder survey for advertisers, mediators, designers, and ad space owners. Your valuable feedback helps build a revolutionary advertising ecosystem in India. Share insights on outdoor advertising, DOOH, cinema ads, media buying, and creative services. Make your voice heard in shaping Tamil Nadu and India\'s advertising future.',
  keywords: [
    'ad-tech survey India',
    'advertising feedback',
    'NexGenAds research',
    'Indian advertising market survey',
    'stakeholder feedback advertising',
    'marketing survey India',
    'advertising industry research',
    'media buying survey',
    'DOOH feedback India',
    'outdoor advertising survey',
    'advertising professionals survey',
    'Tamil Nadu advertising research',
    'advertiser feedback platform',
    'mediator insights survey',
    'designer feedback advertising',
    'ad space owner survey',
    'advertising ecosystem research',
    'market research advertising',
    'advertising trends India',
    'participate advertising survey',
  ].join(', '),
  openGraph: {
    title: 'NexGenAds Survey | Shape India\'s Advertising Future',
    description: 'Share your insights and help build the revolutionary advertising platform. Your feedback matters.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Stakeholder Survey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGenAds Survey | Advertising Insights',
    description: 'Help shape India\'s advertising future - Share your insights',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function SurveyPage() {
  return <SurveyPageClient />;
}