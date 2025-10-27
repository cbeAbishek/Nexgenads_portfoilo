'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin, Sparkles, Zap, Users, Palette, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PushSubscriptionPrompt from '@/components/pwa/PushSubscriptionPrompt';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = 'rgba(0, 217, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10"></div>
      <div className="relative z-20 container-custom text-center space-y-8 px-4">
        <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full animate-fade-up">
          <MapPin className="w-4 h-4 text-[#00D9FF]" />
          <span className="text-sm">Born in Coimbatore • Built for Tamil Nadu</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up">
          <span className="text-gradient">Powering Tamil Nadu&apos;s</span>
          <br />
          <span className="text-foreground">next wave of advertising</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
          A single intelligent hub that connects Tamil Nadu&apos;s brands, media partners, designers, and ad space owners to launch bold campaigns faster.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" asChild className="btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-lg px-8">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="glass-effect text-lg px-8">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
        <div className="inline-flex items-center space-x-2 glass-effect-strong px-6 py-3 rounded-full animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <Sparkles className="w-5 h-5 text-[#00D9FF] animate-pulse" />
          <span className="text-lg font-semibold">Launching soon across Tamil Nadu</span>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#00D9FF] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#00D9FF] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Smart AI finds the right ad spaces and partners for Tamil Nadu brands in seconds.',
    },
    {
      icon: Users,
      title: 'Mediator Marketplace',
      description: 'Give trusted media partners a digital marketplace with transparent deals and faster payouts.',
    },
    {
      icon: Palette,
      title: 'Designer Network',
      description: 'Showcase the creative energy of local designers and pair them with campaigns that need them.',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analytics',
      description: 'Track every campaign with clear dashboards designed for quick decision-making.',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Safe payments and contracts keep every stakeholder confident and focused on growth.',
    },
    {
      icon: MapPin,
      title: 'Local-First Approach',
      description: 'Built in Coimbatore and expanding city by city across Tamil Nadu with local insight.',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Why</span> NexGenAds?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete workflow for Tamil Nadu businesses, creatives, and media partners to launch together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect p-6 rounded-xl hover:glass-effect-strong transition-all duration-300 group fade-in-section"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StakeholdersSection = () => {
  const stakeholders = [
    {
      title: 'Advertisers',
      description: 'Discover verified local media options and creative partners that match your goals.',
      benefits: ['AI suggestions', 'Transparent pricing', 'Measurable ROI'],
    },
    {
      title: 'Media Partners',
      description: 'Connect campaigns with the right placements and keep your commissions organised.',
      benefits: ['Flexible work', 'Reliable contracts', 'Tools built for your workflow'],
    },
    {
      title: 'Designers',
      description: 'Get hand-picked briefs from emerging Tamil Nadu brands and grow your portfolio.',
      benefits: ['Project marketplace', 'Fair payouts', 'Portfolio growth'],
    },
    {
      title: 'Ad Space Owners',
      description: 'Fill your inventory faster with digital discovery and automated follow-ups.',
      benefits: ['Auto-matching', 'New revenue streams', 'Performance tracking'],
    },
  ];

  return (
    <section className="section-padding bg-card/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for <span className="text-gradient">every role</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One platform crafted around the needs of Tamil Nadu&apos;s entire advertising community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={index}
              className="glass-effect-strong p-8 rounded-xl hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold mb-3">{stakeholder.title}</h3>
              <p className="text-muted-foreground mb-6">{stakeholder.description}</p>
              <ul className="space-y-2">
                {stakeholder.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]"></div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild className="btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">
            <Link href="/survey">Take Our Survey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="glass-effect-strong p-12 rounded-2xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Join the <span className="text-gradient">Tamil Nadu ad-tech</span> journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Be among the first to try NexGenAds and turn your brand into Tamil Nadu&apos;s next standout story.
          </p>
          <PushSubscriptionPrompt
            className="mx-auto max-w-3xl"
            interests={["launch-updates", "tamil-nadu-campaigns"]}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="btn-glow bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-lg px-8">
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="glass-effect text-lg px-8">
              <Link href="/investors">Become an Investor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePageClient = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StakeholdersSection />
      <CTASection />
    </>
  );
};

export default HomePageClient;
