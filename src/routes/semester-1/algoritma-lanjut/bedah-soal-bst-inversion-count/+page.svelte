<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const bruteForceCode = `
def count_inversions_brute(arr):
    n = len(arr)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] > arr[j]:
                count += 1
    return count

# Input
n = int(input())
arr = list(map(int, input().split()))
print(count_inversions_brute(arr))

# Kompleksitas: O(n^2) — terlalu lambat untuk n = 200.000
    `.trim();

    const mergeSortCode = `
def count_inversions_merge(arr):
    if len(arr) <= 1:
        return arr, 0

    mid = len(arr) // 2
    left, inv_left = count_inversions_merge(arr[:mid])
    right, inv_right = count_inversions_merge(arr[mid:])

    merged = []
    inversions = inv_left + inv_right
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            # Semua sisa elemen di left[i:] > right[j]
            # karena left sudah terurut
            merged.append(right[j])
            inversions += len(left) - i
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, inversions

# Input
n = int(input())
arr = list(map(int, input().split()))
_, result = count_inversions_merge(arr)
print(result)

# Kompleksitas: O(n log n)
    `.trim();

    const bitCode = `
import sys
input = sys.stdin.readline

def update(bit, i, val, size):
    while i <= size:
        bit[i] += val
        i += i & (-i)

def query(bit, i):
    s = 0
    while i > 0:
        s += bit[i]
        i -= i & (-i)
    return s

def count_inversions_bit(arr, n):
    # Koordinat kompresi: mapping nilai ke 1..n
    sorted_unique = sorted(set(arr))
    rank = {v: i + 1 for i, v in enumerate(sorted_unique)}
    size = len(sorted_unique)

    bit = [0] * (size + 1)
    inversions = 0

    # Proses dari kanan ke kiri
    for i in range(n - 1, -1, -1):
        r = rank[arr[i]]
        # Berapa elemen yang sudah dimasukkan dengan rank < r?
        inversions += query(bit, r - 1)
        update(bit, r, 1, size)

    return inversions

# Input
n = int(input())
arr = list(map(int, input().split()))
print(count_inversions_bit(arr, n))

# Kompleksitas: O(n log n)
    `.trim();

    const bstAugmentedCode = `
# Konsep Augmented BST untuk Inversion Count
# (Pseudocode — ilustrasi logika, bukan solusi submit)
#
# Untuk setiap elemen arr[i] dari kiri ke kanan:
#   1. Hitung berapa simpul di BST yang kuncinya > arr[i]
#      → Ini adalah jumlah inversi untuk arr[i]
#   2. Sisipkan arr[i] ke BST, update size tiap simpul
#
# Dengan BST seimbang (AVL/Treap), setiap operasi O(log n)
# Total: O(n log n)

function insertAndCount(root, val):
    if root == nil:
        return createNode(val), 0

    count = 0
    if val < root.kunci:
        # val lebih kecil → semua simpul kanan + root sendiri
        # adalah inversi terhadap val
        count = 1 + size(root.kanan)
        root.kiri, sub_count = insertAndCount(root.kiri, val)
        count += sub_count
    else:
        root.kanan, sub_count = insertAndCount(root.kanan, val)
        count += sub_count

    root.size = 1 + size(root.kiri) + size(root.kanan)
    return root, count
    `.trim();

    const traceExample1 = `
Array: [3, 1, 2]

Periksa semua pasangan (i, j) di mana i < j:
┌─────────┬───────┬────────┬──────────────┬──────────┐
│ Pasangan │ i < j │ A[i]   │ A[i] > A[j]? │ Inversi? │
├─────────┼───────┼────────┼──────────────┼──────────┤
│ (0, 1)  │ 0 < 1 │ 3 > 1  │ Ya           │ ✅       │
│ (0, 2)  │ 0 < 2 │ 3 > 2  │ Ya           │ ✅       │
│ (1, 2)  │ 1 < 2 │ 1 > 2  │ Tidak        │ ❌       │
└─────────┴───────┴────────┴──────────────┴──────────┘

Total inversi = 2 ✓
    `.trim();

    const traceExample2 = `
Array: [2, 3, 8, 6, 1]

Pasangan dengan inversi (A[i] > A[j] dan i < j):
┌─────────┬────────┬──────────┐
│ Pasangan │ Nilai  │ Inversi? │
├─────────┼────────┼──────────┤
│ (0, 4)  │ 2 > 1  │ ✅       │
│ (1, 4)  │ 3 > 1  │ ✅       │
│ (2, 3)  │ 8 > 6  │ ✅       │
│ (2, 4)  │ 8 > 1  │ ✅       │
│ (3, 4)  │ 6 > 1  │ ✅       │
└─────────┴────────┴──────────┘

Pasangan lain (0,1), (0,2), (0,3), (1,2), (1,3) → tidak inversi

Total inversi = 5 ✓
    `.trim();

    const mergeSortTrace = `
Merge Sort pada [2, 3, 8, 6, 1]:

Langkah 1 — Bagi:
  [2, 3, 8, 6, 1]
  → [2, 3] dan [8, 6, 1]
  → [2, 3] dan ([8] dan [6, 1])
  → [2, 3] dan ([8] dan [6] dan [1])

Langkah 2 — Gabung & Hitung:

  Gabung [6] dan [1]:
    1 < 6 → ambil 1, inversi += 1 (dari [6])
    Hasil: [1, 6], inversi = 1

  Gabung [8] dan [1, 6]:
    1 < 8 → ambil 1, inversi += 1 (dari [8])
    6 < 8 → ambil 6, inversi += 1 (dari [8])
    Hasil: [1, 6, 8], inversi = 1 + 2 = 3

  Gabung [2, 3] dan [1, 6, 8]:
    1 < 2 → ambil 1, inversi += 2 (dari [2, 3])
    2 < 6 → ambil 2
    3 < 6 → ambil 3
    Hasil: [1, 2, 3, 6, 8], inversi = 3 + 2 = 5

Total inversi = 5 ✓
    `.trim();
