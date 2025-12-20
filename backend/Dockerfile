# ================================
# SelfActual Backend - Dockerfile
# Azure Container Apps Compatible
# ================================

# Use official Node.js LTS image (Alpine for smaller size)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies for production
# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install only production dependencies
# Use --omit=dev for npm 8+ (more explicit than --only=production)
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source code
COPY src/ ./src/

# Set environment to production
ENV NODE_ENV=production

# CRITICAL: Expose the port Azure will use
# Azure Container Apps will set PORT env var, but 5000 is our default
EXPOSE 5000

# CRITICAL: Health check for Azure Container Apps
# - Must respond quickly
# - Uses wget instead of curl (smaller image)
# - Checks the simple /api/health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-5000}/api/health || exit 1

# Start the application
# Use node directly (not nodemon, not npm start) for faster startup
CMD ["node", "src/app.js"]
