# Internet Applications Portfolio – Full Stack JavaScript Projects

This repository presents two full-stack projects built using modern JavaScript frameworks and backend technologies. The projects demonstrate frontend-to-backend integration, user authentication, RESTful APIs, and component-based design using Vue.js and vanilla JavaScript.

---

## 🧠 Key Skills Demonstrated

- **Frontend Development:** HTML, CSS, JavaScript, Vue.js 3, DOM manipulation
- **Backend Development:** Node.js, Express, MySQL, REST APIs, secure session management
- **Security:** Bcrypt password hashing, JWT authentication, API routing protection
- **Architecture:** Clear separation of concerns between backend services and frontend UI
- **Deployment-Ready:** Modular code structure suitable for cloud or EC2 deployment

---

## 📁 Project Overview

### 1. `todoSecurity/`
A secure, session-based To-Do App with user authentication and persistent MySQL backend.

**Structure:**
todoSecurity/
├── todo-backend-dev/ → Node.js backend (Express, MySQL, JWT)
├── todo-frontend/ → HTML/CSS/JavaScript frontend (vanilla)


**Features:**
- 🔐 Login/signup with hashed password storage (bcrypt)
- ✅ Session tokens and protected API routes
- 🗂 To-do lists with CRUD functionality
- 🖥 Deployed on local and AWS EC2 for live testing

---

### 2. `todoVue/`
A modern, component-based To-Do App built with Vue 3 and RESTful backend.

**Structure:**
todoVue/
├── todo-frontend-vue3/ → Vue 3 SPA using Vite, custom components, event handling
├── todo-backend-dev/ → Node.js REST API backend with Express & MySQL




**Features:**
- ⚙️ Responsive Vue interface with routing and reactivity
- 🧠 Stateless token-based authentication
- 📦 Package-managed with `npm` and `vite`
- 🧪 Separated development and production environments

---

## 🧱 Technologies Used

| Frontend | Backend  | Database | Security |
|----------|----------|----------|----------|
| HTML5, CSS3, JS | Node.js (Express) | MySQL | bcrypt, JWT |
| Vue.js 3 | REST APIs | Sequelize ORM | Session & token-based auth |

---

## 🚀 How to Run Locally

### For `todoSecurity/`

**Backend:**
bash
cd todoSecurity/todoSecurity/todo-backend-dev
npm install
node server.js

Frontend
cd todoSecurity/todoSecurity/todo-frontend
Open index.html in browser


**For todoVue/**
Backend:
cd todoVue/todo-backend-dev
npm install
node server.js

Frontend
cd todoVue/todo-frontend-vue3
npm install
npm run dev



