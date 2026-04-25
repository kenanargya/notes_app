# 📝 Notes API — Laravel Backend

A clean, production-ready RESTful API for a Notes application built with **Laravel 12** and **Laravel Sanctum** authentication.

---

## 🧱 Tech Stack

- **Framework:** Laravel 12
- **Authentication:** Laravel Sanctum (token-based)
- **Database:** MySQL
- **ORM:** Eloquent
- **Validation:** Form Request classes

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── Exceptions/
│   │   └── Handler.php              # Custom JSON error responses
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php   # Register, Login, Logout
│   │   │       └── NoteController.php   # CRUD operations
│   │   ├── Requests/
│   │   │   ├── LoginRequest.php
│   │   │   ├── RegisterRequest.php
│   │   │   ├── StoreNoteRequest.php
│   │   │   └── UpdateNoteRequest.php
│   │   └── Resources/
│   │       └── NoteResource.php     # API response formatting
│   ├── Models/
│   │   ├── Note.php
│   │   └── User.php
│   └── Providers/
│       └── AppServiceProvider.php
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── cors.php
│   ├── database.php
│   ├── sanctum.php
│   └── session.php
├── database/
│   ├── factories/
│   │   ├── NoteFactory.php
│   │   └── UserFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_04_24_000000_create_personal_access_tokens_table.php
│   │   └── 2026_04_24_000001_create_notes_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   ├── api.php                      # API routes
│   ├── console.php
│   └── web.php
├── .env.example
├── artisan
└── composer.json
```

---

## 🚀 Step-by-Step Setup Instructions

### Prerequisites

Make sure you have the following installed:

| Tool       | Version     | Download                                      |
|------------|-------------|-----------------------------------------------|
| **PHP**    | >= 8.2      | https://windows.php.net/download/             |
| **Composer** | Latest    | https://getcomposer.org/download/             |
| **MySQL**  | >= 8.0      | https://dev.mysql.com/downloads/installer/    |

### Step 1: Install PHP (Windows)

1. Download PHP from https://windows.php.net/download/ (VS16 x64 Thread Safe)
2. Extract to `C:\php`
3. Add `C:\php` to your **System PATH** environment variable
4. Copy `php.ini-development` to `php.ini`
5. Enable these extensions in `php.ini` (remove the `;` prefix):
   ```ini
   extension=curl
   extension=fileinfo
   extension=mbstring
   extension=openssl
   extension=pdo_mysql
   extension=tokenizer
   ```
6. Verify: `php -v`

### Step 2: Install Composer

1. Download and run https://getcomposer.org/Composer-Setup.exe
2. Verify: `composer -V`

### Step 3: Create MySQL Database

Open MySQL and run:
```sql
CREATE DATABASE notes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 4: Setup the Project

```bash
# Navigate to the backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Edit .env file with your MySQL credentials:
# DB_DATABASE=notes_db
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run database migrations
php artisan migrate

# Start the development server
php artisan serve
```

The API will be available at **http://localhost:8000**

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### Register
```http
POST /api/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response (201):**
```json
{
    "message": "Registration successful.",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    },
    "token": "1|abc123...",
    "token_type": "Bearer"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response (200):**
```json
{
    "message": "Login successful.",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    },
    "token": "2|xyz789...",
    "token_type": "Bearer"
}
```

#### Logout (Requires Auth)
```http
POST /api/logout
Authorization: Bearer {token}
```

#### Get User Profile (Requires Auth)
```http
GET /api/user
Authorization: Bearer {token}
```

---

### Notes Endpoints (All require authentication)

Include the token in every request:
```
Authorization: Bearer {token}
```

#### Get All Notes
```http
GET /api/notes
```

**Response (200):**
```json
{
    "data": [
        {
            "id": 1,
            "title": "My First Note",
            "content": "This is the content...",
            "created_at": "2026-04-24T12:00:00.000000Z",
            "updated_at": "2026-04-24T12:00:00.000000Z"
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

#### Create Note
```http
POST /api/notes
Content-Type: application/json

{
    "title": "My New Note",
    "content": "This is the content of my note."
}
```

**Response (201):**
```json
{
    "data": {
        "id": 1,
        "title": "My New Note",
        "content": "This is the content of my note.",
        "created_at": "2026-04-24T12:00:00.000000Z",
        "updated_at": "2026-04-24T12:00:00.000000Z"
    }
}
```

#### Get Single Note
```http
GET /api/notes/{id}
```

#### Update Note
```http
PUT /api/notes/{id}
Content-Type: application/json

{
    "title": "Updated Title",
    "content": "Updated content."
}
```

#### Delete Note
```http
DELETE /api/notes/{id}
```

**Response (200):**
```json
{
    "message": "Note deleted successfully."
}
```

---

### Error Responses

#### Validation Error (422)
```json
{
    "message": "The title field is required.",
    "errors": {
        "title": ["The note title is required."]
    }
}
```

#### Unauthenticated (401)
```json
{
    "message": "Unauthenticated."
}
```

#### Forbidden (403)
```json
{
    "message": "You are not authorized to access this note."
}
```

#### Not Found (404)
```json
{
    "message": "Resource not found."
}
```

---

## 🔐 Environment Variables

| Variable                 | Description                | Default              |
|--------------------------|----------------------------|----------------------|
| `APP_NAME`               | Application name           | Notes API            |
| `APP_ENV`                | Environment                | local                |
| `APP_KEY`                | Encryption key             | (auto-generated)     |
| `APP_DEBUG`              | Debug mode                 | true                 |
| `APP_URL`                | Backend URL                | http://localhost:8000|
| `DB_CONNECTION`          | Database driver            | mysql                |
| `DB_HOST`                | Database host              | 127.0.0.1            |
| `DB_PORT`                | Database port              | 3306                 |
| `DB_DATABASE`            | Database name              | notes_db             |
| `DB_USERNAME`            | Database username          | root                 |
| `DB_PASSWORD`            | Database password          | (empty)              |
| `FRONTEND_URL`           | Frontend URL (for CORS)    | http://localhost:3000|
| `SANCTUM_STATEFUL_DOMAINS` | Sanctum stateful domains | localhost,localhost:3000 |

---

## 🌐 Deployment (Railway/Render)

1. Push the `backend/` folder to a Git repository
2. Set environment variables on your deployment platform
3. Build command: `composer install --no-dev --optimize-autoloader`
4. Start command: `php artisan serve --host=0.0.0.0 --port=$PORT`
5. Run migrations: `php artisan migrate --force`

---

## 📋 Quick Test with cURL

```bash
# Register
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123","password_confirmation":"password123"}'

# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Create Note (replace TOKEN)
curl -X POST http://localhost:8000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Hello World","content":"My first note!"}'

# Get All Notes
curl http://localhost:8000/api/notes \
  -H "Authorization: Bearer TOKEN"
```
