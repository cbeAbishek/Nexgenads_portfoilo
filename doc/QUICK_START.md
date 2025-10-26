# Quick Start Guide - NexGenAds Portfolio

## 🚀 Running the Project

```bash
# Navigate to project directory
cd /home/abishek/IdeaProjects/Nexgenads_portfoilo

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

## 📊 Setting Up Database

### Step 1: Open Supabase
Go to: https://supabase.com/dashboard

### Step 2: Run SQL Schema
1. Click on your project
2. Go to **SQL Editor**
3. Open `/supabase/schema.sql` in your project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run**
7. Verify tables are created in **Table Editor**

### Step 3: Test Forms
Now all forms on your website will work:
- Email subscription (Footer)
- Contact form
- Investor inquiry
- Partner application
- Survey submissions

## 🎨 Creating Missing Assets

### Icons Needed:
Create these images and save in `/public/` folder:

1. **icon-192.png** (192x192 pixels)
   - Your logo on transparent background
   - Square format
   - PNG format

2. **icon-512.png** (512x512 pixels)
   - Same as above, larger size

3. **favicon.ico** (32x32 pixels)
   - Small icon for browser tab

### Social Media Images:
4. **og-image.jpg** (1200x630 pixels)
   - For Facebook/LinkedIn sharing
   - Include your logo and tagline

5. **twitter-image.jpg** (1200x628 pixels)
   - For Twitter sharing
   - Similar to og-image

### Quick Design Tools:
- **Canva**: https://canva.com (Free templates)
- **Figma**: https://figma.com (Professional design)
- **Remove.bg**: https://remove.bg (Remove backgrounds)

## 🧪 Testing Checklist

### Before Testing Forms:
- [ ] Database schema executed in Supabase
- [ ] Environment variables verified in `.env`
- [ ] Development server running

### Test Each Form:
```bash
# 1. Test Email Subscription (Footer)
# 2. Test Contact Form (/contact)
# 3. Test Investor Form (/investors)
# 4. Test Partner Form (/partners)
# 5. Test All Survey Forms (/survey)
```

### Verify in Supabase:
1. Go to **Table Editor**
2. Check each table for new entries
3. Verify data is correctly saved

## 🌐 Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page with hero and features |
| About | `/about` | Company story and team |
| Contact | `/contact` | Contact form and map |
| Investors | `/investors` | Investment opportunity |
| Partners | `/partners` | Partnership applications |
| Survey | `/survey` | Multi-stakeholder feedback |

## 🎯 Common Tasks

### Add New Page:
```bash
# Create new folder in app/
mkdir app/your-page-name

# Create page.tsx
touch app/your-page-name/page.tsx
```

### Add New API Route:
```bash
# Create API folder
mkdir -p app/api/your-endpoint

# Create route.ts
touch app/api/your-endpoint/route.ts
```

### Install New Package:
```bash
npm install package-name
```

### Fix Build Errors:
```bash
# Clear cache and reinstall
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

## 🚢 Deployment (Vercel)

### First Time:
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### Update Deployment:
```bash
# Just run
vercel --prod
```

### Environment Variables:
In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 📝 Customization Guide

### Change Colors:
Edit `tailwind.config.ts`:
```typescript
// Find the brand colors section
brand: {
  blue: "#00D9FF",    // Change this
  purple: "#A855F7",  // Change this
  pink: "#EC4899",    // Change this
}
```

### Update Contact Info:
Edit `components/Footer.tsx`:
- Line ~100: Email address
- Line ~110: Phone number
- Line ~90: Location

### Modify Team Members:
Edit `app/about/page.tsx`:
- Line ~15-35: Team members array
- Update names, roles, descriptions

### Change Company Name:
Find and replace "NexGenAds" across:
- All page files
- Navigation.tsx
- Footer.tsx
- layout.tsx (metadata)

## 🐛 Troubleshooting

### Server won't start:
```bash
# Kill existing process
pkill -f "next dev"

# Restart
npm run dev
```

### Database connection issues:
1. Check `.env` file exists
2. Verify Supabase credentials
3. Check internet connection
4. Restart development server

### Forms not working:
1. Check browser console for errors
2. Verify API routes exist
3. Check Supabase table names
4. Ensure database schema is executed

### Styling issues:
```bash
# Clear Tailwind cache
rm -rf .next
npm run dev
```

## 📞 Need Help?

### Resources:
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Supabase Docs**: https://supabase.com/docs

### Check These Files:
- `README.md` - Project overview
- `PROJECT_SUMMARY.md` - Detailed completion status
- `/supabase/schema.sql` - Database structure

## ✅ Pre-Launch Checklist

- [ ] Database schema executed
- [ ] All icons/images created
- [ ] All forms tested
- [ ] Contact information updated
- [ ] Company name/branding updated
- [ ] Social media links updated
- [ ] Google Maps location verified
- [ ] Production build tested (`npm run build`)
- [ ] Deployed to Vercel
- [ ] Environment variables added in Vercel
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate verified
- [ ] Forms working in production
- [ ] Analytics added (Google Analytics)
- [ ] Submitted to Google Search Console

## 🎉 You're Ready!

Your website has:
✅ Beautiful landing page
✅ All essential pages
✅ Working forms with database
✅ Responsive design
✅ SEO optimization
✅ Modern animations
✅ Professional styling

**Just add your assets and deploy!** 🚀