</script>

<svelte:head>
    <title>Bedah Soal: BST — Inversion Count - S2IF Notebook</title>
    <meta name="description" content="Pembahasan lengkap soal menghitung jumlah inversi dalam array, mulai dari pemahaman soal hingga solusi optimal." />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: BST — Inversion Count"
        date="1 Mei 2026"
        status="done"
    />

    <NoteSection title="Deskripsi Soal">
        <Callout type="info" title="Soal Lengkap">
            <p>
                Diberikan untaian <strong>n</strong> data bilangan bulat positif <strong>A</strong>.
                Diberikan definisi <strong>Inversi</strong> dalam array A jika ada <code>i &lt; j</code> dengan <code>A[i] &gt; A[j]</code>.
                Tugas anda adalah menghitung ada berapa banyak inversi dalam untaian yang diberikan.
            </p>

            <div class="example-box">
                <p><strong>Input:</strong></p>
                <p>Baris pertama berisi <code>n</code>, jumlah data. <code>1 ≤ n ≤ 200.000</code></p>
                <p>Baris kedua berisi n data bilangan bulat: <code>a₁, a₂, ... aₙ</code>. <code>0 &lt; aᵢ ≤ 10.000.000</code></p>
                <p><strong>Output:</strong></p>
                <p>Sebuah bilangan bulat: berapa banyak inversi yang terjadi.</p>
            </div>

            <div class="example-box" style="margin-top: 1rem;">
                <p><strong>Contoh 1:</strong></p>
                <pre>Input:  3           Output: 2
        3 1 2</pre>
                <p><strong>Contoh 2:</strong></p>
                <pre>Input:  5           Output: 5
        2 3 8 6 1</pre>
            </div>
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 1 — Memahami Soal">
        <div class="explanation-grid">
            <div class="explanation-card" style="grid-column: 1 / -1;">
                <h3>Apa itu Inversi?</h3>
                <p>
                    <strong>Inversi</strong> adalah pasangan <code>(i, j)</code> di mana posisi <code>i</code> lebih kecil dari posisi <code>j</code>
                    (i muncul lebih dulu di array), <strong>TAPI</strong> nilainya justru lebih besar: <code>A[i] &gt; A[j]</code>.
                </p>
                <p>
                    Secara sederhana: <strong>inversi menghitung berapa banyak pasangan yang "salah urut"</strong>.
                    Jika array sudah terurut naik, inversnya 0. Jika terurut turun, inversnya maksimal.
                </p>
            </div>

            <div class="explanation-card">
                <h3>Analogi Sehari-hari</h3>
                <p>
                    Bayangkan Anda punya antrian orang yang <strong>salah urut</strong> berdasarkan nomor urut.
                    Setiap kali ada orang bernomor besar berdiri di depan orang bernomor kecil, itu satu inversi.
                    Jumlah total "ketidakurutan" itulah yang kita hitung.
                </p>
            </div>

            <div class="explanation-card">
                <h3>Hubungan dengan BST</h3>
                <p>
                    Di materi BST, kita belajar tentang <strong>Augmented BST</strong> yang menyimpan <code>size</code> di tiap simpul.
                    Saat menyisipkan elemen ke BST, kita bisa menghitung berapa elemen yang sudah ada di BST yang <strong>lebih besar</strong> dari elemen baru — itulah jumlah inversi untuk elemen tersebut.
                </p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Langkah 2 — Tracing Manual">
        <p>Sebelum coding, mari kita trace manual kedua contoh agar benar-benar paham:</p>

        <h3>Contoh 1: [3, 1, 2]</h3>
        <CodeBlock code={traceExample1} language="text" title="Tracing Contoh 1" />

        <h3 style="margin-top: 2rem;">Contoh 2: [2, 3, 8, 6, 1]</h3>
        <CodeBlock code={traceExample2} language="text" title="Tracing Contoh 2" />

        <Callout type="tip" title="Tips Tracing">
            <p>
                Untuk tracing manual, cukup periksa setiap pasangan <code>(i, j)</code> dengan <code>i &lt; j</code>.
                Jumlah total pasangan yang mungkin adalah <MathBlock latex={"\\binom{n}{2} = \\frac{n(n-1)}{2}"} displayMode={false} />.
                Untuk n=5, ada 10 pasangan yang harus dicek.
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 3 — Solusi Brute Force">
        <p>
            Pendekatan paling sederhana: periksa <strong>semua pasangan</strong> <code>(i, j)</code>.
            Jika <code>A[i] &gt; A[j]</code> dan <code>i &lt; j</code>, tambahkan 1 ke penghitung.
        </p>

        <CodeBlock code={bruteForceCode} language="python" title="Solusi Brute Force — O(n²)" />

        <Callout type="warning" title="Kenapa Tidak Cukup?">
            <p>
                Dengan <MathBlock latex={"n \\leq 200.000"} displayMode={false} />, pendekatan brute force melakukan
                <MathBlock latex={"\\frac{200.000 \\times 199.999}{2} \\approx 2 \\times 10^{10}"} displayMode={false} /> operasi.
                Ini <strong>jauh terlalu lambat</strong> (biasanya batas waktu hanya memungkinkan sekitar <MathBlock latex={"10^8"} displayMode={false} /> operasi per detik di Python).
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 4 — Koneksi ke BST (Konsep Augmented BST)">
        <p>
            Di materi BST, kita sudah belajar bahwa <strong>Augmented BST</strong> menyimpan informasi tambahan
            <code>size</code> di setiap simpul. Konsep ini bisa digunakan untuk menghitung inversi:
        </p>

        <div class="explanation-grid">
            <div class="explanation-card" style="grid-column: 1 / -1;">
                <h3>Ide Utama: Insert + Count</h3>
                <p>Proses elemen dari <strong>kiri ke kanan</strong>. Untuk setiap elemen <code>arr[i]</code>:</p>
                <ol>
                    <li>Saat menelusuri BST ke bawah untuk insert, hitung berapa simpul di sub-pohon <strong>kanan</strong> + simpul saat ini yang lebih besar dari <code>arr[i]</code> → itulah jumlah elemen sebelumnya yang membentuk inversi dengan <code>arr[i]</code>.</li>
                    <li>Sisipkan <code>arr[i]</code> ke BST dan update <code>size</code> di tiap simpul.</li>
                </ol>
                <p>Dengan BST seimbang (AVL/Treap), setiap operasi <MathBlock latex={"O(\\log n)"} displayMode={false} />, total <MathBlock latex={"O(n \\log n)"} displayMode={false} />.</p>
            </div>
        </div>

        <CodeBlock code={bstAugmentedCode} language="algorithm" title="Pseudocode: Augmented BST untuk Inversion Count" />

        <Callout type="warning" title="Masalah Praktis BST Murni">
            <p>
                BST biasa tanpa penyeimbangan bisa menjadi <strong>skewed</strong> (miring) sehingga kompleksitasnya menjadi
                <MathBlock latex={"O(n^2)"} displayMode={false} />.
                Dalam praktek competitive programming, kita biasanya menggunakan <strong>BIT/Fenwick Tree</strong> atau <strong>Merge Sort</strong>
                yang lebih mudah diimplementasikan dan dijamin <MathBlock latex={"O(n \\log n)"} displayMode={false} />.
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 5 — Solusi Optimal: Merge Sort">
        <p>
            Pendekatan <strong>Merge Sort</strong> memanfaatkan prinsip <em>Divide and Conquer</em>.
            Kunci utamanya: <strong>saat menggabungkan (merge) dua bagian terurut, jika elemen dari bagian kiri lebih besar
            dari elemen bagian kanan, maka semua sisa elemen di bagian kiri juga membentuk inversi.</strong>
        </p>

        <CodeBlock code={mergeSortTrace} language="text" title="Trace Merge Sort pada [2, 3, 8, 6, 1]" />

        <div style="margin-top: 1.5rem;"></div>

        <CodeBlock code={mergeSortCode} language="python" title="Solusi Merge Sort — O(n log n)" />

        <Callout type="tip" title="Mengapa Merge Sort Bekerja?">
            <p>
                Saat kita merge <code>left[]</code> dan <code>right[]</code>, kedua bagian sudah terurut.
                Jika <code>left[i] &gt; right[j]</code>, maka <strong>semua</strong> elemen <code>left[i], left[i+1], ..., left[end]</code>
                juga lebih besar dari <code>right[j]</code> (karena left terurut).
                Jadi kita bisa menambah inversi sebanyak <code>len(left) - i</code> sekaligus, bukan satu-satu.
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Langkah 6 — Solusi Alternatif: BIT (Fenwick Tree)">
        <p>
            <strong>Binary Indexed Tree (BIT)</strong> adalah struktur data berbasis array yang mendukung
            operasi <em>prefix sum</em> dan <em>point update</em> dalam <MathBlock latex={"O(\\log n)"} displayMode={false} />.
            Idenya mirip dengan Augmented BST: proses dari kanan ke kiri, hitung berapa elemen yang sudah diproses yang nilainya lebih kecil.
        </p>

        <CodeBlock code={bitCode} language="python" title="Solusi BIT / Fenwick Tree — O(n log n)" />

        <Callout type="info" title="Apa itu Koordinat Kompresi?">
            <p>
                Karena nilai <code>aᵢ</code> bisa sampai 10.000.000, kita tidak bisa buat array sebesar itu.
                <strong>Koordinat kompresi</strong> memetakan nilai-nilai unik ke ranking 1, 2, 3, ... sehingga
                BIT-nya cukup berukuran sebesar jumlah elemen unik (maksimal n = 200.000).
            </p>
        </Callout>
    </NoteSection>

    <NoteSection title="Rangkuman Perbandingan Solusi">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Pendekatan</th>
                        <th>Kompleksitas Waktu</th>
                        <th>Kompleksitas Ruang</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Brute Force</strong></td>
                        <td><MathBlock latex={"O(n^2)"} displayMode={false} /></td>
                        <td><MathBlock latex={"O(1)"} displayMode={false} /></td>
                        <td>Terlalu lambat untuk n besar</td>
                    </tr>
                    <tr>
                        <td><strong>Augmented BST</strong></td>
                        <td><MathBlock latex={"O(n \\log n)"} displayMode={false} /> (seimbang)</td>
                        <td><MathBlock latex={"O(n)"} displayMode={false} /></td>
                        <td>Konsep dari materi BST; butuh self-balancing</td>
                    </tr>
                    <tr>
                        <td><strong>Merge Sort</strong></td>
                        <td><MathBlock latex={"O(n \\log n)"} displayMode={false} /></td>
                        <td><MathBlock latex={"O(n)"} displayMode={false} /></td>
                        <td>✅ Direkomendasikan — tanpa library eksternal</td>
                    </tr>
                    <tr>
                        <td><strong>BIT / Fenwick Tree</strong></td>
                        <td><MathBlock latex={"O(n \\log n)"} displayMode={false} /></td>
                        <td><MathBlock latex={"O(n)"} displayMode={false} /></td>
                        <td>Alternatif; butuh koordinat kompresi</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip" title="Rekomendasi untuk Submit">
            <p>
                Gunakan <strong>Merge Sort</strong> — paling mudah dipahami, tanpa library eksternal,
                dan dijamin <MathBlock latex={"O(n \\log n)"} displayMode={false} />.
                Solusi BIT juga bagus jika Anda sudah familiar dengan struktur data tersebut.
            </p>
        </Callout>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali ke Algoritma Lanjut" />
</article>

<style>
    .table-container {
        margin: 1rem 0;
        overflow-x: auto;
    }

    .example-box {
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        border-left: 4px solid var(--color-primary);
    }

    .example-box pre {
        margin: 0.5rem 0;
        color: var(--color-primary-light);
        white-space: pre;
    }

    .explanation-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .explanation-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }

    .explanation-card h3 {
        margin-top: 0;
        color: var(--color-primary);
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
    }

    @media (max-width: 768px) {
        .explanation-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
