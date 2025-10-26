const sections = [
  {
    title: '1. Information we collect',
    items: [
      'Waitlist details such as your name, email address, district, phone number, and brand information.',
      'Survey responses across advertiser, mediator, designer, and ad space owner personas, including optional media uploads stored securely on Supabase.',
      'Support messages, FAQ submissions, and partner enquiries shared through our web forms.',
      'Technical telemetry such as browser type, approximate geolocation, device identifiers, IP address, and service worker events for push notifications.',
    ],
  },
  {
    title: '2. How we use your data',
    items: [
      'To provide early access to the NexGenAds platform, send launch announcements, and configure personalised push notifications.',
      'To analyse campaign preferences and product usage trends to improve our Tamil Nadu-first advertising network.',
      'To respond to support requests and deliver onboarding assistance in your preferred language.',
      'To comply with legal obligations, secure our systems, and detect potential misuse.',
    ],
  },
  {
    title: '3. Data sharing and retention',
    items: [
      'We do not sell your personal data. Select insights may be shared with verified partners under NDA when required to deliver services.',
      'Media uploads are stored in Supabase object storage with strict access controls and deleted after 18 months unless otherwise requested.',
      'Push notification tokens are encrypted and stored separately from contact records to maintain confidentiality.',
    ],
  },
  {
    title: '4. Your choices',
    items: [
      'You can unsubscribe from waitlist emails or disable push notifications directly from your browser or device settings.',
      'To update or delete your data, email privacy@nexgenads.space and we will respond within 7 business days.',
      'If you are submitting information on behalf of a client, please ensure you have appropriate permissions.',
    ],
  },
];

export const metadata = {
  title: 'Privacy Policy | NexGenAds',
  description:
    'Understand how NexGenAds collects, stores, and protects your information across the waitlist, survey, and PWA experiences.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-white">
      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-12">
          <header className="space-y-4">
            <h1 className="text-3xl font-bold md:text-5xl">Privacy Policy</h1>
            <p className="text-white/70">
              Effective date: 22 January 2025. NexGenAds is committed to protecting the privacy of Tamil Nadu businesses and partners using our waitlist, surveys, and progressive web application.
            </p>
          </header>

          <div className="space-y-10">
            {sections.map((section) => (
              <article key={section.title} className="space-y-4">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <ul className="space-y-2 text-sm text-white/70">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#00D9FF]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            <h2 className="text-lg font-semibold text-white">Contact us</h2>
            <p className="mt-2">
              For privacy questions, data export requests, or clarification on this policy, write to privacy@nexgenads.space or call +91-422-351-6677.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
