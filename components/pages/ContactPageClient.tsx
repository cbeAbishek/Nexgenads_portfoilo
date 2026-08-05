'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
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

type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
};

type ContactInfo = {
  icon: typeof Mail;
  title: string;
  value: string;
  link: string;
};

type SocialLink = {
  icon: typeof Linkedin;
  href: string;
  label: string;
};

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@nexgenads.space",
    link: "mailto:contact@nexgenads.space",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 95663 72450",
    link: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Coimbatore, Tamil Nadu, India",
    link: "#map",
  },
];

const socialLinks: SocialLink[] = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/nexgenads-ai/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/nexgenads.ai?igsh=aWxsbXV2aml4MDE3', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/share/1aP2yyEf6U/', label: 'Facebook' },
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We\'ll get back to you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: '',
          message: '',
        });
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-background">
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-gold-500/10 border-b border-border">
        <div className="container-custom text-center pt-20 md:pt-2">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground tracking-tight">
            Get in <span className="bg-gradient-to-r from-[#008dec] via-[#1d36bf] to-[#f30a29] bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions or want to collaborate with <span className="text-[#008dec] font-semibold">Nex</span><span className="text-[#f30a29] font-semibold">Gen</span><span className="text-[#f3a800] font-semibold">Ads</span>? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            {contactInfo.map((info, index) => {
              const gradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500',
              'from-pink-500 to-red-500'
              ];
              return (
              <a
                key={info.title}
                href={info.link}
                className="bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group text-center"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                <info.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors">{info.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{info.value}</p>
              </a>
              );
            })}
            </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-blue-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-md">1</span>
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                  required
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  required
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                />
                <Select onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}>
                  <SelectTrigger className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md">
                    <SelectValue placeholder="Inquiry Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="business">Business Partnership</SelectItem>
                    <SelectItem value="investment">Investment Opportunity</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                  required
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md"
                />
                <Textarea
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  required
                  rows={5}
                  className="bg-white border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow-md resize-none"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 py-6 text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
                {submitMessage && (
                  <div className={`p-4 rounded-xl font-medium shadow-md text-center ${
                    submitMessage.includes('Thank') ? 'bg-green-50 border-2 border-green-500 text-green-700' : 'bg-red-50 border-2 border-red-500 text-red-700'
                  }`}>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">{submitMessage.includes('Thank') ? '✅' : '⚠️'}</span>
                      {submitMessage}
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div id="map" className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-lg h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125618.23272836075!2d76.98785994335938!3d11.016844600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Coimbatore Location"
                ></iframe>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-purple-100 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-md">2</span>
                  <h3 className="text-xl font-bold text-gray-900">Connect with Us</h3>
                </div>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                    </a>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                  Follow us on social media for the latest updates and announcements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
