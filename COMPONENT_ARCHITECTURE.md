# Blog Platform Frontend - Component Architecture

## 🏗️ Component Design Overview

This document explains the architecture, design patterns, and best practices used in the blog platform frontend.

---

## 📦 Component Hierarchy

```
App.jsx (Router & State Management)
  ├── Navbar.jsx (Navigation)
  │
  ├── Home.jsx (Public Page)
  │   └── PostCard.jsx (Reusable)
  │   └── PostCard.jsx (Reusable)
  │   └── ... (more PostCards)
  │
  ├── PostDetails.jsx (Public Page)
  │   └── Comments (embedded)
  │
  ├── Login.jsx (Auth Page)
  │
  ├── Signup.jsx (Auth Page)
  │
  ├── ProtectedRoute (Wrapper)
  │   └── CreatePost.jsx (Protected Page)
  │
  └── ... (other routes)
```

---

## 🎯 Component Details

### 1. App.jsx - Root Component

**Purpose:** Router setup, authentication state management

**Key Responsibilities:**
- Setup React Router with all routes
- Manage isLoggedIn state
- Pass auth handlers to children
- Render Navbar globally

**State Management:**
```javascript
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return !!localStorage.getItem("token");
});
```

**Props Passed:**
- `isLoggedIn` → Navbar, ProtectedRoute
- `onLogout` → Navbar
- `onLoginSuccess` → Login component

**Routes Defined:**
```
/ → Home
/login → Login
/signup → Signup
/post/:id → PostDetails
/create-post → ProtectedRoute → CreatePost
```

---

### 2. Navbar.jsx - Navigation Component

**Purpose:** Global navigation with authentication awareness

**Key Features:**
- Dynamic menu based on auth state
- Mobile responsive hamburger menu
- Active route highlighting
- Logout functionality

**Props:**
```javascript
{
  isLoggedIn: boolean,      // Auth state
  onLogout: function        // Logout callback
}
```

**State:**
```javascript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

**Rendered Elements:**
```
Logo/Home (button)
├─ Home (link)
├─ IF NOT LOGGED IN:
│  ├─ Login (link)
│  └─ Sign Up (link)
└─ IF LOGGED IN:
   ├─ Create Post (link)
   └─ Logout (button)
```

**Mobile Responsive:**
- Desktop: Horizontal menu
- Mobile: Hamburger menu that expands/collapses

---

### 3. Home.jsx - Public Feed Page

**Purpose:** Display all blog posts

**Key Features:**
- Fetch posts on component mount
- Loading state
- Error handling
- Responsive grid layout
- Empty state handling

**State:**
```javascript
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

**Lifecycle:**
```
Component Mount
  ↓
useEffect(() => { fetchPosts() })
  ↓
Show loading spinner
  ↓
Fetch /posts
  ↓
Update posts state
  ↓
Hide loading spinner
  ↓
Render posts
```

**Child Components:**
- PostCard (rendered multiple times)

**API Call:**
```javascript
API.get('/posts')
```

---

### 4. PostCard.jsx - Reusable Post Preview

**Purpose:** Display post summary in card format

**Props:**
```javascript
{
  post: {
    id: number,
    title: string,
    content: string,
    author: string,
    created_at: string
  }
}
```

**Features:**
- Truncates content to preview
- Formats date
- Navigation to post details
- Responsive design

**Rendered Elements:**
```
┌─────────────────────┐
│ Title  │   Date    │
├─────────────────────┤
│ Content preview...  │
├─────────────────────┤
│ By: Author  [Read More →]
└─────────────────────┘
```

**Interactions:**
- Click "Read More" → Navigate to `/post/:id`

---

### 5. PostDetails.jsx - Single Post Page

**Purpose:** Display full post content with comments

**Key Features:**
- Fetch post by ID from URL param
- Fetch comments for post
- Loading state
- Error handling
- Back navigation

**Route Param:**
```javascript
const { id } = useParams(); // From /post/:id
```

**State:**
```javascript
const [post, setPost] = useState(null);
const [comments, setComments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

**API Calls:**
```javascript
API.get(`/posts/${id}`)              // Get post
API.get(`/posts/${id}/comments`)     // Get comments
```

**Rendered Elements:**
```
[← Back to Posts]
┌──────────────────────────┐
│ Title                    │
│ By: Author | Date        │
├──────────────────────────┤
│ Full post content here   │
│ with line breaks         │
├──────────────────────────┤
│ Comments (X)             │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ Comment 1            │ │
│ │ By: User | Date      │ │
│ │ Comment content      │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

