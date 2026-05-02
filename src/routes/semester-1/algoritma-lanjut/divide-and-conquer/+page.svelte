<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import QuickSortVisualizer from "./components/QuickSortVisualizer.svelte";
    import BinarySearchAnimation from "./components/BinarySearchAnimation.svelte";

    const week5Quiz = [
        {
            question: "Kapan pruning paling efektif dipakai?",
            options: [
                "Saat semua cabang harus dievaluasi penuh",
                "Saat ada batas (bound) untuk membuang cabang yang pasti buruk",
                "Saat data tidak terurut",
                "Saat tujuan hanya menghitung total elemen"
            ],
            correctIndex: 1,
            explanation:
                "Pruning efektif ketika kita punya informasi batas yang membuat suatu cabang dipastikan tidak bisa mengalahkan solusi terbaik saat ini."
        },
        {
            question: "Kompleksitas umum Divide and Conquer pada merge sort dan quicksort (rata-rata) adalah...",
            options: ["O(log N)", "O(N)", "O(N log N)", "O(N^2)"],
            correctIndex: 2,
            explanation:
                "Keduanya menggabungkan proses membagi masalah dan menyelesaikan sub-masalah sehingga rata-rata berada di O(N log N)."
        }
    ];

    const binaryExpansionLatex = String.raw`\begin{aligned}
T(n) &= T\left(\frac{n}{2}\right)+c\\
&= T\left(\frac{n}{4}\right)+2c\\
&= T\left(\frac{n}{8}\right)+3c\\
&= \dots
\end{aligned}`;
</script>

