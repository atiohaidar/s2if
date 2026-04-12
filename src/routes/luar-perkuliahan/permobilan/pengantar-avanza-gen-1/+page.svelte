<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Pengantar Permobilan - S2IF Notebook</title>
    <meta
        name="description"
        content="Kerangka pengantar materi Permobilan untuk diisi nanti."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pengantar Permobilan: Avanza Generasi Pertama"
        date="12 April 2026"
        status="todo"
        tags={["Otomotif", "Placeholder"]}
    />

    <NoteSection title="Gambaran Besar">
        <p>
            Materi ini belum diisi.
        </p>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/permobilan" label="Kembali ke Permobilan" />
</article>