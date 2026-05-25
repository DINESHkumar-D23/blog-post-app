# Blog Platform Frontend - Setup & Documentation

## 🎉 Project Overview

This is a modern, fully-functional public blogging platform frontend built with React, React Router, and Axios. The application features public content viewing, user authentication, and protected routes for authenticated users.

## ✨ Features Implemented

### ✅ Public Features
- **Home Feed** - View all published posts in a responsive grid layout
- **Post Details** - Read full post content with comments
- **Beautiful UI** - Modern, gradient-based design with smooth animations
- **Responsive Design** - Mobile, tablet, and desktop optimized

### ✅ Authentication Features
- **User Registration (Signup)** - Create new account with username, email, and password
- **User Login** - Secure login with email and password
- **Token-based Auth** - JWT tokens stored in localStorage
- **Session Persistence** - Users remain logged in after page refresh

### ✅ Protected Features (Login Required)
- **Create Post** - Authenticated users can publish new posts
- **Protected Routes** - Automatic redirect to login for unauthorized access

### ✅ Navigation
- **Dynamic Navbar** - Shows different menu items based on authentication status
- **Mobile Menu** - Hamburger menu for mobile devices
- **Active Route Highlighting** - Current page is highlighted in navbar
- **Responsive Navigation** - Adapts to all screen sizes

### ✅ API Integration
- **Gateway Integration** - All API calls go through the Gateway service
- **Automatic Token Attachment** - Bearer tokens automatically added to requests
- **Error Handling** - Graceful handling of API errors and network issues
- **Interceptor-based Auth** - Automatic redirect on token expiration (401 errors)

## 📁 Project Structure

```
ui/src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with responsive menu
│   ├── PostCard.jsx        # Reusable post card component
│   └── ProtectedRoute.jsx  # Route protection wrapper
│
├── pages/
│   ├── Home.jsx            # Public feed page
│   ├── Login.jsx           # Login page
│   ├── Signup.jsx          # Registration page
│   ├── CreatePost.jsx      # Create new post (protected)
│   ├── PostDetails.jsx     # View single post with comments
│   ├── Posts.jsx           # (Legacy - can be deprecated)
│   └── Auth.css            # Auth pages styling
│
├── styles/
│   ├── navbar.css          # Navbar styling
│   ├── postcard.css        # Post card styling
│   └── home.css            # Home, create post, post details styling
│
├── api.js                  # Axios instance with interceptors
├── App.jsx                 # Main app with React Router
└── main.jsx               # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to UI directory**
   ```bash
   cd ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs:
   - react & react-dom (v18.2.0)
   - react-router-dom (v6.20.0)
   - axios (v1.6.0)
   - Vite & build tools

### Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at:
- **Local:** http://localhost:3000
- **Network:** http://[your-ip]:3000

### Production Build

Create an optimized production build:
```bash
npm run build
```

Output files are generated in the `dist/` directory.

### Preview Production Build

Preview the production build:
```bash
npm run preview
```

## 🔌 API Configuration

The frontend communicates with backend services through the Gateway.

### Gateway URL Configuration

**Current Gateway URL:**
```
https://gateway-311221747660.asia-south1.run.app
```

This is set in `src/api.js` and can be overridden with the `REACT_APP_API_URL` environment variable.

### Environment Variables

Create a `.env` file in the `ui/` directory (optional):
```
REACT_APP_API_URL=https://your-gateway-url
```

### API Endpoints Used

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Fetch all posts | No |
| GET | `/posts/:id` | Get single post | No |
| GET | `/posts/:id/comments` | Get post comments | No |
| POST | `/posts` | Create new post | Yes |
| DELETE | `/posts/:id` | Delete post | Yes |
| POST | `/login` | User login | No |
| POST | `/signup` | User registration | No |

## 🔐 Authentication Flow

### Login Process
1. User navigates to `/login`
2. Enters email and password
3. Frontend sends POST request to `/login`
4. Backend returns JWT token
5. Token stored in `localStorage` as `token`
6. User redirected to home page
7. Token automatically attached to all subsequent requests

