# AGENTS.md — Panduan Workspace & Sistem Desain (`ncpAdmin`)

Dokumen ini menjadi rujukan konsistensi gaya visual dan UI untuk agent yang bekerja pada workspace `belajar-next` (`ncpAdmin`).

## 1. Sumber Kebijakan Style Utama
- File style utama berada di `app/styles/index.css`.
- Gunakan token CSS custom properties (`:root`) dan kelas utilitas/komponen yang sudah didefinisikan di `app/styles/index.css` sebelum membuat nilai warna, bayangan, radius, atau gaya komponen baru.
- Pertahankan konsistensi gaya **Neon Red & Black** (nuansa gelap *pitch black* / *charcoal* dengan aksen *neon red* `#ff073a` dan efek *glow* halus).

## 2. Tipografi
- **Font Display / Judul / Harga / Logo**: `--font-display` (`'Orbitron'`, fallback sans-serif).
- **Font Body / UI / Form / Deskripsi**: `--font-body` (`'Plus Jakarta Sans'`, fallback sans-serif).
- **Skala Ukuran Font**: gunakan token `--text-2xs` (`0.6875rem`) hingga `--text-4xl` (`2.25rem`).
- **Bobot & Line-Height**: gunakan token `--font-weight-*` (`400`–`800`) dan `--leading-*` (`1.15`–`1.625`).
- **Kelas Tipografi Bawaan**: `.retro-logo`, `.heading-display`, `.heading-section`, `.heading-card`, `.heading-large-card`, `.text-body`, `.text-muted`, `.text-price`, `.link-see-all`.

## 3. Palet Warna & Token
- **Primary / Brand (Neon Red)**: `--color-primary` (`#ff073a`), `--color-primary-hover` (`#ff2a55`), `--color-primary-active` (`#d6002f`), serta varian transparansi `--color-primary-muted`, `--color-primary-subtle`, `--color-primary-glow`.
- **Latar Belakang & Permukaan**: `--color-bg-app` (`#070709`), `--color-bg-card` (`#0f0f14`), `--color-bg-card-subtle` (`#14141c`), `--color-bg-sidebar` (`#0a0a0d`), `--color-bg-input` (`#121217`).
- **Teks**: `--color-text-primary` (`#f5f5f7`), `--color-text-secondary` (`#a1a1aa`), `--color-text-muted` (`#52525b`), `--color-text-inverse` (`#ffffff`), `--color-text-price` (`#ff073a`).
- **Border & Divider**: `--color-border` (`rgba(255, 7, 58, 0.35)`), `--color-border-subtle` (`rgba(255, 255, 255, 0.08)`), `--color-border-hover` (`#ff073a`).
- **Tag / Badge Aksen Neon**: tersedia variabel warna *bg*, *border*, dan *text* untuk `orange`, `purple`, `pink`, `green`, `yellow`, dan `blue`.
- **Progress Bar**: `--color-progress-bg` (`#1c1c24`) dan `--color-progress-fill` (`#ff073a`).

## 4. Bentuk, Border, Shadow & Glow
- **Border Radius**: `--radius-sm` (`8px`), `--radius-md` (`12px`), `--radius-lg` (`16px`), `--radius-xl` (`20px`), `--radius-full` (`9999px`).
- **Border**: `--border-width` (`1px`), `--border-thick` (`2px`), `--border-retro`, `--border-retro-subtle`.
- **Shadow & Neon Glow**: gunakan `--shadow-sm`, `--shadow-md`, `--shadow-neon-sm`, `--shadow-neon-md`, `--shadow-neon-lg`, dan `--glow-text-neon`.

## 5. Komponen & Tata Letak yang Sudah Ada
- **Kartu**: `.retro-card` (dengan efek hover `translateY(-2px)`, border neon red, dan glow).
- **Navigasi Sidebar**: `.nav-item` dan `.nav-item-active` (gradient merah ke `#d6002f`, `border-radius: var(--radius-full)`).
- **Tombol Utama**: `.btn-primary` (pill button gradient neon red dengan efek hover/active).
- **Chip / Tag & Badge**: `.tag-chip` (`.tag-orange`, `.tag-purple`, `.tag-pink`, `.tag-green`), `.badge-featured`, `.badge-new`.
- **Pencarian & Progress**: `.retro-search` (dengan `:focus-within` glow), `.progress-bar-container`, `.progress-bar-fill`.
- **Layout Halaman**: `.app-layout` (flex row penuh tinggi) dan `.page-content` (`margin-left: 240px` di desktop, `200px` pada `<= 768px`, dan `0` saat `.sidebar.hidden` aktif), serta utilitas `.linkReset`.

## 6. Aturan Konsistensi untuk Agent
1. Jangan menimpa token atau merusak gaya dasar di `app/styles/index.css` secara sembarangan tanpa alasan jelas.
2. Saat menambah komponen atau halaman baru, utamakan memakai variabel CSS dan kelas yang ada agar tampilan selaras dengan tema Neon Red & Black.
3. Perhatikan responsivitas (`<= 768px`) dan status `.sidebar.hidden` saat menyusun layout berbasis `.app-layout` dan `.page-content`.
4. Jika perlu menambah token atau kelas baru, letakkan secara terstruktur di `app/styles/index.css` dan perbarui dokumentasi ini bila diperlukan.
