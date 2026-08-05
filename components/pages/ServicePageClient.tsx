"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap,
  Code2,
  LayoutTemplate,
  Smartphone,
  Boxes,
  Users,
  Terminal,
  BrainCircuit,
  Bot,
  MessageSquare,
  Workflow,
  Cloud,
  Megaphone,
  Search,
  Palette,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service, services } from "@/lib/data/services";
import HeroBackdrop from "@/components/ui/hero-backdrop";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  smartphone: Smartphone,
  boxes: Boxes,
  users: Users,
  terminal: Terminal,
  brain: BrainCircuit,
  bot: Bot,
  message: MessageSquare,
  workflow: Workflow,
  cloud: Cloud,
  megaphone: Megaphone,
  search: Search,
  palette: Palette,
  server: Server,
};

const categoryOrder = [
  "Development",
  "AI & Automation",
  "Marketing",
  "Creative",
  "Infrastructure",
];

const palette = [
  {
    dot: "bg-brand-500",
    chip: "border-brand-500/25 bg-brand-50 text-brand-600",
    iconBox: "bg-brand-gradient",
    check: "bg-brand-500/10 text-brand-600",
    bar: "bg-gradient-to-r from-brand-500 to-[#1d36bf]",
    num: "text-brand-500/25",
    glow: "bg-brand-500/15",
    btn: "bg-brand-gradient shadow-brand-500/25",
    icon: "text-brand-600",
  },
  {
    dot: "bg-crimson-500",
    chip: "border-crimson-500/25 bg-crimson-50 text-crimson-600",
    iconBox: "bg-gradient-to-br from-crimson-500 to-crimson-600",
    check: "bg-crimson-500/10 text-crimson-600",
    bar: "bg-gradient-to-r from-crimson-500 to-crimson-600",
    num: "text-crimson-500/25",
    glow: "bg-crimson-500/15",
    btn: "bg-gradient-to-r from-crimson-500 to-crimson-600 shadow-crimson-500/25",
    icon: "text-crimson-600",
  },
  {
    dot: "bg-gold-500",
    chip: "border-gold-500/30 bg-gold-500/10 text-gold-700",
    iconBox: "bg-gradient-to-br from-gold-500 to-gold-600",
    check: "bg-gold-500/10 text-gold-700",
    bar: "bg-gradient-to-r from-gold-500 to-gold-600",
    num: "text-gold-500/40",
    glow: "bg-gold-500/15",
    btn: "bg-gradient-to-r from-gold-500 to-gold-600 shadow-gold-500/25",
    icon: "text-gold-700",
  },
];

const processSteps = [
  "Discovery & scoping",
  "Strategy & architecture",
  "Design & prototype",
  "Development (agile)",
  "Testing & QA",
  "Launch & support",
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

function Eyebrow({
  children,
  dotClass,
}: {
  children: React.ReactNode;
  dotClass: string;
}) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/70 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600 shadow-sm backdrop-blur">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  dotClass,
  title,
  subtitle,
}: {
  eyebrow?: string;
  dotClass: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      {eyebrow && <Eyebrow dotClass={dotClass}>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-brand-500" />
    </Reveal>
  );
}

