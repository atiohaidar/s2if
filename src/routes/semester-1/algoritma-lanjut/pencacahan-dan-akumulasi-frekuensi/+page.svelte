<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import CountingSortVisualizer from "./components/CountingSortVisualizer.svelte";
    import SubarrayModuloVisualizer from "./components/SubarrayModuloVisualizer.svelte";

    const modulQuiz = [
        {
            question: "Kapan teknik array frekuensi paling cocok dipakai?",
            options: [
                "Saat nilai data berada di rentang kecil/terbatas",
                "Saat semua data bilangan real presisi tinggi",
                "Saat K jauh lebih besar dari N",
                "Saat data tidak bisa dipetakan ke indeks"
            ],
            correctIndex: 0,
            explanation:
                "Array frekuensi efektif kalau domain nilai bisa dialamatkan langsung dan rentangnya tidak terlalu besar."
        },
        {
            question: "Dengan prefix sum P, rumus cepat jumlah subarray A[L..R] adalah?",
            options: ["P[R] + P[L-1]", "P[R] - P[L-1]", "P[L] - P[R]", "P[R-1] - P[L]"],
            correctIndex: 1,
            explanation:
                "Jumlah rentang didapat dari akumulasi sampai R dikurangi akumulasi sampai sebelum L."
        }
    ];
</script>

