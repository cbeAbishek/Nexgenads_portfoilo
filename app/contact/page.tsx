import type { Metadata } from 'next';
import ContactPageClient from '@/components/pages/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact NexGenAds | Get in Touch | Ad-Tech Support & Business Inquiries Coimbatore, India',
  description:
    'Contact NexGenAds for advertising platform inquiries, business partnerships, investment opportunities, or support. Reach our team in Coimbatore, Tamil Nadu for AI-powered advertising solutions, media buying assistance, and collaboration opportunities across India.',
  keywords: [
    'contact NexGenAds',
    'ad-tech India contact',
    'Coimbatore startup contact',
    'business inquiry NexGenAds',
    'investment contact',
    'advertising support India',
    'NexGenAds customer service',
    'advertising platform support',
    'partnership inquiry',
    'media buying contact',
    'advertising consultation India',
    'Tamil Nadu ad-tech contact',
    'business collaboration India',
    'advertising platform demo',
    'sales contact advertising',
    'support team NexGenAds',
    'advertising inquiry India',
    'contact Coimbatore startup',
    'reach NexGenAds team',
    'advertising solutions contact',
  ].join(', '),
  openGraph: {
    title: 'Contact NexGenAds | Advertising Platform Support & Inquiries',
    description: 'Get in touch with NexGenAds team in Coimbatore for partnerships, support, and business inquiries.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact NexGenAds Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact NexGenAds | Ad-Tech India',
    description: 'Reach our team in Coimbatore for advertising platform inquiries and support',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
