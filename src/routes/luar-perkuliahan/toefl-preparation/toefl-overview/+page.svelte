<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";

    const iTPFocus = [
        "Reading comprehension: main idea, detail, inference, vocabulary in context",
        "Listening comprehension: note-taking, detail, function, purpose, and speaker attitude",
        "Structure/Written Expression: grammar, sentence pattern, and error spotting",
        "Vocabulary: academic words, synonyms, word forms, and affixes",
    ];

    const iBTExtras = [
        "Speaking: fluency, pronunciation, and response organization",
        "Writing: integrated and independent writing with clear structure",
    ];
</script>

<svelte:head>
    <title>Apa yang Harus Dipahami untuk TOEFL - S2IF Notebook</title>
    <meta
        name="description"
        content="Panduan awal TOEFL preparation: apa saja materi inti yang harus dipahami sebelum latihan soal."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Apa yang Harus Dipahami untuk TOEFL"
        date="12 April 2026"
        status="done"
        tags={["TOEFL", "Preparation", "English Test"]}
    />

    <NoteSection title="Gambaran Umum">
        <p>
            TOEFL bukan cuma soal hafal soal latihan. Kamu perlu paham bagian
            apa saja yang diuji, pola pertanyaan yang sering muncul, dan skill
            apa yang harus dilatih duluan.
        </p>
        <Callout type="info" title="Kalau targetmu TOEFL ITP/PREDICTION">
            Fokus utamanya biasanya ada di reading, listening, dan structure.
            Kalau targetmu TOEFL iBT, kamu juga perlu menambah speaking dan writing.
        </Callout>
    </NoteSection>

    <NoteSection title="Materi Inti yang Wajib Dikuasai">
        <ul>
            {#each iTPFocus as item}
                <li>{item}</li>
            {/each}
        </ul>
    </NoteSection>

    <NoteSection title="1. Reading Comprehension">
        <p>
            Di bagian reading, kamu perlu terbiasa membaca teks akademik dengan
            cepat dan tetap akurat. Yang biasanya diuji adalah ide utama,
            detail, inference, referensi kata, dan makna kosakata dari konteks.
        </p>
        <ul>
            <li>Skimming untuk cari ide umum.</li>
            <li>Scanning untuk cari detail tertentu.</li>
            <li>Latihan inferensi dan vocabulary in context.</li>
        </ul>
    </NoteSection>

    <NoteSection title="2. Listening Comprehension">
        <p>
            Listening menuntut kamu menangkap inti percakapan, tujuan pembicara,
            dan detail kecil yang sering muncul sekali saja. Catatan singkat
            sangat membantu di sini.
        </p>
        <ul>
            <li>Fokus pada kata kunci, bukan menulis semua kalimat.</li>
            <li>Perhatikan transition words seperti however, therefore, dan because.</li>
            <li>Kenali perbedaan between fact, opinion, purpose, dan attitude.</li>
        </ul>
    </NoteSection>

    <NoteSection title="3. Structure / Grammar">
        <p>
            Ini bagian yang paling dekat dengan grammar dasar. Kamu harus paham
            tenses, subject-verb agreement, verb form, clause, modifier,
            parallelism, dan penggunaan kata bantu.
        </p>
        <ul>
            <li>Struktur kalimat dasar: subject + verb + object.</li>
            <li>Kesalahan umum: agreement, tense, dan word order.</li>
            <li>Latihan mengenali bagian kalimat yang salah dengan cepat.</li>
        </ul>
    </NoteSection>

    <NoteSection title="4. Vocabulary">
        <p>
            TOEFL juga sangat bergantung pada vocabulary. Bukan cuma hafal kata,
            tapi juga tahu sinonim, bentuk kata, dan awalan/akhiran kata.
        </p>
        <ul>
            <li>Academic words yang sering muncul di teks formal.</li>
            <li>Sinonim dan kata serumpun.</li>
            <li>Word family: noun, verb, adjective, adverb.</li>
        </ul>
    </NoteSection>

    <NoteSection title="5. Strategi Mengerjakan Tes">
        <p>
            Selain materi, kamu juga harus latihan strategi. Banyak orang sudah
            paham materinya, tapi nilainya turun karena waktu habis atau salah
            prioritas mengerjakan soal.
        </p>
        <ul>
            <li>Kerjakan soal yang paling kamu kuasai lebih dulu.</li>
            <li>Jangan terlalu lama pada satu soal.</li>
            <li>Biasakan simulasi dengan timer.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Kalau TOEFL iBT">
        <p>
            Kalau targetmu iBT, tambahkan dua skill ini ke daftar latihan:
        </p>
        <ul>
            {#each iBTExtras as item}
                <li>{item}</li>
            {/each}
        </ul>
    </NoteSection>

    <NoteSection title="Intinya">
        <Callout type="tip" title="Urutan belajar yang paling aman">
            Kuasai grammar dasar, bangun vocabulary, lalu latih reading dan
            listening dengan soal simulasi. Setelah itu, tambah strategi waktu
            dan review kesalahan.
        </Callout>
    </NoteSection>

    <BackLink href="/luar-perkuliahan/toefl-preparation" label="Kembali ke Persiapan TOEFL" />
</article>