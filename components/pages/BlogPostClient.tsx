"use client";

import React from "react";
import type { BlogPost } from "@/lib/content";
import { Badge, GlassCard, SectionHeading } from "@/components/shared/UIComponents";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-brand-50/60 via-white to-gold-500/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container-custom relative px-4 pt-28 pb-12 md:px-6 md:pt-36 md:pb-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="gradient" className="shadow-sm">{post.category}</Badge>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 rounded-lg text-brand-600 font-medium">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/10 rounded-lg text-gold-600 font-medium">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
              <span className="px-3 py-1.5 bg-crimson-500/10 rounded-lg text-crimson-600 font-medium">By {post.author}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1d36bf] leading-tight">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-brand-500/25 text-brand-700 hover:border-brand-500/60 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl space-y-10">
            {/* Highlights */}
            {post.highlights && post.highlights.length > 0 && (
              <GlassCard className="p-6 md:p-8 bg-gradient-to-br from-brand-50 to-gold-500/10 border-brand-200 shadow-lg" hover>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white text-sm">✨</span>
                  Key Takeaways
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {post.highlights.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">{idx + 1}</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Main Content */}
            <GlassCard className="p-8 md:p-10 lg:p-12 bg-white/80 border-brand-200 shadow-lg">
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-brand-600 hover:prose-a:text-crimson-600 prose-a:transition-colors">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700">{post.content}</div>
              </div>
            </GlassCard>

            {/* Sections */}
            {post.sections && post.sections.length > 0 && (
              <div className="space-y-6">
                <SectionHeading title="In-Depth Sections" />
                <div className="space-y-4">
                  {post.sections.map((section, idx) => (
                    <GlassCard key={section.id} className="p-6 md:p-8 bg-white/80 border-brand-200 hover:border-brand-400/50 hover:shadow-lg transition-all duration-300" hover>
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">{idx + 1}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{section.heading}</h3>
                          <p className="text-gray-600 mb-3 leading-relaxed">{section.body}</p>
                          {section.bullets && (
                            <ul className="space-y-2 text-gray-600">
                              {section.bullets.map((b, i) => (
                                <li key={i} className="flex gap-2 items-start">
                                  <span className="text-brand-500 mt-1">✔</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="space-y-4">
                <SectionHeading title="Frequently Asked Questions" />
                <div className="space-y-3">
                  {post.faqs.map((faq, idx) => (
                    <GlassCard key={idx} className="p-5 md:p-6 bg-gradient-to-br from-white to-brand-50/40 border-brand-200 hover:border-brand-400/50 hover:shadow-md transition-all duration-300" hover>
                      <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 flex items-start gap-3">
                        <span className="text-crimson-500 font-bold">Q:</span>
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed pl-6">{faq.answer}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Related / CTA */}
            {(post.relatedPosts || post.cta) && (
              <GlassCard className="p-6 md:p-8 bg-white/80 border-brand-200 shadow-lg" hover>
                <div className="flex flex-col gap-6">
                  {post.relatedPosts && post.relatedPosts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-brand-600" />
                        Related Articles
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {post.relatedPosts.map((slug) => (
                          <Link
                            key={slug}
                            href={`/blog/${slug}`}
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                          >
                            <ArrowRight className="w-4 h-4" />
                            {slug.replace(/-/g, " ")}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.cta && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-brand-200">
                      <div className="text-gray-700 font-semibold text-lg">{post.cta.text}</div>
                      <Link
                        href={post.cta.link}
                        className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                          post.cta.style === "secondary"
                            ? "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                            : "bg-brand-gradient text-white hover:scale-105 hover:shadow-xl hover:shadow-brand-500/40"
                        }`}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
