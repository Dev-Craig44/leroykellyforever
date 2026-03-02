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
- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- React Router
- Shopify Cart Link integration
- Mailchimp (custom authenticated domain)

## Backend (API Layer)
- Node.js (NVM-managed)
- Express
- PM2
- Nginx (reverse proxy)
- Let's Encrypt SSL (Certbot)
- Hosted on DigitalOcean Droplet
- Domain: api.leroykellyforever.com

## E-commerce Engine
- Shopify (inventory + checkout)
- Discount code–based allocation control
- Cart-link direct checkout strategy

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

# 🌐 Production Infrastructure

## Frontend

Deployed on Vercel  
Domain: https://leroykellyforever.com

Auto-deploy from main branch.

---

---

## API Backend (DigitalOcean)

### Stack

- Ubuntu Droplet
- Node via NVM
- PM2 process manager
- Nginx reverse proxy
- SSL via Let's Encrypt
- Domain: api.leroykellyforever.com

---

## Deployment Workflow

Local changes  
→ git commit  
→ git push  
→ SSH into droplet  
→ git pull  
→ npm install (if needed)  
→ pm2 restart lk-api --update-env  

Production files are not edited directly except:

- .env
- Nginx configs
- Certbot configs

GitHub remains source of truth.

---

# 🔌 API Endpoints

## Health
GET /health

## Inventory Summary
GET /inventory/summary?limit=50

Returns:
- Aggregated available inventory
- Cached status
- Fetch timestamp

## Dashboard
GET /dashboard/inventory?limit=50

Returns:
- Total available
- Variant count
- Low stock tiers
- Product breakdown

---

# 🛠 Frontend Inventory Integration

Custom hook:

src/hooks/useInventory.ts

Features:

- Real-time inventory pull
- Fail-soft fallback
- 30-second cache
- Summed inventory from Shopify variants
- Never breaks drop page during API failure

Drop page dynamically updates allocation count.

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

- Google Workspace
- DKIM authenticated
- Mailchimp custom domain
- Sender: info@leroykellyforever.com
- Optimized for inbox placement

---

# 🗂 Project Structure

src/
├── components/
├── hooks/
├── pages/
├── sections/
└── config/

Modular, extensible, open-for-extension architecture.

---

# 📈 Roadmap

## Phase 1 (Complete)
- Drop page
- Cart link integration
- Real-time inventory
- Production API
- SSL infrastructure
- Discount allocation engine

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
