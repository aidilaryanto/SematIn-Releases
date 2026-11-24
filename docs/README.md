# SematIn — Landing Page

Situs statis (HTML/CSS/JS polos, tanpa build step) untuk SematIn, siap di-deploy ke
GitHub Pages.

## File

- `index.html` — struktur halaman (hero, demo interaktif, fitur, cara kerja,
  kompatibilitas, FAQ, CTA, footer)
- `styles.css` — semua styling, termasuk tema gelap dan responsif
- `script.js` — toggle tema, scroll reveal, animasi ketik hero, demo isi template,
  marquee, dan spotlight kartu bento

## Menjalankan lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy ke GitHub Pages

### Opsi A — dari repo `SematIn-Releases` (publik, yang sudah ada)

1. Salin ketiga file ke folder `docs/` di repo tersebut.
2. Di GitHub, buka **Settings → Pages**.
3. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder **/docs**, lalu **Save**.
5. Situs aktif di `https://aidilaryanto.github.io/SematIn-Releases/`.

### Opsi B — repo khusus (mis. `sematin-website`)

1. Buat repo publik baru, salin ketiga file ke root repo.
2. Di GitHub, buka **Settings → Pages**.
3. Source **Deploy from a branch**, branch `main`, folder **/(root)**, lalu **Save**.
4. Situs aktif di `https://aidilaryanto.github.io/sematin-website/`.

## Catatan

- Semua tautan "Pasang di Chrome" mengarah ke
  `https://github.com/aidilaryanto/SematIn-Releases/releases`.
- Font dimuat dari Google Fonts (Plus Jakarta Sans + Newsreader); bila gagal
  dimuat, tampilan jatuh ke font sistem (`system-ui`) tanpa merusak layout.
- Tidak ada klaim metrik/testimoni palsu di halaman ini — semua konten berasal
  dari fitur SematIn yang sebenarnya (v1.9).
