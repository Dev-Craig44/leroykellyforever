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

## Admin Dashboard UI

**Location:** `/admin` (password protected)

Full-featured web dashboard for reviewing and managing video submissions.

**Features:**

- 📹 **Video Previews** - Watch submissions directly in browser with playback controls
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
