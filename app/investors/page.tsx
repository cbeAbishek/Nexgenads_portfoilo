'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, Globe, DollarSign, Download, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function InvestorsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    investmentInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/investors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your interest! We\'ll contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          investmentInterest: '',
          message: '',
        });
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
            console.error('Investor form submission error:', error);
            setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const marketStats = [
    {
      icon: Globe,
      value: '$500B+',
      label: 'Global Ad Market',
      description: 'Projected market size by 2027',
    },
    {
      icon: TrendingUp,
      value: '12.8%',
      label: 'Annual Growth',
      description: 'CAGR in digital advertising',
    },
    {
      icon: Users,
      value: '1M+',
      label: 'Target Users',
      description: 'Potential stakeholders in India',
    },
    {
      icon: DollarSign,
      value: '₹50Cr',
      label: 'Revenue Target',
      description: 'Projected Year 3 revenue',
    },
  ];

  const opportunities = [
    {
      title: 'Early-Stage Entry',
      description: 'Get in at the ground floor of a disruptive platform with massive potential',
    },
    {
      title: 'Scalable Business Model',
      description: 'Commission-based revenue with multiple monetization streams',
    },
    {
      title: 'Experienced Team',
      description: 'Five passionate tech students with complementary skills and industry insights',
    },
    {
      title: 'Large TAM',
      description: 'Targeting India\'s $10B+ advertising market with expansion plans',
    },
    {
      title: 'AI Technology',
      description: 'Proprietary algorithms for intelligent matching and recommendations',
    },
    {
      title: 'First-Mover Advantage',
      description: 'Unique positioning in the intermediary advertising space',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-card/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Investment <span className="text-gradient">Opportunity</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us in revolutionizing India&apos;s advertising ecosystem
          </p>
        </div>
      </section>

      {/* Market Stats */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <div
                key={index}
                className="glass-effect-strong p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-2">{stat.value}</h3>
                <p className="font-semibold mb-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Business Model</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple revenue streams ensuring sustainable growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Commission-Based</h3>
              <p className="text-muted-foreground mb-4">
                10-15% commission on successful transactions between advertisers and ad space owners
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2"></div>
                  <span className="text-sm">Transaction-based revenue</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2"></div>
                  <span className="text-sm">Scalable with volume</span>
                </li>
              </ul>
            </div>

            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Subscription Tiers</h3>
              <p className="text-muted-foreground mb-4">
                Premium features and tools for power users and agencies
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2"></div>
                  <span className="text-sm">Recurring monthly revenue</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2"></div>
                  <span className="text-sm">High-margin income</span>
                </li>
              </ul>
            </div>

            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Premium Services</h3>
              <p className="text-muted-foreground mb-4">
                Consulting, analytics, and white-label solutions for enterprises
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2"></div>
                  <span className="text-sm">Custom solutions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2"></div>
                  <span className="text-sm">Enterprise contracts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why <span className="text-gradient">Invest</span> in Us?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-xl hover:glass-effect-strong transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">{opportunity.title}</h3>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Form */}
      <section className="section-padding bg-card/30">
        <div className="container-custom max-w-4xl">
          <div className="glass-effect-strong p-8 md:p-12 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Express Your <span className="text-gradient">Interest</span>
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll send you our detailed pitch deck
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
              <Input
                type="text"
                placeholder="Investment Interest Range"
                value={formData.investmentInterest}
                onChange={(e) => setFormData({ ...formData, investmentInterest: e.target.value })}
                className="bg-background/50"
              />
              <Textarea
                placeholder="Additional Comments"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-background/50"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="glass-effect"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Pitch Deck
                </Button>
              </div>
              {submitMessage && (
                <p className={`text-sm text-center ${submitMessage.includes('Thank') ? 'text-green-500' : 'text-red-500'}`}>
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
