'use client';

import React, { useState } from 'react';
import { Users, Briefcase, Palette, Building2, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PartnersPageClient() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    partnerType: '',
    experienceYears: '',
    portfolioUrl: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We\'ll review your application and get back to you.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          partnerType: '',
          experienceYears: '',
          portfolioUrl: '',
          message: '',
        });
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
        console.error('Partner application submission error:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerTypes = [
    {
      icon: Briefcase,
      title: 'Advertisers',
      description: 'Businesses looking to promote their products and services',
      benefits: [
        'Access to verified ad spaces',
        'AI-powered recommendations',
        'Transparent pricing',
        'Campaign analytics',
        'Dedicated support',
      ],
    },
    {
      icon: Users,
      title: 'Mediators',
      description: 'Professionals connecting advertisers with opportunities',
      benefits: [
        'Commission-based earnings',
        'Flexible work schedule',
        'Professional tools',
        'Training & resources',
        'Growing network',
      ],
    },
    {
      icon: Palette,
      title: 'Designers',
      description: 'Creative professionals bringing advertising visions to life',
      benefits: [
        'Project marketplace',
        'Fair compensation',
        'Portfolio showcase',
        'Consistent work flow',
        'Creative freedom',
      ],
    },
    {
      icon: Building2,
      title: 'Ad Space Owners',
      description: 'Property owners monetizing their advertising spaces',
      benefits: [
        'Automated matching',
        'Multiple revenue streams',
        'Performance tracking',
        'Hassle-free management',
        'Market insights',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 pt-28 pb-16 md:px-6 md:pt-36 md:pb-24 bg-gradient-to-b from-background to-card/30 lg:px-8">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Partner <span className="text-gradient">With Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our ecosystem and be part of the advertising revolution
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Who Can <span className="text-gradient">Partner</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We welcome all stakeholders in the advertising ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTypes.map((type, index) => (
              <div
                key={index}
                className="glass-effect-strong p-8 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#008dec] to-[#1d36bf] flex items-center justify-center mb-6">
                  <type.icon className="w-8 h-8 text-[#000000]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Benefits:</p>
                  {type.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#008dec] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why <span className="text-gradient">Partner</span> With NexGenAds?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Innovative Platform</h3>
              <p className="text-muted-foreground">
                Leverage cutting-edge AI technology for smarter connections and better outcomes
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Fair & Transparent</h3>
              <p className="text-muted-foreground">
                Clear pricing, honest dealings, and no hidden fees. Everything is upfront.
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Growing Community</h3>
              <p className="text-muted-foreground">
                Join a thriving ecosystem of professionals dedicated to excellence
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Get assistance whenever you need it with our dedicated support team
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Regular Training</h3>
              <p className="text-muted-foreground">
                Access workshops, webinars, and resources to enhance your skills
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
              <p className="text-muted-foreground">
                Scale your business or career with our expanding platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="glass-effect-strong p-8 md:p-12 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Apply to <span className="text-gradient">Partner</span>
              </h2>
              <p className="text-muted-foreground">
                Fill out the application below and we&apos;ll get back to you within 48 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="bg-background/50"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background/50"
                />
                <Input
                  type="text"
                  placeholder="Company/Organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background/50"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Select onValueChange={(value) => setFormData({ ...formData, partnerType: value })} required>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Partner Type *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advertiser">Advertiser</SelectItem>
                    <SelectItem value="mediator">Mediator</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="ad_space_owner">Ad Space Owner</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Years of Experience"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  min="0"
                  className="bg-background/50"
                />
              </div>
              <Input
                type="url"
                placeholder="Portfolio/Website URL"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="bg-background/50"
              />
              <Textarea
                placeholder="Tell us about yourself and why you want to partner with us *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="bg-background/50"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#008dec] to-[#1d36bf] hover:opacity-90"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
              {submitMessage && (
                <p className={`text-center ${submitMessage.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

