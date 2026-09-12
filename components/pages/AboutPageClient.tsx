"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Brain,
  Eye,
  Heart,
  Linkedin,
  MapPin,
  Rocket,
  Shield,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackdrop from "@/components/ui/hero-backdrop";

const teamMembers = [
  {
    name: "Abishek G",
    role: "Founder & CEO",
    description:
      "Sets the product and engineering vision, keeping the team focused on building intelligent software.",
    image: "/team/abi.png",
    linkedin: "https://www.linkedin.com/in/abishek-cbe/",
    badgeClass: "bg-brand-500/10 text-brand-600 border-brand-500/20",
    barClass: "bg-brand-500",
  },
  {
    name: "Mohammed Jubair",
    role: "Co-founder & COO",
    description:
      "Leads operations, partnerships, and go-to-market strategy for NexGen's services and products.",
    image: "/team/jubair.png",
    linkedin: "https://www.linkedin.com/in/mohammed-jubair-572862334/",
    badgeClass: "bg-gold-500/10 text-gold-600 border-gold-500/25",
    barClass: "bg-gold-500",
  },
  {
    name: "Sarran M",
    role: "CTO - Chief Technology Officer",
    description:
      "Leads architecture, AI product strategy, and technical innovation to ship scalable, intelligent platforms.",
    image: "/team/sarran.png",
    linkedin: "https://www.linkedin.com/in/sarran-m-52a96a331/",
    badgeClass: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    barClass: "bg-violet-500",
  },
  {
    name: "Semmozhiyan N S",
    role: "Site Reliability Engineer",
    description:
      "Keeps our infrastructure fast, reliable, and always-on with automation-first operations.",
    image: "/team/sem.png",
    linkedin: "https://www.linkedin.com/in/semmozhiyan-dev/",
    badgeClass: "bg-teal-500/10 text-teal-600 border-teal-500/20",
    barClass: "bg-teal-500",
  },
  {
    name: "Naveen K",
    role: "UI/UX Engineer",
    description:
      "Crafts clean, intuitive interfaces and design systems that make complex products feel effortless.",
    image: "/team/naveen.png",
    linkedin: "https://www.linkedin.com/in/naveen-k2008/",
    badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    barClass: "bg-rose-500",
  },
  {
    name: "Nakshatra V",
    role: "Technical Support Engineer",
    description:
      "Provides fast, reliable technical support, troubleshooting, and customer success for NexGen's platforms.",
    image: "/team/nak.png",
    linkedin: "https://www.linkedin.com/in/nakshatra-veera-ragavan-279861335/",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    barClass: "bg-emerald-500",
  },
];

const stats = [
  { value: "12+", label: "Projects delivered", accent: "#008dec" },
  { value: "10+", label: "Industries served", accent: "#1d36bf" },
  { value: "98%", label: "Client satisfaction", accent: "#f3a800" },
  { value: "2024", label: "Founded in Coimbatore", accent: "#f30a29" },
];

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Honest communication and clear estimates with every client.",
    chip: "bg-brand-500/10 text-brand-600",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We design and build around the people who use our software.",
    chip: "bg-ink-600/10 text-ink-700",
  },
  {
    icon: Brain,
    title: "Innovation",
    description:
      "Continuously pushing boundaries with AI and modern engineering.",
    chip: "bg-gold-500/10 text-gold-600",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Enterprise-grade quality in everything we ship.",
    chip: "bg-crimson-500/10 text-crimson-600",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Founded in Coimbatore",
    body: "NexGenAds starts as a team of engineers building software and automation for local businesses.",
  },
  {
    year: "2025",
    title: "Product portfolio",
    body: "Websites, apps, ERP/CRM, AI automation, and the 1Grow SaaS platform ship to clients across industries.",
  },
  {
    year: "2026",
    title: "AI-first company",
    body: "GEO/AEO, AI agents, and intelligent automation become core offerings for growth-focused businesses.",
  },
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/70 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600 shadow-sm backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/70 bg-white/75 shadow-lg shadow-brand-500/5 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

