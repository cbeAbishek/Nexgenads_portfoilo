const termsSections = [
  {
    title: '1. Acceptance of terms',
    content:
      'By accessing the NexGenAds website, waitlist, surveys, or progressive web application, you agree to these terms of service. If you are acting on behalf of a company or client, you confirm that you are authorised to accept these terms.',
  },
  {
    title: '2. Platform access',
    content:
      'Access to beta features is invite-only. We may modify, suspend, or discontinue components such as survey uploads, push notifications, or analytics dashboards without prior notice during the beta period.',
  },
  {
    title: '3. Usage guidelines',
    bullets: [
      'Do not upload unlawful, offensive, or unauthorised materials.',
      'Keep contact details accurate. We may suspend accounts supplying fraudulent data.',
      'Respect confidentiality of campaign briefs, inventory insights, and documents shared within NexGenAds.',
    ],
  },
  {
    title: '4. Intellectual property',
    content:
      'All platform content, branding, and software are owned by NexGenAds. You retain ownership of the creative assets you upload but grant us a licence to store and process them for campaign fulfilment.',
  },
  {
    title: '5. Limitation of liability',
    content:
      'NexGenAds provides services “as is” during beta. We are not liable for indirect losses or missed campaigns arising from platform downtime, third-party integrations, or inaccurate data submitted by users.',
  },
  {
    title: '6. Governing law',
    content:
      'These terms are governed by the laws of India. Disputes will be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu.',
  },
];

export const metadata = {
  title: 'Terms of Service | NexGenAds',
  description:
    'Review the conditions for using NexGenAds waitlist, surveys, PWA, and related services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 text-gray-900">
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          <header className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-5 py-2.5 text-sm font-medium text-purple-700 shadow-sm">
              <span className="text-base">📄</span>
              <span className="tracking-wide">Terms & Conditions</span>
            </div>

            <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Terms of Service for{' '}
              <span className="text-blue-600">Nex</span>
              <span className="text-red-600">Gen</span>
              <span className="text-yellow-500">Ads</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg leading-relaxed">
              Effective date: <span className="font-semibold text-gray-900">22 January 2025</span>. These terms outline the rules and responsibilities when you interact with the NexGenAds ecosystem.
            </p>
          </header>

          <div className="space-y-6">
            {termsSections.map((section) => {
              const number = section.title.split('.')[0];
              const label = section.title.slice(section.title.indexOf('.') + 1).trim();

              return (
                <article
                  key={section.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold shadow-sm">
                      {number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg md:text-xl font-bold text-gray-900">{label}</h2>

                      {section.content && (
                        <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {section.bullets && (
                        <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-600">
                          {section.bullets.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                                •
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-purple-50 p-6 md:p-8 shadow-lg">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Questions about these terms? Email{' '}
              <a className="font-semibold text-purple-700 hover:text-purple-800 underline-offset-4 hover:underline" href="mailto:legal@nexgenads.space">
                legal@nexgenads.space
              </a>{' '}
              so we can address them promptly.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
