<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const modalPattern = String.raw`Modal + base verb`;
    const auxiliaryPattern = String.raw`Auxiliary + main verb`;
    const canExample = String.raw`S + can + V1`;
    const shouldExample = String.raw`S + should + V1`;
    const mustExample = String.raw`S + must + V1`;
</script>

<svelte:head>
    <title>Modals dan Auxiliary Verbs - S2IF Notebook</title>
    <meta
        name="description"
        content="Ringkasan penggunaan modals dan auxiliary verbs dalam bahasa Inggris dengan pola dasar yang mudah diingat."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Modals dan Auxiliary Verbs"
        date="12 April 2026"
        status="done"
        tags={["Bahasa Inggris", "Grammar", "Modals"]}
    />

    <NoteSection title="Fungsi Utama">
        <p>
            Modals dipakai untuk menunjukkan kemampuan, izin, kewajiban,
            saran, kemungkinan, dan niat. Auxiliary verbs membantu membentuk
            tense, question, negation, dan passive voice.
        </p>
        <Callout type="info" title="Bedanya mudahnya">
            Modal biasanya membawa makna tambahan. Auxiliary lebih sering
            berfungsi sebagai penopang struktur kalimat.
        </Callout>
    </NoteSection>

    <NoteSection title="Pola Dasar">
        <MathBlock latex={modalPattern} />
        <MathBlock latex={auxiliaryPattern} />
    </NoteSection>

    <NoteSection title="Contoh Modals">
        <ul>
            <li><MathBlock latex={canExample} displayMode={false} /> untuk kemampuan atau izin.</li>
            <li><MathBlock latex={shouldExample} displayMode={false} /> untuk saran.</li>
            <li><MathBlock latex={mustExample} displayMode={false} /> untuk kewajiban kuat.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Contoh Kalimat">
        <ul>
            <li><code>I can speak English.</code></li>
            <li><code>You should practice every day.</code></li>
            <li><code>Students must submit the assignment.</code></li>
        </ul>
    </NoteSection>

    <NoteSection title="Ringkasnya">
        <Callout type="tip" title="Pola yang aman">
            Kalau bingung, ingat saja bahwa modal biasanya diikuti bentuk dasar
            verb, bukan <code>to</code> infinitive dan bukan <code>-ing</code>.
        </Callout>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/bahasa-inggris" label="Kembali ke Bahasa Inggris" />
</article>