---

### 6. Login.jsx - Authentication Page

**Purpose:** Allow users to login

**Key Features:**
- Form validation
- Error handling
- Loading state
- Token storage
- Redirect after successful login
- Link to signup

**Props:**
```javascript
{
  onLoginSuccess: function  // Called after successful login
}
```

**State:**
```javascript
const [form, setForm] = useState({ email: "", password: "" });
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

**Form Validation:**
- Email: required, valid format
- Password: required

**API Call:**
```javascript
API.post('/login', form)
// Response: { token, user }
```

**After Success:**
1. Extract token: `response.data.data.token`
2. Store: `localStorage.setItem('token', token)`
3. Call: `onLoginSuccess()`
4. Navigate: `navigate('/')`

**Rendered Elements:**
```
┌─────────────────┐
│ Welcome Back    │
│ Log in to account
├─────────────────┤
│ [Error Message] │
│ Email:          │
│ [Email input]   │
│ Password:       │
│ [Pass input]    │
│ [Login Button]  │
│                 │
│ Don't have...?  │
│ [Sign up link]  │
└─────────────────┘
```

---

### 7. Signup.jsx - Registration Page

**Purpose:** Allow new user registration

**Key Features:**
- Form validation
- Error handling
- Loading state
- Password strength check
- Success message
- Redirect to login

**State:**
```javascript
const [form, setForm] = useState({ 
  username: "", 
  email: "", 
  password: "" 
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
```

**Form Validation:**
- Username: required
- Email: required, valid format, unique
- Password: required, minimum 6 characters

**API Call:**
```javascript
API.post('/signup', form)
// Response: { message }
```

**After Success:**
1. Show success message
2. Wait 1.5 seconds
3. Redirect to login

**Rendered Elements:**
Similar to Login but with username field and "Create Account" heading

---

### 8. CreatePost.jsx - Protected Post Creation

**Purpose:** Allow authenticated users to create posts

**Key Features:**
- Protected route (requires auth)
- Form validation
- Character counters
- Error handling
- Loading state
- Success message
- Cancel button
- Redirect after success

**Route:** `/create-post` (Protected)

**State:**
```javascript
const [form, setForm] = useState({ title: "", content: "" });
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
```

**Form Validation:**
- Title: required, max 200 chars
- Content: required, max 5000 chars

**API Call:**
```javascript
API.post('/posts', form)
// Authorization header automatically included
// Response: { id, title, content, ... }
```

**After Success:**
1. Show success message
2. Clear form
3. Wait 2 seconds
4. Redirect to home

**Rendered Elements:**
```
┌──────────────────────────┐
│ Create New Post          │
│ Share your thoughts      │
├──────────────────────────┤
│ Title:                   │
│ [Title input]   0/200    │
│ Content:                 │
│ [Content textarea] 0/5000│
│ [Publish] [Cancel]       │
└──────────────────────────┘
```

---

### 9. ProtectedRoute.jsx - Route Guard

**Purpose:** Protect routes that require authentication

**Implementation:**
```javascript
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

**Usage in App.jsx:**
```javascript
<Route
  path="/create-post"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <CreatePost />
    </ProtectedRoute>
  }
/>
```

**Behavior:**
- If user is NOT logged in: Redirect to `/login`
- If user IS logged in: Render component

---

## 🔄 Data Flow Patterns

### Public Page Data Flow
```
Component Mount
  ↓
useEffect hook
  ↓
setLoading(true)
  ↓
API.get('/endpoint')
  ↓
Response received
  ↓
setState(data)
  ↓
setLoading(false)
  ↓
Re-render with data
```

### User Authentication Flow
```
User enters credentials
  ↓
handleSubmit() prevents default
  ↓
Validate form
  ↓
API.post('/login', form)
  ↓
Error? → Show error message
Success? → Continue below
  ↓
Extract token from response
  ↓
localStorage.setItem('token', token)
  ↓
onLoginSuccess() → Update App state
  ↓
navigate('/') → Redirect
  ↓
Navbar updates (isLoggedIn = true)
```

### Protected Route Flow
```
User tries to access /create-post
  ↓
ProtectedRoute checks: isLoggedIn?
  ↓
NO → <Navigate to="/login" />
YES → <CreatePost />
```

---

## 🎨 Styling Strategy

### CSS Architecture
- **Global Styles:** `App.css`
- **Component Styles:** 
  - `styles/navbar.css`
  - `styles/postcard.css`
  - `styles/home.css`
- **Page Styles:** `pages/Auth.css`

### Class Naming Convention
```
.component-name {}
.component-name__element {}
.component-name__element--modifier {}
```

Example:
```css
.post-card {}
.post-card-header {}
.post-card-title {}
.post-card-date {}
```

### Responsive Breakpoints
```css
/* Desktop: > 768px */
/* Default styles */

/* Tablet: 481px - 768px */
@media (max-width: 768px) { ... }

/* Mobile: < 480px */
@media (max-width: 480px) { ... }
```

---

## 🔌 State Management

### Local Component State
- Used for form inputs
- Used for UI state (loading, errors, modals)
- Not shared between components

Example:
```javascript
const [form, setForm] = useState({ ... });
const [loading, setLoading] = useState(false);
```

### Global State (localStorage)
- Authentication token
- User session

Access:
```javascript
localStorage.getItem('token')
localStorage.setItem('token', value)
localStorage.removeItem('token')
```

### App-Level State
- `isLoggedIn` - Shared with Navbar, ProtectedRoute

Pass via props:
```javascript
<Navbar isLoggedIn={isLoggedIn} />
<ProtectedRoute isLoggedIn={isLoggedIn} />
```

---

## 🚀 Performance Considerations

### Code Splitting
- React Router automatically code-splits routes
- Each page loads when accessed

### Optimization Techniques
1. **Memoization:** Not needed for current size
2. **Lazy Loading:** Router handles this
3. **Image Optimization:** No images currently
4. **Bundle Size:** 219 KB (acceptable)

### Future Optimizations
- Add React.memo for PostCard if list is very large
- Implement pagination for posts
- Add caching for posts

---

## 🧪 Testing Considerations

### Component Testing
Each component can be tested independently:

```javascript
// Test Home.jsx
render(<Home />)
expect(screen.getByText('Latest Posts')).toBeInTheDocument()

// Test PostCard.jsx
render(<PostCard post={mockPost} />)
expect(screen.getByText('Mock Title')).toBeInTheDocument()
```

### Mocking API
```javascript
jest.mock('./api', () => ({
  get: jest.fn(() => Promise.resolve({ data: { data: [] } }))
}))
```

---

## 📚 Best Practices Used

✅ **Functional Components** - All components are functional  
✅ **React Hooks** - useState, useEffect, useParams, useNavigate  
✅ **Clean Code** - Clear naming, proper organization  
✅ **Error Handling** - Try-catch, error states  
✅ **Loading States** - Show feedback to user  
✅ **Responsive Design** - Mobile-first approach  
✅ **Separation of Concerns** - API in separate file  
✅ **Reusable Components** - PostCard used multiple times  
✅ **Protected Routes** - Auth check before access  
✅ **Interceptors** - Automatic token attachment  

---

## 🔮 Future Architecture Improvements

### If App Grows:
1. **State Management Library** - Use Redux/Zustand for complex state
2. **Component Library** - Create shared UI components package
3. **Custom Hooks** - Extract common logic (useAuth, useFetch)
4. **API Service Layer** - Organize API calls better
5. **Error Boundary** - Catch component errors gracefully
6. **Service Workers** - Add offline support
7. **Testing Suite** - Comprehensive Jest/React Testing Library tests

### Scalability:
- Current architecture supports up to ~50-100 components
- For larger apps, consider:
  - Monorepo structure
  - Storybook for component documentation
  - API versioning strategy
  - Feature-based folder structure

---

## 📖 Code Examples

### Creating a New Page Component
```javascript
import { useEffect, useState } from 'react';
import API from '../api';

export default function NewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/endpoint');
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && <h1>{data.title}</h1>}
    </div>
  );
}
```

### Adding a New Route
```javascript
// In App.jsx
<Routes>
  <Route path="/new-page" element={<NewPage />} />
  {/* Protected version */}
  <Route
    path="/protected-page"
    element={
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <ProtectedPage />
      </ProtectedRoute>
    }
  />
</Routes>
```

---

**Version:** 2.0.0  
**Last Updated:** May 2026  
**Maintained By:** Development Team
