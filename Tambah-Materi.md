# Tambah Materi Baru

## 1. Daftarkan di Curriculum
Edit `src/lib/data/curriculum.ts`, tambah topic:
```ts
// type: "catatan" | "visualisasi" | "praktek"
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
</svelte:head>

<article class="note-article">
    <NoteHeader title="Judul" date="DD Bulan YYYY" status="todo" />
    
    <NoteSection title="Section">
        <p>Konten di sini.</p>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
```

## 4. Tambah Kuis (Opsional)
```svelte
<script>
    import Quiz from "$lib/components/Quiz.svelte";
    
    // Taruh ini di dalam <script>
    const exercises = [
        {
            question: "Pertanyaan?",
            options: ["A", "B", "C"],
            correctIndex: 0,
            explanation: "Penjelasan kenapa A benar."
        }
    ];
</script>

<!-- Taruh ini di dalam <article> -->
<NoteSection title="Latihan">
    <Quiz questions={exercises} />
</NoteSection>
```

Komponen: `NoteHeader`, `NoteSection`, `CodeBlock`, `Callout`, `BackLink`, `Sticker`, **`Quiz`**

**Note: Style sudah otomatis global (tidak perlu tambah `<style>`).**
