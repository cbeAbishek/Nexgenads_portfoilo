import type { Metadata } from 'next';
import SurveyPageClient from '@/components/pages/SurveyPageClient';

export const metadata: Metadata = {
  title: 'NexGenAds Stakeholder Survey | Shape the Future of Ad-Tech',
  description: 'Participate in the NexGenAds survey for advertisers, mediators, designers, and ad space owners. Your feedback is crucial for building a revolutionary advertising ecosystem in India.',
  keywords: 'ad-tech survey, advertising feedback, NexGenAds research, Indian advertising market, stakeholder feedback, marketing survey',
};

export default function SurveyPage() {
  return <SurveyPageClient />;
}