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
    title: 'Email',
    value: 'hello@nexgenads.space',
    link: 'mailto:hello@nexgenads.space',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 98765 43210',
    link: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Coimbatore, Tamil Nadu, India',
    link: '#map',
  },
];

const socialLinks: SocialLink[] = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
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
    <div className="min-h-screen">
      <section className="section-padding bg-gradient-to-b from-background to-card/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.link}
                className="glass-effect p-8 rounded-xl text-center hover:glass-effect-strong transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-muted-foreground">{info.value}</p>
              </a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-effect-strong p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                  required
                  className="bg-background/50"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  required
                  className="bg-background/50"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className="bg-background/50"
                />
                <Select onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}>
                  <SelectTrigger className="bg-background/50">
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
                  className="bg-background/50"
                />
                <Textarea
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  required
                  rows={5}
                  className="bg-background/50"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {submitMessage && (
                  <p className={`text-sm text-center ${
                    submitMessage.includes('Thank') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div id="map" className="glass-effect-strong p-4 rounded-xl h-80">
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

              <div className="glass-effect-strong p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:glass-effect-strong transition-all group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-[#00D9FF] transition-colors" />
                    </a>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
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
