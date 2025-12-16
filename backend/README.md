# SelfActual Backend API

Express.js backend API for the SelfActual bilingual psychological awareness platform.

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your MongoDB connection string

# Seed database (first time only)
npm run seed

# Run development server
npm run dev
```

## 🐳 Docker Deployment

### Prerequisites
- Docker & Docker Compose installed on server
- MongoDB Atlas connection string
- Port 5000 available

### Deploy Steps

```bash
# 1. Clone repository
git clone https://github.com/osamagivegh-hash/selfaware.git
cd selfaware/backend

# 2. Create environment file
cp .env.example .env
nano .env  # Add your MongoDB URI and other secrets

# 3. Build and start container
docker-compose up -d --build

# 4. Check status
docker-compose ps
docker-compose logs -f

# 5. Seed database (first time only)
docker-compose exec backend node src/scripts/seed.js
```

### Management Commands

```bash
# View logs
docker-compose logs -f backend

# Restart service
docker-compose restart backend

# Stop all services
docker-compose down

# Rebuild and restart (after code changes)
docker-compose up -d --build

# Check container health
docker-compose ps
```

### Update Deployment (from GitHub)

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Verify
docker-compose logs -f --tail=50
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/articles` | All published articles |
| GET | `/api/articles/slug/:slug` | Article by URL slug |
| GET | `/api/articles/editors-picks` | Featured articles |
| GET | `/api/articles/latest` | Recent articles |
| GET | `/api/articles/category/:slug` | Articles by category |
| GET | `/api/categories` | All categories |
| GET | `/api/authors` | All authors |

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production/development) | Yes |
| `PORT` | Server port (default: 5000) | Yes |
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `CORS_ORIGIN` | Allowed frontend URL | Yes |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | No |
| `RATE_LIMIT_MAX` | Max requests per window | No |

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app & server
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── scripts/            # Utility scripts
├── Dockerfile              # Docker build config
├── docker-compose.yml      # Docker Compose config
├── .env.example            # Environment template
└── package.json
```

## 📋 Technical Decisions

1. **Node.js 18 Alpine** - LTS version, small image size
2. **Production-only deps** - `npm ci --only=production` for smaller image
3. **Health checks** - Docker monitors API availability
4. **JSON logging** - Structured logs with size limits
5. **No .env in image** - Secrets loaded at runtime via docker-compose
