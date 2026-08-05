"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, serviceCategories } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import HeroBackdrop from "@/components/ui/hero-backdrop";

const iconMap: Record<string, string> = {
  code: "⌁",
  layout: "▦",
  smartphone: "▣",
  boxes: "▥",
  users: "◍",
  terminal: "⌘",
  brain: "◉",
  bot: "◗",
  message: "❏",
  workflow: "⇄",
  cloud: "☁",
  megaphone: "▸",
  search: "⌕",
  palette: "◐",
  server: "▤",
};

export default function ServicesPageClient() {
  const [active, setActive] = useState("All");
  const list =
    active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <div className="pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="container-shell pb-14 pt-6 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-50 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Our
            Services
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build, automate &amp; grow -{" "}
            <span className="text-gradient-brand">all in one team</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground md:text-lg">
            From websites and mobile apps to ERP/CRM, AI automation, and
            AI-search-ready marketing - NexGen delivers end-to-end technology
            and growth services.
          </p>
        </div>
      </header>

      {/* Filter */}
      <div className="container-shell pt-10">
        <div className="flex flex-wrap justify-center gap-2">
          {serviceCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === c
                  ? "border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/25"
                  : "border-border bg-card text-muted-foreground hover:border-brand-500/40 hover:text-brand-600",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((s) => (
            <motion.div
              key={s.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="group card-border flex h-full flex-col rounded-2xl bg-card p-7 transition-transform hover:-translate-y-1"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient font-mono text-lg text-white shadow-lg shadow-brand-500/25 transition-transform group-hover:scale-105">
                    {iconMap[s.icon] ?? "◈"}
                  </span>
                  <span className="rounded-full border border-brand-500/25 bg-brand-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-600">
                    {s.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-brand-500/20 bg-brand-gradient p-10 text-center text-white sm:p-14">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg,#f30a29,#f3a800,#008dec,#1d36bf)" }} aria-hidden />
          <h2 className="text-2xl font-bold sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Tell us your goal and we&apos;ll recommend the right mix of services
            - free, no obligation.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink-700 shadow-xl transition-transform hover:scale-[1.02]"
          >
            Get a free consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
