"use client";

import React, { useState } from "react";
import type { JobOpening } from "@/lib/content/careers";
import { 
  Briefcase,
  MapPin, 
  Clock, 
  Building,
  ChevronRight,
  Users,
} from "lucide-react";
import { 
  SectionHeading, 
  GlassCard, 
  Badge, 
} from "@/components/shared/UIComponents";
import JobApplicationForm from "@/components/forms/JobApplicationForm";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-brand-50/60 via-white to-gold-500/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom section-padding relative">
          <div className="mx-auto max-w-4xl py-16 md:py-24 text-center">
            <Badge variant="gradient" className="mb-6 shadow-lg">
              <Users className="w-3 h-3" />
              Join Our Team
            </Badge>

            <h1 className="mb-6 text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#008dec] via-[#1d36bf] to-[#f30a29] bg-clip-text text-transparent">
                Build the Future
              </span>
              <br />
              <span className="text-foreground">of OOH Advertising at </span>
              <span className="text-[#008dec]">Nex</span>
              <span className="text-[#f30a29]">Gen</span>
              <span className="text-[#f3a800]">Ads</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join us and help revolutionize outdoor advertising in India. We&apos;re
              looking for passionate individuals to transform how brands connect
              with audiences.
            </p>

            <p className="mt-4 text-sm text-gray-600">
              HR contact:{" "}
              <a
                className="font-semibold text-brand-600 hover:underline"
                href="mailto:hr@nexgenads.space"
              >
                hr@nexgenads.space
              </a>
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div className="text-center px-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-brand-200 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#008dec] to-[#1d36bf] bg-clip-text text-transparent">
                  {jobOpenings.length}
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">
                  Open Positions
                </div>
              </div>
              <div className="text-center px-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-crimson-200 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#f30a29] to-[#f30a29]/70 bg-clip-text text-transparent">
                  4+
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">
                  Departments
                </div>
              </div>
              <div className="text-center px-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gold-200 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#f3a800] to-[#f3a800]/70 bg-clip-text text-transparent">
                  3
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">
                  Locations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title="Current Openings"
              subtitle={`${jobOpenings.length} exciting opportunities to grow your career`}
              centered
            />

            <div className="mt-12 space-y-6">
              {jobOpenings.map((job) => (
                <GlassCard
                  key={job.id}
                  className="p-6 md:p-8 bg-white/80 border-brand-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300"
                  hover
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="gradient" className="shadow-sm">
                          {job.department}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                        >
                          {job.employmentType}
                        </Badge>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 hover:text-brand-600 transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {job.department}
                        </span>
                      </div>

                      <p className="text-[#000000]/70 mb-4">
                        {job.description}
                      </p>

                      {job.salary && (
                        <div className="text-[#008dec] font-semibold mb-4">
                          💰 {job.salary}
                        </div>
                      )}

                      {/* Key Highlights */}
                      <div className="space-y-3 mt-4">
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                          Key Responsibilities:
                        </h4>
                        <ul className="grid gap-2.5 text-sm text-gray-600">
                          {job.responsibilities
                            .slice(0, 3)
                            .map((resp, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 group"
                              >
                                <ChevronRight className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex flex-col gap-3 lg:w-52">
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Apply Now
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>
                          Posted{" "}
                          {new Date(job.postedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section-padding border-t border-blue-100 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container-custom">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={
                <>
                  Why Join <span className="text-blue-600">Nex</span>
                  <span className="text-red-600">Gen</span>
                  <span className="text-yellow-500">Ads</span>?
                </>
              }
              subtitle="Benefits of working with us"
              centered
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Industry Innovation",
                  description:
                    "Work on cutting-edge OOH and DOOH advertising technology that's transforming the industry",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Growth Opportunities",
                  description:
                    "Fast-paced startup environment with clear paths for career advancement and skill development",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Competitive Compensation",
                  description:
                    "Market-leading salaries with performance bonuses and equity options for key roles",
                  gradient: "from-pink-500 to-red-500",
                },
                {
                  title: "Work-Life Balance",
                  description:
                    "Flexible working hours, hybrid work options, and comprehensive leave policies",
                  gradient: "from-indigo-500 to-blue-500",
                },
                {
                  title: "Learning & Development",
                  description:
                    "Access to courses, conferences, and workshops to enhance your professional skills",
                  gradient: "from-green-500 to-teal-500",
                },
                {
                  title: "Impact & Ownership",
                  description:
                    "Your work directly shapes the future of outdoor advertising across Tamil Nadu",
                  gradient: "from-orange-500 to-yellow-500",
                },
              ].map((benefit, index) => (
                <GlassCard
                  key={index}
                  className="p-6 bg-white/80 border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                  hover
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.gradient} mb-4 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </GlassCard>
              ))}
            </div>
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
