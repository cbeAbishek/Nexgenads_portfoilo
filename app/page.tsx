import type { Metadata } from 'next';
import HomePageClient from '@/components/pages/HomePageClient';

export const metadata: Metadata = {
  title: 'NexGenAds: AI-Powered Advertising for Tamil Nadu',
  description: 'The intelligent hub connecting brands, media partners, and designers across Tamil Nadu. Built in Coimbatore to power the next wave of local advertising.',
  keywords: 'Tamil Nadu advertising, Coimbatore ad-tech, AI advertising platform, local brand marketing, media buying India',
};

export default function HomePage() {
  return <HomePageClient />;
}

