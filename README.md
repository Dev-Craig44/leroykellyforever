# Leroy Kelly Forever

A controlled legacy allocation platform honoring Cleveland Browns Hall of Fame running back Leroy Kelly.

This project powers Edition I — a limited release of 50 Leroy Kelly Forever Hats — using a private-access allocation model built on modern web infrastructure.

This is not a merch store.

This is a controlled legacy distribution engine.

---

## 🏛 Vision

Edition I is designed to:

- Lock in core fan infrastructure
- Empower Browns Backers leadership
- Build measurable engagement across clubs
- Establish long-term allocation tiers
- Create a legacy pipeline for future drops, NFTs, and unlockable experiences

Backers Clubs are not customers.

They are distribution infrastructure.

---

## 🏈 About Leroy Kelly

Leroy Kelly (1964–1973) succeeded Jim Brown and went on to:

- 7,274 career rushing yards
- 2× NFL Rushing Leader (1967, 1968)
- Pro Football Hall of Fame — Class of 1994

Edition I is part of a generational legacy initiative led by family.

---

## 🔧 Recent Fixes (March 2026)

### Admin Login CORS Configuration

**Issue**: Admin dashboard (`leroykellyforever.com/admin`) failed to connect to backend API with CORS errors. Backend only whitelisted `www.leroykellyforever.com` but users accessed via `leroykellyforever.com` (without www).

**Resolution**: Updated backend API CORS configuration (`~/lk-api/src/index.js`) to allow both domains:

- `https://www.leroykellyforever.com`
- `https://leroykellyforever.com`

**Impact**: Admin authentication and video submission dashboard now fully functional from both domain variations.

---

## 🔄 Recent Updates (April 2026)

### Email CTA Intent Alignment

**Issue**: Email CTA said "Record a message for Leroy" but landing page showed "Allocation issued," causing confusion and drop-off. Users expected to record a video but were directed to a product page first.

**Resolution**: Email CTA intent alignment: changed from product-first navigation to story-first navigation using `redirect=share` while preserving club code in session storage.

**Implementation**:
- ClubAccess page now reads `redirect` query parameter
- When `redirect=share`, automatically navigates to `/submit-video` after storing club code
- SubmitVideo page shows acknowledgment: "You're here to send Leroy a message. Your club access is already active."
- Added secondary CTA "Explore Your Club Allocation" to maintain path to product
- Backward compatibility: links without `redirect` param show normal allocation page

**Impact**: Seamless flow from email → video submission → optional product exploration, reducing cognitive friction and improving conversion.

---

# 🚀 Tech Stack

## Frontend

- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe components and pages
- **Vite 7.3.1** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with custom animations
- **React Router** - Client-side routing
- **Shopify** - E-commerce backend with cart link integration
- **Mailchimp** - Email capture with custom domain authentication

## Backend (API Layer)

- **Node.js** (NVM-managed)
- **Express** - REST API framework with ES modules
- **MongoDB Atlas** - Cloud database for video submissions
- **Mongoose** - ODM for MongoDB
- **Multer** - Multipart file upload handling
- **PM2** - Process manager for zero-downtime restarts
- **Nginx** - Reverse proxy with 100MB upload limit
- **Let's Encrypt SSL** - Via Certbot
- **Hosted on DigitalOcean Droplet**
- **Domain**: api.leroykellyforever.com

## E-commerce Engine

- **Shopify** - Inventory + checkout
- **Discount code–based allocation control**
- **Cart-link direct checkout strategy**

---

## 🏗 Shopify Infrastructure Split (Shop Subdomain Setup)

### Architecture Decision

We separated brand narrative and checkout infrastructure:

- `www.leroykellyforever.com` → Vercel (Drop Page / Brand Experience)
- `shop.leroykellyforever.com` → Shopify (Checkout + Cart Infrastructure)

This prevents:

- SEO authority splitting
- Public browsing of Shopify storefront
- Theme clutter interfering with drop positioning

---

### Shopify Home Page Conversion

Converted Shopify homepage into a minimal logo-only portal.

Implemented via:

- Custom Liquid section
- Full viewport flexbox centering
- Removal of all theme sections (Hero, Collections, Footer blocks)
- Removal of navigation and catalog elements

Custom Liquid used:

```html
<style>
  body,
  main,
  #MainContent {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>

<div
  style="
  height:100vh;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#f5f5f3;
"
>
  <img
    src="https://cdn.shopify.com/s/files/1/0984/9343/2090/files/L_Kelly_logo_master_square_3.png?v=1772520495"
    alt="Leroy Kelly Forever"
    style="width:320px; max-width:80vw; height:auto;"
  />
</div>
```

Result:

- True vertical centering
- Zero Shopify layout bleed
- Infrastructure-only storefront
- Controlled drop environment

### Strategic Intent

Shopify now functions as:

- Checkout engine
- Cart permalink receiver
- Discount application endpoint

Vercel handles:

- Brand narrative
- Scarcity counter
- Drop messaging
- Email funnel

This preserves brand control while leveraging Shopify's checkout reliability.

---

## Launch Preparation (March 2026)

### Product Gallery & Detail Components

Implemented two premium showcase sections using newly added product photography:

**HatRevealSection**

