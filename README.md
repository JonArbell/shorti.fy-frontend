# Shorti.fy - URL Shortener with Custom Links & Expiration

Shorti.fy is a web application that allows users to convert long URLs into short, shareable links. It offers additional features like custom short URLs, expiration dates, click tracking, and QR code generation.


## 🚀 Features
## 🔑 Authentication
- **Sign In & Sign Up:** Secure authentication for users.
- **Forgot Password:** Reset password functionality for account recovery.


## 🔗 URL Shortening
- **Convert Long URLs to Short URLs:**
  - Enter a long URL (e.g., https://www.verylongwebsite.com/articles/how-to-build-a-url-shortener-in-java).
  - The system generates a short link (e.g., shorti-fy.netlify.app/Xyz123).
- **Custom Short Links:**
  - Users can define custom short links (e.g., myshort.netlify.app/mycustomlink instead of myshort.ly/abc123).
- **Expiration Dates:**
  - Users can set expiration dates for short links.
  - Expired links become inactive.


## 📊 Click Tracking & Analytics
- **Track link clicks:** View how many times a short link has been accessed.
- **Optional tracking:** Capture details like IP, device, and location.

## 🖥️ Pages
### 🔓 Public Pages
- Sign In
- Sign Up
- Forgot Password
### 🔒 Authenticated Pages
- Home: Overview of the application.
- Dashboard: Manage and analyze shortened URLs.
- My URLs: View all created short links and their details.


## 🛠 Tech Stack
### ✅ Frontend: Angular + Tailwind CSS

- Interactive UI for managing URLs and user accounts.


### ✅ Backend: Spring Boot

- Handles URL shortening, user authentication, and analytics.


### ✅ Database: PostgreSQL

- Stores URL mappings, expiration times, and user data.


### ✅ Caching: Redis

- Speeds up URL retrieval for fast redirections.