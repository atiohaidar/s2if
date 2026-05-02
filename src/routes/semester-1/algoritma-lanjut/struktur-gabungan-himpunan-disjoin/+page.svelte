<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import DSUVisualizer from "./components/DSUVisualizer.svelte";

    const dsuQuiz = [
        {
            question: "Apa tujuan utama struktur data DSU?",
            options: [
                "Menyimpan urutan data terurut",
                "Mengelola partisi elemen menjadi himpunan saling lepas dengan operasi find dan union",
                "Menghapus elemen dari himpunan secara dinamis",
                "Menghitung shortest path berbobot"
            ],
            correctIndex: 1,
            explanation:
                "DSU (union-find) dirancang untuk melacak komponen/himpunan disjoin dan menggabungkannya secara efisien."
        },
        {
            question: "Kombinasi optimasi standar DSU agar biaya operasi hampir konstan adalah...",
            options: ["BFS + DFS", "Path compression + union by rank/size", "Memoization + tabulation", "Greedy + divide and conquer"],
            correctIndex: 1,
            explanation:
                "Path compression memperpendek jalur ke akar, union by rank/size mencegah pohon terlalu tinggi."
        },
        {
            question: "Pada Kruskal, kapan edge (u, v) boleh dimasukkan ke MST?",
            options: [
                "Saat find(u) == find(v)",
                "Saat bobot edge paling besar",
                "Saat find(u) != find(v)",
                "Selalu dimasukkan jika belum diproses"
            ],
            correctIndex: 2,
            explanation:
                "Jika root berbeda, edge tidak membentuk siklus dan aman ditambahkan."
        }
    ];

    const amortizedLatex = String.raw`T(M, N) = O\left(M\,\alpha(N)\right)`;
</script>

