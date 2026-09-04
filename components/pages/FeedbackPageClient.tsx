'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clipboard,
  ClipboardCheck,
  Clock,
  Dog,
  ExternalLink,
  GraduationCap,
  Heart,
  Instagram,
  Laugh,
  Loader2,
  Plus,
  Quote,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
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
  'Software Development',
  'Mobile App Development',
  'Artificial Intelligence (AI)',
  'Machine Learning (ML)',
  'Data Science',
  'Cloud Computing',
  'Game Development',
  'Robotics',
  'Embedded Systems',
  'Wireless Technology',
  'Automation',
  'Robotics & Drones',
  'AgriTech',
  'Food Technology',
  'Sustainable Agriculture',
  'Automobile Engineering',
  'Electric Vehicles (EV)',
  'Manufacturing',
  'Healthcare Technology',
  'Biotechnology',
  'Dance',
  'Music',
  'Singing',
  'Video Creation',
  'YouTube Content Creation',
  'Photography',
  'Videography',
  'Video Editing',
  'Graphic Design',
  'Animation',
  'Gaming',
  'Entrepreneurship',
  'Startups',
  'Stock Market',
  'Sports & Fitness',
  'Travel',
  'Social Work',
  'Teaching',
  'Leadership',
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
  const [customDomains, setCustomDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState('');

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

  const [showTemplates, setShowTemplates] = useState(false);

  const [joke, setJoke] = useState<Joke | null>(null);
  const [jokeLoading, setJokeLoading] = useState(false);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [dogLoading, setDogLoading] = useState(false);
  const doneFetchedRef = useRef(false);

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
      checkSession().then(() => {
        setAuthStatus('idle');
        if (roleParam && ROLE_META[roleParam]) {
          setStep('identity');
        }
        const url = new URL(window.location.href);
        url.searchParams.delete('auth');
        window.history.replaceState({}, '', url.toString());
      });
    } else if (params.get('error')) {
      setAuthStatus('failed');
      setAuthError('Google sign-in was not completed. You can continue manually below.');
    } else {
      checkSession();
    }
  }, [checkSession]);

  const startGoogleSignIn = () => {
    setAuthStatus('oauth');
    const returnTo = role ? `/feedback?role=${role}` : '/feedback';
    window.location.href = `/api/auth/google?returnTo=${encodeURIComponent(returnTo)}`;
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

  useEffect(() => {
    if (step === 'done') {
      if (!doneFetchedRef.current) {
        doneFetchedRef.current = true;
        fetchJoke();
        fetchDog();
      }
    } else {
      doneFetchedRef.current = false;
    }
  }, [step, fetchJoke, fetchDog]);

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

        const savedDomains = (fb.interested_domain || '')
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean);
        const savedCustom = savedDomains.filter(
          (d: string) =>
            !DOMAINS.some((known) => known.toLowerCase() === d.toLowerCase())
        );
        setCustomDomains((prev) =>
          Array.from(new Set([...prev, ...savedCustom]))
        );
        setInterestedDomains(savedDomains);
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
      setNexgenadsOpened(!!fb.nexgenads_followed);
      setOnedotgrowOpened(!!fb.onedotgrow_followed);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (interestedDomains.length < 5) {
      setSubmitError(
        `Please select at least 5 interested domains (currently ${interestedDomains.length}).`
      );
      return;
    }
    if (interestedDomains.length > 10) {
      setSubmitError('You can select at most 10 interested domains.');
      return;
    }
    void collegeName;
    goToStep('follow-nexgenads');
  };

  const toggleDomain = (domain: string) => {
    setInterestedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) {
        next.delete(domain);
      } else {
        if (next.size >= 10) {
          setSubmitError('You can select up to 10 domains only.');
          return Array.from(next);
        }
        next.add(domain);
        setSubmitError('');
      }
      return Array.from(next);
    });
  };

  const addCustomDomain = () => {
    const value = newDomain.trim();
    if (!value) return;
    const all = DOMAINS.concat(customDomains);
    const exists = all.some((d) => d.toLowerCase() === value.toLowerCase());
    if (exists) {
      setSubmitError('This domain is already in the list.');
      return;
    }
    if (interestedDomains.length >= 10) {
      setSubmitError('You can select at most 10 domains. Uncheck one first.');
      return;
    }
    setCustomDomains((prev) => Array.from(new Set([...prev, value])));
    setInterestedDomains((prev) => Array.from(new Set([...prev, value])));
    setNewDomain('');
    setSubmitError('');
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
    <div
      className={cn(
        'flex flex-col items-center gap-2 rounded-2xl border bg-white p-4 text-center transition-all',
        value > 0
          ? 'border-gold-500/50 shadow-lg shadow-gold-500/10'
          : 'border-border/70 hover:border-gold-300'
      )}
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${label} ${star} star`}
            onClick={() => onChange(star)}
            className="rounded-md p-0.5 transition-transform hover:scale-125"
          >
            <Star
              className={cn(
                'h-6 w-6 transition-all',
                star <= value
                  ? 'fill-gold-500 text-gold-500 drop-shadow-sm'
                  : 'text-muted-foreground/30 hover:text-gold-400'
              )}
            />
          </button>
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p
          className={cn(
            'mt-0.5 text-[11px] font-medium',
            value > 0 ? 'text-gold-600' : 'text-muted-foreground'
          )}
        >
          {value > 0 ? `${value} / 5` : 'Tap to rate'}
        </p>
      </div>
    </div>
  );

  const renderCopyBlock = (
    key: string,
    title: string,
    value: string,
    onChange: (value: string) => void
  ) => (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm transition-colors hover:border-brand-300">
      <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-brand-50/60 to-transparent px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground"> {title}
        </p>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => copyToClipboard(key, value)}
          className="shrink-0 rounded-full bg-white shadow-sm"
        >
          {copiedKey === key ? (
            <ClipboardCheck className="h-4 w-4 text-green-600" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          {copiedKey === key ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <div className="px-4 pb-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="mt-2 resize-y rounded-xl border-border/70 bg-brand-50/15 text-sm leading-relaxed text-foreground shadow-inner focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>
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
          Share your NexGenAds experience session, guidance and project
          training feedback follow us on Instagram, leave a Google review, and
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
    <div className="animate-fade-in mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          Who are you?
        </h2>
        <p className="text-muted-foreground">
          Pick the role that fits you best. We&apos;ll tailor the next steps
          for you.
        </p>
      </div>

      <div>
        <Select
          value={role ?? undefined}
          onValueChange={(value) => setRole(value as RoleType)}
        >
          <SelectTrigger className="w-full h-full gap-3 py-8 border-2 border-border/70 bg-white px-4 text-base shadow-sm transition-colors hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 [&>svg]:size-5">
            {role ? (
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-brand-600">
                  {ROLE_META[role].icon}
                </span>
                <span className="flex flex-col items-start">
                  <span className="text-sm font-bold text-foreground">
                    {ROLE_META[role].label}
                  </span>
                  {/* <span className="text-xs font-medium text-muted-foreground">
                    {ROLE_META[role].description}
                  </span> */}
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-brand-500">
                  <Users className="h-5 w-5" />
                </span>
                <span className="text-base font-semibold text-foreground/70">
                  Select who you are
                </span>
              </span>
            )}
          </SelectTrigger>
          <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
            {(Object.keys(ROLE_META) as RoleType[]).map((key) => (
              <SelectItem key={key} value={key} className="py-2.5">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-brand-600">
                    {ROLE_META[key].icon}
                  </span>
                  <span className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-bold text-foreground">
                      {ROLE_META[key].label}
                    </span>
                    {/* <span className="text-xs text-muted-foreground">
                      {ROLE_META[key].description}
                    </span> */}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          </Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Select between 5 and 10 domains.{' '}
            <span
              className={cn(
                'font-semibold',
                interestedDomains.length >= 5 && interestedDomains.length <= 10
                  ? 'text-green-600'
                  : 'text-gold-600'
              )}
            >
              {interestedDomains.length}
            </span>{' '}
            / 10 selected.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {DOMAINS.concat(customDomains).map((domain) => {
              const checked = interestedDomains.includes(domain);
              const isCustom = customDomains.includes(domain);
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
                  {isCustom && (
                    <span className="ml-auto shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                      Custom
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomDomain();
                }
              }}
              placeholder="Add a new domain if it's not in the list…"
              className="h-11 rounded-xl border-border/70 bg-white shadow-sm hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <Button
              type="button"
              onClick={addCustomDomain}
              disabled={!newDomain.trim()}
              className="h-11 shrink-0 rounded-xl bg-brand-gradient font-semibold shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl"
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Can&apos;t find your domain? Type it above and press Add it will
            appear as a selectable option.
          </p>
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
      ? 'Stay connected with NexGenAds product launches, behind-the-scenes, tips and more!'
      : 'Check out 1Grow the all-in-one sales & marketing OS built by NexGen.';

    const markOpened = () => {
      if (isNexgenads) {
        setNexgenadsOpened(true);
        setNexgenadsFollowed(true);
      } else {
        setOnedotgrowOpened(true);
        setOnedotgrowFollowed(true);
      }
      startFollowCountdown(type);
    };

    const countdown = isNexgenads ? nexgenadsCountdown : onedotgrowCountdown;
    const nextReady = opened && countdown === 0;

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
              You opened {handle} kindly hit Follow and come back
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
                <Instagram className="h-5 w-5" /> Open Instagram {handle}
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
                    <Instagram className="h-5 w-5" /> Revisit {handle}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                {nextReady ? (
                  <Button
                    type="button"
                    size="lg"
                    onClick={markDone}
                    className="w-full rounded-xl border-2 border-green-500/40 bg-green-500/10 py-6 text-base font-semibold text-green-700 transition-all hover:bg-green-500/20"
                  >
                    {followed ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" /> Done following {handle}
                      </>
                    ) : (
                      <>
                        <Check className="h-5 w-5" /> I&apos;ve followed next step
                      </>
                    )}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border-2 border-border bg-muted py-6 text-base font-semibold text-muted-foreground"
                  >
                    <Clock className="h-5 w-5" /> Next step in {countdown}s…
                  </Button>
                )}
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

      <div className="space-y-8">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600">
              <Star className="h-4 w-4 fill-current" />
            </span>
            <h3 className="text-base font-bold text-foreground">
              Rate your experience
            </h3>
            <span className="ml-auto text-xs font-medium text-muted-foreground">
              Tap a star
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {renderStars('Session', sessionRating, setSessionRating)}
            {renderStars('Guidance', guidanceRating, setGuidanceRating)}
            {renderStars(
              'Project / Training',
              trainingRating,
              setTrainingRating
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-white/60 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
              <Clipboard className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold text-foreground">
              Copy-paste review templates
            </h3>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              (optional)
            </span>
            <button
              type="button"
              onClick={() => setShowTemplates((prev) => !prev)}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-border/70 bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-brand-400 hover:text-brand-600"
            >
              {showTemplates ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" /> Hide templates
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" /> Show templates
                </>
              )}
            </button>
          </div>
          {!showTemplates && (
            <p className="mt-2 text-sm text-muted-foreground">
              Need ready-made text for your Google review? Tap{' '}
              <span className="font-semibold text-brand-600">Show templates</span>{' '}
              to edit &amp; copy.
            </p>
          )}
          {showTemplates && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Edit to match your experience, then copy &amp; paste into the
                  Google review.
                </p>
                {/* <button
                  type="button"
                  onClick={() => {
                    const full =
                      `${sessionFeedback.trim()}\n\n${guidanceFeedback.trim()}\n\n${projectTrainingFeedback.trim()}`.trim();
                    copyToClipboard('all', full);
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-border/70 bg-white px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-brand-400 hover:text-brand-600"
                >
                  {copiedKey === 'all' ? (
                    <>
                      <ClipboardCheck className="h-3.5 w-3.5 text-green-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5" /> Copy all
                    </>
                  )}
                </button> */}
              </div>
              {renderCopyBlock(
                'session',
                'Session feedback',
                sessionFeedback,
                setSessionFeedback
              )}
              {renderCopyBlock(
                'guidance',
                'Guidance feedback',
                guidanceFeedback,
                setGuidanceFeedback
              )}
              {renderCopyBlock(
                'training',
                'Project / training feedback',
                projectTrainingFeedback,
                setProjectTrainingFeedback
              )}
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-500/10 via-white to-gold-500/15 p-1.5 shadow-inner">
          <div className="rounded-[1.2rem] bg-white/90 p-6 text-center md:p-8">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-xl shadow-brand-500/30">
                <Send className="h-6 w-6" />
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              Leave us a Google review
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Your feedback on Google helps more students, clients and partners
              find us. It takes just{' '}
              <span className="font-semibold text-foreground">30 seconds</span>.
            </p>

            <div className="mx-auto mb-6 flex max-w-sm flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-white p-4 text-left shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow ring-1 ring-border">
                <GoogleIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                  Google Review{' '}
                  <BadgeCheck className="h-4 w-4 text-brand-600" />
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  public · google.com/maps
                </p>
              </div>
              <span className="flex w-full shrink-0 justify-center gap-0.5 sm:w-auto sm:justify-end">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-gold-500 text-gold-500"
                  />
                ))}
              </span>
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                onClick={() => setReviewLeft(true)}
                className="w-full max-w-xs rounded-full bg-gradient-to-br from-gold-500 to-gold-600 py-5 text-base font-bold text-white shadow-lg shadow-gold-500/30 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <a
                  href={GOOGLE_REVIEW_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star className="h-5 w-5 fill-white" /> Write a review
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <label
              className={cn(
                'mt-6 flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-dashed px-4 py-3.5 text-sm transition-colors',
                reviewLeft
                  ? 'border-green-500/40 bg-green-50 text-green-700'
                  : 'border-border/70 text-muted-foreground hover:border-brand-400'
              )}
            >
              <Checkbox
                checked={reviewLeft}
                onCheckedChange={(checked) => setReviewLeft(checked === true)}
                className="border-brand-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              {reviewLeft ? (
                <span className="flex items-center gap-1.5 font-semibold">
                  <Check className="h-4 w-4" /> Feedback sent thank you!
                </span>
              ) : (
                <span className="font-medium">
                  Tick here once you&apos;ve submitted your review on Google
                </span>
              )}
            </label>
          </div>
        </div>

        {submitError && step === 'review' && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {submitError}
          </p>
        )}

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => goToStep('follow-1grow')}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting || !reviewLeft}
              className={cn(
                'rounded-xl py-5 text-base font-bold text-white shadow-lg transition-all',
                reviewLeft
                  ? 'bg-green-600 shadow-green-600/25 hover:bg-green-700 hover:shadow-xl'
                  : 'cursor-not-allowed bg-green-600/40 shadow-none'
              )}
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
            {!reviewLeft && (
              <p className="text-center text-xs font-medium text-muted-foreground sm:text-right">
                Tick the confirmation above after submitting your Google review
                to enable submit.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoneStep = () => {
    const firstName = (googleUser?.name || fullName || 'friend').split(' ')[0];

    return (
      <div className="animate-fade-in mx-auto max-w-2xl text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2
          className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
          style={{ fontFamily: 'var(--font-neue-machina)' }}
        >
          Thank you, <span className="text-[#1d36bf]">{firstName}!</span>
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
          Thank you for your valuable time and effort. Your feedback helps
          NexGenAds grow, and your words truly mean the world to us.
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/15 via-white to-gold-500/5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-gold-500/20 bg-gold-500/10 px-5 py-3">
              <p className="text-sm font-bold text-foreground">
                Your joke for today
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-5 py-5 text-center">
              {jokeLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
                </div>
              )}
              {!jokeLoading && !joke && (
                <p className="text-sm text-muted-foreground">
                  Couldn&apos;t fetch a joke right now — here&apos;s one anyway:
                  Why do programmers prefer dark mode? Because light attracts
                  bugs!
                </p>
              )}
              {!jokeLoading &&
                joke &&
                !joke.error &&
                (joke.joke || (joke.setup && joke.delivery)) && (
                  <>
          
                    <p className="whitespace-pre-line text-base font-medium leading-relaxed text-foreground">
                      {joke.joke || `${joke.setup}\n\n${joke.delivery}`}
                    </p>
                  </>
                )}
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 via-white to-brand-500/5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-brand-500/20 bg-brand-500/10 px-5 py-3">
             
              <p className="text-sm font-bold text-foreground">
                A fun image for you
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-5 py-5">
              {dogLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
                </div>
              )}
              {!dogLoading && dogImage && (
                <div className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                  <Image
                    src={dogImage}
                    alt="A cute doggo from Dog CEO"
                    width={480}
                    height={300}
                    className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              {!dogLoading && !dogImage && (
                <p className="text-sm text-muted-foreground">
                  Couldn&apos;t fetch a photo right now — maybe this good boy is
                  napping!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-border/60 bg-white p-5 shadow-sm">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold text-foreground">
            <ThumbsUp className="h-4 w-4 text-brand-600" /> Stay connected with
            NexGenAds
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href={NEXGENADS_INSTA}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 hover:shadow-md"
            >
              <Instagram className="h-4 w-4" /> @nexgenads.ai
            </a>
            <a
              href={ONEGROW_INSTA}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 hover:shadow-md"
            >
              <Instagram className="h-4 w-4" /> @1growofficial
            </a>
            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-white px-4 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-600 hover:shadow-md"
            >
              <Star className="h-4 w-4" /> Leave a review
            </a>
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline"
            className="rounded-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </Button>
          <Button
            type="button"
            onClick={() => {
              setRole(null);
              setNexgenadsOpened(false);
              setOnedotgrowOpened(false);
              setNexgenadsFollowed(false);
              setOnedotgrowFollowed(false);
              setNexgenadsCountdown(0);
              setOnedotgrowCountdown(0);
              setSessionFeedback(SESSION_TEMPLATE);
              setGuidanceFeedback(GUIDANCE_TEMPLATE);
              setProjectTrainingFeedback(TRAINING_TEMPLATE);
              setReviewLeft(false);
              setShowTemplates(false);
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
              setCustomDomains([]);
              setNewDomain('');
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