# SKYLL - Platform Simulasi Karier Berbasis AI

![SKYLL Banner](public/images/banner.png)

## 📖 Tentang SKYLL

SKYLL adalah platform pembelajaran karier interaktif yang menggabungkan **materi pembelajaran**, **simulasi berbasis skenario**, dan **feedback AI** untuk membantu pengguna mengembangkan keterampilan profesional mereka. Platform ini dirancang dengan gamifikasi penuh untuk meningkatkan motivasi belajar.

---

## 🎯 Fitur Utama

### 1. **Sistem Pembelajaran Terstruktur**
- Upload dan kelola materi pembelajaran dalam format PDF
- Materi terorganisir per profesi
- Progress tracking untuk setiap materi yang diselesai
- Reward XP (+10) saat menyelesaikan pembelajaran

### 2. **Simulasi Interaktif**
- Skenario berbasis profesi (Software Engineer, Data Analyst, Product Manager, dll)
- Multiple choice questions dengan AI-powered feedback
- Sistem scoring berdasarkan kualitas jawaban
- Real-time simulation experience

### 3. **Gamifikasi**
- **XP System**: Dapatkan experience points dari setiap aktivitas
- **Badge System**: Kumpulkan lencana berdasarkan achievement
- **Leaderboard**: Bandingkan progress dengan user lain
- **Level System**: Naik level seiring akumulasi XP

### 4. **AI-Powered Feedback**
- Analisis jawaban menggunakan Hugging Face API
- Feedback kontekstual untuk setiap keputusan
- Saran peningkatan yang actionable
- Scoring otomatis berdasarkan kualitas jawaban

### 5. **Admin Dashboard (Filament)**
- Kelola profesi, skenario, dan materi pembelajaran
- Upload PDF untuk learning modules
- Manajemen badge dan reward
- Analytics dan statistics dashboard

---

## 🏗️ Arsitektur & Logic Program

### **Tech Stack**
- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18 + Inertia.js
- **UI Framework**: Tailwind CSS
- **Admin Panel**: Filament v4
- **Database**: MySQL (Laragon)
- **AI Service**: Hugging Face API
- **Package Manager**: Composer (PHP), NPM (JS)

### **Database Schema**

```
├── users
│   ├── id
│   ├── name, email, password
│   ├── role (admin/user/guest)
│   ├── xp (experience points)
│   └── avatar
│
├── professions
│   ├── id
│   ├── name, description
│   ├── icon, category
│   └── is_active
│
├── learning_modules (NEW!)
│   ├── id
│   ├── profession_id (FK)
│   ├── title, description
│   ├── pdf_file (path to uploaded PDF)
│   ├── file_size
│   ├── order, duration_minutes
│   └── is_active
│
├── user_learning_progress (NEW!)
│   ├── id
│   ├── user_id (FK)
│   ├── learning_module_id (FK)
│   ├── is_completed
│   ├── completed_at
│   └── time_spent_seconds
│
├── scenarios
│   ├── id
│   ├── profession_id (FK)
│   ├── title, description, context
│   ├── question, options (JSON)
│   └── difficulty, order
│
├── user_simulations
│   ├── id
│   ├── user_id (FK)
│   ├── profession_id (FK)
│   ├── status (in_progress/completed)
│   ├── total_score, max_score
│   └── completed_at
│
├── user_answers
│   ├── id
│   ├── user_simulation_id (FK)
│   ├── scenario_id (FK)
│   ├── selected_option
│   ├── score, ai_feedback
│   └── answered_at
│
├── badges
│   ├── id
│   ├── name, description
│   ├── icon, xp_reward
│   └── criteria
│
└── user_badges
    ├── id
    ├── user_id (FK)
    ├── badge_id (FK)
    └── earned_at
```

---

## 🔄 Flow Logic Program

### **1. Learning Flow (Pembelajaran)**

```
User Login
    ↓
Pilih Menu "Pembelajaran"
    ↓
Tampil Daftar Profesi
    ↓
User Pilih Profesi
    ↓
Tampil List Materi PDF untuk Profesi Tersebut
    ↓
User Klik "Buka Materi"
    ↓
Tampil Detail Materi + Download Button
    ↓
User Download PDF & Baca
    ↓
User Klik "Tandai Selesai"
    ↓
System:
  - Update user_learning_progress (is_completed = true)
  - Add +10 XP ke user
  - Mark as completed di UI
```

**Controller**: `LearningModuleController`
- `index()` - Daftar profesi dengan jumlah materi
- `byProfession($profession)` - List materi per profesi
- `show($learningModule)` - Detail materi & download
- `download($learningModule)` - Download PDF file
- `complete($learningModule)` - Mark as completed + reward XP

**Models**:
- `LearningModule` - Menyimpan info materi PDF
- `UserLearningProgress` - Track progress user per materi

---

### **2. Simulation Flow**

```
User Selesai Belajar (Optional)
    ↓
Pilih "Mulai Simulasi" untuk Profesi
    ↓
System Creates user_simulation Record (status: in_progress)
    ↓
Loop Setiap Scenario:
    ├── Tampilkan Context & Question
    ├── User Pilih Option (A/B/C/D)
    ├── Submit ke Backend API
    ├── Backend:
    │   ├── Kirim ke HuggingFaceService untuk AI Analysis
    │   ├── Hitung Score (ScoringService)
    │   ├── Simpan di user_answers
    │   └── Return feedback ke Frontend
    ├── Tampilkan AI Feedback
    └── Next Scenario
    ↓
All Scenarios Completed
    ↓
System:
  - Update user_simulation (status: completed)
  - Calculate total_score
  - Award XP based on performance
  - Check & award badges if criteria met
    ↓
Redirect ke Results Page
    ↓
Display:
  - Final Score
  - Per-scenario Feedback
  - Badges Earned
  - XP Gained
```

**Controller**: `SimulationController`
- `start($profession)` - Mulai simulasi baru
- `submit(Request)` - Process jawaban + AI feedback
- `results($simulation)` - Tampil hasil akhir

**Services**:
- `HuggingFaceService` - Integrasi dengan AI API
- `ScoringService` - Logika perhitungan score

---

## 🚀 Instalasi & Setup

### Prerequisites
- Laragon (sudah include PHP 8.2+, Composer, MySQL)
- Node.js 18+ & NPM
- Hugging Face API Key (optional untuk AI features)

### Langkah Instalasi

1. **Clone Repository**
```bash
cd C:\laragon\www
git clone <repository-url> skyll
cd skyll
```

2. **Install Dependencies**
```bash
composer install
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure Database MySQL Laragon** (edit `.env`)
```env
APP_NAME=SKYLL
APP_ENV=local
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=skyll
DB_USERNAME=root
DB_PASSWORD=
```

5. **Create Database di phpMyAdmin**
- Buka http://localhost/phpmyadmin
- Create database baru dengan nama `skyll`
- Collation: `utf8mb4_unicode_ci`

6. **Configure Hugging Face API** (optional)
```env
HUGGINGFACE_API_KEY=your_api_key_here
HUGGINGFACE_MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1
```

7. **Run Migrations**
```bash
php artisan migrate
```

8. **Seed Data** (optional)
```bash
php artisan db:seed
```

9. **Create Storage Link**
```bash
php artisan storage:link
```

10. **Build Assets**
```bash
npm run build
# or for development
npm run dev
```

11. **Create Admin User**
```bash
php artisan make:filament-user
# Email: admin@skyll.com
# Password: password
```

12. **Run Server**
```bash
php artisan serve
```

13. **Access Application**
- User: http://127.0.0.1:8000
- Admin: http://127.0.0.1:8000/admin

---
