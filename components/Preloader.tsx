'use client';

import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#008dec] blur-3xl opacity-50 animate-pulse"></div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-gradient animate-fade-in">
          NexGenAds
        </h1>

        {/* Loading Spinner */}
        <div className="spinner mx-auto"></div>

        {/* Loading Text */}
        <p className="text-muted-foreground animate-pulse">
          Preparing your experience...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
