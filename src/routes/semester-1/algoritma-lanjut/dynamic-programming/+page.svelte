<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import MathBlock from "$lib/components/MathBlock.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import CoinChangeAnimation from "./components/CoinChangeAnimation.svelte";
    import LCSAnimation from "./components/LCSAnimation.svelte";

    const dpQuiz = [
        {
            question: "Apa dua syarat utama agar problem cocok diselesaikan dengan Dynamic Programming?",
            options: [
                "Input harus sudah terurut dan ukuran data kecil",
                "Subproblem saling tumpang tindih dan ada substruktur optimal",
                "Harus bisa diselesaikan dengan greedy",
                "Wajib memakai rekursi"
            ],
            correctIndex: 1,
            explanation:
                "DP efektif ketika subproblem berulang (overlapping subproblems) dan solusi global bisa dibangun dari solusi lokal optimal (optimal substructure)."
        },
        {
            question: "Untuk 0/1 Knapsack dengan satu array, arah iterasi kapasitas yang benar adalah...",
            options: [
                "Dari kecil ke besar (0 ke capacity)",
                "Acak selama semua bobot dicek",
                "Dari besar ke kecil (capacity turun ke wItem)",
                "Tidak berpengaruh"
            ],
            correctIndex: 2,
            explanation:
                "Iterasi mundur menjaga agar tiap item hanya dipakai sekali. Jika maju, nilai yang sudah diperbarui bisa dipakai lagi pada item yang sama."
        },
        {
            question: "Kompleksitas umum DP sering ditulis sebagai...",
            options: [
                "Jumlah status + biaya transisi",
                "Jumlah status x biaya evaluasi transisi per status",
                "Jumlah transisi / jumlah status",
                "Biaya transisi^jumlah status"
            ],
            correctIndex: 1,
            explanation:
                "Formula praktisnya: Kompleksitas ~= jumlah status dikali biaya evaluasi transisi pada setiap status."
        }
    ];

    const complexityFormula = String.raw`\text{Kompleksitas DP} \approx (\text{Jumlah Status}) \times (\text{Biaya Evaluasi Transisi per Status})`;
    const fibRecurrence = String.raw`F_n = F_{n-1} + F_{n-2}`;
    const lcsMatch = String.raw`dp[i][j] = 1 + dp[i-1][j-1]`;
    const lcsMismatch = String.raw`dp[i][j] = \max(dp[i-1][j], dp[i][j-1])`;
    const knapsackTransition = String.raw`dp[i][w] = \max(dp[i-1][w], dp[i-1][w-W_i] + V_i)`;
</script>

