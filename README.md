# NexGenAds - Coming Soon Portfolio Website

A comprehensive "Coming Soon" portfolio website for a Coimbatore-based advertising intermediary platform startup.

## 🚀 Project Overview

NexGenAds is an intelligent advertising intermediary platform that bridges the gap between advertisers, mediators, designers, and ad space owners. This website serves as our launch page.

## ✨ Features Implemented

- ✅ Next.js 14 with App Router and TypeScript
- ✅ Tailwind CSS with custom dark theme
- ✅ ShadCN UI components
- ✅ Supabase backend integration
- ✅ Animated landing page with hero section
- ✅ About page with team and tech stack
- ✅ Contact page with Google Maps
- ✅ Investors page with inquiry form
- ✅ Email subscription functionality
- ✅ Responsive navigation and footer
- ✅ Glassmorphism effects and animations

## 🛠️ Getting Started

### Installation

```bash
cd /home/abishek/IdeaProjects/Nexgenads_portfoilo
npm install
```

### Database Setup

1. Go to your Supabase Dashboard → SQL Editor
2. Run the SQL from `supabase/schema.sql` to create tables

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📋 Remaining Tasks

### 1. Partners Page (`app/partners/page.tsx`)
Create with:
- Partnership opportunities overview
- Benefits for each stakeholder type
- Application form
- API endpoint at `app/api/partners/route.ts`

### 2. Survey Page (`app/survey/page.tsx`)
Multi-stakeholder survey with:
- Tabs or wizard for different user types
- Forms for Advertisers, Mediators, Designers, Ad Space Owners
- API endpoint at `app/api/survey/route.ts`

### 3. PWA Implementation
- Create `public/manifest.json`
- Add service worker `public/sw.js`
- Update `layout.tsx` to include manifest link
- Add install prompts

### 4. SEO & Performance
- Create `public/robots.txt`
- Add `public/sitemap.xml`
- Implement structured data (JSON-LD)
- Add Google Analytics or Plausible
- Optimize images (add to `public/` folder)

### 5. Additional Features
- Waitlist modal component
- Blog section (optional)
- Testimonials section
- FAQ section

## 🎨 Design System

### Brand Colors
- Primary Blue: `#00D9FF`
- Primary Purple: `#A855F7`
- Primary Pink: `#EC4899`
- Accent Cyan: `#06B6D4`

### Utility Classes
- `glass-effect` - Glassmorphism effect
- `text-gradient` - Gradient text
- `btn-glow` - Button with glow effect
- `section-padding` - Consistent section spacing

## 📦 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Animations**: Framer Motion

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

## 📞 Contact

- **Location**: Coimbatore, Tamil Nadu, India
- **Email**: hello@nexgenads.space
- **Phone**: +91 98765 43210

## 📄 License

Copyright © 2024 NexGenAds. All rights reserved.
