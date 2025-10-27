'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2, MapPin, Phone, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PushSubscriptionPrompt from '@/components/pwa/PushSubscriptionPrompt';

const userTypes = [
  { value: 'advertiser', label: 'Advertiser' },
  { value: 'mediator', label: 'Media Partner' },
  { value: 'designer', label: 'Designer' },
  { value: 'ad_space_owner', label: 'Ad Space Owner' },
  { value: 'enthusiast', label: 'Startup Enthusiast' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COMMON_EMAIL_MISTYPES: Record<string, string> = {
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'hotnail.com': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
};

export default function WaitlistPageClient() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(userTypes[0].value);
  const [district, setDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [phoneSuggestion, setPhoneSuggestion] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'success' | 'error' | 'denied' | 'unsupported'>('idle');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const normalisedPhoneDigits = useMemo(() => phone.replace(/[^\d]/g, ''), [phone]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setLocationStatus('unsupported');
      return;
    }

    let active = true;
    const abortController = new AbortController();

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (!active) return;
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        setLocationStatus('success');
        setIsLocating(false);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`,
            {
              signal: abortController.signal,
              headers: {
                Accept: 'application/json',
              },
            }
          );

          if (!response.ok) throw new Error('Failed to reverse geocode');

          const data = await response.json();
          const address = data?.address ?? {};
          const locality = address.city || address.town || address.village || address.suburb || data?.name;
          const districtName = address.state_district || address.county;
          const stateName = address.state || address.region;
          const composed = [locality, districtName, stateName].filter(Boolean).join(', ');

          setDistrict((current) => current || composed || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        } catch (error) {
          console.warn('Reverse geocode failed', error);
        }
      },
      (error) => {
        if (!active) return;
        console.warn('Geolocation error', error);
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('denied');
        } else {
          setLocationStatus('error');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );

    return () => {
      active = false;
      abortController.abort();
    };
  }, []);

  const getEmailSuggestion = (value: string): string | null => {
    const [userPart, domainPart] = value.split('@');
    if (!userPart || !domainPart) return null;
    const suggestion = COMMON_EMAIL_MISTYPES[domainPart.toLowerCase()];
    return suggestion ? `${userPart}@${suggestion}` : null;
  };

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const errors: string[] = [];

    setEmailSuggestion(null);
    setPhoneSuggestion(null);

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('Please enter a valid email address.');
      const suggestion = getEmailSuggestion(trimmedEmail);
      if (suggestion) setEmailSuggestion(suggestion);
    }

    if (trimmedPhone) {
      const digits = normalisedPhoneDigits;

      if (digits.length === 11 && digits.startsWith('0')) {
        setPhoneSuggestion(digits.slice(1));
      } else if (digits.length === 12 && digits.startsWith('91')) {
        setPhoneSuggestion(digits.slice(-10));
      }

      if (digits.length !== 10) {
        errors.push('Mobile numbers should contain exactly 10 digits.');
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    setValidationErrors([]);

    try {
      if (!validateForm()) {
        setFeedback({
          type: 'error',
          message: 'Please review the highlighted suggestions before submitting.',
        });
        return;
      }

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: email.trim(),
          userType,
          district,
          phone: normalisedPhoneDigits ? `+91${normalisedPhoneDigits}` : undefined,
          businessName,
          message,
          source: 'waitlist_page',
          coordinates,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
        return;
      }

      setFeedback({
        type: 'success',
        message: '🎉 Thanks! Your details are now on our early access list.',
      });

      setFullName('');
      setEmail('');
      setDistrict('');
      setPhone('');
      setBusinessName('');
      setMessage('');
      setValidationErrors([]);
      setEmailSuggestion(null);
      setPhoneSuggestion(null);
    } catch (error) {
      console.error('Waitlist submit error:', error);
      setFeedback({
        type: 'error',
        message: 'We could not reach the server. Please try once more.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background">
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="glass-effect-strong rounded-3xl p-10 md:p-14 space-y-10">
            <header className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-sm text-white/80">Built for Tamil Nadu businesses</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Power your next campaign across Tamil Nadu with <span className="text-gradient">NexGenAds</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
                Share a few details so we can send you product updates, launch invites, and partner opportunities tailored for Tamil Nadu brands and creatives.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Full name</label>
                  <Input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your first and last name"
                    required
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    required
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                  {emailSuggestion && (
                    <p className="text-xs text-amber-200">
                      Did you mean <button type="button" className="underline" onClick={() => setEmail(emailSuggestion)}>{emailSuggestion}</button>?
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/80">How do you identify?</label>
                  <div className="relative">
                    <select
                      value={userType}
                      onChange={(event) => setUserType(event.target.value)}
                      disabled={isSubmitting}
                      className="w-full appearance-none bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D9FF]"
                    >
                      {userTypes.map((type) => (
                        <option key={type.value} value={type.value} className="text-black">
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <Sparkles className="w-4 h-4 text-[#00D9FF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Which district are you from?
                  </label>
                  <Input
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                    placeholder="Coimbatore, Chennai, Madurai..."
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                  <div className="min-h-[1.25rem] text-xs text-white/60 flex items-center gap-2">
                    {isLocating && <Loader2 className="h-4 w-4 animate-spin" />}
                    {locationStatus === 'success' && !isLocating && 'Location detected automatically. Feel free to adjust.'}
                    {locationStatus === 'denied' && !isLocating && (
                      <span className="flex items-center gap-1 text-amber-200">
                        <ShieldAlert className="h-3 w-3" /> Location access denied. You can still enter your district manually.
                      </span>
                    )}
                    {locationStatus === 'unsupported' && !isLocating && 'Location detection is not supported on this device.'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/80 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact number (optional)
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="10 digit mobile"
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                  {phoneSuggestion && (
                    <p className="text-xs text-amber-200">
                      Tip: try <button type="button" className="underline" onClick={() => setPhone(phoneSuggestion)}>{phoneSuggestion}</button> as your 10-digit mobile.
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Business or brand name (optional)</label>
                  <Input
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    placeholder="Tell us the name people know you by"
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">What support are you looking for? (optional)</label>
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Share campaign goals, marketing needs, or ad spaces you want to fill..."
                  rows={4}
                  disabled={isSubmitting}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {feedback && (
                <div
                  className={`rounded-xl border px-4 py-4 text-sm flex items-start gap-2 ${
                    feedback.type === 'success'
                      ? 'border-green-400/40 bg-green-400/10 text-green-100'
                      : 'border-red-400/40 bg-red-400/10 text-red-100'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              {validationErrors.length > 0 && (
                <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                  <ul className="list-disc space-y-1 pl-5">
                    {validationErrors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-lg py-6"
              >
                {isSubmitting ? 'Submitting your details...' : 'Join the priority waitlist'}
              </Button>
            </form>

            <PushSubscriptionPrompt
              className="mt-6"
              metadata={{ source: 'waitlist_page', coordinates }}
              interests={[userType]}
            />

            <footer className="text-center text-xs text-white/50">
              Your responses are stored securely in Supabase and used only for NexGenAds launch updates.
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}

