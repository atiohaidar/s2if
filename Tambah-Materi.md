# Tambah Materi Baru

## 1. Daftarkan di Curriculum
Edit `src/lib/data/curriculum.ts`, tambah topic:
```ts
// type: "catatan" | "visual" | "praktek"
// status: "done" | "wip" | "todo"
{ id: "nama-topic", name: "Judul", type: "catatan", status: "todo" }
```

## 2. Buat File
Path: `src/routes/[semester]/[subject]/[nama-topic]/+page.svelte`
*(Pastikan `semester` dan `subject` sesuai folder yang ada)*

## 3. Template Minimal
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

## 4. Komponen Tambahan

### Callout (Info Box)
```svelte
<script>
    import Callout from "$lib/components/Callout.svelte";
</script>

<!-- type: "tip" | "warning" | "info" | "danger" -->
<Callout type="tip" title="Tips">
    Isi tips di sini.
</Callout>
```

### Code Block
```svelte
<script>
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
<script>
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

## 5. Komponen Tersedia

| Komponen      | Kegunaan                                        |
| ------------- | ----------------------------------------------- |
| `NoteHeader`  | Header catatan dengan title, date, status, tags |
| `NoteSection` | Section dengan judul dan underline              |
| `CodeBlock`   | Syntax highlighting untuk kode                  |
| `Callout`     | Info box (tip, warning, info, danger)           |
| `BackLink`    | Link kembali ke halaman sebelumnya              |
| `Sticker`     | Badge status (done, wip, todo, important)       |
| `Quiz`        | Kuis interaktif dengan multiple choice          |

## 6. Tips

- **Style sudah otomatis global** - tidak perlu tambah `<style>` kecuali ada custom style
- **Highlight text**: `<span class="highlight">teks</span>`
- **Status types**: `done` (✓ hijau), `wip` (⏳ orange), `todo` (○ abu-abu)
- **BackLink otomatis handle base path** - cukup tulis path relatif dari root

## 7. Constants (Opsional)
Jika perlu akses constants:
```svelte
<script>
    import { STATUS_LABELS, TOPIC_TYPE_ICONS } from "$lib/data/constants";
</script>
```
