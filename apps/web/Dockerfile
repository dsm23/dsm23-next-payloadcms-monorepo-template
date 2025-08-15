# syntax=docker.io/docker/dockerfile:1@sha256:38387523653efa0039f8e1c89bb74a30504e76ee9f565e25c9a09841f9427b05

FROM node:24.6.0-alpine@sha256:de5947748f6e158bf335c3540e1aab648a5607d5078f35fdb6d5c1c6189dd781 AS base

# corepack is broken https://github.com/nodejs/corepack/issues/612
# corepack was fixed but is will be removed from node from v25+
# TODO: re-add corepack after it's been removed
# RUN npm install -g corepack@latest

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

RUN npm i -g turbo@2.5.4
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV LEFTHOOK=0

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .

RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/web/server.js"]
