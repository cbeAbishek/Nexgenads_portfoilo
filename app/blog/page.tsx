import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    slug: 'tamil-nadu-advertising-insights-2025',
    title: 'Tamil Nadu Advertising Insights 2025: Hyperlocal is the New Prime Time',
    excerpt:
      'See how brands across Coimbatore, Chennai, and Madurai are blending DOOH, cinema, and creator-led storytelling to reach Tamil audiences in 2025.',
    date: 'Jan 12, 2025',
    author: 'NexGenAds Research Desk',
    readingTime: '6 min read',
  coverImage: null,
  imageAlt: 'Colourful advertising montage from Tamil Nadu cities',
    tags: ['Research', 'Tamil Nadu', 'Trends'],
    videoId: '2iVABWWmcfc',
    externalLink: 'https://www.youtube.com/watch?v=2iVABWWmcfc',
  },
  {
    slug: 'mediator-playbook',
    title: 'The Mediator Playbook: Smart Workflows for Outdoor Ad Brokers',
    excerpt:
      'From rate card transparency to QR-powered site audits, here is how mediators can close deals faster with NexGenAds automation.',
    date: 'Dec 28, 2024',
    author: 'Ananya Raman, Partnerships Lead',
    readingTime: '5 min read',
  coverImage: null,
  imageAlt: 'Outdoor advertising mediator reviewing digital tools',
    tags: ['Guides', 'Product'],
    externalLink: 'https://www.linkedin.com/company/nexgenads/',
  },
  {
    slug: 'designers-motion-toolkit',
    title: 'Motion Toolkit: Designers Building Tamil-First Ad Experiences',
    excerpt:
      'Templates, font pairings, and voiceover best practices for short-format ads that convert on Tamil OTT and elevator screens.',
    date: 'Nov 15, 2024',
    author: 'Creative Studio @ NexGenAds',
    readingTime: '7 min read',
  coverImage: null,
  imageAlt: 'Designer working on motion graphics for Tamil OTT campaign',
    tags: ['Design', 'How-To'],
  },
];

export const metadata = {
  title: 'NexGenAds Blog | Advertising Insights, Playbooks & Tamil Nadu Marketing Trends',
  description:
    'Expert insights on advertising in Tamil Nadu and India. Deep-dives into DOOH, cinema advertising, hyperlocal marketing, and AI-powered ad-tech. Playbooks for advertisers, mediators, designers, and ad space owners. Stay updated with the latest marketing trends, Tamil-first advertising strategies, and industry best practices from NexGenAds.',
  keywords: [
    'advertising blog India',
    'Tamil Nadu marketing insights',
    'ad-tech blog',
    'DOOH advertising trends',
    'hyperlocal marketing India',
    'cinema advertising insights',
    'outdoor advertising blog',
    'advertising playbooks',
    'marketing strategies India',
    'Tamil advertising best practices',
    'advertising industry news',
    'media buying tips',
    'creative advertising insights',
    'advertising technology blog',
    'marketing automation insights',
    'regional advertising trends',
    'Coimbatore marketing',
    'Chennai advertising trends',
    'advertising case studies India',
    'marketing research Tamil Nadu',
  ].join(', '),
  openGraph: {
    title: 'NexGenAds Blog | Tamil Nadu Marketing & Advertising Insights',
    description: 'Expert playbooks, trends, and insights for advertisers, mediators, and designers in India.',
    images: [
      {
        url: 'https://nexgenads.space/NexGenAds_meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NexGenAds Blog - Advertising Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexGenAds Blog | Advertising Playbooks & Insights',
    description: 'Tamil Nadu marketing trends, DOOH insights, and advertising best practices',
    images: ['https://nexgenads.space/NexGenAds_meta.jpg'],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-white">
      <header className="section-padding border-b border-white/5 bg-white/5 backdrop-blur-xl">
        <div className="container-custom max-w-5xl py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
            Insights & Stories
          </div>
          <h1 className="mt-6 text-3xl font-bold md:text-5xl">
            Learnings from the ground-up advertising network redefining Tamil Nadu campaigns.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">
            We publish research, workflow playbooks, and behind-the-scenes stories from our product and partnerships teams. New posts drop twice a month, spanning outdoor, cinema, digital screens, and community media in Tamil Nadu.
          </p>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-custom grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF]/40 hover:bg-white/10"
            >
              <div className="relative mb-5 h-56 overflow-hidden rounded-2xl bg-black/40">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: 'radial-gradient(circle at top, rgba(0,217,255,0.35), transparent 60%), radial-gradient(circle at bottom, rgba(168,85,247,0.35), transparent 55%)',
                    }}
                  />
                )}
                {post.videoId && (
                  <div className="absolute inset-x-4 bottom-4 overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-lg">
                    <iframe
                      className="h-40 w-full"
                      src={`https://www.youtube.com/embed/${post.videoId}`}
                      title={post.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#00D9FF]/90">
                <span className="rounded-full bg-[#00D9FF]/10 px-3 py-1 font-medium">
                  {post.date}
                </span>
                <span className="rounded-full bg-[#A855F7]/10 px-3 py-1 font-medium">
                  {post.readingTime}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-white transition-colors group-hover:text-[#00D9FF]">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/60">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-white/60">
                <span>By {post.author}</span>
                <Link
                  href={post.externalLink || `/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#00D9FF]/60 hover:text-[#00D9FF]"
                >
                  {post.externalLink ? 'Watch / Read' : 'Read Story'}
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="container-custom mt-16 max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#00D9FF]/10 via-transparent to-[#A855F7]/10 p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">Get blog drops before anyone else</h2>
          <p className="mt-2 text-sm text-white/70">
            Join the priority waitlist for curated Tamil Nadu ad case studies, product changelog, and PWA alerts.
          </p>
          <Link
            href="/waitlist"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Join waitlist &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}
