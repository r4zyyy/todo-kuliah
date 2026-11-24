# 📚 Daftar Tugas Kuliah (Todo Kuliah)

Aplikasi web sederhana untuk mencatat dan mengelola tugas kuliah, dibangun dengan **Vite + TypeScript** (vanilla, tanpa framework).

## ✨ Fitur

- **Tambah tugas** — isi judul, mata kuliah, dan deadline
- **Edit tugas** — ubah data tugas yang sudah ada
- **Hapus tugas** — hapus tugas dengan konfirmasi
- **Toggle status** — klik badge status untuk mengubah antara "Belum Selesai" ↔ "Selesai"
- **Persistent data** — data tersimpan di `localStorage`, tidak hilang saat refresh
- **Responsive UI** — mobile-first, CSS biasa tanpa library
- **Indikator deadline** — tampilkan peringatan jika tugas sudah terlambat

## 🚀 Cara Install & Run

```bash
# Clone repo
git clone <url-repo>
cd todo-kuliah

# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

## 📦 npm: Dependencies vs devDependencies

| Jenis              | Keterangan                                                     |
| ------------------- | -------------------------------------------------------------- |
| `dependencies`      | Package yang dibutuhkan saat **runtime** di production          |
| `devDependencies`   | Package yang hanya dibutuhkan saat **development** (build tool, compiler, linter, dll.) |

Pada project ini, `typescript` dan `vite` ada di `devDependencies` karena hanya dipakai untuk build — hasil akhir (dist/) adalah HTML/CSS/JS biasa yang tidak memerlukan keduanya.

### Semantic Versioning (semver)

Format: `MAJOR.MINOR.PATCH` (contoh: `6.3.5`)

| Simbol | Contoh       | Arti                                                             |
| ------ | ------------ | ---------------------------------------------------------------- |
| `^`    | `^6.3.5`     | Izinkan update **minor & patch** (≥6.3.5, <7.0.0)               |
| `~`    | `~5.7.2`     | Izinkan update **patch** saja (≥5.7.2, <5.8.0)                  |

- `^` (caret) → lebih fleksibel, cocok untuk kebanyakan library
- `~` (tilde) → lebih ketat, cocok saat ingin stabilitas lebih

## 🌳 Alur Git

```
main ──── init ──── types & storage ──── CRUD & UI ──┬── merge edit-delete ──── merge styling (conflict resolved) ──── env config ──── README
                                                      │
feature/edit-delete ─── edit & delete ────────────────┘
                                                      │
feature/styling ─── responsive styling ───────────────┘
```

1. `init: scaffold vite + typescript project`
2. `feat: add types & storage module`
3. `feat: add CRUD & UI logic`
4. `feat: add edit & delete functionality` (di branch `feature/edit-delete`)
5. `style: add responsive styling` (di branch `feature/styling`)
6. Merge `feature/edit-delete` → main (fast-forward)
7. Merge `feature/styling` → main (conflict di `<h1>` index.html, diselesaikan manual)
8. `chore: add env config & .env.example`
9. `docs: add README`

## ⚙️ Environment Variables

File `.env` (tidak masuk Git):

```
VITE_APP_NAME=Daftar Tugas Kuliah
VITE_APP_VERSION=1.0.0
```

Salin `.env.example` → `.env` untuk setup awal. Tidak ada secret/API key.

## 🛠 Tech Stack

- **Vite** — build tool & dev server
- **TypeScript** — type safety (interface, type alias, union type, generics)
- **CSS** — vanilla, responsive mobile-first
- **localStorage** — data persistence

## 📄 Lisensi

MIT
