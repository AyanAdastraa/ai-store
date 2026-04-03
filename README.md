# ARCHIVE | AI-Powered Digital Asset Store

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Prisma](https://img.shields.io/badge/Prisma-5.13-blue)
![Gemini](https://img.shields.io/badge/Google_Gemini-2.5-orange)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan)

## Overview
**ARCHIVE** is a premium, agency-quality e-commerce platform that replaces static checkout carts with **Live AI Negotiation**. Users interface seamlessly with an autonomous concierage powered by Google Gemini 2.5 Flash to barter for prices based on market parameters, inventory data, and user interaction history.

## Architecture Ecosystem
- **Framework**: Next.js 14 App Router (React Server Components + Server Actions)
- **Database**: Prisma ORM (SQLite `dev.db` for rapid local offline prototyping)
- **Authentication**: NextAuth (Auth.js) securely handling Google Provider Sessions
- **AI Brain**: `@google/generative-ai` processing strict JSON system bounds over conversational history logic

## Core Feature Suite
1. **Adaptive AI Pricing Engine**: A sophisticated LLM endpoint (`/api/chat`) strips out markdown artifacts, generates JSON price limits, and counters user offers realistically on the fly.
2. **Persistent Tracking**: The schema is armed with a `NegotiationLog` tracker. Every haggle, every counter, and every deal is permanently stored linearly to the user's secure account ID.
3. **Glassmorphism Interface**: Constructed with pristine OKLCH variables, cinematic framer-motion micro-interactions, `mix-blend-difference` bespoke cursors, and neural grid backgrounds.
4. **Resiliency Protocols**: Global `/error.tsx` catches fatal app breaks dynamically and allows secure re-initialization. `/loading.tsx` manages skeleton drops effortlessly.

## Local Setup Instructions
To run this offline to bypass network firewalls, follow this specific pathway:

```bash
# 1. Install Dependencies
npm install

# 2. Push Database Schema to Local File
npx prisma db push
npx prisma generate

# 3. Seed Mock Products 
# Start your local server first!
npm run dev
curl -X POST http://localhost:3000/api/seed

# 4. Open Application
http://localhost:3000
```

## Vercel Deployment Safety Note
If deploying to Vercel, ensure you bind a hosted Database (like Vercel Postgres or MongoDB) to your `DATABASE_URL` environment variable. Cloud environments are ephemeral by nature and automatically discard files like SQLite `dev.db` after execution. We've equipped `package.json` with a `postinstall: prisma generate` command to safeguard your remote builds.