### Logout Process
1. User clicks "Logout" in navbar
2. Token removed from `localStorage`
3. User redirected to home page
4. Navbar updates to show login/signup options

### Protected Routes
- `/create-post` requires authentication
- Unauthenticated users are automatically redirected to `/login`
- Protected routes use the `<ProtectedRoute>` component wrapper

## 🎨 Styling & Design

### Design System
- **Color Scheme:** Purple gradient (`#667eea` to `#764ba2`)
- **Modern UI:** Clean cards, smooth shadows, and animations
- **Responsive:** Mobile-first approach with breakpoints at 768px and 480px
- **Interactive:** Hover effects, loading states, and transitions

### CSS Files
- `App.css` - Global styles and utility classes
- `Auth.css` - Login/signup page styling
- `styles/navbar.css` - Navigation bar styling
- `styles/postcard.css` - Post card component styling
- `styles/home.css` - Home, create post, and post details pages

### Responsive Breakpoints
- **Desktop:** > 768px
- **Tablet:** 481px - 768px
- **Mobile:** ≤ 480px

## 🧪 Testing Checklist

### Authentication Testing
- ✅ Sign up with new account
- ✅ Login with valid credentials
- ✅ Login error with invalid credentials
- ✅ Logout functionality
- ✅ Token persists after page refresh
- ✅ Unauthorized access redirects to login

### Content Testing
- ✅ Public can view all posts
- ✅ Can navigate to single post view
- ✅ Comments display correctly
- ✅ Post details page shows complete content
- ✅ No posts message displays when empty

### Protected Routes Testing
- ✅ Unauthenticated users cannot access `/create-post`
- ✅ Authenticated users can create posts
- ✅ Post creation redirects to home after success
- ✅ All form validations work

### UI/UX Testing
- ✅ Navbar responsive on all devices
- ✅ Mobile menu opens/closes properly
- ✅ All links navigate correctly
- ✅ Loading states display properly
- ✅ Error messages appear on failures
- ✅ Success messages appear on actions

### API Integration Testing
- ✅ All requests use gateway URL
- ✅ Authorization header present in protected requests
- ✅ 401 errors trigger redirect to login
- ✅ Network errors handled gracefully

## 🔧 Troubleshooting

### Issue: "Cannot find module 'react-router-dom'"
**Solution:** Run `npm install react-router-dom`

### Issue: API returns 401 Unauthorized
**Solution:** Ensure token is stored in localStorage. Login again if needed.

### Issue: CORS errors in browser console
**Solution:** This is expected when calling gateway directly. The gateway handles CORS.

### Issue: Page doesn't load data
**Solution:** 
1. Check network tab in browser DevTools
2. Verify gateway URL is correct in `api.js`
3. Ensure backend services are running
4. Check browser console for errors

### Issue: Mobile menu doesn't work
**Solution:** Clear browser cache or do a hard refresh (Ctrl+Shift+R)

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Docker
The frontend can be containerized using the existing `Dockerfile`:
```bash
docker build -t blog-ui .
docker run -p 3000:3000 blog-ui
```

### Deploy to Cloud Run
```bash
gcloud run deploy blog-ui \
  --source . \
  --platform managed \
  --region asia-south1
```

## 📝 Notes

- The legacy `Posts.jsx` component (used in old single-page routing) is preserved but not used in the new Router-based setup
- All styling uses modern CSS (no CSS-in-JS libraries)
- The app uses React Hooks exclusively (no class components)
- Token-based authentication follows JWT standards
- All API communication goes through the Gateway as required

## 🤝 Contributing

When adding new features:
1. Create new components in `src/components/`
2. Create new pages in `src/pages/`
3. Add routes in `App.jsx`
4. Keep CSS in separate files in `src/styles/`
5. Follow the existing code style and structure
6. Ensure all routes are tested

## 📄 License

This project is part of the Blog Platform application.

---

**Version:** 2.0.0 (React Router)  
**Last Updated:** May 2026  
**Status:** Production Ready ✅
