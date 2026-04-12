<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const presentSimple = String.raw`S + V1(s/es) + O`;
    const presentContinuous = String.raw`S + am/is/are + V-ing + O`;
    const presentPerfect = String.raw`S + has/have + V3 + O`;
    const pastSimple = String.raw`S + V2 + O`;
    const pastContinuous = String.raw`S + was/were + V-ing + O`;
    const pastPerfect = String.raw`S + had + V3 + O`;
    const futureSimple = String.raw`S + will/shall + V1 + O`;
    const futureContinuous = String.raw`S + will be + V-ing + O`;
    const futurePerfect = String.raw`S + will have + V3 + O`;
</script>

<svelte:head>
    <title>Rumus Grammar Tenses - S2IF Notebook</title>
    <meta
        name="description"
        content="Ringkasan rumus grammar tenses bahasa Inggris: present, past, dan future dalam format yang mudah diingat."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Rumus Grammar Tenses"
        date="12 April 2026"
        status="done"
        tags={["Bahasa Inggris", "Grammar", "Tenses"]}
    />

    <NoteSection title="Pola Dasar">
        <p>
            Tenses dipakai untuk menunjukkan waktu kejadian. Pola dasarnya
            biasanya dibaca dari komponen <code>S</code> (subject),
            <code>V</code> (verb), dan <code>O</code> (object).
        </p>
        <Callout type="info" title="Cara cepat mengingat">
            Kalau belum hafal semuanya, fokus dulu ke tiga kelompok besar:
            present, past, dan future. Setelah itu baru pecah ke bentuk simple,
            continuous, dan perfect.
        </Callout>
    </NoteSection>

    <NoteSection title="Present Tenses">
        <ul>
            <li><strong>Present Simple</strong>: kebiasaan, fakta umum, jadwal.</li>
            <li><strong>Present Continuous</strong>: kejadian yang sedang berlangsung.</li>
            <li><strong>Present Perfect</strong>: kejadian yang sudah selesai dan masih relevan sekarang.</li>
        </ul>
        <MathBlock latex={presentSimple} />
        <MathBlock latex={presentContinuous} />
        <MathBlock latex={presentPerfect} />
    </NoteSection>

    <NoteSection title="Past Tenses">
        <ul>
            <li><strong>Past Simple</strong>: kejadian yang selesai di masa lalu.</li>
            <li><strong>Past Continuous</strong>: kejadian yang sedang berlangsung di masa lalu.</li>
            <li><strong>Past Perfect</strong>: kejadian yang selesai lebih dulu sebelum kejadian masa lalu lainnya.</li>
        </ul>
        <MathBlock latex={pastSimple} />
        <MathBlock latex={pastContinuous} />
        <MathBlock latex={pastPerfect} />
    </NoteSection>

    <NoteSection title="Future Tenses">
        <ul>
            <li><strong>Future Simple</strong>: rencana atau prediksi.</li>
            <li><strong>Future Continuous</strong>: kejadian yang sedang berlangsung di waktu mendatang.</li>
            <li><strong>Future Perfect</strong>: kejadian yang sudah selesai sebelum titik waktu tertentu di masa depan.</li>
        </ul>
        <MathBlock latex={futureSimple} />
        <MathBlock latex={futureContinuous} />
        <MathBlock latex={futurePerfect} />
    </NoteSection>

    <NoteSection title="Ringkasan Cepat">
        <Callout type="tip" title="Urutan yang enak dihafal">
            <strong>Simple</strong> untuk fakta atau kejadian dasar,
            <strong>Continuous</strong> untuk proses yang sedang berjalan,
            dan <strong>Perfect</strong> untuk hasil atau kejadian yang sudah
            selesai lebih dulu.
        </Callout>
        <p>
            Materi awal ini dibuat sebagai pegangan cepat sebelum masuk ke
            latihan kalimat dan pola penggunaan tenses yang lebih spesifik.
        </p>
    </NoteSection>

    <BackLink
        href="/luar-perkuliahan/bahasa-inggris"
        label="Kembali ke Bahasa Inggris"
    />
</article>