<svelte:head>
    <title>Pencacahan dan Akumulasi Frekuensi - S2IF Notebook</title>
    <meta
        name="description"
        content="Modul 1 DAL: array frekuensi, prefix sum, counting sort, dan aplikasi query rentang data."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pencacahan dan Akumulasi Frekuensi"
        date="13 April 2026"
        status="wip"
        tags={["DAL", "Counting", "Prefix Sum"]}
    />

    <NoteSection title="Tujuan Modul">
        <p>
            Modul ini membahas cara memanfaatkan <strong>frekuensi data</strong> dan
            <strong>akumulasi (prefix sum)</strong> untuk mempercepat komputasi.
            Fokus utamanya: kapan teknik ini lebih tepat dibanding algoritma berbasis
            perbandingan seperti merge sort atau quicksort.
        </p>
        <Callout type="info" title="Intuisi cepat">
            Kalau domain data diketahui dan rentangnya terbatas, kita bisa mengubah
            banyak operasi dari pendekatan <code>O(N log N)</code> menjadi
            <code>O(N + K)</code> atau query <code>O(1)</code>.
        </Callout>
    </NoteSection>

    <NoteSection title="1) Array Frekuensi dan Direct Addressing">
        <p>
            Misal ada array data <code>A</code> berisi bilangan bulat non-negatif.
            Kita buat array bantu <code>C</code> sehingga <code>C[x]</code> menyimpan
            jumlah kemunculan nilai <code>x</code> di <code>A</code>.
        </p>

        <CodeBlock
            language="python"
            filename="count_frequency.py"
            code={`def build_frequency(A, K):
    C = [0] * (K + 1)
    for value in A:
        C[value] += 1
    return C`}
        />


        <Callout type="tip" title="Visualisasi Interaktif">
            Pakai visualizer di bawah untuk lihat step-by-step alur counting sort itu ngapain:
        </Callout>

        <CountingSortVisualizer />
        <CodeBlock
            language="text"
            filename="contoh_array_frekuensi.txt"
            code={`Contoh:
A = [2, 1, 2, 0, 3, 2, 1], K = 3

Setelah dicacah:
C[0] = 1
C[1] = 2
C[2] = 3
C[3] = 1

Jadi C = [1, 2, 3, 1]`}
        />

        <p>
            Kompleksitas pencacahan: <code>O(N + K)</code>, dengan:
        </p>
        <ul>
            <li><code>N</code> = jumlah data.</li>
            <li><code>K</code> = nilai maksimum/rentang indeks yang dipakai.</li>
        </ul>

        <Callout type="warning" title="Batasan penting">
            Teknik ini kurang efisien kalau <code>K</code> sangat besar dibanding
            <code>N</code>, atau saat datanya tidak cocok dipetakan ke indeks diskrit.
        </Callout>
    </NoteSection>

    <NoteSection title="2) Prefix Sum (Akumulasi)">
        <p>
            Untuk array <code>A</code>, definisikan prefix sum <code>P</code> sebagai:
        </p>
        <MathBlock latex={"P[k] = \\sum_{i=0}^{k} A[i]"} />
        <p>Versi rekursifnya:</p>
        <MathBlock latex={"P[0]=A[0], \\quad P[k]=P[k-1]+A[k]\\ (k>0)"} />

        <CodeBlock
            language="python"
            filename="build_prefix_sum.py"
            code={`def build_prefix_sum(A):
    P = [0] * len(A)
    P[0] = A[0]
    for i in range(1, len(A)):
        P[i] = P[i - 1] + A[i]
    return P`}
        />

        <CodeBlock
            language="text"
            filename="contoh_array_prefix_sum.txt"
            code={`Contoh:
A = [4, 1, 3, 2, 5]

P[0] = 4
P[1] = 4 + 1 = 5
P[2] = 5 + 3 = 8
P[3] = 8 + 2 = 10
P[4] = 10 + 5 = 15

Jadi P = [4, 5, 8, 10, 15]`}
        />
    </NoteSection>

    <NoteSection title="3) Range Sum Query dalam O(1)">
        <p>
            Setelah <code>P</code> terbentuk, jumlah subarray <code>A[L..R]</code>
            bisa dihitung konstan:
        </p>
        <MathBlock latex={"\\text{Sum}(L,R)=P[R]-P[L-1]"} />
        <p>
            Kasus khusus jika <code>L = 0</code>:
            <code>Sum(0, R) = P[R]</code>.
        </p>

        <Callout type="tip" title="Kenapa cepat?">
            Kita membayar biaya precompute sekali di awal <code>O(N)</code>, lalu
            setiap query rentang tinggal satu pengurangan.
        </Callout>

        <CodeBlock
            language="text"
            filename="contoh_range_sum_query.txt"
            code={`Pakai array sebelumnya:
A = [4, 1, 3, 2, 5]
P = [4, 5, 8, 10, 15]

Contoh query: L = 1, R = 3
Sum(1,3) = P[3] - P[0] = 10 - 4 = 6

Cek manual:
A[1..3] = [1, 3, 2], jumlah = 6 (sama)`}
        />
    </NoteSection>

    <NoteSection title="4) Counting Sort (Stable, Non-Comparison)">
        <p>
            Counting sort menggunakan frekuensi dan frekuensi kumulatif untuk
            menentukan posisi akhir tiap elemen tanpa perbandingan langsung.
        </p>
        <Callout type="info" title="K itu apa dan dapat dari mana?">
            <p>
                Di counting sort, <code>K</code> adalah <strong>rentang nilai yang perlu ditampung</strong>
                oleh array frekuensi, bukan jumlah data.
            </p>
            <p>
                Kalau data dimulai dari 0, biasanya dipakai:
                <code>K = max(A)</code>, sehingga ukuran array frekuensi adalah <code>K + 1</code>.
            </p>
            <p>
                Kalau data tidak dimulai dari 0 (misal ada nilai negatif), pakai offset:
                <code>idx = value - min(A)</code> dan ukuran frekuensi menjadi
                <code>max(A) - min(A) + 1</code>.
            </p>
        </Callout>

        <ol>
            <li>Hitung frekuensi elemen ke array <code>C</code>.</li>
            <li>
                Ubah <code>C</code> menjadi kumulatif, sehingga <code>C[x]</code>
                menyatakan jumlah elemen <code>&lt;= x</code>.
            </li>
            <li>Tempatkan elemen ke array hasil <code>B</code>.</li>
            <li>Iterasi mundur untuk menjaga stabilitas.</li>
        </ol>

        <CodeBlock
            language="python"
            filename="counting_sort.py"
            code={`def counting_sort(A, K):
    C = [0] * (K + 1)      # Array frekuensi, ukuran K+1
    B = [0] * len(A)       # Array hasil terurut

    # TAHAP 1: Hitung frekuensi setiap nilai
    # Untuk setiap elemen di A, tambah counter di C sesuai nilai elemen
    for value in A:
        C[value] += 1
    # Contoh: jika A=[3,1,2,3,0,1], maka C=[1,2,1,2]

    # TAHAP 2: Ubah C menjadi frekuensi kumulatif
    # C[i] sekarang menyatakan: "banyak elemen <= i"
    for i in range(1, K + 1):
        C[i] += C[i - 1]
    # Contoh: dari C=[1,2,1,2] jadi C=[1,3,4,6]

    # TAHAP 3: Tempatkan elemen ke posisi final di array B
    # Iterasi MUNDUR dari belakang array A agar stabilitas terjaga
    # (elemen yang muncul belakangan akan ditempatkan ke posisi lebih kanan)
    for i in range(len(A) - 1, -1, -1):
        value = A[i]           # Ambil elemen dari belakang
        C[value] -= 1          # Kurangi counter untuk elemen ini
        B[C[value]] = value    # Tempatkan di posisi hasil (C[value] jadi indeks)
    # Contoh: A=[3,1,2,3,0,1] -> proses mundur:
    #   i=5: nilai 1, C[1]=2 -> B[2]=1, C[1] jadi 1
    #   i=4: nilai 0, C[0]=0 -> B[0]=0, C[0] jadi 0
    #   ... dst sampai array B terisi terurut

    return B`}
        />

        <CodeBlock
            language="text"
            filename="contoh_counting_sort.txt"
            code={`Contoh:
A = [3, 1, 2, 3, 0, 1], K = 3

Frekuensi awal C:
[1, 2, 1, 2]

Kumulatif C:
[1, 3, 4, 6]

Hasil urut B:
[0, 1, 1, 2, 3, 3]`}
        />

    <CodeBlock
        language="text"
        filename="contoh_dapatkan_k.txt"
        code={`Cara dapat K dari array:

1) Jika A mulai dari 0
A = [3, 1, 2, 3, 0, 1]
min = 0, max = 3
K = max = 3
ukuran C = K + 1 = 4 (indeks 0..3)

2) Jika A tidak mulai dari 0
A = [5, 7, 5, 6]
min = 5, max = 7
rentang = max - min + 1 = 3
pakai offset: idx = value - 5
5 -> 0, 6 -> 1, 7 -> 2`}
    />

        <p>
            Kompleksitas counting sort:
        </p>
        <ul>
            <li>Waktu: <code>O(N + K)</code></li>
            <li>Ruang: <code>O(N + K)</code></li>
        </ul>
        <Callout type="warning" title="Kenapa K penting?">
            Semakin besar <code>K</code>, semakin besar memory untuk array frekuensi.
            Jadi counting sort bagus kalau rentang nilai data tidak terlalu lebar.
        </Callout>
    </NoteSection>

    <NoteSection title="5) Rank Query dan Median dari Kumulatif Frekuensi">
        <p>
            Jika <code>C</code> sudah kumulatif:
        </p>
        <ul>
            <li>Jumlah elemen yang lebih kecil dari <code>x</code> adalah <code>C[x-1]</code>.</li>
            <li>
                Median bisa dicari dengan mencari nilai terkecil <code>x</code>
                yang memenuhi <code>C[x] &gt;= ceil(N/2)</code>.
            </li>
        </ul>
        <p>
            Karena <code>C</code> monotonik naik, pencarian median bisa dilakukan
            dengan binary search di domain nilai.
        </p>

        <CodeBlock
            language="text"
            filename="contoh_rank_dan_median.txt"
            code={`Pakai frekuensi kumulatif dari contoh counting sort:
C = [1, 3, 4, 6]
N = 6

Rank query:
Jumlah elemen < 3 adalah C[2] = 4
(yaitu 0, 1, 1, 2)

Median:
Posisi median = ceil(N/2) = ceil(6/2) = 3
Cari x terkecil dengan C[x] >= 3 -> x = 1
Jadi median (versi bawah) = 1`}
        />
    </NoteSection>

    <NoteSection title="6) Kapan Teknik Ini Dipakai?">
        <ul>
            <li>Rentang nilai data kecil sampai sedang.</li>
            <li>Banyak query rentang pada data statik.</li>
            <li>Butuh pengurutan stabil tanpa perbandingan langsung.</li>
        </ul>
        <Callout type="warning" title="Hindari jika">
            Domain data sangat besar (misal sampai <code>10^18</code>) sementara
            jumlah data kecil, karena memory untuk array frekuensi jadi tidak realistis.
        </Callout>
    </NoteSection>

    <NoteSection title="7) Soal Latihan + Cara Pengerjaan">
        <p>
            Berikut latihan dari diktat, lengkap dengan alur penyelesaian yang bisa kamu
            jadikan template berpikir saat ngerjain soal sejenis.
        </p>

        <h4>Latihan 1: Subarray Sum Divisible by M</h4>
        <p>
            <strong>Soal:</strong> Diberikan array <code>A</code> berisi <code>N</code>
            integer. Hitung banyak subarray (berurutan langsung) yang jumlahnya habis dibagi <code>M</code>.
        </p>
        <p><strong>Ide utama:</strong> prefix sum modulo + frekuensi modulo.</p>
        <Callout type="info" title="Kenapa langkahnya seperti itu?" scrollX={true}>
            <p>
                Kita bikin <strong>prefix sum</strong> supaya jumlah subarray bisa diubah
                dari masalah "jumlah elemen di tengah" menjadi "selisih dua akumulasi".
                Kalau <code>pref[r]</code> adalah jumlah dari awal sampai indeks <code>r</code>,
                maka jumlah subarray <code>A[l..r]</code> adalah:
            </p>
            <MathBlock latex={String.raw`\text{sum}(l,r)=pref[r]-pref[l-1]`} />
            <p>
                Setelah itu kita ambil <strong>modulo tiap prefix</strong> karena yang kita
                pedulikan cuma apakah jumlah subarray <em>habis dibagi</em> <code>M</code> atau tidak.
                Kalau dua prefix punya sisa yang sama saat dibagi <code>M</code>, selisihnya pasti kelipatan <code>M</code>.
            </p>
            <MathBlock
                latex={String.raw`pref[r] \equiv pref[l-1] \pmod{M}`}
            />
            <MathBlock latex={String.raw`\Rightarrow pref[r]-pref[l-1] \equiv 0 \pmod{M}`} />
            <Callout type="info" title="Maksud kalimat ini apa?" scrollX={true}>
                <p>
                    Kalau dua bilangan punya sisa pembagian yang sama terhadap <code>M</code>,
                    berarti dua bilangan itu beda sebesar kelipatan <code>M</code>.
                </p>
                <MathBlock latex={String.raw`a \equiv b \pmod{M} \iff a-b = kM,\ k \in \mathbb{Z}`} />
                <p>
                    Contoh: ambil <code>M = 5</code>, <code>a = 27</code>, <code>b = 12</code>.
                    Keduanya sisa <code>2</code> saat dibagi <code>5</code>, jadi:
                </p>
                <MathBlock latex={String.raw`27-12=15=3 \times 5`} />
                <p>
                    Selisihnya kelipatan <code>5</code>. Itu persis alasan kenapa pada prefix sum,
                    dua prefix dengan remainder sama akan menghasilkan jumlah subarray yang habis dibagi <code>M</code>.
                </p>
            </Callout>
            <p>
                Artinya selisih dua prefix tersebut adalah kelipatan <code>M</code>,
                jadi jumlah subarray-nya habis dibagi <code>M</code>.
            </p>
            <p>
                Jadi <code>freq</code> dipakai untuk menghitung berapa kali tiap sisa modulo sudah muncul,
                sedangkan <code>ans</code> adalah total subarray valid yang sudah ditemukan sampai saat ini.
            </p>
        </Callout>

       

        <ol>
            <li>Bangun prefix sum: <code>pref[i] = A[0] + ... + A[i]</code> agar sum subarray bisa diubah jadi selisih dua nilai.</li>
            <li>Ambil modulo tiap prefix: <code>r = pref[i] mod M</code> karena kita hanya perlu tahu sisa pembagian terhadap <code>M</code>.</li>
            <li>
                Dua prefix dengan modulo sama berarti selisihnya habis dibagi <code>M</code>.
                Itu sebabnya pasangan prefix dengan remainder sama dihitung sebagai subarray valid.
            </li>
            <li>
                Simpan frekuensi tiap remainder di array/map <code>freq</code>, lalu
                setiap prefix baru menambah <code>ans</code> sebanyak jumlah prefix sebelumnya yang punya remainder sama.
            </li>
        </ol>
        <CodeBlock
            language="text"
            filename="alur_latihan1.txt"
            code={`Contoh kecil:
A = [2, 1, 2, 1], M = 3

Prefix sum dan remainder:
0   -> 0 mod 3 = 0
2   -> 2 mod 3 = 2
3   -> 0 mod 3 = 0
5   -> 2 mod 3 = 2
6   -> 0 mod 3 = 0

freq menyimpan berapa kali remainder muncul.
ans menambah setiap kali remainder yang sama muncul lagi.

Hasil akhir:
remainder 0 muncul 3 kali -> C(3,2)=3 pasangan
remainder 2 muncul 2 kali -> C(2,2)=1 pasangan
total ans = 4`}
        />
        <CodeBlock
            language="python"
            filename="latihan1_subarray_divisible.py"
            code={`def count_subarray_divisible(A, M):
    freq = [0] * M
    freq[0] = 1  # prefix kosong: sisa 0 sudah ada sekali sebelum baca data
    pref = 0      # prefix sum berjalan
    ans = 0       # jumlah subarray valid yang sudah ditemukan

    for x in A:
        pref = (pref + x) % M   # ambil sisa modulo karena hanya itu yang penting
        ans += freq[pref]       # semua prefix sebelumnya dengan sisa sama membentuk subarray valid
        freq[pref] += 1         # catat bahwa sisa ini sudah muncul satu kali lagi

    return ans`}
        />
         <Callout type="tip" title="Visualisasi Langkah Soal 1">
            Jalankan visualizer berikut untuk melihat proses update <code>pref</code>,
            <code>freq</code>, dan <code>ans</code> di setiap iterasi.
        </Callout>

        <SubarrayModuloVisualizer />
        <p>
            Kompleksitas: waktu <code>O(N)</code>, ruang <code>O(M)</code>.
        </p>

        <h4>Latihan 2: Static Range Sum Updates (Difference Array)</h4>
        <p>
            <strong>Soal:</strong> Array <code>A</code> awalnya nol semua.
            Ada <code>Q</code> operasi <code>(L, R, V)</code> yang artinya tambahkan
            <code>V</code> ke semua indeks dari <code>L</code> sampai <code>R</code>.
            Diminta hasil akhir array.
        </p>
        <p><strong>Ide utama:</strong> jangan update satu rentang satu per satu, pakai difference array.</p>
        <ol>
            <li>Buat array beda <code>D</code> ukuran <code>N+1</code> (awal nol).</li>
            <li>Untuk tiap operasi: <code>D[L] += V</code>, <code>D[R+1] -= V</code> (jika valid).</li>
            <li>Ambil prefix sum dari <code>D</code> untuk mendapatkan <code>A</code> final.</li>
        </ol>
        <CodeBlock
            language="python"
            filename="latihan2_difference_array.py"
            code={`def apply_range_updates(N, updates):
    D = [0] * (N + 1)

    for L, R, V in updates:
        D[L] += V
        if R + 1 < N:
            D[R + 1] -= V

    A = [0] * N
    running = 0
    for i in range(N):
        running += D[i]
        A[i] = running

    return A`}
        />
        <p>
            Kompleksitas: waktu <code>O(N + Q)</code>, ruang <code>O(N)</code>.
        </p>

        <h4>Latihan 3: Median of Medians (Konseptual)</h4>
        <p>
            <strong>Soal:</strong> Kenapa counting sort tidak cocok untuk
            rentang nilai sangat besar (misal <code>K = 10^18</code>) saat mencari median?
            Alternatif apa yang tetap deterministic <code>O(N)</code>?
        </p>
        <ol>
            <li>
                Counting sort butuh array frekuensi ukuran sekitar <code>K</code>, jadi
                tidak realistis untuk memory kalau <code>K</code> sangat besar.
            </li>
            <li>
                Gunakan algoritma <strong>Median of Medians</strong> (selection deterministic),
                yang mencari elemen ke-k tanpa mengurutkan seluruh array.
            </li>
            <li>
                Waktu terjamin <code>O(N)</code>, cocok untuk domain nilai besar.
            </li>
        </ol>
        <Callout type="tip" title="Ringkasan keputusan metode">
            Jika rentang nilai kecil -> counting/frequency-based bisa sangat cepat.
            Jika rentang nilai ekstrem besar -> pakai selection algorithm seperti
            median of medians untuk median/elemen ke-k.
        </Callout>
    </NoteSection>

    <NoteSection title="Kuis Ringkas">
        <Quiz questions={modulQuiz} />
    </NoteSection>

    <NoteSection title="Rujukan">
        <ol>
            <li>
                CLRS, <em>Introduction to Algorithms</em>, Bab 8 (Sorting in Linear Time).
            </li>
            <li>
                Antti Laaksonen, <em>Competitive Programmer's Handbook</em>, Bab 9
                (Range Queries).
            </li>
            <li>
                Diktat DAL Modul 1: Pencacahan dan Akumulasi Frekuensi (Tim Pengajar
                S2-IF Tel-U, draft 21 Februari 2026).
            </li>
        </ol>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>
