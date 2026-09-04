'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Dog,
  ExternalLink,
  GraduationCap,
  Heart,
  Instagram,
  Laugh,
  Loader2,
  Sparkles,
  Star,
  Ticket,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type RoleType = 'student' | 'client' | 'intern' | 'public';
type StepName =
  | 'role'
  | 'identity'
  | 'details'
  | 'follow-nexgenads'
  | 'follow-1grow'
  | 'review'
  | 'done';

type GoogleUser = { name: string; email: string; picture?: string } | null;

type Joke = {
  error?: boolean;
  setup?: string;
  delivery?: string;
  joke?: string;
  category?: string;
};

const ROLE_META: Record<
  RoleType,
  { label: string; description: string; icon: React.ReactNode }
> = {
  student: {
    label: 'Student',
    description: 'Internships, training & career guidance',
    icon: <GraduationCap className="h-6 w-6" />,
  },
  client: {
    label: 'Client',
    description: 'Projects, services & collaborations',
    icon: <BriefcaseIcon className="h-6 w-6" />,
  },
  intern: {
    label: 'Intern',
    description: 'Internship experience & mentorship',
    icon: <Ticket className="h-6 w-6" />,
  },
  public: {
    label: 'Public',
    description: 'Events, workshops & community',
    icon: <Users className="h-6 w-6" />,
  },
};

const NEXGENADS_INSTA = 'http://instagram.com/nexgenads.ai';
const ONEGROW_INSTA = 'https://www.instagram.com/1growofficial/';
const GOOGLE_REVIEW_LINK = 'https://g.page/r/CaRp_FstW5-nEAE/review';
const NEXT_STEP_COUNTDOWN_SECONDS = 5;

const COLLEGES = [
  'PSG College of Technology',
  'PPG College of Technology',
  'Government College of Technology',
  'Coimbatore Institute of Technology',
  'Kumaraguru College of Technology',
  'Sri Krishna College of Engineering and Technology',
  'SNS College of Technology',
];

const DOMAINS = [
  'All Fields',
  'Editing',
  'Dance',
  'Development',
  'Design & Creative',
  'AI & Machine Learning',
  'Marketing & Sales',
  'Data Science',
  'Management',
  'Other',
];

const SESSION_TEMPLATE = `I recently attended a session at NexGenAds and it was a fantastic experience! The team explained everything in a clear, practical way with real-world examples. The hands-on approach made learning easy and enjoyable. Highly recommend NexGenAds to anyone looking to learn and grow. Thank you, NexGenAds team!`;

const GUIDANCE_TEMPLATE = `The career and business guidance I received from NexGenAds was truly valuable. They took time to understand my goals and gave me a clear, practical roadmap. The mentorship is professional, friendly, and result-driven. I'm genuinely grateful for the support and direction. Proud to be associated with NexGenAds!`;

const TRAINING_TEMPLATE = `The project training at NexGenAds was excellent! I worked on real projects with modern tools, and the mentors were always available to help. It felt like a real company environment, which boosted my skills and confidence a lot. Highly recommended for anyone who wants practical exposure!`;

const STEP_LABELS: { name: StepName; label: string }[] = [
  { name: 'role', label: 'Who are you?' },
  { name: 'identity', label: 'Your details' },
  { name: 'details', label: 'College details' },
  { name: 'follow-nexgenads', label: 'Follow NexGenAds' },
  { name: 'follow-1grow', label: 'Follow 1Grow' },
  { name: 'review', label: 'Share your review' },
  { name: 'done', label: 'Thank you!' },
];

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

function BriefcaseIcon({ className }: { className?: string }) {
  return <Award className={className} />;
}

