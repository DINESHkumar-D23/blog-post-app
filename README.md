# ✍️ Blog Platform App

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-orange?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React+Vite-61DAFB?style=for-the-badge&logo=react)

The **Blog Platform App** is a modern, fully functional, and responsive blogging platform built using a microservices architecture. It delivers a seamless experience for users to create, read, manage, and interact with blog posts through an intuitive and elegant React-based frontend supported by a robust backend system. The application is designed to demonstrate the practical implementation and communication of microservices in a real-world environment. For testing and demonstration purposes, all platform features and services can be accessed through a single login, allowing users to explore the complete functionality of the system efficiently.

# What's This Project About?
This project is a full-stack, cloud-native blog platform built using a modern microservices architecture. It is designed to demonstrate how scalable and production-ready applications are developed and deployed using industry-standard technologies and DevOps practices.
The platform is developed with separate microservices for handling users, blog posts, and other core functionalities, all connected through an API Gateway for efficient communication and request management. The frontend is built with React to provide a fast, responsive, and modern user experience, while the backend services are powered by Node.js, Express, and PostgreSQL.
To showcase real-world deployment workflows, the application integrates Docker for containerization, GitHub Actions for CI/CD automation, and Google Cloud Run for cloud deployment. The project also includes monitoring and observability using Prometheus and Grafana, enabling performance tracking and system health monitoring in a production-like environment.

# Key Highlights
Microservices Architecture

API Gateway Integration
JWT Authentication & Authorization
React Frontend
Node.js + Express Backend Services
PostgreSQL Database
Docker Containerization
CI/CD with GitHub Actions
Google Cloud Run Deployment
Monitoring with Prometheus & Grafana

## NOTE
      The project is currently deployed in free using neon and render .

Scalable & Production-Ready Design
---

# Features
  # Authentication
       User Signup
       User Login
       JWT-based Authentication
       Protected Routes
  # Blog Management
       Create Posts
       View All Posts
       View Detailed Posts
       Delete Posts 
       Comment on Posts
  # Microservices
       User Service
       Post Service
       Comment Service
       API Gateway
  # Monitoring
       Prometheus Metrics
       Grafana Dashboards
  # Deployment
       Dockerized Services
       Google Cloud Run Deployment
       GitHub Actions CI/CD Pipeline
  # Tech Stack
       Frontend
            React js 
            claude AI
       Backend
            Node.js
            Express.js
            JWT
            PostgreSQL
       DevOps
            Docker
            Google Cloud Run
            GitHub Actions
            Prometheus
            Grafana
---

# Component Architecture

The backend is split into independently scalable services:

1. **`gateway/` (API Gateway):** The single entry point for the frontend. Handles routing requests to the appropriate microservices.
2. **`user_service/`:** Manages user registration, authentication, and profiles.
3. **`post_service/`:** Handles the creation, retrieval, and deletion of blog posts.
4. **`comment_service/`:** Manages user comments attached to specific posts.
5. **`ui/` (Frontend):** The React-based user interface that consumes the API Gateway.

---

# Quick Start (Frontend Only)

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


## ARCHITECTURE FLOW CHART
<img width="1536" height="1024" alt="ChatGPT Image May 26, 2026, 08_34_17 PM" src="https://github.com/user-attachments/assets/9137f18f-a579-43d8-abc3-7efe723dc2d6" />



*Built with ❤️ for the modern web.*
