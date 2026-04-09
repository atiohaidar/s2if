# Tambah Materi Baru

Dokumen ini adalah quick-start agar workflow tambah materi cepat dan konsisten.

Untuk detail lengkap (template lanjutan, komponen, arsitektur metadata, validator, troubleshooting), lihat [Tambah-Materi-Reference.md](Tambah-Materi-Reference.md).

## 1. Tentukan Slug Topic
Gunakan format `kebab-case` agar sama dengan nama folder route.

Contoh:
- `dynamic-programming`
- `minimum-spanning-tree`

## 2. Cara Paling Cepat (Disarankan)
Gunakan scaffolder:

`npm run create:topic -- --semester=semester-1 --subject=algoritma-lanjut --slug=contoh-topik --title="Contoh Topik" --summary="Ringkasan singkat" --order=99 --type=catatan --track=materi --status=todo --renderMode=note`

Hasil otomatis:
- folder topic baru di `src/routes/[semester]/[subject]/[slug]`
- `+page.svelte`
- `topic.manifest.ts`
- sinkronisasi index (`npm run sync:indexes`)

## 3. Jika Ingin Manual
1. Buat folder topic: `src/routes/[semester]/[subject]/[slug]/`
2. Buat `+page.svelte`
3. Buat `topic.manifest.ts`

Aturan wajib:
- `id` dan `slug` di manifest harus sama dengan nama folder.
- `title` di manifest harus sama dengan `title` pada `NoteHeader` di `+page.svelte`.

## 4. Validasi
Jalankan:

`npm run check`

Script ini akan menjalankan:
1. `npm run validate:content`
2. `svelte-check`

## 5. Checklist Cepat
1. Topic muncul di halaman subject.
2. Link topic tidak 404.
3. Topic bisa ditemukan di `/catalog`.
4. Tidak ada error pada `npm run check`.
5. Untuk visualizer/interaktif, tes responsive di mobile.

## 6. Rule Arsitektur Singkat
1. Index global ringan di `src/lib/data/content/indexes.ts`.
2. Detail topic di `topic.manifest.ts` per folder topic.
3. Discovery otomatis oleh `src/lib/data/content/discovery.ts`.
4. Komponen reusable tetap di `src/lib/components`, komponen khusus topic di folder topic masing-masing.

## 7. Referensi Lanjutan
- [Tambah-Materi-Reference.md](Tambah-Materi-Reference.md)
