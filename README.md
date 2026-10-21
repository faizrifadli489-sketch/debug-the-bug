# Debug the Bug

Game cari bug: ketuk baris kode yang salah sebelum waktu habis.

```bash
npm install
npm run dev     # buka http://localhost:5173 (juga bisa dari HP lewat IP lokal)
npm run build
```

- Stack: Vite 5 + React 18 + TypeScript + Tailwind CSS 3 (sengaja v3 supaya tidak butuh binary native, aman di Termux/ARM64).
- Tambah soal di `src/data/questions.ts`. `bugLine` mulai dari 1.
- Skor: poin dasar (100/150/200) + bonus kecepatan sampai 50%, dikali streak (+10% per streak, maks +50%).
- Efek suara disintesis lewat Web Audio (`src/utils/sound.ts`), jadi `public/sounds/` kosong.
