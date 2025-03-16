# Shorti.fy - URL Shortener with & Expiration

Shorti.fy is a web application that allows users to convert long URLs into short, shareable links. It offers additional features like custom short URLs, expiration dates, click tracking, and QR code generation.


---


## 🚀 Features  

### 🔑 Authentication  
- **Sign In & Sign Up:** Secure authentication for users.
- **Google OAuth2 Login:** Users can sign in with their Google account for a seamless experience.
- **Forgot Password:** Reset password functionality for account recovery.

### 🔗 URL Shortening  
- **Convert Long URLs to Short URLs:**  
  - Enter a long URL (e.g., https://www.verylongwebsite.com/articles/how-to-build-a-url-shortener-in-java).  
  - The system generates a short link (e.g., s-fy.onrender.com/Xz4).  

- **Expiration Dates:**  
  - Users can set expiration dates for short links.  
  - Expired links become inactive.  

### ✏️ URL Management  
- **Edit Shortened URLs:** Users can update the original long URL.  
- **Delete URLs:** Users can remove their shortened links from the system.  

### 📊 Click Tracking & Analytics  
- **Track link clicks:** View how many times a short link has been accessed.  
- **Other tracking:** Capture details like partially masked IP, device, and location.  

### 📌 QR Code Generation (Coming Soon)
- **Auto-generated QR Codes:** Every shortened URL automatically gets a QR code.  
- **Downloadable QR Codes:** Users can download QR codes as images for easy sharing.  


---


## 🖥️ Pages

### 🔓 Public Pages
- Sign In
- Sign Up
- Forgot Password

### 🔒 Authenticated Pages
- **Home:** The main page for shortening URLs. Users can enter a long URL and generate a short link.
- **Dashboard:** Displays analytics, including graphs and statistics on link usage.
- **My URLs:** Manage all created short links—view full details, edit, or delete URLs.


---


## 🛠 Tech Stack
### ✅ **Frontend:** Angular + Tailwind CSS

- Interactive UI for shortening, managing, and tracking URLs.
- User authentication, password management, and account settings.
- Responsive design for a seamless experience across devices.


### ✅ **Backend:** Spring Boot

- Secure authentication, URL shortening, and link expiration.
- User management, including password changes and account recovery.
- Click tracking and analytics for detailed insights.


### ✅ **Database:** PostgreSQL

- Stores URL mappings, expiration times, and user data.


### ✅ **Caching:** Redis

- Speeds up URL retrieval for fast redirections.


---


##🔗 Repository
**Backend Repository:** [GitHub - Shorti.fy Backend Repository](https://github.com/JonArbell/shortify-backend)



---

👨‍💻 Developed & maintained by *Jon Arbell De Ocampo*