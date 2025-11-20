# 🚀 TinyLink – URL Shortener (Bitly Clone)

A fully-featured URL Shortener web application inspired by **Bitly**.  
Users can shorten URLs, create custom codes, track clicks, view stats, and delete links.  
This project satisfies all assignment requirements including API specs, redirect functionality, health check, and user interface expectations.

---

# 🔗 Live Demo

**Frontend (Vercel):** https://bitly-clone-six.vercel.app/
**Backend (Render):** https://bitly-clone-a0s8.onrender.com  

---

# 📌 Features

### 🌐 Core Functionality
- Create short URLs  
- Custom short code (unique globally)  
- URL validation  
- Auto-generated codes (A-Z, a-z, 0-9)  
- Redirect using **HTTP 302**  
- Click count tracking  
- Last-click timestamp tracking  
- Delete short links  
- 404 for unknown codes  

---

# 📊 Application Pages

### 🏠 Dashboard (`/`)
- List all short links  
- Add new link  
- Custom code option  
- Delete links  
- Copy and Open actions  
- Pagination-ready structure  
- Search & filter  
- Ellipsis for long URLs  
- Responsive UI  

### 📈 Stats Page (`/code/:code`)
Displays detailed information:
- Target URL  
- Short code  
- Total clicks  
- Last clicked time  
- Created time  

### ❤️ Health Check (`/healthz`)
Required for testing.

Example response:
```json
{
  "ok": true,
  "version": "1.0"
}
