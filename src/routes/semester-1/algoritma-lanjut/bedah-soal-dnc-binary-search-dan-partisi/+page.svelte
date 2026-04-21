<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import BinarySearchVisualizer from "./components/BinarySearchVisualizer.svelte";
    import PartitionVisualizer from "./components/PartitionVisualizer.svelte";

    const dncQuiz = [
   {
            question:
                "Soal 1: Untuk A = [1,1,1,3,4,5,5,5,9], target = 7, berapa jumlah komparasi data pada binary search (varian while low < high)?",
            options: ["2", "3", "4", "5", "8"],
            correctIndex: 1,
            explanation:
                "Jejak komparasi: A[4]=4, A[6]=5, A[7]=5. Setelah itu low=high=8 sehingga loop berhenti. Total komparasi data = 3."
        },
        {
            question:
                "Soal 2: Untuk array yang sama, jika target = 5, indeks akhir yang dikembalikan varian lower_bound (if target <= A[mid] then high = mid) adalah...",
            options: ["3", "4", "5", "6", "7"],
            correctIndex: 2,
            explanation:
                "Varian ini mencari posisi pertama dengan nilai >= target. Untuk target 5, indeks pertama bernilai 5 adalah 5."
        },
        {
            question:
                "Soal 3: Untuk A = [5,1,3,4,5,1,9,5,1] dengan px = 4, hasil array setelah partisi (pivot dipindah ke low, lalu skema < pivot) adalah...",
            options: [
                "[1,1,3,4,1,5,9,5,5]",
                "[5,1,3,4,1,1,9,5,5]",
                "[1,1,1,3,4,5,5,5,9]",
                "[1,1,3,1,4,5,9,5,5]",
                "[1,1,3,4,1,9,5,5,5]"
            ],
            correctIndex: 0,
            explanation:
                "Pivot = 5. Semua elemen < 5 dipindah ke kiri saat scanning, lalu pivot ditempatkan di batas akhirnya."
        },
        {
            question:
                "Soal 4: Pada proses partisi Soal 3, berapakah pivot_index final yang dikembalikan fungsi?",
            options: ["4", "5", "6", "7", "8"],
            correctIndex: 1,
            explanation:
                "Ada 5 elemen yang < 5, maka pivot ditempatkan di indeks 5 (0-based)."
        },
        {
            question:
                "Soal 5: Invariant yang benar untuk skema partisi ini saat iterasi j berjalan adalah...",
            options: [
                "A[low+1..i-1] < pivot dan A[i..j] >= pivot",
                "A[low+1..i-1] <= pivot dan A[i..j] > pivot",
                "A[low..i] selalu terurut naik",
                "A[j..high] semuanya < pivot",
                "Tidak ada invariant yang stabil"
            ],
            correctIndex: 0,
            explanation:
                "Pointer i menandai batas area elemen < pivot. Sementara area yang sudah discan tetapi belum dipindah (i..j) berisi elemen >= pivot."
        },
        {
            question:
                "Soal 6: Jika A = [5,5,5,5], low=0, high=3, px=2 dan kondisi partisi adalah arr[j] < pivot, maka pivot_index akhir adalah...",
            options: ["0", "1", "2", "3", "tidak terdefinisi"],
            correctIndex: 0,
            explanation:
                "Tidak ada elemen yang < pivot (semua sama dengan pivot), sehingga i tetap low+1 dan pivot_index = i-1 = low = 0."
        },
        {
            question:
                "Soal 7: Untuk N = 1.048.576 (2^20), jumlah komparasi maksimum binary search klasik (orde) mendekati...",
            options: ["20", "1.024", "1.048.576", "(1.048.576)^2", "2^40"],
            correctIndex: 0,
            explanation:
                "Karena kedalaman pencarian biner sekitar log2(N), maka log2(2^20)=20."
        },
        {
            question:
                "Soal 8: Dalam Quickselect, setelah partisi didapat pivot_index = 5. Untuk mencari elemen ke-kecil ke-3 (k=3, 0-based), rekursi berikutnya harus ke...",
            options: ["subarray kiri (low..4)", "subarray kanan (6..high)", "kedua sisi sekaligus", "berhenti karena selalu ketemu", "ulang partisi seluruh array dari awal"],
            correctIndex: 0,
            explanation:
                "Karena k=3 < pivot_index=5, elemen target pasti berada di sisi kiri partisi."
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

        <Callout type="info" title="Jawaban Soal 1">
            Jawaban yang sesuai opsi adalah <strong>3</strong>.
        </Callout>

        <Callout type="tip" title="Coba visualisasi langkahnya">
            Jalankan tombol <code>Next</code> untuk melihat jejak komparasi sampai kondisi
            <code>low == high</code>.
        </Callout>

        <BinarySearchVisualizer />

        <p>Versi kode Python untuk menghitung jumlah komparasi (sesuai varian soal):</p>
        <CodeBlock
            language="python"
            filename="binary_search_komparasi.py"
            code={`def binary_search_count(arr, target):
    low, high = 0, len(arr) - 1
    comparisons = 0

    # Varian sesuai bedah: loop berjalan selama low < high
    while low < high:
        mid = (low + high) // 2
        comparisons += 1

        if target <= arr[mid]:
            high = mid
        else:
            low = mid + 1

    return low, comparisons


A = [1, 1, 1, 3, 4, 5, 5, 5, 9]
target = 7
idx, comps = binary_search_count(A, target)
print("index akhir:", idx)         # 8
print("jumlah komparasi:", comps)  # 3`}
        />
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

        <CodeBlock
            language="text"
            filename="trace_soal_2.txt"
            code={`A awal: [5,1,3,4,5,1,9,5,1], pivot=5 (px=4)
setelah partisi: [1,1,3,4,1,5,9,5,5]
`}
        />

        <Callout type="info" title="Jawaban Soal 2">
            Jawaban yang benar: <code>A = [1,1,3,4,1,5,9,5,5]</code>.
        </Callout>

        <Callout type="tip" title="Coba visualisasi partisi">
            Tekan <code>Next</code> untuk melihat proses swap saat scanning dan swap pivot
            terakhir sampai hasil akhir array terbentuk.
        </Callout>

        <PartitionVisualizer />

        <p>Versi kode Python partisi (pivot dari <code>px</code>, lalu dipindah ke <code>low</code>):</p>
        <CodeBlock
            language="python"
            filename="partition_dengan_px.py"
            code={`def partition_with_px(arr, low, high, px):
    # 1) Pindahkan pivot terpilih ke posisi low
    arr[low], arr[px] = arr[px], arr[low]
    pivot = arr[low]

    # 2) Partisi elemen < pivot ke sisi kiri
    i = low + 1
    for j in range(low + 1, high + 1):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1

    # 3) Letakkan pivot di posisi final
    pivot_index = i - 1
    arr[low], arr[pivot_index] = arr[pivot_index], arr[low]
    return pivot_index


A = [5, 1, 3, 4, 5, 1, 9, 5, 1]
pi = partition_with_px(A, low=0, high=len(A) - 1, px=4)
print("pivot index:", pi)
print("hasil partisi:", A)  # [1, 1, 3, 4, 1, 5, 9, 5, 5]`}
        />
    </NoteSection>

    <NoteSection title="Latihan Singkat (Level Lanjut)">
        <p>
            Paket soal ini dibuat lebih menantang: mencakup trace langkah, invariant,
            analisis kasus duplikasi, kompleksitas, dan keputusan rekursi setelah partisi.
        </p>
        <Quiz title="Quiz DnC: Binary Search + Partisi" questions={dncQuiz} />
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
