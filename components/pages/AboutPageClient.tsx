'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Target, Eye, Award, Code, Rocket, Brain, Shield, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPageClient = () => {
  const teamMembers = [
    {
      name: 'Abishek G.',
      role: 'Founder',
      description: 'Sets the product vision and keeps the team focused on solving everyday marketing gaps',
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
    
    // {
    //   name: 'Sarran M',
    //   role: 'Co-Founder',
    //   description: 'Drives product strategy, translating on-ground feedback from Tamil Nadu businesses into intuitive features.',
    //   image: '/team/sarran.jpeg',
    //   github: 'https://github.com/sarranm',
    //   linkedin: 'https://linkedin.com/in/sarranm',
    // },
    // {
    //   name: 'Gabriel Ebenezer',
    //   role: 'Chief Marketing Officer',
    //   description: 'Crafts storytelling and brand experiences that resonate with local communities and partners.',
    //   image: '/team/gabi.jpeg',
    //   github: 'https://github.com/gabrielebenezer',
    //   linkedin: 'https://linkedin.com/in/gabrielebenezer',
    // },
    // {
    //   name: 'Mathiazhagan A.R',
    //   role: 'Chief Information Officer',
    //   description: 'Owns platform reliability, security, and data infrastructure to keep campaigns running smoothly.',
    //   image: '/team/mathi.png',
    //   github: 'https://github.com/mathiazhaganar',
    //   linkedin: 'https://linkedin.com/in/mathiazhaganar',
    // },
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <section className="section-padding bg-gradient-to-br from-blue-50/80 via-white to-red-50/30 pt">
        <div className="container-custom text-center pt-16">
          <h1 className="text-4xl  md:text-6xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-neue-machina)' }}>
          <span className="text-blue-600">Nex</span><span className="text-red-600">Gen</span><span className="text-yellow-500">Ads</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Five passionate college tech students from Coimbatore with a vision to revolutionize
            the advertising ecosystem in India
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our <span className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
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
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">Founded in 2024</h3>
                    <p className="text-sm text-gray-600">
                      Started by five college students in Coimbatore
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">Our Mission</h3>
                    <p className="text-sm text-gray-600">
                      Connect every stakeholder in the advertising ecosystem seamlessly
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">Our Vision</h3>
                    <p className="text-sm text-gray-600">
                      Become India&apos;s leading AI-powered advertising platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-gray-50 to-blue-50/30">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our <span className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Meet the <span className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-500 bg-clip-text text-transparent">Team</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
        passionate students building the future of advertising
        </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
          >
            {/* Decorative gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-red-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Profile image with ring effect */}
            <div className="relative z-10">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-full animate-pulse opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-1 bg-white rounded-full" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
              <Image
            src={member.image}
            alt={`${member.name} portrait`}
            fill
            sizes="112px"
            className="object-cover"
              />
            </div>
          </div>
          
          {/* Name and role */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
              {member.name}
            </h3>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-red-500 rounded-full">
              {member.role}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
            {member.description}
          </p>
          
          {/* Social links */}
          {/* <div className="flex items-center justify-center gap-3">
            {member.github && (
              <Link
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110"
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
            aria-label={`${member.name} LinkedIn`}
              >
            <Linkedin className="w-5 h-5" />
              </Link>
            )}
          </div> */}
            </div>
          </div>
        ))}
          </div>
        </div>
      </section>

      {/* <section className="section-padding">
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
                <Button size="lg" className="btn-glow bg-gradient-to-r from-[#008dec] to-[#1d36bf]">
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
      </section> */}
    </div>
  );
};

export default AboutPageClient;
