"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioItem } from "@/lib/data/portfolio";
import HeroBackdrop from "@/components/ui/hero-backdrop";

export default function PortfolioProjectClient({
  item,
}: {
  item: PortfolioItem;
}) {
  return (
    <div className="pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="container-shell pb-14">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-brand-500/25 bg-brand-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-brand-600">
              {item.category}
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              {item.industry} · {item.year}
            </span>
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {item.summary}
          </p>
        </div>
      </header>

      {/* Results */}
      <section className="container-shell py-12 md:py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {item.results.map((r) => (
            <div
              key={r.kpi}
              className="rounded-2xl border border-brand-500/20 bg-brand-50/50 p-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-gradient-brand">
                {r.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.kpi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-muted/40 py-12 md:py-14">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">The problem</h2>
            <p className="leading-relaxed text-muted-foreground">
              {item.problem}
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">The solution</h2>
            <p className="leading-relaxed text-muted-foreground">
              {item.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Tech + Services */}
      <section className="container-shell py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Technology used</h2>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Services delivered</h2>
            <ul className="space-y-2">
              {item.services.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 text-sm font-medium text-foreground/90"
                >
                  <Check className="h-4 w-4 text-brand-500" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {item.testimonial && (
        <section className="bg-muted/40 py-12 md:py-14">
          <div className="container-shell max-w-3xl text-center">
            <div className="mb-4 flex justify-center gap-1 text-brand-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M10 1l2.5 6.2L19 7.7l-5 4.1 1.5 6.2L10 14.8 4.5 18l1.5-6.2-5-4.1 6.5-.5L10 1z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-xl font-medium leading-relaxed text-foreground/90 md:text-2xl">
              “{item.testimonial.quote}”
            </blockquote>
            <p className="mt-5 text-sm font-semibold">
              {item.testimonial.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.testimonial.role}
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-shell py-14 md:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-grid opacity-20"
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-2xl font-bold text-ink-700 sm:text-3xl">
              Let&apos;s build your next win
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              <TrendingUp className="mr-1 inline h-4 w-4 text-brand-500" />
              Get a free consultation and a written plan - no obligation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-brand-500 px-7 font-semibold text-white shadow-xl shadow-brand-500/25 hover:bg-brand-600"
              >
                <Link href="/contact">Start a project</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-brand-500/30 bg-white/80 text-brand-600 backdrop-blur hover:bg-brand-50"
              >
                <Link href="/services">
                  Explore services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
