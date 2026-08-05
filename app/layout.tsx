import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://nexgenads.space";

export const metadata: Metadata = {
  title:
    "NexGenAds | AI-Driven Technology Company - Software, AI Automation & Digital Growth",
  description:
    "NexGenAds is an AI-driven technology company helping businesses build, automate, and scale through software, AI, digital transformation, and intelligent marketing. Website & app development, ERP/CRM, AI automation, SaaS, SEO, GEO & AEO.",
  keywords: [
    "AI technology company",
    "software development company",
    "AI automation",
    "SaaS development",
    "ERP development",
    "CRM development",
    "mobile app development",
    "web application development",
    "digital transformation",
    "AI chatbots",
    "WhatsApp automation",
    "workflow automation",
    "digital marketing agency",
    "SEO company",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "UI UX design",
    "cloud solutions India",
    "NexGenAds Coimbatore",
  ].join(", "),
  authors: [{ name: "NexGen" }],
  creator: "NexGen",
  publisher: "NexGen",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "NexGenAds | AI-Driven Technology Company",
    description:
      "Build, automate, and scale with NexGenAds - software, AI, digital transformation, and intelligent marketing solutions.",
    siteName: "NexGen",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "NexGenAds - AI-Driven Technology Company",
      },
    ],
  },
  icons: {
    icon: "/logo.ico",
    apple: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGenAds | AI-Driven Technology Company",
    description:
      "Software, AI automation, SaaS, and intelligent marketing - build, automate, and scale with NexGen.",
    images: ["/logo.png"],
    creator: "@nexgen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#008dec" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WB1RJ9JHG3"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WB1RJ9JHG3');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NexGen",
              alternateName: "NexGenAds Technologies",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description:
                "AI-driven technology company building software, AI automation, and intelligent marketing solutions.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Coimbatore",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/company/nexgenads-ai/",
                "https://www.instagram.com/nexgenads.ai",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NexGen",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