const AboutPageClient = () => {
  return (
    <div className="pb-16  md:pb-24 ">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-brand-500/10">
        <HeroBackdrop />
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden
        />
        <div className="container-shell relative py-16 text-center md:py-24">
          <Reveal delay={0.05}>
            <Eyebrow>About NexGenAds</Eyebrow>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mx-auto max-w-4xl text-balance text-5xl font-bold leading-[1.06] tracking-tight text-ink-700 sm:text-6xl md:text-7xl">
              We build, automate and scale{" "}
              <span className="text-gradient-brand">
                intelligent businesses
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              NexGenAds is an AI-driven technology company helping businesses
              grow through software, AI, digital transformation, and intelligent
              marketing - founded in Coimbatore, built for the world.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {["Software & Apps", "AI & Automation", "Digital Growth"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-700 shadow-sm backdrop-blur transition-colors hover:border-brand-500/30 hover:text-brand-600"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-500" />
                Coimbatore, India
              </span>
              <span className="h-1 w-1 rounded-full bg-gold-500" />
              <span>Founded 2024</span>
              <span className="h-1 w-1 rounded-full bg-crimson-500" />
              <span>AI-first engineering</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Story + Mission/Vision */}
      <section className="container-shell py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
              From engineering problem-solvers to AI technology partner
            </h2>
            <div className="mt-4 h-[3px] w-20 rounded-full bg-brand-500" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                NexGenAds started with a simple belief: businesses
                shouldn&apos;t have to choose between technology, automation,
                and growth - they should get all three from one accountable
                partner.
              </p>
              <p>
                We began by building websites, apps, and internal systems for
                businesses in Coimbatore. As our clients grew, their problems
                grew too: scattered data, manual workflows, and marketing that
                couldn&apos;t be measured. So we expanded into ERP/CRM, AI
                automation, and data-driven growth marketing.
              </p>
              <p>
                Today NexGenAds is a full-stack technology company - engineering
                enterprise-grade software, deploying AI agents and chatbots,
                building SaaS platforms like 1Grow, and running SEO, GEO, and
                AEO programmes that get brands found in the AI era.
              </p>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <GlassCard className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-ink-700">Our Mission</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Empower businesses through intelligent software, automation,
                  and digital innovation that accelerates sustainable growth.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-600/10 text-ink-700">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-ink-700">Our Vision</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Build the world&apos;s largest AI-powered physical advertising
                  ecosystem - seamlessly connecting digital marketing with
                  intelligent real-world advertising infrastructure through
                  software, automation, AI, IoT, and data intelligence.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-shell py-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <GlassCard className="p-6 text-center">
                <div
                  className="font-display text-3xl font-bold md:text-4xl"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium text-muted-foreground">
                  {s.label}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white/50 py-14 md:py-20">
        <div className="container-shell">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Our journey</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
              Milestones so far
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-brand-500" />
          </Reveal>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <GlassCard className="h-full p-6">
                  <span className="font-mono text-sm font-bold text-gold-600">
                    {t.year}
                  </span>
                  <h3 className="mt-2 font-semibold text-ink-700">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-shell py-14 md:py-20">
        <Reveal className="mb-12 text-center">
          <Eyebrow>Values</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
            The principles that guide us
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-brand-500" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <GlassCard className="h-full p-7 text-center">
                <div
                  className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${v.chip}`}
                >
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-ink-700">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white/50 py-16 md:py-24">
        <div className="container-shell">
          <Reveal className="mb-10 text-center md:mb-14">
            <Eyebrow>Our Team</Eyebrow>

            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
              The people behind NexGenAds
            </h2>

            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full bg-brand-500"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.1} className="h-full">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-lg shadow-brand-500/5 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-500/15 focus-within:ring-2 focus-within:ring-brand-500/40"
                >
                  {/* <div
                    className={`absolute inset-x-0 top-0 z-10 h-1 ${member.barClass}`}
                    aria-hidden="true"
                  /> */}

                  {/* Image ratio: 9:6 */}
                  <div className="relative aspect-[9/6] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(min-width: 1024px) 520px, (min-width: 768px) 46vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                    />

                    {/* Bottom gradient for better contrast */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/5 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Subtle shine effect */}
                    <div
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out motion-safe:group-hover:translate-x-full"
                      aria-hidden="true"
                    />

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                      <Linkedin className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
                    <h3 className="text-lg font-bold tracking-tight text-ink-700 sm:text-xl">
                      {member.name}
                    </h3>

                    <span
                      className={`mx-auto mt-3 inline-block w-fit rounded-full border px-3 py-1 text-xs font-semibold ${member.badgeClass}`}
                    >
                      {member.role}
                    </span>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.925rem]">
                      {member.description}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shell py-14 md:py-20">
        <GlassCard className="relative overflow-hidden p-10 text-center sm:p-14">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-brand-500"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-grid opacity-30 mask-fade-b"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-ink-700 sm:text-4xl">
              Let&apos;s build the future together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Whether you&apos;re looking for software, automation, or a growth
              partner - the NexGenAds team is ready.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-brand-500 px-8 font-semibold text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] hover:bg-brand-600"
            >
              <Link href="/contact">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default AboutPageClient;
