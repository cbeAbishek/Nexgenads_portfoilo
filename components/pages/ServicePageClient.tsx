"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/data/services";
import HeroBackdrop from "@/components/ui/hero-backdrop";

export default function ServicePageClient({ service }: { service: Service }) {
  return (
    <div className="pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="container-shell pb-14">
          <Link href="/services" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-50 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {service.category}
          </span>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-brand-gradient px-7 font-semibold shadow-lg shadow-brand-500/25">
              <Link href="/contact">Discuss this service <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-border bg-card">
              <Link href="/portfolio">See related work</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Benefits */}
      <section className="container-shell py-14 md:py-16">
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Why businesses choose this</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-medium leading-relaxed text-foreground/90">{b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features + Tech */}
      <section className="bg-muted/40 py-14 md:py-16">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">What&apos;s included</h2>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Technologies we use</h2>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="mb-4 mt-10 text-xl font-bold">Typical use cases</h2>
            <ul className="space-y-2">
              {service.useCases.map((u) => (
                <li key={u} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="h-4 w-4 text-brand-500" /> {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-shell py-14 md:py-16">
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">How we deliver</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {["Discovery & scoping", "Strategy & architecture", "Design & prototype", "Development (agile)", "Testing & QA", "Launch & support"].map((step, i) => (
            <div key={step} className="card-border rounded-2xl bg-card p-6">
              <span className="font-display text-3xl font-bold text-brand-500/20">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="bg-muted/40 py-14 md:py-16">
          <div className="container-shell">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Common questions</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {service.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-semibold">{f.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-shell py-14 md:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl font-bold text-ink-700 sm:text-3xl">Let&apos;s scope your {service.title.toLowerCase()} project</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Book a free consultation and get a written plan and estimate within days.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-brand-500 px-7 font-semibold text-white shadow-xl shadow-brand-500/25 hover:bg-brand-600">
                <Link href="/contact">Get a free quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-brand-500/30 bg-white/80 text-brand-600 backdrop-blur hover:bg-brand-50">
                <Link href="/services">Browse other services</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-brand-500" /> No obligation · Response within 1 business day
              <Zap className="ml-3 h-4 w-4" />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
