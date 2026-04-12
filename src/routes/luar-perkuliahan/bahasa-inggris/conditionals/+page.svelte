<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const zeroConditional = String.raw`If + Present Simple, Present Simple`;
    const firstConditional = String.raw`If + Present Simple, will + V1`;
    const secondConditional = String.raw`If + Past Simple, would + V1`;
    const thirdConditional = String.raw`If + Past Perfect, would have + V3`;
</script>

<svelte:head>
    <title>Conditionals - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi conditionals bahasa Inggris: type 0, 1, 2, dan 3 dengan pola singkat dan contoh penggunaan."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Conditionals"
        date="12 April 2026"
        status="done"
        tags={["Bahasa Inggris", "Grammar", "Conditionals"]}
    />

    <NoteSection title="Apa Itu Conditional?">
        <p>
            Conditional dipakai untuk menyatakan hubungan sebab-akibat dalam
            situasi nyata, mungkin terjadi, atau berlawanan dengan kenyataan.
            Struktur paling penting ada pada kata <code>if</code>.
        </p>
        <Callout type="info" title="Cara membacanya">
            Bagian <strong>if-clause</strong> menunjukkan syarat, sedangkan
            bagian utama menunjukkan akibat atau hasil.
        </Callout>
    </NoteSection>

    <NoteSection title="Empat Pola Dasar">
        <MathBlock latex={zeroConditional} />
        <MathBlock latex={firstConditional} />
        <MathBlock latex={secondConditional} />
        <MathBlock latex={thirdConditional} />
    </NoteSection>

    <NoteSection title="Kapan Dipakai?">
        <ul>
            <li><strong>Type 0</strong>: fakta umum atau kebiasaan.</li>
            <li><strong>Type 1</strong>: kemungkinan nyata di masa depan.</li>
            <li><strong>Type 2</strong>: situasi hipotetis atau tidak nyata sekarang.</li>
            <li><strong>Type 3</strong>: penyesalan atau situasi yang tidak terjadi di masa lalu.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Contoh Singkat">
        <ul>
            <li><code>If water boils, it turns into steam.</code></li>
            <li><code>If it rains, I will stay at home.</code></li>
            <li><code>If I had time, I would help you.</code></li>
            <li><code>If I had studied, I would have passed.</code></li>
        </ul>
    </NoteSection>

    <NoteSection title="Ringkasnya">
        <Callout type="tip" title="Urutan hafalan">
            Mulai dari fakta umum, lalu naik ke kemungkinan nyata, kemudian
            ke situasi hipotetis, dan terakhir ke masa lalu yang tidak terjadi.
        </Callout>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/bahasa-inggris" label="Kembali ke Bahasa Inggris" />
</article>