<svelte:head>
    <title>Pemrograman Dinamik - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi Modul 6 Perancangan Algoritma Lanjut: Dynamic Programming, pendekatan top-down/bottom-up, contoh coin change dan LCS, serta optimasi ruang memori."
    />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pemrograman Dinamik"
        date="20 April 2026"
        status="wip"
        tags={["DAL", "Dynamic Programming", "Memoization", "Tabulation"]}
    />

    <NoteSection title="Ringkasan Materi">
        <p>
            Dynamic Programming (DP) adalah cara menyelesaikan masalah besar dengan
            memecahnya jadi masalah kecil, lalu hasil masalah kecil itu disimpan agar
            tidak dihitung ulang. Intinya: <strong>hemat waktu dengan bantuan memori</strong>.
        </p>
        <Callout type="info" title="Intuisi Time-Space Tradeoff">
            Time-space tradeoff artinya kita menukar ruang memori tambahan untuk
            mengurangi waktu komputasi.
        </Callout>
    </NoteSection>

    <NoteSection title="Kenapa DP Sering Terasa Sulit?">
        <p>
            DP biasanya terasa susah bukan karena rumusnya panjang, tetapi karena kita
            harus mengubah cara berpikir: dari "langsung cari jawaban akhir" menjadi
            "cari jawaban kecil dulu, simpan, lalu pakai lagi".
        </p>
        <ul>
            <li>
                Kalau <strong>state</strong> belum jelas, kita bingung mau simpan apa di dp.
            </li>
            <li>
                Kalau <strong>transisi</strong> belum jelas, kita tidak tahu nilai sekarang
                harus dihitung dari mana.
            </li>
            <li>
                Kalau urutan isi tabel belum jelas, tabel DP terlihat seperti angka acak.
            </li>
        </ul>
        <Callout type="tip" title="Cara baca DP yang lebih aman">
            Selalu tanya 3 hal: 1) apa arti dp-nya, 2) dari mana nilai itu datang,
            3) kapan perhitungannya berhenti. Kalau tiga ini jelas, DP biasanya jadi
            jauh lebih mudah diikuti.
        </Callout>
    </NoteSection>

    <NoteSection title="Contoh Paling Penting: Apa Itu State dan Transisi?">
        <p>
            Cara paling aman memahami DP adalah melihat dua hal ini dulu:
        </p>
        <ul>
            <li>
                <strong>State</strong> = apa isi informasi yang kita simpan di <code>dp</code>.
                Biasanya ini adalah jawaban kecil untuk subproblem tertentu.
            </li>
            <li>
                <strong>Transisi</strong> = rumus atau aturan untuk menghitung state baru
                dari state yang sudah lebih dulu dihitung.
            </li>
        </ul>
        <p>
            Jadi state itu <em>isinya apa</em>, sedangkan transisi itu <em>diisi pakai apa</em>.
        </p>

        <div class="table-wrap">
            <table class="example-table">
                <thead>
                    <tr>
                        <th>Contoh</th>
                        <th>State</th>
                        <th>Transisi</th>
                        <th>Arti singkat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Naik tangga</td>
                        <td><code>dp[i]</code> = banyak cara ke tangga i</td>
                        <td><code>dp[i] = dp[i-1] + dp[i-2]</code></td>
                        <td>Ke i bisa datang dari i-1 atau i-2</td>
                    </tr>
                    <tr>
                        <td>Tukar koin</td>
                        <td><code>dp[x]</code> = jumlah koin minimum untuk nilai x</td>
                        <td><code>dp[x] = min(dp[x-c] + 1)</code></td>
                        <td>Coba semua koin lalu ambil yang paling sedikit</td>
                    </tr>
                    <tr>
                        <td>LCS</td>
                        <td><code>dp[i][j]</code> = panjang LCS dua prefiks</td>
                        <td>
                            Jika sama: <code>1 + dp[i-1][j-1]</code><br />
                            Jika beda: <code>max(dp[i-1][j], dp[i][j-1])</code>
                        </td>
                        <td>Bandingkan dua string sedikit demi sedikit</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip" title="Kalau masih bingung, pakai pertanyaan ini">
            Tanyakan: "Apa yang disimpan di dp?" lalu "Kalau mau isi dp sekarang,
            saya butuh nilai dp yang mana sebelumnya?". Dua pertanyaan ini biasanya
            langsung membuka bentuk state dan transisi.
        </Callout>
    </NoteSection>

    <NoteSection title="1) Kamus Istilah Teknis (Versi Sederhana)">
        <ul>
            <li>
                <strong>Subproblem</strong>: potongan masalah kecil dari masalah utama.
            </li>
            <li>
                <strong>Overlapping subproblems</strong>: subproblem yang sama muncul
                berulang kali.
            </li>
            <li>
                <strong>Optimal substructure</strong>: solusi terbaik masalah utama bisa
                disusun dari solusi terbaik masalah kecil.
            </li>
            <li>
                <strong>State/Status</strong>: isi jawaban kecil yang disimpan di <code>dp</code>.
                Contoh: <code>dp[3]</code> pada tangga berarti cara ke-3.
            </li>
            <li>
                <strong>Transisi</strong>: rumus untuk menghitung state sekarang dari
                state sebelumnya.
            </li>
            <li>
                <strong>Base case</strong>: kondisi awal/paling dasar agar perhitungan
                bisa dimulai.
            </li>
            <li>
                <strong>Memoization</strong>: menyimpan hasil pada pendekatan top-down.
            </li>
            <li>
                <strong>Tabulation</strong>: mengisi tabel DP bertahap pada bottom-up.
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="2) Kapan Problem Cocok Pakai DP?">
        <p>
            Umumnya cocok jika dua hal ini ada:
        </p>
        <ol>
            <li>Subproblem yang sama sering muncul (overlapping).</li>
            <li>Solusi global bisa dibangun dari solusi lokal terbaik (optimal substructure).</li>
        </ol>
    </NoteSection>

    <NoteSection title="3) Top-Down vs Bottom-Up">
        <p>
            DP biasanya ditulis dengan dua gaya:
        </p>
        <ul>
            <li><strong>Top-down</strong>: mulai dari target, pecah rekursif, simpan hasil (memoization).</li>
            <li><strong>Bottom-up</strong>: mulai dari kasus kecil, isi tabel sampai target (tabulation).</li>
        </ul>
        <p>
            Contoh formula Fibonacci:
        </p>
        <MathBlock latex={fibRecurrence} />

        <CodeBlock
            language="text"
            filename="fib_rekursif_polos.txt"
            code={`Kamus:
    n : integer

Algoritma function fib_biasa(n) -> integer:
    if n <= 1 then
        return n
    end if
    return fib_biasa(n - 1) + fib_biasa(n - 2)`}
        />

        <Callout type="info" title="Bedanya Fibonacci biasa vs Fibonacci DP">
            Fibonacci biasa (rekursif polos) menghitung banyak nilai yang sama berulang
            kali, jadi waktunya membesar sangat cepat (sekitar O(2^n)).
            Fibonacci DP menyimpan hasil subproblem, jadi setiap nilai dihitung sekali
            saja dan waktunya turun jadi O(n).
        </Callout>

        <ul>
            <li><strong>Rekursif polos</strong>: waktu sekitar <code>O(2^n)</code>, stack <code>O(n)</code>.</li>
            <li><strong>DP top-down (memoization)</strong>: waktu <code>O(n)</code>, memori <code>O(n)</code>.</li>
            <li><strong>DP bottom-up (tabulation)</strong>: waktu <code>O(n)</code>, memori <code>O(n)</code>.</li>
            <li><strong>DP bottom-up hemat memori</strong>: waktu <code>O(n)</code>, memori <code>O(1)</code>.</li>
        </ul>

        <CodeBlock
            language="text"
            filename="fib_top_down.txt"
            code={`Kamus:
    memo : array of integer (diinisialisasi -1)
    n : integer

Algoritma function fib_top_down(n) -> integer:
    if n <= 1 then
        return n
    end if
    if memo[n] != -1 then
        return memo[n]
    end if
    memo[n] <- fib_top_down(n - 1) + fib_top_down(n - 2)
    return memo[n]`}
        />

        <CodeBlock
            language="text"
            filename="fib_bottom_up.txt"
            code={`Kamus:
    n, i : integer
    f : array [0..n] of integer

Algoritma function fib_bottom_up(n) -> integer:
    if n <= 1 then
        return n
    end if

    f[0] <- 0
    f[1] <- 1

    for i <- 2 to n do
        f[i] <- f[i - 1] + f[i - 2]
    end for

    return f[n]`}
        />

        <Callout type="tip" title="Kapan pilih masing-masing?">
            Top-down enak untuk menulis solusi awal yang natural. Bottom-up enak untuk
            performa stabil dan mengurangi overhead rekursi.
        </Callout>
    </NoteSection>

    <NoteSection title="4) Kerangka Menyusun Solusi DP">
        <ol>
            <li>Tentukan state (apa yang ingin disimpan di dp).</li>
            <li>Tentukan transisi (state sekarang dihitung dari mana).</li>
            <li>Tentukan base case.</li>
            <li>Tentukan urutan hitung (top-down atau bottom-up).</li>
        </ol>
        <MathBlock latex={complexityFormula} />
        <p>
            Cara baca rumus di atas: kalau jumlah state banyak, atau biaya transisinya
            mahal, maka total kompleksitas juga ikut naik.
        </p>
    </NoteSection>

    <NoteSection title="5) Contoh Paling Sederhana: Naik Tangga">
        <p>
            Studi kasus ini biasanya lebih gampang dibayangin daripada coin change.
            Bayangkan kamu mau naik ke tangga ke-<code>n</code>, dan kamu hanya boleh
            melangkah <strong>1</strong> atau <strong>2</strong> anak tangga setiap kali.
            Pertanyaannya: ada berapa cara untuk sampai ke atas?
        </p>
        <p>
            <strong>Cara sebelum pakai DP:</strong> kita bisa coba semua kemungkinan
            langkah secara rekursif. Untuk tangga ke-<code>n</code>, kita hitung semua
            cara yang datang dari tangga <code>n-1</code> dan <code>n-2</code>. Masalahnya,
            subproblem yang sama jadi dihitung berulang-ulang.
        </p>
        <CodeBlock
            language="text"
            filename="naik_tangga_rekursif.txt"
            code={`Kamus:
    n : integer

Algoritma function cara_naik_tangga(n) -> integer:
    if n = 0 then
        return 1
    end if
    if n = 1 then
        return 1
    end if
    return cara_naik_tangga(n - 1) + cara_naik_tangga(n - 2)`}
        />
        <ul>
            <li><strong>State</strong>: <code>dp[i]</code> = banyak cara mencapai tangga ke-i.</li>
            <li>
                <strong>Transisi</strong>: untuk sampai ke i, kamu bisa datang dari i-1
                atau i-2.
            </li>
            <li><strong>Basis</strong>: <code>dp[0] = 1</code>, <code>dp[1] = 1</code>.</li>
        </ul>
        <p>
            Artinya, untuk tangga ke-3 misalnya, semua cara ke-3 datang dari cara ke-2
            ditambah cara ke-1. Jadi:
        </p>
        <MathBlock latex={String.raw`dp[i] = dp[i-1] + dp[i-2]`} />

        <Callout type="info" title="Top-down vs bottom-up pada contoh tangga">
            <p>
                <strong>Top-down</strong>: mulai dari tangga target, lalu pecah ke
                <code>n-1</code> dan <code>n-2</code>. Kalau hasil sebuah tangga sudah
                pernah dihitung, simpan dan pakai lagi. Ini disebut memoization.
            </p>
            <p>
                <strong>Bottom-up</strong>: mulai dari <code>dp[0]</code> dan
                <code>dp[1]</code>, lalu isi <code>dp[2]</code>, <code>dp[3]</code>,
                dan seterusnya sampai target. Ini disebut tabulation.
            </p>
        </Callout>

        <CodeBlock
            language="text"
            filename="naik_tangga_top_down.txt"
            code={`Kamus:
    n, i : integer
    memo : array of integer (diinisialisasi -1)

Algoritma function cara_naik_tangga_top_down(n) -> integer:
    return solve(n)

Algoritma function solve(i) -> integer:
    if i = 0 then
        return 1
    end if
    if i = 1 then
        return 1
    end if
    if memo[i] != -1 then
        return memo[i]
    end if

    memo[i] <- solve(i - 1) + solve(i - 2)
    return memo[i]`}
        />

        <CodeBlock
            language="text"
            filename="naik_tangga_bottom_up.txt"
            code={`Kamus:
    n, i : integer
    dp : array [0..n] of integer

Algoritma function cara_naik_tangga_bottom_up(n) -> integer:
    if n = 0 then
        return 1
    end if
    if n = 1 then
        return 1
    end if

    dp[0] <- 1
    dp[1] <- 1

    for i <- 2 to n do
        dp[i] <- dp[i - 1] + dp[i - 2]
    end for

    return dp[n]`}
        />

        <Callout type="tip" title="Ringkas bedanya cara ngerjain">
            Top-down memecah dari target ke subproblem kecil, lalu cache hasil.
            Bottom-up membangun jawaban dari kecil ke besar lewat tabel.
            Keduanya sama-sama <code>O(n)</code> untuk waktu.
        </Callout>

        <div class="table-wrap">
            <table class="example-table">
                <thead>
                    <tr>
                        <th>i</th>
                        <th>dp[i]</th>
                        <th>Arti singkat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>1</td>
                        <td>1 cara: diam di bawah</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1 cara: lompat 1 langkah</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>2</td>
                        <td>(1+1) atau (2)</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>3</td>
                        <td>dari 2 atau 1</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>5</td>
                        <td>dari 3 atau 2</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Callout type="tip" title="Kenapa contoh ini enak buat belajar DP?">
            Karena kita bisa lihat jelas bahwa setiap jawaban kecil dipakai lagi untuk
            membangun jawaban yang lebih besar. Itu inti utama DP.
        </Callout>
        <p>
            Setelah contoh ini masuk, baru coin change terasa lebih masuk akal:
            sama-sama menghitung jawaban kecil dulu, lalu dipakai lagi untuk target yang
            lebih besar.
        </p>
    </NoteSection>

    <NoteSection title="6) Contoh 1: Minimum Tukar Koin">
        <p>
            Di sini, "tukar poin" maksudnya sama seperti <strong>tukar koin</strong>:
            kita ingin membentuk nilai target dari beberapa nominal koin yang tersedia.
            Yang dicari bukan sekadar <em>bisa dibentuk atau tidak</em>, tapi
            <strong>pakai koin paling sedikit</strong>.
        </p>
        <Callout type="info" title="Cara bayanginnya">
            Anggap kamu punya koin 1, 3, dan 4. Kalau targetnya 6, DP akan mencari
            cara paling hemat untuk membentuk 6. Bisa saja 3+3, atau 4+1+1, lalu
            DP akan memilih yang jumlah koinnya paling kecil.
        </Callout>
        <p>
            Problem: diberi target X dan daftar koin, cari jumlah koin minimum untuk
            membentuk X.
        </p>
        <ul>
            <li><strong>State</strong>: <code>dp[i]</code> = minimum koin untuk nilai i.</li>
            <li>
                <strong>Transisi</strong>: coba semua koin c, lalu pilih nilai minimum
                dari <code>dp[i - c] + 1</code>.
            </li>
            <li><strong>Basis</strong>: <code>dp[0] = 0</code>.</li>
            <li><strong>Kompleksitas</strong>: <code>O(target x jumlahKoin)</code>.</li>
        </ul>

        <Callout type="tip" title="Visualisasi Interaktif">
            Jalankan animasi berikut untuk melihat bagaimana tabel DP terisi satu per satu. Perhatikan koin mana yang dicoba dan kenapa hasilnya berubah (atau tidak).
        </Callout>

        <CoinChangeAnimation />

        <CodeBlock
            language="text"
            filename="coin_change_bottom_up.txt"
            code={`Kamus:
    target, x : integer
    coins : array of integer
    dp : array [0..target] of integer
    INF : integer <- 999999999

Algoritma function solve_coin_change(target, coins) -> integer:
    for x <- 0 to target do
        dp[x] <- INF
    end for
    dp[0] <- 0

    for x <- 1 to target do
        for each c in coins do
            if (x - c >= 0) and (dp[x - c] + 1 < dp[x]) then
                dp[x] <- dp[x - c] + 1
            end if
        end for
    end for

    if dp[target] = INF then
        return -1
    end if
    return dp[target]`}
        />

        <Callout type="info" title="Alur baca tabel DP untuk coin change">
            1) mulai dari <code>dp[0] = 0</code>, 2) isi nilai dari kecil ke besar,
            3) untuk tiap nilai <code>x</code> coba semua koin, 4) pilih jumlah koin paling sedikit.
        </Callout>

        <p>
            Contoh sederhana: koin = <code>{`{1, 3, 4}`}</code>, target = <code>6</code>.
            Kita isi tabel dari <code>0</code> sampai <code>6</code>.
        </p>

        <div class="table-wrap">
            <table class="example-table">
                <thead>
                    <tr>
                        <th>x</th>
                        <th>Koin yang dicoba</th>
                        <th>Kandidat terbaik</th>
                        <th>dp[x]</th>
                        <th>Makna singkat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>-</td>
                        <td>-</td>
                        <td>0</td>
                        <td>Butuh 0 koin untuk nilai 0</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>dp[0] + 1 = 1</td>
                        <td>1</td>
                        <td>1 bisa dibuat dengan 1 koin</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>dp[1] + 1 = 2</td>
                        <td>2</td>
                        <td>2 = 1 + 1</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>1, 3</td>
                        <td>min(dp[2]+1=3, dp[0]+1=1)</td>
                        <td>1</td>
                        <td>Pilih 3 saja</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>1, 3, 4</td>
                        <td>min(dp[3]+1=2, dp[1]+1=2, dp[0]+1=1)</td>
                        <td>1</td>
                        <td>Pilih 4 saja</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>1, 3, 4</td>
                        <td>min(dp[4]+1=2, dp[2]+1=3, dp[1]+1=2)</td>
                        <td>2</td>
                        <td>Bisa 4+1</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>1, 3, 4</td>
                        <td>min(dp[5]+1=3, dp[3]+1=2, dp[2]+1=3)</td>
                        <td>2</td>
                        <td>Hasil minimum untuk target 6</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            Kalau dilihat dari alurnya, DP tidak mencoba semua kombinasi secara acak.
            DP mengisi nilai satu per satu, lalu setiap nilai baru memakai hasil yang
            sudah lebih kecil dan sudah pasti benar.
        </p>
    </NoteSection>

    <NoteSection title="7) Contoh 2: Longest Common Subsequence (LCS)">
        <p>
            Problem: dari dua string A dan B, cari panjang subsekuen sama terpanjang.
            Subsekuen tidak harus bersebelahan, tapi urutan harus tetap.
        </p>

        <Callout type="tip" title="Visualisasi Interaktif">
            Lihat bagaimana tabel LCS diisi cell per cell. Warna hijau = karakter cocok (diagonal), kuning = tidak cocok (ambil max atas/kiri).
        </Callout>

        <LCSAnimation />

        <ul>
            <li>
                <strong>State</strong>: <code>dp[i][j]</code> = panjang LCS dari
                prefiks A sampai i dan B sampai j.
            </li>
            <li><strong>Jika karakter cocok</strong>:</li>
        </ul>
        <MathBlock latex={lcsMatch} />
        <ul>
            <li><strong>Jika karakter tidak cocok</strong>:</li>
        </ul>
        <MathBlock latex={lcsMismatch} />
        <CodeBlock
            language="text"
            filename="lcs_bottom_up.txt"
            code={`Kamus:
    n, m, i, j : integer
    a, b : string
    dp : array [0..n][0..m] of integer

Algoritma function solve_lcs(a, b) -> integer:
    n <- length(a)
    m <- length(b)

    // Inisialisasi baris 0 dan kolom 0 dengan 0
    for i <- 0 to n do
        dp[i][0] <- 0
    end for
    for j <- 0 to m do
        dp[0][j] <- 0
    end for

    for i <- 1 to n do
        for j <- 1 to m do
            if a[i] = b[j] then
                dp[i][j] <- 1 + dp[i - 1][j - 1]
            else
                if dp[i - 1][j] > dp[i][j - 1] then
                    dp[i][j] <- dp[i - 1][j]
                else
                    dp[i][j] <- dp[i][j - 1]
                end if
            end if
        end for
    end for

    return dp[n][m]`}
        />

        <Callout type="info" title="Alur baca tabel DP untuk LCS">
            1) buat tabel ukuran <code>(n+1) x (m+1)</code>, 2) baris 0 dan kolom 0 diisi 0,
            3) isi dari kiri ke kanan, dari atas ke bawah, 4) jika karakter sama, ambil diagonal + 1,
            5) jika beda, ambil nilai maksimum dari atas atau kiri.
        </Callout>

        <p>
            Contoh: A = <code>TOHBAT</code>, B = <code>BOBBA</code>. Tabel berikut
            menunjukkan hasil akhir pengisian DP.
        </p>

        <div class="table-wrap">
            <table class="example-table matrix-table">
                <thead>
                    <tr>
                        <th>A \ B</th>
                        <th>0</th>
                        <th>B</th>
                        <th>O</th>
                        <th>B</th>
                        <th>B</th>
                        <th>A</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>0</th>
                        <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                    </tr>
                    <tr>
                        <th>T</th>
                        <td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                    </tr>
                    <tr>
                        <th>O</th>
                        <td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td>
                    </tr>
                    <tr>
                        <th>H</th>
                        <td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td>
                    </tr>
                    <tr>
                        <th>B</th>
                        <td>0</td><td>1</td><td>1</td><td>2</td><td>2</td><td>2</td>
                    </tr>
                    <tr>
                        <th>A</th>
                        <td>0</td><td>1</td><td>1</td><td>2</td><td>2</td><td>3</td>
                    </tr>
                    <tr>
                        <th>T</th>
                        <td>0</td><td>1</td><td>1</td><td>2</td><td>2</td><td>3</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            Cara baca tabel ini: angka di kanan-bawah adalah jawaban akhir, yaitu <code>3</code>.
            Lalu kalau ingin tahu subsekuennya, kita bisa <strong>backtrack</strong> dari kanan-bawah ke kiri-atas.
        </p>

        <Callout type="info" title="Contoh alur backtrack">
            Dari kanan-bawah, ambil langkah ke sel yang nilainya sama dengan arah terbaik.
            Jika huruf sama, berarti karakter itu masuk subsekuen dan kita mundur diagonal.
            Untuk contoh ini subsekuennya bisa dibaca menjadi <code>OBA</code>.
        </Callout>
        <Callout type="info" title="Istilah teknis: prefiks">
            Prefiks artinya bagian awal string, misalnya prefiks panjang 3 dari
            "TOHBAT" adalah "TOH".
        </Callout>
    </NoteSection>

    <NoteSection title="8) Optimasi Ruang Memori">
        <p>
            Banyak solusi DP tidak perlu menyimpan semua data lama. Cukup simpan data
            yang benar-benar dipakai oleh langkah berikutnya.
        </p>

        <Callout type="info" title="Fibonacci O(1) space">
            Fibonacci bottom-up cukup simpan 2 nilai terakhir. Jadi space turun dari
            <code>O(N)</code> menjadi <code>O(1)</code>.
        </Callout>

        <CodeBlock
            language="text"
            filename="fib_bottom_up_o1.txt"
            code={`Kamus:
    n, i, a, b, temp : integer

Algoritma function fib_bottom_up_o1(n) -> integer:
    if n <= 1 then
        return n
    end if

    a <- 0
    b <- 1
    for i <- 2 to n do
        temp <- a + b
        a <- b
        b <- temp
    end for

    return b`}
        />

        <p>
            Pada 0/1 Knapsack, DP 2D bisa dihemat jadi 2 baris (rolling array),
            bahkan 1 baris.
        </p>
        <MathBlock latex={knapsackTransition} />
        <CodeBlock
            language="text"
            filename="knapsack_one_row.txt"
            code={`Kamus:
    n, i, w, capacity, w_item, v_item : integer
    weights, values : array of integer
    dp : array [0..capacity] of integer

Algoritma function knapsack_one_row(weights, values, capacity) -> integer:
    for w <- 0 to capacity do
        dp[w] <- 0
    end for

    n <- length(weights)
    for i <- 0 to n - 1 do
        w_item <- weights[i]
        v_item <- values[i]
        // Iterasi MUNDUR agar item hanya dipakai sekali
        for w <- capacity down to w_item do
            if dp[w - w_item] + v_item > dp[w] then
                dp[w] <- dp[w - w_item] + v_item
            end if
        end for
    end for

    return dp[capacity]`}
        />

        <Callout type="warning" title="Detail penting 0/1 Knapsack">
            Iterasi kapasitas harus mundur. Kalau maju, item yang sama bisa ikut
            kepakai berulang dalam satu iterasi.
        </Callout>

        <p>
            Untuk LCS versi 1 baris, dibutuhkan variabel tambahan seperti
            <code>prevDiag</code> untuk menyimpan nilai diagonal lama.
        </p>
    </NoteSection>

    <NoteSection title="9) Ide Soal Latihan dari Modul">
        <ol>
            <li>Levenshtein Distance (edit distance).</li>
            <li>Maximum Subarray (Kadane).</li>
            <li>Problem naik tangga dengan variasi tangga rusak.</li>
            <li>Subset Sum berbasis DP boolean.</li>
            <li>Unbounded Knapsack dan analisis arah iterasi.</li>
        </ol>
        <Callout type="tip" title="Strategi latihan">
            Untuk tiap soal, pakai pola yang sama: definisi status, transisi, basis,
            lalu uji dengan contoh kecil sebelum coding versi final.
        </Callout>
    </NoteSection>

    <NoteSection title="10) Cek Pemahaman">
        <Quiz questions={dpQuiz} />
    </NoteSection>

    <NoteSection title="11) Checklist Cakupan terhadap PDF Modul 6">
        <ul>
            <li>Pendahuluan DP dan dua syarat utama: sudah.</li>
            <li>Perbandingan top-down vs bottom-up: sudah.</li>
            <li>Kerangka penyusunan solusi DP + kompleksitas: sudah.</li>
            <li>Contoh coin change dan LCS: sudah.</li>
            <li>Optimasi memori (fib, knapsack, LCS): sudah.</li>
            <li>Daftar soal latihan lanjutan: sudah.</li>
        </ul>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali" />
</article>

<style>
    .table-wrap {
        overflow-x: auto;
        margin: 1rem 0;
    }

    .example-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
        min-width: 720px;
    }

    .example-table th,
    .example-table td {
        border: 1px solid var(--color-line);
        padding: 0.7rem 0.75rem;
        vertical-align: top;
        text-align: left;
    }

    .example-table th {
        background: var(--color-surface-soft);
        font-weight: 600;
    }

    .matrix-table th:first-child,
    .matrix-table td:first-child {
        position: sticky;
        left: 0;
        background: var(--color-surface-soft);
        z-index: 1;
    }
</style>
