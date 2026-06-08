<div align="center">
  <h1>IT FEST 2026 — Official Website</h1>
  <p>Website resmi IT FEST 2026 — Kompetisi teknologi mahasiswa nasional oleh KBMDSI FILKOM UB.</p>

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
</div>

---

## 📋 Daftar Isi
- [Tentang Project](#tentang-project)
- [Tech Stack](#tech-stack)
- [Cara Menjalankan Lokal](#cara-menjalankan-lokal)
- [Environment Variables](#environment-variables)
- [Konvensi Kode](#konvensi-kode)
- [Kontribusi](#kontribusi)

---

## Tentang Project

Website IT FEST 2026 adalah platform registrasi dan informasi untuk kompetisi tahunan yang diselenggarakan oleh KBMDSI Fakultas Ilmu Komputer, Universitas Brawijaya. Terdiri dari tiga kategori lomba: **Digital Media**, **Business Plan**, dan **UI/UX Design**.

---

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| Next.js | 15.x | Framework React (App Router) |
| React | 19.x | UI Library |
| TypeScript | 5.x | Static typing |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animasi |
| Axios | 1.x | HTTP client ke API |
| Shadcn/UI | latest | Komponen UI |
| Lucide React | latest | Icon library |

---

## Cara Menjalankan Lokal

**Prasyarat:** Node.js 18+ dan npm sudah terinstall.

1. Clone repo
```bash
   git clone https://github.com/kbmdsi/itfest26-web.git
   cd itfest26-web
```

2. Install dependency
```bash
   npm install
```

3. Buat file environment variable
```bash
   cp .env.example .env.local
   # Isi nilai di .env.local sesuai kebutuhan
```

4. Jalankan development server
```bash
   npm run dev
```
   
   Buka [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Salin `.env.example` menjadi `.env.local` dan isi nilainya:

| Variable | Deskripsi | Contoh |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | URL base API backend | `https://api.itfest-filkom.com/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | URL frontend (untuk SEO) | `https://itfest-filkom.com` |

---

## Konvensi Kode

- **Penamaan file:** PascalCase untuk komponen (`Button.tsx`), camelCase untuk hooks & utils (`useAuth.ts`)
- **Styling:** Tailwind utility classes. Custom color ada di `globals.css` dalam `@theme`
- **Komponen baru:** Ikuti struktur feature-based — buat folder di `src/feature/` jika fiturnya besar
- **Commit message:** Gunakan format conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`

---

## Kontribusi

1. Buat branch baru dari `main`: `git checkout -b feat/nama-fitur`
2. Kerjakan perubahan
3. Commit dengan pesan yang deskriptif
4. Push dan buat Pull Request ke `main`
5. Minta review dari minimal 1 orang sebelum merge