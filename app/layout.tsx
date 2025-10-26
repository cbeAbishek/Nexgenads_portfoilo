import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

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

export const metadata: Metadata = {
  title: "NexGenAds - Intelligent Advertising Intermediary Platform | Coming Soon",
  description: "Bridging the gap between advertisers, mediators, designers, and ad space owners through one intelligent, transparent digital ecosystem. Based in Coimbatore, India.",
  keywords: "advertising platform, ad intermediary, Coimbatore startup, digital advertising, AI advertising, ad marketplace",
  authors: [{ name: "NexGenAds Team" }],
  creator: "NexGenAds",
  publisher: "NexGenAds",
  metadataBase: new URL('https://nexgenads.space'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexgenads.space",
    title: "NexGenAds - Intelligent Advertising Platform",
    description: "Revolutionary advertising intermediary platform connecting advertisers, mediators, designers, and ad space owners.",
    siteName: "NexGenAds",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NexGenAds Platform",
      },
    ],
  },
  icons: {
    icon: "/logo.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGenAds - Coming Soon",
    description: "Revolutionary advertising intermediary platform from Coimbatore",
    images: ["/twitter-image.jpg"],
    creator: "@nexgenads",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#00D9FF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Security Script - Disable DevTools */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Disable right-click
                document.addEventListener('contextmenu', function(e) {
                  e.preventDefault();
                  return false;
                }, false);

                // Disable keyboard shortcuts
                document.addEventListener('keydown', function(e) {
                  // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
                  if (
                    e.keyCode === 123 ||
                    (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
                    (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
                    (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
                    (e.ctrlKey && e.keyCode === 85)
                  ) {
                    e.preventDefault();
                    return false;
                  }
                }, false);

                // Detect DevTools open
                let devtoolsOpen = false;
                const threshold = 160;
                
                setInterval(function() {
                  if (
                    window.outerWidth - window.innerWidth > threshold ||
                    window.outerHeight - window.innerHeight > threshold
                  ) {
                    if (!devtoolsOpen) {
                      devtoolsOpen = true;
                      document.body.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:system-ui;background:linear-gradient(135deg,#0A0A0A,#1A1A1A);color:white;text-align:center;padding:20px;"><div style="font-size:48px;margin-bottom:20px;">⚠️</div><h1 style="font-size:32px;margin-bottom:10px;background:linear-gradient(to right,#00D9FF,#A855F7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Developer Tools Detected</h1><p style="font-size:18px;color:#999;">For security reasons, developer tools are disabled on this site.</p></div>';
                    }
                  } else {
                    devtoolsOpen = false;
                  }
                }, 500);

                // Disable console
                console.log = console.warn = console.error = console.info = console.debug = function() {};
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Preloader />
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
