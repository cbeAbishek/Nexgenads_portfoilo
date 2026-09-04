import type { Metadata } from 'next';
import AdminPageClient from '@/components/pages/AdminPageClient';

export const metadata: Metadata = {
  title: 'NexGenAds Admin | Feedback & Careers Dashboard',
  description:
    'Private NexGenAds admin dashboard for reviewing feedback form submissions and career applications.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPageClient />;
}