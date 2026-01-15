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
    // { href: '/investors', label: 'Investors' },
    // { href: '/partners', label: 'Partners' },
    // { href: '/support', label: 'Support' },
    { href: '/survey', label: 'Survey' },
    { href: '/blog', label: 'Blog' },
    { href: '/career', label: 'Career' },
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
        isScrolled ? 'top-3' : ''
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div
          className={`relative border overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-[#1d36bf]/20 shadow-[0_8px_32px_rgba(0,141,236,0.15),0_4px_16px_rgba(29,54,191,0.1)]'
              : 'bg-white/90 backdrop-blur-md border-[#008dec]/15 shadow-[0_4px_24px_rgba(0,141,236,0.08),0_2px_12px_rgba(29,54,191,0.05)]'
          }`}
        >
          {/* Animated gradient border effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#008dec]/20 via-[#1d36bf]/15 to-[#f3a800]/20 blur-xl"
            ></div>
          </div>

          {/* Flowing corner accent */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute right-4 sm:right-6 top-1 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl transition-all duration-700 ${
                isMobileMenuOpen ? 'opacity-40 scale-110' : 'opacity-25'
              }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(0,141,236,0.4), transparent 65%)',
              }}
            ></div>
            <div
              className={`absolute left-4 sm:left-6 bottom-1 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-3xl transition-all duration-700 ${
                isMobileMenuOpen ? 'opacity-35 translate-y-2 scale-110' : 'opacity-20'
              }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(243,168,0,0.35), transparent 70%)',
              }}
            ></div>
          </div>

          <div className="relative flex items-center justify-between px-6 sm:px-8 lg:px-10 py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group relative z-10">
              <div className="relative flex items-center space-x-2 sm:space-x-3">
                {/* Logo Image */}
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/logo.svg"
                    alt="NexGenAds Logo"
                    fill
                    className="object-contain group-hover:rotate-6 transition-all duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008dec] to-[#f3a800] blur-xl opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
              
              <span className="text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-500" style={{ fontFamily: 'var(--font-neue-machina)' }}>
                <span className="text-blue-600">Nex</span><span className="text-red-600">Gen</span><span className="text-yellow-500">Ads</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1 relative z-10">
              {navLinks.map((link) => {
                const isActive = isActiveRoute(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 group overflow-hidden ${
                      isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600 hover:bg-[#008dec]/8'
                    }`}
                  >
                    <span className={`relative z-10 font-medium text-sm lg:text-base transition-transform duration-300 ${isActive ? '' : 'group-hover:translate-x-0.5'}`}>
                      {link.label}
                    </span>

                    {/* Animated underline: visible on hover OR when active */}
                    <span
                      className={`absolute bottom-1.5 left-3 lg:left-4 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 rounded-full w-0 opacity-0 ${
                        isActive
                          ? 'w-[calc(100%-1.5rem)] lg:w-[calc(100%-2rem)] opacity-100'
                          : 'group-hover:w-[calc(100%-1.5rem)] lg:group-hover:w-[calc(100%-2rem)] group-hover:opacity-100'
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block relative z-10">
              <Button 
                onClick={() => setShowWaitlistModal(true)}
                className="relative overflow-hidden rounded-full px-5 lg:px-7 py-2.5 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 hover:scale-105 active:scale-95 transition-all duration-500 group text-sm lg:text-base font-semibold cursor-pointer text-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Waitlist
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#f3a800] via-[#008dec] to-[#1d36bf] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden relative z-10 p-2.5 rounded-xl transition-all duration-300 ${isMobileMenuOpen ? 'bg-[#008dec]/15 shadow-inner' : 'hover:bg-[#008dec]/10 hover:shadow-md'}`}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 text-[#1d36bf] transition-all duration-500 ${
                    isMobileMenuOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 text-[#1d36bf] transition-all duration-500 ${
                    isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden transition-all overflow-hidden ${
              isMobileMenuOpen 
                ? 'max-h-[700px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
            style={{
              transitionDuration: isMobileMenuOpen ? '700ms' : '400ms',
              transitionTimingFunction: isMobileMenuOpen ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div 
              className={`border-t border-[#008dec]/15 bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-lg transition-all duration-500 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
            >
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-3 pb-6 sm:pb-8">
                {navLinks.map((link, index) => {
                  const isActive = isActiveRoute(link.href);
                  return (
                    <div
                      key={link.href}
                      className={`transform transition-all ${
                        isMobileMenuOpen
                          ? 'translate-y-0 opacity-100 scale-100'
                          : 'translate-y-6 opacity-0 scale-95'
                      }`}
                      style={{
                        transitionDuration: '500ms',
                        transitionDelay: isMobileMenuOpen ? `${80 + index * 50}ms` : '0ms',
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 group ${
                          isActive
                            ? 'text-red-600 border border-red-500 shadow-md shadow-red-500/10'
                            : 'text-gray-700 hover:text-[#1d36bf] hover:bg-[#008dec]/8 border border-transparent hover:border-[#008dec]/15 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300 ${isActive ? 'text-red-600' : ''}`}>{link.label}</span>
                          {isActive && (
                            <span className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></span>
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
                      : 'translate-y-6 opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDuration: '500ms',
                    transitionDelay: isMobileMenuOpen ? `${80 + navLinks.length * 50}ms` : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Button
                    onClick={() => {
                      setShowWaitlistModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full mt-2 rounded-xl sm:rounded-2xl px-6 py-3 sm:py-3.5 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 active:scale-[0.98] transition-all duration-500 text-sm sm:text-base font-semibold cursor-pointer text-white"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                      Join Waitlist
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="relative bg-white border border-[#008dec]/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_20px_60px_rgba(0,141,236,0.2),0_8px_24px_rgba(29,54,191,0.15)] animate-in fade-in zoom-in-95 duration-300">
            {/* Decorative gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008dec] via-[#1d36bf] to-[#f3a800] rounded-t-2xl sm:rounded-t-3xl"></div>
            
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
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-[#1d36bf] group-hover:rotate-90 transition-all duration-300" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-[#008dec]/15 to-[#1d36bf]/15 rounded-xl">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#008dec]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#1d36bf] to-[#008dec] bg-clip-text text-transparent">Join Waitlist</h2>
              </div>
              <p className="text-gray-600 text-sm">Be the first from Tamil Nadu to explore the NexGenAds platform. Share your details and we will reach out soon.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleJoinWaitlist} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#008dec] focus:bg-white focus:ring-2 focus:ring-[#008dec]/20 transition-all duration-300"
                  disabled={waitlistLoading}
                  required
                />
                <div>
                  <select
                    value={waitlistUserType}
                    onChange={(e) => setWaitlistUserType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#008dec] focus:bg-white focus:ring-2 focus:ring-[#008dec]/20 transition-all duration-300"
                    disabled={waitlistLoading}
                  >
                    <option value="advertiser" className="text-gray-900">Advertiser</option>
                    <option value="mediator" className="text-gray-900">Media Partner</option>
                    <option value="designer" className="text-gray-900">Designer</option>
                    <option value="ad_space_owner" className="text-gray-900">Ad Space Owner</option>
                    <option value="enthusiast" className="text-gray-900">Startup Enthusiast</option>
                  </select>
                </div>
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#008dec] focus:bg-white focus:ring-2 focus:ring-[#008dec]/20 transition-all duration-300"
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#008dec] focus:bg-white focus:ring-2 focus:ring-[#008dec]/20 transition-all duration-300"
                  disabled={waitlistLoading}
                />
                <Input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={waitlistPhone}
                  onChange={(e) => setWaitlistPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#008dec] focus:bg-white focus:ring-2 focus:ring-[#008dec]/20 transition-all duration-300"
                  disabled={waitlistLoading}
                />
              </div>

              <Textarea
                placeholder="Tell us what support you need (optional)"
                value={waitlistNote}
                onChange={(e) => setWaitlistNote(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#008dec] focus:bg-white focus:ring-2 focus:ring-[#008dec]/20 transition-all duration-300 resize-none"
                rows={3}
                disabled={waitlistLoading}
              />

              {/* Error Message */}
              {waitlistError && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{waitlistError}</p>
                </div>
              )}

              {/* Success Message */}
              {waitlistSuccess && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-600">{waitlistSuccess}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={waitlistLoading}
                className="w-full rounded-xl px-6 py-3.5 bg-gradient-to-r from-[#008dec] via-[#1d36bf] to-[#008dec] bg-[length:200%_auto] shadow-lg shadow-[#008dec]/25 hover:shadow-xl hover:shadow-[#008dec]/40 hover:bg-right active:scale-[0.98] transition-all duration-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {waitlistLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Joining...
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                      Join Waitlist
                    </>
                  )}
                </span>
              </Button>

              <p className="text-xs text-gray-500 text-center">
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
