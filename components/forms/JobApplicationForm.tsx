"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  FileText,
  ArrowRight,
} from "lucide-react";
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

const steps = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Professional", icon: Briefcase },
  { id: 3, label: "Cover Letter", icon: FileText },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9][0-9]{9}$/;

export default function JobApplicationForm({
  job,
  open,
  onClose,
}: JobApplicationFormProps) {
  const [step, setStep] = useState(1);
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    details?: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digits }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!formData.fullName.trim()) errs.fullName = "Full name is required";
      if (!formData.email.trim()) errs.email = "Email is required";
      else if (!emailRegex.test(formData.email))
        errs.email = "Enter a valid email address";
      if (!formData.phone) errs.phone = "Mobile number is required";
      else if (!phoneRegex.test(formData.phone))
        errs.phone = "Enter a valid 10-digit mobile number";
      if (!formData.currentLocation.trim())
        errs.currentLocation = "Current location is required";
    } else if (s === 2) {
      if (!formData.experience.trim()) errs.experience = "Experience is required";
      if (!formData.resumeLink.trim()) errs.resumeLink = "Resume link is required";
      else if (!/^https?:\/\/.+/.test(formData.resumeLink))
        errs.resumeLink = "Enter a valid URL (https://...)";
      if (
        formData.linkedinProfile &&
        !/^https?:\/\/.+/.test(formData.linkedinProfile)
      )
        errs.linkedinProfile = "Enter a valid URL";
      if (
        formData.portfolioLink &&
        !/^https?:\/\/.+/.test(formData.portfolioLink)
      )
        errs.portfolioLink = "Enter a valid URL";
    } else if (s === 3) {
      if (!formData.coverLetter.trim())
        errs.coverLetter = "Please tell us why you're interested";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    setStep((p) => Math.min(p + 1, steps.length));
  };

  const backStep = () => setStep((p) => Math.max(p - 1, 1));

  const fetchLocation = async () => {
    if (!open || formData.currentLocation.trim()) return;
    setIsLocating(true);
    try {
      const res = await fetch("/api/location", { cache: "no-store" });
      if (!res.ok) throw new Error("Location service unavailable");
      const data = await res.json();
      if (data.district) {
        setFormData((prev) => ({ ...prev, currentLocation: data.district }));
        setErrors((prev) => ({ ...prev, currentLocation: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          currentLocation:
            "Could not detect your district. Please enter it manually.",
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        currentLocation:
          "Could not fetch location. Please enter your district manually.",
      }));
    } finally {
      setIsLocating(false);
    }
  };

  const didAutoFetch = useRef(false);
  useEffect(() => {
    if (open && !didAutoFetch.current) {
      didAutoFetch.current = true;
      fetchLocation();
    }
    if (!open) didAutoFetch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setStep(3);
      return;
    }
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
          message:
            "Application submitted successfully! We'll review your application and get back to you soon.",
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
        setStep(1);
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.error || "Failed to submit application. Please try again.",
          details: data.details,
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "bg-white border-gray-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-sm hover:shadow-md";
  const inputErrorClass =
    "border-red-400 focus:border-red-500 focus:ring-red-200 hover:border-red-400";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-brand-200 text-gray-900 shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-[#1d36bf]">
                Apply for {job.title}
              </DialogTitle>
              <DialogDescription className="text-gray-600 font-medium text-base mt-2">
                {job.department} • {job.location} • {job.employmentType}
              </DialogDescription>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isComplete = step > s.id;
                const isActive = step === s.id;
                return (
                  <React.Fragment key={s.id}>
                    <button
                      type="button"
                      onClick={() => s.id < step && setStep(s.id)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isComplete
                            ? "border-brand-500 bg-brand-500 text-white"
                            : isActive
                              ? "border-brand-500 bg-brand-50 text-brand-600 shadow-md shadow-brand-500/20"
                              : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        {isComplete ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          isActive || isComplete
                            ? "text-brand-700"
                            : "text-gray-400"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                    {i < steps.length - 1 && (
                      <div
                        className={`mb-5 h-0.5 flex-1 rounded-full transition-all duration-500 ${
                          step > s.id ? "bg-brand-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 p-6 bg-white rounded-xl border border-brand-100 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white text-sm font-bold">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    Personal Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`${inputClass} ${errors.fullName ? inputErrorClass : ""}`}
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
                      placeholder="98765 43210"
                    />
                    <p className="text-xs text-gray-500">
                      10-digit Indian mobile number
                    </p>
                    {errors.phone && (
                      <p className="text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="currentLocation"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Current Location (District){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="currentLocation"
                      name="currentLocation"
                      value={formData.currentLocation}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-9 pr-10 ${errors.currentLocation ? inputErrorClass : ""}`}
                      placeholder="Detecting your district..."
                      disabled={isLocating}
                    />
                    {isLocating && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="block h-4 w-4 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
                      </span>
                    )}
                  </div>
                  {errors.currentLocation && (
                    <p className="text-xs text-red-600">
                      {errors.currentLocation}
                    </p>
                  )}
                  {isLocating && !errors.currentLocation && (
                    <p className="text-xs text-brand-600">
                      Detecting your district automatically...
                    </p>
                  )}
                  {!isLocating &&
                    !errors.currentLocation &&
                    formData.currentLocation && (
                      <p className="text-xs text-green-700">
                        District detected automatically. You can edit it if
                        needed.
                      </p>
                    )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 p-6 bg-white rounded-xl border border-brand-100 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white text-sm font-bold">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    Professional Information
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="experience"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Total Experience <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`${inputClass} ${errors.experience ? inputErrorClass : ""}`}
                      placeholder="e.g., 3 years"
                    />
                    {errors.experience && (
                      <p className="text-xs text-red-600">
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="currentCompany"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Current Company
                    </Label>
                    <Input
                      id="currentCompany"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Current employer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="resumeLink"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Resume Link (Google Drive / Dropbox){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="resumeLink"
                    name="resumeLink"
                    type="url"
                    value={formData.resumeLink}
                    onChange={handleInputChange}
                    className={`${inputClass} ${errors.resumeLink ? inputErrorClass : ""}`}
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-xs text-gray-500">
                    Please ensure the link is publicly accessible
                  </p>
                  {errors.resumeLink && (
                    <p className="text-xs text-red-600">{errors.resumeLink}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="linkedinProfile"
                      className="text-sm font-semibold text-gray-700"
                    >
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedinProfile"
                      name="linkedinProfile"
                      type="url"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      className={`${inputClass} ${errors.linkedinProfile ? inputErrorClass : ""}`}
                      placeholder="https://linkedin.com/in/..."
                    />
                    {errors.linkedinProfile && (
                      <p className="text-xs text-red-600">
                        {errors.linkedinProfile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="portfolioLink"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Portfolio Link
                    </Label>
                    <Input
                      id="portfolioLink"
                      name="portfolioLink"
                      type="url"
                      value={formData.portfolioLink}
                      onChange={handleInputChange}
                      className={`${inputClass} ${errors.portfolioLink ? inputErrorClass : ""}`}
                      placeholder="https://yourportfolio.com"
                    />
                    {errors.portfolioLink && (
                      <p className="text-xs text-red-600">
                        {errors.portfolioLink}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 p-6 bg-white rounded-xl border border-brand-100 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white text-sm font-bold">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    Cover Letter
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="coverLetter"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Why are you interested in this role?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={7}
                    className={`bg-white border-gray-200 hover:border-brand-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-sm hover:shadow-md resize-none ${errors.coverLetter ? inputErrorClass : ""}`}
                    placeholder="Tell us about your interest in this role and what makes you a great fit..."
                  />
                  {errors.coverLetter && (
                    <p className="text-xs text-red-600">
                      {errors.coverLetter}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`mt-5 p-4 rounded-xl font-medium shadow-md ${
                submitStatus.type === "success"
                  ? "bg-green-50 border-2 border-green-500 text-green-700"
                  : "bg-red-50 border-2 border-red-500 text-red-700"
              }`}
            >
              <p>{submitStatus.message}</p>
              {submitStatus.details && (
                <p className="mt-2 text-xs opacity-80">{submitStatus.details}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={step === 1 ? onClose : backStep}
              className={`border-2 ${step === 1 ? "border-gray-300 text-gray-700 hover:bg-gray-100" : "border-brand-300 text-brand-700 hover:bg-brand-50"}`}
            >
              {step === 1 ? (
                "Cancel"
              ) : (
                <span className="flex items-center gap-1.5">
                  <ChevronLeft className="h-4 w-4" /> Back
                </span>
              )}
            </Button>

            {step < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 px-7"
              >
                <span className="flex items-center gap-1.5">
                  Continue <ChevronRight className="h-4 w-4" />
                </span>
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 px-7 py-3"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Review & Apply <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
