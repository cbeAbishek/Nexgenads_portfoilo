'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, HelpCircle, Loader2, Sparkles, ChevronDown, MessageCircle, User, Mail, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 text-gray-900">
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-5 py-2.5 text-sm font-medium text-blue-700 shadow-sm">
              <HelpCircle className="h-4 w-4 text-blue-600" /> 
              <span className="tracking-wide">Frequently Asked Questions</span>
            </div>
            <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl leading-tight">
              Answers for Tamil Nadu advertisers, mediators, designers, and venue owners exploring{' '}
              <span className="text-blue-600">Nex</span>
              <span className="text-red-600">Gen</span>
              <span className="text-yellow-500">Ads</span>.
            </h1>
            <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg lg:text-xl leading-relaxed">
              We update this page with every cohort intake. Ask your question at the bottom and our team will email you back within <span className="font-semibold text-blue-600">two business days</span>.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Updated Weekly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                <MessageCircle className="h-3.5 w-3.5" /> {faqs.length} Questions Answered
              </span>
            </div>
          </header>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-bold shadow-sm">
                      {index + 1}
                    </span>
                    <span className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">{faq.question}</span>
                  </div>
                  <ChevronDown className="flex-shrink-0 h-5 w-5 text-blue-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 pl-[4.5rem]">
                  <div className="text-sm md:text-base leading-relaxed text-gray-600 border-l-2 border-blue-200 pl-4">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>

          <section className="rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 md:p-10 shadow-lg">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
                  <Sparkles className="h-4 w-4 text-purple-500" /> Something not covered?
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Tell us what you want to know about the launch experience 🚀
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Drop your question and we will send curated answers, Tamil case studies, or schedule a quick support call.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-blue-500" />
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your name"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail className="h-4 w-4 text-purple-500" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <HelpCircle className="h-4 w-4 text-pink-500" />
                  Your Question <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Share the context so we can provide helpful answers..."
                  rows={4}
                  minLength={10}
                  required
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {feedback && (
                <div
                  className={`md:col-span-2 flex items-start gap-3 rounded-xl border-2 px-5 py-4 text-sm font-medium ${
                    feedback.type === 'success'
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-red-300 bg-red-50 text-red-700'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                  <span>{feedback.type === 'success' ? '✅ ' : '⚠️ '}{feedback.message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="md:col-span-2 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3.5 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending your question...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Send My Question 📩
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <span className="text-lg">🔒</span> Your information is secure and will only be used to respond to your inquiry.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
