# Tambah Materi Reference

Dokumen ini berisi detail lengkap dari workflow tambah materi.

## A. Template Minimal +page.svelte
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

## B. Template topic.manifest.ts
```ts
import type { TopicManifest } from "$lib/data/content";

const manifest: TopicManifest = {
    id: "nama-topic",
    slug: "nama-topic",
    title: "Judul Materi",
    summary: "Deskripsi singkat materi.",
    type: "catatan", // "catatan" | "visual" | "praktek"
    track: "materi", // "materi" | "bedah-soal"
    status: "todo", // "done" | "wip" | "todo"
    order: 1,
    tags: ["tag-1", "tag-2"],
    prereq: [], // slug topic prasyarat
    renderMode: "note", // "note" | "interactive" | "mixed"
};

export default manifest;
```

## C. Komponen Umum

| Komponen | Kegunaan |
| --- | --- |
| `NoteHeader` | Header catatan (title, date, status, tags) |
| `NoteSection` | Section dengan judul |
| `CodeBlock` | Syntax highlighting |
| `Callout` | Info box (tip, warning, info, danger) |
| `BackLink` | Link kembali |
| `Sticker` | Badge status |
| `Quiz` | Kuis interaktif |

Contoh `Callout`:
```svelte
<script lang="ts">
    import Callout from "$lib/components/Callout.svelte";
</script>

<Callout type="tip" title="Tips">
    Isi tips di sini.
</Callout>
```

Contoh `CodeBlock`:
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

Contoh `Quiz`:
```svelte
<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

    const exercises = [
        {
            question: "Pertanyaan?",
            options: ["A", "B", "C"],
            correctIndex: 0,
            explanation: "Penjelasan kenapa A benar.",
        },
    ];
</script>

<NoteSection title="Latihan">
    <Quiz questions={exercises} />
</NoteSection>
```

## D. Arsitektur Metadata

1. Global index ringan: `src/lib/data/content/indexes.ts`
2. Detail topic: `topic.manifest.ts` di setiap folder topic
3. Discovery: `src/lib/data/content/discovery.ts`
4. Source of truth UI: `src/lib/data/content/index.ts`

## E. Validasi dan Sinkronisasi

Command:
- `npm run sync:indexes`
- `npm run validate:content`
- `npm run check`

Yang dicek validator:
1. duplicate semester id/order
2. duplicate subject key
3. duplicate topic id/order per subject
4. prereq invalid/cycle
5. folder topic tanpa manifest atau tanpa `+page.svelte`
6. mismatch title manifest vs `NoteHeader`

## F. Rule Komponen Topic-Specific

Gunakan `src/lib/components` untuk komponen reusable.

Gunakan `./components` di folder topic untuk visualizer/simulator yang spesifik topic.

## G. Mobile Responsiveness

Untuk visualizer/interaktif:
1. gunakan breakpoint minimal 768px dan 480px
2. font minimal 0.85rem pada mobile
3. kontrol cukup besar untuk touch
4. gunakan `overflow-x: auto` jika memang perlu horizontal scroll

Contoh:
```css
.value { width: 48px; height: 48px; font-size: 1.1rem; }

@media (max-width: 768px) {
    .value { width: 42px; height: 42px; font-size: 1rem; }
}

@media (max-width: 480px) {
    .value { width: 36px; height: 36px; font-size: 0.95rem; }
}
```