<svelte:head>
    <title>Struktur Gabungan Himpunan Disjoin (DSU) - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi Modul 3 DAL: Disjoint Set Union (Union-Find), path compression, union by rank, aplikasi, dan analisis kompleksitas amortisasi."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Struktur Gabungan Himpunan Disjoin (DSU)"
        date="16 April 2026"
        status="wip"
        tags={["DAL", "DSU", "Union-Find"]}
    />

    <NoteSection title="1) Pendahuluan">
        <p>
            Dalam banyak masalah komputasi, elemen-elemen perlu dikelompokkan ke beberapa
            himpunan yang saling lepas dan terus berubah akibat operasi penggabungan.
            Struktur data <strong>Disjoint Set Union</strong> (DSU), atau
            <strong>Union-Find</strong>, dibuat khusus untuk kebutuhan ini.
        </p>

        <p>Operasi inti DSU:</p>
        <ol>
            <li><code>find(x)</code>: mencari perwakilan (akar) himpunan yang memuat x.</li>
            <li><code>union(x, y)</code>: menggabungkan dua himpunan jika berbeda.</li>
        </ol>

        <Callout type="info" title="Batas operasi DSU">
            DSU fokus pada konektivitas dinamis dengan dua operasi utama di atas.
            Operasi seperti irisan himpunan atau hapus elemen tidak termasuk kemampuan
            standar DSU.
        </Callout>
    </NoteSection>

    <NoteSection title="2) Representasi Data">
        <p>
            Setiap himpunan direpresentasikan sebagai pohon. Tiap elemen menunjuk ke
            induknya lewat array <code>induk[]</code>. Akar pohon menjadi perwakilan
            himpunan, ditandai dengan kondisi <code>induk[akar] == akar</code>.
        </p>

        <CodeBlock
            language="text"
            filename="dsu_init.txt"
            code={`Kamus:
    n, i : integer
    induk : array [1..n] of integer
    peringkat : array [1..n] of integer

Algoritma procedure makeSetAll(n):
    for i <- 1 to n do
        induk[i] <- i
        peringkat[i] <- 0
    end for`}
        />

        <p>
            Inisialisasi di atas setara dengan <code>makeSetAll(n)</code>, yaitu setiap
            elemen awalnya berada pada himpunan terpisah.
        </p>
    </NoteSection>

    <NoteSection title="3) Operasi Dasar DSU">
        <p>
            Implementasi DSU modern menggunakan dua optimasi: path compression pada
            <code>find</code> dan union by rank (atau size) pada <code>union</code>.
        </p>

        <CodeBlock
            language="text"
            filename="dsu_find_union.txt"
            code={`Kamus:
    x, y, rx, ry : integer

Algoritma function find(x) -> integer:
    if induk[x] != x then
        induk[x] <- find(induk[x])   // path compression
    end if
    return induk[x]

Algoritma function union_set(x, y) -> boolean:
    rx <- find(x)
    ry <- find(y)

    if rx = ry then
        return false
    end if

    // union by rank
    if peringkat[rx] < peringkat[ry] then
        induk[rx] <- ry
    else if peringkat[rx] > peringkat[ry] then
        induk[ry] <- rx
    else
        induk[ry] <- rx
        peringkat[rx] <- peringkat[rx] + 1
    end if

    return true`}
        />

        <Callout type="tip" title="Intuisi cepat">
            Path compression membuat jalur simpul ke akar makin pendek setelah operasi
            find. Union by rank mencegah pohon tumbuh tinggi sejak awal.
        </Callout>
    </NoteSection>

    <NoteSection title="4) Visualisasi Interaktif DSU">
        <p>
            Simulasi berikut memakai urutan operasi yang sama dengan contoh bedah soal,
            sehingga kamu bisa melihat perubahan <code>parent[]</code> dan
            <code>rank[]</code> secara real-time.
        </p>

        <Callout type="info" title="Apa yang bisa diobservasi?">
            Coba ganti mode tie-break saat rank sama (kanan/kiri), lalu jalankan
            step-by-step. Kamu akan lihat bentuk parent tree bisa berbeda, tapi
            partisi himpunan tetap valid.
        </Callout>

        <DSUVisualizer />
    </NoteSection>

    <NoteSection title="5) Aplikasi Utama DSU">
        <ol>
            <li>
                <strong>Deteksi siklus pada graf tak berarah</strong>:
                saat memeriksa edge (u, v), jika <code>find(u) == find(v)</code>
                maka edge itu membentuk siklus.
            </li>
            <li>
                <strong>Algoritma Kruskal untuk MST</strong>:
                edge diproses dari bobot terkecil; edge diambil hanya jika root kedua
                simpul berbeda.
            </li>
            <li>
                <strong>Connected components pada citra biner</strong>:
                sel bernilai 1 yang bertetangga di-union untuk menghitung jumlah
                komponen/pulau.
            </li>
        </ol>

        <CodeBlock
            language="text"
            filename="kruskal_core.txt"
            code={`Kamus:
    edges : array of (w, u, v), terurut naik berdasarkan w
    mst : array of (w, u, v)
    w, u, v : integer

Algoritma:
    mst <- array kosong
    for each (w, u, v) in edges do
        if union_set(u, v) then
            tambahkan (w, u, v) ke mst
        end if
    end for

    // MST valid jika jumlah edge terpilih = n - 1`}
        />
    </NoteSection>

    <NoteSection title="6) Analisis Kompleksitas">
        <p>
            Tanpa optimasi, operasi <code>find</code> bisa memburuk mendekati linear
            karena pohon dapat menjadi sangat kurus. Dengan path compression + union by
            rank, biaya total menjadi sangat efisien secara amortisasi.
        </p>

        <MathBlock latex={amortizedLatex} />

        <p>
            Di sini, <code>\u03b1(N)</code> adalah inverse Ackermann yang tumbuh sangat
            lambat. Dalam praktik, nilainya kecil (umumnya &lt;= 4), sehingga operasi DSU
            terasa hampir konstan.
        </p>

        <Callout type="warning" title="Catatan teori penting">
            Hasil analisis amortisasi menyatakan total biaya M operasi bukan benar-benar
            O(M), tetapi O(M alpha(N)). Ini sudah sangat dekat konstan untuk kebutuhan
            praktis skala besar.
        </Callout>
    </NoteSection>

    <NoteSection title="7) Rangkuman Inti">
        <ul>
            <li>DSU menyelesaikan masalah konektivitas dinamis dengan find dan union.</li>
            <li>Representasi berbasis parent tree sederhana dan hemat implementasi.</li>
            <li>Path compression + union by rank adalah kombinasi optimasi wajib.</li>
            <li>Aplikasi penting: cycle detection, Kruskal MST, dan komponen citra.</li>
            <li>Kompleksitas amortisasi: hampir konstan per operasi.</li>
        </ul>
    </NoteSection>

    <NoteSection title="8) Latihan (Diadaptasi dari Diktat)">
        <ol>
            <li>
                <strong>Friends Network</strong>: setiap pertemanan baru menggabungkan dua
                set, lalu cetak ukuran set hasil gabungan.
            </li>
            <li>
                <strong>Edges to Connect Graph</strong>: hitung jumlah komponen C,
                jawaban minimum edge tambahan adalah C - 1.
            </li>
            <li>
                <strong>Offline Dynamic Connectivity (advanced)</strong>: dukung tambah,
                hapus edge, dan query konektivitas dengan pendekatan offline.
            </li>
        </ol>
    </NoteSection>

    <NoteSection title="9) Cek Pemahaman">
        <Quiz questions={dsuQuiz} />
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
