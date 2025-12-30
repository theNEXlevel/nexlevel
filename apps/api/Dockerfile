# Build stage
FROM docker.io/node:lts-alpine AS builder

WORKDIR /workspace

# Copy package files
COPY package.json package-lock.json* ./
COPY nx.json tsconfig.base.json ./

# Copy workspace configuration
COPY apps/api ./apps/api
COPY libs ./libs

# Install dependencies
RUN npm ci

# Build the application
RUN npx nx run api:build

# Production stage
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3333

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /workspace/dist/apps/api .

# Install production dependencies if needed
RUN npm --omit=dev -f install

# Add curl for healthcheck
RUN apk add --no-cache curl

# Healthcheck configuration
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3333/health || exit 1

CMD [ "node", "main.js" ]
