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
    import QuickSortHoareAnimation from "./components/QuickSortHoareAnimation.svelte";
    import HeapSortAnimation from "./components/HeapSortAnimation.svelte";
    import CountingSortAnimation from "./components/CountingSortAnimation.svelte";
    import SelectionSortAnimation from "./components/SelectionSortAnimation.svelte";
    import BubbleSortAnimation from "./components/BubbleSortAnimation.svelte";

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

        <p><strong>Simulasi Visual:</strong></p>
        <SelectionSortAnimation />

        <CodeBlock
            language="text"
            filename="selection_sort.txt"
            code={`Kamus:
    n, i, j, min_idx, temp : integer
    arr : array [0..N-1] of integer

Algoritma:
    n <- length(arr)
    for i <- 0 to n - 2 do
        min_idx <- i
        for j <- i + 1 to n - 1 do
            if arr[j] < arr[min_idx] then
                min_idx <- j
            end if
        end for
        
        temp <- arr[i]
        arr[i] <- arr[min_idx]
        arr[min_idx] <- temp
    end for`}
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

        <p><strong>Simulasi Visual:</strong></p>
        <BubbleSortAnimation />

        <CodeBlock
            language="text"
            filename="bubble_sort.txt"
            code={`Kamus:
    n, i, j, temp : integer
    swapped : boolean
    arr : array [0..N-1] of integer

Algoritma:
    n <- length(arr)
    for i <- 0 to n - 1 do
        swapped <- false
        for j <- 0 to n - i - 2 do
            if arr[j] > arr[j + 1] then
                temp <- arr[j]
                arr[j] <- arr[j + 1]
                arr[j + 1] <- temp
                swapped <- true
            end if
        end for
        
        if not swapped then
            break
        end if
    end for`}
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
            language="text"
            filename="insertion_sort.txt"
            code={`Kamus:
    n, i, j, key : integer
    arr : array [0..N-1] of integer

Algoritma:
    n <- length(arr)
    for i <- 1 to n - 1 do
        key <- arr[i]
        j <- i - 1
        
        while (j >= 0) and (arr[j] > key) do
            arr[j + 1] <- arr[j]
            j <- j - 1
        end while
        
        arr[j + 1] <- key
    end for`}
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
            language="text"
            filename="merge_sort.txt"
            code={`Kamus:
    mid, i, j, k : integer
    left, right, result : array of integer

Algoritma function merge_sort(arr) -> array:
    if length(arr) <= 1 then
        return arr
    end if

    mid <- length(arr) div 2
    left <- merge_sort(arr[0 .. mid-1])
    right <- merge_sort(arr[mid .. length(arr)-1])
    return merge(left, right)

Algoritma function merge(left, right) -> array:
    i <- 0; j <- 0; k <- 0
    result <- array kosong berukuran length(left) + length(right)
    
    while (i < length(left)) and (j < length(right)) do
        if left[i] <= right[j] then
            result[k] <- left[i]
            i <- i + 1
        else
            result[k] <- right[j]
            j <- j + 1
        end if
        k <- k + 1
    end while

    // Tim penyapu bersih sisa elemen
    while i < length(left) do
        result[k] <- left[i]
        i <- i + 1; k <- k + 1
    end while

    while j < length(right) do
        result[k] <- right[j]
        j <- j + 1; k <- k + 1
    end while

    return result`}
        />

        <Callout type="info" title="Kenapa ada dua while tambahan di akhir?">
            Looping utama <code>while i &lt; len(left) and j &lt; len(right)</code> akan langsung berhenti ketika salah satu blok (Kiri atau Kanan) habis dimasukkan ke <code>result</code>. Ini menyebabkan blok lawannya mungkin masih memiliki sisa elemen yang <strong>tertinggal</strong>. Dua looping tambahan di bagian akhir bertugas menyapu bersih sisa elemen tersebut agar tidak ada data yang hilang!
        </Callout>

        <Callout type="tip" title="Bagaimana array Kiri dan Kanan dipastikan selalu terurut?">
            Fungsi <code>merge</code> mensyaratkan kedua array input sudah terurut. Lalu bagaimana cara memastikannya? Algoritma ini membelah array terus-menerus sampai ukurannya tersisa <strong>1 elemen</strong> (<code>if len(arr) &lt;= 1</code>). Secara logika, array berisi 1 elemen sudah pasti terurut sempurna! Dari kepingan-kepingan terkecil inilah proses penggabungan bergerak mundur perlahan ke atas menjadi ukuran 2, 4, 8, dan seterusnya.
        </Callout>

        <Callout type="info" title="Rahasia Kecepatan: Apa untungnya menggabungkan array yang sudah terurut?">
            Keuntungannya luar biasa besar pada efisiensi jumlah perbandingan.<br/><br/>
            Bayangkan dua barisan angka <strong>acak</strong>: <code>[18, 15, 17]</code> dan <code>[16, 19, 11]</code>. Untuk mencari nilai terkecil dan menyusun ulang keduanya, kita harus mengecek semua angka berulang kali karena nilai terkecil bisa bersembunyi di posisi manapun. Ini sangat lambat dan memakan waktu <code>O(N²)</code>.<br/><br/>
            Tapi, bayangkan jika kelompoknya <strong>sudah terurut</strong>: <code>[15, 17, 18]</code> dan <code>[11, 16, 19]</code>. Karena sudah terurut, kita <strong>pasti tahu</strong> bahwa elemen terkecil masing-masing kelompok ada di posisi paling depan! Kita cukup membandingkan yang terdepan saja (<code>15 vs 11</code>). Ambil yang terkecil (11), lalu lanjut membandingkan pemenang selanjutnya (<code>15 vs 16</code>). Karena kita hanya melirik setiap elemen bergeser maju tepat <strong>satu kali</strong>, proses penggabungan ini menjadi sangat cepat <code>O(N)</code>. Itulah rahasia ajaib dibalik Divide and Conquer!
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

    <NoteSection title="5A) Quick Sort (Lomuto Partition)">
        <p>
            <strong>Konsep:</strong> pilih pivot (biasanya ujung kanan), partisi elemen kecil ke kiri,
            dengan pointer pencari (j) bergerak searah dari kiri ke kanan.
        </p>
        <p><strong>Kelebihan:</strong> sangat cepat di praktik rata-rata, in-place.</p>
        <p><strong>Kekurangan:</strong> jika pivot buruk berulang, bisa turun ke <code>O(n^2)</code>.</p>

        <p><strong>Simulasi Visual:</strong></p>
        <QuickSortAnimation />

        <CodeBlock
            language="text"
            filename="quick_sort_lomuto.txt"
            code={`Kamus Utama:
    data : array of integer
    n : integer

Algoritma Utama:
    data <- [10, 7, 8, 9, 1, 5]
    n <- length(data)
    quick_sort(data, 0, n - 1)

Kamus Prosedur/Fungsi:
    low, high, p, pivot, i, j, temp : integer

Algoritma procedure quick_sort(a, low, high):
    if low < high then
        p <- partition(a, low, high)
        quick_sort(a, low, p - 1)
        quick_sort(a, p + 1, high)
    end if

Algoritma function partition(a, low, high) -> integer:
    pivot <- a[high]
    i <- low - 1
    
    for j <- low to high - 1 do
        if a[j] <= pivot then
            i <- i + 1
            temp <- a[i]; a[i] <- a[j]; a[j] <- temp
        end if
    end for
    
    temp <- a[i + 1]; a[i + 1] <- a[high]; a[high] <- temp
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

    <NoteSection title="5B) Quick Sort (Hoare Partition)">
        <p>
            <strong>Konsep:</strong> Menggunakan teknik partisi dua arah. Memiliki pointer di kiri dan kanan yang bergerak ke tengah. Lebih efisien dalam jumlah pertukaran (swap) dibanding Lomuto, sehingga sering digunakan di implementasi standar dan diajarkan di kelas kampus lanjutan.
        </p>

        <p><strong>Simulasi Visual:</strong></p>
        <QuickSortHoareAnimation />

        <CodeBlock
            language="text"
            filename="quick_sort_hoare.txt"
            code={`Kamus Utama:
    data : array of integer
    n : integer

Algoritma Utama:
    data <- [10, 7, 8, 9, 1, 5]
    n <- length(data)
    quick_sort_hoare(data, 0, n - 1)

Kamus Prosedur/Fungsi:
    low, high, p, pivot, l, r, temp : integer

Algoritma procedure quick_sort_hoare(a, low, high):
    if low < high then
        p <- partition_hoare(a, low, high)
        quick_sort_hoare(a, low, p - 1)
        quick_sort_hoare(a, p + 1, high)
    end if

Algoritma function partition_hoare(a, low, high) -> integer:
    pivot <- a[low]
    l <- low + 1
    r <- high
    
    while true do
        while (l <= r) and (a[l] <= pivot) do
            l <- l + 1
        end while
        
        while (l <= r) and (a[r] > pivot) do
            r <- r - 1
        end while
        
        if l <= r then
            temp <- a[l]; a[l] <- a[r]; a[r] <- temp
            l <- l + 1
            r <- r - 1
        else
            break
        end if
    end while
    
    temp <- a[low]; a[low] <- a[r]; a[r] <- temp
    return r`}
        />

        <Callout type="info" title="Analogi Hoare Partition: Dua Satpam Saling Mendekat">
            Bayangkan ada dua satpam. Satpam Kiri (<code>l</code>) jalan pelan ke kanan bertugas menahan <strong>"angka yang salah baris karena terlalu besar"</strong>. Satpam Kanan (<code>r</code>) jalan pelan ke kiri menahan <strong>"angka yang salah baris karena terlalu kecil"</strong>.<br/><br/>
            Ketika Satpam Kiri menemukan angka besar, dia berhenti. Dia menunggu sampai Satpam Kanan juga menemukan angka kecil. Saat dua-duanya sudah menemukan "pelanggar", mereka saling melempar/menukar silang angka tersebut! Proses ini diulang terus sampai kedua satpam bertemu/bersilangan di tengah lapangan. Di titik pertemuan itulah sang Pivot (Patokan) akhirnya ditempatkan!
        </Callout>
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
            language="text"
            filename="heap_sort.txt"
            code={`Kamus:
    n, i, end, largest, left, right, temp : integer

Algoritma procedure heap_sort(a):
    n <- length(a)

    for i <- (n div 2) - 1 down to 0 do
        heapify(a, n, i)
    end for

    for end <- n - 1 down to 1 do
        temp <- a[0]; a[0] <- a[end]; a[end] <- temp
        heapify(a, end, 0)
    end for

Algoritma procedure heapify(a, n, i):
    largest <- i
    left <- 2 * i + 1
    right <- 2 * i + 2

    if (left < n) and (a[left] > a[largest]) then
        largest <- left
    end if
    if (right < n) and (a[right] > a[largest]) then
        largest <- right
    end if

    if largest != i then
        temp <- a[i]; a[i] <- a[largest]; a[largest] <- temp
        heapify(a, n, largest)
    end if`}
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
            language="text"
            filename="counting_sort.txt"
            code={`Kamus:
    max_val, i, j, k : integer
    count, output : array of integer

Algoritma function counting_sort(arr) -> array:
    if length(arr) = 0 then
        return arr
    end if

    max_val <- cari nilai maksimum di arr
    count <- array of integer ukuran max_val + 1, diisi 0
    
    for i <- 0 to length(arr) - 1 do
        count[arr[i]] <- count[arr[i]] + 1
    end for

    output <- array kosong
    k <- 0
    for i <- 0 to max_val do
        for j <- 1 to count[i] do
            output[k] <- i
            k <- k + 1
        end for
    end for

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
            language="text"
            filename="linear_search.txt"
            code={`Kamus:
    i, target : integer
    arr : array of integer

Algoritma function linear_search(arr, target) -> integer:
    for i <- 0 to length(arr) - 1 do
        if arr[i] = target then
            return i
        end if
    end for
    
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
            language="text"
            filename="binary_search.txt"
            code={`Kamus:
    low, high, mid, target : integer
    arr : array of integer

Algoritma function binary_search(arr, target) -> integer:
    low <- 0
    high <- length(arr) - 1

    while low <= high do
        mid <- (low + high) div 2
        if arr[mid] = target then
            return mid
        else if arr[mid] < target then
            low <- mid + 1
        else
            high <- mid - 1
        end if
    end while

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
