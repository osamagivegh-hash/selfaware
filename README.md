# SelfActual - Bilingual Psychological Awareness Platform

A production-ready bilingual (Arabic + English) content website focused on **Psychological Awareness** (الوعي النفسي) and **Self Development** (تطوير الذات).

## 🌟 Project Overview

SelfActual is an educational and awareness-focused content platform designed to provide trustworthy, human, and calm mental wellness content. This is NOT a therapy or medical diagnosis platform.

### Key Features
- 🌐 Full bilingual support (Arabic RTL / English LTR)
- 📱 Responsive, calm, and professional UI
- 🔍 SEO-optimized for Google AdSense compatibility
- ⚡ Static Site Generation (SSG) for fast loading
- 🛡️ Production-ready security measures

---

## 📁 Project Structure

```
selfactual/
├── frontend/                 # Next.js 14 App Router
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── [lang]/       # Language-based routing
│   │   │   │   ├── page.tsx  # Homepage
│   │   │   │   ├── awareness/[slug]/
│   │   │   │   ├── self-development/[slug]/
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   ├── privacy/
│   │   │   │   └── disclaimer/
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/       # Reusable components
│   │   ├── lib/              # Utilities & API clients
│   │   ├── dictionaries/     # i18n translations
│   │   └── types/            # TypeScript types
│   ├── public/
│   ├── next.config.js
│   └── package.json
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/           # Configuration
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   └── app.js            # Express app
│   ├── .env.example
│   └── package.json
│
└── docs/                     # Documentation
    ├── DEPLOYMENT.md
    ├── CONTENT_GUIDELINES.md
    └── API_ROUTES.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

---

## 🌍 Routing Structure

| Route | Description |
|-------|-------------|
| `/ar` | Arabic homepage |
| `/en` | English homepage |
| `/ar/awareness/[slug]` | Arabic awareness article |
| `/en/awareness/[slug]` | English awareness article |
| `/ar/self-development/[slug]` | Arabic self-development article |
| `/en/self-development/[slug]` | English self-development article |
| `/[lang]/about` | About page |
| `/[lang]/contact` | Contact page |
| `/[lang]/privacy` | Privacy policy |
| `/[lang]/disclaimer` | Disclaimer page |

---

## 📊 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Security**: Helmet, Rate Limiting, CORS

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 👤 Author

Built with care for mental wellness awareness.
