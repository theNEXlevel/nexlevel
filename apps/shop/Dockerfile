# Build stage
FROM docker.io/node:lts-alpine AS builder

WORKDIR /workspace

# Copy package files
COPY package.json package-lock.json* ./
COPY nx.json tsconfig.base.json ./

# Copy workspace configuration
COPY apps/shop ./apps/shop
COPY libs ./libs

# Install dependencies
RUN npm ci

# Build the application
RUN npx nx run shop:build

# Production stage
FROM docker.io/node:lts-alpine

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /workspace/dist/apps/shop .

# Angular SSR applications don't need npm install as dependencies are bundled

# Add curl for healthcheck
RUN apk add --no-cache curl

# Healthcheck configuration
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

CMD [ "node", "server/server.mjs" ]
