A simple product management web app built with Next.js (TypeScript), MongoDB, and JWT authentication.
Users can sign up, log in, and manage pumpkins (create, edit, delete, list).

Features

🔐 Authentication with JWT (signup & login)

📦 CRUD operations on pumpkins

Tech Stack

Frontend & Backend: Next.js 14 (App Router) + TypeScript

Database: MongoDB (Mongoose)

Auth: JWT

Styling: Tailwind CSS

Getting Started
# Install dependencies
npm install

# Set up environment
cp .env.example .env    # add your MongoDB URI & JWT secret

# Run development server
npm run dev


Then open http://localhost:3000