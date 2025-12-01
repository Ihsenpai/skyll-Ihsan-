# Panduan Setup Supabase untuk SKYLL

## 📝 Langkah-langkah Detail

### 1. Persiapan Akun Supabase

1. Kunjungi https://supabase.com
2. Klik **Start your project** atau **Sign In**
3. Login dengan GitHub/Google/Email

### 2. Buat Project Baru

1. Klik tombol **+ New Project**
2. Pilih Organization atau buat baru
3. Isi form:
   ```
   Project Name: skyll-production
   Database Password: [Generate strong password]
   Region: Southeast Asia (Singapore) / Northeast Asia (Tokyo)
   Pricing Plan: Free (untuk development) atau Pro (untuk production)
   ```
4. Klik **Create new project**
5. Tunggu ~2 menit sampai selesai

### 3. Dapatkan Database Credentials

Setelah project dibuat:

1. Buka **Project Settings** (icon ⚙️ di sidebar kiri bawah)
2. Klik **Database** di menu sebelah kiri
3. Scroll ke **Connection Info** atau **Connection String**

#### Cara 1: Copy Connection Details
```
Host: db.[your-project-ref].supabase.co
Database: postgres
Port: 5432
User: postgres
Password: [your-database-password]
```

#### Cara 2: Copy Connection String (URI)
```
postgresql://postgres:[PASSWORD]@db.[your-project-ref].supabase.co:5432/postgres
```

### 4. Aktifkan PostgreSQL di PHP (Laragon)

#### Untuk Windows (Laragon):

1. Klik kanan icon Laragon di system tray
2. **PHP** → **php.ini**
3. Cari dan uncomment (hapus `;` di depan):
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```
4. Save file
5. **Restart Laragon** (Menu → Laragon → Full Restart)

#### Verifikasi:
```bash
php -m | findstr pgsql
```
Harus muncul:
```
pdo_pgsql
pgsql
```

### 5. Konfigurasi Laravel (.env)

Edit file `.env` di root project:

```env
# Database Configuration
DB_CONNECTION=pgsql
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your_database_password
DB_SSLMODE=require
```

**Ganti:**
- `xxxxxxxxxxxxx` dengan project reference Anda (cek di URL Supabase)
- `your_database_password` dengan password yang dibuat saat setup project

### 6. Update Laravel Database Config

File `config/database.php` sudah support PostgreSQL default, tapi pastikan ada konfigurasi ini:

```php
'pgsql' => [
    'driver' => 'pgsql',
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '5432'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'search_path' => 'public',
    'sslmode' => env('DB_SSLMODE', 'prefer'),
],
```

### 7. Clear Cache & Test Koneksi

```bash
# Clear all cache
php artisan config:clear
php artisan cache:clear

# Test koneksi database
php artisan tinker
```

Di Tinker console:
```php
DB::connection()->getPdo();
// Harus return PDO object tanpa error

DB::select('SELECT version()');
// Harus return PostgreSQL version
```

Ketik `exit` untuk keluar dari Tinker.

### 8. Jalankan Migrations

```bash
# Jalankan migrations
php artisan migrate

