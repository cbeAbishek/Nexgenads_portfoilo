"use client";

import React from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/content";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { SectionHeading, GlassCard, Badge } from "@/components/shared/UIComponents";

export default function BlogListingClient() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="container-custom section-padding relative">
          <div className="mx-auto max-w-4xl py-12 md:py-20">
            <Badge variant="gradient" className="mb-6 shadow-lg">
              Industry Insights
            </Badge>
            
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                OOH Advertising
              </span>
              <br />
              <span className="text-gray-900">Insights & Trends</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Expert perspectives on outdoor advertising, DOOH strategies, billboard optimization, and the future of out-of-home media in India by <span className="text-blue-600 font-semibold">Nex</span><span className="text-red-600 font-semibold">Gen</span><span className="text-yellow-500 font-semibold">Ads</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-padding border-b border-blue-100 bg-white">
          <div className="container-custom">
            <SectionHeading title="Featured Articles" subtitle="In-depth guides and industry analysis" />
            
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <GlassCard className="h-full p-6 md:p-8 bg-white/80 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300" hover>
                    {/* Cover Image */}
                    <div className={`mb-6 h-48 md:h-56 overflow-hidden rounded-xl bg-gradient-to-br ${index === 0 ? 'from-blue-500/20 via-purple-500/20 to-pink-500/20' : 'from-pink-500/20 via-purple-500/20 to-blue-500/20'} flex items-center justify-center`}>
                      <span className="text-6xl">📰</span>
                    </div>
                    
                    {/* Meta Info */}
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg text-blue-600 font-medium">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-lg text-purple-600 font-medium">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                      </span>
                      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                        {post.category}
                      </Badge>
                    </div>

                    {/* Title & Excerpt */}
                    <h2 className="mb-3 text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                      <span className="text-sm text-gray-500 font-medium">
                        By {post.author}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="section-padding bg-gradient-to-b from-white to-blue-50/30">
        <div className="container-custom">
          <SectionHeading 
            title="All Articles" 
            subtitle="Comprehensive guides and industry insights"
          />
          
          <div className="space-y-6">
            {regularPosts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <GlassCard className="p-6 md:p-8 bg-white/80 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300" hover>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      {/* Meta Info */}
                      <div className="mb-3 flex flex-wrap items-center gap-2 md:gap-3 text-sm">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-lg text-blue-600 font-medium">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 rounded-lg text-purple-600 font-medium">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min
                        </span>
                        <span className="hidden sm:block text-gray-300">•</span>
                        <span className="text-gray-500 font-medium">{post.author}</span>
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                          {post.category}
                        </Badge>
                      </div>

                      {/* Title & Excerpt */}
                      <h2 className="mb-2 text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {post.title}
                      </h2>
                      <p className="mb-4 text-gray-600 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <div className={`md:w-56 h-40 md:h-auto flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-100 via-purple-100 to-pink-100' : 'from-pink-100 via-purple-100 to-blue-100'} flex items-center justify-center shadow-sm`}>
                      <span className="text-4xl">📄</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <GlassCard className="p-5 md:p-5 text-center bg-white/80 border-blue-100 shadow-xl">
              <h2 className="mb-4 text-2xl md:text-3xl font-bold text-gray-900">
                Stay Updated on OOH Trends
              </h2>
              <p className="mb-8 text-lg text-gray-600 leading-relaxed">
                Get the latest outdoor advertising insights, industry news, and strategic guides from <span className="text-blue-600 font-semibold">Nex</span><span className="text-red-600 font-semibold">Gen</span><span className="text-yellow-500 font-semibold">Ads</span>
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/career"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
                >
                  About the Author
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50"
                >
                  Explore NexGenAds
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div> */}
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
