# Use Node.js 22 on Debian Bookworm Slim
FROM node:22-bookworm-slim AS base

# Install dependencies only when needed (including dev dependencies for build)
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Setup production node_modules (prune dev dependencies)
FROM base AS production-deps
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
RUN npm prune --omit=dev

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Set NODE_ENV for production
ENV NODE_ENV=production

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Don't run as root
# The node image may already have a nodejs group, so try to create it or use existing
RUN groupadd --system --gid 1001 nodejs 2>/dev/null || true
# Create user with -g flag to use the existing group if it exists
RUN useradd --system --uid 1001 --gid nodejs nodejs 2>/dev/null || true

# Copy production node_modules from production-deps stage
COPY --from=production-deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy package files for reference
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

# Copy application files
COPY --from=builder --chown=nodejs:nodejs /app/build ./build
COPY --from=builder --chown=nodejs:nodejs /app/server.ts ./server.ts

# Copy source images for on-demand transformation
COPY --from=builder --chown=nodejs:nodejs /app/assets ./assets

# Copy scripts and config for pre-generation (used to warm cache on each machine)
COPY --from=builder --chown=nodejs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nodejs:nodejs /app/app/config ./app/config

# Make entrypoint script executable
RUN chmod +x /app/scripts/entrypoint.sh

USER nodejs

EXPOSE 3000

ENV PORT=3000

ENTRYPOINT ["/app/scripts/entrypoint.sh"]
