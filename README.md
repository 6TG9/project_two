# My REST API (Node.js + Express + MongoDB)

## Overview
Small REST API demonstrating authentication (JWT), authorization (role-based), and CRUD for products.

## Tech
- Node.js, Express
- MongoDB (Mongoose)
- JWT for auth
- bcrypt for password hashing
- express-validator for request validation

## Setup
1. Clone repo
2. npm install
3. Add .env (see example)
4. npm run dev

## Endpoints
- POST /api/auth/register — register user
- POST /api/auth/login — login (returns JWT)
- GET /api/products — list products (public)
- GET /api/products/:id — get single product (public)
- POST /api/products — create product (admin only)
- PUT /api/products/:id — update product (admin only)
- DELETE /api/products/:id — delete product (admin only)

## Auth flow
- login returns JWT token with id and role. Include token in Authorization: Bearer <token> header for protected routes.
