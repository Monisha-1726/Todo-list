# 📝 MERN To-Do List Application

A full-stack To-Do List web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).  
This application allows users to manage daily tasks efficiently with full CRUD operations.

---

## 🚀 Features

- ✅ Create new tasks  
- 📋 View all tasks  
- ✏️ Edit tasks  
- ❌ Delete tasks  
- ☑️ Mark tasks as completed  
- 🔄 Real-time updates  
- 📱 Responsive UI  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS
- React Hooks (useState, useEffect)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure


mern-todo-app/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── frontend/
│ ├── src/
│ └── public/
│
└── README.md


---

## 📦 Installation

### 1️⃣ Clone Repository


git clone https://github.com/your-username/todo-list.git

cd todo-list


---

### 2️⃣ Backend Setup


cd backend
npm install


Create `.env` file:


MONGO_URI=your_mongodb_connection_string
PORT=5000


Start server:


npm start


---

### 3️⃣ Frontend Setup


cd frontend
npm install
npm start


---

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/todos | Create todo |
| GET | /api/todos | Get all todos |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

---

## 🌟 Future Improvements

- 🔐 Authentication (JWT)
- 🌙 Dark Mode
- 📅 Due Date feature
- 📊 Filter tasks (Completed / Pending)
- 🚀 Deployment

---

