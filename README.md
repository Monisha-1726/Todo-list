# 📝 MERN Stack Todo App with REST API

A fully functional full-stack To-Do List application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).  
This application demonstrates complete CRUD operations with REST API integration and a modern responsive user interface.

---

## 🧩 Tech Stack

### 🔹 Front-End
- React.js
- Bootstrap (via react-bootstrap)
- Axios
- React Hooks (useState, useEffect)

### 🔹 Back-End
- Node.js
- Express.js
- MongoDB (Local using MongoDB Compass)
- Mongoose ODM
- express-validator (Input validation)
- CORS Middleware

---

## ⚙️ REST API Endpoints

| Method | Endpoint       | Description              |
|--------|---------------|--------------------------|
| GET    | /get          | Get all todos            |
| GET    | /get/:id      | Get a todo by ID         |
| POST   | /post         | Add a new todo           |
| PUT    | /put/:id      | Toggle status (Done)     |
| DELETE | /delete/:id   | Delete a todo by ID      |

---

🛠️ Getting Started
🔧 Requirements

Node.js & npm

MongoDB installed locally

MongoDB Compass (optional)

VS Code (recommended)

🚀 Installation & Setup
1️⃣ Install Backend Dependencies
npm install
2️⃣ Start MongoDB Locally

Make sure MongoDB service is running.

3️⃣ Run Backend Server
node app.js

Server runs on:

http://localhost:5000
4️⃣ Setup Frontend

Open new terminal:

cd client
npm install
npm start

Frontend runs on:

http://localhost:3000
🌟 Features

Add new tasks

View all tasks

Toggle task completion

Delete tasks

RESTful API integration

Clean & responsive UI

Input validation using express-validator

🎯 Learning Outcomes

Built REST APIs using Express

Integrated MongoDB using Mongoose

Connected React frontend with backend API

Managed state using React Hooks

Implemented input validation

Structured full-stack application properly
