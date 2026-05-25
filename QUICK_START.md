# 🚀 Blog Platform Frontend - Quick Start Guide

## ⚡ 2-Minute Quick Start

### 1. Install & Run
```bash
cd ui
npm install
npm run dev
```

Open **http://localhost:3000** 🎉

---

## 🎯 What You Can Do

### Public Users Can:
- 👀 View all blog posts
- 📖 Read individual posts
- 💬 View comments on posts
- 📱 Access on any device (mobile, tablet, desktop)

### Logged-In Users Can:
- ✍️ Create new blog posts
- 🚪 Logout when done

---

## 📋 Quick Test Flow

1. **Visit Home** → See posts list
2. **Click "Sign Up"** → Create new account
3. **Click "Login"** → Login with your account
4. **Click "Create Post"** → Write and publish a post
5. **View Posts** → See your new post on home page
6. **Click Post** → Read full content
7. **Logout** → See protected routes redirect to login

---

## 🔧 File Structure

```
ui/
├── src/
│   ├── components/     (Navbar, PostCard, ProtectedRoute)
│   ├── pages/          (Home, Login, Signup, CreatePost, PostDetails)
│   ├── styles/         (CSS files)
│   ├── App.jsx         (Router setup)
│   └── api.js          (API client)
├── package.json        (Dependencies)
└── vite.config.js      (Build config)
```

---

## 🌐 Available Routes

| Route | Visibility | Purpose |
|-------|-----------|---------|
| `/` | Public | Home feed |
| `/post/:id` | Public | Single post view |
| `/login` | Public | User login |
| `/signup` | Public | User registration |
| `/create-post` | Protected | Create new post |

---

## 📊 Tech Stack

- **React** 18.2.0 - UI framework
- **React Router DOM** 6.20.0 - Routing
- **Axios** 1.6.0 - HTTP client
- **Vite** 5.0.0 - Build tool
- **CSS3** - Styling (no CSS frameworks)

---

## 🔑 Key Features

✅ **Modern Responsive UI** - Works on all devices  
✅ **Token Authentication** - Secure user sessions  
✅ **Protected Routes** - Automatic redirect if not logged in  
✅ **API Integration** - Connects to gateway  
✅ **Loading States** - User feedback during API calls  
✅ **Error Handling** - Graceful error messages  
✅ **Mobile Menu** - Hamburger menu on mobile  

---

## 🚨 Important Notes

### 1. Gateway URL
Currently set to:
```
https://gateway-311221747660.asia-south1.run.app
```
Change in `src/api.js` if needed.

### 2. Authentication
- Tokens stored in `localStorage`
- Automatically attached to API requests
- Expires based on backend configuration

### 3. CORS
Gateway handles CORS. If you get CORS errors:
- Check gateway is running
- Verify correct URL in `src/api.js`

---

## 🐛 Troubleshooting

### Problem: "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### Problem: API errors (404, 500)
- Check gateway URL in `src/api.js`
- Verify backend services are running
- Check network tab in DevTools

### Problem: Session lost after refresh
- Make sure you're logged in
- Check localStorage has `token`
- Try clearing browser cache

### Problem: Mobile menu doesn't work
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache

---

## 📱 Responsive Testing

Test on different screen sizes:
- **Desktop** (>1024px) - Full layout
- **Tablet** (768px) - Adjusted layout
- **Mobile** (<480px) - Hamburger menu

Use Chrome DevTools:
1. Press F12
2. Click device toggle icon
3. Select device or custom size

---

## 🎨 Customization

### Change Color Scheme
Edit `src/App.css`:
```css
/* Change from purple to blue */
background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
```

### Change Logo
Edit `src/components/Navbar.jsx`:
```jsx
📝 Blog Platform  {/* Change this */}
```

### Change Site Name
Search for "Blog Platform" in components and update.

---

## 📚 Full Documentation

See:
- **Setup & Features** → `FRONTEND_DOCUMENTATION.md`
- **Testing Guide** → `TESTING_GUIDE.md`
- **API Info** → `FRONTEND_DOCUMENTATION.md` (API Endpoints section)

---

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy to Cloud Run
```bash
gcloud run deploy blog-ui \
  --source . \
  --platform managed \
  --region asia-south1
```

---

## 📞 Support

For issues:
1. Check `TESTING_GUIDE.md` for test procedures
2. Check browser DevTools Console for errors
3. Check Network tab for API response errors
4. Review `FRONTEND_DOCUMENTATION.md` for configuration

---

## ✨ Next Steps

1. ✅ Run the app (`npm run dev`)
2. ✅ Test signup/login
3. ✅ Create a post
4. ✅ View posts and comments
5. ✅ Test responsive design on mobile
6. ✅ Build for production (`npm run build`)

**Enjoy your new blog platform! 🎉**
