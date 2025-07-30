# 🧘 Arvyax Wellness Session Platform

A modern MERN stack web app for creating, drafting, and publishing wellness session JSONs with authentication, session management, and a beautiful UI.

[**🌐 Live Demo**](https://wellness-session.onrender.com/)

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Folder Structure](#-folder-structure)
- [API Endpoints](#-api-endpoints)
- [Frontend Routes](#-frontend-routes)
- [UI Highlights](#-ui-highlights)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)

---

## 🚀 Features

- **Authentication** with JWT and protected routes
- **Session Editor** with auto-save and manual save
- **Draft & Publish** support for JSON-based session data
- **User Dashboard** for all published sessions
- **My Sessions** for managing drafts and published items
- **Tag Management UI** with comma-separation and deletion
- **Fully Responsive UI** with modern card layouts
- **Notifications** using react-hot-toast
- **MongoDB Integration** for storing user data and sessions

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variables

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/arvyax-wellness-platform.git
cd arvyax-wellness-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
This will start the frontend on [http://localhost:5173](http://localhost:5173).

---

## 📂 Folder Structure
```bash
├── backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── frontend
    ├── components/
    ├── pages/
    ├── context/
    ├── services/
    └── App.jsx
```

---

## 📚 API Endpoints

### **Authentication Routes** (`/api/auth`)
| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| POST   | /register        | Register a new user               |
| POST   | /login           | Login and receive JWT             |
| GET    | /user            | Get current user info (protected) |

### **Session Routes** (`/api`)
| Method | Endpoint                  | Description                                 |
|--------|---------------------------|---------------------------------------------|
| GET    | /sessions                 | Get all published sessions                  |
| GET    | /my-sessions              | Get all sessions for the logged-in user     |
| GET    | /my-sessions/:id          | Get a single session by ID (user only)      |
| POST   | /my-sessions/save-draft   | Save or update a session draft (user only)  |
| POST   | /my-sessions/publish      | Publish a session (user only)               |

### **Test/Utility Routes** (`/api`)
| Method | Endpoint        | Description                        |
|--------|----------------|------------------------------------|
| GET    | /protected     | Test protected route (requires JWT) |

---

## 🗺️ Frontend Routes

| Path             | Description                                  |
|------------------|----------------------------------------------|
| /                | Redirects to dashboard                       |
| /login           | Login page                                   |
| /register        | Register page                                |
| /dashboard       | View all published wellness sessions         |
| /my-sessions     | View and manage your own sessions (protected) |
| /editor/:id?     | Create or edit a session (protected)         |

---

## 📸 UI Highlights

- ✨ Stylish session cards with tags and status badges
- 🎨 Intuitive editor interface with centered layout
- ☁️ Skeleton loaders during data fetch for smooth UX
- 📱 Fully responsive navbar with dropdown and sidebar for mobile

---

## 👤 Author

**Tanmay Haldar**  
📧 [iamtanmay2959@gmail.com](mailto:iamtanmay2959@gmail.com)  
🌐 [Portfolio](https://tanmay-haldar0.onrender.com)  
🐙 [GitHub](https://github.com/tanmay-haldar0)

---

## 🙌 Acknowledgements

- MongoDB, Express, React, and Node.js communities
- [React Icons](https://react-icons.github.io/react-icons)
- [Tailwind CSS](https://tailwindcss.com)
