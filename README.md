# 🚀 SIAQ Frontend Assignment

This is a **Role-Based Dashboard Application** built with **React + TypeScript + Vite**.
The project simulates a role-based access system where pages and actions depend on the user’s role.

---

## 📌 Features
- 🔑 **Authentication** with JSON files (users.json & clients.json).
- 🧭 **Role-Based Navigation** with protected routes.
- 📊 **Dashboard** shows dynamic statistics depending on the user role.
- 👥 **Users Management**:
  - Manager → view only
  - HR → can delete users
- 🏢 **Clients Management**:
  - Manager & Sales → can view and add new clients
- 📝 **Profile Editing**: update user `name` and `phone`.
- 🚫 **Not Authorized Page** for restricted routes.

---

## 🛠️ Tech Stack
- ⚡ **Vite** – build tool
- ⚛️ **React 18** – UI library
- 🟦 **TypeScript** – type safety
- 🛠️ **Redux Toolkit** – global state management
- 🌐 **React Router** – navigation
- 🎨 **Tailwind CSS** – styling
- 📋 **React Hook Form** – form handling

---

## 📂 Project Structure
```
src/
 ├── assets/         # Static assets (images)
 ├── components/     # Reusable UI components
 ├── constants/      # Constant values
 ├── context/        # Context providers (Auth, etc.)
 ├── hooks/          # Custom hooks
 ├── layout/         # Layout components (Sidebar, Header, Layout)
 ├── modules/        # Feature-based modules
 ├── pages/          # Pages (Login, Dashboard, Users, Clients, UserProfile, ErrorPage)
 ├── routes/         # Routing setup
 ├── store/          # Redux slices & store
 ├── types/          # TypeScript types
 ├── utils/          # Utility functions
 ├── App.tsx
 ├── index.css
 └── main.tsx
public/
 └── data/           # Dummy JSON data (users.json, clients.json)
```

---

## 🚀 Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/hebaeissa51/siaq-frontend-assignment
   cd siaq-frontend-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open in browser:
   ```
   http://localhost:5173
   ```

---

## 🔑 Example Credentials
From `users.json`:
- **Manager** → `manager@example.com` / `2354323`
- **HR** → `hr@example.com` / `7891234`
- **Sales** → `sales@example.com` / `9876543`

---

## 📎 Links
- 📂 GitHub Repo: https://github.com/hebaeissa51/siaq-frontend-assignment
- 🌐 Live Demo: https://zingy-chebakia-3cea03.netlify.app/

---

*Made with love using React, TypeScript and Vite.*