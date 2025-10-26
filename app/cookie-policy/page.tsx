const cookieCategories = [
  {
    title: 'Essential cookies',
    description:
      'Used to remember your waitlist session, maintain survey progress, and keep service workers registered for push notifications. These cookies are required for the PWA to function.',
  },
  {
    title: 'Performance & analytics',
    description:
      'We track anonymised usage patterns such as page views, feature engagement, and upload success rates to improve campaign workflows for Tamil Nadu users.',
  },
  {
    title: 'Preference cookies',
    description:
      'Store language selections, preferred persona (advertiser, mediator, designer, ad space owner), and notification opt-in choices so we can personalise your experience.',
  },
];

export const metadata = {
  title: 'Cookie Policy | NexGenAds',
  description:
    'Learn how NexGenAds uses cookies and similar technologies to deliver a secure, personalised progressive web application.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-white">
      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-12">
          <header className="space-y-4">
            <h1 className="text-3xl font-bold md:text-5xl">Cookie Policy</h1>
            <p className="text-white/70">
              Effective date: 22 January 2025. We use cookies and service worker storage to keep your NexGenAds experience fast, secure, and tailored to the Tamil Nadu advertising ecosystem.
            </p>
          </header>

          <div className="space-y-8">
            {cookieCategories.map((category) => (
              <article key={category.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold text-white">{category.title}</h2>
                <p className="mt-2 text-sm text-white/70">{category.description}</p>
              </article>
            ))}
          </div>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 space-y-3">
            <h2 className="text-lg font-semibold text-white">Your controls</h2>
            <p>
              You can clear or block cookies through your browser settings. However, refusing essential cookies may cause the NexGenAds waitlist, survey, or push notifications to stop working correctly.
            </p>
            <p>
              For any cookie related questions contact privacy@nexgenads.space. We review this policy each quarter and update the effective date when changes are published.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
