import type { Metadata } from 'next';
import WaitlistPageClient from '@/components/pages/WaitlistPageClient';

export const metadata: Metadata = {
  title: 'Join NexGenAds Waitlist | Early Access to India\'s Revolutionary Ad-Tech Platform',
  description: 'Get exclusive early access to NexGenAds - India\'s AI-powered advertising platform. Join the waitlist for advertisers, mediators, designers, and ad space owners. Be among the first to experience revolutionary advertising technology in Tamil Nadu and India. Priority access, beta testing, and exclusive benefits for early adopters.',
  keywords: [
    'NexGenAds waitlist',
    'early access advertising platform',
    'ad-tech beta access India',
    'join advertising platform',
    'advertising platform early access',
    'beta testing ad-tech',
    'exclusive access NexGenAds',
    'advertising platform launch',
    'early adopters advertising',
    'Tamil Nadu advertising waitlist',
    'priority access ad-tech',
    'advertising platform registration',
    'sign up advertising platform',
    'join ad-tech platform',
    'beta program advertising',
    'early bird access India',
    'advertising platform preview',
    'coming soon advertising',
    'launch notification advertising',
    'waitlist ad-tech India',
  ].join(', '),
  openGraph: {
    title: 'Join NexGenAds Waitlist | Get Early Access',
    description: 'Be among the first to experience India\'s revolutionary AI-powered advertising platform. Join the waitlist now.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Waitlist - Early Access',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join NexGenAds Waitlist | Early Access',
    description: 'Get exclusive early access to India\'s revolutionary advertising platform',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function WaitlistPage() {
  return <WaitlistPageClient />;
}
