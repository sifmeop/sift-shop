FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/api-admin/package.json ./apps/api-admin/
COPY packages/database/package.json ./packages/database/

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build --filter=@sift-shop/api

FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]