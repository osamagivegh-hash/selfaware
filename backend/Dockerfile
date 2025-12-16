# ================================
# SelfActual Backend - Dockerfile
# ================================

# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies for production
# Copy package files first for better caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY src/ ./src/

# Expose the API port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start the application
CMD ["node", "src/app.js"]
