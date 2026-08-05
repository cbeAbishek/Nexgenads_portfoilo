"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Brain,
  Boxes,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Gauge,
  Globe,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Palette,
  Phone,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackdrop from "@/components/ui/hero-backdrop";
import { services } from "@/lib/data/services";
import { blogPosts } from "@/lib/content";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-50 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-3xl md:mb-16",
        center && "mx-auto text-center",
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

const serviceIcons: Record<string, React.ElementType> = {
  code: Code2,
  layout: LayoutDashboard,
  smartphone: Smartphone,
  boxes: Boxes,
  users: Users,
  terminal: Terminal,
  brain: Brain,
  bot: Bot,
  message: MessageSquare,
  workflow: Workflow,
  cloud: Cloud,
  megaphone: Megaphone,
  search: Search,
  palette: Palette,
  server: Server,
};

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      {/* Background */}
      <HeroBackdrop />

      <div className="container-shell">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80">
              AI-driven software, automation &amp; digital growth
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-balance text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl md:text-7xl">
              We build, automate, and scale{" "}
              <span className="text-gradient-brand">
                intelligent businesses
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              NexGen is an AI-driven technology company. We design software,
              deploy AI automation, and engineer growth systems that move your
              business forward - from web apps and ERP/CRM to AI chatbots and
              intelligent marketing.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-brand-gradient px-8 text-base font-semibold shadow-xl shadow-brand-500/25 transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <Link href="/contact">
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-border bg-card px-8 text-base font-semibold sm:w-auto"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {[
                "Web & App Development",
                "ERP / CRM",
                "AI Automation",
                "SaaS",
                "SEO · GEO · AEO",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-500" /> {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Hero visual - product/dashboard mock */}
        <Reveal delay={0.25}>
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-r from-crimson-500/20 via-gold-500/15 to-brand-500/25 blur-2xl"
              aria-hidden
            />
            <DashboardMock />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-500/20 bg-white shadow-2xl shadow-brand-900/10">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-brand-300" />
        <span className="h-3 w-3 rounded-full bg-brand-400" />
        <span className="h-3 w-3 rounded-full bg-ink-600/70" />
        <div className="ml-4 hidden items-center gap-2 rounded-lg bg-card px-3 py-1 text-xs text-muted-foreground sm:flex">
          <Globe className="h-3.5 w-3.5 text-brand-500" /> app.nexgen.ai/growth
        </div>
      </div>
      <div className="grid gap-0 sm:grid-cols-[1fr_2fr]">
        {/* sidebar */}
        <div className="hidden border-r border-border bg-muted/30 p-5 sm:block">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-gradient" />
            <div>
              <p className="text-sm font-bold leading-none">1Grow</p>
              <p className="text-[10px] text-muted-foreground">
                Sales &amp; Marketing OS
              </p>
            </div>
          </div>
          <ul className="space-y-1 text-sm">
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: Users, label: "Leads" },
              { icon: MessageSquare, label: "WhatsApp" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Workflow, label: "Automation" },
            ].map((it) => (
              <li
                key={it.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground",
                  it.active && "bg-brand-500/10 font-semibold text-brand-600",
                )}
              >
                <it.icon className="h-4 w-4" /> {it.label}
              </li>
            ))}
          </ul>
        </div>
        {/* main panel */}
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly pipeline</p>
              <p className="font-display text-3xl font-bold text-foreground">
                ₹12.4L
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> +38% MoM
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "New leads", value: "1,284", icon: Users },
              { label: "Closed deals", value: "96", icon: Target },
              { label: "Conv. rate", value: "7.5%", icon: Gauge },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-muted/40 p-3"
              >
                <s.icon className="mb-2 h-4 w-4 text-brand-500" />
                <p className="font-display text-lg font-bold leading-none text-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          {/* fake chart */}
          <div className="mt-6 flex h-28 items-end gap-2 rounded-2xl border border-border bg-muted/40 p-4">
            {[35, 55, 40, 62, 48, 70, 58, 82, 66, 90, 74, 100].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={cn(
                  "flex-1 rounded-t-md bg-gradient-to-t from-brand-500 to-brand-300",
                  i >= 8 && "from-ink-600 to-brand-400",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Stats strip ------------------------------ */

const stats = [
  { value: "120+", label: "Projects delivered" },
  { value: "40+", label: "Industries served" },
  { value: "98%", label: "Client satisfaction" },
  { value: "24/7", label: "Dedicated support" },
];

function Stats() {
  return (
    <section className="border-y border-border bg-muted/40 py-12">
      <div className="container-shell">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="text-center">
              <p className="font-display text-3xl font-bold text-gradient-brand md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Company overview ---------------------------- */

function CompanyOverview() {
  const items = [
    {
      icon: Code2,
      title: "What we build",
      body: "Websites, web & mobile apps, ERP/CRM, SaaS platforms, and custom software engineered to scale.",
    },
    {
      icon: Bot,
      title: "How we automate",
      body: "AI chatbots, WhatsApp automation, workflow pipelines, and AI agents that remove repetitive work.",
    },
    {
      icon: TrendingUp,
      title: "How we grow",
      body: "Digital marketing, SEO, GEO & AEO, and conversion systems that turn traffic into revenue.",
    },
  ];
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Who we are"
          title={
            <>
              An engineering company,{" "}
              <span className="text-gradient-brand">not an agency</span>
            </>
          }
          subtitle="NexGen pairs deep software engineering with AI and growth expertise. One team - from architecture and build to automation and marketing."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="card-border h-full rounded-2xl bg-card p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {it.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Services grid ----------------------------- */

function ServicesOverview() {
  const featured = services.slice(0, 12);
  return (
    <section className="section-pad bg-gradient-to-b from-muted/40 to-background">
      <div className="container-shell">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything you need to{" "}
              <span className="text-gradient-brand">build &amp; grow</span>
            </>
          }
          subtitle="Sixteen capabilities under one roof - development, AI automation, and growth marketing working together."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => {
            const Icon = serviceIcons[s.icon] ?? Code2;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group card-border flex h-full flex-col rounded-2xl bg-card p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-ink-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Learn more{" "}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border bg-card"
          >
            <Link href="/services">
              View all 16 services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- 1Grow SaaS ------------------------------- */

function FeaturedSaaS() {
  const features = [
    {
      icon: Users,
      title: "CRM & Lead Management",
      body: "Every lead, follow-up, and deal in one pipeline.",
    },
    {
      icon: Bot,
      title: "AI Sales Assistant",
      body: "AI that qualifies, scores, and schedules leads.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      body: "Automated conversations and campaigns on WhatsApp.",
    },
    {
      icon: Workflow,
      title: "Marketing Automation",
      body: "Sequences that nurture leads while you sleep.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      body: "Pipeline, conversion, and campaign dashboards.",
    },
    {
      icon: Rocket,
      title: "Built to Scale",
      body: "Multi-tenant SaaS, enterprise-grade infrastructure.",
    },
  ];
  return (
    <section className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/70 via-background to-background"
        aria-hidden
      />
      <div className="container-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Flagship product"
              title={
                <>
                  Meet <span className="text-gradient-brand">1Grow</span> - your
                  sales &amp; marketing OS
                </>
              }
              subtitle="1Grow is an enterprise SaaS platform that unifies CRM, lead management, marketing automation, WhatsApp, analytics, and AI - so your team sells faster and grows predictably."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.04}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-brand-gradient px-7 font-semibold shadow-lg shadow-brand-500/25"
              >
                <Link href="/products/1grow">
                  Explore 1Grow <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border bg-card"
              >
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </div>
          </div>
          <Reveal delay={0.1}>
            <DashboardMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Industries ------------------------------- */

const industries = [
  { icon: ShieldCheck, name: "Healthcare" },
  { icon: Boxes, name: "Manufacturing" },
  { icon: Globe, name: "Retail" },
  { icon: GraduationIcon, name: "Education" },
  { icon: BuildingIcon, name: "Real Estate" },
  { icon: HotelIcon, name: "Hospitality" },
  { icon: LandmarkIcon, name: "Finance" },
  { icon: ConstructionIcon, name: "Construction" },
  { icon: Rocket, name: "Startups" },
  { icon: Users, name: "SMEs" },
  { icon: Cpu, name: "Enterprise" },
];

function Industries() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              Trusted across{" "}
              <span className="text-gradient-brand">every industry</span>
            </>
          }
          subtitle="From healthcare and manufacturing to startups and enterprise - solutions tailored to your domain."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((it, i) => (
            <Reveal key={it.name} delay={(i % 6) * 0.03}>
              <div className="card-border flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center">
                <it.icon className="h-6 w-6 text-brand-500" />
                <span className="text-sm font-semibold">{it.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Case studies ------------------------------ */

const caseStudies = [
  {
    category: "ERP",
    title: "Production ERP for a manufacturing group",
    result: "42% less manual data entry",
    gradient: "bg-brand-gradient",
  },
  {
    category: "AI",
    title: "WhatsApp AI assistant for a real-estate firm",
    result: "3× faster lead response",
    gradient: "bg-brand-gradient",
  },
  {
    category: "SEO · GEO",
    title: "Growth engine for a SaaS startup",
    result: "5.2× organic traffic in 8 months",
    gradient: "bg-brand-gradient",
  },
];

function CaseStudies() {
  return (
    <section className="section-pad bg-muted/40">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Case studies"
          title={
            <>
              Outcomes our clients{" "}
              <span className="text-gradient-brand">actually get</span>
            </>
          }
          subtitle="A preview of recent engagements. Explore the full portfolio for problem, process, technology, and results."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <Link
                href="/portfolio"
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div
                  className={cn(
                    "flex h-36 items-end justify-between p-5",
                    c.gradient,
                  )}
                >                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">
                    {c.category}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" /> {c.result}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border bg-card"
          >
            <Link href="/portfolio">
              Explore the portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Process --------------------------------- */

const processSteps = [
  {
    title: "Discovery",
    body: "Deep-dive workshops to understand your goals, users, and constraints.",
  },
  {
    title: "Strategy",
    body: "Architecture, roadmap, and a clear definition of success.",
  },
  {
    title: "Design",
    body: "UX flows and UI design systems, validated with real users.",
  },
  {
    title: "Development",
    body: "Agile sprints with weekly demos and continuous integration.",
  },
  {
    title: "Testing",
    body: "QA, performance, and security testing before anything ships.",
  },
  {
    title: "Deploy & Grow",
    body: "Launch, monitoring, optimisation, and ongoing support.",
  },
];

function Process() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A process built for{" "}
              <span className="text-gradient-brand">predictable delivery</span>
            </>
          }
          subtitle="Transparent, iterative, and designed to keep you in control at every stage."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 3) * 0.05}>
              <div className="relative card-border h-full rounded-2xl bg-card p-6">
                <span className="font-display text-4xl font-bold text-brand-500/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Tech stack ------------------------------- */

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Laravel",
  "Python",
  "Flutter",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "OpenAI",
  "LangChain",
  "Redis",
];

function TechStack() {
  return (
    <section className="border-y border-border bg-muted/40 py-14">
      <div className="container-shell">
        <Reveal className="mb-10 text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            The technology we ship with
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.map((t, i) => (
            <Reveal key={t} delay={i * 0.02}>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-brand-500/40 hover:text-brand-600">
                {t}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Why NexGen ------------------------------- */

const whyNexGen = [
  {
    icon: ShieldCheck,
    title: "Enterprise-grade",
    body: "Secure, scalable architecture built for production.",
  },
  {
    icon: Bot,
    title: "AI-first approach",
    body: "Intelligence baked into products and processes.",
  },
  {
    icon: Zap,
    title: "Fast delivery",
    body: "Agile sprints with weekly demos and fast iteration.",
  },
  {
    icon: Users,
    title: "Dedicated support",
    body: "A real team on call - before and after launch.",
  },
  {
    icon: Server,
    title: "Scalable architecture",
    body: "Designed to grow from MVP to enterprise load.",
  },
  {
    icon: Cpu,
    title: "Future-ready",
    body: "Modern stacks that stay current and maintainable.",
  },
];

function WhyNexGen() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Why NexGen"
          title={
            <>
              The partner you{" "}
              <span className="text-gradient-brand">keep for the long run</span>
            </>
          }
          subtitle="We combine engineering depth, AI capability, and growth expertise - so you get one accountable partner, not five vendors."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyNexGen.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.05}>
              <div className="card-border flex h-full gap-4 rounded-2xl bg-card p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <it.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {it.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Testimonials ------------------------------ */

const testimonials = [
  {
    quote:
      "NexGen rebuilt our ERP and automated our order workflows. We cut manual data entry by over 40% in the first quarter.",
    name: "Operations Head",
    role: "Manufacturing group, Coimbatore",
  },
  {
    quote:
      "The 1Grow demo sold us instantly. Since onboarding, our sales team has 3× more pipeline visibility and follow-ups that actually happen.",
    name: "Sales Director",
    role: "B2B services company",
  },
  {
    quote:
      "They think like engineers and market like growth people. Rare combination - our organic traffic is up 5× in eight months.",
    name: "Founder",
    role: "SaaS startup",
  },
];

function Testimonials() {
  return (
    <section className="section-pad bg-gradient-to-b from-muted/40 to-background">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Clients talk,{" "}
              <span className="text-gradient-brand">results answer</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="card-border flex h-full flex-col rounded-2xl bg-card p-7">
                <div className="mb-4 flex gap-1 text-brand-500" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M10 1l2.5 6.2L19 7.7l-5 4.1 1.5 6.2L10 14.8 4.5 18l1.5-6.2-5-4.1 6.5-.5L10 1z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Blog preview ----------------------------- */

function BlogPreview() {
  const posts = blogPosts.filter((p) => p.status === "published").slice(0, 3);
  return (
    <section className="section-pad">
      <div className="container-shell">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            center={false}
            eyebrow="Insights"
            title={
              <>
                Latest from the{" "}
                <span className="text-gradient-brand">NexGen blog</span>
              </>
            }
          />
          <Button
            asChild
            variant="outline"
            className="shrink-0 rounded-full border-border bg-card"
          >
            <Link href="/blog">
              View all posts <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${p.slug}`}
                className="group card-border flex h-full flex-col rounded-2xl bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                    {p.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {p.readingTime} min read
                  </span>
                </div>
                <h3 className="text-lg font-semibold leading-snug group-hover:text-brand-600">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {p.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Read article{" "}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA -------------------------------- */

function FinalCTA() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 text-center text-white shadow-2xl shadow-brand-500/30 sm:p-16">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg,#f30a29,#f3a800,#008dec,#1d36bf)" }} aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 bg-grid opacity-20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <Eyebrow>
                <span className="text-white">Let&apos;s talk</span>
              </Eyebrow>
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Ready to build, automate, and scale?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/85 md:text-lg">
                Book a free consultation, request a proposal, or schedule a
                1Grow demo. We respond within one business day.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-white px-8 font-semibold text-ink-700 shadow-xl hover:bg-brand-50 sm:w-auto"
                >
                  <Link href="/contact">Book a Consultation</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-white/40 bg-white/10 px-8 font-semibold text-white backdrop-blur hover:bg-white/20 sm:w-auto"
                >
                  <Link href="/products/1grow">Schedule a Demo</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/75">
                <Phone className="h-4 w-4" /> +91 95663 72450 · Coimbatore,
                Tamil Nadu
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Icon shims -------------------------------- */

function GraduationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </svg>
  );
}
function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  );
}
function HotelIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v18h16V4a2 2 0 0 0-2-2z" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}
function LandmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18M5 21V10M19 21V10M4 10l8-7 8 7M2 10h20" />
    </svg>
  );
}
function ConstructionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="9" width="18" height="12" rx="1" />
      <path d="M12 9V5M8 5h8v4" />
      <path d="M12 13v.01M8 13v.01M16 13v.01" />
    </svg>
  );
}

/* --------------------------------- Page ----------------------------------- */

const HomePageClient = () => {
  return (
    <>
      <Hero />
      <Stats />
      <CompanyOverview />
      <ServicesOverview />
      <FeaturedSaaS />
      <Industries />
      <CaseStudies />
      <Process />
      <TechStack />
      <WhyNexGen />
      <Testimonials />
      <BlogPreview />
      <FinalCTA />
    </>
  );
};

export default HomePageClient;
