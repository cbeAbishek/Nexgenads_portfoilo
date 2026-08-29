"use client";

import React, { useState } from "react";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";
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

  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<{
    type: "info" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    details?: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus({
        type: "error",
        message: "Geolocation is not supported by this browser.",
      });
      return;
    }

    setIsLocating(true);
    setLocationStatus({ type: null, message: "" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`,
          );
          if (!res.ok) throw new Error("Geocoding failed");
          const data = await res.json();
          const a = data.address ?? {};
          const district =
            a.district ||
            a.county ||
            a.suburb ||
            a.city ||
            a.town ||
            a.municipality ||
            "";
          const districtName = district.replace(/\s+district\s*$/i, "").trim();
          if (districtName) {
            setFormData((prev) => ({ ...prev, currentLocation: districtName }));
            setLocationStatus({
              type: "info",
              message: "Your district has been auto-filled.",
            });
          } else {
            setLocationStatus({
              type: "error",
              message: "Could not detect district. Please enter it manually.",
            });
          }
        } catch {
          setLocationStatus({
            type: "error",
            message: "Could not fetch location. Please enter it manually.",
          });
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        setLocationStatus({
          type: "error",
          message:
            "Location permission denied. Please enter your district manually.",
        });
      },
      { timeout: 10000 },
    );
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
          details: data.details,
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
          <div className="space-y-4 p-6 bg-white/80 rounded-xl border border-brand-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-r bg-brand-500 flex items-center justify-center text-white text-sm font-bold">1</span>
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
                className="bg-white border-gray-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-sm hover:shadow-md"
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
                  className="bg-white border-gray-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setFormData((prev) => ({ ...prev, phone: value }));
                  }}
                  required
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
                  className="bg-white border-gray-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="98765 43210"
                />
                <p className="text-xs text-gray-500">10-digit Indian mobile number</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentLocation" className="text-sm font-semibold text-gray-700">
                Current Location (District) <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="currentLocation"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    required
                    className="bg-white border-gray-200 pl-9 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-sm hover:shadow-md"
                    placeholder="Enter your district (e.g. Mumbai)"
                  />
                </div>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isLocating}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-brand-300 bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-100 hover:border-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LocateFixed className="h-4 w-4" />
                  )}
                  {isLocating ? "Detecting..." : "Detect"}
                </button>
              </div>
              {locationStatus.type && (
                <p
                  className={`text-xs ${
                    locationStatus.type === "error"
                      ? "text-red-600"
                      : "text-green-700"
                  }`}
                >
                  {locationStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4 p-6 bg-white/80 rounded-xl border border-crimson-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-r bg-crimson-500 flex items-center justify-center text-white text-sm font-bold">2</span>
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
                  className="bg-white border-gray-200 hover:border-crimson-400 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-200 transition-all shadow-sm hover:shadow-md"
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
                  className="bg-white border-gray-200 hover:border-crimson-400 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-200 transition-all shadow-sm hover:shadow-md"
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
                className="bg-white border-gray-200 hover:border-crimson-400 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-200 transition-all shadow-sm hover:shadow-md"
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
                  className="bg-white border-gray-200 hover:border-crimson-400 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-200 transition-all shadow-sm hover:shadow-md"
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
                  className="bg-white border-gray-200 hover:border-crimson-400 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4 p-6 bg-white/80 rounded-xl border border-gold-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-ink-700 text-sm font-bold">3</span>
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
                className="bg-white border-gray-200 hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-all shadow-sm hover:shadow-md resize-none"
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
              {submitStatus.details && (
                <p className="mt-2 text-xs opacity-80">{submitStatus.details}</p>
              )}
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
