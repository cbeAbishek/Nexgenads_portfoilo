'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2, MapPin, Phone, ShieldAlert } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl pt-16 p-5 md:p-12 lg:p-14 space-y-10 border border-blue-100 shadow-xl">
            <header className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 px-5 py-2.5 rounded-full shadow-sm">
                <span className="text-sm font-medium text-gray-700">Built for Tamil Nadu businesses</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight text-gray-900">
                Power your next campaign across Tamil Nadu with <span className="text-blue-600">Nex</span><span className="text-red-600">Gen</span><span className="text-yellow-500">Ads</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Share a few details so we can send you product updates, launch invites, and partner opportunities tailored for Tamil Nadu brands and creatives.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full name <span className="text-red-500">*</span></label>
                  <Input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your first and last name"
                    required
                    disabled={isSubmitting}
                    className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    required
                    disabled={isSubmitting}
                    className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                  />
                  {emailSuggestion && (
                    <p className="text-xs text-amber-600 font-medium">
                      Did you mean <button type="button" className="underline text-blue-600 hover:text-blue-800" onClick={() => setEmail(emailSuggestion)}>{emailSuggestion}</button>?
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">How do you identify? <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={userType}
                      onChange={(event) => setUserType(event.target.value)}
                      disabled={isSubmitting}
                      className="w-full appearance-none bg-white border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-gray-900 transition-all shadow-sm hover:shadow-md focus:outline-none"
                    >
                      {userTypes.map((type) => (
                        <option key={type.value} value={type.value} className="text-gray-900">
                          {type.label}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    Which district are you from?
                  </label>
                  <Input
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                    placeholder="Coimbatore, Chennai, Madurai..."
                    disabled={isSubmitting}
                    className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                  />
                  <div className="min-h-[1.25rem] text-xs text-gray-500 flex items-center gap-2">
                    {isLocating && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
                    {locationStatus === 'success' && !isLocating && <span className="text-green-600">✓ Location detected automatically. Feel free to adjust.</span>}
                    {locationStatus === 'denied' && !isLocating && (
                      <span className="flex items-center gap-1 text-amber-600">
                        <ShieldAlert className="h-3 w-3" /> Location access denied. You can still enter your district manually.
                      </span>
                    )}
                    {locationStatus === 'unsupported' && !isLocating && 'Location detection is not supported on this device.'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-500" />
                    Contact number (optional)
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="10 digit mobile"
                    disabled={isSubmitting}
                    className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                  />
                  {phoneSuggestion && (
                    <p className="text-xs text-amber-600 font-medium">
                      Tip: try <button type="button" className="underline text-blue-600 hover:text-blue-800" onClick={() => setPhone(phoneSuggestion)}>{phoneSuggestion}</button> as your 10-digit mobile.
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Business or brand name (optional)</label>
                  <Input
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    placeholder="Tell us the name people know you by"
                    disabled={isSubmitting}
                    className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">What support are you looking for? (optional)</label>
                <Textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Share campaign goals, marketing needs, or ad spaces you want to fill..."
                  rows={4}
                  disabled={isSubmitting}
                  className="bg-white border-gray-200 hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all shadow-sm hover:shadow-md resize-none"
                />
              </div>

              {feedback && (
                <div
                  className={`rounded-xl border-2 px-5 py-4 text-sm font-medium flex items-start gap-3 shadow-md ${
                    feedback.type === 'success'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{feedback.type === 'success' ? '✅' : '⚠️'}</span>
                  <span>{feedback.message}</span>
                </div>
              )}

              {validationErrors.length > 0 && (
                <div className="rounded-xl border-2 border-amber-500 bg-amber-50 px-5 py-4 text-sm text-amber-700 font-medium">
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
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-lg py-6 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Submitting your details...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Join the priority waitlist
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
