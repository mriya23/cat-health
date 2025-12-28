# Cat Health AI

Platform SaaS untuk deteksi penyakit kucing menggunakan AI dari foto.

## Struktur Proyek

```
CAT HEALTH/
├── frontend/          # React.js (Vite) Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── public/
│
└── backend/           # Laravel API Backend
    ├── app/
    │   ├── Http/Controllers/
    │   └── Models/
    ├── config/
    ├── database/
    └── routes/
```

## Fitur

### Landing Page

- Hero section dengan headline dan CTA
- Trust/Social Proof section
- Fitur Utama Kami
- Cara Kerja Deteksi AI (4 langkah)
- Pricing Plans (Free Trial, Pro, Clinic)
- FAQ Section
- Footer

### Dashboard (Setelah Login)

- Upload & Scan - Upload foto kucing untuk analisis
- Hasil Analisis - Detail hasil analisis AI
- Riwayat Scan - History semua scan
- Billing/Subscription - Manajemen langganan
- Admin/Clinic Mode - Dashboard analytics untuk admin

## Instalasi

### Frontend (React.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Setup database MySQL
# Buat database 'cat_health'

php artisan migrate
php artisan db:seed
php artisan serve
```

Backend API akan berjalan di `http://localhost:8000`

## Default Users

- **Admin**: `admin@cathealth.ai` / `password`
- **Demo**: `demo@cathealth.ai` / `password`

## Tech Stack

### Frontend

- React.js 18
- Vite
- React Router DOM
- Axios
- Lucide React (icons)

### Backend

- Laravel 11
- Laravel Sanctum (API authentication)
- MySQL

## API Endpoints

### Public

- `GET /api/plans` - Daftar paket langganan
- `POST /api/register` - Registrasi user baru
- `POST /api/login` - Login

### Protected (requires authentication)

- `GET /api/user` - Get current user
- `POST /api/logout` - Logout
- `GET /api/scans` - List semua scan
- `POST /api/scans` - Upload foto baru
- `GET /api/scans/{id}` - Detail scan
- `DELETE /api/scans/{id}` - Hapus scan
- `GET /api/scans/statistics` - Statistik dashboard
- `GET /api/subscription` - Langganan aktif
- `POST /api/subscription` - Update langganan
- `DELETE /api/subscription` - Cancel langganan

## Screenshots

Website ini mencakup:

1. **Landing Page** - Halaman utama dengan fitur, pricing, dan FAQ
2. **Login/Register** - Autentikasi user
3. **Dashboard** - Overview statistik dan quick scan
4. **Upload & Scan** - Drag & drop upload foto
5. **Hasil Analisis** - Detail analisis dengan rekomendasi
6. **Riwayat Scan** - History semua pemeriksaan
7. **Billing** - Manajemen subscription
8. **Admin Dashboard** - Clinic mode dengan analytics

## License

MIT
