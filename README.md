# S2IF Notebook

S2IF Notebook adalah web catatan pembelajaran untuk materi S2 Informatika berbasis SvelteKit.

Fokus project:
- catatan materi yang bisa dibaca cepat
- visualisasi interaktif untuk konsep algoritma dan AI
- struktur konten scalable lewat manifest per topic

## Menjalankan Project

Prerequisite:
- Node.js 20+

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build production:
```bash
npm run build
```

## Quality Gates

- Lint: `npm run lint`
- Format check: `npm run format:check`
- Script tests: `npm run test:tools`
- Content validation: `npm run validate:content`
- Full check: `npm run check`

## Struktur Konten

- Global index semester/subject: `src/lib/data/content/indexes.ts`
- Detail tiap topic: `src/routes/[semester]/[subject]/[topic]/topic.manifest.ts`
- Discovery metadata otomatis: `src/lib/data/content/discovery.ts`
- Aggregation untuk UI: `src/lib/data/content/index.ts`

## Menambah Materi

Gunakan scaffolder:
```bash
npm run create:topic -- --semester=semester-1 --subject=algoritma-lanjut --slug=contoh-topik --title="Contoh Topik" --summary="Ringkasan singkat" --order=99 --type=catatan --track=materi --status=todo --renderMode=note
```

Dokumentasi:
- Quick start: [Tambah-Materi.md](Tambah-Materi.md)
- Reference lengkap: [Tambah-Materi-Reference.md](Tambah-Materi-Reference.md)

## CI

Workflow CI ada di `.github/workflows/ci.yml` dan menjalankan:
1. lint
2. tests (tools scripts)
3. check
4. build

Deploy ke GitHub Pages tetap menggunakan `.github/workflows/deploy.yml`.

