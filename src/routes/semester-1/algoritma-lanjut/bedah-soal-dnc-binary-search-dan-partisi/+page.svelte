<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import BackLink from "$lib/components/BackLink.svelte";

    const dncQuiz = [
        {
            question:
                "Soal 1: Untuk A = [1,1,1,3,4,5,5,5,9], target = 7, berapa jumlah komparasi data pada binary search (versi loop low < high)?",
            options: ["2 * log 8 = 6", "3", "c * log N", "5", "O(log N)"],
            correctIndex: 1,
            explanation:
                "Jejak komparasi: A[4]=4 (kurang), A[6]=5 (kurang), A[7]=5 (kurang), lalu loop berhenti saat low=high=8. Jadi jumlah komparasi data yang terjadi adalah 3."
        },
        {
            question:
                "Soal 2: Untuk A = [5,1,3,4,5,1,9,5,1] dengan px = 4, hasil array setelah partisi (varian pivot dipindah ke low lalu skema Lomuto < pivot) adalah...",
            options: [
                "A = [1,1,3,4,1,5,9,5,5]",
                "A = [5,1,3,4,1,1,9,5,5]",
                "A = [1,1,1,3,4,5,5,5,9]",
                "A = [1,1,3,1,4,5,9,5,5]",
                "A = [1,1,3,4,1,5,9,5,5]"
            ],
            correctIndex: 0,
            explanation:
                "Pivot yang dipakai bernilai 5. Setelah pivot dipindah ke posisi low, array dipindai dari kiri ke kanan. Setiap elemen yang lebih kecil dari 5 ditukar ke sisi kiri boundary, lalu pivot diletakkan tepat di batas akhir elemen yang lebih kecil. Hasil akhirnya adalah [1,1,3,4,1,5,9,5,5]."
        }
    ];
</script>

<svelte:head>
    <title>Bedah Soal: DnC (Binary Search dan Partisi) - S2IF Notebook</title>
    <meta
        name="description"
        content="Bedah soal DnC: menghitung jumlah komparasi binary search dan menentukan hasil partisi array berdasarkan pivot yang diberikan."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: DnC (Binary Search dan Partisi)"
        date="16 April 2026"
        status="done"
        tags={["Bedah Soal", "DnC", "Binary Search", "Partisi"]}
    />

    <NoteSection title="Soal 1 (Binary Search)">
        <p>
            Diberikan array <code>A[0..N-1] = [1,1,1,3,4,5,5,5,9]</code>,
            batas <code>low</code> dan <code>high</code> adalah indeks awal dan akhir array,
            serta <code>target = 7</code>.
        </p>
        <p>
            Setelah memanggil algoritma binary search yang diberikan, jumlah komparasi
            pasangan data pada array adalah berapa?
        </p>

        <Callout type="info" title="Asumsi algoritma yang dipakai pada bedah ini">
            Bedah ini mengikuti varian loop <code>while (low &lt; high)</code>.
            Dengan varian ini, jejak komparasinya berhenti di 3 kali untuk data soal.
        </Callout>

        <CodeBlock
            language="text"
            filename="trace_soal_1.txt"
            code={`A = [1,1,1,3,4,5,5,5,9], target = 7
low=0, high=8
mid=4, A[mid]=4  -> 7 > 4, low=5   (komparasi #1)
mid=6, A[mid]=5  -> 7 > 5, low=7   (komparasi #2)
mid=7, A[mid]=5  -> 7 > 5, low=8   (komparasi #3)
stop karena low == high
`}
        />

        <Callout type="tip" title="Jawaban Soal 1">
            Jawaban yang sesuai opsi adalah <strong>3</strong>.
        </Callout>
    </NoteSection>

    <NoteSection title="Soal 2 (Partisi QuickSort)">
        <p>
            Diberikan array <code>A[0..N-1] = [5,1,3,4,5,1,9,5,1]</code>,
            dengan <code>low</code> dan <code>high</code> sebagai indeks awal dan akhir,
            serta <code>px = 4</code> (hasil <code>selectPivot</code>).
        </p>
        <p>
            Setelah dilakukan partisi dengan acuan tersebut, isi array <code>A[]</code> menjadi apa?
        </p>

        <Callout type="info" title="Inti partisi">
            Nilai pivot adalah <code>A[4] = 5</code>. Elemen yang lebih kecil dari 5
            digeser ke sisi kiri, lalu pivot diposisikan pada batas kiri-kanan.
        </Callout>

        <p>
            Di soal ini, partisi yang dipakai adalah gaya <strong>Lomuto</strong> dengan
            asumsi pivot sempat dipindah ke posisi <code>low</code> lebih dulu. Artinya,
            kita hanya perlu satu kali pemindaian dari kiri ke kanan untuk memastikan
            semua elemen <code>&lt; pivot</code> berada di kiri, dan elemen <code>&gt;= pivot</code>
            tetap di kanan.
        </p>

        <Callout type="warning" title="Invariant yang dijaga">
            Selama pemindaian berjalan, bagian kiri boundary selalu berisi elemen
            yang sudah pasti lebih kecil dari pivot. Bagian tengah masih belum diputuskan,
            dan bagian kanan belum disentuh.
        </Callout>

        <CodeBlock
            language="python"
            filename="partition_lomuto.py"
            code={`def partition(arr, low, high, px):
    pivot = arr[px]
    arr[px], arr[low] = arr[low], arr[px]
    boundary = low

    for i in range(low + 1, high + 1):
        if arr[i] < pivot:
            boundary += 1
            arr[i], arr[boundary] = arr[boundary], arr[i]

    arr[low], arr[boundary] = arr[boundary], arr[low]
    return boundary`}
        />

        <CodeBlock
            language="text"
            filename="langkah_partisi_soal_2.txt"
            code={`Pivot = 5
Array awal = [5,1,3,4,5,1,9,5,1]

Langkah ringkas:
1) Pivot dipindah ke low, lalu boundary kecil dimulai dari kiri.
2) Baca 1 -> lebih kecil dari pivot, masuk ke sisi kiri.
3) Baca 3 -> lebih kecil dari pivot, tetap di sisi kiri.
4) Baca 4 -> lebih kecil dari pivot, tetap di sisi kiri.
5) Baca 5 -> tidak lebih kecil dari pivot, tetap di kanan.
6) Baca 1 -> lebih kecil dari pivot, ikut digeser ke kiri.
7) Baca 9 -> tetap di kanan.
8) Baca 5 -> tetap di kanan.
9) Baca 1 -> lebih kecil dari pivot, ikut ke kiri.

Setelah scan selesai, pivot ditukar ke posisi boundary.
Hasil akhir = [1,1,3,4,1,5,9,5,5]`}
        />

        <p>
            Kalau dilihat urutannya, sebenarnya yang penting bukan hanya hasil akhir,
            tetapi juga pola pemindahan elemen: setiap angka kecil selalu “menyusul” ke
            kiri boundary, sedangkan angka yang tidak lebih kecil dari pivot dibiarkan
            tetap di bagian kanan sampai scan selesai.
        </p>

        <CodeBlock
            language="text"
            filename="trace_soal_2.txt"
            code={`A awal: [5,1,3,4,5,1,9,5,1], pivot=5 (px=4)
setelah partisi: [1,1,3,4,1,5,9,5,5]
`}
        />

        <Callout type="tip" title="Jawaban Soal 2">
            Jawaban yang benar: <code>A = [1,1,3,4,1,5,9,5,5]</code>.
        </Callout>
    </NoteSection>

    <NoteSection title="Latihan Interaktif">
        <Quiz title="Mini Quiz Bedah Soal DnC" questions={dncQuiz} />
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
