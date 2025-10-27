import type { Metadata } from 'next';
import AboutPageClient from '@/components/pages/AboutPageClient';

export const metadata: Metadata = {
  title: 'About NexGenAds | Student Founders Building India\'s Ad-Tech Revolution',
  description: 'Meet the five student founders from Coimbatore building NexGenAds - the AI-powered advertising platform revolutionizing how advertisers, mediators, designers, and ad space owners collaborate across Tamil Nadu and India. Learn about our mission, vision, team, and journey to transform the Indian advertising ecosystem.',
  keywords: [
    'ad-tech startup India',
    'Coimbatore tech company',
    'student entrepreneurs India',
    'NexGenAds team',
    'advertising platform mission',
    'Tamil Nadu startup founders',
    'young entrepreneurs India',
    'advertising innovation India',
    'startup story India',
    'student-led startup',
    'Coimbatore innovation',
    'ad-tech founders',
    'Indian startup ecosystem',
    'technology entrepreneurs',
    'advertising platform vision',
    'startup journey India',
    'young founders Coimbatore',
    'tech startup Tamil Nadu',
    'advertising revolution India',
    'student innovation India',
  ].join(', '),
  openGraph: {
    title: 'About NexGenAds | Meet the Team Behind India\'s Ad-Tech Revolution',
    description: 'Five student founders from Coimbatore transforming advertising in India with AI-powered platform.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Team - Student Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NexGenAds | Student Founders from Coimbatore',
    description: 'Building the future of advertising in India - Meet our team',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
