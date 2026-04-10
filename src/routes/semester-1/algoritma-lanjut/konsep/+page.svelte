<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";

    const conceptQuiz = [
        {
            question: "Jika ada dua loop berurutan masing-masing O(n), kompleksitas totalnya apa?",
            options: ["O(n^2)", "O(2n)", "O(n)", "O(log n)"],
            correctIndex: 2,
            explanation:
                "Dua loop berurutan dijumlahkan: O(n) + O(n) = O(2n), lalu konstanta diabaikan menjadi O(n)."
        },
        {
            question: "Kapan sebuah loop biasanya menghasilkan O(log n)?",
            options: [
                "Saat nilai bertambah 1 tiap iterasi",
                "Saat ukuran masalah dibagi faktor tetap (misal n/2) tiap iterasi",
                "Saat ada nested loop",
                "Saat ada operasi swap"
            ],
            correctIndex: 1,
            explanation:
                "Jika ruang pencarian dipangkas dengan rasio tetap, jumlah langkah tumbuh logaritmik terhadap n."
        }
    ];
</script>

<svelte:head>
    <title>Konsep Dasar Desain Algoritma Lanjut - S2IF Notebook</title>
    <meta
        name="description"
        content="Pondasi penting sebelum masuk materi algoritma lanjutan: istilah inti, cara baca kode, tracing, dan analisis kompleksitas."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Konsep Dasar Sebelum Materi Lanjutan"
        date="09 April 2026"
        status="done"
        tags={["Pondasi", "DAL"]}
    />

    <NoteSection title="Kenapa Halaman Ini Ada?">
        <p>
            Halaman ini adalah pondasi. Tujuannya agar kamu tidak hanya bisa
            menjalankan kode, tapi juga bisa <span class="highlight">membaca,
            menilai, dan menjelaskan</span> kenapa sebuah algoritma benar dan
            efisien.
        </p>
        <Callout type="info" title="Fokus utama">
            Sebelum masuk topik-topik lanjutan, pastikan tiga hal ini sudah kuat:
            memahami istilah, bisa tracing kode, dan bisa estimasi kompleksitas.
        </Callout>
    </NoteSection>

    <NoteSection title="Istilah Inti yang Wajib Paham">
        <ul>
            <li>
                <strong>Input</strong>: data yang diterima algoritma.
                Contoh: pada fungsi pencari nilai maksimum,
                input-nya <code>[7, 2, 9, 4]</code>.
            </li>
            <li>
                <strong>Output</strong>: hasil yang harus dihasilkan.
                Contoh: dari input <code>[7, 2, 9, 4]</code>, output fungsi max
                adalah <code>9</code>.
            </li>
            <li>
                <strong>State</strong>: kondisi variabel saat algoritma berjalan.
                Contoh: saat iterasi ke-3, variabel <code>max_now</code> mungkin
                berubah dari <code>7</code> menjadi <code>9</code>.
            </li>
            <li>
                <strong>Invariant</strong>: kondisi yang tetap benar di titik tertentu
                selama eksekusi. Contoh: setelah memproses elemen ke-i,
                <code>max_now</code> selalu menyimpan nilai terbesar dari elemen
                <code>0..i</code>.
            </li>
            <li>
                <strong>Edge Case</strong>: input batas/khusus (kosong, satu elemen,
                duplikat, nilai ekstrem). Contoh: input kosong
                <code>[]</code>, satu elemen <code>[5]</code>, atau semua elemen sama
                <code>[3, 3, 3]</code>.
            </li>
        </ul>
        <details class="edge-case-collapse">
            <summary>Penjelasan tambahan: apa itu edge case?</summary>
            <Callout type="warning">
                Edge case adalah kondisi input yang jarang, tapi sangat penting karena
                sering memunculkan bug. Cara gampang mengingatnya: ini adalah input yang
                berada di "tepi" aturan normal.
                <br /><br />
                <strong>Batas minimum/maximum juga termasuk edge case:</strong>
                <br />
                - <strong>Minimum ukuran</strong>: array kosong <code>[]</code> atau
                satu elemen <code>[x]</code>.
                <br />
                - <strong>Maximum ukuran</strong>: input sangat besar (misal jutaan data),
                untuk mengecek performa dan memory.
                <br />
                - <strong>Minimum/maximum nilai</strong>: misal nilai terkecil dan
                terbesar yang mungkin muncul di soal.
                <br /><br />
                Contoh pada fungsi <code>find_max</code>:
                <br />
                1. <code>[]</code> (kosong): kalau tidak dicek, kode bisa error saat
                akses <code>nums[0]</code>.
                <br />
                2. <code>[5]</code> (satu elemen): hasil harus langsung <code>5</code>,
                jangan diproses berlebihan.
                <br />
                3. <code>[3, 3, 3]</code> (duplikat semua): hasil tetap valid,
                algoritma tidak boleh salah karena semua nilai sama.
                <br /><br />
                Praktik aman: setiap selesai menulis algoritma, selalu uji minimal 1
                input normal + 2 atau 3 edge case.
            </Callout>
        </details>
        <CodeBlock
            language="python"
            filename="find_max_example.py"
            code={`def find_max(nums):
    if not nums:
        return None

    max_now = nums[0]
    for x in nums[1:]:
        if x > max_now:
            max_now = x
    return max_now`}
        />
        <p>
            Pada kode di atas: <strong>input</strong> adalah <code>nums</code>,
            <strong>output</strong> adalah nilai terbesar, <strong>state</strong>
            utamanya <code>max_now</code>, invariant-nya adalah
            <code>max_now</code> selalu maksimum sementara, dan edge case-nya
            saat <code>nums</code> kosong.
        </p>
        <Callout type="tip" title="Cara belajar efektif">
            Setiap lihat algoritma baru, selalu tanyakan: inputnya apa, outputnya
            apa, dan invariant-nya apa.
        </Callout>
    </NoteSection>

    <NoteSection title="Cara Memahami Kode Algoritma">
        <p>Gunakan urutan baca berikut:</p>
        <ol>
            <li><strong>Tujuan fungsi</strong>: fungsi ini mau menyelesaikan apa?</li>
            <li><strong>Kontrol alur</strong>: if, loop, rekursi, dan kondisi berhenti.</li>
            <li><strong>Perubahan state</strong>: variabel mana yang berubah per langkah.</li>
            <li><strong>Boundary</strong>: apa yang terjadi saat input kecil/ekstrem.</li>
        </ol>

        <CodeBlock
            language="python"
            filename="count_positive.py"
            code={`def count_positive(nums):
    count = 0
    for x in nums:
        if x > 0:
            count += 1
    return count`}
        />
        <p>
            Tracing cepat untuk input <code>[2, -1, 4]</code>: awalnya
            <code>count=0</code>, lalu jadi <code>1</code>, tetap <code>1</code>,
            lalu jadi <code>2</code>.
        </p>
    </NoteSection>

    <NoteSection title="Cara Tracing Algoritma (Pakai Tabel)">
        <p>
            Tracing adalah teknik menelusuri algoritma langkah demi langkah sambil
            mencatat perubahan state. Ini cara paling cepat buat paham "kode ini
            sebenarnya ngapain".
        </p>

        <p>Urutan tracing yang disarankan:</p>
        <ol>
            <li>Tulis input contoh kecil yang mudah dihitung manual.</li>
            <li>Tentukan variabel state yang penting untuk dipantau.</li>
            <li>Jalankan per iterasi/per pemanggilan fungsi.</li>
            <li>Isi tabel: kondisi sebelum, aksi, kondisi sesudah.</li>
            <li>Cocokkan hasil akhir dengan output yang diharapkan.</li>
        </ol>

        <CodeBlock
            language="python"
            filename="linear_search_trace.py"
            code={`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`}
        />

        <p>
            Contoh input: <code>arr = [4, 1, 7, 3]</code>,
            <code>target = 7</code>. State penting: <code>i</code>,
            <code>arr[i]</code>, dan keputusan kondisi.
        </p>

        <div class="trace-table-wrap">
            <table class="trace-table">
                <thead>
                    <tr>
                        <th>Langkah</th>
                        <th>i</th>
                        <th>arr[i]</th>
                        <th>Cek arr[i] == target</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>0</td>
                        <td>4</td>
                        <td>False</td>
                        <td>Lanjut iterasi</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>1</td>
                        <td>False</td>
                        <td>Lanjut iterasi</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>2</td>
                        <td>7</td>
                        <td>True</td>
                        <td>Return 2 (berhenti)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip" title="Kenapa tabel tracing efektif?">
            Karena kamu tidak menebak. Kamu melihat bukti perubahan state di setiap
            langkah, jadi lebih mudah menemukan bug logika dan off-by-one error.
        </Callout>
    </NoteSection>

    <NoteSection title="Cara Memahami Rekursif">
        <p>
            Rekursif artinya fungsi memanggil dirinya sendiri untuk menyelesaikan
            masalah yang lebih kecil. Supaya tidak bingung, baca dengan urutan ini:
        </p>
        <ol>
            <li><strong>Base case</strong>: kapan fungsi berhenti?</li>
            <li><strong>Progress</strong>: input tiap pemanggilan makin kecil atau tidak?</li>
            <li><strong>Combine</strong>: hasil dari sub-masalah digabung bagaimana?</li>
        </ol>

        <CodeBlock
            language="python"
            filename="factorial_recursive.py"
            code={`def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)`}
        />

        <p>Tracing singkat untuk <code>factorial(4)</code>:</p>
        <ul>
            <li><code>factorial(4) = 4 * factorial(3)</code></li>
            <li><code>factorial(3) = 3 * factorial(2)</code></li>
            <li><code>factorial(2) = 2 * factorial(1)</code></li>
            <li><code>factorial(1) = 1 * factorial(0)</code></li>
            <li><code>factorial(0) = 1</code> (base case, berhenti)</li>
            <li>
                Balik naik: <code>1 * 1 = 1</code>, lalu <code>2 * 1 = 2</code>,
                lalu <code>3 * 2 = 6</code>, lalu <code>4 * 6 = 24</code>
            </li>
        </ul>

        <Callout type="warning" title="Dua sumber bug rekursif paling umum">
            1. Base case tidak pernah tercapai (infinite recursion).<br />
            2. Input tidak bergerak menuju base case (misal harusnya <code>n-1</code>
            tapi tetap <code>n</code>).
        </Callout>
    </NoteSection>

    <NoteSection title="Dasar Menghitung Kompleksitas">
        <p>
            Kita fokus ke orde dominan saat <code>n</code> besar, bukan angka kecil
            atau konstanta.
        </p>
        <ul>
            <li>
                Operasi berurutan dijumlahkan:
                <MathBlock displayMode={false} latex={"O(n) + O(n) = O(2n) = O(n)"} />
            </li>
            <li>
                Loop bersarang dikalikan:
                <MathBlock displayMode={false} latex={"O(n) \\cdot O(n) = O(n^2)"} />
            </li>
            <li>
                Pemangkasan setengah per langkah biasanya:
                <MathBlock displayMode={false} latex={"O(\\log n)"} />
            </li>
        </ul>

        <CodeBlock
            language="python"
            filename="patterns.py"
            code={`# 1) Berurutan -> O(n)
for i in range(n):
    pass
for j in range(n):
    pass

# 2) Bersarang -> O(n^2)
for i in range(n):
    for j in range(n):
        pass

# 3) Dibagi dua terus -> O(log n)
k = n
while k > 1:
    k //= 2`}
        />

        <Callout type="warning" title="Salah paham umum">
            Dua loop berurutan bukan otomatis O(n^2). Menjadi O(n^2) jika loop
            berada di dalam loop lain (nested).
        </Callout>
    </NoteSection>

    <NoteSection title="Checklist Debugging Algoritma">
        <ul>
            <li>Apakah kondisi berhenti sudah benar?</li>
            <li>Apakah indeks aman (tidak out-of-range)?</li>
            <li>Apakah state selalu bergerak menuju selesai?</li>
            <li>Sudah dites untuk input kosong, satu elemen, dan data duplikat?</li>
            <li>Apakah hasil sesuai spesifikasi output?</li>
        </ul>
    </NoteSection>

    <NoteSection title="Cara Mengerjakan Soal Cerita Jadi Algoritma">
        <p>
            Saat ketemu soal cerita, jangan langsung coding. Ubah dulu cerita jadi
            model masalah yang jelas, baru susun langkah algoritmanya.
        </p>

        <p>Workflow yang bisa kamu pakai:</p>
        <ol>
            <li>
                <strong>Tulis ulang tujuan soal dalam 1 kalimat</strong>:
                "kita diminta menghitung/menemukan apa?"
            </li>
            <li>
                <strong>Identifikasi input, output, dan constraint</strong>:
                ukuran data, batas nilai minimum/maximum, dan format data.
            </li>
            <li>
                <strong>Tentukan operasi inti</strong>:
                perlu mencari, mengurutkan, menghitung frekuensi, atau memecah masalah?
            </li>
            <li>
                <strong>Pilih struktur data yang cocok</strong>:
                array, hash map, set, stack, queue, heap, atau graph.
            </li>
            <li>
                <strong>Buat pseudocode dulu</strong>:
                pastikan alurnya benar sebelum implementasi penuh.
            </li>
            <li>
                <strong>Uji dengan contoh kecil + edge case</strong>:
                satu normal case, satu minimum case, satu maximum/ekstrem case.
            </li>
            <li>
                <strong>Baru implementasi dan analisis kompleksitas</strong>:
                cek time complexity dan space complexity.
            </li>
        </ol>

        <CodeBlock
            language="text"
            filename="template-pseudocode.txt"
            code={`1) Definisikan input, output, constraint
2) Inisialisasi state penting
3) Jalankan proses utama (loop / rekursi / divide-and-conquer)
4) Tangani edge case
5) Return hasil`}
        />

        <p>
            Contoh mini: "Diberi daftar nilai mahasiswa, tentukan apakah ada nilai
            duplikat".
        </p>
        <ul>
            <li>Input: array nilai.</li>
            <li>Output: true/false.</li>
            <li>Operasi inti: cek apakah elemen pernah muncul sebelumnya.</li>
            <li>Struktur data: set untuk cek cepat.</li>
            <li>Edge case: array kosong, satu elemen, semua elemen sama.</li>
        </ul>

        <Callout type="tip" title="Aturan emas saat ujian">
            Tunjukkan proses berpikirmu: tulis input-output-constraint, pilih strategi,
            lalu beri alasan kenapa strategi itu dipilih. Ini sering bernilai bahkan
            saat kode belum sempurna.
        </Callout>
    </NoteSection>

    <NoteSection title="Latihan Singkat">
        <Quiz questions={conceptQuiz} />
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Desain Algoritma Lanjut"
    />
</article>

<style>
    .edge-case-collapse {
        margin: 0.75rem 0 1rem;
    }

    .edge-case-collapse summary {
        cursor: pointer;
        font-weight: 600;
        color: var(--color-ink);
        margin-bottom: 0.5rem;
    }

    .trace-table-wrap {
        overflow-x: auto;
        margin: 0.75rem 0 1rem;
    }

    .trace-table {
        width: 100%;
        min-width: 640px;
        border-collapse: collapse;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
    }

    .trace-table th,
    .trace-table td {
        border: 1px solid var(--color-line);
        padding: 0.55rem 0.65rem;
        text-align: left;
        vertical-align: top;
    }

    .trace-table th {
        background: var(--color-surface-soft);
        font-weight: 700;
    }
</style>
