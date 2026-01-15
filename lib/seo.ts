import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

const SITE_URL = "https://nexgenads.space";
const SITE_NAME = "NexGenAds";
const DEFAULT_OG_IMAGE = "https://nexgenads.space/NexGenAds_meta.jpg";
const TWITTER_HANDLE = "@nexgenads";

/**
 * Generate comprehensive SEO metadata for pages
 */
export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    author,
    publishedTime,
    modifiedTime,
    noindex = false,
  } = config;

  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      type: ogType,
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };

  // Add article-specific metadata
  if (ogType === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: author ? [author] : undefined,
      section: "Outdoor Advertising",
      tags: keywords,
    };
  }

  return metadata;
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: config.title,
    description: config.description,
    image: config.image || DEFAULT_OG_IMAGE,
    author: {
      "@type": "Person",
      name: config.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: config.publishDate,
    dateModified: config.modifiedDate || config.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": config.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for person/profile
 */
export function generatePersonSchema(config: {
  name: string;
  jobTitle: string;
  email: string;
  url: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.name,
    jobTitle: config.jobTitle,
    email: config.email,
    url: config.url,
    sameAs: config.sameAs || [],
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
