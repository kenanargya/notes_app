You are a senior frontend engineer and UX specialist.

Refactor and improve the EXISTING frontend UI of this Notes App.

# ⚠️ IMPORTANT
- DO NOT rebuild the app from scratch
- DO NOT change backend integration
- DO NOT change core functionality
- ONLY improve UI, UX, and code quality
- Keep everything working as is

# 🎯 OBJECTIVE
Improve the current UI to be:
- Simple
- Clean
- Intuitive
- Comfortable for long usage (light mode)

# 🌞 LIGHT MODE REQUIREMENTS
- Replace dark mode with a soft light theme
- Use bg-gray-50 for page background (NOT pure white)
- Use white cards with border-gray-200
- Ensure good readability:
  - Title: text-gray-900
  - Content: text-gray-600
- Use subtle shadows (shadow-sm, hover:shadow-md)
- Avoid harsh contrast and bright colors

# 🎨 UI IMPROVEMENTS
- Fix spacing and alignment across all components
- Use consistent padding and margins
- Center the layout (max-w-2xl mx-auto p-6)
- Improve typography hierarchy (title vs content vs actions)
- Improve button styling:
  - Primary: bg-black text-white
  - Secondary: text-blue-600
- Add hover states for better interaction

# 🧩 COMPONENT REFINEMENT
- Improve NoteCard:
  - cleaner layout
  - better spacing
  - clearer action buttons (Edit, Delete)

- Improve NoteForm:
  - better input spacing
  - clear labels or placeholders
  - better focus states (focus:ring)

# 🧠 UX IMPROVEMENTS
- Add loading state when fetching notes
- Add empty state:
  "No notes yet. Click 'Add Note' to create one."
- Add confirmation before deleting note
- Disable submit button if title is empty
- Ensure UI updates instantly after CRUD actions

# 🎯 INTERACTION
- Keep interactions simple and obvious
- Avoid unnecessary animations
- Make all actions clearly visible and understandable

# 🧪 CODE QUALITY
- Clean up messy JSX
- Remove duplication
- Improve readability
- Keep components reusable

# 🚀 OUTPUT
- Refactored frontend code (only necessary changes)
- Highlight what was improved (brief summary)

# FINAL RULE
Do NOT overdesign.
Do NOT add complexity.
Make the UI feel effortless and professional.