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
  Rocket,
  Shield,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackdrop from "@/components/ui/hero-backdrop";

const teamMembers = [
  {
    name: "Abishek G.",
    role: "Founder",
    description:
      "Sets the product and engineering vision, keeping the team focused on building intelligent software.",
    image: "/team/ab123.webp",
    linkedin: "https://linkedin.com/in/abishekg",
  },
  {
    name: "Vishnu Dev T",
    role: "Chief Executive Officer",
    description:
      "Leads operations, partnerships, and go-to-market strategy for NexGen's services and products.",
    image: "/team/vishnu.jpeg",
    linkedin: "https://linkedin.com/in/vishnudevt",
  },
];

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "Honest communication and clear estimates with every client.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We design and build around the people who use our software.",
  },
  {
    icon: Brain,
    title: "Innovation",
    description:
      "Continuously pushing boundaries with AI and modern engineering.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Enterprise-grade quality in everything we ship.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Founded in Coimbatore",
    body: "NexGen starts as a team of engineers building software and automation for local businesses.",
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
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-50 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-brand-600">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

const AboutPageClient = () => {
  return (
    <div className="pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <div className="container-shell pb-14 text-center">
          <Eyebrow>About NexGen</Eyebrow>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            We build, automate &amp; scale{" "}
            <span className="text-gradient-brand">intelligent businesses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            NexGen is an AI-driven technology company helping businesses grow
            through software, AI, digital transformation, and intelligent
            marketing - founded in Coimbatore, built for the world.
          </p>
        </div>
      </header>

      {/* Story + Mission/Vision */}
      <section className="container-shell py-14 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From engineering problem-solvers to AI technology partner
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                NexGen started with a simple belief: businesses shouldn&apos;t
                have to choose between technology, automation, and growth - they
                should get all three from one accountable partner.
              </p>
              <p>
                We began by building websites, apps, and internal systems for
                businesses in Coimbatore. As our clients grew, their problems
                grew too: scattered data, manual workflows, and marketing that
                couldn&apos;t be measured. So we expanded into ERP/CRM, AI
                automation, and data-driven growth marketing.
              </p>
              <p>
                Today NexGen is a full-stack technology company - engineering
                enterprise-grade software, deploying AI agents and chatbots,
                building SaaS platforms like 1Grow, and running SEO, GEO, and
                AEO programmes that get brands found in the AI era.
              </p>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="card-border rounded-2xl bg-card p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-ink-600 text-white shadow-lg shadow-brand-500/25">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Empower businesses through intelligent software, automation,
                  and digital innovation that accelerates sustainable growth.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-border rounded-2xl bg-card p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ink-600 to-brand-500 text-white shadow-lg shadow-brand-500/25">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Build the world&apos;s largest AI-powered physical advertising
                  ecosystem - seamlessly connecting digital marketing with
                  intelligent real-world advertising infrastructure through
                  software, automation, AI, IoT, and data intelligence.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/40 py-14 md:py-20">
        <div className="container-shell">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Our journey</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Milestones so far
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="card-border h-full rounded-2xl bg-card p-6">
                  <span className="font-display text-sm font-bold text-brand-500">
                    {t.year}
                  </span>
                  <h3 className="mt-2 font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-shell py-14 md:py-20">
        <Reveal className="mb-12 text-center">
          <Eyebrow>Values</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The principles that guide us
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card-border h-full rounded-2xl bg-card p-7 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-ink-600 text-white shadow-lg shadow-brand-500/25">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/40 py-14 md:py-20">
        <div className="container-shell">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the team
            </h2>
          </Reveal>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="card-border group w-full max-w-sm rounded-2xl bg-card p-8 text-center transition-transform hover:-translate-y-1"
              >
                <div className="relative mx-auto mb-6 h-28 w-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 to-ink-600 opacity-20 blur-lg" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-xl">
                    <Image
                      src={member.image}
                      alt={`${member.name} portrait`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <span className="mt-1 inline-block rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600">
                  {member.role}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {member.description}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="mx-auto mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-600"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shell py-14 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-ink-600 to-brand-600 p-10 text-center text-white sm:p-14">
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
            <Rocket className="mx-auto mb-5 h-8 w-8 text-white/80" />
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let&apos;s build the future together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Whether you&apos;re looking for software, automation, or a growth
              partner - the NexGen team is ready.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-white px-8 font-semibold text-ink-700 shadow-xl hover:bg-brand-50"
            >
              <Link href="/contact">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageClient;
