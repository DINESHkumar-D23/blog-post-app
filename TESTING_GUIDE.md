# Blog Platform Frontend - Testing Guide

## 🧪 Complete Testing Walkthrough

This guide walks you through testing all features of the blog platform frontend.

---

## Part 1: Initial Setup & Launch

### Step 1: Install Dependencies
```bash
cd ui
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

**Expected Result:** Server starts on http://localhost:3000

---

## Part 2: Public Features Testing

### Test 2.1: View Home Feed (Public)

**Steps:**
1. Open http://localhost:3000 in browser
2. You should see "Welcome to Our Blog Platform" hero section
3. Below should be "Latest Posts" section with posts in a grid

**Expected Results:**
- ✅ Page loads without authentication
- ✅ Navbar shows "Home", "Login", "Sign Up" buttons
- ✅ Posts display as cards with title, preview, author, date
- ✅ "Read More →" button visible on each post
- ✅ Responsive layout (check on mobile device)

### Test 2.2: Navigate to Post Details

**Steps:**
1. From home page, click "Read More →" on any post
2. URL should change to `/post/[post-id]`
3. Page should show full post content

**Expected Results:**
- ✅ Back button visible at top
- ✅ Full post title displayed
- ✅ Author and date shown
- ✅ Full post content visible
- ✅ Comments section below (if comments exist)
- ✅ "No comments" message if no comments

### Test 2.3: View Comments

**Steps:**
1. From post details page, scroll down
2. Look for comments section

**Expected Results:**
- ✅ Each comment shows author, date, and content
- ✅ Comments are properly formatted
- ✅ Multiple comments display correctly

### Test 2.4: Navigation - Back Button

**Steps:**
1. From any post details page, click "Back to Posts" button
2. Should return to home page

**Expected Results:**
- ✅ Returns to home page
- ✅ URL changes to `/`

---

## Part 3: Authentication - Signup Testing

### Test 3.1: Visit Signup Page

**Steps:**
1. From home page, click "Sign Up" button in navbar
2. URL should change to `/signup`

**Expected Results:**
- ✅ Signup form displays
- ✅ Form has: Username, Email, Password fields
- ✅ "Sign Up" button visible
- ✅ "Log in here" link visible at bottom

### Test 3.2: Signup with Valid Data

**Steps:**
1. Fill in form:
   - Username: `testuser123`
   - Email: `testuser@example.com`
   - Password: `password123`
2. Click "Sign Up" button

**Expected Results:**
- ✅ Loading state shows "Creating account..."
- ✅ Success message: "Signup successful! Redirecting to login..."
- ✅ After 1.5 seconds, redirects to login page (`/login`)

### Test 3.3: Signup with Invalid Email

**Steps:**
1. Fill form with:
   - Username: `testuser`
   - Email: `not-an-email`
   - Password: `password123`
2. Click "Sign Up"

**Expected Results:**
- ✅ Browser shows email validation error
- ✅ Form doesn't submit

### Test 3.4: Signup with Short Password

**Steps:**
1. Fill form with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `123` (less than 6 chars)
2. Click "Sign Up"

**Expected Results:**
- ✅ Error message: "Password must be at least 6 characters"
- ✅ Form doesn't submit

### Test 3.5: Signup with Duplicate Email

**Steps:**
1. Fill form with email that already exists
2. Click "Sign Up"

**Expected Results:**
- ✅ Error message from server displays
- ✅ User can try again

---

## Part 4: Authentication - Login Testing

### Test 4.1: Login Page Display

**Steps:**
1. Navigate to `/login` or from signup page click "Log in here"
2. Should see login form

**Expected Results:**
- ✅ Form shows Email and Password fields
- ✅ Login button visible
- ✅ "Sign up here" link visible

### Test 4.2: Login with Valid Credentials

**Steps:**
1. Enter credentials:
   - Email: `testuser@example.com`
   - Password: `password123`
2. Click "Login"

**Expected Results:**
- ✅ Loading state: "Logging in..."
- ✅ Token stored in localStorage (check DevTools → Application → Storage)
- ✅ Redirects to home page (`/`)
- ✅ Navbar now shows: "Home", "Create Post", "Logout"

### Test 4.3: Login with Invalid Password

**Steps:**
1. Enter valid email but wrong password
2. Click "Login"

**Expected Results:**
- ✅ Error message displays: "Login failed. Please try again."
- ✅ Still on login page
- ✅ User can retry

### Test 4.4: Login with Non-existent Email

**Steps:**
1. Enter email that doesn't exist
2. Click "Login"

**Expected Results:**
- ✅ Error message displays
- ✅ Still on login page

### Test 4.5: Empty Form Submission

**Steps:**
1. Don't fill any fields
2. Click "Login"

**Expected Results:**
- ✅ Error message: "Please fill in all fields"
- ✅ Form doesn't submit

---

## Part 5: Protected Features Testing

### Test 5.1: Access Create Post While Logged In

**Prerequisites:** You must be logged in

**Steps:**
1. While logged in, click "Create Post" in navbar
2. URL should change to `/create-post`

**Expected Results:**
- ✅ Create post form displays
- ✅ Form has: Title and Content fields
- ✅ "Publish Post" and "Cancel" buttons visible
- ✅ Character counters show

### Test 5.2: Create Post Successfully

**Steps:**
1. Fill in:
   - Title: `My First Blog Post`
   - Content: `This is the content of my first post...`
2. Click "Publish Post"

**Expected Results:**
- ✅ Loading state: "Publishing..."
- ✅ Success message appears
- ✅ After 2 seconds, redirects to home page
- ✅ New post appears in the feed

### Test 5.3: Create Post with Empty Fields

**Steps:**
1. Leave Title empty, fill Content
2. Click "Publish Post"

**Expected Results:**
- ✅ Error: "Please fill in all fields"
- ✅ Form stays on page

### Test 5.4: Cancel Post Creation

**Steps:**
1. From create post page, click "Cancel" button

**Expected Results:**
- ✅ Redirects to home page
- ✅ Post not created

### Test 5.5: Access Create Post While Not Logged In

**Steps:**
1. Logout first
2. Try to navigate to `/create-post` directly via URL bar
3. Or clear localStorage token and refresh

**Expected Results:**
- ✅ Automatically redirected to `/login`
- ✅ Cannot access create post form

---

## Part 6: Session Persistence Testing

### Test 6.1: Token Persists After Refresh

**Prerequisites:** You must be logged in

**Steps:**
1. Note you're logged in (navbar shows "Create Post", "Logout")
2. Press F5 to refresh page
3. Check if still logged in

**Expected Results:**
- ✅ Still logged in after refresh
- ✅ Navbar still shows "Create Post", "Logout"
- ✅ Token still in localStorage

### Test 6.2: Session Persists After Navigation

**Steps:**
1. While logged in, navigate between pages:
   - Home page
   - Create post page
   - A post details page
2. Check navbar state throughout

**Expected Results:**
- ✅ Remain logged in on all pages
- ✅ Navbar always shows logged-in state

### Test 6.3: Logout Clears Session

**Steps:**
1. While logged in, click "Logout" button
2. Refresh page (F5)

**Expected Results:**
- ✅ Redirects to home page after logout
- ✅ After refresh, still logged out
- ✅ Navbar shows "Login", "Sign Up"
- ✅ localStorage has no token

---

## Part 7: Navigation & Routing Testing

### Test 7.1: Navbar Navigation

**Steps:**
1. From home page, click each navbar link and verify:
   - "Home" → goes to `/`
   - "Login" (if logged out) → goes to `/login`
   - "Sign Up" (if logged out) → goes to `/signup`
   - "Create Post" (if logged in) → goes to `/create-post`
   - "Logout" → logs out and stays on home

**Expected Results:**
- ✅ All links work correctly
- ✅ Current page is highlighted in navbar

### Test 7.2: Active Route Highlighting

**Steps:**
1. Visit different pages
2. Check navbar - current page should be highlighted

**Expected Results:**
- ✅ Current page has underline or different styling
- ✅ Highlighting updates when navigating

### Test 7.3: Mobile Menu

**Steps:**
1. Resize browser to mobile width (< 480px)
2. Click hamburger menu (☰)
3. Menu should appear/expand

**Expected Results:**
- ✅ Hamburger menu visible on mobile
- ✅ Click opens menu
- ✅ All links visible in menu
- ✅ Clicking link closes menu
- ✅ Click menu button again closes it

---

## Part 8: Responsive Design Testing

### Test 8.1: Desktop View (> 768px)

**Steps:**
1. Set browser width to > 1000px
2. Check layout

**Expected Results:**
- ✅ Navbar menu horizontal
- ✅ Post grid displays multiple columns
- ✅ All content properly spaced
- ✅ No horizontal scroll

### Test 8.2: Tablet View (481px - 768px)

**Steps:**
1. Resize to tablet width (~768px)
2. Check layout changes

**Expected Results:**
- ✅ Content still readable
- ✅ Post cards stack appropriately
- ✅ Form still usable
- ✅ Navbar adapts

### Test 8.3: Mobile View (≤ 480px)

**Steps:**
1. Resize to mobile width (~375px)
2. Navigate through all pages

**Expected Results:**
- ✅ Hamburger menu appears
- ✅ All content readable without horizontal scroll
- ✅ Buttons clickable (not too small)
- ✅ Forms functional
- ✅ Images scale properly

---

## Part 9: Error Handling Testing

### Test 9.1: Network Error

**Steps:**
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Try to load posts or navigate

**Expected Results:**
- ✅ Error message appears
- ✅ "Try Again" button available
- ✅ No crashes

### Test 9.2: Invalid API Response

**Steps:**
1. If possible, make API return error
2. Or navigate with invalid ID: `/post/99999`

**Expected Results:**
- ✅ Error message displays
- ✅ "Back to Home" button available

### Test 9.3: 401 Unauthorized (Token Expiration)

**Steps:**
1. Login to get token
2. Open DevTools → Storage → localStorage
3. Manually clear the token
4. Try to create a post or access protected route

**Expected Results:**
- ✅ Redirects to login page
- ✅ Protected routes require re-login

---

## Part 10: Form Validation Testing

### Test 10.1: Email Validation

**Steps:**
1. Try signup/login with invalid emails:
   - `notanemail`
   - `@example.com`
   - `user@`

**Expected Results:**
- ✅ Browser shows validation error
- ✅ Form won't submit

### Test 10.2: Empty Field Validation

**Steps:**
1. Try to submit forms with empty fields

**Expected Results:**
- ✅ Browser requires field (or) custom error shows
- ✅ Cannot submit empty form

### Test 10.3: Character Limits

**Steps:**
1. On create post form, try to type beyond limits:
   - Title: max 200 chars
   - Content: max 5000 chars

**Expected Results:**
- ✅ Character counter updates
- ✅ Cannot type beyond limit
- ✅ Counter shows current/max

---

## Part 11: Performance Testing

### Test 11.1: Page Load Time

**Steps:**
1. Open DevTools
2. Go to Performance tab
3. Record while loading home page
4. Check load time

**Expected Results:**
- ✅ Page loads in < 3 seconds
- ✅ No layout shifts

### Test 11.2: Bundle Size

**Steps:**
1. Check built files in `dist/` folder
2. Check file sizes

**Expected Results:**
- ✅ `index.js` < 300 KB
- ✅ `index.css` < 50 KB

---

## Part 12: Cross-browser Testing

### Test Each Browser:
- Chrome
- Firefox
- Safari (if on Mac)
- Edge

**For Each Browser, Verify:**
- ✅ All pages load
- ✅ Forms work
- ✅ Navigation works
- ✅ Styling looks good
- ✅ No console errors

---

## Part 13: API Integration Testing

### Test 13.1: All Requests Use Gateway

**Steps:**
1. Open DevTools → Network tab
2. Perform various actions:
   - Load posts
   - Create post
   - View post details
3. Check all requests

**Expected Results:**
- ✅ All requests start with: `https://gateway-311221747660.asia-south1.run.app`
- ✅ No requests to incorrect URL

