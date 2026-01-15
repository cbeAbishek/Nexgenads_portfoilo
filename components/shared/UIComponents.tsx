"use client";

import React from "react";

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  centered = false,
  className = "" 
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#008dec] via-[#1d36bf] to-[#f3a800] bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-[#333333]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div 
      className={`
        relative rounded-2xl border border-[#1d36bf]/15 bg-white shadow-lg
        ${hover ? "transition-all duration-300 hover:border-[#008dec]/40 hover:shadow-xl hover:shadow-[#008dec]/10 hover:scale-[1.02]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "gradient";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[#008dec]/10 text-[#008dec] border border-[#008dec]/20",
    outline: "border border-[#1d36bf]/30 text-[#333333]",
    gradient: "bg-gradient-to-r from-[#008dec]/20 to-[#f3a800]/20 text-[#1d36bf] border border-[#008dec]/30",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
}

export function IconButton({ icon, label, href, external = false, variant = "secondary" }: IconButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300";
  const variants = {
    primary: "bg-gradient-to-r from-[#008dec] to-[#1d36bf] text-white hover:shadow-lg hover:shadow-[#008dec]/50 hover:scale-105",
    secondary: "border border-[#1d36bf]/30 bg-white text-[#000000] hover:bg-[#008dec]/10 hover:border-[#008dec]/50",
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex-shrink-0 text-[#008dec]">
        {icon}
      </div>
      <div>
        <div className="text-sm text-[#333333] uppercase tracking-wider">{label}</div>
        <div className="text-[#000000] font-medium">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:text-[#f3a800] transition-colors">
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
