# 📋 Blog Platform Frontend - Command Reference

## 🚀 Essential Commands

### Development
```bash
# Navigate to UI directory
cd ui

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev
# Open: http://localhost:3000

# Stop server
# Press: Ctrl + C
```

### Production
```bash
# Build for production
npm run build
# Creates optimized files in dist/

# Preview production build locally
npm run preview
# Open: http://localhost:4173
```

### Maintenance
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest

# Fix security vulnerabilities
npm audit fix

# Clean installation
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Important Files

### Configuration
```
ui/package.json             # Dependencies and scripts
ui/vite.config.js           # Build configuration
ui/index.html               # HTML entry point
```

### Main App Files
```
ui/src/App.jsx              # Router and main layout
ui/src/main.jsx             # React entry point
ui/src/api.js               # API client (GATEWAY URL HERE!)
ui/src/App.css              # Global styles
```

### Components
```
ui/src/components/Navbar.jsx           # Navigation bar
ui/src/components/PostCard.jsx         # Post preview card
ui/src/components/ProtectedRoute.jsx   # Route guard
```

### Pages
```
ui/src/pages/Home.jsx                  # Public feed
ui/src/pages/Login.jsx                 # Login form
ui/src/pages/Signup.jsx                # Registration form
ui/src/pages/CreatePost.jsx            # Create post form
ui/src/pages/PostDetails.jsx           # View single post
```

### Styles
```
ui/src/pages/Auth.css              # Login/Signup styles
ui/src/styles/navbar.css           # Navbar styles
ui/src/styles/postcard.css         # Post card styles
ui/src/styles/home.css             # Home/Create/Details styles
```

### Documentation
```
QUICK_START.md                      # 2-minute setup
FRONTEND_DOCUMENTATION.md           # Comprehensive guide
TESTING_GUIDE.md                    # Test procedures
API_INTEGRATION_GUIDE.md            # API reference
COMPONENT_ARCHITECTURE.md           # Code structure
PROJECT_COMPLETION_SUMMARY.md       # Project overview
```

---

## 🔧 Configuration

### Gateway URL (Change if needed)
**File:** `ui/src/api.js`

```javascript
const API_BASE_URL = "https://gateway-311221747660.asia-south1.run.app";
```

