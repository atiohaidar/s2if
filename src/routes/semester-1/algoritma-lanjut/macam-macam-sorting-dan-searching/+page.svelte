<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import InsertionSortAnimation from "./components/InsertionSortAnimation.svelte";
    import MergeSortAnimation from "./components/MergeSortAnimation.svelte";
    import QuickSortAnimation from "./components/QuickSortAnimation.svelte";
    import HeapSortAnimation from "./components/HeapSortAnimation.svelte";
    import CountingSortAnimation from "./components/CountingSortAnimation.svelte";

    const materiQuiz = [
        {
            question: "Pada selection sort, jumlah perbandingan utama untuk n elemen paling tepat adalah...",
            options: [
                "n",
                "n log n",
                "(n-1) + (n-2) + ... + 1",
                "2^n"
            ],
            correctIndex: 2,
            explanation: "Di tiap putaran i, kita scan sisa elemen untuk cari minimum, sehingga totalnya deret 1 sampai n-1."
        },
        {
            question: "Algoritma yang biasanya paling cocok untuk data kecil dan hampir terurut adalah...",
            options: ["Selection sort", "Insertion sort", "Heap sort", "Merge sort"],
            correctIndex: 1,
            explanation: "Insertion sort stabil dan performanya bagus untuk kasus nearly sorted."
        },
        {
            question: "Kalau data belum terurut, kapan binary search boleh dipakai?",
            options: [
                "Langsung dipakai kapan saja",
                "Setelah data diurutkan dulu",
                "Hanya saat n kecil",
                "Hanya untuk bilangan prima"
            ],
            correctIndex: 1,
            explanation: "Binary search butuh prasyarat data terurut. Kalau belum, harus sorting dulu atau pakai linear search."
        },
        {
            question: "Pada heap sort, operasi inti yang menjaga bentuk heap disebut...",
            options: ["partition", "heapify", "merge", "prefix sum"],
            correctIndex: 1,
            explanation: "Heap sort membangun max-heap lalu mempertahankan properti heap dengan heapify."
        }
    ];
</script>

