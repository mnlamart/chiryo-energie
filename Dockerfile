# Use Node.js 22 on Debian Bookworm Slim
FROM node:22-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nodejs

# Copy package files for reference
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/package-lock.json ./package-lock.json

# Copy production node_modules from deps stage (already installed with all deps)
# We'll prune dev dependencies after copying
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

# Remove dev dependencies to keep image small
RUN npm prune --production && npm cache clean --force

# Copy application files
COPY --from=builder --chown=nodejs:nodejs /app/build ./build
COPY --from=builder --chown=nodejs:nodejs /app/server.js ./server.js

# Ensure node_modules ownership is correct
RUN chown -R nodejs:nodejs /app/node_modules

USER nodejs

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "server.js"]
