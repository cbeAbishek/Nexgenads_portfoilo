"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { portfolio, portfolioCategories } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";
import HeroBackdrop from "@/components/ui/hero-backdrop";

export default function PortfolioPageClient() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  return (
    <div className="pb-16 md:pb-24">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="container-shell pb-14 pt-14 text-center md:pt-24">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-50 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Portfolio
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Work that <span className="text-gradient-brand">moves numbers</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground md:text-lg">
            Real projects, real problems, and measured results across ERP, AI, apps, branding, and growth.
          </p>
        </div>
      </header>

      {/* Filter */}
      <div className="container-shell pt-10">
        <div className="flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === c
                  ? "border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/25"
                  : "border-border bg-card text-muted-foreground hover:border-brand-500/40 hover:text-brand-600"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                href={`/portfolio/${item.id}`}
                className="group card-border flex h-full flex-col overflow-hidden rounded-2xl bg-card transition-transform hover:-translate-y-1"
              >
                <div className={cn("relative flex h-40 items-center justify-center px-6", item.gradient)}>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/90">{item.client}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/20 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-brand-600/70">
                      {item.industry} · {item.year}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
                  </div>
                  <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{item.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                    {item.results.map((r) => (
                      <span key={r.kpi} className="rounded-full bg-brand-500/10 px-2.5 py-1 text-[11px] font-bold text-brand-700">
                        {r.value} · {r.kpi}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" aria-hidden />
          <h2 className="text-2xl font-bold text-ink-700 sm:text-3xl">Want results like these?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Every project starts with a free consultation and a written plan. Let&apos;s talk about yours.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] hover:bg-brand-600"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
