FROM oven/bun AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=bun:bun . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bunx prisma generate
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:bun .next

COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static
COPY --chown=nextjs:bun prisma ./prisma/

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["bun", "migrate:prod" ]
