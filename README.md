🚀 TechStore – Modern E-Commerce Frontend
React • Vite • MUI • Role-Based UI • Optimistic Updates • Production-Oriented Architecture

A production-ready E-Commerce Frontend built using React 18 + Vite + Material UI, connected to a secure backend with JWT authentication and refresh token rotation.

Designed with scalability, clean architecture, protected routes, and real-world UX patterns.

🌍 Live Backend API

Connected to:

https://e-commerce-project-backend-ib6m.onrender.com/api
🛠 Tech Stack

⚛ React 18

⚡ Vite

🎨 Material UI (MUI v5)

🔐 JWT Authentication

🔁 Refresh Token Handling

🧭 React Router v6

🧠 Context API (Global Auth State)

🔥 React Hot Toast

🎯 Lazy Loading (Code Splitting)

⚡ Optimistic UI Updates

🏗 Architecture Overview

The project follows a clean, modular structure:

components/
context/
pages/
services/
theme.js
Folder Philosophy

components/ → Reusable UI components + Route Guards

context/ → Global authentication state management

pages/ → Feature-based page structure

services/ → API abstraction layer

theme.js → Centralized UI configuration

Separation of concerns is strictly applied.

🔐 Authentication & Authorization Flow

The frontend fully integrates with secure backend authentication.

✅ Login Flow

Sends credentials to /auth/login

Stores:

accessToken

refreshToken

role

Updates global Auth Context

✅ Auto Token Injection

All requests use a central API client:

Authorization: Bearer accessToken

No repeated logic across components.

✅ Refresh Token Strategy

If access token expires:

Calls /auth/refresh

Receives new access token

Updates stored tokens

Updates user context

Implements token rotation compatibility.

✅ Route Protection
🔒 ProtectedRoute

Blocks unauthenticated users.

👑 AdminRoute

Blocks non-admin users.

Real role-based UI rendering, not just backend enforcement.

🎨 UI & UX Engineering
🌗 Forced Light Mode

Prevents system dark-mode override:

palette: { mode: "light" }

CSS Baseline override:

html: { colorScheme: "light" }

Ensures consistent UI across devices.

⚡ Optimistic UI Updates

Used in:

🛒 Cart Operations

Instant quantity update

Immediate remove item

Sync fallback on failure

🧾 Admin Order Status Change

UI updates before API confirmation

Rolls back if API fails

🗑 Order Deletion

Immediate removal from table

Server sync confirmation

This mimics real production UX behavior.

🛍 Core Features
🏠 Home Page

Hero section

Product grid

Responsive layout

Skeleton loading

Image fallback handling

Stock-aware Add To Cart

Toast notifications

🔐 Authentication Pages
Login

Loading states

Error handling

Token storage

Role detection

Register

Validation

Success redirect

Clean UI design

🛒 Cart System

Fetch current cart

Increase / decrease quantity

Remove items

Real-time total calculation

Prevent exceeding stock

Checkout integration

Confirmation dialogs

Cart updates are optimistic.

📦 Order Tracking (User Side)

View personal orders

Order details dialog

Status indicators

Cancel pending orders

Responsive card layout

Order statuses:

pending
shipped
delivered
👑 Admin Panel – Business Control Center

Accessible only for users with admin role.

📊 Admin Dashboard

Displays real-time business metrics:

📦 Total Products

🧾 Total Orders

💰 Total Revenue

Revenue calculated dynamically:

const totalRevenue = orders.reduce(
  (sum, o) => sum + (o.totalPrice || 0),
  0
);
UI Highlights

Gradient statistic cards

Responsive grid

Clean typography

Business monitoring interface

This simulates real admin dashboards used in SaaS products.

📦 Products Management

Create product

Update product

Delete product

Inline editing support

Real-time state updates

Connected to secure backend

🧾 Orders Management

Advanced order lifecycle control.

Table Columns:

Order ID

Customer Email

Ordered Items (formatted with quantity)

Total Price

Status (Chip indicator)

Creation Date

Actions

🔄 Status Flow Logic

Order status cycles:

pending → shipped → delivered

Implemented with controlled status flow array:

const flow = ["pending", "shipped", "delivered"];

Optimistic status updates applied before API confirmation.

🗑 Order Deletion

Confirmation dialog

Optimistic removal

Fallback re-fetch on failure

📊 Performance Optimizations

Lazy loading for major pages

Minimal re-renders

API abstraction layer

Centralized state management

Conditional rendering

Responsive layout system

🧠 Production-Level Decisions

✔ Clean separation of UI & API logic
✔ Role-based route guarding
✔ Optimistic UX pattern
✔ Token refresh handling
✔ Scalable folder structure
✔ Centralized theme configuration
✔ Business dashboard logic
✔ Error fallback strategies

📁 Project Structure Example
src/
  components/
  context/
  pages/
    AdminDashboard.jsx
    AdminOrders.jsx
    Home.jsx
    Cart.jsx
  services/
    authService.js
    productService.js
    orderService.js
  theme.js
  App.jsx
🚀 Installation
npm install
npm run dev
🔮 Future Improvements

Payment integration (Stripe)

Image upload (Cloudinary)

Advanced filtering

Pagination UI

Charts in admin dashboard

Dark mode toggle

Redux Toolkit migration (if scaling)

Unit & integration tests

👨‍💻 Author

Hassan mohamed gamal– Full Stack Developer / mern stack
Focused on building secure, scalable, production-ready systems.
