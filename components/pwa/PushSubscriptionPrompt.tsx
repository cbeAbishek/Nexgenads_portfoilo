'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BellRing, CheckCircle2, ShieldAlert, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isPushNotificationSupported, PushSubscriptionStatus, urlBase64ToUint8Array } from '@/lib/pwa';

interface PushSubscriptionPromptProps {
  className?: string;
  metadata?: Record<string, unknown>;
  interests?: string[];
}

export default function PushSubscriptionPrompt({
  className,
  metadata = {},
  interests = [],
}: PushSubscriptionPromptProps) {
  const [status, setStatus] = useState<PushSubscriptionStatus>('idle');
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [error, setError] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const publicKey = useMemo(() => process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY, []);

  const sendSubscriptionToServer = useCallback(
    async (subscription: PushSubscription) => {
      try {
        const response = await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscription, metadata, interests }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Could not save subscription');
        }

        setStatus('success');
        setHasSubscription(true);
        setError(null);
      } catch (err) {
        console.error('Failed to store push subscription', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    },
    [interests, metadata]
  );

  useEffect(() => {
    const initialise = async () => {
      const supported = isPushNotificationSupported();
      setIsSupported(supported);

      if (!supported) {
        setStatus('unsupported');
        return;
      }

      try {
        const existingRegistration = await navigator.serviceWorker.getRegistration();
        if (!existingRegistration) {
          await navigator.serviceWorker.register('/sw.js');
        }

        const registration = await navigator.serviceWorker.ready;
        const currentSubscription = await registration.pushManager.getSubscription();

        if (currentSubscription) {
          setHasSubscription(true);
          setPermission(Notification.permission);
          setStatus('success');
          sendSubscriptionToServer(currentSubscription);
        }
      } catch (err) {
        console.error('Error initialising push notifications', err);
        setStatus('error');
        setError('Unable to prepare push notifications.');
      }
    };

    initialise();
  }, [sendSubscriptionToServer]);

  const handleSubscribe = useCallback(async () => {
    if (!isSupported) {
      setStatus('unsupported');
      setError('Push notifications are not supported on this device.');
      return;
    }

    if (!publicKey) {
      setStatus('error');
      setError('Push notifications are not configured.');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      let permissionState = permission;

      if (permissionState === 'default') {
        permissionState = await Notification.requestPermission();
        setPermission(permissionState);
      }

      if (permissionState !== 'granted') {
        setStatus('denied');
        setError('We need notification permission to keep you updated.');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (existingSubscription) {
        await sendSubscriptionToServer(existingSubscription);
        return;
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: new Uint8Array(urlBase64ToUint8Array(publicKey)),
      });

      await sendSubscriptionToServer(newSubscription);
    } catch (err) {
      console.error('Push subscription failed', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to subscribe.');
    }
  }, [isSupported, permission, publicKey, sendSubscriptionToServer]);

  if (!isSupported && status !== 'unsupported') {
    return null;
  }

  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-lg backdrop-blur-md',
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#00D9FF]/20 to-[#A855F7]/20 p-3 text-[#00D9FF]">
          {status === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <BellRing className="h-6 w-6" />}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Stay in the loop on your mobile</h3>
          <p className="text-sm text-white/70">
            Enable NexGenAds push notifications to get early access alerts, Tamil Nadu campaign spotlights, and launch invites straight to your device.
          </p>
          {status === 'denied' && (
            <p className="text-xs text-red-300">
              Notifications are disabled in your browser. You can re-enable them from your site settings to try again.
            </p>
          )}
          {status === 'unsupported' && (
            <p className="text-xs text-amber-200 flex items-center gap-1">
              <Smartphone className="h-4 w-4" /> Push notifications are not available on this browser.
            </p>
          )}
          {status === 'error' && error && (
            <p className="text-xs text-red-300 flex items-center gap-1">
              <ShieldAlert className="h-4 w-4" /> {error}
            </p>
          )}
          {status === 'success' && (
            <p className="text-xs text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> You&rsquo;re all set! We&rsquo;ll send curated updates for Tamil Nadu marketers soon.
            </p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 md:items-end">
        <Button
          type="button"
          onClick={handleSubscribe}
          disabled={status === 'loading' || status === 'success' || status === 'unsupported'}
          className="bg-gradient-to-r from-[#00D9FF] to-[#A855F7] px-5"
        >
          {status === 'loading' ? 'Enabling…' : hasSubscription ? 'Update my alerts' : 'Enable mobile alerts'}
        </Button>
        <p className="text-xs text-white/50">
          We send only high-value announcements. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
