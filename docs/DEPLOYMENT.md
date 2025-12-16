# Deployment Guide

This document explains how to deploy the SelfActual platform to production.

---

## Architecture Overview

```
┌─────────────────────┐         ┌─────────────────────┐
│                     │         │                     │
│   Vercel (Frontend) │ ──────► │  AWS EC2 (Backend)  │
│   - Next.js SSG     │  HTTPS  │  - Express.js API   │
│   - CDN Cached      │         │  - Node.js Runtime  │
│                     │         │                     │
└─────────────────────┘         └─────────────────────┘
                                          │
                                          │ TLS
                                          ▼
                                ┌─────────────────────┐
                                │                     │
                                │   MongoDB Atlas     │
                                │   - Shared Cluster  │
                                │   - selfactual DB   │
                                │                     │
                                └─────────────────────┘
```

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub/GitLab/Bitbucket repository

### Steps

1. **Push to Repository**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Set root directory to `frontend`
   - Framework: Next.js (auto-detected)

3. **Configure Environment Variables**
   In Vercel Project Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
   NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX (optional)
   ```

4. **Configure Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

5. **Deploy**
   - Vercel will automatically build and deploy
   - Every push to main triggers a new deployment

### Vercel Configuration (vercel.json)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

---

## Backend Deployment (AWS EC2)

### Prerequisites
- AWS Account
- EC2 Instance (Ubuntu 22.04 LTS recommended)
- SSH access to the instance
- Domain name (optional but recommended)

### Step 1: Prepare EC2 Instance

1. **Launch EC2 Instance**
   - AMI: Ubuntu Server 22.04 LTS
   - Instance Type: t3.micro (free tier) or t3.small
   - Storage: 20GB gp3
   - Security Group:
     - SSH (22) from your IP
     - HTTP (80) from anywhere
     - HTTPS (443) from anywhere
     - Custom TCP (5000) from anywhere (or your frontend IP)

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Update System**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   node --version  # Should be 18.x
   ```

5. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

6. **Install Nginx**
   ```bash
   sudo apt install -y nginx
   ```

### Step 2: Deploy Backend Code

1. **Clone Repository on Server**
   ```bash
   cd /home/ubuntu
   git clone <your-repo-url> selfactual
   cd selfactual/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Create Environment File**
   ```bash
   cp .env.example .env
   nano .env
   ```
   
   Edit `.env`:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://osamashaer66_db_user:YOUR_PASSWORD@mawaddah.lh79hv8.mongodb.net/selfactual?retryWrites=true&w=majority&appName=Mawaddah
   CORS_ORIGIN=https://your-frontend-domain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

4. **Seed Database (First Time Only)**
   ```bash
   npm run seed
   ```

5. **Start with PM2**
   ```bash
   pm2 start src/app.js --name selfactual-api
   pm2 save
   pm2 startup  # Follow the instructions
   ```

### Step 3: Configure Nginx

1. **Create Nginx Config**
   ```bash
   sudo nano /etc/nginx/sites-available/selfactual-api
   ```

2. **Add Configuration**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;  # Or your EC2 public IP

       location / {
           proxy_pass http://localhost:5000;
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

3. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/selfactual-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Step 4: Enable HTTPS (Recommended)

1. **Install Certbot**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Get SSL Certificate**
   ```bash
   sudo certbot --nginx -d api.yourdomain.com
   ```

3. **Auto-renewal is automatic**

---

## Environment Variables Reference

### Frontend (.env.local)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL (for SEO) | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense Publisher ID | No |

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `CORS_ORIGIN` | Allowed frontend origin | Yes |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | No |
| `RATE_LIMIT_MAX` | Max requests per window | No |

---

## Deployment Checklist

### Before Deployment

- [ ] All environment variables configured
- [ ] MongoDB Atlas IP whitelist includes EC2 IP
- [ ] DNS records configured for domains
- [ ] SSL certificates ready or will use Certbot

### Frontend (Vercel)

- [ ] Repository connected to Vercel
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL auto-enabled by Vercel

### Backend (AWS EC2)

- [ ] EC2 instance running Ubuntu 22.04
- [ ] Node.js 18+ installed
- [ ] PM2 installed and configured
- [ ] Nginx installed and configured
- [ ] SSL certificate installed (Certbot)
- [ ] Database seeded
- [ ] API endpoints tested
- [ ] PM2 startup configured for reboot

### Post-Deployment

- [ ] Test all frontend pages
- [ ] Test all API endpoints
- [ ] Verify CORS is working
- [ ] Check mobile responsiveness
- [ ] Verify RTL/LTR switching
- [ ] Submit sitemap to Google Search Console
- [ ] Apply for AdSense (after content is ready)

---

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGIN` in backend matches frontend URL exactly
   - Include protocol (https://)

2. **MongoDB Connection Failed**
   - Check if EC2 IP is whitelisted in MongoDB Atlas
   - Verify connection string

3. **502 Bad Gateway**
   - Check if PM2 process is running: `pm2 list`
   - Check logs: `pm2 logs selfactual-api`

4. **SSL Certificate Issues**
   - Run: `sudo certbot renew --dry-run`
   - Check Nginx config: `sudo nginx -t`

---

## Updating the Application

### Frontend (Vercel)
Push to the main branch - Vercel auto-deploys.

### Backend (EC2)
```bash
cd /home/ubuntu/selfactual/backend
git pull origin main
npm install --production
pm2 restart selfactual-api
```
