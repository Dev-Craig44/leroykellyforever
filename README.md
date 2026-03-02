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

## � API Backend (Shopify Integration)

The backend API provides real-time Shopify inventory data and is deployed separately from the frontend.

### Production Deployment (DigitalOcean Droplet)

**Stack:**

- **Platform**: DigitalOcean Ubuntu 22.04 Droplet
- **Runtime**: Node.js (managed via NVM)
- **Process Manager**: PM2 (for zero-downtime restarts)
- **Web Server**: Nginx (reverse proxy)
- **SSL**: Let's Encrypt (via Certbot)
- **Domain**: `api.leroykellyforever.com`

### Initial Server Setup

1. **Clone the API repository**

   ```bash
   cd ~
   git clone https://github.com/YOUR_USERNAME/lk-api.git
   cd lk-api
   ```

2. **Install dependencies**

   ```bash
   npm install
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
   pm2 start server.js --name lk-api
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

### API Endpoints

All endpoints return JSON and include CORS headers for `leroykellyforever.com`.

#### Health Check

```bash
GET /health
```

Returns server status and uptime.

#### Products

```bash
GET /products?limit=5
```

Returns Shopify products with inventory levels. Cached for 5 minutes.

#### Inventory Summary

```bash
GET /inventory/summary?limit=50
```

Returns aggregated inventory data across all variants. Cached for 5 minutes.

#### Low Stock Check

```bash
GET /inventory/low-stock?threshold=10&limit=50
```

Returns products below the specified threshold. Cached for 5 minutes.

#### Inventory Dashboard (Combined)

```bash
GET /dashboard/inventory?limit=50
```

Returns comprehensive inventory data including:

- Total available inventory
- Total number of variants
- Low stock counts (≤5, ≤10, ≤20)
- Full product details with inventory levels

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
- **Check port listeners**: `sudo lsof -i :80` and `sudo lsof -i :443`
- **Check firewall**: Ensure ports 80 and 443 are open in DigitalOcean firewall settings

#### CORS Errors

- Verify `CORS_ORIGIN` in `.env` matches your frontend domain exactly
- Check Nginx proxy headers are properly forwarding origin information
- Restart PM2 after environment changes: `pm2 restart lk-api --update-env`

#### Nginx Configuration Issues

- **Server name conflicts**: Check for duplicate `server_name` directives in `/etc/nginx/sites-enabled/`
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

## 🧪 Frontend API Integration

The frontend includes a test page and API client for Shopify inventory integration.

### API Client (`src/lib/api.js`)

- Uses `VITE_API_BASE_URL` environment variable
- Falls back to `https://api.leroykellyforever.com` in production
- Provides methods for all API endpoints with proper error handling

### Inventory Test Page (`src/pages/DevInventory/DevInventory.jsx`)

A development component that:

- Calls `api.inventoryDashboard()` on mount
- Displays total available inventory
- Shows variant counts
- Lists low stock items
- Renders full product data for verification

Access via routing in development (not exposed in production).

## �📨 Email Infrastructure

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