export default function ServicePageClient({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const ServiceIcon = iconMap[service.icon] ?? Code2;
  const accent =
    palette[Math.max(0, categoryOrder.indexOf(service.category)) % palette.length];
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="pb-16 md:pb-24">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-brand-500/10">
        <HeroBackdrop />
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-crimson-500/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden
        />
        <div className="container-shell relative pb-14 pt-14 md:pt-24">
          <Reveal>
            <Link
              href="/services"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" /> All services
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow dotClass={accent.dot}>{service.category}</Eyebrow>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${accent.iconBox} text-white shadow-xl shadow-brand-500/25 sm:h-20 sm:w-20`}
              >
                {ServiceIcon && <ServiceIcon className="h-8 w-8 sm:h-10 sm:w-10" />}
              </div>
              <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink-700 sm:text-5xl md:text-6xl">
                {service.title}
              </h1>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className={`rounded-full px-7 font-semibold text-white shadow-lg ${accent.btn}`}
              >
                <Link href="/contact">
                  Discuss this service <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-brand-500/30 bg-white/80 text-brand-600 backdrop-blur hover:bg-brand-50"
              >
                <Link href="/portfolio">See related work</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.36}>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  value: String(service.benefits.length),
                  label: "Key benefits",
                },
                {
                  value: String(service.features.length),
                  label: "What's included",
                },
                {
                  value: String(service.technologies.length),
                  label: "Technologies",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/70 bg-white/75 px-4 py-4 text-center shadow-lg shadow-brand-500/5 backdrop-blur-xl"
                >
                  <div
                    className={`font-display text-2xl font-bold md:text-3xl ${accent.icon}`}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Benefits */}
      <section className="container-shell py-14 md:py-20">
        <SectionTitle
          eyebrow="Why it works"
          dotClass={accent.dot}
          title="Why businesses choose this"
          subtitle="Outcomes your team will actually feel, from day one."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {service.benefits.map((b, i) => (
            <Reveal key={b} delay={(i % 2) * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-500/10 bg-white/80 p-6 shadow-lg shadow-brand-500/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10">
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${accent.bar}`}
                  aria-hidden
                />
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.check} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-foreground/90">
                    {b}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features + Tech */}
      <section className="border-y border-brand-500/10 bg-white/50 py-14 md:py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink-700 sm:text-3xl">
                What&apos;s included
              </h2>
            </Reveal>
            <div className="space-y-3">
              {service.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.04}>
                  <div className="group flex items-center gap-3 rounded-xl border border-brand-500/10 bg-white/80 px-4 py-3 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${accent.dot} transition-transform group-hover:scale-125`}
                    />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink-700 sm:text-3xl">
                Technologies we use
              </h2>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-brand-500/10 bg-white/80 px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-4 mt-10 text-xl font-bold text-ink-700">
                Typical use cases
              </h2>
            </Reveal>
            <div className="space-y-2">
              {service.useCases.map((u, i) => (
                <Reveal key={u} delay={0.1 + i * 0.04}>
                  <li
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    style={{ listStyle: "none" }}
                  >
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${accent.icon}`}
                    />
                    <span className="leading-relaxed">{u}</span>
                  </li>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-shell py-14 md:py-20">
        <SectionTitle
          eyebrow="How we deliver"
          dotClass={accent.dot}
          title="Our delivery process"
          subtitle="A transparent, milestone-driven path from idea to launch."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step} delay={(i % 3) * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-500/10 bg-white/80 p-6 shadow-lg shadow-brand-500/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10">
                <span
                  className={`font-display text-4xl font-bold ${accent.num} transition-transform duration-300 group-hover:scale-110`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`mt-3 h-1 w-10 rounded-full ${accent.bar} transition-all duration-300 group-hover:w-16`}
                  aria-hidden
                />
                <p className="mt-3 font-semibold text-ink-700">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="border-y border-brand-500/10 bg-white/50 py-14 md:py-20">
          <div className="container-shell max-w-3xl">
            <SectionTitle
              eyebrow="Good to know"
              dotClass={accent.dot}
              title="Common questions"
            />
            <div className="space-y-3">
              {service.faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={f.q} delay={i * 0.05}>
                    <div className="overflow-hidden rounded-2xl border border-brand-500/10 bg-white/80 shadow-sm backdrop-blur transition-all duration-300 hover:border-brand-300 hover:shadow-md">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={open}
                      >
                        <span className="font-semibold text-ink-700">
                          {f.q}
                        </span>
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            open
                              ? "rotate-180 bg-brand-500 text-white"
                              : "bg-brand-500/10 text-brand-600"
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-6 pr-12 text-sm leading-relaxed text-muted-foreground">
                              {f.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="container-shell py-14 md:py-20">
          <SectionTitle
            eyebrow="Keep exploring"
            dotClass={accent.dot}
            title={`More ${service.category.toLowerCase()} services`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => {
              const RelatedIcon = iconMap[s.icon] ?? Code2;
              const rAccent = palette[
                Math.max(0, categoryOrder.indexOf(s.category)) % palette.length
              ];
              return (
                <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group card-border flex h-full flex-col rounded-2xl bg-card p-7 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${rAccent.iconBox} text-white shadow-lg transition-transform group-hover:scale-105`}
                      >
                        <RelatedIcon className="h-6 w-6" />
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${rAccent.chip}`}
                      >
                        {s.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-ink-700">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.short}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-shell pb-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-14">
          <div
            className={`absolute inset-x-0 top-0 h-1 ${accent.bar}`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full ${accent.glow} blur-3xl`}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl font-bold text-ink-700 sm:text-3xl">
              Let&apos;s scope your {service.title.toLowerCase()} project
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Book a free consultation and get a written plan and estimate within
              days.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className={`rounded-full px-7 font-semibold text-white shadow-xl ${accent.btn}`}
              >
                <Link href="/contact">Get a free quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-brand-500/30 bg-white/80 text-brand-600 backdrop-blur hover:bg-brand-50"
              >
                <Link href="/services">Browse other services</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-brand-500" /> No obligation ·
              Response within 1 business day
              <Zap className="ml-3 h-4 w-4" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
