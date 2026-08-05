"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { JobOpening } from "@/lib/content/careers";

interface JobApplicationFormProps {
  job: JobOpening;
  open: boolean;
  onClose: () => void;
}

export default function JobApplicationForm({ job, open, onClose }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentLocation: "",
    experience: "",
    currentCompany: "",
    resumeLink: "",
    linkedinProfile: "",
    portfolioLink: "",
    coverLetter: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          jobId: job.id,
          jobTitle: job.title,
          appliedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully! We'll review your application and get back to you soon.",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          currentLocation: "",
          experience: "",
          currentCompany: "",
          resumeLink: "",
          linkedinProfile: "",
          portfolioLink: "",
          coverLetter: "",
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit application. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-brand-50 via-white to-gold-500/10 border-brand-200 text-gray-900 shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-[#1d36bf]">
            Apply for {job.title}
          </DialogTitle>
          <DialogDescription className="text-gray-600 font-medium text-base mt-2">
            {job.department} • {job.location} • {job.employmentType}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div className="space-y-4 p-6 bg-white/80 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">1</span>
              Personal Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                placeholder="Your full name"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentLocation" className="text-sm font-semibold text-gray-700">
                Current Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="currentLocation"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleInputChange}
                required
                className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                placeholder="City, State"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4 p-6 bg-white/80 rounded-xl border border-purple-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">2</span>
              Professional Information
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-semibold text-gray-700">
                  Total Experience <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="e.g., 3 years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentCompany" className="text-sm font-semibold text-gray-700">
                  Current Company
                </Label>
                <Input
                  id="currentCompany"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Current employer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeLink" className="text-sm font-semibold text-gray-700">
                Resume Link (Google Drive / Dropbox) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="resumeLink"
                name="resumeLink"
                type="url"
                value={formData.resumeLink}
                onChange={handleInputChange}
                required
                className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                placeholder="https://drive.google.com/..."
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="text-blue-500">ℹ️</span>
                Please ensure the link is publicly accessible
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="linkedinProfile" className="text-sm font-semibold text-gray-700">
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedinProfile"
                  name="linkedinProfile"
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioLink" className="text-sm font-semibold text-gray-700">
                  Portfolio Link
                </Label>
                <Input
                  id="portfolioLink"
                  name="portfolioLink"
                  type="url"
                  value={formData.portfolioLink}
                  onChange={handleInputChange}
                  className="bg-white border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4 p-6 bg-white/80 rounded-xl border border-pink-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-sm font-bold">3</span>
              Cover Letter
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-sm font-semibold text-gray-700">
                Why are you interested in this role? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                required
                rows={6}
                className="bg-white border-gray-200 hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all shadow-sm hover:shadow-md resize-none"
                placeholder="Tell us about your interest in this role and what makes you a great fit..."
              />
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`p-4 rounded-xl font-medium shadow-md ${
                submitStatus.type === "success"
                  ? "bg-green-50 border-2 border-green-500 text-green-700"
                  : "bg-red-50 border-2 border-red-500 text-red-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{submitStatus.type === "success" ? "✅" : "⚠️"}</span>
                {submitStatus.message}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 py-6 text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting Application...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Submit Application
                  <span className="text-xl">🚀</span>
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-medium px-6 transition-all"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
