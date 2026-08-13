# syntax=docker/dockerfile:1

# ---- deps -------------------------------------------------------------
# Installs dependencies in their own layer so `docker build` only re-runs
# npm install when package.json/package-lock.json actually change.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# Node 20 races IPv6 against IPv4 when opening a socket (autoSelectFamily, on
# by default). That race does not survive Docker Desktop's NAT: every registry
# connection ETIMEDOUTs, and npm 10.8.2 reacts by crashing with "Exit handler
# never called!" *while still exiting 0*, leaving node_modules as a tree of
# empty package directories. Docker then caches that hollow layer and the build
# fails four steps later with a baffling `sh: next: not found`. Forcing the
# IPv4-only path is what actually makes the install work — busybox `wget` could
# always reach the registry from this same container, which is the tell.
ENV NODE_OPTIONS=--no-network-family-autoselection
# Longer timeouts + retries so a slow/flaky path to the registry (common
# through corporate proxies and Docker Desktop's NAT) doesn't kill the build
# on the first blip. Does not fix a fully blocked network — see the
# troubleshooting steps if this still times out.
#
# `test -x` is the guard for the failure above: npm exiting 0 on a partial
# install must fail *here*, where it happened, not downstream in `next build`.
RUN npm config set fetch-timeout 300000 \
  && npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm ci --no-audit --no-fund \
  && test -x node_modules/.bin/next

# ---- builder ------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner ------------------------------------------------------------
# `output: "standalone"` in next.config.ts makes .next/standalone a
# self-contained server with only the runtime deps it actually needs —
# no node_modules copy, no npm install in the final image.
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# The app always listens on 3000 inside the container; map the host port
# with `-p 1001:3000` (see docker-compose.yml) rather than changing this.
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
