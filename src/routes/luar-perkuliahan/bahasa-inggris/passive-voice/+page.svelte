<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const presentPassive = String.raw`S + am/is/are + V3`;
    const pastPassive = String.raw`S + was/were + V3`;
    const futurePassive = String.raw`S + will be + V3`;
    const activeToPassive = String.raw`Object + be + V3 + (by + Subject)`;
</script>

<svelte:head>
    <title>Passive Voice - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi passive voice bahasa Inggris: pola dasar, cara ubah aktif ke pasif, dan contoh singkat."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Passive Voice"
        date="12 April 2026"
        status="done"
        tags={["Bahasa Inggris", "Grammar", "Passive Voice"]}
    />

    <NoteSection title="Ide Utama">
        <p>
            Passive voice dipakai saat fokus kalimat ada pada objek atau hasil
            tindakan, bukan pada pelakunya. Karena itu, bentuk kalimatnya
            memakai kata kerja bantu <code>be</code> dan verb bentuk ketiga
            <code>V3</code>.
        </p>
        <Callout type="info" title="Kapan dipakai?">
            Biasanya passive voice dipakai saat pelaku tidak penting, belum
            diketahui, atau ingin sengaja disembunyikan.
        </Callout>
    </NoteSection>

    <NoteSection title="Pola Dasar">
        <p>Kerangka umumnya:</p>
        <MathBlock latex={activeToPassive} />
        <p>Versi berdasarkan waktu:</p>
        <MathBlock latex={presentPassive} />
        <MathBlock latex={pastPassive} />
        <MathBlock latex={futurePassive} />
    </NoteSection>

    <NoteSection title="Contoh Ubah Kalimat">
        <ul>
            <li>
                Active: <code>The teacher explains the lesson.</code>
                <br />Passive: <code>The lesson is explained by the teacher.</code>
            </li>
            <li>
                Active: <code>Someone cleaned the room.</code>
                <br />Passive: <code>The room was cleaned.</code>
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Ringkasnya">
        <Callout type="tip" title="Ingat pola ini">
            Kalau kalimat aktif menonjolkan pelaku, passive voice menonjolkan
            objek. Rumus paling aman untuk mulai adalah:
            <strong>object + be + V3</strong>.
        </Callout>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/bahasa-inggris" label="Kembali ke Bahasa Inggris" />
</article>