"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        setMessage("Successfully subscribed!");
        setEmail("");
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/career" },
      // { label: "Investors", href: "/investors" },
      // { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Survey", href: "/survey" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      // { label: "Support", href: "/support" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1aP2yyEf6U/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/nexgenads.ai?igsh=aWxsbXV2aml4MDE3",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/nexgenads-ai/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0f2470] to-[#1D36BF] overflow-hidden">
      {/* Nature-inspired Landscape Silhouette */}

      <div className="container-custom section-padding relative z-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 group transition-all duration-300 bg-white px-4 py-3 rounded-md shadow-lg hover:shadow-xl"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/logo.svg"
                  alt="NexGenAds logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <div className="absolute -inset-1 rounded-full blur-xl bg-[#f3a800]/10 group-hover:bg-[#f3a800]/30 transition-all duration-300 pointer-events-none" />
              </div>
              <span
                className="text-xl sm:text-2xl font-bold transition-all duration-500"
                style={{ fontFamily: "var(--font-neue-machina)" }}
              >
                <span className="text-blue-600">Nex</span>
                <span className="text-red-600">Gen</span>
                <span className="text-yellow-500">Ads</span>
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              A digital bridge connecting Tamil Nadu&apos;s businesses,
              creatives, and media partners.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group text-white/70 hover:text-[#f3a800] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300" />
                  <div className="absolute inset-0 bg-[#f3a800]/0 group-hover:bg-[#f3a800]/20 blur-xl rounded-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-[#008dec] to-[#f3a800] rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label} className="group">
                  <Link
                    href={link.href}
                    className="relative inline-block text-white/70 hover:text-[#f3a800] transition-all duration-300 text-sm group-hover:translate-x-2"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#008dec] to-[#f3a800] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-[#f3a800] to-[#008dec] rounded-full"></span>
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label} className="group">
                  <Link
                    href={link.href}
                    className="relative inline-block text-white/70 hover:text-[#f3a800] transition-all duration-300 text-sm group-hover:translate-x-2"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f3a800] to-[#008dec] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-[#008dec] via-[#f3a800] to-[#008dec] rounded-full animate-pulse"></span>
              Stay Updated
            </h3>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Get Tamil Nadu launch news, pilot invites, and fresh case studies
              straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#f3a800] focus:bg-white/15 focus:scale-[1.02] transition-all duration-300 focus:shadow-lg focus:shadow-[#f3a800]/20"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group bg-white text-[#0f2470] border border-[#008dec] hover:bg-red-600 hover:text-white hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:shadow-lg focus:shadow-red-300/20 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-200/30 to-transparent transform transition-transform duration-500 group-hover:translate-x-0 pointer-events-none" />
              </Button>
              {message && (
                <p
                  className={`text-xs ${
                    message.includes("Success")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6 border-t border-white/10">
          <div className="flex items-start sm:items-center space-x-3 group cursor-default">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#f3a800] flex-shrink-0 mt-0.5 sm:mt-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <span className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors duration-300">
              Coimbatore, Tamil Nadu, India
            </span>
          </div>
          <div className="flex items-start sm:items-center space-x-3 group">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#f3a800] flex-shrink-0 mt-0.5 sm:mt-0 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
            <a
              href="mailto:contact@nexgenads.space"
              className="text-xs sm:text-sm text-white/80 hover:text-[#f3a800] break-all transition-all duration-300 hover:translate-x-1"
            >
              contact@nexgenads.space
            </a>
          </div>
          <div className="flex items-start sm:items-center space-x-3 sm:col-span-2 lg:col-span-1 group">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#f3a800] flex-shrink-0 mt-0.5 sm:mt-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <a
              href="tel:+919876543210"
              className="text-xs sm:text-sm text-white/80 hover:text-[#f3a800] transition-all duration-300 hover:translate-x-1"
            >
              +91 95663 72450
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-white/70">
            © {new Date().getFullYear()} NexGenAds. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-xs sm:text-sm text-white/70 hover:text-[#f3a800] transition-all duration-300 whitespace-nowrap group hover:-translate-y-0.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3a800] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
