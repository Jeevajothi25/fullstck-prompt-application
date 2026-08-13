# LearnHub - AI-assisted Development Instructions

This file explains how LearnHub was developed using AI-assisted development and how to run it.

Project Title: LearnHub

Objective: Build a simplified Udemy-style online learning platform for learning and demonstration.

Features:
- User sign up and login
- JWT authentication
- Protected dashboard and pages
- Course browsing and details

Tech Stack:
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs

Prerequisites:
- Node.js (16+)
- npm
- MongoDB instance (local or Atlas)

VS Code setup:
- Open the project folder in VS Code.
- Install recommended extensions such as ESLint, Prettier, and GitHub Copilot.

GitHub Copilot setup:
- Enable Copilot in VS Code and sign in with GitHub.

Project structure: see README.md

Frontend installation:
```
cd client
npm install
```

Backend installation:
```
cd server
npm install
```

MongoDB setup:
- Provide `MONGODB_URI` in a `.env` file at the project root.

Environment variables:
- Create `.env` with values copied from `.env.example`.

Running frontend:
```
cd client
npm run dev
```

Running backend:
```
cd server
npm run dev
```

API endpoints:
- POST /api/auth/signup - register user
- POST /api/auth/login - login and receive JWT
- GET /api/auth/me - get current user (requires Authorization header)

Sign Up process:
- User fills the signup form; frontend validates inputs.
- Frontend POSTs to `/api/auth/signup` with name, email and password.
- Backend hashes password and stores user.

Login process:
- User submits email and password.
- Backend verifies password and returns JWT.
- Frontend stores token in `localStorage` and fetches `/api/auth/me`.

JWT authentication:
- JWT is signed with `JWT_SECRET` from env.
- Protected routes require `Authorization: Bearer <token>`.

Protected dashboard:
- `/dashboard` and `/my-learning` are protected client routes.

Course browsing and details:
- Courses are currently from local dummy data in the frontend.

Logout:
- Clears token and redirects to `/login`.

Git commands:
```
git init
git add .
git commit -m "Initial LearnHub project setup"
```

Testing procedure:
- Start backend and frontend, then follow the test steps in the workshop README.

Common errors and solutions:
- MongoDB connection error: verify `MONGODB_URI` and network access.
- CORS issues: ensure backend is running and CORS enabled.