const FeedbackPageClient = () => {
  const [step, setStep] = useState<StepName>('role');
  const [role, setRole] = useState<RoleType | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser>(null);
  const [authStatus, setAuthStatus] = useState<
    'idle' | 'loading' | 'failed' | 'oauth'
  >('idle');
  const [authError, setAuthError] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeSelect, setCollegeSelect] = useState('');
  const [collegeOther, setCollegeOther] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [interestedDomains, setInterestedDomains] = useState<string[]>([]);

  const [nexgenadsOpened, setNexgenadsOpened] = useState(false);
  const [onedotgrowOpened, setOnedotgrowOpened] = useState(false);
  const [nexgenadsFollowed, setNexgenadsFollowed] = useState(false);
  const [onedotgrowFollowed, setOnedotgrowFollowed] = useState(false);
  const [nexgenadsCountdown, setNexgenadsCountdown] = useState(0);
  const [onedotgrowCountdown, setOnedotgrowCountdown] = useState(0);

  const [sessionFeedback, setSessionFeedback] = useState(SESSION_TEMPLATE);
  const [guidanceFeedback, setGuidanceFeedback] = useState(GUIDANCE_TEMPLATE);
  const [projectTrainingFeedback, setProjectTrainingFeedback] =
    useState(TRAINING_TEMPLATE);

  const [sessionRating, setSessionRating] = useState(0);
  const [guidanceRating, setGuidanceRating] = useState(0);
  const [trainingRating, setTrainingRating] = useState(0);
  const [reviewLeft, setReviewLeft] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedKey, setCopiedKey] = useState('');

  const [joke, setJoke] = useState<Joke | null>(null);
  const [jokeLoading, setJokeLoading] = useState(false);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [dogLoading, setDogLoading] = useState(false);

  const didInitRef = useRef(false);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (data.authenticated && data.user) {
        setGoogleUser(data.user);
        setFullName((prev) => prev || data.user.name || '');
        setEmail((prev) => prev || data.user.email || '');
      }
    } catch (error) {
      console.error('Session check failed', error);
    }
  }, []);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role') as RoleType | null;
    if (roleParam && ROLE_META[roleParam]) {
      setRole(roleParam);
    }

    if (params.get('auth') === 'success') {
      setAuthStatus('loading');
      checkSession().then(() => setAuthStatus('idle'));
    } else if (params.get('error')) {
      setAuthStatus('failed');
      setAuthError('Google sign-in was not completed. You can continue manually below.');
    } else {
      checkSession();
    }
  }, [checkSession]);

  const startGoogleSignIn = () => {
    setAuthStatus('oauth');
    window.location.href = '/api/auth/google';
  };

  const fetchJoke = useCallback(async () => {
    setJokeLoading(true);
    try {
      const response = await fetch('/api/joke');
      const data = await response.json();
      if (data && !data.error) {
        setJoke(data as Joke);
      } else {
        setJoke(null);
      }
    } catch (error) {
      console.error('Joke fetch failed', error);
      setJoke(null);
    } finally {
      setJokeLoading(false);
    }
  }, []);

  const fetchDog = useCallback(async () => {
    setDogLoading(true);
    try {
      const response = await fetch('/api/dog');
      const data = await response.json();
      if (data && data.status === 'success' && data.message) {
        setDogImage(data.message as string);
      } else {
        setDogImage(null);
      }
    } catch (error) {
      console.error('Dog fetch failed', error);
      setDogImage(null);
    } finally {
      setDogLoading(false);
    }
  }, []);

  const startFollowCountdown = useCallback((type: 'nexgenads' | '1grow') => {
    const setter =
      type === 'nexgenads' ? setNexgenadsCountdown : setOnedotgrowCountdown;
    setter(NEXT_STEP_COUNTDOWN_SECONDS);
    const interval = setInterval(() => {
      setter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const loadPreviousFeedback = useCallback(async () => {
    try {
      const response = await fetch('/api/feedback');
      const data = await response.json();
      const fb = data?.feedback;
      if (!fb) return;

      setFullName(fb.full_name || '');
      setEmail(fb.email || '');

      if (role === 'student') {
        if (COLLEGES.includes(fb.college_name)) {
          setCollegeSelect(fb.college_name);
        } else if (fb.college_name) {
          setCollegeSelect('other');
          setCollegeOther(fb.college_name);
        }
        setDepartment(fb.department || '');
        setYear(fb.year || '');
        setInterestedDomains(
          (fb.interested_domain || '')
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        );
      }

      setSessionFeedback(fb.session_feedback || SESSION_TEMPLATE);
      setGuidanceFeedback(fb.guidance_feedback || GUIDANCE_TEMPLATE);
      setProjectTrainingFeedback(
        fb.project_training_feedback || TRAINING_TEMPLATE
      );
      setSessionRating(fb.session_rating || 0);
      setGuidanceRating(fb.guidance_rating || 0);
      setTrainingRating(fb.project_training_rating || 0);
      setNexgenadsFollowed(!!fb.nexgenads_followed);
      setOnedotgrowFollowed(!!fb.onedotgrow_followed);
      setReviewLeft(!!fb.review_left);
    } catch (error) {
      console.error('Loading previous feedback failed', error);
    }
  }, [role]);

  useEffect(() => {
    if (googleUser?.email && role) {
      loadPreviousFeedback();
    }
  }, [googleUser, role, loadPreviousFeedback]);

  const goToStep = (next: StepName) => {
    setSubmitError('');
    setStep(next);
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleIdentityNext = () => {
    if (!fullName.trim()) {
      setSubmitError('Please enter your name.');
      return;
    }
    if (!emailValid) {
      setSubmitError('Please enter a valid email address.');
      return;
    }
    if (role === 'student') {
      goToStep('details');
    } else {
      goToStep('follow-nexgenads');
    }
  };

  const handleDetailsNext = () => {
    const collegeName =
      collegeSelect === 'other' ? collegeOther.trim() : collegeSelect;
    if (!collegeSelect) {
      setSubmitError('Please select your college.');
      return;
    }
    if (collegeSelect === 'other' && !collegeOther.trim()) {
      setSubmitError('Please enter your college name.');
      return;
    }
    if (!department.trim()) {
      setSubmitError('Please enter your department.');
      return;
    }
    if (!year) {
      setSubmitError('Please select your year.');
      return;
    }
    if (interestedDomains.length === 0) {
      setSubmitError('Please select at least one interested domain.');
      return;
    }
    void collegeName;
    goToStep('follow-nexgenads');
  };

  const toggleDomain = (domain: string) => {
    setInterestedDomains((prev) => {
      if (domain === 'All Fields') {
        return prev.includes('All Fields')
          ? []
          : [...DOMAINS.filter((d) => d !== 'Other')];
      }
      const next = new Set(prev.filter((d) => d !== 'All Fields'));
      if (next.has(domain)) {
        next.delete(domain);
      } else {
        next.add(domain);
      }
      return Array.from(next);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const collegeName =
        collegeSelect === 'other' ? collegeOther.trim() : collegeSelect;

      const payload = {
        role,
        fullName: fullName.trim(),
        email: email.trim(),
        collegeName,
        department: department.trim(),
        year,
        interestedDomain: interestedDomains.join(', '),
        sessionFeedback,
        guidanceFeedback,
        projectTrainingFeedback,
        sessionRating,
        guidanceRating,
        projectTrainingRating: trainingRating,
        nexgenadsFollowed,
        onedotgrowFollowed,
        reviewLeft,
      };

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed');
      }

      goToStep('done');
      fetchJoke();
      fetchDog();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  const currentStepIndex = STEP_LABELS.findIndex((s) => s.name === step);
  const visibleSteps =
    role === 'student' ? STEP_LABELS : STEP_LABELS.filter((s) => s.name !== 'details');

  const renderStars = (
    label: string,
    value: number,
    onChange: (v: number) => void
  ) => (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-white p-4">
      <Label className="text-sm font-semibold text-foreground">{label}</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${label} ${star} star`}
            onClick={() => onChange(star)}
            className="rounded-md p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                'h-5 w-5 transition-colors',
                star <= value
                  ? 'fill-gold-500 text-gold-500'
                  : 'text-muted-foreground/40'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const renderCopyBlock = (key: string, title: string, template: string) => (
    <div className="rounded-xl border border-border/70 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => copyToClipboard(key, template)}
          className="shrink-0"
        >
          {copiedKey === key ? (
            <ClipboardCheck className="h-4 w-4 text-green-600" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          {copiedKey === key ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <p className="px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        {template}
      </p>
    </div>
  );

  const renderHeader = () => (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/80 via-white to-gold-500/10">
      <div className="container-custom mx-auto max-w-5xl px-4 pb-10 pt-28 text-center md:px-6 md:pt-36">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-600 shadow-sm">
          <Heart className="h-3.5 w-3.5" /> Feedback Program
        </span>
        <h1
          className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl"
          style={{ fontFamily: 'var(--font-neue-machina)' }}
        >
          Your Voice <span className="text-[#1d36bf]">Matters</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Share your NexGenAds experience — session, guidance and project
          training feedback — follow us on Instagram, leave a Google review, and
          grab a laugh on the way out.
        </p>
      </div>
    </section>
  );

  const renderProgress = () => (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">
          Step {Math.min(visibleSteps.length, currentStepIndex + 1)} of{' '}
          {visibleSteps.length}
        </p>
        <p className="text-sm font-medium text-brand-600">
          {STEP_LABELS.find((s) => s.name === step)?.label}
        </p>
      </div>
      <div className="flex w-full items-center gap-1.5">
        {visibleSteps.map((s) => (
          <div
            key={s.name}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors duration-500',
              STEP_LABELS.indexOf(s) <= currentStepIndex &&
                step !== 'done'
                ? 'bg-brand-500'
                : step === 'done'
                ? 'bg-green-500'
                : 'bg-border'
            )}
          />
        ))}
      </div>
    </div>
  );

  const renderRoleStep = () => (
    <div className="animate-fade-in">
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          Who are you?
        </h2>
        <p className="text-muted-foreground">
          Pick the role that fits you best. We&apos;ll tailor the next steps
          for you.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(ROLE_META) as RoleType[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setRole(key)}
            className={cn(
              'group rounded-2xl border-2 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10',
              role === key
                ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-white shadow-lg shadow-brand-500/10'
                : 'border-border/70 hover:border-brand-400'
            )}
          >
            <div
              className={cn(
                'mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                role === key
                  ? 'bg-brand-500 text-white'
                  : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100'
              )}
            >
              {ROLE_META[key].icon}
            </div>
            <p className="mb-1 text-lg font-bold text-foreground">
              {ROLE_META[key].label}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {ROLE_META[key].description}
            </p>
            {role === key && (
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                Selected <Check className="h-4 w-4" />
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          disabled={!role}
          onClick={() => goToStep('identity')}
          className="rounded-xl bg-brand-gradient font-semibold shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl hover:shadow-brand-500/35"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderIdentityStep = () => {
    const signedIn = !!googleUser;
    const googleFirstName = googleUser?.name.split(' ')[0] ?? '';
    const signedInEmail = googleUser?.email ?? '';
    return (
      <div className="animate-fade-in mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            {signedIn ? `Hi, ${googleFirstName}!` : 'Tell us about you'}
          </h2>
          <p className="text-muted-foreground">
            {signedIn
              ? 'You are signed in with Google. Confirm your details below.'
              : 'Sign in with Google or enter your name and email manually.'}
          </p>
        </div>

        {!signedIn && (
          <div className="mb-6">
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={startGoogleSignIn}
              disabled={authStatus === 'oauth' || authStatus === 'loading'}
              className="w-full gap-3 rounded-xl border-2 py-6 text-base font-semibold shadow-sm transition-all hover:shadow-md"
            >
              {authStatus === 'oauth' || authStatus === 'loading' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {authStatus === 'oauth'
                ? 'Connecting to Google…'
                : signedIn
                ? 'Signed in as ' + signedInEmail
                : 'Sign in with Google'}
            </Button>
            {authError && (
              <p className="mt-3 rounded-lg border border-gold-500/30 bg-gold-500/10 px-3 py-2 text-xs text-gold-700">
                {authError}
              </p>
            )}
            {signedIn && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                Authenticated via Google ({signedInEmail})
              </p>
            )}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                or continue manually
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <Label htmlFor="feedback-name" className="text-sm font-semibold">
              Full name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="feedback-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="mt-2 h-11 rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <Label htmlFor="feedback-email" className="text-sm font-semibold">
              Email address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="feedback-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 h-11 rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleIdentityNext}
            disabled={!fullName.trim() || !emailValid}
            className="w-full rounded-xl bg-brand-gradient py-6 text-base font-semibold shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl hover:shadow-brand-500/35"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>

          {submitError && step === 'identity' && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
              {submitError}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderDetailsStep = () => (
    <div className="animate-fade-in mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          College details
        </h2>
        <p className="text-muted-foreground">
          Tell us a little more about your academics so we can serve you better.
        </p>
      </div>
      <div className="space-y-5">
        <div>
          <Label className="text-sm font-semibold">
            College <span className="text-destructive">*</span>
          </Label>
          <Select value={collegeSelect} onValueChange={setCollegeSelect}>
            <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200">
              <SelectValue placeholder="Select your college" />
            </SelectTrigger>
            <SelectContent>
              {COLLEGES.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {collegeSelect === 'other' && (
            <Input
              value={collegeOther}
              onChange={(e) => setCollegeOther(e.target.value)}
              placeholder="Type your college name"
              className="mt-2 h-11 rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          )}
        </div>
        <div>
          <Label htmlFor="department" className="text-sm font-semibold">
            Department <span className="text-destructive">*</span>
          </Label>
          <Input
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Computer Science Engineering (CSE)"
            className="mt-2 h-11 rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">
            Year <span className="text-destructive">*</span>
          </Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="mt-2 h-11 w-full rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200">
              <SelectValue placeholder="Select your year (fresher to final year)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fresher">Fresher / 1st year</SelectItem>
              <SelectItem value="sophomore">2nd year</SelectItem>
              <SelectItem value="junior">3rd year</SelectItem>
              <SelectItem value="senior">Final year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-semibold">
            Interested domain <span className="text-destructive">*</span>
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              (select all that apply)
            </span>
          </Label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {DOMAINS.map((domain) => {
              const checked = interestedDomains.includes(domain);
              const isAllFields = domain === 'All Fields';
              return (
                <label
                  key={domain}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-3.5 py-3 transition-all',
                    checked
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-border/70 hover:border-brand-300'
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleDomain(domain)}
                    className="border-brand-400 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
                  />
                  <span
                    className={cn(
                      'text-sm font-medium',
                      checked ? 'text-brand-700' : 'text-foreground/80'
                    )}
                  >
                    {domain}
                  </span>
                  {isAllFields && checked && (
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                      Selects all
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {submitError && step === 'details' && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {submitError}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => goToStep('identity')}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={handleDetailsNext}
            className="rounded-xl bg-brand-gradient font-semibold shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl hover:shadow-brand-500/35"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFollowStep = (type: 'nexgenads' | '1grow') => {
    const isNexgenads = type === 'nexgenads';
    const followed = isNexgenads ? nexgenadsFollowed : onedotgrowFollowed;
    const opened = isNexgenads ? nexgenadsOpened : onedotgrowOpened;
    const link = isNexgenads ? NEXGENADS_INSTA : ONEGROW_INSTA;
    const handle = isNexgenads ? '@nexgenads.ai' : '@1growofficial';
    const title = isNexgenads ? 'Follow NexGenAds on Instagram' : 'Follow 1Grow on Instagram';
    const description = isNexgenads
      ? 'Stay connected with NexGenAds — product launches, behind-the-scenes, tips and more!'
      : 'Check out 1Grow — the all-in-one sales & marketing OS built by NexGen.';

    const markOpened = () => {
      if (isNexgenads) {
        setNexgenadsOpened(true);
        setNexgenadsFollowed(true);
      } else {
        setOnedotgrowOpened(true);
        setOnedotgrowFollowed(true);
      }
    };

    const markDone = () => {
      goToStep(isNexgenads ? 'follow-1grow' : 'review');
    };

    return (
      <div className="animate-fade-in mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl shadow-brand-500/30">
            <Instagram className="h-8 w-8" />
          </span>
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-white p-6 text-center shadow-sm">
          <p className="mb-1 text-sm font-semibold text-brand-600">{handle}</p>
          {!opened && (
            <p className="mb-4 text-sm text-muted-foreground">
              Tap the button below to open Instagram, tap{' '}
              <span className="font-semibold text-foreground">Follow</span>,
              then come back.
            </p>
          )}
          {opened && (
            <p className="mb-4 flex items-center justify-center gap-1.5 text-sm font-medium text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              You opened {handle} — kindly hit Follow and come back
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-gold-500 py-6 text-base font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-xl"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={markOpened}
              >
                <Instagram className="h-5 w-5" /> Open Instagram — {handle}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            {opened && (
              <>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl py-5 text-base font-semibold"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-5 w-5" /> Revisit — {handle}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={markDone}
                  className="w-full rounded-xl border-2 border-green-500/40 bg-green-500/10 py-6 text-base font-semibold text-green-700 transition-all hover:bg-green-500/20"
                >
                  {followed ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Done — following {handle}
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" /> I&apos;ve followed — next step
                    </>
                  )}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => goToStep(isNexgenads ? 'identity' : 'follow-nexgenads')}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => (
    <div className="animate-fade-in mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-orange-500 text-white shadow-xl shadow-gold-500/30">
          <Star className="h-8 w-8 fill-white" />
        </span>
        <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          Share your review
        </h2>
        <p className="text-muted-foreground">
          Rate your experience, copy a ready-made review, and leave it on Google.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Rate your experience
          </h3>
          {renderStars('Session feedback', sessionRating, setSessionRating)}
          {renderStars('Guidance feedback', guidanceRating, setGuidanceRating)}
          {renderStars(
            'Project / training feedback',
            trainingRating,
            setTrainingRating
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Copy-paste review templates
            </h3>
            <span className="text-xs text-muted-foreground">
              Pick one or more &amp; paste into Google review
            </span>
          </div>
          {renderCopyBlock('session', 'Session feedback', SESSION_TEMPLATE)}
          {renderCopyBlock('guidance', 'Guidance feedback', GUIDANCE_TEMPLATE)}
          {renderCopyBlock('training', 'Project / training feedback', TRAINING_TEMPLATE)}
        </div>

        <div className="rounded-2xl border border-brand-500/25 bg-gradient-to-br from-brand-50 to-white p-6 text-center">
          <h3 className="mb-1 text-lg font-bold text-foreground">
            Leave us a Google review
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Your review helps more students, clients and partners find us. It
            takes 30 seconds!
          </p>
          <div className="flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="w-full rounded-xl bg-brand-gradient py-5 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl"
            >
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setReviewLeft(true)}
              >
                <Sparkles className="h-5 w-5" /> Write a Google review
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 text-sm">
            <Checkbox
              checked={reviewLeft}
              onCheckedChange={(checked) => setReviewLeft(checked === true)}
              className="border-brand-400 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
            />
            <span className="font-medium text-foreground">
              Yes, I&apos;ve submitted my review on Google
            </span>
          </label>
        </div>

        {submitError && step === 'review' && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {submitError}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => goToStep('follow-1grow')}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-green-600 py-5 text-base font-bold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" /> Submit my feedback
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDoneStep = () => {
    const firstName = (googleUser?.name || fullName || 'friend').split(' ')[0];
    const jokeText = joke?.joke
      ? joke.joke
      : joke?.setup && joke?.delivery
      ? `${joke.setup}\n\n${joke.delivery}`
      : null;

    return (
      <div className="animate-fade-in mx-auto max-w-2xl text-center">
        <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h2
          className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: 'var(--font-neue-machina)' }}
        >
          Thank you, <span className="text-[#1d36bf]">{firstName}!</span>
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
          Thank you for your valuable time and effort. Your feedback helps
          NexGenAds grow, and your words truly mean the world to us.
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/15 to-transparent p-6">
            <p className="mb-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-gold-700">
              <Laugh className="h-5 w-5" /> Your joke for today
            </p>
            {jokeLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
              </div>
            )}
            {!jokeLoading && jokeText && (
              <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-foreground">
                {jokeText}
              </p>
            )}
            {!jokeLoading && !jokeText && (
              <p className="text-sm text-muted-foreground">
                Couldn&apos;t fetch a joke right now — here&apos;s one anyway:
                Why do programmers prefer dark mode? Because light attracts
                bugs!
              </p>
            )}
            {joke?.category && (
              <span className="mt-3 inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-gold-700">
                {joke.category} · Safe &amp; clean
              </span>
            )}
            <div className="mt-4">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={fetchJoke}
                disabled={jokeLoading}
                className="rounded-full"
              >
                <Sparkles className="h-4 w-4" /> Another joke
              </Button>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-brand-500/25 bg-gradient-to-br from-brand-50/60 to-transparent p-6">
            <p className="mb-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-600">
              <Dog className="h-5 w-5" /> A good boy for you
            </p>
            <div className="flex flex-1 items-center justify-center">
              {dogLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
                </div>
              )}
              {!dogLoading && dogImage && (
                <Image
                  src={dogImage}
                  alt="A cute doggo from Dog CEO"
                  width={480}
                  height={300}
                  className="max-h-52 w-full rounded-xl border border-border/60 object-cover shadow-sm"
                />
              )}
              {!dogLoading && !dogImage && (
                <p className="text-sm text-muted-foreground">
                  Couldn&apos;t fetch a photo right now — maybe this good boy
                  is napping!
                </p>
              )}
            </div>
            <div className="mt-4 text-center">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={fetchDog}
                disabled={dogLoading}
                className="rounded-full"
              >
                <Sparkles className="h-4 w-4" /> Another dog
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <a
            href={NEXGENADS_INSTA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand-400 hover:text-brand-600"
          >
            <Instagram className="h-4 w-4" /> @nexgenads.ai
          </a>
          <a
            href={ONEGROW_INSTA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand-400 hover:text-brand-600"
          >
            <Instagram className="h-4 w-4" /> @1growofficial
          </a>
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-gold-400 hover:text-gold-600"
          >
            <Star className="h-4 w-4" /> Leave a review
          </a>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline"
            className="rounded-xl"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            type="button"
            onClick={() => {
              setRole(null);
              setNexgenadsOpened(false);
              setOnedotgrowOpened(false);
              setNexgenadsFollowed(false);
              setOnedotgrowFollowed(false);
              setReviewLeft(false);
              setSessionRating(0);
              setGuidanceRating(0);
              setTrainingRating(0);
              setFullName('');
              setEmail('');
              setCollegeSelect('');
              setCollegeOther('');
              setDepartment('');
              setYear('');
              setInterestedDomains([]);
              setDogImage(null);
              setJoke(null);
              goToStep('role');
            }}
            className="rounded-xl bg-brand-gradient font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl"
          >
            <User className="h-4 w-4" /> Submit another feedback
          </Button>
        </div>
      </div>
  );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-background">
      {renderHeader()}

      <section className="bg-white pb-24">
        <div className="container-custom mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand-500/20 bg-gradient-to-b from-white to-brand-50/40 p-6 shadow-[0_20px_60px_-20px_rgba(0,80,140,0.25)] md:p-10">
            {step !== 'role' && step !== 'done' && renderProgress()}

            {step === 'role' && renderRoleStep()}
            {step === 'identity' && renderIdentityStep()}
            {step === 'details' && renderDetailsStep()}
            {step === 'follow-nexgenads' && renderFollowStep('nexgenads')}
            {step === 'follow-1grow' && renderFollowStep('1grow')}
            {step === 'review' && renderReviewStep()}
            {step === 'done' && renderDoneStep()}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By submitting, you agree to let NexGenAds use your feedback to
            improve our services. Your contact details are never shared.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPageClient;