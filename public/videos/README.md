# Hero Background Video Setup

## How to Add Your Instagram Video

1. **Download the Instagram video** from: 
   https://www.instagram.com/p/DTu4rhvgdTJRL2ooOW-NmgsDpt1xZNvh_oDeTo0/

2. **Use an Instagram downloader tool**:
   - Option 1: https://snapinsta.app/
   - Option 2: https://indown.io/
   - Option 3: Use browser extension like "Video Downloader for Instagram"

3. **Save the video as**: `hero-background.mp4`

4. **Place the file** in this directory: `/public/videos/hero-background.mp4`

## Alternative: Use Direct Video URL

If you already have the video hosted somewhere, you can replace the video source in `/pages/events.tsx`:

```tsx
<source src="YOUR_VIDEO_URL_HERE.mp4" type="video/mp4" />
```

## Video Specifications

- **Format**: MP4 (recommended)
- **Recommended size**: Under 10MB for optimal loading
- **Aspect ratio**: 16:9 or wider works best
- **Quality**: 1080p or 720p

## Current Setup

The video will:
- Autoplay on page load
- Loop continuously
- Be muted (required for autoplay)
- Have a 60% opacity overlay for text readability
- Cover the entire hero section background
