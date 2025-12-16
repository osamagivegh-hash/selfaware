# SelfActual Frontend

Next.js 14 (App Router) frontend for the SelfActual bilingual psychological awareness platform.

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🌐 Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `osamagivegh-hash/selfaware`
4. Configure the project:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=http://15.185.130.80/api
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

6. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: selfactual-frontend
# - Directory: ./
# - Override settings: N
```

### Environment Variables (Required)

| Variable | Description | Production Value |
|----------|-------------|------------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://15.185.130.80/api` |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL (for SEO) | `https://your-vercel-domain.vercel.app` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | (optional) |
| `NEXT_PUBLIC_ADSENSE_ID` | AdSense Publisher ID | (optional) |

### Update Deployment

Every push to `main` automatically triggers a new deployment on Vercel.

```bash
# Make changes locally
git add .
git commit -m "Update frontend"
git push origin main
# Vercel deploys automatically!
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── [lang]/           # Language-based routing
│   │   │   ├── layout.tsx    # RTL/LTR layout
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── about/        # About page
│   │   │   ├── contact/      # Contact page
│   │   │   ├── privacy/      # Privacy policy
│   │   │   ├── disclaimer/   # Disclaimer
│   │   │   ├── awareness/    # Awareness category + articles
│   │   │   └── self-development/ # Self-dev category + articles
│   │   ├── globals.css       # Design system
│   │   ├── layout.tsx        # Root layout
│   │   ├── sitemap.ts        # SEO sitemap
│   │   └── robots.ts         # SEO robots.txt
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities
│   ├── types/                # TypeScript types
│   └── dictionaries/         # i18n translations
├── vercel.json               # Vercel configuration
├── next.config.js            # Next.js configuration
└── package.json
```

## 🌍 Features

- ✅ **Bilingual** (Arabic RTL + English LTR)
- ✅ **SEO Optimized** (sitemap, robots.txt, meta tags)
- ✅ **Responsive Design** (mobile-first)
- ✅ **Static Generation** (SSG for articles)
- ✅ **AdSense Ready** (disclaimer, privacy policy)
- ✅ **Calm UI** (professional, accessible design)

## 🎨 Design System

Colors:
- Primary: `#4A7C59` (Sage green)
- Secondary: `#8B7355` (Warm brown)
- Accent: `#D4A574` (Soft gold)

The design emphasizes calm, trust, and growth - appropriate for psychological awareness content.
