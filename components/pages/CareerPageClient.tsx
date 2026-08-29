"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { JobOpening } from "@/lib/content/careers";
import {
  Briefcase,
  MapPin,
  Clock,
  Building,
  ChevronRight,
  ChevronDown,
  Users,
  Send,
  Sparkles,
  Zap,
  TrendingUp,
  Heart,
  GraduationCap,
  Rocket,
  Code2,
  Megaphone,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import { Badge, GlassCard } from "@/components/shared/UIComponents";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import HeroBackdrop from "@/components/ui/hero-backdrop";

const departmentColors = [
  "bg-brand-500/10 text-brand-600 border-brand-500/25",
  "bg-brand-500/10 text-brand-600 border-brand-500/25",
  "bg-brand-500/10 text-brand-600 border-brand-500/25",
];

const departmentIcon: Record<string, typeof Code2> = {
  Engineering: Code2,
  Marketing: Megaphone,
  Design: PenTool,
  "Quality Assurance": ShieldCheck,
};

const benefits = [
  {
    icon: Sparkles,
    title: "Real Product Ownership",
    description:
      "Work on live startup products with engineering, design, and growth teams - not just ticket-ticking.",
    accent: "bg-brand-500/10 text-brand-600",
  },
  {
    icon: Zap,
    title: "Growth & Mentorship",
    description:
      "Fast-paced environment with clear paths for skill development and career advancement.",
    accent: "bg-crimson-500/10 text-crimson-600",
  },
  {
    icon: TrendingUp,
    title: "Fair Compensation",
    description:
      "Competitive pay with performance reviews and growth-based rewards for key roles.",
    accent: "bg-gold-500/10 text-gold-700",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Flexible working hours, remote/hybrid options, and supportive leave policies.",
    accent: "bg-brand-500/10 text-brand-600",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description:
      "Access to courses, workshops, and conferences to sharpen your professional skills.",
    accent: "bg-crimson-500/10 text-crimson-600",
  },
  {
    icon: Rocket,
    title: "Impact & Ownership",
    description:
      "Your work directly shapes the technology and products our clients rely on daily.",
    accent: "bg-gold-500/10 text-gold-700",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/70 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600 shadow-sm backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      {children}
    </span>
  );
}

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

interface CareerPageClientProps {
  jobOpenings: JobOpening[];
}

export default function CareerPageClient({ jobOpenings }: CareerPageClientProps) {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedJob(null);
  };

  const departments = Array.from(
    new Set(jobOpenings.map((job) => job.department)),
  ).length;
  const locations = Array.from(
    new Set(jobOpenings.map((job) => job.location)),
  ).length;

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
        <div className="container-shell relative py-16 text-center md:py-24">
          <Reveal delay={0.05}>
            <Eyebrow>Careers at NexGenAds</Eyebrow>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink-700 sm:text-5xl md:text-6xl">
              Build the future of{" "}
              <span className="text-gradient-brand">intelligent technology</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Join NexGenAds Technologies Pvt. Ltd. and help businesses grow with
              software, AI, and automation. We hire early-career talent and give
              them real product ownership from day one.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-5 text-sm text-muted-foreground">
              HR contact:{" "}
              <a
                className="font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                href="mailto:hr@nexgenads.space"
              >
                hr@nexgenads.space
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  value: String(jobOpenings.length),
                  label: "Open Positions",
                  color: "#008dec",
                },
                {
                  value: `${departments}+`,
                  label: "Departments",
                  color: "#f30a29",
                },
                {
                  value: String(locations),
                  label: "Locations",
                  color: "#f3a800",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/70 bg-white/75 px-6 py-5 shadow-lg shadow-brand-500/5 backdrop-blur-xl"
                >
                  <div
                    className="font-display text-3xl font-bold md:text-4xl"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Openings */}
      <section className="container-shell py-14 md:py-20">
        <Reveal className="mb-12 text-center">
          <Eyebrow>Open roles</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
            Current Openings
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {jobOpenings.length} exciting opportunities to grow your career.
          </p>
        </Reveal>

        <div className="mx-auto max-w-5xl space-y-6">
          {jobOpenings.map((job, index) => (
            <Reveal key={job.id} delay={(index % 3) * 0.06}>
              <GlassCard className="group relative overflow-hidden border-brand-100 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 md:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Role icon */}
                  {/* <div className="hidden h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25 sm:flex">
                    {(() => {
                      const Icon = departmentIcon[job.department] ?? Briefcase;
                      return <Icon className="h-7 w-7" />;
                    })()}
                  </div> */}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`border shadow-sm ${departmentColors[index % 3]}`}
                          >
                            {job.department}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-brand-200 text-brand-700 transition-colors hover:bg-brand-50"
                          >
                            {job.employmentType}
                          </Badge>
                          {job.salary && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/25 bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                              {job.salary}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-ink-700 transition-colors group-hover:text-brand-600 md:text-2xl">
                          {job.title}
                        </h3>
                      </div>

                      <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-end">
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:scale-[1.03] hover:bg-brand-600 active:scale-95"
                        >
                          Apply Now
                          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                        {/* <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Posted{" "}
                          {new Date(job.postedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span> */}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-brand-500" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-brand-500" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-brand-500" />
                        {job.department}
                      </span>
                    </div>

                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>

                    <div className="mt-5 grid gap-3 border-t border-brand-500/10 pt-4 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-700">
                          <ChevronDown className="h-3.5 w-3.5 text-brand-500" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {job.responsibilities
                            .slice(0, 3)
                            .map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why join us */}
      <section className="border-y border-brand-500/10 bg-white/50 py-14 md:py-20">
        <div className="container-shell">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Why NexGenAds</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-ink-700 sm:text-4xl">
              Perks of working with us
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-brand-500" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.06}>
                <GlassCard className="group h-full border-brand-100 bg-white/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10">
                  {/* <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${b.accent} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <b.icon className="h-6 w-6" />
                  </div> */}
                  <h3 className="text-lg font-semibold text-ink-700">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shell py-14 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 p-10 text-center shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-14">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-brand-500"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-600">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-ink-700 sm:text-4xl">
              Don&apos;t see your role?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We&apos;re always looking for talented engineers, designers, and
              marketers. Send your CV and we&apos;ll get back to you.
            </p>
            <a
              href="mailto:hr@nexgenads.space?subject=Application: NexGenAds"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 font-semibold text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] hover:bg-brand-600"
            >
              Send your CV <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          job={selectedJob}
          open={isFormOpen}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
