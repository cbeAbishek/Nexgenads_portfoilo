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
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-background text-gray-900">
      <section className="px-4 pt-28 pb-16 md:px-6 md:pt-36 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          <header className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-5 py-2.5 text-sm font-medium text-gold-600 shadow-sm">
              <span className="text-base">🍪</span>
              <span className="tracking-wide">Cookies & Storage</span>
            </div>

            <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Cookie Policy for{' '}
              <span className="text-[#008dec]">NexGenAds</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg leading-relaxed">
              Effective date: <span className="font-semibold text-gray-900">22 January 2025</span>. This policy applies to the website and services operated by NexGenAds Technologies Private Limited (&quot;NexGenAds&quot;). We use cookies and service worker storage to keep your NexGenAds experience fast, secure, and tailored to the Tamil Nadu advertising ecosystem.
            </p>
          </header>

          <div className="space-y-6">
            {cookieCategories.map((category, index) => (
              <article
                key={category.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br bg-gold-500 text-white font-bold shadow-sm">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">{category.title}</h2>
                    <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-amber-50 p-6 md:p-8 shadow-lg space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Your controls</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              You can clear or block cookies through your browser settings. However, refusing essential cookies may cause the NexGenAds waitlist, survey, or push notifications to stop working correctly.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              For cookie-related questions, contact{' '}
              <a className="font-semibold text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline" href="mailto:privacy@nexgenads.space">
                privacy@nexgenads.space
              </a>
              . We review this policy each quarter and update the effective date when changes are published.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
