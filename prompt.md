You are a senior fullstack engineer. Build a production-ready Notes App with clean architecture, best practices, and clear separation between frontend and backend.

# 🎯 OBJECTIVE
Create a fullstack Notes App with CRUD functionality (Create, Read, Update, Delete) integrating:
- Frontend (Next.js)
- Backend (Laravel API)
- Database (MySQL)

# 🧱 TECH STACK
Frontend:
- Next.js (App Router)
- Tailwind CSS
- Axios for API calls

Backend:
- Laravel (latest stable)
- RESTful API
- Eloquent ORM

Database:
- MySQL

# 📦 CORE FEATURES (MANDATORY)
Implement Notes CRUD:
- Create note (title, content)
- Get all notes
- Get single note
- Update note
- Delete note

# 🔐 OPTIONAL (HIGH PRIORITY BONUS)
Implement authentication:
- Register
- Login
- Logout
- Token-based auth (Laravel Sanctum or JWT)
- Protect notes endpoints (only authenticated users)

# 🎨 FRONTEND REQUIREMENTS
- Clean, modern UI using Tailwind
- Pages:
  - Notes list page
  - Create/Edit note form
  - Login & Register page (if auth implemented)
- UX considerations:
  - Loading states
  - Error handling
  - Empty state ("No notes yet")
- Use reusable components
- Use proper folder structure (app/, components/, services/)

# ⚙️ BACKEND REQUIREMENTS
- Follow MVC structure
- Create:
  - Note model
  - Migration
  - Controller (CRUD)
  - API routes
- Validate all inputs
- Return proper JSON responses
- Use resourceful routes

# 🗂️ PROJECT STRUCTURE
Maintain clean separation:
- frontend/ → Next.js app
- backend/ → Laravel API

# 🔌 API DESIGN
RESTful endpoints:
- GET /api/notes
- POST /api/notes
- GET /api/notes/{id}
- PUT /api/notes/{id}
- DELETE /api/notes/{id}

# 🧪 QUALITY REQUIREMENTS
- Clean, readable code
- Proper naming conventions
- Error handling (try-catch, validation errors)
- No hardcoded values (use environment variables)

# 🌐 DEPLOYMENT (BONUS)
Prepare project for deployment:
- Frontend: Vercel-ready
- Backend: Railway/Render-ready
- Use .env.example files

# 📘 DOCUMENTATION
Generate a README.md that includes:
- Project overview
- Tech stack
- Installation steps (frontend & backend)
- API documentation
- Environment variables
- Deployment instructions

# 🧾 GIT PRACTICES
Generate meaningful commit messages:
- feat: add notes CRUD API
- feat: implement notes UI
- fix: handle API error state
- refactor: separate API service

# 🚀 OUTPUT EXPECTATION
Provide:
1. Full backend code (Laravel)
2. Full frontend code (Next.js)
3. Step-by-step setup instructions
4. README.md
5. Example .env files

Focus on clarity, maintainability, and production-level structure.
Do not generate messy or overly complex code.

IMPORTANT:
- Do not overengineer
- Keep it simple but clean
- Follow best practices
- Ensure the app runs without errors