<svelte:head>
    <title>Macam-Macam Sorting dan Searching - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi satu halaman tentang berbagai algoritma sorting dan searching: konsep, plus minus, kode Python, visualisasi langkah, dan cara memahami cepat."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Macam-Macam Sorting dan Searching"
        date="20 April 2026"
        status="done"
        tags={["DAL", "Sorting", "Searching", "Python"]}
    />

    <NoteSection title="Kenapa Topik Ini Penting?">
        <p>
            Di Desain Algoritma Lanjut, dua kemampuan dasar yang selalu muncul adalah
            <strong>mengurutkan data (sorting)</strong> dan <strong>mencari data (searching)</strong>.
            Banyak soal lanjutan sebenarnya gabungan dari dua hal ini.
        </p>
        <Callout type="info" title="Mindset cepat">
            Saat ketemu soal, tanyakan dulu: "Data perlu diurutkan dulu atau tidak?"
            Dari pertanyaan ini, kamu biasanya bisa memilih strategi utama dengan cepat.
        </Callout>
    </NoteSection>

    <NoteSection title="A. Sorting Dibahas Bertahap (Bukan Digabung)">
        <p>
            Mulai dari algoritma pertama dulu, paham cara kerja dan analisisnya,
            baru pindah ke algoritma berikutnya.
        </p>
        <Callout type="info" title="Alur belajar di halaman ini">
            Untuk setiap algoritma: konsep -> kelebihan/kekurangan -> kode Python ->
            contoh hasil -> kompleksitas + cara menurunkannya.
        </Callout>
    </NoteSection>

    <NoteSection title="1) Selection Sort">
        <p>
            <strong>Konsep:</strong> pada setiap posisi <code>i</code>, cari elemen
            minimum dari bagian kanan, lalu tukar ke posisi <code>i</code>.
        </p>
        <p><strong>Kelebihan:</strong></p>
        <ul>
            <li>Konsep sederhana dan mudah di-trace manual.</li>
            <li>Jumlah swap sedikit, maksimal satu swap per putaran.</li>
        </ul>
        <p><strong>Kekurangan:</strong></p>
        <ul>
            <li>Jumlah perbandingan tetap banyak walau data hampir terurut.</li>
            <li>Kompleksitas waktu tetap kuadratik untuk rata-rata dan worst case.</li>
        </ul>

        <CodeBlock
            language="python"
            filename="selection_sort.py"
            code={`def selection_sort(arr):
    a = arr[:]
    n = len(a)

    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        a[i], a[min_idx] = a[min_idx], a[i]

    return a`}
        />

        <CodeBlock
            language="text"
            filename="contoh_selection_sort.txt"
            code={`Input : [29, 10, 14, 37, 13]
Output: [10, 13, 14, 29, 37]

Trace singkat:
i=0 -> minimum di sisa array adalah 10 -> tukar dengan 29
i=1 -> minimum di sisa array adalah 13 -> tukar dengan 29
i=2 -> minimum di sisa array adalah 14 -> tetap
dst.`}
        />

        <p><strong>Kompleksitas Selection Sort:</strong></p>
        <ul>
            <li>Waktu best/average/worst: <code>O(n^2)</code>.</li>
            <li>Space: <code>O(1)</code> (in-place).</li>
        </ul>

        <p><strong>Cara mencari kompleksitasnya:</strong></p>
        <ol>
            <li>Loop luar berjalan dari <code>i = 0</code> sampai <code>n-2</code>.</li>
            <li>Loop dalam membandingkan elemen sisa: <code>n-1, n-2, ..., 1</code>.</li>
            <li>Total perbandingan: <code>(n-1)+(n-2)+...+1 = n(n-1)/2</code>.</li>
            <li>Abaikan konstanta dan suku kecil, hasil akhirnya <code>O(n^2)</code>.</li>
        </ol>
    </NoteSection>

    <NoteSection title="2) Bubble Sort">
        <p>
            <strong>Konsep:</strong> bandingkan elemen bersebelahan, tukar jika salah urut.
            Setelah satu pass, elemen terbesar "naik" ke ujung kanan.
        </p>
        <p><strong>Kelebihan:</strong> sangat mudah divisualisasikan untuk pemula.</p>
        <p><strong>Kekurangan:</strong> lambat untuk data besar karena banyak perbandingan dan swap.</p>

        <CodeBlock
            language="python"
            filename="bubble_sort.py"
            code={`def bubble_sort(arr):
    a = arr[:]
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`}
        />

        <CodeBlock
            language="text"
            filename="contoh_bubble_sort.txt"
            code={`Input : [5, 1, 4, 2]
Output: [1, 2, 4, 5]`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ul>
            <li>Worst/average: <code>O(n^2)</code> dari nested loop.</li>
            <li>Best: <code>O(n)</code> kalau pakai flag <code>swapped</code> dan data sudah urut.</li>
            <li>Space: <code>O(1)</code>.</li>
        </ul>
    </NoteSection>

    <NoteSection title="3) Insertion Sort">
        <p>
            <strong>Konsep:</strong> anggap bagian kiri sudah terurut, lalu sisipkan elemen
            berikutnya ke posisi yang tepat.
        </p>
        <p><strong>Kelebihan:</strong> bagus untuk data kecil dan hampir terurut, stabil.</p>
        <p><strong>Kekurangan:</strong> pada data acak besar tetap kuadratik.</p>

        <p><strong>Simulasi Visual:</strong></p>
        <InsertionSortAnimation />

        <CodeBlock
            language="python"
            filename="insertion_sort.py"
            code={`def insertion_sort(arr):
    a = arr[:]
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`}
        />

        <CodeBlock
            language="text"
            filename="contoh_insertion_sort.txt"
            code={`Input : [12, 11, 13, 5, 6]
Output: [5, 6, 11, 12, 13]`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ul>
            <li>Best: <code>O(n)</code> saat array sudah terurut (shift hampir tidak ada).</li>
            <li>Average/worst: <code>O(n^2)</code> karena banyak pergeseran pada while.</li>
            <li>Space: <code>O(1)</code>.</li>
        </ul>
    </NoteSection>

    <NoteSection title="4) Merge Sort">
        <p>
            <strong>Konsep:</strong> bagi array jadi dua bagian sampai elemen tunggal,
            lalu gabungkan kembali secara terurut (divide and conquer).
        </p>
        <p><strong>Kelebihan:</strong> performa konsisten <code>O(n log n)</code>, stabil.</p>
        <p><strong>Kekurangan:</strong> butuh memori tambahan untuk proses merge.</p>

        <p><strong>Simulasi Visual:</strong></p>
        <MergeSortAnimation />

        <CodeBlock
            language="python"
            filename="merge_sort.py"
            code={`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    # Looping utama berhenti jika SALAH SATU array habis duluan.
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Tim penyapu bersih: Memasukkan sisa elemen yang belum terambil
    # (Hanya salah satu dari while ini yang akan berjalan)
    while i < len(left):
        result.append(left[i])
        i += 1

    while j < len(right):
        result.append(right[j])
        j += 1

    return result`}
        />

        <Callout type="info" title="Kenapa ada dua while tambahan di akhir?">
            Looping utama <code>while i &lt; len(left) and j &lt; len(right)</code> akan langsung berhenti ketika salah satu blok (Kiri atau Kanan) habis dimasukkan ke <code>result</code>. Ini menyebabkan blok lawannya mungkin masih memiliki sisa elemen yang <strong>tertinggal</strong>. Dua looping tambahan di bagian akhir bertugas menyapu bersih sisa elemen tersebut agar tidak ada data yang hilang!
        </Callout>

        <Callout type="tip" title="Bagaimana array Kiri dan Kanan dipastikan selalu terurut?">
            Fungsi <code>merge</code> mensyaratkan kedua array input sudah terurut. Lalu bagaimana cara memastikannya? Algoritma ini membelah array terus-menerus sampai ukurannya tersisa <strong>1 elemen</strong> (<code>if len(arr) &lt;= 1</code>). Secara logika, array berisi 1 elemen sudah pasti terurut sempurna! Dari kepingan-kepingan terkecil inilah proses penggabungan bergerak mundur perlahan ke atas menjadi ukuran 2, 4, 8, dan seterusnya.
        </Callout>

        <CodeBlock
            language="text"
            filename="contoh_merge_sort.txt"
            code={`Input : [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ol>
            <li>Pembagian masalah terjadi sekitar <code>log n</code> level.</li>
            <li>Di setiap level, total kerja merging tetap sekitar <code>n</code>.</li>
            <li>Total: <code>n * log n</code> sehingga <code>O(n log n)</code>.</li>
            <li>Space tambahan: <code>O(n)</code>.</li>
        </ol>
    </NoteSection>

    <NoteSection title="5) Quick Sort">
        <p>
            <strong>Konsep:</strong> pilih pivot, partisi elemen kecil di kiri dan besar di kanan,
            lalu rekursif ke dua sisi.
        </p>
        <p><strong>Kelebihan:</strong> sangat cepat di praktik rata-rata, in-place.</p>
        <p><strong>Kekurangan:</strong> jika pivot buruk berulang, bisa turun ke <code>O(n^2)</code>.</p>

        <p><strong>Simulasi Visual:</strong></p>
        <QuickSortAnimation />

        <CodeBlock
            language="python"
            filename="quick_sort.py"
            code={`def quick_sort(arr):
    a = arr[:]
    _quick_sort(a, 0, len(a) - 1)
    return a


def _quick_sort(a, low, high):
    if low < high:
        p = partition(a, low, high)
        _quick_sort(a, low, p - 1)
        _quick_sort(a, p + 1, high)


def partition(a, low, high):
    pivot = a[high]
    i = low - 1
    for j in range(low, high):
        if a[j] <= pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[high] = a[high], a[i + 1]
    return i + 1`}
        />

        <CodeBlock
            language="text"
            filename="contoh_quick_sort.txt"
            code={`Input : [10, 7, 8, 9, 1, 5]
Output: [1, 5, 7, 8, 9, 10]`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ul>
            <li>Average/best: <code>O(n log n)</code> (partisi relatif seimbang).</li>
            <li>Worst: <code>O(n^2)</code> (partisi sangat tidak seimbang).</li>
            <li>Space stack rekursi: rata-rata <code>O(log n)</code>.</li>
        </ul>
    </NoteSection>

    <NoteSection title="6) Heap Sort">
        <p>
            <strong>Konsep:</strong> ubah array menjadi <strong>max-heap</strong>, lalu
            tukar root (terbesar) ke belakang array secara bertahap.
        </p>
        <p><strong>Kelebihan:</strong> worst case tetap <code>O(n log n)</code> dan in-place.</p>
        <p><strong>Kekurangan:</strong> tidak stabil, dan biasanya lebih sulit dipahami dari merge sort.</p>

        <p><strong>Simulasi Visual:</strong></p>
        <HeapSortAnimation />

        <CodeBlock
            language="python"
            filename="heap_sort.py"
            code={`def heap_sort(arr):
    a = arr[:]
    n = len(a)

    for i in range(n // 2 - 1, -1, -1):
        heapify(a, n, i)

    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        heapify(a, end, 0)

    return a


def heapify(a, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and a[left] > a[largest]:
        largest = left
    if right < n and a[right] > a[largest]:
        largest = right

    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        heapify(a, n, largest)`}
        />

        <CodeBlock
            language="text"
            filename="contoh_heap_sort.txt"
            code={`Input : [12, 11, 13, 5, 6, 7]
Output: [5, 6, 7, 11, 12, 13]`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ol>
            <li>Build heap memerlukan waktu linear <code>O(n)</code>.</li>
            <li>Ekstraksi elemen terbesar dilakukan <code>n-1</code> kali.</li>
            <li>Setiap heapify setelah ekstraksi sekitar <code>O(log n)</code>.</li>
            <li>Total dominan: <code>O(n log n)</code>, space tambahan <code>O(1)</code>.</li>
        </ol>
    </NoteSection>

    <NoteSection title="7) Counting Sort">
        <p>
            <strong>Konsep:</strong> hitung frekuensi setiap nilai, lalu bangun ulang array
            berdasarkan jumlah kemunculan nilai tersebut.
        </p>
        <p><strong>Kelebihan:</strong> sangat cepat jika rentang nilai kecil dan diskrit.</p>
        <p><strong>Kekurangan:</strong> kurang cocok jika rentang nilai sangat besar.</p>

        <p><strong>Simulasi Visual:</strong></p>
        <CountingSortAnimation />

        <CodeBlock
            language="python"
            filename="counting_sort.py"
            code={`def counting_sort(arr):
    if not arr:
        return []

    max_val = max(arr)
    count = [0] * (max_val + 1)

    for x in arr:
        count[x] += 1

    output = []
    for value, freq in enumerate(count):
        output.extend([value] * freq)

    return output`}
        />

        <CodeBlock
            language="text"
            filename="contoh_counting_sort.txt"
            code={`Input : [4, 2, 2, 8, 3, 3, 1]
Output: [1, 2, 2, 3, 3, 4, 8]`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ul>
            <li>Hitung frekuensi: <code>O(n)</code>.</li>
            <li>Bangun output dari array count ukuran <code>k</code>: <code>O(k)</code>.</li>
            <li>Total: <code>O(n + k)</code> dengan space <code>O(k)</code>.</li>
        </ul>
        <Callout type="warning" title="Catatan penting">
            Counting sort hanya efektif saat domain data kecil/terbatas. Kalau nilai bisa sangat besar,
            memori count bisa boros.
        </Callout>
    </NoteSection>

    <NoteSection title="Ringkas Pemilihan Sorting">
        <ul>
            <li>Ingin paling mudah dipahami dulu: mulai dari Selection/Bubble.</li>
            <li>Data kecil atau hampir urut: Insertion.</li>
            <li>Performa konsisten: Merge.</li>
            <li>Cepat rata-rata dan in-place: Quick.</li>
            <li>Butuh worst case terjaga tanpa ekstra array besar: Heap.</li>
            <li>Domain nilai kecil dan diskrit: Counting.</li>
        </ul>
    </NoteSection>

    <NoteSection title="B. Searching Dibahas Bertahap">
        <p>
            Sama seperti sorting, searching juga dipahami satu per satu biar
            kebayang kapan dipakai.
        </p>
    </NoteSection>

    <NoteSection title="1) Linear Search">
        <p>
            <strong>Konsep:</strong> cek elemen dari kiri ke kanan sampai target ketemu
            atau data habis.
        </p>
        <p><strong>Kelebihan:</strong> tidak butuh data terurut.</p>
        <p><strong>Kekurangan:</strong> lambat untuk data besar.</p>

        <CodeBlock
            language="python"
            filename="linear_search.py"
            code={`def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1`}
        />

        <CodeBlock
            language="text"
            filename="contoh_linear_search.txt"
            code={`Input : arr=[4, 1, 7, 3], target=7
Output: 2`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ul>
            <li>Worst: cek semua elemen -> <code>O(n)</code>.</li>
            <li>Best: target di awal -> <code>O(1)</code>.</li>
            <li>Space: <code>O(1)</code>.</li>
        </ul>
    </NoteSection>

    <NoteSection title="2) Binary Search">
        <p>
            <strong>Konsep:</strong> bandingkan target dengan elemen tengah,
            lalu buang setengah ruang pencarian tiap langkah.
        </p>
        <p><strong>Syarat wajib:</strong> data harus sudah terurut.</p>
        <p><strong>Kelebihan:</strong> sangat cepat untuk data terurut.</p>
        <p><strong>Kekurangan:</strong> tidak bisa langsung dipakai di data acak.</p>

        <CodeBlock
            language="python"
            filename="binary_search.py"
            code={`def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1`}
        />

        <CodeBlock
            language="text"
            filename="contoh_binary_search.txt"
            code={`Input : arr=[2, 5, 8, 12, 16, 23, 38], target=16
Output: 4

Cara jalan:
mid=12 -> kanan
mid=23 -> kiri
ketemu 16`}
        />

        <p><strong>Kompleksitas dan cara mencari:</strong></p>
        <ol>
            <li>Setiap langkah ruang pencarian dibagi dua.</li>
            <li>Banyak langkah yang dibutuhkan adalah berapa kali n bisa dibagi 2 sampai 1.</li>
            <li>Itu sama dengan <code>log_2 n</code> sehingga waktunya <code>O(log n)</code>.</li>
        </ol>
    </NoteSection>

    <NoteSection title="Cara Memahami Materi Ini Biar Nempel">
        <ol>
            <li>Ambil satu algoritma dulu, jangan lompat-lompat.</li>
            <li>Untuk tiap algoritma, tulis 5 hal: konsep, plus-minus, kode, contoh hasil, kompleksitas.</li>
            <li>Trace manual minimal 1 contoh sampai benar-benar paham.</li>
            <li>Baru lanjut ke algoritma berikutnya dengan pola yang sama.</li>
            <li>Biasakan menurunkan kompleksitas dari jumlah operasi, bukan menghafal.</li>
        </ol>

        <Callout type="tip" title="Template analisis saat ujian">
            Tulis cepat dalam 4 baris: tujuan, syarat data, algoritma yang dipilih, alasan kompleksitas.
        </Callout>
    </NoteSection>

    <NoteSection title="Ringkasan Cepat">
        <ul>
            <li>Sorting menyusun data; searching mencari target.</li>
            <li>Selection sort cocok jadi pintu masuk untuk memahami logika sorting bertahap.</li>
            <li>Kompleksitas bisa dicari dari hitungan operasi per loop/level, bukan tebak.</li>
            <li>Setelah satu algoritma matang, baru lanjut algoritma berikutnya.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Latihan Singkat">
        <Quiz questions={materiQuiz} />
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Desain Algoritma Lanjut"
    />
</article>

<style></style>