- Interactive 4-image gallery (Hero, Front Close-Up, Side View, Stitching Detail)
- Click-to-select thumbnails with Browns orange active border (#F26A1B)
- 3 feature cards: Hall of Fame Quality, Limited Edition Design, Family Approved
- Scroll-triggered fade-in animations via useInView hook

**ProductDetailSection**

- 3-slide carousel storytelling: Legacy in Action, Premium Packaging, Detail Matters
- Arrow navigation with prev/next slide logic
- Dot indicators showing active slide
- Images: lkWithHat.jpg, hatPackage.JPEG, Stiching_Hat.jpg

Both sections integrated into:

- Home page (after LegacyStatsSection)
- Drop page (between HatVideoCardSection and EmailCaptureSection)

**Commit:** `1f6354b` - 11 files changed, 316 insertions

### Shopify Store Configuration

Completed full e-commerce launch preparation:

**Legal Policies**

- Shipping Policy: Standard $8 (free over $70), Express $15, 48-hour processing from Willingboro, NJ
- Return & Refund Policy: "All sales final" for limited edition collectibles with 48-hour quality inspection window
- Terms of Service: Limited edition allocation, Browns Backers Club discount program, intellectual property protection

**Payment & Authentication**

- Shopify Payments activated: 2.9% + $0.30 per transaction
- Payment verification complete - payout account approved
- Email domain authentication (SPF, DKIM, DMARC) configured for info@leroykellyforever.com
- Contact information verified

**Apple Wallet Pass**

- Configured with Browns orange branding (#F26A1B)
- Signature banner for digital pass integration
- Post-purchase collector experience enhancement

**Business Description** (for payment processor):

> "I sell limited-edition sports memorabilia honoring Hall of Fame athletes. First release: Leroy Kelly collector hat, made with family partnership, limited to 50 pieces with premium packaging."

**Status:** Platform production-ready with complete checkout infrastructure, legal compliance, and payment processing capability.

---

## Shopify Gateway Architecture (March 2026)

Shopify (shop.leroykellyforever.com) is configured as a permanent allocation portal.

Instead of acting as a traditional storefront, the Shopify homepage uses a Custom Liquid section that:

- Displays the official Leroy Kelly Forever logo
- Shows "Allocation access required"
- Routes users to https://leroykellyforever.com
- Removes all theme navigation and product listings

This keeps:

Vercel → Brand / Story / Drop Experience  
Shopify → Checkout Infrastructure Only

All product discovery and scarcity logic lives in the React web app.
Shopify functions strictly as payment and fulfillment layer.

---

## 🛍️ Product Page Styling (Edition I)

The Shopify product page has been transformed from a standard e-commerce template into a collector-style release page that aligns with the museum aesthetic.

### Custom Enhancements

**Dynamic Inventory Banner**

- Custom Liquid section displaying real-time stock count
- `{{ product.selected_or_first_available_variant.inventory_quantity }}` integration
- Orange accent (#f97316) for scarcity emphasis
- Gradient background matching brand colors

**Custom CSS Styling** (`base.css`)

- Museum-quality typography (2rem titles, -0.02em letter spacing)
- Black rounded buttons with hover transforms
- Cleaner product descriptions (0.95rem, 1.7 line-height)
- 12px border radius on all interactive elements
- Centered layout with breathing room

**Legacy Storytelling Block**

- Hall of Fame credentials prominently displayed
- Career stats (7,274 yards, 2× Rushing Leader)
- Multi-generational photos (Leroy Kelly + young fan)
- "Ships within 48 hours" trust signal

**Tribute Submission Funnel**

- Product description includes CTA to submit tribute videos
- Links to `leroykellyforever.com/submit-video`
- Separates commerce (checkout) from community participation (video submissions)
- Reinforces legacy narrative beyond product purchase

### Architecture Decision

**Product page now serves dual purpose:**

1. **Checkout layer** - Presidents with discount codes complete purchase
2. **Community gateway** - Public visitors discover tribute submission opportunity

This maintains the controlled allocation model while opening a participation channel for fans who aren't part of the Presidents allocation.

---

## ✨ Features

### Reusable Component Library

- **Button** - 3 variants (primary, secondary, outline), 3 sizes, link support
- **Card** - Flexible container with elevation styles
- **ScarcityBadge** - Inventory display with real-time API integration
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
- Shopify cart integration with discount codes
- Real-time inventory scarcity messaging

---

# 🎯 Allocation Engine Architecture

Edition I uses a soft gate allocation model.

## Total Inventory: 50 units

### Presidents Window (48 hours)

- Each invited Backers Club receives a unique discount code
- Each code limited to 3 uses
- Total inventory capped at 50
- Usage tracked per club

This creates:

- Leadership responsibility
- Friendly competition
- Regional performance tracking
- Data for future allocation tiers

---

# 🧠 Allocation Strategy

Each club receives a unique code.

Example:

- LK-CLE
- LK-NJ
- LK-ATL

Each code:

- Applies to Edition I hat only
- Fixed dollar discount
- Usage limit: 3
- Time window: 48 hours
- Total inventory globally capped at 50

Tracked metrics:

- Code usage count
- Regional engagement
- Speed of allocation
- Conversion patterns

Foundation for:

Backers Legacy Index v1

Future tiers unlock:

- Early access
- NFT-gated experiences
- Personalized Leroy Kelly messages
- Club-specific merchandise

---

## Active Discount Codes (Edition I)

The following discount codes are scheduled in Shopify for Phase 1 allocation:

| Code            | Club              | Discount   | Usage Limit    | Status    |
| --------------- | ----------------- | ---------- | -------------- | --------- |
| `LK-CLEHEIGHTS` | Cleveland Heights | $25.00 off | Once per order | Scheduled |
| `LK-HINGETOWN`  | Hingetown         | $25.00 off | Once per order | Scheduled |
| `LK-WESTPARK`   | West Park         | $25.00 off | Once per order | Scheduled |
| `LK-TWIST`      | Twist             | $25.00 off | Once per order | Scheduled |
| `LK-MUNILOT`    | Municipal Lot     | $25.00 off | Once per order | Scheduled |

**Product Application:**

- Leroy Kelly Forever Hat - Edition I

**Allocation Method:**

- Direct Shopify cart link with pre-applied discount code
- Format: `https://STORE.myshopify.com/cart/VARIANT_ID:1?discount=CODE`

**Tracking:**

- Usage count tracked per code in Shopify admin
- Global inventory cap: 50 units
- Presidents window: 48 hours from activation

---

## Phase 1 Contacts (Imported)

**Total contacts:** 5  
**Email subscribers:** 5  
**Platform:** Wix Contacts

| Email                            | First Name | Club/Affiliation  |
| -------------------------------- | ---------- | ----------------- |
| agentfresh37@yahoo.com           | -          | Cleveland Heights |
| dreich1218@hotmail.com           | David      | -                 |
| amsteljacob@gmail.com            | Jacob      | -                 |
| scottnunnari@gmail.com           | Scott      | -                 |
| hingetownbrownsbackers@gmail.com | -          | Hingetown         |

**Import Date:** March 2, 2026

**Purpose:**

- Phase 1 allocation audience
- Direct outreach for Presidents Window
- Club leadership + key supporters
- Foundation for Backers Legacy Index tracking

---

## 📧 Edition I – Backers Club Allocation System (Wave 1)

### Overview

Implemented controlled email-based allocation system for Edition I (First 50) release.

Five Browns Backers club presidents selected for Wave 1 private allocation.

### Infrastructure Built

- Created Mailchimp audience: Backers Presidents – Edition I Wave 1
- Added merge fields:
  - FNAME
  - CLUB
  - CODE
  - WAVE
- Imported club president contacts with structured CSV
- Tagged contacts with: Backers-Wave1

### Dynamic Discount Routing

Configured Shopify cart link with merge-tag-based dynamic discount:

```
/discount/*|CODE|*?redirect=/cart/51769012748570:1
```

Each president receives:

- Unique discount code
- Preloaded cart (variant ID 51769012748570)
- Auto-applied discount
- Club-specific UTM tracking
- Wave tracking via WAVE field

Verified:

- Discount applies correctly when active
- Cart loads correct product
- Merge tags resolve properly
- UTM parameters persist
- End-to-end test successful

### Strategic Release Plan

Wave 1:

- 5 club presidents
- Controlled release
- Scheduled for Tuesday launch
- 72-hour allocation window

No public promotion during Wave 1.
Backers clubs receive priority before broader Facebook/Instagram promotion.

### Positioning

This is not a promotional blast.
This is controlled allocation infrastructure.

Email tone:
Leadership-level.
Ceremonial.
Non-hype.
Scalable.

System now supports:

- Future waves
- Per-club tracking
- NFT tie-ins
- Data-driven allocation scaling

---

## Controlled Email Distribution System (Wave-Based Access)

This section documents a real-world production system that orchestrated a controlled product launch using integrated web, commerce, and email marketing infrastructure.

### 1. Objective

The goal was to launch a limited-edition product (50 units) using a controlled wave-based distribution strategy that:

- Distributed access in phased waves to mitigate risk and gather feedback
- Assigned each group a unique discount/access code for tracking and exclusivity
- Tracked engagement and behavior at the individual code level
- Built a data foundation for future allocation tiers and club performance metrics

This was not a promotional blast. It was controlled allocation infrastructure designed to test systems, measure engagement, and establish a repeatable framework for future releases.

### 2. Architecture Overview

The system integrates three platforms to create a seamless, code-gated checkout experience:

**System Flow:**

```
User receives email → Click CTA → /club-access?code=XYZ
  ↓
Code stored in sessionStorage
  ↓
User redirected to protected Drop page
  ↓
React reads stored code from sessionStorage
  ↓
CTA button dynamically builds Shopify discount URL
  ↓
Format: /discount/{CODE}?redirect=/products/leroy-kelly-hat
  ↓
Shopify applies discount at checkout
```

**Tech Stack:**

- **Frontend**: React app hosted on Vercel (leroykellyforever.com)
- **Commerce**: Shopify (checkout + discount engine)
- **Email**: Mailchimp (campaign delivery + audience segmentation)
- **State Management**: sessionStorage for code persistence across page navigation

**Key Implementation Details:**

- `/club-access` route extracts `?code=` query parameter
- Code is stored client-side using `sessionStorage.setItem('accessCode', code)`
- Drop page reads code and injects it into Shopify discount URL
- Button onClick handler dynamically constructs: `https://shop.leroykellyforever.com/discount/${code}?redirect=/cart/51769012748570:1`
- Shopify applies discount automatically at checkout stage (not visible until cart)

### 3. Wave Strategy

The release was structured as a phased rollout to control risk and optimize based on real user behavior.

**Wave 1: Initial Test Group**

- **Size**: 5 Browns Backers club presidents
- **Codes**: `LK-CLEHEIGHTS`, `LK-HINGETOWN`, `LK-WESTPARK`, `LK-TWIST`, `LK-MUNILOT`
- **Allocation**: Each code limited to a fixed number of uses
- **Window**: 72-hour exclusive access
- **Purpose**: Test end-to-end system, validate discount logic, measure initial engagement

**Wave 2: Expanded Rollout** (Planned)

- **Size**: 10–15 additional clubs
- **Structure**: Each club receives unique code and allocation
- **Distribution**: Club presidents internally distribute access to members

**Why Wave-Based Rollout?**

1. **Risk Control**: Identify technical or messaging issues with small audience before broader release
2. **Feedback Loop**: Gather real-world user behavior data to refine messaging and UX
3. **Performance Validation**: Ensure API, checkout flow, and email infrastructure handle load
4. **Strategic Scarcity**: Create early adopter exclusivity while preserving inventory for later waves
5. **Data Collection**: Track which clubs engage most, informing future allocation tiers

### 4. Email Personalization System

Mailchimp merge tags enabled dynamic, personalized email content for each recipient.

**Merge Tags Used:**

- `*|FNAME|*` - Recipient first name
- `*|CLUB|*` - Browns Backers club name
- `*|CODE|*` - Unique discount code (e.g., LK-CLEHEIGHTS)

**Example Personalized URL:**

```
https://leroykellyforever.com/club-access?code=*|CODE|*
```

Resolves to:

```
https://leroykellyforever.com/club-access?code=LK-CLEHEIGHTS
```

**Messaging Evolution:**

**Initial Version (System-Driven):**

- Focus: Technical instructions and steps
- Tone: Transactional, procedural
- Result: Low engagement, unclear value proposition

**Improved Version (Mission-Driven):**

- Focus: Legacy preservation, community honor, exclusivity
- Tone: Personal, narrative-based, ceremonial
- Language: "You've been selected to lead", "exclusive allocation window", "honor Leroy Kelly's legacy"
- Result: Higher perceived value, clear call to action

**Key Lesson:**

Technical clarity is necessary but insufficient. Emails must connect the action (using a discount code) to a larger mission (preserving Browns history, leading their community). Storytelling drives engagement more than system instructions.

### 5. Key Challenges & Solutions

**Issue: Discount Code Not Applying**

- **Problem**: Initial implementation used standard product URL without discount parameter
- **Solution**: Switched to Shopify's `/discount/{code}?redirect=...` URL format
- **Result**: Discount applied automatically at checkout without manual code entry

**Issue: onClick Handler Not Firing**

- **Problem**: Button click events not triggering navigation to Shopify
- **Debugging**: Added `console.log` statements to verify event binding and code extraction
- **Solution**: Confirmed React state updates and corrected URL construction logic
- **Result**: Click events properly fire and build correct Shopify URL

**Issue: Users Not Seeing Discount Until Checkout**

- **Problem**: Expectation that discount would appear on product page
- **Insight**: Shopify applies discounts at checkout stage, not on product detail pages
- **Solution**: No code change needed - documented expected behavior and set proper user expectations
- **Impact**: Reduced confusion by clarifying when discount becomes visible

**Issue: Low Click Rate (0% in Wave 1 Test)**

- **Problem**: Emails delivered successfully (100% rate) but zero clicks on CTA
- **Diagnosis**: Not a technical failure - URLs worked correctly when tested manually
- **Root Cause**: Messaging tone too system-driven, lacked urgency and emotional connection
- **Solution**: Rewrote email copy to emphasize exclusivity, leadership role, and legacy preservation
- **Learning**: Deliverability ≠ Engagement. Email must inspire action, not just inform.

### 6. Results & Metrics

**Wave 1 Performance:**

- **Emails Sent**: 5
- **Deliverability**: 100% (5/5 delivered successfully)
- **Open Rate**: ~20% (1 confirmed open)
- **Click Rate**: 0% (no CTA clicks)

**Important Context:**

- Open rate data unreliable due to Apple Mail Privacy Protection (pre-loads images, inflates open rates)
- True open rate likely higher or lower than reported 20%
- Click rate accurately measured (no false positives)

**Key Insights from Data:**

1. **Infrastructure Works**: Email delivery, domain authentication, and technical systems functioned correctly
2. **Messaging Failed**: Zero clicks indicate content/tone issue, not technical failure
3. **Trust Gap**: Recipients may not have understood value proposition or feared phishing
4. **Iteration Needed**: System is sound; messaging requires A/B testing and refinement

### 7. Key Takeaways

This project demonstrates several real-world engineering and product competencies:

**Full-Stack System Integration:**

- Connected three separate platforms (React, Shopify, Mailchimp) into cohesive user experience
- Built client-side state management to persist codes across navigation
- Implemented dynamic URL generation based on user-specific data

**Real-World System Design:**

- Designed phased rollout strategy that balances risk and opportunity
- Built tracking infrastructure to measure performance at code/club level
- Created fail-soft systems (codes work even if users navigate directly to drop page)

**Data-Driven Iteration:**

- Used live campaign data to diagnose messaging vs. technical failures
- Identified blockers (email tone) separate from enablers (working infrastructure)
- Planned improvements based on measurable outcomes, not assumptions

**Bridging Engineering & Business Outcomes:**

- Translated business goal (controlled launch) into technical architecture (code-gated checkout)
- Built marketing systems that serve strategic objectives (club tracking, future NFT gates)
- Designed for scalability (same system supports 5 or 500 codes)

### 8. Future Improvements

**Analytics Enhancements:**

- Custom event tracking (code redemptions, button clicks, page views)
- Google Analytics or Segment integration for funnel visualization
- Heatmaps to identify UX friction points

**Personalization:**

- Dedicated landing page per club (e.g., `/club/cleveland-heights`)
- Custom messaging based on club size or geography
- Dynamic inventory messaging per code allocation

**Email Optimization:**

- A/B test subject lines, sender names, and email copy
- Test send times (morning vs. evening, weekday vs. weekend)
- Segment audiences by engagement history

**Automation:**

- Automated wave rollout system (trigger emails based on inventory thresholds)
- Auto-expiring codes based on time or usage
- Abandoned cart recovery for code holders who didn't complete checkout

---

# 🌐 Production Infrastructure

## Frontend

Deployed on **Vercel**  
Domain: https://leroykellyforever.com

Auto-deploy from `main` branch.

- Production URL: `https://leroykellyforever.com`
- Preview URLs: Auto-generated for PRs

### Environment Config

Set in Vercel dashboard:

- `VITE_API_BASE_URL` - Backend API (default: https://api.leroykellyforever.com)
- `VITE_SHOPIFY_VARIANT_ID` - Product variant for cart links

### 🌐 Production Domain Configuration (2026-03)

Connected the custom domain to Vercel production environment.

#### DNS Changes

- Root domain (`@`) → A record → `76.76.21.21` (Vercel)
- `www` → CNAME → `cname.vercel-dns.com`
- Removed legacy Squarespace A + CNAME records

#### Redirect Strategy

- Primary domain: `https://leroykellyforever.com`
- `www.leroykellyforever.com` → 308 Permanent Redirect → root
- `leroykellyforever.vercel.app` remains as fallback domain

#### Result

- First-party branded production domain
- HTTPS/SSL issued by Vercel
- Clean canonical routing
- Ready for Shopify subdomain integration

---

## 🛠️ Local Development

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
VITE_API_BASE_URL=http://localhost:4000
VITE_SHOPIFY_VARIANT_ID=your_shopify_variant_id
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ScarcityBadge.tsx
│   └── MetaTags.tsx
├── hooks/              # Custom React hooks
│   └── useInventory.ts # Shopify inventory API integration
├── lib/                # Utility libraries
│   └── api.ts         # API client with TypeScript types
├── pages/              # Route-level pages
│   ├── Home/
│   │   └── Home.tsx    # Landing page
│   ├── Drop/
│   │   └── Drop.tsx    # Product allocation page
│   └── DevInventory/   # Development inventory dashboard
├── sections/           # Page section components
│   ├── HeroSection/
│   ├── HatVideoCardSection/
│   ├── EmailCaptureSection/
│   ├── LegacyStatsSection/
│   ├── CtaSection/
│   ├── SealSection/
│   └── Footer/
└── config/
    └── siteConfig.js   # Global configuration
```

---

---

## API Backend (DigitalOcean Droplet)

### Stack Overview

- **Platform**: DigitalOcean Ubuntu 22.04 Droplet
- **Runtime**: Node.js (managed via NVM)
- **Process Manager**: PM2 (for zero-downtime restarts)
- **Web Server**: Nginx (reverse proxy)
- **SSL**: Let's Encrypt (via Certbot)
- **Domain**: `api.leroykellyforever.com`
- **Port**: 4000 (internal)

### Initial Server Setup

1. **Clone the API repository**

   ```bash
   cd ~
   git clone https://github.com/YOUR_USERNAME/lk-api.git
   cd lk-api
   ```

2. **Install dependencies**

   ```bash
   npm ci --production
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   nano .env
   ```

   Required environment variables:

   ```env
   # Shopify Configuration
   SHOPIFY_SHOP_DOMAIN=your-store.myshopify.com
   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
   SHOPIFY_API_VERSION=2024-01

   # Server Configuration
   PORT=4000
   NODE_ENV=production

   # CORS Configuration
   CORS_ORIGIN=https://leroykellyforever.com
   ```

### PM2 Process Management

1. **Start the API with PM2**

   ```bash
   pm2 start src/index.js --name lk-api
   pm2 save
   ```

2. **Configure PM2 to start on system boot**

   ```bash
   pm2 startup
   # Follow the command output and run the suggested systemd command
   ```

3. **Restart with updated environment variables**

   ```bash
   pm2 restart lk-api --update-env
   ```

4. **Monitor logs**
   ```bash
   pm2 logs lk-api
   pm2 monit
   pm2 status
   ```

### Nginx Configuration

1. **Create Nginx server block**

   ```bash
   sudo nano /etc/nginx/sites-available/api.leroykellyforever.com
   ```

   ```nginx
   server {
       listen 80;
       server_name api.leroykellyforever.com;

       location / {
           proxy_pass http://127.0.0.1:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

2. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/api.leroykellyforever.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### SSL Certificate Setup

1. **Install Certbot**

   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate**

   ```bash
   sudo certbot --nginx -d api.leroykellyforever.com
   ```

3. **Verify auto-renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

### Health Checks & Verification

```bash
# Test health endpoint
curl https://api.leroykellyforever.com/health

# Test products endpoint
curl https://api.leroykellyforever.com/products

# Test inventory summary
curl https://api.leroykellyforever.com/inventory/summary

# Test low stock
curl https://api.leroykellyforever.com/inventory/low-stock

# Test dashboard
curl https://api.leroykellyforever.com/dashboard/inventory
```

### Troubleshooting

#### DNS & Port Issues

- **Verify DNS resolution**: `nslookup api.leroykellyforever.com`
- **Check port listeners**: `sudo lsof -iTCP -sTCP:LISTEN -n -P | grep -E ":(80|443|4000)"`
- **Check firewall**: Ensure ports 80 and 443 are open in DigitalOcean firewall settings

#### CORS Errors

- Verify `CORS_ORIGIN` in `.env` matches your frontend domain exactly
- Check Nginx proxy headers are properly forwarding origin information
- Restart PM2 after environment changes: `pm2 restart lk-api --update-env`

#### Nginx Configuration Issues

- **Server name conflicts**: `sudo grep -r "server_name api.leroykellyforever.com" /etc/nginx/sites-enabled/`
- **Test configuration**: `sudo nginx -t`
- **View error logs**: `sudo tail -f /var/log/nginx/error.log`
- **Check 80→443 redirects**: Certbot should auto-configure HTTPS redirects

#### PM2 Issues

- **Missing PID directory**: `mkdir -p ~/.pm2 && touch ~/.pm2/pm2.pid`
- **Systemd service not starting**:
  ```bash
  systemctl status pm2-blaze  # or pm2-YOUR_USERNAME
  sudo systemctl restart pm2-blaze
  ```
- **View PM2 logs**: `pm2 logs lk-api --lines 100`
- **Environment not updating**: Always use `pm2 restart lk-api --update-env` after `.env` changes

#### Service Status Checks

```bash
# Check Nginx
sudo systemctl status nginx

# Check PM2
pm2 status

# Check system services
systemctl list-units --type=service --state=running | grep pm2

# View all listeners
sudo ss -tulpn
```

---

## Deployment Workflow

**Standard update workflow:**

```bash
# Local machine
git add .
git commit -m "feat: description"
git push origin main

# On droplet (via SSH)
cd ~/lk-api
git pull origin main
npm ci --production  # if package.json changed
pm2 restart lk-api --update-env
pm2 logs lk-api  # verify restart
```

**Production files not edited directly except:**

- `.env` - Environment variables
- Nginx configs - `/etc/nginx/sites-available/`
- Certbot configs - Managed by certbot

**GitHub remains source of truth.**

---

# 🔌 API Endpoints

All endpoints return JSON and include CORS headers for `leroykellyforever.com`.

## Health

```bash
GET /health
```

Returns server status and uptime.

## Products

```bash
GET /products?limit=5
```

Returns Shopify products with inventory levels. Cached for 5 minutes.

## Inventory Summary

```bash
GET /inventory/summary?limit=50
```

Returns:

- Aggregated available inventory across all variants
- Cached status
- Fetch timestamp

Cached for 5 minutes.

## Low Stock Check

```bash
GET /inventory/low-stock?threshold=10&limit=50
```

Returns products below the specified threshold. Cached for 5 minutes.

## Dashboard

```bash
GET /dashboard/inventory?limit=50
```

Returns comprehensive inventory data including:

- Total available inventory
- Variant count
- Low stock tiers (≤5, ≤10, ≤20)
- Product breakdown with inventory levels

Cached for 5 minutes.

## Video Submission (User Stories)

```bash
POST /submit-video
Content-Type: multipart/form-data
```

Accepts video submissions for "Give Leroy His Flowers" feature.

**Request Body:**

- `video` (file, required): Video file (MP4, MOV, WebM)
- `name` (string, required): User's name
- `email` (string, required): User's email
- `message` (string, optional): Additional message about Leroy Kelly
- `duration` (number): Video duration in seconds

**Constraints:**

- Video duration: 15-60 seconds (enforced client-side)
- Max file size: 100MB
- Allowed formats: MP4, MOV, WebM, AVI

**Response:**

```json
{
  "ok": true,
  "message": "Video submitted successfully",
  "submissionId": 1709516400000
}
```

**Implementation Details (Droplet):**

- **Packages:** `multer`, `mongoose`, `cors`, `dotenv`
- **Video Storage:** `~/lk-api/uploads/videos/`
- **Database:** MongoDB Atlas (lk-cluster.9pdzorp.mongodb.net)
- **Routes:** `routes/videoSubmission.js`, `routes/admin.js`
- **Model:** `models/VideoSubmission.js`
- **DB Connection:** `src/db.js`
- **PM2 Status:** Restarted on 2026-03-04
- **CORS Fixed:**
  - Removed duplicate imports, configured origins
  - Added error handling middleware to ensure CORS headers on ALL responses (including errors)
  - Verified: CORS headers now present on 400/500 errors ✅
- **Nginx Upload Limit:**
  - Added `client_max_body_size 100m;` to `/etc/nginx/sites-available/lk-api`
  - Fixes 413 Content Too Large error for video uploads
  - Nginx reloaded successfully ✅
- **MongoDB Fixed:**
  - Credentials: Craigvulcan:TestPass123 (rotated from special chars password)
  - Updated in both `.env` AND `~/.bashrc` (shell env overrides .env!)
  - Connection verified ✅
  - Video submission endpoint working (returns proper errors, connects to DB)
- **Environment:** `.env` file with `MONGODB_URI`, loaded via `dotenv/config` in index.js
- **Important:** Shell env vars in `~/.bashrc` override `.env` - keep both in sync!

**Database Schema:**

```javascript
{
  name: String,           // Submitter name
  email: String,          // Submitter email (indexed)
  message: String,        // Optional message about Leroy
  videoFilename: String,  // Video filename on disk
  videoPath: String,      // Full path to video
  duration: Number,       // Video duration in seconds
  status: String,         // pending | approved | rejected | featured
  instagramUrl: String,   // URL when posted to Instagram
  submittedAt: Date,      // Submission timestamp
  reviewedAt: Date,       // Review timestamp
  notes: String          // Admin notes
}
```

**Setup MongoDB Atlas:**

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/lk-forever`)
3. Add to droplet: `export MONGODB_URI="your-connection-string"`
4. Restart PM2: `pm2 restart lk-api --update-env`

**Alternative: Local MongoDB on Droplet:**

```bash
# Connect to localhost (default if MONGODB_URI not set)
mongodb://localhost:27017/lk-forever
```

**TODO for Production:**

1. ✅ ~~Save submissions to database~~ (MongoDB integrated)
2. ✅ ~~Implement moderation/review queue~~ (Admin dashboard created)
3. ✅ ~~Add authentication to admin endpoints~~ (Password-protected login implemented)
4. Send email notifications to admin
5. Upload videos to cloud storage (S3/R2)
6. Add rate limiting per email/IP
7. Auto-delete old files after cloud upload

## Admin Video Management

**Get All Submissions**

```bash
GET /admin/submissions?status=pending&limit=50&skip=0
```

Returns paginated list of video submissions with optional status filter.

**Response:**

```json
{
  "ok": true,
  "submissions": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Leroy Kelly inspired my childhood...",
      "videoFilename": "1709516400000-video.mp4",
      "videoPath": "uploads/videos/1709516400000-video.mp4",
      "duration": 45,
      "status": "pending",
      "submittedAt": "2026-03-03T12:00:00.000Z",
      "createdAt": "2026-03-03T12:00:00.000Z",
      "updatedAt": "2026-03-03T12:00:00.000Z"
    }
  ],
  "total": 125,
  "limit": 50,
  "skip": 0
}
```

**Get Single Submission**

```bash
GET /admin/submissions/:id
```

**Update Submission Status**

```bash
PATCH /admin/submissions/:id
Content-Type: application/json

{
  "status": "approved",
  "instagramUrl": "https://instagram.com/p/abc123",
  "notes": "Great story, posted on 3/15"
}
```

**Get Submission Stats**

```bash
GET /admin/stats
```

Returns count of submissions by status.

**Response:**

```json
{
  "ok": true,
  "total": 125,
  "byStatus": {
    "pending": 78,
    "approved": 32,
    "featured": 10,
    "rejected": 5
  }
}
```

**Delete Video Submission** _(Added 2026-03-05)_

```bash
DELETE /admin/submissions/:id
```

Permanently deletes a video submission (both file and database record).

**Response:**

```json
{
  "ok": true,
  "message": "Video deleted successfully",
  "deletedId": "507f1f77bcf86cd799439011"
}
```

**Implementation:**

- Deletes video file from `~/lk-api/uploads/videos/`
- Removes database record from MongoDB
- Gracefully handles missing files (continues with DB deletion)
- Logs all deletion operations

## Email Subscribers

**Get All Subscribers** _(Added 2026-03-05)_

```bash
GET /admin/subscribers?limit=100&skip=0&active=true
```

Returns paginated list of email subscribers.

**Response:**

```json
{
  "ok": true,
  "subscribers": [
    {
      "email": "user@example.com",
      "subscribedAt": "2026-03-05T12:00:00.000Z",
      "source": "website"
    }
  ],
  "total": 145,
  "limit": 100,
  "skip": 0
}
```

**Subscribe Endpoint** _(Added 2026-03-05)_

```bash
POST /subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

Saves email subscriber to MongoDB database.

**Response:**

```json
{
  "ok": true,
  "message": "Successfully subscribed!"
}
```

**Implementation Details:**

- **Model:** `models/EmailSubscriber.js`
- **Route:** `routes/subscribe.js`
- **Database:** MongoDB Atlas
- **Features:**
  - Email validation (format check)
  - Duplicate prevention (unique index)
  - Trackable source (`website`, `manual`, `import`)
  - Active status flag for unsubscribes
  - Automatic timestamps

**EmailSubscriber Schema:**

```javascript
{
  email: String,          // Lowercase, unique, validated
  subscribedAt: Date,     // Subscription timestamp
  source: String,         // website | manual | import
  active: Boolean,        // true (subscribed) | false (unsubscribed)
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

**Created Files (Droplet):**

- `~/lk-api/models/EmailSubscriber.js` - Mongoose model
- `~/lk-api/routes/subscribe.js` - Subscribe endpoint
- Updated `~/lk-api/routes/admin.js` - Added DELETE and subscribers endpoints
- Updated `~/lk-api/src/index.js` - Wired up subscribe route

**PM2 Status:** Restarted on 2026-03-05

### Subscriber Import Script _(Added 2026-03-05)_

**Location:** `~/lk-api/scripts/import-subscribers.js`

Node.js script for importing email subscribers from Mailchimp CSV exports into MongoDB.

**Usage:**

```bash
cd ~/lk-api
node scripts/import-subscribers.js scripts/subscribers.csv
```

**Features:**

- Parses CSV files with `Email Address` and `OPTIN_TIME` columns
- Validates email format and checks for duplicates
- Preserves original signup timestamps from Mailchimp
- Sets `source: 'import'` for tracking migration
- Skips existing subscribers automatically
- Provides detailed import summary (imported vs skipped counts)

**Dependencies:**

- `csv-parse` - CSV parsing library (installed via `npm install csv-parse`)
- Mongoose for MongoDB connection
- Uses same credentials as main API (`lk-cluster.9pdzorp.mongodb.net`)

**Wave 1 Subscribers Imported (2026-03-05):**

Successfully migrated 5 Wave 1 Browns Backers club subscribers:

1. `agentfresh37@yahoo.com` - Cleveland Heights Dawg Pound
2. `dreich1218@hotmail.com` - West Park Browns Backers
3. `amsteljacob@gmail.com` - Browns Backers with a Twist
4. `scottnunnari@gmail.com` - Muni Lot Browns Backers
5. `hingetownbrownsbackers@gmail.com` - Hingetown Browns Backers

All subscribers subscribed on: March 2, 2026 at 19:13:56 UTC

**CSV Format:**

```csv
Email Address,OPTIN_TIME
user@example.com,2026-03-02 19:13:56
```

### Browns Backers Chapters Import _(Added 2026-03-05)_

**Location:** `~/lk-api/scripts/import-chapters.js`

**Model:** `~/lk-api/models/Chapter.js`

Node.js script for importing Browns Backers chapter data into MongoDB.

**Usage:**

```bash
cd ~/lk-api
node scripts/import-chapters.js scripts/chapters.csv
```

**Features:**

- Parses CSV with chapter title, member count, president info, viewing location
- Extracts structured data from multi-line president field (name, phone, email)
- Parses viewing location into venue name and address
- Updates existing chapters on re-import (upsert behavior)
- Provides detailed import summary

**Chapter Schema:**

```javascript
{
  title: String,                    // Chapter name
  members: Number,                  // Member count
  yearEstablished: Number,          // Year founded
  president: {
    name: String,                   // President name
    phone: String,                  // Contact phone
    email: String                   // Contact email
  },
  viewingLocation: {
    name: String,                   // Venue name
    address: String,                // Full address
    fullText: String                // Original text
  },
  chapterUrl: String,               // Browns Backers Worldwide URL
  scrapedAt: Date,                  // Data collection timestamp
  active: Boolean,                  // Active status
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-generated
}
```

**Imported Data (2026-03-05):**

Successfully migrated **360 Browns Backers chapters** worldwide:

**Top 5 Chapters by Member Count:**

1. Chi-town Dawg Pound - 841 members
2. Punta Gorda Charlotte County Browns Backers - 717 members
3. Big Apple Browns Backers of NYC - 568 members
4. Sarasota Browns Backers - 496 members
5. Englewood Browns Backers - 454 members

**Data Source:** Browns Backers Worldwide chapter directory (scraped February 2026)

**Use Cases:**

- Chapter directory pages
- Regional email campaigns
- Wave code validation
- Location-based features
- President contact lookup

## Admin Dashboard UI

**Location:** `/admin` (password protected)

Full-featured web dashboard for reviewing and managing video submissions.

**Features:** _(Updated 2026-03-05)_

- 📊 **Dashboard Stats** - Real-time video submission counts (total, pending, approved, featured)
- 📦 **Inventory Dashboard** - Live Shopify stock levels with low-stock alerts (≤5, ≤10, ≤20 units)
- 📧 **Email Subscribers** - View subscriber list with expandable details and signup dates
- 📹 **Video Previews** - Watch submissions directly in browser with playback controls
- ⬇️ **Download Videos** - Download any submission to local machine
- 🗑️ **Delete Videos** - Permanently delete rejected submissions (with confirmation)
- 🏷️ **Status Filtering** - View all, pending, approved, featured, or rejected submissions
- ✅ **Quick Actions** - Approve, reject, or feature videos with one click
- 📊 **Submission Details** - View name, email, message, duration, and submission date
- 🎨 **Color-Coded Badges** - Visual status indicators (amber/green/purple/red)
- 🔄 **Status Transitions** - Move videos between states (pending → approved → featured, etc.)
- 🚪 **Logout Button** - Clear authentication session

**Admin Routes:**

- `/admin/login` - Password-protected login page
- `/admin` - Dashboard (auto-redirects to login if not authenticated)

**Screenshots locations:**

- Filter bar with 5 status buttons
- Grid layout with video cards (3 columns on desktop)
- Each card shows video preview, submitter info, and action buttons

## Admin Authentication

**Security Implementation:**

- 🔐 **Password Protection** - Required to access admin dashboard
- 🔑 **Environment Variable** - Password stored in `VITE_ADMIN_PASSWORD` env var
- 💾 **Session Storage** - Auth token cleared when browser closes
- 🚫 **Auto-Redirect** - Unauthorized users sent to login page
- 🔒 **Hidden Navigation** - Admin link only visible when authenticated
- 🚪 **Logout Function** - Manual session termination available

**Setup:**

1. Create `.env.local` in project root:

   ```bash
   VITE_ADMIN_PASSWORD=YourSecurePassword123!
   ```

2. Access admin at `/admin` (redirects to `/admin/login`)

3. Enter password to authenticate

**Production Deployment (Vercel):**

Add environment variable in Vercel dashboard:

- **Name:** `VITE_ADMIN_PASSWORD`
- **Value:** Your secure password

**Default Password (Development):**

```
LeroyKelly2026!
```

**Security Notes:**

- Session-based authentication (not persistent across browser restarts)
- `.env.local` automatically ignored by git (via `*.local` in `.gitignore`)
- Password never committed to repository
- Frontend validation only - consider backend auth middleware for production

**Future Enhancements:**

- IP allowlist (restrict to specific IPs)
- Google OAuth integration
- Multi-factor authentication (MFA)
- Role-based access control (RBAC)

---

# 🛠 Frontend Inventory Integration

### API Client (`src/lib/api.ts`)

TypeScript API client with proper type definitions:

- Uses `VITE_API_BASE_URL` environment variable
- Falls back to `https://api.leroykellyforever.com` in production
- Provides typed methods for all API endpoints
- Built-in timeout handling (4s default)
- Proper error handling

**Available methods:**

- `api.health()` - Health check
- `api.products(limit)` - Fetch products
- `api.inventorySummary(limit)` - Inventory summary
- `api.lowStock(threshold, limit)` - Low stock items
- `api.inventoryDashboard(limit)` - Dashboard data

### Custom Hook (`src/hooks/useInventory.ts`)

React hook for real-time inventory integration:

**Features:**

- Real-time inventory pull from Shopify via API
- Fail-soft fallback (defaults to 50 if API fails)
- 30-second client-side cache
- Sums inventory from all Shopify variants
- Never breaks drop page during API failure
- Returns loading states and error handling

**Usage:**

```typescript
const { available, loading, error, meta } = useInventory();
```

Drop page dynamically updates allocation count without page refresh.

### Development Inventory Page

`src/pages/DevInventory/DevInventory.jsx`

Development-only component for testing:

- Calls `api.inventoryDashboard()` on mount
- Displays total available inventory
- Shows variant counts and low stock items
- Renders full product data for verification

Access via routing in development (not exposed in production).

---

# 🛒 Shopify Checkout Strategy

Direct cart link:

https://STORE.myshopify.com/cart/VARIANT_ID:1?discount=CODE

Benefits:

- Bypasses product browsing
- Enforces allocation per code
- Applies discount automatically
- Respects global inventory cap

---

# 📊 Data Layer (Phase 1 Metrics)

Tracked:

- Discount usage per club
- Inventory decrement
- Allocation timing
- Email captures
- Regional performance

Future phases:

- MongoDB fan layer
- Shopify webhooks
- Referral tracking
- NFT verification endpoints

---

# 📨 Email Infrastructure

Professional email infrastructure built for trust and deliverability.

### Setup

- **Domain**: `leroykellyforever.com` (Google-managed DNS)
- **Google Workspace**: Business Starter plan
- **Sender Address**: `info@leroykellyforever.com`
- **Mailchimp Integration**: Custom domain authenticated

### Authentication & Deliverability

- ✅ **DKIM authentication** configured
- ✅ **Domain ownership** verified in Mailchimp
- ✅ **DNS records** optimized for inbox placement
- ✅ **Tested email flow** between external accounts

### Benefits

- Prevents "via mailchimp.com" warnings
- Avoids spam classification from shared senders
- Establishes verified sender identity
- Builds trust with professional branded emails
- Scalable for future campaigns

---

# 🗂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ScarcityBadge.tsx
│   ├── Navigation.tsx   # Header navigation with auth-aware admin link
│   └── MetaTags.tsx
├── hooks/              # Custom React hooks
│   ├── useInventory.ts # Shopify inventory API integration
│   ├── useInView.ts    # Intersection Observer for scroll animations
│   └── useScrollPosition.ts # Optimized scroll tracking
├── lib/                # Utility libraries
│   └── api.ts         # API client with TypeScript types
├── pages/              # Route-level pages
│   ├── Home/
│   │   └── Home.tsx    # Landing page
│   ├── Drop/
│   │   └── Drop.tsx    # Product allocation page
│   ├── SubmitVideo/
│   │   └── SubmitVideo.tsx # Video submission page
│   ├── Admin/
│   │   └── Admin.tsx   # Password-protected admin dashboard
│   ├── AdminLogin/
│   │   └── AdminLogin.tsx # Admin authentication
│   └── DevInventory/   # Development inventory dashboard
├── sections/           # Page section components
│   ├── HeroSection/
│   ├── HatVideoCardSection/
│   ├── VideoSubmissionSection/  # Video upload form
│   ├── EmailCaptureSection/
│   ├── LegacyStatsSection/
│   ├── CtaSection/
│   ├── SealSection/
│   └── Footer/
└── config/
    └── siteConfig.js   # Global configuration
```

Modular, extensible, open-for-extension architecture.

---

## 🎯 User Flow & Conversion Strategy

### Home Page (`/`)

1. Hero with L. Kelly logo and brand messaging
2. Legacy stats (7,274 yards, Hall of Fame credentials)
3. "View Edition I" CTA → directs to Drop page
4. Footer with social links

### Drop Page (`/drop`)

1. Hero with logo and "The First 50" messaging
2. **Real-time inventory badge** - Updates dynamically from API
3. **Product card** with video loop
4. **"Secure Now" CTA** - Direct cart link with discount code
5. **Legacy stats** for trust and context
6. **Email capture** for soft conversion
7. **Seal section** with authenticity badge
8. Footer

### Allocation States

- **Active**: Inventory available, CTA enabled
- **Low Stock**: Visual urgency when < 10 units
- **Complete**: Inventory depleted, alternative CTA shown

---

# 📈 Roadmap

## Phase 1 (Complete)

- ✅ Drop page with real-time inventory
- ✅ Cart link integration with Shopify
- ✅ Production API on DigitalOcean
- ✅ SSL infrastructure (Let's Encrypt)
- ✅ Discount allocation engine
- ✅ Email capture with Mailchimp
- ✅ Video submission system with MongoDB
- ✅ Admin dashboard with authentication
- ✅ Video review and approval workflow

## Phase 2

- Presidents leaderboard tracking
- Analytics integration
- Allocation performance dashboard
- Club tier system

## Phase 3

- NFT gating
- Referral engine
- Tier-based unlocks
- Club-exclusive releases

---

# 🏛 Philosophy

This is not e-commerce.

This is allocation.

Frontend = Museum  
Backend = Vault  
Shopify = Fulfillment warehouse

---

© 2026 Leroy Kelly Forever  
All rights reserved.
