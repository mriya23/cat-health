# Cat Health AI - Backend

Laravel API backend untuk aplikasi Cat Health AI.

## Instalasi

1. Install dependencies:

```bash
composer install
```

2. Copy environment file:

```bash
cp .env.example .env
```

3. Generate application key:

```bash
php artisan key:generate
```

4. Setup database (buat database `cat_health` di MySQL)

5. Run migrations:

```bash
php artisan migrate
```

6. Seed database:

```bash
php artisan db:seed
```

7. Start server:

```bash
php artisan serve
```

## API Endpoints

### Authentication

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (auth required)
- `GET /api/user` - Get current user (auth required)

### Scans

- `GET /api/scans` - Get all scans (auth required)
- `POST /api/scans` - Upload and analyze cat photo (auth required)
- `GET /api/scans/{id}` - Get specific scan (auth required)
- `DELETE /api/scans/{id}` - Delete scan (auth required)
- `GET /api/scans/statistics` - Get scan statistics (auth required)

### Subscriptions

- `GET /api/plans` - Get available plans
- `GET /api/subscription` - Get current subscription (auth required)
- `POST /api/subscription` - Create/update subscription (auth required)
- `DELETE /api/subscription` - Cancel subscription (auth required)

## Default Users

- Admin: `admin@cathealth.ai` / `password`
- Demo: `demo@cathealth.ai` / `password`
