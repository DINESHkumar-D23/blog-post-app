# Blog Platform Frontend - API Integration Guide

## 🔌 API Overview

All frontend API requests are routed through the **Gateway** service. The gateway acts as a single entry point for all backend services.

### Gateway URL
```
https://gateway-311221747660.asia-south1.run.app
```

### Base Configuration
```javascript
// src/api.js
const API_BASE_URL = "https://gateway-311221747660.asia-south1.run.app";

// Request timeout: default axios timeout
// Authentication: Bearer token in Authorization header
// Content-Type: application/json
```

---

## 🔐 Authentication

### Token Storage
- **Location:** `localStorage`
- **Key:** `token`
- **Format:** JWT Bearer token
- **Persistence:** Survives page refresh

### Token in Requests
All requests automatically include:
```javascript
Authorization: Bearer <token>
```

### Token Lifecycle
1. **Login** - Received from `/login` endpoint
2. **Storage** - Saved to localStorage
3. **Usage** - Added to all subsequent requests
4. **Expiry** - Removed on 401 response or user logout
5. **Refresh** - Persists after page refresh

---

## 📡 Endpoint Reference

### Public Endpoints (No Auth Required)

#### 1. Get All Posts
```
GET /posts
```

**Request:**
```javascript
API.get('/posts')
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Post Title",
      "content": "Post content here...",
      "author": "John Doe",
      "created_at": "2026-05-19T10:00:00Z"
    },
    // ... more posts
  ],
  "status": "success"
}
```

**Used in:** `Home.jsx`

**Error Handling:**
- 500: Server error → Show "Failed to load posts"
- Network error → Show "Failed to load posts"

---

#### 2. Get Single Post
```
GET /posts/:id
```

**Request:**
```javascript
API.get(`/posts/${postId}`)
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "Post Title",
    "content": "Full post content...",
    "author": "John Doe",
    "created_at": "2026-05-19T10:00:00Z"
  },
  "status": "success"
}
```

**Used in:** `PostDetails.jsx`

**Error Handling:**
- 404: Post not found → Show "Post not found"
- 500: Server error → Show error banner

---

#### 3. Get Post Comments
```
GET /posts/:id/comments
```

**Request:**
```javascript
API.get(`/posts/${postId}/comments`)
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "post_id": 1,
      "content": "Great post!",
      "author": "Jane Smith",
      "created_at": "2026-05-19T11:00:00Z"
    },
    // ... more comments
  ],
  "status": "success"
}
```

**Used in:** `PostDetails.jsx`

**Error Handling:**
- Empty array if no comments
- Show "No comments yet" message

---

#### 4. User Signup
```
POST /signup
```

**Request:**
```javascript
const formData = {
  username: "newuser",
  email: "user@example.com",
  password: "password123"
};

API.post('/signup', formData)
```

**Response:**
```json
{
  "data": {
    "message": "User created successfully"
  },
  "status": "success"
}
```

**Used in:** `Signup.jsx`

**Validation:**
- Username: required, unique
- Email: required, valid format, unique
- Password: required, min 6 characters

**Error Handling:**
- 400: Validation error → Show `error.response.data.error`
- 409: Duplicate email → Show "Email already exists"
- 500: Server error → Show "Signup failed"

---

#### 5. User Login
```
POST /login
```

**Request:**
```javascript
const credentials = {
  email: "user@example.com",
  password: "password123"
};

API.post('/login', credentials)
```

**Response:**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "newuser"
    }
  },
  "status": "success"
}
```

**Used in:** `Login.jsx`

**Token Handling:**
1. Extract token: `response.data.data.token`
2. Store in localStorage: `localStorage.setItem('token', token)`
3. Set auth state: `onLoginSuccess()`
4. Redirect to home: `navigate('/')`

**Error Handling:**
- 401: Invalid credentials → Show "Login failed"
- 404: User not found → Show "Login failed"
- 500: Server error → Show "Login failed"

---

### Protected Endpoints (Auth Required)

#### 6. Create Post
```
POST /posts
```

**Request:**
```javascript
const postData = {
  title: "My Post Title",
  content: "This is the post content..."
};

API.post('/posts', postData)
// Authorization header automatically included
```

**Response:**
```json
{
  "data": {
    "id": 2,
    "title": "My Post Title",
    "content": "This is the post content...",
    "author": "John Doe",
    "created_at": "2026-05-19T15:00:00Z"
  },
  "status": "success"
}
```

**Used in:** `CreatePost.jsx`

**Authorization:** ✅ Required (token in Authorization header)

**Validation:**
- Title: required, max 200 characters
- Content: required, max 5000 characters

**Error Handling:**
- 400: Validation error → Show validation message
- 401: Not authenticated → Redirect to login (interceptor)
- 403: Not authorized → Redirect home
- 500: Server error → Show "Failed to create post"

---

#### 7. Delete Post
```
DELETE /posts/:id
```

**Request:**
```javascript
API.delete(`/posts/${postId}`)
// Authorization header automatically included
```

**Response:**
```json
{
  "data": {
    "message": "Post deleted successfully"
  },
  "status": "success"
}
```

**Authorization:** ✅ Required (must be post owner)

**Error Handling:**
- 401: Not authenticated → Redirect to login
- 403: Not post owner → Show "Cannot delete"
- 404: Post not found → Show "Post not found"
- 500: Server error → Show "Failed to delete"

---

## 🔄 Request/Response Flow

### Successful Public Request (GET /posts)
```
Browser
  ↓
