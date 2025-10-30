# ---- base ----
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# ---- deps ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

# Usuario no-root
RUN addgroup -g 1001 -S nodejs && adduser -S app -u 1001
USER app

# Copiamos node_modules de prod + código
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Salud del contenedor (usa tu endpoint de health)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:${PORT}/health || exit 1

EXPOSE 3000
CMD ["node", "src/server.js"]
