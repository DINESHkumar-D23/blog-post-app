# ✍️ Blog Platform App

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-orange?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React+Vite-61DAFB?style=for-the-badge&logo=react)

Welcome to the **Blog Platform App**! 🚀 This is a modern, fully-functional, and responsive blogging platform built with a microservices architecture. It provides a seamless experience for users to read, create, and interact with blog posts, powered by a robust backend and an elegant React frontend.

## 📖 What's This Project About?

This application is designed to be a complete blogging ecosystem. Whether you're an avid reader looking for interesting content or a writer eager to share your thoughts with the world, this platform caters to you. 

We've built this with scalability and maintainability in mind, separating concerns into distinct microservices (Users, Posts, Comments) communicating through an API Gateway, all served to a lightning-fast React frontend.

## ✨ Key Features

### For Everyone 🌍
- **Public Home Feed:** Browse all the latest posts in a beautifully responsive grid layout.
- **Rich Post Details:** Dive deep into individual posts and read what authors have to say.
- **Interactive Comments:** Read what others are discussing on every post.

### For Registered Users 🔐
- **Seamless Authentication:** Secure Signup and Login flows using JWT tokens.
- **Publish Your Voice:** Create and publish your own blog posts.
- **Session Management:** Your login persists safely across page refreshes.
- **Protected Routes:** Keep your account and publishing tools secure.

### Under the Hood 🛠️
- **Microservices Architecture:** Independent scaling and deployment of User, Post, and Comment services.
- **API Gateway:** Centralized routing and rate-limiting.
- **Monitoring:** Integrated Prometheus metrics for health and performance tracking.

---

## 💻 Tech Stack & Skills Demonstrated

### Frontend (UI)
- **Framework:** React 18
- **Routing:** React Router DOM v6
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Styling:** Custom Vanilla CSS3 (Fully Responsive)

### Backend Services
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (`pg` library)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt for secure password hashing
- **Validation:** Joi

### DevOps & Infrastructure
- **Containerization:** Docker & Docker Compose
- **Monitoring:** Prometheus (`prom-client`) & Winston logger
- **Deployment:** Render (`render.yaml`)

---

## 🧩 Component Architecture

The backend is split into independently scalable services:

1. **`gateway/` (API Gateway):** The single entry point for the frontend. Handles routing requests to the appropriate microservices.
2. **`user_service/`:** Manages user registration, authentication, and profiles.
3. **`post_service/`:** Handles the creation, retrieval, and deletion of blog posts.
4. **`comment_service/`:** Manages user comments attached to specific posts.
5. **`ui/` (Frontend):** The React-based user interface that consumes the API Gateway.

---

## 🚀 Getting Started

Want to run this locally? It's easy!

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Docker](https://www.docker.com/) & Docker Compose (if you want to spin up the whole stack easily)

### Quick Start (Frontend Only)

If you just want to run the UI against the deployed backend:

```bash
# 1. Navigate to the UI directory
cd ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
*Visit `http://localhost:3000` to see the app in action!*

### Running the Full Stack Locally

To spin up all microservices, databases, and the UI:

```bash
# Start everything using Docker Compose
docker-compose up --build
```

---

## 📚 Documentation Index

We believe in great documentation. Check out our detailed guides located in the project root:

- 🏎️ [**QUICK_START.md**](./QUICK_START.md) - A rapid 2-minute setup guide.
- 🎨 [**FRONTEND_DOCUMENTATION.md**](./FRONTEND_DOCUMENTATION.md) - Comprehensive guide on the React UI.
- 🧪 [**TESTING_GUIDE.md**](./TESTING_GUIDE.md) - Complete testing procedures (100+ cases).
- 🔌 [**API_INTEGRATION_GUIDE.md**](./API_INTEGRATION_GUIDE.md) - Everything you need to know about our endpoints.
- 🏗️ [**COMPONENT_ARCHITECTURE.md**](./COMPONENT_ARCHITECTURE.md) - Deep dive into our component design and data flow.
- 🏁 [**PROJECT_COMPLETION_SUMMARY.md**](./PROJECT_COMPLETION_SUMMARY.md) - A breakdown of what was built, metrics, and before/after comparisons.

---

## 🤝 Contributing

We love contributions! Feel free to open an issue if you spot a bug or submit a pull request if you have an improvement.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Built with ❤️ for the modern web.*
