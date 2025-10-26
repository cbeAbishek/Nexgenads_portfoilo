'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Target, Eye, Award, Code, Rocket, Brain, Shield, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Abishek G.',
      role: 'Founder',
      description: 'Sets the product vision and keeps the team focused on solving everyday marketing gaps across Tamil Nadu.',
      image: '/team/ab123.webp',
      github: 'https://github.com/abishekg',
      linkedin: 'https://linkedin.com/in/abishekg',
    },
    {
      name: 'Vishnu Dev T',
      role: 'Chief Executive Officer',
      description: 'Leads operations and partnerships while shaping the go-to-market strategy for regional brands.',
      image: '/team/vishnu.jpeg',
      github: 'https://github.com/vishnudevt',
      linkedin: 'https://linkedin.com/in/vishnudevt',
    },
    {
      name: 'Sarran M',
      role: 'Co-Founder',
      description: 'Drives product strategy, translating on-ground feedback from Tamil Nadu businesses into intuitive features.',
      image: '/team/sarran.jpeg',
      github: 'https://github.com/sarranm',
      linkedin: 'https://linkedin.com/in/sarranm',
    },
    {
      name: 'Gabriel Ebenezer',
      role: 'Chief Marketing Officer',
      description: 'Crafts storytelling and brand experiences that resonate with local communities and partners.',
      image: '/team/gabi.jpeg',
      github: 'https://github.com/gabrielebenezer',
      linkedin: 'https://linkedin.com/in/gabrielebenezer',
    },
    {
      name: 'Mathiazhagan A.R',
      role: 'Chief Information Officer',
      description: 'Owns platform reliability, security, and data infrastructure to keep campaigns running smoothly.',
      image: '/team/mathi.png',
      github: 'https://github.com/mathiazhaganar',
      linkedin: 'https://linkedin.com/in/mathiazhaganar',
    },
  ];

  const techStack = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Supabase', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'AI/ML Models', category: 'Intelligence' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'We believe in open, honest communication with all stakeholders',
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'Understanding and addressing the needs of every user',
    },
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Continuously pushing boundaries with cutting-edge technology',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in everything we do',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-background to-card/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">NexGenAds</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five passionate college tech students from Coimbatore with a vision to revolutionize 
            the advertising ecosystem in India
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  NexGenAds was born from a simple observation: the advertising industry in India 
                  is fragmented, with advertisers, mediators, designers, and ad space owners 
                  operating in silos, leading to inefficiencies and missed opportunities.
                </p>
                <p>
                  As five tech students studying in Coimbatore, we witnessed firsthand the struggles 
                  local businesses faced in finding the right advertising channels and creative talent. 
                  We knew there had to be a better way.
                </p>
                <p>
                  Armed with our technical skills and entrepreneurial spirit, we set out to build 
                  a platform that would bridge these gaps. Our goal is to create an intelligent, 
                  transparent ecosystem where all stakeholders can thrive together.
                </p>
                <p>
                  Starting from Coimbatore, we&apos;re building a platform that understands local 
                  nuances while being scalable across India and beyond.
                </p>
              </div>
            </div>
            <div className="glass-effect-strong p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Founded in 2024</h3>
                    <p className="text-sm text-muted-foreground">
                      Started by five college students in Coimbatore
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Mission</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect every stakeholder in the advertising ecosystem seamlessly
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Vision</h3>
                    <p className="text-sm text-muted-foreground">
                      Become India&apos;s leading AI-powered advertising platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-xl text-center hover:glass-effect-strong transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Five passionate students building the future of advertising
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-xl hover:glass-effect-strong transition-all duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border border-white/10">
                  <Image
                    src={member.image}
                    alt={`${member.name} portrait`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                <p className="text-sm text-[#00D9FF] text-center mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground text-center mb-4">{member.description}</p>
                <div className="flex items-center justify-center gap-4">
                  {member.github && (
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Technology</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technologies for performance and scalability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-xl text-center hover:glass-effect-strong transition-all duration-300"
              >
                <Code className="w-8 h-8 text-[#00D9FF] mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{tech.name}</h3>
                <p className="text-xs text-muted-foreground">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-effect-strong p-12 rounded-2xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Us on This <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re an investor, partner, or early user, we&apos;d love to have you with us
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/investors">
                <Button size="lg" className="btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">
                  Invest in Us
                </Button>
              </Link>
              <Link href="/partners">
                <Button size="lg" variant="outline" className="glass-effect">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
