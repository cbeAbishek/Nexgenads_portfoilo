import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NexGenAds",
  description:
    "The page you are looking for does not exist or has been moved. Return to NexGenAds home.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,141,236,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(29,54,191,0.10),transparent_45%)]"
      />
      <div className="text-center">
        <p className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-[120px] font-black leading-none text-transparent md:text-[160px]">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          The page you are looking for does not exist, was removed, or has moved
          to a new location.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
