# 🎃 Pumpkin Products

A mini app to manage pumpkins (and other cucurbits), built with **Next.js 14 + TypeScript**, **Prisma (SQLite)**, and **TailwindCSS**.  
It includes authentication (JWT in HttpOnly cookies) and full CRUD for products.

---

## Features
- User authentication (signup/login/logout)
- Protected routes (only logged-in users can manage pumpkins)
- CRUD for products

---

## Tech Stack
- [Next.js](https://nextjs.org/) 14 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) + SQLite
- [TailwindCSS](https://tailwindcss.com/)

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/pumpkin-products.git
cd pumpkin-products

# 2. Install dependencies
npm install

# 3. Copy .env example and set your values
cp .env.example .env

# 4. Initialize database
npx prisma migrate dev --name init

# 5. Run the dev server
npm run dev
