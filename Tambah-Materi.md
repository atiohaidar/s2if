# Tambah Materi Baru

## 1. Tentukan ID Topic
Gunakan format `kebab-case` untuk ID topic agar konsisten dengan nama folder route.

Contoh:
- `dynamic-programming`
- `minimum-spanning-tree`

## 2. Buat File Topic Dulu
Path: `src/routes/[semester]/[subject]/[nama-topic]/+page.svelte`

Contoh nyata:
- `src/routes/semester-1/algoritma-lanjut/intro/+page.svelte`

Alasan urutan ini: saat kamu menjalankan app, link tidak akan mengarah ke halaman kosong/404 sementara.

## 3. Isi Dengan Template Minimal
```svelte
<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
</script>

<svelte:head>
    <title>Judul - S2IF Notebook</title>
    <meta name="description" content="Deskripsi singkat materi ini." />
</svelte:head>

<article class="note-article">
    <NoteHeader title="Judul" date="DD Bulan YYYY" status="todo" />
    
    <NoteSection title="Section">
        <p>Konten di sini.</p>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
```

## 4. Daftarkan Topic di Curriculum
Edit `src/lib/data/curriculum.ts`, lalu tambah object topic di subject yang sesuai.

```ts
// type: "catatan" | "visual" | "praktek"
// status: "done" | "wip" | "todo"
{ id: "nama-topic", name: "Judul", type: "catatan", status: "todo" }
```

Pastikan `id` topic sama persis dengan nama folder `[nama-topic]`.

## 5. Komponen Tambahan

### Callout (Info Box)
```svelte
<script lang="ts">
    import Callout from "$lib/components/Callout.svelte";
</script>

<!-- type: "tip" | "warning" | "info" | "danger" -->
<Callout type="tip" title="Tips">
    Isi tips di sini.
</Callout>
```

### Code Block
```svelte
<script lang="ts">
    import CodeBlock from "$lib/components/CodeBlock.svelte";
</script>

<CodeBlock 
    language="python" 
    filename="example.py"
    code={`def hello():
    print("Hello World")`}
/>
```

### Quiz (Latihan)
```svelte
<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    
    const exercises = [
        {
            question: "Pertanyaan?",
            options: ["A", "B", "C"],
            correctIndex: 0,
            explanation: "Penjelasan kenapa A benar."
        }
    ];
</script>

<NoteSection title="Latihan">
    <Quiz questions={exercises} />
</NoteSection>
```

## 6. Komponen Tersedia

| Komponen      | Kegunaan                                        |
| ------------- | ----------------------------------------------- |
| `NoteHeader`  | Header catatan dengan title, date, status, tags |
| `NoteSection` | Section dengan judul dan underline              |
| `CodeBlock`   | Syntax highlighting untuk kode                  |
| `Callout`     | Info box (tip, warning, info, danger)           |
| `BackLink`    | Link kembali ke halaman sebelumnya              |
| `Sticker`     | Badge status (done, wip, todo, important)       |
| `Quiz`        | Kuis interaktif dengan multiple choice          |

## 7. Tips

- **Style sudah otomatis global** - tidak perlu tambah `<style>` kecuali ada custom style
- **Highlight text**: `<span class="highlight">teks</span>`
- **Status types**: `done` (selesai), `wip` (proses), `todo` (belum)
- **BackLink otomatis handle base path** - cukup tulis path relatif dari root

## 8. Checklist Verifikasi (Wajib)
Setelah menambah materi:

1. Jalankan `npm run check`.
2. Buka halaman subject, pastikan topic muncul di daftar.
3. Klik topic, pastikan halaman terbuka tanpa 404.
4. Pastikan isi title di browser sudah sesuai materi.
5. **Mobile Test**: Buka halaman di mobile/tablet (atau gunakan DevTools F12 → responsive mode):
   - Visualizer tidak overflow dari layar (resize OK atau scroll horizontal smooth)
   - Text readable tanpa zoom (font size tidak terlalu kecil)
   - Buttons bisa diklik (tidak terlalu kecil di ujung)
   - Info panel jelas terbaca

## 9. Constants (Opsional)
Jika perlu akses constants:
```svelte
<script lang="ts">
    import { STATUS_LABELS, TOPIC_TYPE_ICONS } from "$lib/data/constants";
</script>
```

## 10. Komponen Custom (Topic-Specific)

Jika membuat komponen yang **hanya digunakan di satu topic** (misalnya visualizer interaktif), letakkan di folder `components` dalam topic folder tersebut, bukan di `$lib/components`.

### Struktur Folder
```
src/routes/semester-1/algoritma-lanjut/
├── week-5-dnc-pruning/
│   ├── +page.svelte
│   └── components/
│       ├── QuickSortVisualizer.svelte
│       └── QuickSelectVisualizer.svelte
```

### Kapan Pakai Topic-Specific?
- ✅ **Topic-Specific** (`./components/`): Visualizer, simulator, atau tool yang spesifik ke topik
- ✅ **General** (`$lib/components/`): Reusable UI building blocks (Callout, CodeBlock, Quiz, MathBlock)

### Contoh Import
```svelte
<!-- Umum (dari lib) -->
<script lang="ts">
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
</script>

<!-- Spesifik (dari topic folder) -->
<script lang="ts">
    import QuickSortVisualizer from "./components/QuickSortVisualizer.svelte";
</script>
```

### Benefit
- Folder terorganisir dengan jelas: komponen umum terpusat, komponen spesifik dekat dengan penggunanya
- Mudah refactor atau reuse visualizer jika butuh di topic lain
- Struktur konsisten untuk semua topic

## 11. Mobile Responsiveness untuk Visualizer & Interactive Components

Visualizer dan komponen interaktif **wajib mobile-friendly** agar mahasiswa bisa belajar via HP tanpa misconception.

### Hal yang Perlu Diperhatikan
- **Array Visualization**: Jangan fixed width yang besar. Gunakan `flex-wrap` dan responsive sizing (36-48px tergantung breakpoint)
- **Labels & Info**: Font size harus readable tanpa zoom. Minimal 0.85rem di mobile
- **Buttons & Controls**: Padding/size harus adequate untuk touch (minimal 44x44px recommended)
- **Overflow**: Gunakan `overflow-x: auto` untuk visualizer agar bisa di-scroll horizontal, bukan layout broken

### Contoh Mobile Breakpoints (dari QuickSortVisualizer)
```css
/* Desktop (default) */
.value { width: 48px; height: 48px; font-size: 1.1rem; }

/* Tablet & small laptop */
@media (max-width: 768px) {
    .value { width: 42px; height: 42px; font-size: 1rem; }
}

/* Mobile */
@media (max-width: 480px) {
    .value { width: 36px; height: 36px; font-size: 0.95rem; }
}
```

### Testing
- Buka di Chrome DevTools (F12) → Toggle Device Toolbar
- Test di breakpoints: 480px (mobile), 768px (tablet), 1024px+ (desktop)
- Pastikan tidak ada horizontal scroll di mobile (unless intentional & smooth)
