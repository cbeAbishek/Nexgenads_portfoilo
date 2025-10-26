#!/bin/bash

# Simple Icon Generator Script
# Creates basic placeholder icons for NexGenAds

echo "🎨 Creating placeholder icons for NexGenAds..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed."
    echo "Install it with: sudo apt-get install imagemagick"
    echo ""
    echo "Alternative: Create icons manually using:"
    echo "  - Canva (https://canva.com)"
    echo "  - Figma (https://figma.com)"
    echo "  - GIMP (Free photo editor)"
    exit 1
fi

# Create public directory if it doesn't exist
mkdir -p public

# Generate 192x192 icon (cyan gradient with "NA" text)
convert -size 192x192 \
    -define gradient:angle=135 \
    gradient:'#00D9FF-#A855F7' \
    -gravity center \
    -pointsize 80 \
    -font Arial-Bold \
    -fill white \
    -annotate +0+0 'NA' \
    public/icon-192.png

echo "✓ Created icon-192.png"

# Generate 512x512 icon
convert -size 512x512 \
    -define gradient:angle=135 \
    gradient:'#00D9FF-#A855F7' \
    -gravity center \
    -pointsize 220 \
    -font Arial-Bold \
    -fill white \
    -annotate +0+0 'NA' \
    public/icon-512.png

echo "✓ Created icon-512.png"

# Generate favicon
convert -size 32x32 \
    -define gradient:angle=135 \
    gradient:'#00D9FF-#A855F7' \
    -gravity center \
    -pointsize 16 \
    -font Arial-Bold \
    -fill white \
    -annotate +0+0 'NA' \
    public/favicon.ico

echo "✓ Created favicon.ico"

# Generate OG image (1200x630)
convert -size 1200x630 \
    -define gradient:angle=135 \
    gradient:'#0A0A0A-#1A1A1A' \
    -gravity center \
    -pointsize 100 \
    -font Arial-Bold \
    -fill '#00D9FF' \
    -annotate +0-50 'NexGenAds' \
    -pointsize 40 \
    -fill white \
    -annotate +0+50 'Coming Soon' \
    public/og-image.jpg

echo "✓ Created og-image.jpg"

# Copy OG image as Twitter image
cp public/og-image.jpg public/twitter-image.jpg

echo "✓ Created twitter-image.jpg"

echo ""
echo "🎉 All placeholder icons created successfully!"
echo ""
echo "📁 Icons created in /public directory:"
echo "   - icon-192.png (192x192)"
echo "   - icon-512.png (512x512)"
echo "   - favicon.ico (32x32)"
echo "   - og-image.jpg (1200x630)"
echo "   - twitter-image.jpg (1200x630)"
echo ""
echo "💡 These are basic placeholders. Replace them with your actual brand assets!"
echo ""
echo "🚀 Now run: npm run dev"
