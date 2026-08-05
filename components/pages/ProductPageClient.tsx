"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Database,
  Gauge,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackdrop from "@/components/ui/hero-backdrop";
import { cn } from "@/lib/utils";

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
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

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-500/20 bg-white shadow-2xl shadow-brand-900/10">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-brand-300" />
        <span className="h-3 w-3 rounded-full bg-brand-400" />
        <span className="h-3 w-3 rounded-full bg-ink-600/70" />
        <span className="ml-4 rounded-lg bg-card px-3 py-1 text-xs text-muted-foreground">
          app.1grow.ai/dashboard
        </span>
      </div>
      <div className="grid sm:grid-cols-[1fr_2fr]">
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
              { icon: Bot, label: "AI Assistant" },
              { icon: MessageSquare, label: "WhatsApp" },
              { icon: Workflow, label: "Automation" },
              { icon: BarChart3, label: "Analytics" },
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
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly pipeline</p>
              <p className="font-display text-3xl font-bold text-foreground">
                ₹12.4L
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> +38% MoM
            </span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "New leads", value: "1,284", icon: Users },
              { label: "Conversions", value: "96", icon: Target },
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
          <div className="mt-6 flex h-24 items-end gap-2 rounded-2xl border border-border bg-muted/40 p-4">
            {[35, 55, 40, 62, 48, 70, 58, 82, 66, 90, 74, 100].map((h, i) => (
              <div
                key={i}
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, ${
                    ["#f3a800", "#f30a29", "#1d36bf", "#008dec"][i % 4]
                  }, ${["#f3a800", "#f30a29", "#1d36bf", "#008dec"][i % 4]}cc)`,
                }}
                className="flex-1 rounded-t-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const featureGroups = [
  {
    icon: Database,
    title: "CRM & Lead Management",
    body: "Every enquiry, follow-up, and deal in one pipeline with custom stages, lead scoring, and automatic routing to the right rep.",
    points: [
      "Custom pipelines",
      "Lead scoring & routing",
      "360° activity history",
    ],
  },
  {
    icon: Bot,
    title: "AI Capabilities",
    body: "An AI sales assistant that qualifies leads, drafts replies, schedules meetings, and surfaces the next best action - in your brand voice.",
    points: [
      "AI lead qualification",
      "Smart reply drafting",
      "Next-best-action insights",
    ],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    body: "Two-way WhatsApp automation: broadcasts, sequences, and AI-driven conversations on the channel your customers already use.",
    points: ["Approved templates", "Automated broadcasts", "Two-way AI chat"],
  },
  {
    icon: Workflow,
    title: "Marketing Automation",
    body: "Visual builders for nurture sequences, win-back campaigns, and follow-up workflows that run while your team sleeps.",
    points: [
      "Drag-and-drop builder",
      "Multi-step sequences",
      "Trigger-based journeys",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    body: "Real-time dashboards for pipeline, conversion, campaign ROI, and rep performance - exportable and scheduled to your inbox.",
    points: ["Live dashboards", "Attribution & ROI", "Scheduled reports"],
  },
  {
    icon: Rocket,
    title: "Built to Scale",
    body: "Multi-tenant, enterprise-grade infrastructure with role-based access, audit logs, and a 99.9% uptime SLA.",
    points: ["Enterprise security", "Role-based access", "99.9% uptime"],
  },
];

const pricing = [
  {
    name: "Starter",
    price: "₹2,999",
    period: "/month",
    desc: "For small teams getting organised.",
    features: [
      "Up to 3 users",
      "CRM & lead pipeline",
      "WhatsApp integration",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹8,999",
    period: "/month",
    desc: "For growing teams that want AI and automation.",
    features: [
      "Up to 15 users",
      "AI sales assistant",
      "Marketing automation",
      "Advanced reporting",
      "Priority support",
    ],
    cta: "Book a demo",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For larger organisations with custom needs.",
    features: [
      "Unlimited users",
      "Custom workflows & integrations",
      "Dedicated success manager",
      "SLA & onboarding",
      "SSO & audit logs",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

const faqs = [
  {
    q: "What is 1Grow?",
    a: "1Grow is NexGen's flagship SaaS platform - a unified sales & marketing OS combining CRM, lead management, AI assistance, WhatsApp automation, marketing automation, analytics, and reporting.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most teams are live within a week. We handle data migration, WhatsApp setup, and team training as part of onboarding.",
  },
  {
    q: "Does it integrate with our existing tools?",
    a: "Yes - 1Grow connects with email, calendars, payment links, and popular tools via API and webhooks. Custom integrations are available.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, every plan starts with a 14-day free trial - no credit card required.",
  },
];

export default function ProductPageClient() {
  return (
    <div className="pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="container-shell pb-16 pt-6">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Flagship SaaS · by NexGen</Eyebrow>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              1<span className="text-gradient-brand">Grow</span> - your sales
              &amp; marketing OS
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              CRM, lead management, AI assistance, WhatsApp automation, and
              analytics - unified in one enterprise-grade platform that makes
              your pipeline predictable.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-brand-gradient px-8 text-base font-semibold shadow-xl shadow-brand-500/25 sm:w-auto"
              >
                <Link href="/contact">
                  Book a Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-border bg-card px-8 text-base font-semibold sm:w-auto"
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              14-day free trial · No credit card required · Made by the NexGen
              engineering team
            </p>
          </div>
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-r from-crimson-500/20 via-gold-500/15 to-brand-500/25 blur-2xl"
              aria-hidden
            />
            <DashboardMock />
          </div>
        </div>
      </header>

      {/* Benefits strip */}
      <section className="border-b border-border bg-muted/40 py-10">
        <div className="container-shell grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            {
              icon: Zap,
              title: "Faster responses",
              body: "AI replies in seconds, 24/7.",
            },
            {
              icon: Target,
              title: "Better conversion",
              body: "Leads scored and routed right.",
            },
            {
              icon: LineChart,
              title: "Clear visibility",
              body: "Pipeline and ROI in real time.",
            },
            {
              icon: Gauge,
              title: "Less admin",
              body: "Automation removes busywork.",
            },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <b.icon className="mx-auto mb-2 h-6 w-6 text-brand-500" />
              <p className="text-sm font-semibold">{b.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-shell py-16 md:py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow>Platform features</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your revenue team needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six tightly integrated modules - no duct tape, no rip-and-replace.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureGroups.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.05}>
              <div className="card-border h-full rounded-2xl bg-card p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Check className="h-4 w-4 text-brand-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/40 py-16 md:py-20">
        <div className="container-shell">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent plans
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free, upgrade when you grow. Prices in INR, billed monthly
              or yearly.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8",
                  p.featured
                    ? "border-brand-500 bg-brand-gradient text-white shadow-2xl shadow-brand-500/30"
                    : "border-border bg-card",
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-brand-600 shadow">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    p.featured ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  {p.desc}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">
                    {p.price}
                  </span>
                  {p.period && (
                    <span
                      className={cn(
                        "text-sm",
                        p.featured ? "text-white/70" : "text-muted-foreground",
                      )}
                    >
                      {p.period}
                    </span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          p.featured ? "text-white" : "text-brand-500",
                        )}
                      />
                      <span
                        className={
                          p.featured ? "text-white/95" : "text-foreground/85"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={cn(
                    "mt-8 rounded-full py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02]",
                    p.featured
                      ? "bg-white text-ink-700 shadow-lg"
                      : "border border-brand-500 bg-brand-500/5 text-brand-600 hover:bg-brand-500 hover:text-white",
                  )}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-shell py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p className="font-semibold">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-shell pb-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-grid opacity-20"
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-3xl font-bold text-ink-700 sm:text-4xl">
              See 1Grow in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Book a personalised demo with our team and see how 1Grow fits your
              sales process.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-brand-500 px-8 font-semibold text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] hover:bg-brand-600"
            >
              <Link href="/contact">
                Schedule a Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
