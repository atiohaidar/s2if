<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";

    const questions = [
        {
            question: "Dari algoritma untuk Problem Minimum Tukar Koin (Minimum Coin Change), jika koin yang tersedia adalah coins = [2, 3, 4] dan target = 10, tentukan isi tabel dp[] dari indeks 0 sampai 10!",
            options: [
                "dp[0..10] = [0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3]",
                "dp[0..8] = [1, 1, 1, 2, 2, 2, 2, 3, 3]",
                "dp[0..10] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]",
                "dp[0..10] = [0, 0, 2, 3, 4, 0, 0, 0, 0, 0, 0]",
                "dp[0..10] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            ],
            correctIndex: 0,
            explanation: "Tabel DP diisi dengan jumlah koin minimum untuk mencapai target i. dp[0]=0. Untuk i=1, tidak ada koin yang bisa digunakan (0). Untuk i=2 (koin 2), i=3 (koin 3), i=4 (koin 4), masing-masing butuh 1 koin. Dan seterusnya menggunakan transisi dp[i] = min(dp[i], dp[i-c]+1)."
        },
        {
            question: "Diberikan dua untaian: A = [3, 1, 3, 2, 7, 4, 8, 2] dan B = [6, 5, 1, 2, 3, 4]. Berapakah panjang Longest Common Subsequence (LCS) dari kedua untaian tersebut?",
            options: [
                "2",
                "3",
                "4",
                "5",
                "6"
            ],
            correctIndex: 1,
            explanation: "LCS dari kedua untaian tersebut memiliki panjang 3. Salah satu subsekuen terpanjangnya adalah [1, 2, 4] atau [1, 3, 4] atau [3, 2, 4]."
        }
    ];

    const coinTable = `
| Target (i) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|------------|---|---|---|---|---|---|---|---|---|---|----|
| dp[i]      | 0 | 0 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 3 | 3  |
    `.trim();

    const codeSnippet = `
// Pseudocode Minimum Coin Change
for (int i = 1; i <= target; i++) {
    dp[i] = INF;
    for (int coin : coins) {
        if (i >= coin) {
            dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
}
    `.trim();

    const lcsCode = `
// LCS Length Calculation
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (A[i-1] == B[j-1]) {
            dp[i][j] = dp[i-1][j-1] + 1;
        } else {
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
}
    `.trim();

    const pythonLcsCode = `
def solve_lcs():
    # Input n dan m
    n, m = map(int, input().split())
    # Input untaian A dan B
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))

    # Inisialisasi tabel DP (n+1 x m+1)
    dp = [[0] * (m + 1) for _ in range(n + 1)]

    # Mengisi tabel DP
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Output Panjang LCS
    print(dp[n][m])

    # Backtracking untuk mencari elemen LCS
    result = []
    i, j = n, m
    while i > 0 and j > 0:
        if a[i-1] == b[j-1]:
            result.append(a[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] >= dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    
    # Karena backtracking dari belakang, balik urutannya
    print(*(result[::-1]))

# Contoh Eksekusi:
# Input:
# 8 6
# 3 1 3 2 7 4 8 2
# 6 5 1 2 3 4
# Output:
# 3
# 1 2 4
    `.trim();

    const recursiveLcsCode = `
def lcs_recursive(A, B, n, m):
    # Base case: jika salah satu untaian habis
    if n == 0 or m == 0:
        return 0
    
    # Jika huruf terakhir sama
    if A[n-1] == B[m-1]:
        return 1 + lcs_recursive(A, B, n-1, m-1)
    
    # Jika berbeda, coba dua kemungkinan dan ambil yang maksimal
    else:
        return max(
            lcs_recursive(A, B, n-1, m),
            lcs_recursive(A, B, n, m-1)
        )

# Kelemahan: Sangat lambat untuk n dan m yang besar (> 20)
# karena banyak perhitungan yang diulang-ulang.
    `.trim();

</script>

<svelte:head>
    <title>Bedah Soal: Dynamic Programming - S2IF Notebook</title>
    <meta name="description" content="Pembahasan soal Minimum Coin Change pada materi Dynamic Programming." />
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Bedah Soal: Dynamic Programming"
        date="26 April 2026"
        status="done"
    />

    <NoteSection title="Minimum Coin Change Problem">
        <p>
            Problem ini meminta kita mencari <strong>jumlah koin minimum</strong> untuk mencapai suatu nilai target tertentu. 
            Setiap koin dapat digunakan berulang kali (unbounded).
        </p>

        <Callout type="info" title="Logika Transisi">
            <p>
                Gunakan array <code>dp[0...target]</code> di mana <code>dp[i]</code> adalah jumlah koin minimum untuk mencapai nilai <code>i</code>.
            </p>
            <ul>
                <li>Base case: <code>dp[0] = 0</code> (nol koin untuk nilai 0).</li>
                <li>Transisi: <code>dp[i] = min(dp[i], dp[i - coin] + 1)</code> untuk setiap koin yang tersedia.</li>
            </ul>
        </Callout>

        <Quiz {questions} />
    </NoteSection>

    <NoteSection title="Pembahasan Detail">
        <p>Mari kita breakdown pengisian tabel untuk <code>coins = [2, 3, 4]</code> dan <code>target = 10</code>:</p>
        
        <div class="table-container">
            <pre style="font-family: monospace; background: var(--color-surface-soft); padding: 1rem; overflow-x: auto; border: 1px solid var(--color-line);">
{coinTable}
            </pre>
        </div>

        <ul style="margin-top: 1.5rem;">
            <li><strong>i = 0</strong>: 0 koin.</li>
            <li><strong>i = 1</strong>: Tidak ada koin ≤ 1. (Isi 0 atau INF, di pilihan soal tertulis 0).</li>
            <li><strong>i = 2</strong>: Ambil koin 2 → <code>1 + dp[0] = 1</code>.</li>
            <li><strong>i = 3</strong>: Ambil koin 3 → <code>1 + dp[0] = 1</code>.</li>
            <li><strong>i = 4</strong>: Ambil koin 4 → <code>1 + dp[0] = 1</code>. (Bisa juga 2+2, tapi minimumnya 1).</li>
            <li><strong>i = 5</strong>: Ambil koin 2 → <code>1 + dp[3] = 2</code>, atau koin 3 → <code>1 + dp[2] = 2</code>.</li>
            <li><strong>i = 6</strong>: Ambil koin 3+3 atau 4+2 atau 2+2+2 → min adalah <strong>2 koin</strong>.</li>
            <li><strong>i = 7</strong>: Ambil koin 4+3 → <strong>2 koin</strong>.</li>
            <li><strong>i = 8</strong>: Ambil koin 4+4 → <strong>2 koin</strong>.</li>
            <li><strong>i = 9</strong>: Ambil koin 3+3+3 atau 4+3+2 → <strong>3 koin</strong>.</li>
            <li><strong>i = 10</strong>: Ambil koin 4+3+3 atau 4+4+2 → <strong>3 koin</strong>.</li>
        </ul>

        <CodeBlock code={codeSnippet} language="cpp" title="Implementasi C++" />
    </NoteSection>

    <NoteSection title="Studi Kasus: Longest Common Subsequence (LCS)">
        <Callout type="info" title="Deskripsi Soal Lengkap">
            <p>
                Diberikan dua untaian bilangan bulat, carilah subsekuen bersama terpanjang dari kedua untaian data tersebut.
            </p>
            <p>
                <strong>Subsekuen</strong> adalah sekuen yang diperoleh dari untaian elemen dari kiri ke kanan dengan mempertahankan urutan tetapi tidak harus bersebelahan langsung. <strong>Subsekuen bersama (common subsequence)</strong> adalah subsekuen yang sama muncul di kedua untaian yang diberikan.
            </p>
            
            <div class="example-box">
                <p><strong>Input:</strong></p>
                <pre>8 6
3 1 3 2 7 4 8 2
6 5 1 2 3 4</pre>
                <p><strong>Output:</strong></p>
                <pre>3
1 2 4</pre>
            </div>
        </Callout>

        <div class="explanation-grid">
            <div class="explanation-card" style="grid-column: 1 / -1;">
                <h3>0. Intuisi: Bagaimana Cara Berpikirnya?</h3>
                <p>
                    Bayangkan kita punya dua kata, misal <strong>"ABC"</strong> dan <strong>"ACD"</strong>. Kita bandingkan dari ujung belakang:
                </p>
                <ul>
                    <li><strong>Jika huruf paling belakang SAMA:</strong> Misal sama-sama "C". Berarti kita sudah menemukan 1 huruf yang sama! Tugas kita tinggal mencari LCS dari sisanya (yaitu "AB" dan "AD") lalu hasilnya ditambah 1.</li>
                    <li><strong>Jika huruf paling belakang BEDA:</strong> Misal "B" dan "D". Karena beda, kita punya dua pilihan:
                        <br>1. Coba cari kecocokan antara "AB" dengan "ACD" (buang satu huruf dari kata pertama).
                        <br>2. Coba cari kecocokan antara "ABC" dengan "AC" (buang satu huruf dari kata kedua).
                        <br>Kita ambil mana yang hasilnya lebih panjang!
                    </li>
                </ul>
                <p>
                    Karena kita sering menanyakan pertanyaan yang sama berulang kali (misal: "apa LCS dari A dan A?"), kita simpan jawabannya di dalam <strong>Tabel</strong> agar tidak perlu menghitung ulang. Itulah inti dari <em>Dynamic Programming</em>.
                </p>
            </div>

            <div class="explanation-card">
                <h3>1. Apa itu Untaian & Subsekuen?</h3>
                <p>
                    Sebelum masuk ke algoritma, kita harus paham istilah dasarnya dulu:
                </p>
                <ul>
                    <li><strong>Untaian (Sequence):</strong> Anggap saja ini adalah barisan angka atau huruf yang dirangkai seperti kalung. Urutannya penting!
                        <br><span style="color: var(--color-primary-light);">Contoh: [A, B, C, D]</span>
                    </li>
                    <li><strong>Subsekuen (Subsequence):</strong> Ini adalah cara mengambil "beberapa" anggota dari untaian tadi, <strong>TAPI</strong> syaratnya urutan aslinya tidak boleh ditukar-tukar. Kita boleh melompati anggota, tapi tidak boleh putar balik.
                    </li>
                </ul>

                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    <p><strong>Beda Subsekuen vs Substring:</strong></p>
                    <p>Misal untaiannya: <code>[S, E, K, U, E, N]</code></p>
                    <ul>
                        <li>✅ <strong>[S, K, N]</strong> adalah Subsekuen (urutan tetap, meski lompat).</li>
                        <li>❌ <strong>[K, S, N]</strong> BUKAN Subsekuen (urutan tertukar).</li>
                        <li>❌ <strong>[S, K, N]</strong> BUKAN Substring (karena lompat-lompat, substring harus nempel).</li>
                    </ul>
                </div>
            </div>

            <div class="explanation-card">
                <h3>2. Strategi Algoritma (DP)</h3>
                <p>
                    Kita menggunakan tabel 2D <code>dp[n+1][m+1]</code> untuk menyimpan panjang LCS hingga indeks tertentu:
                </p>
                <ol>
                    <li>Jika elemen sama: <code>A[i] == B[j]</code>, maka panjangnya adalah <code>1 + dp[i-1][j-1]</code>.</li>
                    <li>Jika berbeda: Ambil nilai maksimal dari atas atau kiri <code>max(dp[i-1][j], dp[i][j-1])</code>.</li>
                    <li><strong>Backtracking:</strong> Untuk mencari isi deretnya, kita telusuri balik dari pojok kanan bawah tabel ke arah mana nilai tersebut berasal.</li>
                </ol>
            </div>
        </div>

        <div class="code-comparison">
            <div class="code-column">
                <h4>Cara Biasa (Rekursif)</h4>
                <p>Mudah ditulis, tapi "boros" waktu karena menghitung hal yang sama berulang kali.</p>
                <CodeBlock code={recursiveLcsCode} language="python" title="Recursive LCS (Slow)" />
            </div>
            <div class="code-column">
                <h4>Cara Dynamic Programming</h4>
                <p>Menggunakan tabel memori agar jauh lebih cepat dan efisien.</p>
                <CodeBlock code={pythonLcsCode} language="python" title="DP LCS (Fast & Full)" />
            </div>
        </div>
        
        <Callout type="tip" title="Kenapa LCS Menggunakan DP?">
            <p>
                Karena masalah ini memiliki <strong>Overlapping Subproblems</strong>. Mencari LCS dari <code>A[1...n]</code> dan <code>B[1...m]</code> bergantung pada hasil LCS dari potongan yang lebih kecil (misal <code>A[1...n-1]</code>). Tanpa DP, kompleksitasnya akan eksponensial. Dengan DP, menjadi <code>O(n * m)</code>.
            </p>
        </Callout>
    </NoteSection>

    <BackLink href="/semester-1/algoritma-lanjut" label="Kembali ke Algoritma Lanjut" />
</article>

<style>
    .table-container {
        margin: 1rem 0;
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
        .explanation-grid, .code-comparison {
            grid-template-columns: 1fr;
        }
    }

    .code-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .code-column h4 {
        margin-top: 0;
        color: var(--color-ink-medium);
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    .code-column p {
        font-size: 0.9rem;
        color: var(--color-ink-low);
        margin-bottom: 1rem;
    }
</style>
