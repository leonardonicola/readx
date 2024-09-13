FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.10.0 --activate 
# set the store dir to a folder that is not in the project
RUN pnpm config set store-dir ~/.pnpm-store
RUN pnpm fetch

# Install dependencies only when needed
FROM base AS deps
USER node
WORKDIR /app
COPY --chown=node:node package.json pnpm-lock.yaml* ./
RUN pnpm install --prod 

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN pnpm prisma generate
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./package.json
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs prisma ./prisma/
RUN pnpm migrate:prod
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "start:prod" ]
