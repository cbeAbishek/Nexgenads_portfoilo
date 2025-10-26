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
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-white">
      <section className="section-padding">
        <div className="container-custom max-w-4xl space-y-12">
          <header className="space-y-4">
            <h1 className="text-3xl font-bold md:text-5xl">Terms of Service</h1>
            <p className="text-white/70">
              Effective date: 22 January 2025. These terms outline the rules and responsibilities when you interact with the NexGenAds ecosystem.
            </p>
          </header>

          <div className="space-y-8">
            {termsSections.map((section) => (
              <article key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                {section.content && <p className="text-sm text-white/70">{section.content}</p>}
                {section.bullets && (
                  <ul className="space-y-2 text-sm text-white/70">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#A855F7]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            Questions about these terms? Email legal@nexgenads.space so we can address them promptly.
          </p>
        </div>
      </section>
    </div>
  );
}