### Environment Variables (Optional)
**File:** `ui/.env` (create if doesn't exist)

```
REACT_APP_API_URL=https://your-gateway-url
```

### Port Configuration (Change if needed)
**File:** `ui/vite.config.js`

```javascript
server: {
  port: 3000,  // Change this
  host: '0.0.0.0'
}
```

---

## 📊 Port Reference

| Service | Port | URL |
|---------|------|-----|
| Dev Server | 3000 | http://localhost:3000 |
| Production Preview | 4173 | http://localhost:4173 |
| Backend (example) | 8080 | http://localhost:8080 |
| Gateway (production) | https | https://gateway-311221747660... |

---

## 🧪 Quick Testing

### Test Public Access
```bash
npm run dev
# Visit http://localhost:3000
# Should see blog posts
```

### Test Signup
```
1. Click "Sign Up"
2. Fill form with new account
3. Should redirect to login
```

### Test Login
```
1. Click "Login"
2. Enter credentials
3. Should redirect to home
4. Navbar should show "Create Post"
```

### Test Create Post
```
1. While logged in, click "Create Post"
2. Fill title and content
3. Click "Publish Post"
4. Should appear in feed
```

### Test Session Persistence
```
1. Login
2. Press F5 (refresh)
3. Should still be logged in
```

---

## 📱 Device Testing

### Responsive Design
```
Desktop: > 1024px
Tablet: 768px
Mobile: 375px
```

### Using DevTools
```
F12                          # Open DevTools
Ctrl+Shift+M                 # Toggle device toolbar
Ctrl+Shift+C                 # Inspect element
Ctrl+K                       # Open search/filter
```

### Test Checklist
- [ ] Desktop layout (> 768px)
- [ ] Tablet layout (768px)
- [ ] Mobile layout (< 480px)
- [ ] All buttons clickable
- [ ] No horizontal scroll
- [ ] Navbar responsive

---

## 🔍 Debugging

### Check Token
```javascript
// In browser console (F12)
localStorage.getItem('token')
// Returns token or null
```

### Clear All Data
```javascript
// In browser console (F12)
localStorage.clear()
// Clears all stored data
```

### Check Current Page
```javascript
// In browser console (F12)
window.location.pathname
// Returns current route
```

### Check Console for Errors
```
F12 → Console tab
Look for red error messages
```

### Check Network Requests
```
F12 → Network tab
Perform action
Check requests and responses
```

---

## 📦 Build Process

### 1. Development Build
```bash
npm run dev
```
**Output:** Unminified, with source maps, hot reload

### 2. Production Build
```bash
npm run build
```
**Output:** 
- `dist/index.html` (minified)
- `dist/assets/index-*.js` (minified)
- `dist/assets/index-*.css` (minified)

### 3. Build Size
- JavaScript: ~220 KB
- CSS: ~14 KB
- Total: ~234 KB

### 4. Optimize Further
- Remove unused dependencies
- Add image optimization
- Implement code splitting
- Compress assets

---

## 🐛 Troubleshooting

### Problem: Port Already in Use
```bash
# Find what's using the port (Mac/Linux)
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in vite.config.js
```

### Problem: Dependencies Not Installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: API Not Working
```
1. Check gateway URL in api.js
2. Check gateway is running
3. Check DevTools Network tab
4. Check for CORS errors
5. Check backend services running
```

### Problem: Token Issues
```
1. Clear localStorage
2. Login again
3. Check DevTools Application tab
4. Verify token format
```

### Problem: Build Fails
```bash
# Try clean build
npm install
npm run build

# Check for TypeScript/syntax errors
npm run dev
# Look for errors in console
```

---

## 📊 Project Statistics

```
Build Time:        2.91 seconds
Bundle Size:       219.39 KB
CSS Size:          14.08 KB
Modules:           99 transformed
Lines of Code:     1,800+
Components:        9
Routes:            5
API Endpoints:     7
Documentation:     5 files
```

---

## ✅ Pre-Deployment Checklist

- [ ] Run `npm run build` - Build succeeds
- [ ] Run tests in TESTING_GUIDE.md - All pass
- [ ] Check console - No errors
- [ ] Check Network tab - All requests use gateway
- [ ] Test on mobile - Responsive
- [ ] Test auth flow - Login/logout works
- [ ] Test protected routes - Redirect works
- [ ] Check .env file - Correct gateway URL
- [ ] Run `npm audit` - Fix vulnerabilities
- [ ] Test on multiple browsers - Works everywhere

---

## 🚀 Deployment Steps

### Option 1: Local Testing
```bash
npm run build
npm run preview
# Test at http://localhost:4173
```

### Option 2: Docker
```bash
docker build -t blog-ui .
docker run -p 3000:3000 blog-ui
```

### Option 3: Cloud Run
```bash
gcloud run deploy blog-ui \
  --source . \
  --platform managed \
  --region asia-south1
```

### Option 4: Static Hosting (Netlify/Vercel)
```bash
# Just upload dist/ folder
# Set deployment command to: npm run build
# Set public folder to: dist/
```

---

## 📚 Documentation Quick Links

| Guide | Size | Time | Purpose |
|-------|------|------|---------|
| QUICK_START.md | 2 KB | 2 min | Get started |
| FRONTEND_DOCUMENTATION.md | 20 KB | 10 min | Complete guide |
| TESTING_GUIDE.md | 30 KB | 20 min | Test everything |
| API_INTEGRATION_GUIDE.md | 25 KB | 15 min | API reference |
| COMPONENT_ARCHITECTURE.md | 25 KB | 20 min | Code structure |

---

## 🎯 Common Tasks

### Add New Page
```
1. Create file: src/pages/NewPage.jsx
2. Add route in App.jsx
3. Import in App.jsx
4. Test the route
```

### Add New Component
```
1. Create file: src/components/NewComponent.jsx
2. Create CSS file: src/styles/newcomponent.css
3. Import CSS in component
4. Use in pages
```

### Change Theme Color
```
1. Edit src/App.css
2. Search for #667eea and #764ba2
3. Replace with new colors
4. Update all component CSS files
```

### Change API URL
```
1. Edit src/api.js
2. Change API_BASE_URL value
3. Test API calls
```

---

## 🔐 Security Reminder

- ✅ Never commit .env file with secrets
- ✅ Use HTTPS for all API calls
- ✅ Store tokens securely
- ✅ Validate all user input
- ✅ Don't trust client-side validation
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated

---

## 📞 Quick Support

### Need help?
1. Check relevant documentation file
2. Search in TESTING_GUIDE.md
3. Look at browser console for errors
4. Check DevTools Network tab
5. Search in existing code for examples

### Documentation Files Order:
1. Start with: **QUICK_START.md**
2. Then read: **FRONTEND_DOCUMENTATION.md**
3. For testing: **TESTING_GUIDE.md**
4. For API: **API_INTEGRATION_GUIDE.md**
5. For code: **COMPONENT_ARCHITECTURE.md**

---

## 🎉 Final Steps

```bash
# 1. Navigate to ui folder
cd ui

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit: http://localhost:3000

# 5. Test the app
# See TESTING_GUIDE.md for procedures

# 6. Build for production
npm run build

# 7. Deploy
# Choose: Docker, Cloud Run, Netlify, etc.
```

**That's it! 🚀 Your blog platform is ready!**

---

**Version:** 2.0.0  
**Last Updated:** May 2026  
**Status:** Production Ready ✅
