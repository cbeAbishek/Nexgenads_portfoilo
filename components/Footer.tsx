"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { services } from "@/lib/data/services";

const Footer = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (response.ok) {
        setMessage("Subscribed! Insights on their way.");
        setEmail("");
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = {
    company: [
      { label: "About NexGen", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Careers", href: "/career" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    products: [
      { label: "1Grow - Sales & Marketing SaaS", href: "/products/1grow" },
      { label: "Websites", href: "/services/website-development" },
      { label: "ERP / CRM", href: "/services/crm-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "SaaS Development", href: "/services/saas-development" },
    ],
    resources: [
      { label: "All Services", href: "/services" },
      { label: "SEO", href: "/services/seo" },
      { label: "GEO & AEO", href: "/services/geo-aeo" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/nexgenads-ai/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/nexgenads.ai?igsh=aWxsbXV2aml4MDE3",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1aP2yyEf6U/",
      label: "Facebook",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background to-brand-50/60">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-b"
        aria-hidden
      />
      <div className="container-shell relative z-10 pb-10 pt-16 md:pt-20">
        {/* Top CTA strip */}
        <div className="relative mb-14 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-brand-500/20 bg-brand-gradient p-8 text-white shadow-xl shadow-brand-500/20 sm:p-10 lg:flex-row lg:items-center">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: "linear-gradient(90deg,#f30a29,#f3a800,#008dec,#1d36bf)" }} aria-hidden />
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to build, automate &amp; scale?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
              Book a free consultation and get a tailored roadmap from
              NexGen&apos;s engineering team.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 rounded-full bg-white font-semibold text-ink-700 shadow-lg hover:bg-brand-50"
          >
            <Link href="/contact">
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              NexGen is an AI-driven technology company helping businesses
              build, automate, and scale through software, AI, and intelligent
              marketing.
            </p>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-500" />{" "}
                Coimbatore, Tamil Nadu, India
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-500" />
                <a
                  href="mailto:contact@nexgenads.space"
                  className="hover:text-brand-600"
                >
                  contact@nexgenads.space
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" />
                <a href="tel:+919566372450" className="hover:text-brand-600">
                  +91 95663 72450
                </a>
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:text-brand-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(
            [
              { title: "Company", links: columns.company },
              { title: "Products", links: columns.products },
              { title: "Resources", links: columns.resources },
              { title: "Legal", links: columns.legal },
            ] as const
          ).map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              AI, automation, and growth insights - monthly, no spam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-card"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-brand-gradient font-semibold text-white"
              >
                {isSubmitting ? "Subscribing…" : "Subscribe"}
              </Button>
              {message && (
                <p className="text-xs text-muted-foreground">{message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NexGen. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
            {services.slice(0, 4).map((s) => (
              <React.Fragment key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-brand-600"
                >
                  {s.title}
                </Link>
                <span className="text-border">•</span>
              </React.Fragment>
            ))}
            <Link href="/services" className="hover:text-brand-600">
              And more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
