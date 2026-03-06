# sift-shop  
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nest&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-2B2B2B?logo=bun&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS_S3-232F3E?logo=amazonaws&logoColor=white) ![Railway](https://img.shields.io/badge/Railway-F24E1E?logo=railway&logoColor=white)

sift-shop is a Bun-powered monorepo that unifies storefront, admin dashboard, and API services under a single developer experience. It combines NestJS/GraphQL backends with Next.js and React frontends to cover customer shopping, product management, and administrative operations. The storefront uses modern App Router patterns to render product catalogs, filters, and checkout journeys with GraphQL safety and Tailwind styling. The admin dashboard exposes CRUD flows for products, categories, and variants, relying on TanStack Query/Form plus structured validations for reliability. APIs leverage Prisma-connected PostgreSQL schemas, session-based auth, OAuth, and two-factor protection to secure both storefront and admin traffic. GraphQL code generation enforces typing across layers while Throttler guards and rate limiting protect critical endpoints. Image uploads route through AWS S3 and CloudFront so both dashboards share consistent media storage. The project seeds a rich product catalog spanning electronics, clothing, and food to jumpstart demos or tests. Environment declarations and `.env.example` templates keep configuration transparent for Bun workspaces across apps. Railway hosts deployments, and Bun stays as the runtime/package manager so installs and scripts behave uniformly. Each service has its own `bun` task for development, allowing concurrent debugging across store/admin/backends. Overall, sift-shop is built for teams that need a turnkey e-commerce stack with JavaScript/TypeScript everywhere.

**Features**  
- **Storefront**
- Dynamic filter system synced with URL params and responsive Radix navigation  
- GraphQL Code Generator types throughout the Next.js App Router  
- Tailwind CSS with typography plugin and Framer Motion storytelling  

- **Admin Dashboard**
- TanStack Router driven routes with TanStack Table CRUD interfaces  
- Form handling via TanStack Form + Zod and shadcn/ui primitives  
- AWS S3 image uploads with orphan cleanup and direct media controls  

- **Backend/API**
- Two NestJS services (storefront + admin) with Apollo GraphQL and Prisma clients  
- Session-based auth layered with Google OAuth, email/password, and TOTP 2FA  
- AWS S3 image management, Resend email workflows, and custom GqlThrottlerGuard rate limiting  

**Tech Stack**  
- Frontend: Next.js App Router, React, TanStack Router, Tailwind CSS, Framer Motion, Radix UI  
- Backend: Bun + NestJS, Apollo GraphQL, Prisma ORM, express-session, speakeasy (TOTP), Resend emails  
- Database: PostgreSQL, Prisma schema, JSON fields for filters/specs/variantAttributes  
- Infrastructure: Bun runtime/package manager, Railway deployment, Cloudflare DNS, AWS S3 + CloudFront storage  

**Monorepo Structure**  
```
apps/
├─ admin/           # React + TanStack Router admin dashboard
├─ admin-api/       # NestJS GraphQL admin backend (sessions, OAuth, 2FA)
├─ api/             # NestJS GraphQL storefront backend (sessions, OAuth, 2FA)
└─ storefront/      # Next.js App Router storefront with GraphQL and Tailwind
packages/
└─ database/         # Prisma client package with PostgreSQL schema and seeded data
```

**Getting Started**  
- **Prerequisites**
  - Bun (≥1.x) installed globally  
  - PostgreSQL database accessible (local or managed)  
  - AWS account with S3 + CloudFront credentials  
  - Railway project configured for deployment  
  - Resend (or compatible) email credentials  

- **Environment variables**
  Create matching `.env.example` files per app; key placeholders below represent shared conventions:
  ```
  DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public
  PORT=4000
  NODE_ENV=development
  ORIGIN=http://localhost:3000
  COOKIE_SECRET=replace-me
  SESSION_SECRET=replace-me
  SESSION_NAME=session
  SESSION_DOMAIN=localhost
  SESSION_MAX_AGE=86400000
  SESSION_HTTP_ONLY=true
  SESSION_SECURE=false
  SESSION_FOLDER=sessions
  SESSION_SAME_SITE=lax

  REDIS_URL=redis://localhost:6379
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=replace-me
  AWS_SECRET_ACCESS_KEY=replace-me
  AWS_BUCKET_NAME=sift-shop-assets
  AWS_CLOUDFRONT_URL=https://d123.cloudfront.net

  RESEND_API_KEY=key-xxxxxxxx
  RECAPTCHA_SECRET_KEY=replace-me
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=replace-me
  NEXT_PUBLIC_IMAGE_BASE_URL=https://d123.cloudfront.net
  NEXT_PUBLIC_NOVA_POST_API_KEY=replace-me
  NEXT_PUBLIC_PUSHER_KEY=replace-me
  NEXT_PUBLIC_PUSHER_CLUSTER=mt1
  NEXT_PUBLIC_SESSION_COOKIE_NAME=sift-shop
  SITE_URL=http://localhost:3000

  GOOGLE_CLIENT_ID=replace-me
  GOOGLE_CLIENT_SECRET=replace-me
  ```
- **Installation**
  1. `bun install` at the repo root to bootstrap all workspaces.  
  2. Configure PostgreSQL and set `DATABASE_URL`.  
  3. Run `bun workspace packages/database db push` (or `migrate`) to apply schema and seed data.  
  4. Ensure AWS/Resend credentials match the environment.

- **Running in development**
  - `bun workspace apps/api dev`
  - `bun workspace apps/admin-api dev`
  - `bun workspace apps/storefront dev`
  - `bun workspace apps/admin dev`
  Each app watches files and hot reloads via Bun’s `dev` script.

**Scripts**  
```
Script                      Description
--------------------------- -------------------------------------------------
bun install                 Install dependencies across Bun workspaces
bun workspace <pkg> dev     Start the development server for a specific app
bun workspace packages/database db push
                            Apply Prisma schema to PostgreSQL
bun workspace <pkg> lint    Run linters (configure per app if applicable)
bun workspace <pkg> test    Execute app-specific test suites (if defined)
```

**Environment Variables**  
- **Database**  
  - `DATABASE_URL`: Prisma-compatible connection string  
  - `REDIS_URL`: Cache/session store for rate limiting and session persistence  

- **Auth & Sessions**  
  - `COOKIE_SECRET`, `SESSION_SECRET`: Cryptographic secrets for express-session  
  - `SESSION_*`: Cookie behavior (name, domain, max age, httpOnly, secure, sameSite, storage folder)  
  - `NEXT_PUBLIC_SESSION_COOKIE_NAME`: Frontend cookie key for client interactions  

- **AWS & Media**  
  - `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: S3 credentials  
  - `AWS_BUCKET_NAME`: Bucket storing product/admin media  
  - `AWS_CLOUDFRONT_URL`: CDN base to serve uploaded assets  
  - S3 uploads use signed URLs; admin dashboard cleans up orphaned files  

- **Email & Notifications**  
  - `RESEND_API_KEY`: API key for Resend transactional emails (confirmations, invitations)  
  - `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`: Optional for real-time hooks  
  - `RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: CAPTCHA on checkout/admin forms  

- **OAuth**  
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: Google OAuth credentials for login callbacks  
  - `ORIGIN`: Allowed callback domain for OAuth flows  

**Deployment**  
Railway hosts each service—use Bun’s `bun workspace <pkg> start` script in the service definitions, supply `.env` via Railway variables (matching the environment section above), and point Cloudflare DNS to the deployed endpoints for storefront/admin assets.

**License**  
MIT
