import type { Metadata } from 'next';
import AboutPageClient from '@/components/pages/AboutPageClient';

export const metadata: Metadata = {
  title: 'About NexGenAds | The Team Behind Tamil Nadu’s Ad-Tech Revolution',
  description: 'Meet the five student founders from Coimbatore building NexGenAds, the AI-powered platform set to unify and empower the advertising ecosystem across Tamil Nadu and India.',
  keywords: 'ad-tech startup India, Coimbatore tech company, student entrepreneurs, NexGenAds team, advertising platform mission',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
