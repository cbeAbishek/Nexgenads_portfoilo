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
    "NexGenAds | AI-Driven Technology Company - Software, AI Automation and Digital Growth",
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
  authors: [{ name: "NexGenAds" }],
  creator: "NexGenAds",
  publisher: "NexGenAds",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "NexGenAds | AI-Driven Technology Company",
    description:
      "Build, automate, and scale with NexGenAds - software, AI, digital transformation, and intelligent marketing solutions.",
    siteName: "NexGenAds",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
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
      "Software, AI automation, SaaS, and intelligent marketing - build, automate, and scale with NexGenAds.",
    images: ["/og.png"],
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
              "@id": `${SITE_URL}/#organization`,
              name: "NexGenAds",
              legalName: "NexGenAds Technologies Private Limited",
              alternateName: "NexGenAds Technologies",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              slogan:
                "We build, automate, and scale intelligent businesses with software, AI, and intelligent marketing.",
              foundingDate: "2024",
              email: "contact@nexgenads.space",
              telephone: "+91-95663-72450",
              description:
                "AI-driven technology company building software, AI automation, and intelligent marketing solutions.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "1/53, Keerthy Complex, opp to Police station, Periyanayackanpalayam",
                addressLocality: "Coimbatore",
                addressRegion: "Tamil Nadu",
                postalCode: "641020",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 11.016844,
                longitude: 76.955833,
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+91-95663-72450",
                email: "contact@nexgenads.space",
                areaServed: "IN",
                availableLanguage: "en",
              },
              sameAs: [
                "https://www.linkedin.com/company/nexgenads-ai/",
                "https://www.instagram.com/nexgenads.ai",
                "https://www.facebook.com/share/1aP2yyEf6U/",
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
              name: "NexGenAds",
              url: SITE_URL,
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
