# React UI Integration - Setup Guide

## ✅ What's Created

Your React UI is now ready! Here's what's included:

### 📁 File Structure
```
ui/
├── src/
│   ├── pages/
│   │   ├── Login.jsx        # Login authentication
│   │   ├── Signup.jsx       # User registration
│   │   ├── Posts.jsx        # Blog posts dashboard
│   │   ├── Auth.css         # Auth styling
│   │   └── Posts.css        # Dashboard styling
│   ├── App.jsx              # Main component with routing
│   ├── App.css              # Global styles
│   ├── api.js               # Axios API client
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── package.json
├── Dockerfile
├── .env                      # Local environment
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Development)

### Step 1: Install Dependencies

```bash
cd ui
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will run at `http://localhost:3000`

### Step 3: Update API URL (if needed)

Edit `ui/.env`:

```env
VITE_API_URL=http://localhost:8080
```

---

## 📱 Features Included

### ✔️ Login Page
- Email & password login
- JWT token stored in localStorage
- Error handling
- Link to signup

### ✔️ Signup Page
- Username, email, password registration
- Success feedback
- Auto-redirect to login
- Link to login

### ✔️ Posts Dashboard
- Create new posts (title + content)
- View all posts with author & timestamp
- Delete posts (with confirmation)
- Logout button
- Clean card-based layout

### ✔️ API Integration
- Auto JWT token injection in headers
- Auto-logout on 401
- Error handling
- Axios interceptors

---

## 🐳 Docker Deployment

### Option 1: Local Docker (with docker-compose)

```bash
# From project root
docker-compose up -d
```

Services will run at:
- **Gateway**: http://localhost:5000
- **UI**: http://localhost:3001
- **Postgres**: localhost:5432
- **Redis**: localhost:6379

### Option 2: Build UI Only

```bash
cd ui
docker build -t blog-ui .
docker run -p 3000:3000 -e VITE_API_URL=http://localhost:8080 blog-ui
```

---

## 🌐 Cloud Deployment (Cloud Run)

### Step 1: Build & Push Image

```bash
# Authenticate with GCP
gcloud auth configure-docker

# Build image
docker build -t gcr.io/PROJECT_ID/blog-ui:latest ui/

# Push to Google Container Registry
docker push gcr.io/PROJECT_ID/blog-ui:latest
```

### Step 2: Deploy to Cloud Run

```bash
gcloud run deploy blog-ui \
  --image gcr.io/PROJECT_ID/blog-ui:latest \
  --platform managed \
  --region asia-south1 \
  --port 3000 \
  --allow-unauthenticated \
  --set-env-vars VITE_API_URL=https://your-gateway-url.run.app
```

### Step 3: Access Your App

```
https://blog-ui-xxxxx.run.app
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Gateway API URL | `http://localhost:8080` |

### For Production

Update gateway URL in `.env`:

```env
VITE_API_URL=https://gateway-xxxxx.run.app
```

---

## 📊 API Endpoints Used

Your UI connects to these gateway endpoints:

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/signup` | No | User registration |
| POST | `/login` | No | User login (returns JWT) |
| GET | `/posts` | No | Fetch all posts |
| POST | `/posts` | Yes | Create new post |
| DELETE | `/posts/:id` | Yes | Delete post |

---

## 🎨 UI Components

### Login Component (`Login.jsx`)
- Email/password inputs
- Form validation
- Error display
- Loading state

### Signup Component (`Signup.jsx`)
- Username/email/password inputs
- Success message
- Auto-redirect

### Posts Component (`Posts.jsx`)
- Post creation form
- Post grid layout
- Delete functionality
- Logout button

---

## 🛠️ Development Commands

```bash
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# List installed dependencies
npm list
```

---

## 🔐 Security Notes

- JWT token stored in `localStorage` (vulnerable to XSS - use httpOnly in production)
- API calls include Authorization header automatically
- 401 responses trigger logout
- CORS handled by gateway

---

## 📝 Next Steps

1. **Test locally**:
   ```bash
   npm run dev
   ```

2. **Create account** → Click "Sign Up"

3. **Login** → Use credentials you created

4. **Create posts** → Add blog content

5. **View posts** → Dashboard shows all posts

6. **Delete posts** → Click delete button

---

## ⚠️ Troubleshooting

### API not connecting?
- Check `VITE_API_URL` in `.env`
- Ensure gateway is running: `http://localhost:8080/health`
- Check browser console for CORS errors

### Build fails?
- Delete `node_modules` and `.lock` files
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Styles not loading?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

---

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Axios Docs](https://axios-http.com)

---

## ✨ Summary

You now have a **production-ready React UI** that:
- ✅ Connects to your microservices
- ✅ Handles authentication
- ✅ Performs CRUD operations
- ✅ Runs in Docker
- ✅ Deploys to Cloud Run
- ✅ Has clean, responsive design

**Frontend is intentionally minimal. Focus is on microservices, API gateway, and deployment.**

---

Good luck! 🚀
