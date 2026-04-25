# Ebyb Notes App

Sebuah aplikasi manajemen catatan (*Notes App*) full-stack yang modern, cepat, dan responsif. Dibangun menggunakan arsitektur pemisahan backend dan frontend untuk performa yang optimal.

## ✨ Fitur Utama (Requirements Terpenuhi)

### Fitur Wajib:
- **Lihat Catatan (Read):** Menampilkan daftar catatan dengan sistem grid yang rapi, lengkap dengan fitur pencarian (*search*).
- **Tambah Catatan (Create):** Menambahkan catatan baru secara instan dengan modal pop-up dan notifikasi toast.
- **Edit Catatan (Update):** Memperbarui judul maupun isi catatan tanpa harus berpindah halaman.
- **Hapus Catatan (Delete):** Menghapus catatan secara aman menggunakan konfirmasi (*custom confirmation modal*).

### Nilai Tambah:
- **Autentikasi (Login/Register):** Sistem keamanan user menggunakan token API (Laravel Sanctum). Catatan diproteksi sehingga pengguna hanya dapat melihat catatannya sendiri.
- **UI/UX yang Menarik:** Antarmuka pengguna bergaya modern dan elegan (*Light Mode*) menggunakan Next.js dan Tailwind CSS, dilengkapi animasi halus, *empty states*, dan *toast notifications*.
- **Full API-Driven:** Backend bertindak murni sebagai RESTful API yang me-return JSON responses.

---

## 🛠️ Teknologi yang Digunakan

- **Backend:** Laravel 12 (PHP) + MySQL
- **Frontend:** Next.js 16 (React App Router)
- **Styling:** Tailwind CSS v4 & Vanilla CSS Tokens
- **Autentikasi:** Laravel Sanctum
- **HTTP Client:** Axios (dengan Interceptors untuk Auto-Auth)

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

Aplikasi ini dibagi menjadi 2 folder utama: `backend` dan `frontend`. Keduanya harus dijalankan secara paralel.

### Prasyarat:
- PHP >= 8.2 & Composer
- Node.js >= 18.17 & npm
- MySQL Server berjalan (XAMPP / Laragon / Native)

### 1. Setup Backend (Laravel API)
Buka terminal baru dan masuk ke folder `backend`:
```bash
cd backend
composer install
cp .env.example .env
```
Sesuaikan konfigurasi database di file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=notes_db
DB_USERNAME=root
DB_PASSWORD=
```
Kemudian jalankan perintah berikut:
```bash
php artisan key:generate
php artisan migrate
php artisan serve
```
Backend sekarang berjalan di `http://127.0.0.1:8000`.

### 2. Setup Frontend (Next.js)
Buka terminal baru yang lain dan masuk ke folder `frontend`:
```bash
cd frontend
npm install
```
Buat file `.env.local` di root folder frontend (jika belum ada) dan tambahkan:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```
Jalankan frontend server:
```bash
npm run dev
```
Frontend sekarang berjalan di `http://localhost:3000`.

---

## 📚 API Documentation (Endpoints)

Semua endpoint di bawah ini (kecuali otentikasi) mewajibkan Header `Authorization: Bearer <token>` dan `Accept: application/json`.

### Authentication
- `POST /api/register` : Mendaftarkan user baru (params: `name`, `email`, `password`, `password_confirmation`).
- `POST /api/login` : Login untuk mendapatkan token (params: `email`, `password`).
- `POST /api/logout` : Menghapus token dari sistem (memerlukan Auth Token).
- `GET /api/user` : Mendapatkan data user yang sedang login.

### Notes (CRUD)
- `GET /api/notes` : Mengambil semua catatan milik user yang sedang login.
- `POST /api/notes` : Membuat catatan baru (params: `title`, `content`).
- `GET /api/notes/{id}` : Mengambil detail 1 catatan.
- `PUT /api/notes/{id}` : Memperbarui catatan (params: `title`, `content`).
- `DELETE /api/notes/{id}` : Menghapus catatan.

---

*Dikembangkan untuk menyelesaikan tugas pengembangan Ebyb Notes App.*
