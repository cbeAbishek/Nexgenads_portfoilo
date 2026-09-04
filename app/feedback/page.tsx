import type { Metadata } from 'next';
import FeedbackPageClient from '@/components/pages/FeedbackPageClient';

export const metadata: Metadata = {
  title:
    'NexGenAds Feedback | Share Your Experience | Students, Clients, Interns & Public',
  description:
    'Tell us about your NexGenAds experience. Students, clients, interns, and the public can share session feedback, guidance feedback, and project training feedback. Follow us on Instagram and leave a Google review to help us grow.',
  keywords: [
    'NexGenAds feedback',
    'feedback form',
    'student feedback',
    'client feedback',
    'intern feedback',
    'session feedback',
    'guidance feedback',
    'project training feedback',
    'Google review NexGenAds',
    'NexGenAds review',
    'NexGenAds internship',
    'NexGenAds training',
  ].join(', '),
  openGraph: {
    title: 'NexGenAds Feedback | Share Your Experience',
    description:
      'Share your session, guidance, and project training feedback. Follow us on Instagram and leave a review.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Feedback',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGenAds Feedback | Share Your Experience',
    description: 'Share your experience and help NexGenAds grow.',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function FeedbackPage() {
  return <FeedbackPageClient />;
}