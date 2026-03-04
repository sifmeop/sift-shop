FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock ./
COPY packages/ ./packages/
COPY apps/admin-api/ ./apps/admin-api/

RUN bun install --frozen-lockfile

WORKDIR /app/apps/admin-api

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start:prod"]