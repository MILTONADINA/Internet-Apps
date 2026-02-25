# Internet Applications Portfolio – Full Stack JavaScript Projects

This repository presents two full-stack projects built using modern JavaScript frameworks and backend technologies. Following a professional codebase audit, it has been restructured into an **NPM Workspaces Monorepo**. This structure eliminates code duplication by serving both independent frontends from a single unified API package.

---

## 🧠 Key Skills Demonstrated

- **Frontend Development:** HTML, CSS, JavaScript, Vue.js 3, DOM manipulation
- **Backend Development:** Node.js, Express, MySQL, REST APIs, secure session management
- **Security:** Bcrypt password hashing, JWT authentication, Stored XSS mitigation, secure CORS configurations
- **Architecture:** NPM Workspaces Monorepo, clear separation of concerns, DRY principles
- **Deployment-Ready:** `dotenv` secret management, decoupled DB migrations, explicit API rate-limiting expectations

---

## 📁 Project Overview (Monorepo)

The project utilizes NPM Workspaces to manage dependencies and scripts from the root.

```text
/
├── packages/
│   └── api/             → Node.js unified backend (Express, MySQL, JWT)
├── apps/
│   ├── todo-vanilla/    → Vanilla HTML/CSS/JavaScript frontend
│   └── todo-vue/        → Vue 3 SPA frontend (Vite, Vuex, Vue Router)
├── package.json         → Root workspace script orchestrator
```

### Features:

- 🔐 Login/signup with hashed password storage (bcrypt)
- ✅ Session tokens and protected API routes across both frontends
- 🗂 To-do lists with CRUD functionality and multi-tenant scoping
- ⚙️ Dynamic UI updates using both classic DOM rendering and modern reactive frameworks

---

## 🚀 How to Run Locally

### 1. Root Database Configuration

Rename the existing `.env.example` file in the API layer or create one to establish your database settings.

1. `cp packages/api/.env.example packages/api/.env`
2. Update the `DB_PASSWORD` to your local MySQL server.
3. Keep `DB_AUTO_INIT=true` for your first run to scaffold the database.

### 2. Install Dependencies Entirely

Run the installation command from the root of the project to initialize all workspaces simultaneously:

```bash
npm install
```

### 3. Start the Unified Backend API

Start the backend server on port 3001:

```bash
npm run dev:backend
```

_(Optionally run `npm run db:init` specifically if you disabled auto-init in your env)._

### 4. Run the Frontends

**To run the Vanilla App:**
Simply open `apps/todo-vanilla/todo-login.html` directly in your browser or run a lightweight web server like LiveServer on it.

**To run the Vue 3 App:**
Open a new terminal window and start the Vite dev server at the workspace root:

```bash
npm run dev:frontend
```

This will start the Vue development UI and proxy API requests automatically to the backend on `localhost:3001`.
