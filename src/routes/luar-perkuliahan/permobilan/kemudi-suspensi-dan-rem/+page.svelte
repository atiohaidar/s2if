<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
</script>

<svelte:head>
    <title>Kemudi, Suspensi, dan Rem - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Kemudi, Suspensi, dan Rem"
        date="12 April 2026"
        status="todo"
        tags={["Otomotif", "Placeholder"]}
    />

    <NoteSection title="Dalam Pengerjaan">
        <p>Materi ini akan diisi nanti.</p>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/permobilan" label="Kembali ke Permobilan" />
</article>