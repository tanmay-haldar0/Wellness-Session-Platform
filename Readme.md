# 🧘 Arvyax Wellness Session Platform

### live link for the app
https://wellness-session.onrender.com/

A secure full-stack web application that allows users to create, draft, auto-save, and publish wellness session JSONs with authentication, session management, and a modern UI. Built as part of the Arvyax Full Stack Internship assignment using the **MERN** stack.

---

## 🚀 Features

- 🔐 **Authentication** with JWT and protected routes  
- 📝 **Session Editor** with auto-save and manual save  
- 🗂️ **Draft and Publish Support** for JSON-based session data  
- 🎯 **User Dashboard** showing all published sessions  
- 📁 **My Sessions** for managing drafts and published items  
- 🖍️ **Tag Management UI** with comma-separation and deletion  
- 🌙 **Fully Responsive UI** with modern card layouts  
- 🍞 **Notifications** using react-hot-toast  
- 💾 **MongoDB Integration** for storing user data and sessions  

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
## 2. Backend Setup

```bash
cd backend
npm install
```

### Create a .env file in the backend folder:
 ```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### Start the backend development server:
```bash
npm run dev
```

## 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
This will start the frontend on http://localhost:5173.

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
## 📸 UI Highlights

- **✨ Stylish session cards with tags and status badges**

- **🎨 Intuitive editor interface with centered layout**

- **☁️ Skeleton loaders during data fetch for smooth UX**

- **📱 Fully responsive navbar with dropdown and sidebar for mobile**

---

## 🧑‍💻 Author

**Tanmay Haldar**  
📧 [iamtanmay2959@gmail.com](mailto:iamtanmay2959@gmail.com)  
🌐 [Portfolio](https://tanmay-haldar0.onrender.com)  
🐙 [GitHub](https://github.com/tanmay-haldar0)


## 🙌 Acknowledgements


- MongoDB, Express, React, and Node.js communities  
- [React Icons](https://react-icons.github.io/react-icons)  
- [Tailwind CSS](https://tailwindcss.com)
