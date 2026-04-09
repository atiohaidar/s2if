<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Pengantar AI - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pengantar Kecerdasan Buatan"
        date="09 April 2026"
        status="done"
        tags={["AI", "Dasar"]}
    />

    <NoteSection title="Apa Itu AI?">
        <p>
            Kecerdasan Buatan (Artificial Intelligence/AI) adalah cabang ilmu
            komputer yang berfokus pada pembuatan sistem yang mampu mengambil
            keputusan, belajar dari data, dan menyelesaikan masalah seperti cara
            manusia berpikir.
        </p>
        <p>Dalam konteks kuliah ini, AI dilihat dari dua sudut utama:</p>
        <ul>
            <li><strong>Reasoning and Search</strong> untuk menemukan solusi terbaik.</li>
            <li><strong>Learning</strong> untuk meningkatkan performa dari pengalaman.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Komponen Sistem AI">
        <ul>
            <li><strong>State</strong>: representasi kondisi saat ini.</li>
            <li><strong>Action</strong>: aksi yang bisa dilakukan agen.</li>
            <li><strong>Transition Model</strong>: aturan perpindahan state.</li>
            <li><strong>Goal Test</strong>: pengecekan apakah tujuan tercapai.</li>
            <li><strong>Cost Function</strong>: biaya untuk menilai kualitas solusi.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Mengapa Search Penting di AI?">
        <p>
            Banyak masalah AI bisa dimodelkan sebagai ruang pencarian (search
            space), misalnya mencari rute tercepat, memilih langkah terbaik pada
            game, atau menyusun jadwal otomatis.
        </p>
        <Callout type="info">
            Inti pembahasan mata kuliah ini adalah bagaimana memilih strategi
            pencarian yang tepat agar solusi didapat cepat dan tetap optimal.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>