<svelte:head>
    <title>DnC dan Pemangkasan - S2IF Notebook</title>
    <meta
        name="description"
        content="Ringkasan Desain Algoritma Lanjut: Divide and Conquer, Pruning, aplikasi industri, dan implementasi dasar."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Divide and Conquer & Pemangkasan"
        date="09 April 2026"
        status="todo"
        tags={["DAL", "DnC", "Pruning"]}
    />

    <NoteSection title="Inti Materi">
        <p>
            Fokus materi ini adalah dua strategi untuk mengurangi biaya komputasi:
            <span class="highlight">Divide and Conquer (DnC)</span> dan
            <span class="highlight">Pruning</span>.
        </p>
        <ul>
            <li>
                <strong>DnC</strong>: pecah masalah besar menjadi sub-masalah kecil,
                selesaikan, lalu gabungkan hasilnya.
            </li>
            <li>
                <strong>Pruning</strong>: hentikan eksplorasi cabang yang pasti tidak
                menghasilkan solusi lebih baik.
            </li>
        </ul>

        <Callout type="tip" title="Cara berpikir cepat">
            Tanyakan di setiap langkah: "Bisakah cabang ini saya buang sekarang tanpa
            mengubah jawaban optimal?" Jika bisa, itu kandidat pruning.
        </Callout>
        <Callout type="info" title="Cakupan yang disesuaikan dengan diktat">
            Halaman ini sekarang mencakup: Pendahuluan, QuickSort, analisis
            kompleksitas, QuickSelect, Binary Search (boundary + solution space),
            Binary Exponentiation, dan latihan.
        </Callout>
    </NoteSection>

    <NoteSection title="Kenapa Strategi Ini Penting?">
        <p>
            Jika tiap langkah berhasil memangkas ruang pencarian secara signifikan,
            kompleksitas bisa turun drastis. Contoh klasik adalah binary search yang
            memotong ruang pencarian menjadi setengah di tiap iterasi.
        </p>
        <p>
            Di banyak kasus nyata, perbedaan antara algoritma naif dan algoritma yang
            memakai DnC/pruning bisa menjadi pembeda antara sistem yang layak pakai dan
            yang terlalu lambat.
        </p>
    </NoteSection>

    <NoteSection title="QuickSort: Ide Partisi (Sesuai Diktat)">
        <p>
            QuickSort bekerja dengan memilih <strong>pivot</strong>, lalu menata ulang
            data agar elemen kecil berada di kiri pivot dan elemen besar di kanan pivot.
            Setelah itu, dua sisi diproses rekursif.
        </p>
        <Callout type="info" title="Coba interaktif!">
            Visualisasi di bawah ini membantu memahami bagaimana partition bekerja:
            tekan tombol "Next Step" untuk lihat setiap langkah movement pointer dan
            swapping elemen.
        </Callout>
        <QuickSortVisualizer />
        <CodeBlock
            language="text"
            filename="quicksort_partition.txt"
            code={`Kamus:
    arr : array of integer
    low, high, i, j, pivot, pi, temp : integer

Algoritma function partition(arr, low, high) -> integer:
    pivot <- arr[high]
    i <- low - 1

    for j <- low to high - 1 do
        if arr[j] <= pivot then
            i <- i + 1
            temp <- arr[i]; arr[i] <- arr[j]; arr[j] <- temp
        end if
    end for

    temp <- arr[i + 1]; arr[i + 1] <- arr[high]; arr[high] <- temp
    return i + 1

Algoritma procedure quicksort(arr, low, high):
    if low < high then
        pi <- partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)
    end if`}
        />
        <p>
            Inti invariant-nya: setelah partisi selesai, posisi pivot sudah final untuk
            satu langkah rekursi tersebut.
        </p>
    </NoteSection>

    <NoteSection title="Analisis QuickSort: Best, Average, Worst">
        <p>Ringkasannya:</p>
        <ul>
            <li>
                <strong>Best case</strong>: partisi seimbang, kompleksitas
                <MathBlock displayMode={false} latex={"O(n\\log n)"} />.
            </li>
            <li>
                <strong>Average case</strong>: umumnya mendekati
                <MathBlock displayMode={false} latex={"O(n\\log n)"} />.
            </li>
            <li>
                <strong>Worst case</strong>: partisi sangat timpang terus-menerus,
                kompleksitas
                <MathBlock displayMode={false} latex={"O(n^2)"} />.
            </li>
        </ul>
        <Callout type="warning" title="Kapan worst case sering muncul?">
            Saat pivot dipilih buruk berulang kali, misalnya data hampir terurut dan
            pivot selalu di ujung.
        </Callout>
    </NoteSection>

    <NoteSection title="Rumus Umum Divide and Conquer (Pengayaan)">
        <p>
            Banyak algoritma DnC bisa dimodelkan dengan recurrence berikut:
        </p>
        <MathBlock latex={"T(n)=aT\\left(\\frac{n}{b}\\right)+f(n)"} />
        <p>
            Dengan: <code>a</code> = jumlah subproblem, <code>b</code> = faktor
            pembagian ukuran input, dan <code>f(n)</code> = biaya divide + combine
            pada level tersebut.
        </p>
        <p>
            Untuk menganalisis cepat, gunakan Master Theorem (versi ringkas):
        </p>
        <ul>
            <li>
                Jika <code>f(n)</code> lebih kecil dari <code>n^(log_b(a))</code>, maka
                <MathBlock
                    displayMode={false}
                    latex={"T(n)=\\Theta\\left(n^{\\log_b a}\\right)"}
                />.
            </li>
            <li>
                Jika <code>f(n)</code> seorde dengan <code>n^(log_b(a))</code>, maka
                <MathBlock
                    displayMode={false}
                    latex={"T(n)=\\Theta\\left(n^{\\log_b a}\\log n\\right)"}
                />.
            </li>
            <li>
                Jika <code>f(n)</code> lebih besar dari <code>n^(log_b(a))</code> dan
                regularity condition terpenuhi, maka
                <MathBlock displayMode={false} latex={"T(n)=\\Theta(f(n))"} />.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Contoh Hitung 1: Binary Search (Pruning)">
        <MathBlock latex={"T(n)=T\\left(\\frac{n}{2}\\right)+O(1)"} />
        <p>Ekspansi recurrence:</p>
        <MathBlock latex={binaryExpansionLatex} />
        <p>
            Berhenti saat ukuran subproblem jadi 1:
        </p>
        <MathBlock latex={"\\frac{n}{2^k}=1 \\Rightarrow k=\\log_2 n"} />
        <MathBlock latex={"T(n)=O(\\log n)"} />
        <p>
            Ini menjelaskan kenapa binary search sangat cepat untuk data terurut:
            setiap langkah memangkas setengah ruang pencarian.
        </p>
    </NoteSection>

    <NoteSection title="Contoh Hitung 2: Merge Sort (DnC)">
        <MathBlock latex={"T(n)=2T\\left(\\frac{n}{2}\\right)+O(n)"} />
        <p>Parameter Master Theorem:</p>
        <MathBlock latex={"a=2,\\ b=2,\\ n^{\\log_b a}=n^{\\log_2 2}=n"} />
        <MathBlock latex={"f(n)=n"} />
        <p>Karena orde sama, hasil akhirnya:</p>
        <MathBlock latex={"T(n)=\\Theta(n\\log n)"} />
        <p>
            Intuisinya: ada <code>log n</code> level pembelahan, dan tiap level total
            kerja merge sekitar <code>n</code>.
        </p>
    </NoteSection>

    <NoteSection title="Contoh Implementasi Pruning: Binary Search">
        <CodeBlock
            language="text"
            filename="binary_search.txt"
            code={`Kamus:
    arr : array of integer
    target, left, right, mid : integer

Algoritma function binary_search(arr, target) -> integer:
    left <- 0
    right <- length(arr) - 1

    while left <= right do
        mid <- (left + right) div 2

        if arr[mid] = target then
            return mid
        end if
        if arr[mid] < target then
            left <- mid + 1
        else
            right <- mid - 1
        end if
    end while

    return -1`}
        />
        <p>
            Pada setiap iterasi, setengah ruang pencarian langsung dibuang. Ini adalah
            bentuk pruning paling sederhana dan sangat efektif.
        </p>

        <Callout type="tip" title="Coba Interaktif!">
            Pilih angka target, lalu klik Next untuk lihat bagaimana elemen yang tidak mungkin berisi jawaban langsung dibuang (pruning) setiap langkah.
        </Callout>

        <BinarySearchAnimation />
    </NoteSection>

    <NoteSection title="Contoh Implementasi DnC: Merge Sort">
        <CodeBlock
            language="text"
            filename="merge_sort.txt"
            code={`Kamus:
    arr, left, right, result : array of integer
    mid, i, j, k : integer

Algoritma function merge_sort(arr) -> array:
    if length(arr) <= 1 then
        return arr
    end if

    mid <- length(arr) div 2
    left <- merge_sort(arr[0..mid-1])
    right <- merge_sort(arr[mid..akhir])

    // Merge dua array terurut
    i <- 0; j <- 0; k <- 0
    result <- array kosong

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

    // Salin sisa elemen
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
        <p>
            Polanya jelas: divide (bagi array), conquer (urutkan rekursif), combine
            (merge dua hasil terurut).
        </p>
    </NoteSection>

    <NoteSection title="QuickSelect: Cari Median/Tertib-K Tanpa Sort Penuh">
        <p>
            QuickSelect adalah variasi QuickSort untuk mencari elemen ke-k. Bedanya,
            setelah partisi kita hanya masuk <strong>satu sisi</strong> yang masih
            mungkin berisi jawaban.
        </p>
        <CodeBlock
            language="text"
            filename="quickselect.txt"
            code={`Kamus:
    arr : array of integer
    low, high, k, pi : integer

Algoritma function quickselect(arr, low, high, k) -> integer:
    if low = high then
        return arr[low]
    end if

    pi <- partition(arr, low, high)

    if pi = k then
        return arr[pi]
    end if
    if k < pi then
        return quickselect(arr, low, pi - 1, k)
    end if
    return quickselect(arr, pi + 1, high, k)`}
        />
        <p>
            Intuisi biaya rata-rata:
        </p>
        <MathBlock latex={"T(n) \\approx n + \\frac{n}{2} + \\frac{n}{4} + \\cdots = O(n)"} />
        <p>
            Jadi rata-rata linear, walau worst case tetap bisa
            <MathBlock displayMode={false} latex={"O(n^2)"} />.
        </p>
    </NoteSection>

    <NoteSection title="Binary Search: Bukan Cuma Cari Angka">
        <p>
            Di diktat, binary search ditekankan sebagai teknik mencari
            <span class="highlight">batas transisi</span> pada fungsi monoton.
        </p>
        <ul>
            <li><code>F F F T T T</code>: cari true pertama.</li>
            <li><code>T T T F F F</code>: cari true terakhir.</li>
        </ul>
        <CodeBlock
            language="text"
            filename="lower_bound.txt"
            code={`Kamus:
    arr : array of integer
    target, low, high, mid, ans : integer

Algoritma function lower_bound(arr, target) -> integer:
    low <- 0
    high <- length(arr)
    ans <- high

    while low < high do
        mid <- low + (high - low) div 2
        if arr[mid] >= target then
            ans <- mid
            high <- mid
        else
            low <- mid + 1
        end if
    end while

    return ans`}
        />
    </NoteSection>

    <NoteSection title="Binary Search di Ruang Solusi (Contoh Mesin Pabrik)">
        <p>
            Tujuan: cari waktu minimum agar total produksi mencapai target.
            Predikat validitasnya monoton: jika waktu <code>T</code> cukup, maka waktu
            lebih besar pasti cukup.
        </p>
        <MathBlock
            latex={"\\text{TotalProduk}(T)=\\sum_{i=1}^{N} \\left\\lfloor\\frac{T}{k_i}\\right\\rfloor"}
        />
        <CodeBlock
            language="text"
            filename="factory_schedule.txt"
            code={`Kamus:
    machines : array of integer
    target, time, total, k : integer
    low, high, mid, ans : integer

Algoritma function enough(time, machines, target) -> boolean:
    total <- 0
    for each k in machines do
        total <- total + (time div k)
        if total >= target then
            return true
        end if
    end for
    return false

Algoritma function min_time(machines, target) -> integer:
    low <- 1
    high <- 10^18
    ans <- high

    while low <= high do
        mid <- low + (high - low) div 2
        if enough(mid, machines, target) then
            ans <- mid
            high <- mid - 1
        else
            low <- mid + 1
        end if
    end while

    return ans`}
        />
    </NoteSection>

    <NoteSection title="Binary Exponentiation (Pangkat Cepat)">
        <p>
            Menghitung <code>a^b</code> secara naif butuh O(b) perkalian. Dengan
            pemangkasan bit pada eksponen, kita dapat O(log b).
        </p>
        <CodeBlock
            language="text"
            filename="binary_exponentiation.txt"
            code={`Kamus:
    a, b, result, base : integer

Algoritma function fast_power(a, b) -> integer:
    result <- 1
    base <- a

    while b > 0 do
        if (b mod 2) = 1 then
            result <- result * base
        end if
        base <- base * base
        b <- b div 2
    end while

    return result`}
        />
    </NoteSection>

    <NoteSection title="Aplikasi Nyata yang Relevan">
        <ul>
            <li><strong>Big Data</strong>: pola map-reduce sebagai skema divide/conquer.</li>
            <li><strong>Pemrosesan sinyal</strong>: FFT menggunakan pendekatan rekursif DnC.</li>
            <li><strong>Game tree</strong>: alpha-beta pruning untuk mengurangi node evaluasi.</li>
            <li><strong>Navigasi rute</strong>: buang jalur yang sudah pasti kalah dari best-so-far.</li>
        </ul>
        <Callout type="warning" title="Catatan Akurasi">
            Materi ini adalah ringkasan pembelajaran web. Untuk notasi formal lengkap
            dan pembuktian detail, tetap jadikan diktat perkuliahan sebagai rujukan
            utama.
        </Callout>
    </NoteSection>

    <NoteSection title="Soal Latihan (Adaptasi Diktat)">
        <ol>
            <li>
                Peak Finding 1D: temukan puncak lokal dalam
                <MathBlock displayMode={false} latex={"O(\\log n)"} />.
            </li>
            <li>
                Randomized QuickSort: jelaskan kenapa average case-nya mendekati
                <MathBlock displayMode={false} latex={"O(n\\log n)"} />.
            </li>
            <li>
                Aggressive Cows: maksimalkan jarak minimum dengan binary search pada
                solution space.
            </li>
            <li>
                LIS O(n log n): gunakan array tails + binary search.
            </li>
        </ol>
    </NoteSection>

    <NoteSection title="Konsep Implementasi di Web Ini (Per Minggu)">
        <p>
            Untuk materi DAL, konsep kontennya sebaiknya dibuat konsisten per minggu:
        </p>
        <ol>
            <li>Ringkasan teori (catatan).</li>
            <li>Satu visualisasi kecil atau tabel perbandingan.</li>
            <li>Satu contoh kode minimal.</li>
            <li>Latihan/quiz 2-5 soal.</li>
            <li>Checklist insight: kapan dipakai, kapan tidak.</li>
        </ol>
        <Callout type="info" title="Saran struktur ID">
            Gunakan pola id topic: <code>week-{`{nomor}`}-{`{slug}`}</code>
            agar urutan minggu otomatis terbaca jelas.
        </Callout>
    </NoteSection>

    <NoteSection title="Uji Pemahaman">
        <Quiz title="Kuis Materi" questions={week5Quiz} />
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Desain Algoritma Lanjut"
    />
</article>