### Test 13.2: Authorization Header Present

**Steps:**
1. Login
2. Open DevTools → Network
3. Click on any request from logged-in page
4. Go to "Headers" tab
5. Look for "Authorization" header

**Expected Results:**
- ✅ Authorization: `Bearer [token]` visible
- ✅ Present on all protected requests
- ✅ Not present on public requests (but harmless if present)

---

## Quick Smoke Test (5 minutes)

If you just want to quickly verify everything works:

1. ✅ Visit home page - can see posts
2. ✅ Click on a post - can read details
3. ✅ Click "Sign Up" - can create account
4. ✅ Click "Login" - can login
5. ✅ Click "Create Post" - can write post
6. ✅ Click "Logout" - logged out
7. ✅ Try to access create post - redirected to login
8. ✅ Resize to mobile - responsive

**If all pass: ✅ App is working!**

---

## Test Result Summary

Create a checklist:

```
FUNCTIONALITY
✅ Public can view posts
✅ Public can view post details
✅ Comments display

AUTHENTICATION
✅ Signup works
✅ Login works
✅ Logout works
✅ Session persists
✅ Protected routes redirect

PROTECTED FEATURES
✅ Create post works
✅ Post creation updates feed
✅ Delete post works (if implemented)

NAVIGATION
✅ All routes work
✅ Navbar updates based on auth
✅ Mobile menu works

RESPONSIVE
✅ Desktop layout works
✅ Tablet layout works
✅ Mobile layout works

API
✅ All requests use gateway
✅ Auth header present
✅ Error handling works

UI/UX
✅ Loading states show
✅ Error messages display
✅ Success messages show
✅ No console errors
```

---

## Debugging Tips

### Check Browser Console
```javascript
// Check token
localStorage.getItem('token')

// Check current page
window.location.pathname

// Check network tab for API calls
// DevTools → Network tab
```

### Clear All Data
```javascript
// Clear all localStorage
localStorage.clear()

// Clear specific key
localStorage.removeItem('token')
```

### Test Without Auth
1. Open DevTools
2. Application → Storage → localStorage
3. Delete the `token` entry
4. Refresh

---

**Happy Testing! 🎉**
