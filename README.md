
---

# 🚀 NexaBuild

> A modern, full-stack developer portfolio built with scalable architecture, real-time integrations, and production-ready deployment.

🌐 **Live:** [https://nexabuild-abhishek-jatav.netlify.app/](https://nexabuild-abhishek-jatav.netlify.app/)
📂 **Repository:** [https://github.com/Abhishek-Jatav/dynamic-portfolio](https://github.com/Abhishek-Jatav/dynamic-portfolio)
🚀 **Demo:** 

---

## ✨ Overview

**NexaBuild** is a dynamic, production-ready portfolio platform built using:

* ⚡ **Frontend:** Next.js (App Router)
* 🛠 **Backend:** NestJS
* 🗄 **Database:** MongoDB
* 🔐 **Authentication:** JWT
* 🚀 **Deployment:** Netlify (Frontend) + Render (Backend)

It showcases projects, coding profiles, and dynamic content — all managed via a secure admin panel.

---

## 🧠 Architecture Flow

```text
Client (Next.js)
        ↓
Backend API (NestJS on Render)
        ↓
MongoDB / External APIs (GitHub, LeetCode, YouTube)
```

### 🔄 Data Flow Strategy

* Backend decides whether to:

  * Fetch from MongoDB
  * Or call external APIs directly
* Frontend only communicates with backend
* Clean separation of concerns
* Scalable & production-safe architecture

---

## 🎯 Core Features

### 🖥 Portfolio Showcase

* Display projects dynamically
* Admin can:

  * ➕ Create
  * ✏ Update
  * ❌ Delete projects

---

### 🔐 Admin Panel (JWT Secured)

* Secure login
* Token-based authentication
* Protected routes
* CRUD operations for portfolio content

---

### 📹 Introduction Video

* YouTube video embedded dynamically
* Managed via backend
* Easily updatable

---

### 📊 Real-Time Coding Stats

#### 🔹 GitHub Integration

* Fetches live GitHub data
* Always updated
* Displays:

  * Repositories
  * Followers
  * Contributions

#### 🔹 LeetCode Integration

* Fetches real-time LeetCode stats
* Auto-updated from API

---

### 📩 Smart Contact System

* Public contact form
* Rate limited:

  * Maximum **10 responses per day**
* Prevents spam & fake attacks
* Backend validation included

---

### 🎮 Render Cold Start Solution

Since the backend is hosted on **Render (Free Tier)**:

* Server sleeps after 15 minutes of inactivity
* During cold start:

  * Visitors can enjoy a small interactive game 🎮
* Improves user experience during wake-up time

---

## 📁 Project Structure

```
dynamic-portfolio/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── contact/
│   │   ├── github/
│   │   ├── hero-image/
│   │   ├── leetcode/
│   │   ├── projects/
│   │   └── videos/
│   │
│   └── test/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── common/
│   │   ├── contact/
│   │   ├── github/
│   │   ├── leetcode/
│   │   ├── projects/
│   │   └── videos/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── context/
│   │   └── types/
│   └── public/
│
└── README.md
```

---

## 🛠 Tech Stack

### Frontend

* Next.js
* TypeScript
* React Hooks
* Context API

### Backend

* NestJS
* MongoDB
* JWT Authentication
* REST API

### DevOps & Deployment

* Netlify (Frontend)
* Render (Backend)
* GitHub CI Flow

---

## 🔐 Security Measures

* JWT-based authentication
* Route guards (Backend)
* Rate-limiting on contact API
* Controlled CORS
* Backend-first data validation

---

## 📦 Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhishek-Jatav/dynamic-portfolio.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

Create `.env`:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Add environment variable:

```
NEXT_PUBLIC_BACKEND_URL=your_backend_url
```

---

## 🌟 What Makes NexaBuild Different?

* Clean architecture (Frontend ↔ Backend separation)
* Production-ready folder structure
* Rate-limited public APIs
* Live GitHub & LeetCode integration
* Admin-controlled dynamic content
* Cold-start UX handling
* Fully deployable & scalable

---

## 📈 Future Improvements

* Redis caching for external APIs
* Role-based access (Super Admin)
* Analytics dashboard
* Dockerization
* CI/CD pipeline
* Server-side caching layer

---

## 👨‍💻 Author

**Abhishek Jatav**

* GitHub: [https://github.com/Abhishek-Jatav](https://github.com/Abhishek-Jatav)
* Portfolio: [https://nexabuild-abhishek-jatav.netlify.app/](https://nexabuild-abhishek-jatav.netlify.app/)
* Demo : 

---

## 🏆 Final Note

NexaBuild is not just a portfolio —
It’s a **full-stack production-grade system** designed with scalability, security, and real-world deployment challenges in mind.

---