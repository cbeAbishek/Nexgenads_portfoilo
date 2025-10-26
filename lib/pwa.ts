export function isPushNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const decoder =
    (typeof window !== 'undefined' && typeof window.atob === 'function' && window.atob.bind(window)) ||
    (typeof globalThis !== 'undefined' && typeof (globalThis as { atob?: typeof window.atob }).atob === 'function'
      ? (globalThis as { atob: typeof window.atob }).atob
      : undefined);

  if (!decoder) {
    throw new Error('Base64 decoding is not supported in this environment.');
  }

  const rawData = decoder(base64);
  const arrayBuffer = new ArrayBuffer(rawData.length);
  const outputArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export type PushSubscriptionStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'denied'
  | 'unsupported';
