import Link from 'next/link';
import { Headphones, LifeBuoy, Mail, Phone, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'Support | NexGenAds',
  description:
    'Get fast help from the NexGenAds team. Access onboarding resources, request campaign support, or connect with our Tamil Nadu success specialists.',
};

const supportChannels = [
  {
    icon: Headphones,
    title: 'Priority Waitlist Support',
    description:
      'Already on the waitlist? Use your registered email to receive priority assistance, product updates, and onboarding walkthroughs when the beta drops.',
    href: '/waitlist',
    cta: 'Manage your waitlist spot',
  },
  {
    icon: Mail,
    title: 'Email our success desk',
    description:
      'Need help with inventory mapping or campaign planning? Drop us a note at support@nexgenads.space and we will reply within one business day.',
    href: 'mailto:support@nexgenads.space',
    cta: 'Email support',
  },
  {
    icon: Phone,
    title: 'Schedule a Tamil onboarding call',
    description:
      'Preferred a quick voice walkthrough? Book a 20-minute slot and our Coimbatore success pod will guide you through the PWA and push notification setup.',
    href: 'https://cal.com/nexgenads/intro',
    cta: 'Book a call',
  },
];

const incidentSteps = [
  'Capture screenshots or the error message you receive inside the PWA.',
  'Include your device model, OS version, and the approximate time the issue occurred.',
  'Email the details to support@nexgenads.space with the subject “Incident Report - <your company>”.',
  'We will acknowledge within 4 hours and share progress updates until resolved.',
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-white">
      <section className="section-padding">
        <div className="container-custom max-w-5xl space-y-16">
          <header className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
              <LifeBuoy className="h-4 w-4" /> Support Desk
            </div>
            <h1 className="text-3xl font-bold md:text-5xl">
              We keep Tamil Nadu campaign builders moving fast.
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
              Whether you are an advertiser, mediator, designer, or venue partner, our support team is ready with Tamil and English assistance, product walkthroughs, and campaign troubleshooting.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-3">
            {supportChannels.map((channel) => (
              <article
                key={channel.title}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1 hover:border-[#00D9FF]/40"
              >
                <channel.icon className="h-10 w-10 text-[#00D9FF]" />
                <h2 className="mt-4 text-xl font-semibold text-white">{channel.title}</h2>
                <p className="mt-2 flex-1 text-sm text-white/70">{channel.description}</p>
                <Link
                  href={channel.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00D9FF]"
                >
                  {channel.cta}
                  <span aria-hidden>&rarr;</span>
                </Link>
              </article>
            ))}
          </div>

          <section className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#00D9FF]/10 via-transparent to-[#A855F7]/10 p-8 md:grid-cols-2 md:items-center md:p-12">
            <div className="space-y-4">
              <ShieldCheck className="h-10 w-10 text-[#A855F7]" />
              <h2 className="text-2xl font-semibold text-white">Incident response promise</h2>
              <p className="text-sm text-white/70">
                If you spot a blocker while planning campaigns or uploading creatives, follow these steps so we can resolve it quickly.
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-white/70">
                {incidentSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-lg font-semibold text-white">Live status</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-emerald-300">
                <Zap className="h-4 w-4" /> All systems operational for survey uploads, waitlist enrolment, and push notifications.
              </p>
              <p className="mt-4 text-xs text-white/60">
                Planned maintenance notifications are sent via the NexGenAds PWA and our waitlist email updates at least 24 hours in advance.
              </p>
            </div>
          </section>

          <footer className="text-center text-xs text-white/50">
            Need legal information? Review our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and <Link href="/terms" className="underline">Terms of Service</Link>.
          </footer>
        </div>
      </section>
    </div>
  );
}
