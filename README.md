# Leroy Kelly Forever

A limited-edition legacy drop honoring Cleveland Browns Hall of Fame running back Leroy Kelly. This web app powers the exclusive release of 50 Leroy Kelly Forever Hats (Edition I) with a private-access model.

## 🏈 About

Leroy Kelly (1964-1973) was a Cleveland Browns legend who succeeded Jim Brown and went on to:

- Amass 7,274 career rushing yards
- Lead the NFL in rushing yards twice (1967, 1968)
- Earn Pro Football Hall of Fame induction in 1994

This project brings his legacy to life through a modern, conversion-optimized web experience led by his granddaughter Brooklyn.

## 🚀 Tech Stack

- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe components and pages
- **Vite 7.3.1** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with custom animations
- **React Router** - Client-side routing
- **Shopify** - E-commerce backend with preview cart integration
- **Mailchimp** - Email capture with custom domain authentication

## ✨ Features

### Reusable Component Library

- **Button** - 3 variants (primary, secondary, outline), 3 sizes, link support
- **Card** - Flexible container with elevation styles
- **ScarcityBadge** - Inventory display with Phase 2 API readiness
- **MetaTags** - Dynamic SEO with OpenGraph and Twitter Card support

### Custom Animations

- `fadeIn` - Smooth opacity transitions
- `slideUp` - Vertical entrance effects
- `scaleIn` - Zoom-in product reveals

### SEO & Meta

- Dynamic page titles and descriptions
- OpenGraph tags for social sharing
- Twitter Card integration
- Favicon with L. Kelly logo
- Semantic HTML structure

### Product Integration

- Autoplay video loop (`hat-loop.mp4`)
- Product images and branding assets
- Shopify cart integration with `BACKERS50` discount code
- Limited inventory scarcity messaging (50 units)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ScarcityBadge.tsx
│   └── MetaTags.tsx
├── hooks/              # Custom React hooks
│   └── useInventory.ts # Shopify inventory API (Phase 2)
├── pages/              # Route-level pages
│   ├── Home/
│   │   └── Home.tsx    # Landing page
│   └── Drop/
│       └── Drop.tsx    # Product page
├── sections/           # Page section components
│   ├── HeroSection/
│   ├── HatVideoCardSection/
│   ├── EmailCaptureSection/
│   ├── LegacyStatsSection/
│   ├── SealSection/
│   └── Footer/
└── config/
    └── siteConfig.js   # Global configuration
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=your_mailchimp_api_endpoint
VITE_SHOPIFY_VARIANT_ID=your_shopify_variant_id
```

## 🌐 Deployment

Deployed on **Vercel** with automatic deployments from `main` branch.

- Production URL: `https://leroykellyforever.com`
- Preview URL: Auto-generated for PRs

### Environment Config

Set in Vercel dashboard:

- `VITE_API_BASE_URL` - Backend API for email capture
- `VITE_SHOPIFY_VARIANT_ID` - Product variant for cart links

## 📨 Email Infrastructure

Professional email infrastructure built for trust and deliverability.

### Setup

- **Domain**: `leroykellyforever.com` (Google-managed)
- **Google Workspace**: Business Starter plan
- **Sender Address**: `info@leroykellyforever.com`
- **Mailchimp Integration**: Custom domain authenticated

### Authentication & Deliverability

- ✅ DKIM authentication configured
- ✅ Domain ownership verified in Mailchimp
- ✅ DNS records optimized for inbox placement
- ✅ Tested email flow between external accounts

### Benefits

- Prevents "via mailchimp.com" warnings
- Avoids spam classification from shared senders
- Establishes verified sender identity
- Builds trust with professional branded emails
- Scalable for future campaigns

## 🎯 Conversion Flow

### Home Page (`/`)

1. Hero with L. Kelly logo and brand messaging
2. Legacy stats (7,274 yards, Hall of Fame credentials)
3. "View Edition I" CTA
4. Footer with social links

### Drop Page (`/drop`)

1. Hero with logo and "The First 50" messaging
2. **Product card** with video loop and "Secure Now" CTA
3. **Legacy stats** for trust and context
4. **Email capture** for soft conversion
5. **Seal section** with authenticity badge
6. Footer

## 📋 Roadmap

### Phase 2

- [ ] Live Shopify inventory API integration (`useInventory` hook ready)
- [ ] Real-time scarcity updates
- [ ] Add actual variant ID to cart links
- [ ] Analytics and conversion tracking
- [ ] A/B testing on CTA copy

### Future Enhancements

- [ ] Countdown timer for drop launch
- [ ] Customer testimonials section
- [ ] Product gallery with multiple angles
- [ ] Size selection (if applicable)
- [ ] Order confirmation page

## 🤝 Contributing

This is a private legacy project. For questions or collaboration inquiries, contact via `info@leroykellyforever.com`.

## 📄 License

© 2026 Leroy Kelly Forever. All rights reserved.
