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

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Algoritma Lanjut"
    />
</article>

<style>
    .note-article {
        max-width: 800px;
    }

    /* Playground Styles */
    .playground {
        background: #2c3e50;
        color: #ecf0f1;
        padding: 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .input-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: 8px;
        flex-wrap: wrap;
    }

    .number-input {
        background: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 1.2rem;
        width: 100px;
        color: #2c3e50;
    }

    .run-btn {
        background: var(--color-highlight);
        color: #2c3e50;
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.1s;
    }

    .run-btn:active {
        transform: scale(0.95);
    }

    .results-panel {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        padding: 1rem;
    }

    .main-result {
        font-size: 2rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 1rem;
    }

    .value {
        font-family: var(--font-mono);
        color: var(--color-highlight);
    }

    .metrics {
        font-size: 0.875rem;
        opacity: 0.8;
        margin-bottom: 1rem;
    }

    .steps-log h4 {
        margin: 0 0 0.5rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        opacity: 0.7;
    }

    .log-content {
        max-height: 200px;
        overflow-y: auto;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        background: rgba(0, 0, 0, 0.3);
        padding: 0.5rem;
        border-radius: 4px;
    }

    .log-item {
        padding: 0.25rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .line-num {
        color: #7f8c8d;
        margin-right: 0.5rem;
    }

    .empty-log {
        opacity: 0.5;
        font-style: italic;
    }
</style>
