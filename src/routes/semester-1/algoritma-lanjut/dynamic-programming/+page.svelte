<!--
  CONTOH CATATAN PRAKTEK (Practice Note)
  ======================================
  Ini adalah contoh catatan untuk latihan koding / playground.
  Studi kasus: Dynamic Programming - Fibonacci / Coin Change
-->
<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";

    const quizQuestions = [
        {
            question:
                "Berapa kompleksitas waktu Fibonacci rekursif polos (tanpa DP)?",
            options: ["O(n)", "O(n^2)", "O(2^n)", "O(log n)"],
            correctIndex: 2,
            explanation:
                "Tanpa memoization, banyak sub-masalah dihitung berulang kali secara eksponensial.",
        },
        {
            question: "Manakah ciri utama Dynamic Programming?",
            options: [
                "Greedy Choice",
                "Overlapping Subproblems",
                "Randomization",
                "Backtracking",
            ],
            correctIndex: 1,
            explanation:
                "DP efektif jika masalah memiliki Overlapping Subproblems dan Optimal Substructure.",
        },
    ];

    // Fibonacci Playground State
    let n = $state(10);
    let result = $state(0);
    let steps: string[] = $state([]);
    let calculationTime = $state(0);

    function calculateFib() {
        const start = performance.now();
        steps = [];

        // Simple iterative approach for visualization
        if (n < 0) return;

        let dp = [0, 1];
        steps.push(`F(0) = 0`);
        steps.push(`F(1) = 1`);

        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
            steps.push(
                `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
            );
        }

        result = dp[n];
        const end = performance.now();
        calculationTime = end - start;
    }
</script>

<svelte:head>
    <title>Playground: Dynamic Programming - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Praktek: Dynamic Programming"
        date="16 Januari 2026"
        status="todo"
        tags={["Playground"]}
    />

    <NoteSection title="Tantangan: Fibonacci Sequence">
        <p>
            Cobalah pahami bagaimana nilai Fibonacci dibentuk dari penjumlahan
            dua nilai sebelumnya. Gunakan simulator di bawah ini untuk melihat
            langkah-langkahnya (Bottom-Up approach).
        </p>
    </NoteSection>

    <!-- Interactive Playground -->
    <div class="playground">
        <div class="input-group">
            <label for="fib-input">Hitung Fibonacci ke-</label>
            <input
                id="fib-input"
                type="number"
                bind:value={n}
                min="0"
                max="100"
                class="number-input"
            />
            <button class="run-btn" onclick={calculateFib}>
                🏃 Jalankan
            </button>
        </div>

        <div class="results-panel">
            <div class="main-result">
                <span class="label">Hasil:</span>
                <span class="value">{result}</span>
            </div>

            <div class="metrics">
                <span
                    >⏱️ Waktu Eksekusi: <strong
                        >{calculationTime.toFixed(4)}ms</strong
                    ></span
                >
            </div>

            <div class="steps-log">
                <h4>📜 Trace Log (Langkah Kerja):</h4>
                <div class="log-content">
                    {#each steps as step, i}
                        <div class="log-item">
                            <span class="line-num">{i}:</span>
                            {step}
                        </div>
                    {/each}
                    {#if steps.length === 0}
                        <p class="empty-log">
                            Klik "Jalankan" untuk melihat langkah-langkahnya.
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <NoteSection title="Kode Referensi">
        <p>Implementasi Python untuk solusi di atas:</p>
        <CodeBlock
            language="python"
            code={`def fib_bottom_up(n):
    if n <= 1: return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        
    return dp[n]`}
        />
    </NoteSection>

    <NoteSection title="Catatan">
        <Callout type="tip">
            Perhatikan bahwa pendekatan Bottom-Up ini memiliki kompleksitas
            waktu O(n) dan ruang O(n). Untuk optimisasi ruang, kita hanya perlu
            menyimpan dua nilai terakhir saja!
        </Callout>
    </NoteSection>

    <NoteSection title="Uji Pemahaman">
        <Quiz title="Kuis Dinamis" questions={quizQuestions} />
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Desain Algoritma Lanjut"
    />
</article>
