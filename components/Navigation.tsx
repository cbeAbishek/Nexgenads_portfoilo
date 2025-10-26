'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Mail, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistUserType, setWaitlistUserType] = useState('advertiser');
  const [waitlistDistrict, setWaitlistDistrict] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistNote, setWaitlistNote] = useState('');
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState('');
  const [waitlistError, setWaitlistError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle Join Waitlist form submission
  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistError('');
  setWaitlistSuccess('');
    setWaitlistLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: waitlistEmail,
          fullName: waitlistName,
          userType: waitlistUserType,
          district: waitlistDistrict,
          phone: waitlistPhone,
          message: waitlistNote,
          source: 'navigation_modal',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setWaitlistError('This email is already on our priority list. Try a different address.');
        } else {
          setWaitlistError(data.error || 'Something went wrong. Please try again.');
        }
      } else {
        setWaitlistSuccess('🎉 You are on the priority list! We will keep you updated.');
        setWaitlistEmail('');
  setWaitlistName('');
  setWaitlistUserType('advertiser');
        setWaitlistDistrict('');
        setWaitlistPhone('');
        setWaitlistNote('');
        setTimeout(() => {
          setShowWaitlistModal(false);
          setWaitlistSuccess('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setWaitlistError('We could not reach the server. Please check your connection.');
    } finally {
      setWaitlistLoading(false);
    }
  };

  // Disable right-click, F12, and keyboard shortcuts for inspect
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:24px;color:white;background:#000;">Developer tools are disabled</div>';
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', detectDevTools);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', detectDevTools);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/investors', label: 'Investors' },
    { href: '/partners', label: 'Partners' },
    { href: '/support', label: 'Support' },
    { href: '/survey', label: 'Survey' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'top-4' : ''
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div
          className={`relative border overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? 'bg-black/80 backdrop-blur-xl border-white/20 shadow-2xl shadow-[#00D9FF]/20'
              : 'bg-black/60 backdrop-blur-md border-white/10 shadow-lg'
          }`}
        >
          {/* Animated gradient border effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] via-[#A855F7] to-[#EC4899] opacity-25 blur-xl animate-pulse"
            ></div>
          </div>

          {/* Flowing corner accent */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute right-6 top-2 w-32 h-32 rounded-full blur-3xl transition-opacity duration-700 ${
                isMobileMenuOpen ? 'opacity-60' : 'opacity-40'
              }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(0,217,255,0.35), transparent 65%)',
              }}
            ></div>
            <div
              className={`absolute left-6 bottom-2 w-32 h-32 rounded-full blur-3xl transition-all duration-700 ${
                isMobileMenuOpen ? 'opacity-55 translate-y-2' : 'opacity-35'
              }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(168,85,247,0.35), transparent 70%)',
              }}
            ></div>
          </div>

          <div className="relative flex items-center justify-between px-6 sm:px-8 lg:px-10 py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-10">
              <div className="relative flex items-center space-x-3">
                {/* Logo Image */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  <Image
                    src="/logo.svg"
                    alt="NexGenAds Logo"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#00D9FF] blur-xl opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
                </div>
              </div>
              
              <span className="text-xl sm:text-2xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                NexGenAds
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 relative z-10">
              {navLinks.map((link) => {
                const isActive = isActiveRoute(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 lg:px-4 py-2 rounded-[5px] transition-all duration-300 group ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-[#00D9FF]/20 to-[#A855F7]/20'
                        : 'text-foreground/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-[5px] bg-gradient-to-r from-[#00D9FF] to-[#A855F7] opacity-20 animate-pulse"></span>
                    )}
                    
                    <span className="relative z-10 font-medium text-sm lg:text-base">{link.label}</span>
                    
                    {/* Hover underline effect */}
                    <span
                      className={`absolute bottom-1 left-3 lg:left-4 right-3 lg:right-4 h-0.5 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    ></span>

                    {/* Glow effect on hover */}
                    <span className="absolute inset-0 rounded-[5px] bg-gradient-to-r from-[#00D9FF]/0 to-[#A855F7]/0 group-hover:from-[#00D9FF]/10 group-hover:to-[#A855F7]/10 transition-all duration-300 blur-sm"></span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block relative z-10">
              <Button 
                onClick={() => setShowWaitlistModal(true)}
                className="relative overflow-hidden rounded-full px-5 lg:px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all duration-300 group text-sm lg:text-base cursor-pointer"
              >
                <span className="relative z-10">Join Waitlist</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-10 p-2 rounded-lg text-foreground hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden transition-all ${
              isMobileMenuOpen 
                ? 'max-h-[700px] opacity-100 duration-700 ease-out' 
                : 'max-h-0 opacity-0 duration-500 ease-in'
            }`}
            style={{
              overflow: 'hidden',
            }}
          >
            <div 
              className={`border-t border-white/10 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm transition-all duration-700 ${
                isMobileMenuOpen ? 'translate-y-0' : 'translate-y-0'
              }`}
            >
              <div className="px-6 py-6 space-y-3 pb-8">
                {navLinks.map((link, index) => {
                  const isActive = isActiveRoute(link.href);
                  return (
                    <div
                      key={link.href}
                      className={`transform transition-all ${
                        isMobileMenuOpen
                          ? 'translate-y-0 opacity-100 scale-100'
                          : 'translate-y-8 opacity-0 scale-95'
                      }`}
                      style={{
                        transitionDuration: '600ms',
                        transitionDelay: isMobileMenuOpen ? `${100 + index * 60}ms` : '0ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-5 py-3.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#00D9FF]/20 to-[#A855F7]/20 text-white border border-white/20 shadow-lg shadow-[#00D9FF]/20'
                            : 'text-foreground/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-base">{link.label}</span>
                          {isActive && (
                            <span className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] animate-pulse"></span>
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
                
                <div
                  className={`transform transition-all ${
                    isMobileMenuOpen
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDuration: '600ms',
                    transitionDelay: isMobileMenuOpen ? `${100 + navLinks.length * 60}ms` : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Button
                    onClick={() => {
                      setShowWaitlistModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full mt-2 rounded-full px-6 py-3.5 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all duration-300 text-base font-semibold hover:scale-105 cursor-pointer"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-black/90 to-black/80 border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-[#00D9FF]/20 animate-in fade-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowWaitlistModal(false);
                setWaitlistError('');
                setWaitlistSuccess('');
                setWaitlistEmail('');
                setWaitlistName('');
                setWaitlistUserType('advertiser');
                setWaitlistDistrict('');
                setWaitlistPhone('');
                setWaitlistNote('');
              }}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <X className="w-5 h-5 text-white/80 hover:text-white" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Mail className="w-6 h-6 text-[#00D9FF]" />
                <h2 className="text-2xl font-bold text-gradient">Join Waitlist</h2>
              </div>
              <p className="text-white/70 text-sm">Be the first from Tamil Nadu to explore the NexGenAds platform. Share your details and we will reach out soon.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleJoinWaitlist} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-[#00D9FF] focus:outline-none transition-all duration-300"
                  disabled={waitlistLoading}
                  required
                />
                <div>
                  <select
                    value={waitlistUserType}
                    onChange={(e) => setWaitlistUserType(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#00D9FF] focus:outline-none transition-all duration-300"
                    disabled={waitlistLoading}
                  >
                    <option value="advertiser" className="text-black">Advertiser</option>
                    <option value="mediator" className="text-black">Media Partner</option>
                    <option value="designer" className="text-black">Designer</option>
                    <option value="ad_space_owner" className="text-black">Ad Space Owner</option>
                    <option value="enthusiast" className="text-black">Startup Enthusiast</option>
                  </select>
                </div>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-[#00D9FF] focus:outline-none transition-all duration-300"
                  disabled={waitlistLoading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="Your district"
                  value={waitlistDistrict}
                  onChange={(e) => setWaitlistDistrict(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-[#00D9FF] focus:outline-none transition-all duration-300"
                  disabled={waitlistLoading}
                />
                <Input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={waitlistPhone}
                  onChange={(e) => setWaitlistPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-[#00D9FF] focus:outline-none transition-all duration-300"
                  disabled={waitlistLoading}
                />
              </div>

              <Textarea
                placeholder="Tell us what support you need (optional)"
                value={waitlistNote}
                onChange={(e) => setWaitlistNote(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-[#00D9FF] focus:outline-none transition-all duration-300"
                rows={3}
                disabled={waitlistLoading}
              />

              {/* Error Message */}
              {waitlistError && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-200">{waitlistError}</p>
                </div>
              )}

              {/* Success Message */}
              {waitlistSuccess && (
                <div className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-200">{waitlistSuccess}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={waitlistLoading}
                className="w-full rounded-xl px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {waitlistLoading ? 'Joining...' : 'Join Waitlist'}
              </Button>

              <p className="text-xs text-white/50 text-center">
                We respect your privacy and will email only about NexGenAds launches.
              </p>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