# Jika fresh install, akan muncul warning:
# Do you really wish to run this command? yes
```

Migrations yang akan dijalankan:
- `create_users_table`
- `create_password_reset_tokens_table`
- `create_cache_table`
- `create_jobs_table`
- `add_role_to_users_table`
- `create_professions_table`
- `create_scenarios_table`
- `create_scenario_options_table`
- `create_user_simulations_table`
- `create_user_answers_table`
- `create_badges_table`
- `create_user_badges_table`
- `create_personal_access_tokens_table` (Sanctum)

### 9. Verifikasi di Supabase Dashboard

1. Buka Supabase Dashboard
2. Klik **Table Editor** di sidebar
3. Anda harus melihat semua tabel yang baru dibuat:
   - users
   - professions
   - scenarios
   - scenario_options
   - user_simulations
   - user_answers
   - badges
   - user_badges
   - dll.

## 🔒 Keamanan Database

### Row Level Security (RLS)

Supabase menggunakan RLS untuk keamanan. Untuk backend Laravel, kita bypass RLS dengan service role key:

1. Di Supabase Dashboard → **Project Settings** → **API**
2. Copy **service_role** secret key (JANGAN gunakan anon key untuk backend)
3. Simpan di `.env` (optional, untuk Supabase client):
   ```env
   SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   SUPABASE_SERVICE_KEY=your_service_role_key
   ```

### Database Password Best Practices

- Minimal 12 karakter
- Kombinasi huruf besar, kecil, angka, simbol
- Simpan di password manager
- Jangan commit ke Git (sudah ada di `.gitignore`)

## 📊 Connection Pooling (Recommended untuk Production)

Untuk performa lebih baik:

### Transaction Mode (Port 6543)
```env
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=6543  # Bukan 5432
DB_DATABASE=postgres
```

### Session Mode (Port 5432) - Default
```env
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
```

**Kapan pakai apa?**
- **Port 5432 (Session)**: Development, migrations, artisan commands
- **Port 6543 (Transaction)**: Production, high traffic, serverless

## 🗂️ Supabase Storage (Upload Files)

### Setup Storage untuk Avatar/Icons

1. Di Supabase Dashboard → **Storage**
2. Klik **Create bucket**
3. Bucket name: `skyll-assets`
4. Public bucket: **Yes** (untuk avatar yang bisa diakses publik)
5. Klik **Save**

### Upload Policy

Buat policy agar user bisa upload:

```sql
-- Policy: Enable upload for authenticated users
CREATE POLICY "Enable upload for authenticated users"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'skyll-assets');

-- Policy: Public read access
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'skyll-assets');
```

### Integrasi dengan Laravel

Jika mau pakai Supabase Storage, install package:

```bash
composer require supabase/supabase-php
```

Config di `.env`:
```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_BUCKET=skyll-assets
```

## 🐛 Troubleshooting

### Error: "could not find driver"

**Solusi:**
1. Edit `php.ini` (Laragon → PHP → php.ini)
2. Uncomment:
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```
3. Restart Laragon
4. Test: `php -m | findstr pgsql`

### Error: "SQLSTATE[08006] SSL connection required"

**Solusi:**
Tambahkan di `.env`:
```env
DB_SSLMODE=require
```

### Error: "SQLSTATE[08006] Connection timeout"

**Solusi:**
1. Cek firewall/antivirus (allow port 5432/6543)
2. Cek internet connection
3. Coba ganti region Supabase yang lebih dekat
4. Gunakan connection pooler (port 6543)

### Error: "password authentication failed"

**Solusi:**
1. Cek password di Supabase **Project Settings** → **Database**
2. Pastikan tidak ada spasi di password
3. Password case-sensitive
4. Bisa reset password di Supabase dashboard

### Error: "database "postgres" does not exist"

**Solusi:**
Database name harus lowercase `postgres` bukan `POSTGRES`

### Error: "too many connections"

**Solusi:**
Gunakan connection pooler:
```env
DB_PORT=6543
```

## 📈 Monitoring Database

### Supabase Dashboard

1. **Database** → **Logs**: Lihat query logs
2. **Database** → **Usage**: Monitor storage & bandwidth
3. **Database** → **Reports**: Performance metrics

### Laravel Query Log

Enable query log untuk debugging:

```php
// Di routes atau controller
DB::enableQueryLog();

// Your code here

dd(DB::getQueryLog());
```

## 🔄 Backup Database

### Manual Backup via Supabase

1. **Database** → **Backups**
2. Klik **Download backup**

### Automated Backup

Supabase Free plan: 7 days backup retention
Supabase Pro plan: 30 days backup retention

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Laravel Database Documentation](https://laravel.com/docs/database)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

Jika masih ada masalah, cek error log Laravel di `storage/logs/laravel.log`
