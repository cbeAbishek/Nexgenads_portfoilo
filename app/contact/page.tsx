import type { Metadata } from 'next';
import ContactPageClient from '@/components/pages/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact NexGenAds | Ad-Tech Innovators in Coimbatore, India',
  description:
    'Get in touch with NexGenAds for business partnerships, investment opportunities, or general inquiries. We are located in Coimbatore, Tamil Nadu, and ready to connect.',
  keywords:
    'contact NexGenAds, ad-tech India, Coimbatore startup, business inquiry, investment contact, advertising support',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