App.jsx → Home.jsx
  ↓
api.js (Axios)
  ↓
GET https://gateway-311221747660.asia-south1.run.app/posts
  ↓
Gateway
  ↓
Post Service
  ↓
Database
  ↓
Returns: [Post1, Post2, Post3]
  ↓
api.js receives response
  ↓
Home.jsx state updated
  ↓
Renders posts on page
```

### Authenticated Request (POST /posts)
```
Browser
  ↓
App.jsx → CreatePost.jsx
  ↓
User submits form
  ↓
api.js (Axios with interceptor)
  ↓
Interceptor adds: Authorization: Bearer <token>
  ↓
POST https://gateway-311221747660.asia-south1.run.app/posts
{
  title: "...",
  content: "..."
}
  ↓
Gateway (validates token)
  ↓
Post Service
  ↓
Creates post in Database
  ↓
Returns: { id: X, title: "...", ... }
  ↓
api.js receives response
  ↓
CreatePost.jsx shows success
  ↓
Redirects to Home
```

### Failed Request (401 Unauthorized)
```
Expired Token (from localStorage)
  ↓
Request sent with old token
  ↓
API returns: 401 Unauthorized
  ↓
Interceptor catches 401
  ↓
localStorage.removeItem('token')
  ↓
redirect to /login
```

---

## 🛡️ Error Handling Strategy

### API Interceptors
```javascript
// src/api.js
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = "/login";
    }
    if (error.response?.status === 403) {
      // Not authorized
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
```

### Component-Level Error Handling
Each component catches errors and displays appropriate messages:

```javascript
try {
  const res = await API.get('/posts');
  setPosts(res.data.data || []);
} catch (err) {
  setError(err.response?.data?.error || "Failed to load posts");
}
```

### Error Response Format
```json
{
  "error": "User not found",
  "status": "error"
}
```

---

## 📋 Component to Endpoint Mapping

| Component | Method | Endpoint | Auth | Purpose |
|-----------|--------|----------|------|---------|
| Home.jsx | GET | /posts | No | Load feed |
| PostDetails.jsx | GET | /posts/:id | No | Load post |
| PostDetails.jsx | GET | /posts/:id/comments | No | Load comments |
| Login.jsx | POST | /login | No | Authenticate user |
| Signup.jsx | POST | /signup | No | Register user |
| CreatePost.jsx | POST | /posts | Yes | Create post |
| Posts.jsx (legacy) | DELETE | /posts/:id | Yes | Delete post |

---

## 🔒 Security Considerations

### 1. Token Security
- ✅ Tokens stored in localStorage (accessible to JavaScript)
- ✅ Cannot use httpOnly cookies (SPA limitation)
- ✅ Consider moving to indexedDB for sensitive apps
- ✅ Clear token on logout

### 2. CORS
- ✅ Gateway handles CORS headers
- ✅ Frontend doesn't need CORS config
- ✅ All requests through gateway

### 3. Request Validation
- ✅ Frontend validates form data
- ✅ Backend validates all requests
- ✅ Never trust client-side validation alone

### 4. Password Security
- ✅ Passwords sent over HTTPS only
- ✅ Gateway must hash passwords
- ✅ Never log or store passwords

---

## 🚀 API Testing

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Perform actions
4. Click on request
5. View:
   - Headers (including Authorization)
   - Request payload
   - Response data

### Using Postman

Import endpoints:
```
POST /login
{
  "email": "user@example.com",
  "password": "password123"
}

GET /posts
Header: Authorization: Bearer <token>

POST /posts
Header: Authorization: Bearer <token>
{
  "title": "Test Post",
  "content": "Test content"
}
```

### cURL Commands

```bash
# Get posts
curl -X GET https://gateway-311221747660.asia-south1.run.app/posts

# Login
curl -X POST https://gateway-311221747660.asia-south1.run.app/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Create post (with token)
curl -X POST https://gateway-311221747660.asia-south1.run.app/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Post","content":"Content"}'
```

---

## 🔄 API Updates

### When Backend Changes

1. **New Endpoint:** Add in corresponding component
2. **Endpoint Renamed:** Update in api.js calls
3. **Response Format Changed:** Update error handling
4. **New Authentication:** Update interceptors
5. **New Validation:** Update form validation

### Backward Compatibility
- ✅ Current implementation compatible with:
  - Node.js Express backend
  - Java Spring Boot backend
  - Any REST API following JSON conventions

---

## 📊 API Rate Limits

Check with backend team:
- Requests per minute/hour?
- Rate limit headers?
- Throttling behavior?

---

## 🐛 Debugging API Issues

### Check These First:
1. ✅ Is gateway running? (Test in browser)
2. ✅ Is backend service running?
3. ✅ Is token valid? (Check localStorage)
4. ✅ Is URL correct? (Check api.js)
5. ✅ DevTools Network tab shows request?
6. ✅ Response has correct status code?
7. ✅ CORS error? (Check gateway logs)
8. ✅ Validation error? (Check error message)

### Console Debugging
```javascript
// Check token
console.log(localStorage.getItem('token'))

// Check last error
// Look in Browser Console for error messages

// Check API request
// DevTools → Network tab → Click request
```

---

## 📝 API Documentation Links

- **Gateway Documentation:** (add link)
- **Backend Services:** (add links)
- **Authentication:** (add link)

---

**Last Updated:** May 2026  
**Maintained By:** Development Team
