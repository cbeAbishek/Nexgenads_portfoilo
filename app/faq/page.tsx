'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, HelpCircle, Loader2, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'When will the NexGenAds platform be available for public launch?',
    answer:
      'We are onboarding our first cohort of Tamil Nadu partners in Q2 2025. Waitlist members will get beta access, onboarding workshops, and the first invite to our Coimbatore experience centre.',
  },
  {
    question: 'How do advertisers benefit compared to calling mediators individually?',
    answer:
      'NexGenAds offers verified inventory from outlets, cinema, DOOH, and community media inside a single workspace. You can compare rates, outlet performance, and availability in real-time, while mediators collaborate safely without exposing client rosters.',
  },
  {
    question: 'What does the mediator experience look like in your PWA?',
    answer:
      'Mediators can manage site audits, route approvals, and creative upload workflows on mobile. They also receive push notifications when advertisers request quotes in their districts, making lead response measurable.',
  },
  {
    question: 'Do designers and creative studios get access to briefs inside the app?',
    answer:
      'Yes! Designers matched to campaigns see creative requirements, brand assets, Tamil copy guidelines, and deadlines, with drag-and-drop delivery integrated into Supabase storage.',
  },
  {
    question: 'Is NexGenAds only focused on Tamil Nadu?',
    answer:
      'Our first market is Tamil Nadu because of the dense mix of cinema, outdoor, and community media. Once the model is refined locally, we will expand to Bengaluru and Hyderabad metros.',
  },
];

export default function FAQPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/faq/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit your question right now.');
      }

      setFeedback({ type: 'success', message: 'Thanks! We will review and add your question soon.' });
      setFullName('');
      setEmail('');
      setQuestion('');
    } catch (error) {
      console.error('FAQ form error', error);
      setFeedback({ type: 'error', message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background text-white">
      <section className="section-padding">
        <div className="container-custom max-w-5xl space-y-12">
          <header className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
              <HelpCircle className="h-4 w-4" /> FAQ
            </div>
            <h1 className="text-3xl font-bold md:text-5xl">
              Answers for Tamil Nadu advertisers, mediators, designers, and venue owners exploring NexGenAds.
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/70 md:text-lg">
              We update this page with every cohort intake. Ask your question at the bottom and our team will email you back within two business days.
            </p>
          </header>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-white transition-colors hover:text-[#00D9FF]">
                  <span>{faq.question}</span>
                  <span className="text-[#00D9FF] transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="pb-6 text-sm leading-relaxed text-white/70">{faq.answer}</div>
              </details>
            ))}
          </div>

          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#A855F7]/10 via-transparent to-[#00D9FF]/10 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/50">
                  <Sparkles className="h-3 w-3" /> Something not covered?
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Tell us what you want to know about the launch experience.
                </h2>
                <p className="text-sm text-white/70">
                  Drop your question and we will send curated answers, Tamil case studies, or schedule a quick support call.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Full name</label>
                <Input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Email address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  disabled={isSubmitting}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/60">Your question</label>
                <Textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Share the context so we can provide helpful answers."
                  rows={4}
                  minLength={10}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  disabled={isSubmitting}
                />
              </div>

              {feedback && (
                <div
                  className={`md:col-span-2 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                    feedback.type === 'success'
                      ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
                      : 'border-red-400/40 bg-red-400/10 text-red-100'
                  }`}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                  <span>{feedback.message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 w-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] py-3"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </span>
                ) : (
                  'Send my question'
                )}
              </Button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}
