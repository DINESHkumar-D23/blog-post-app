# Blog UI - React Frontend

A minimal React UI built with Vite to showcase the Blog Post microservices backend.

## Features

- **Login & Signup** - User authentication with JWT
- **Posts Dashboard** - View, create, and delete blog posts
- **Clean UI** - Simple, responsive design
- **API Integration** - Connected to API Gateway

## Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Configuration

Set the API gateway URL in `.env`:

```
VITE_API_URL=http://localhost:8080
```

For production (Cloud Run):

```
VITE_API_URL=https://your-gateway-url.run.app
```

## Project Structure

```
ui/
├── src/
│   ├── pages/
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Signup page
│   │   ├── Posts.jsx        # Posts dashboard
│   │   ├── Auth.css         # Auth pages styling
│   │   └── Posts.css        # Posts page styling
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── api.js               # Axios API configuration
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── Dockerfile               # Docker build file
```

## API Endpoints Used

- `POST /signup` - User registration
- `POST /login` - User login (returns JWT)
- `GET /posts` - Fetch all posts
- `POST /posts` - Create new post (requires JWT)
- `DELETE /posts/:id` - Delete post (requires JWT)

## Build & Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Docker build
docker build -t blog-ui .
docker run -p 3000:3000 blog-ui
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_URL | http://localhost:8080 | API Gateway URL |

## Deployment

### Vercel
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Docker (Cloud Run)
```bash
docker build -t blog-ui .
docker tag blog-ui gcr.io/PROJECT_ID/blog-ui
docker push gcr.io/PROJECT_ID/blog-ui
gcloud run deploy blog-ui --image gcr.io/PROJECT_ID/blog-ui --platform managed --region asia-south1
```

## Tech Stack

- **React** 18.2.0 - UI framework
- **Vite** 5.0.0 - Build tool
- **Axios** 1.6.0 - HTTP client
- **CSS3** - Styling (no CSS framework)

## Notes

- No state management library (Redux) - kept minimal
- LocalStorage for JWT token persistence
- Auto-logout on 401 response
- Clean, semantic CSS with no external dependencies
