"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  Menu,
  Megaphone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

const dropdownGroups = [
  {
    label: "Development",
    icon: Code2,
    items: services.filter((s) => s.category === "Development"),
  },
  {
    label: "AI & Automation",
    icon: Bot,
    items: services.filter((s) => s.category === "AI & Automation"),
  },
  {
    label: "Marketing & Growth",
    icon: Megaphone,
    items: services.filter((s) => s.category === "Marketing"),
  },
];

const moreServices = services.filter(
  (s) => s.category === "Creative" || s.category === "Infrastructure",
);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell">
        <div
          className={cn(
            "mt-3 sm:mt-4 flex items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5",
            isScrolled
              ? "glass border-brand-500/25 shadow-[0_8px_32px_rgba(0,141,236,0.12)]"
              : "border-transparent bg-transparent",
          )}
        >
          {/* Logo */}
          <Logo className="shrink-0" />
          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, 2).map((link) => (
              <DesktopLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActiveRoute(link.href)}
              />
            ))}

            {/* Services mega-dropdown */}
            <div
              className="relative"
              ref={servicesRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                onClick={() => setIsServicesOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  isActiveRoute("/services")
                    ? "text-brand-600"
                    : "text-foreground/70 hover:bg-brand-50 hover:text-foreground",
                )}
                aria-expanded={isServicesOpen}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isServicesOpen && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "absolute left-1/2 top-full w-[46rem] max-w-[92vw] -translate-x-1/2 pt-2 transition-all duration-200",
                  isServicesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0",
                )}
                aria-hidden={!isServicesOpen}
              >
                <div className="glass overflow-hidden rounded-2xl shadow-[0_28px_70px_-20px_rgba(0,80,140,0.35)] ring-1 ring-border">
                  <div className="grid gap-0 md:grid-cols-[1.6fr_1fr]">
                    {/* Categorised services */}
                    <div className="p-4">
                      {dropdownGroups.map((group) => (
                        <div key={group.label} className="mb-4 last:mb-0">
                          <p className="mb-1.5 flex items-center gap-1.5 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                            <group.icon className="h-3.5 w-3.5" /> {group.label}
                          </p>
                          <div className="grid grid-cols-2 gap-0.5">
                            {group.items.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                className="group/item rounded-lg px-2 py-1.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-brand-50 hover:text-brand-700"
                              >
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Creative + Infrastructure quick chips */}
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 px-2 pt-3">
                        {moreServices.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-brand-600"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Spotlight */}
                    <div className="flex flex-col border-t border-border bg-gradient-to-b from-brand-50/70 to-transparent p-4 md:border-l md:border-t-0">
                      <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                        Featured
                      </p>
                      <Link
                        href="/products/1grow"
                        className="group block overflow-hidden rounded-xl border border-brand-500/25 bg-white/80 p-4 shadow-lg shadow-brand-500/10 backdrop-blur transition-transform hover:-translate-y-0.5"
                      >
                        <p className="text-sm font-bold text-ink-700">1Grow</p>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          The all-in-one sales &amp; marketing OS built by
                          NexGen.
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                          Explore product
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>

                      <div className="mt-3 space-y-0.5">
                        <Link
                          href="/portfolio"
                          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          Our work{" "}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] font-medium text-foreground/75 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          Free consultation{" "}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                        </Link>
                      </div>

                      <Link
                        href="/services"
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-brand-500/25 bg-brand-500/10 px-4 py-2.5 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-500/15"
                      >
                        View all services <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <DesktopLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActiveRoute(link.href)}
              />
            ))}
          </div>
          {/* Products link + CTA (desktop) */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/products/1grow"
              className={cn(
                "rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors",
                isActiveRoute("/products")
                  ? "text-brand-600"
                  : "text-foreground/80 hover:bg-brand-50 hover:text-brand-600",
              )}
            >
              Products
            </Link>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-brand-gradient font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35"
            >
              <Link href="/contact">Book a Demo</Link>
            </Button>
          </div>
          -{/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/60 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "container-shell lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "pointer-events-auto max-h-[80vh] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0",
        )}
      >
        <div className="glass mt-2 max-h-[72vh] space-y-1 overflow-y-auto rounded-2xl p-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm font-medium",
                isActiveRoute(link.href)
                  ? "bg-brand-50 text-brand-600"
                  : "text-foreground/80 hover:bg-brand-50",
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setIsMobileServicesOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-brand-50"
            aria-expanded={isMobileServicesOpen}
          >
            Services
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isMobileServicesOpen && "rotate-180",
              )}
            />
          </button>
          {isMobileServicesOpen && (
            <div className="space-y-2 pl-3">
              {dropdownGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-4 pb-1 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                    {group.label}
                  </p>
                  {group.items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block rounded-xl px-4 py-2.5 text-sm text-foreground/70 hover:bg-brand-50 hover:text-brand-600"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex flex-wrap gap-1.5 px-4 pt-2">
                {moreServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-brand-500/40 hover:text-brand-600"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Link
            href="/products/1grow"
            className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-brand-50"
          >
            Products — 1Grow
          </Link>
          <Button
            asChild
            size="sm"
            className="mt-2 w-full rounded-xl bg-brand-gradient font-semibold"
          >
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

function DesktopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
        active
          ? "text-brand-600"
          : "text-foreground/70 hover:bg-brand-50 hover:text-foreground",
      )}
    >
      {label}
      {active && (
        <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient" />
      )}
    </Link>
  );
}

export default Navigation;
