You are a senior frontend engineer. Build a clean and modern frontend for a Notes App using Next.js.

# 🎯 OBJECTIVE
Create a frontend application that consumes an existing Laravel API for a Notes App.

# ⚠️ IMPORTANT
- Do NOT generate any backend code
- Assume backend API is already running and working
- Focus ONLY on frontend implementation

# 🧱 TECH STACK
- Next.js (App Router)
- Tailwind CSS
- Axios

# 🔌 API CONFIG
Base URL:
http://127.0.0.1:8000/api

Endpoints:
- GET /notes
- POST /notes
- PUT /notes/{id}
- DELETE /notes/{id}

# 📦 FEATURES (MANDATORY)
Implement:
1. Display list of notes
2. Create new note (title, content)
3. Edit note
4. Delete note

# 🧩 STRUCTURE
Use clean structure:
- app/
- components/
- services/

# 🔌 API LAYER
Create a dedicated API service using Axios:
- Configure base URL
- Create functions:
  - getNotes()
  - createNote()
  - updateNote()
  - deleteNote()

# 🎨 UI REQUIREMENTS
- Use Tailwind CSS
- Clean and modern design
- Card layout for notes
- Responsive layout
- Proper spacing and typography

# 🧠 UX REQUIREMENTS
- Loading state when fetching data
- Error handling (show message if API fails)
- Empty state ("No notes yet")
- Form validation (title is required)

# 🧩 COMPONENTS
Create reusable components:
- NoteCard
- NoteForm

# ⚙️ FUNCTIONAL BEHAVIOR
- Fetch notes on page load
- After create/update/delete → refresh notes list
- Use React hooks (useState, useEffect)

# ✏️ EDIT FEATURE
- Implement edit using modal or inline form

# 🧪 CODE QUALITY
- Clean and readable code
- Proper naming conventions
- Avoid duplication
- Use async/await with try-catch

# 🚀 OUTPUT
Provide:
1. Full Next.js frontend code
2. Project structure
3. Instructions to run the project

# IMPORTANT
- Keep it simple but professional
- Do not overengineer
- Ensure no runtime errors