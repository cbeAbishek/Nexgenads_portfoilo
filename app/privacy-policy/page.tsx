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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 text-gray-900">
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          <header className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-5 py-2.5 text-sm font-medium text-blue-700 shadow-sm">
              <span className="text-base">🔒</span>
              <span className="tracking-wide">Privacy & Data Protection</span>
            </div>

            <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Privacy Policy for{' '}
              <span className="text-blue-600">Nex</span>
              <span className="text-red-600">Gen</span>
              <span className="text-yellow-500">Ads</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg leading-relaxed">
              Effective date: <span className="font-semibold text-gray-900">22 January 2025</span>. We are committed to protecting the privacy of Tamil Nadu businesses and partners across our waitlist, surveys, and progressive web application.
            </p>
          </header>

          <div className="space-y-6">
            {sections.map((section) => {
              const number = section.title.split('.')[0];
              const label = section.title.slice(section.title.indexOf('.') + 1).trim();

              return (
                <article
                  key={section.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold shadow-sm">
                      {number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg md:text-xl font-bold text-gray-900">{label}</h2>
                      <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-600">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                              ✓
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 shadow-lg">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Contact us</h2>
            <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              For privacy questions, data export requests, or clarification on this policy, write to{' '}
              <a className="font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline" href="mailto:privacy@nexgenads.space">
                privacy@nexgenads.space
              </a>{' '}
              or call{' '}
              <a className="font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline" href="tel:+914223516677">
                +91-422-351-6677
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
