<!--
  CONTOH CATATAN BIASA (Standard Note)
  =====================================
  Ini adalah template untuk catatan teori/konsep.
  
  Cara menggunakan:
  1. Copy file ini ke folder topic baru
  2. Rename sesuai kebutuhan
  3. Edit kontennya
-->

<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import Sticker from "$lib/components/Sticker.svelte";
</script>

<svelte:head>
    <title>Pengantar Algoritma Lanjut - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <header class="note-header">
        <span class="date">📅 14 Januari 2026</span>
        <h1>Pengantar Algoritma Lanjut</h1>
        <div class="tags">
            <Sticker type="done">Selesai</Sticker>
            <Sticker type="important">Penting</Sticker>
        </div>
    </header>

    <NoteSection title="Apa itu Algoritma Lanjut?">
        <p>
            Algoritma lanjut adalah studi mendalam tentang <span
                class="highlight">teknik-teknik algoritmik</span
            > yang digunakan untuk menyelesaikan masalah komputasi yang kompleks
            secara efisien.
        </p>
        <p>Mata kuliah ini mencakup berbagai topik seperti:</p>
        <ul>
            <li>
                <strong>Teori Graf</strong> - Shortest path, spanning tree, network
                flow
            </li>
            <li>
                <strong>Dynamic Programming</strong> - Optimisasi dengan memoization
            </li>
            <li>
                <strong>Divide and Conquer</strong> - Memecah masalah menjadi subproblem
            </li>
            <li>
                <strong>Greedy Algorithms</strong> - Pemilihan lokal optimal
            </li>
        </ul>
    </NoteSection>

    <NoteSection title="Contoh Kode: Fibonacci dengan DP">
        <p>
            Berikut adalah contoh implementasi Fibonacci dengan Dynamic
            Programming:
        </p>

        <CodeBlock
            language="python"
            code={`def fibonacci_dp(n):
    """
    Menghitung Fibonacci ke-n menggunakan Dynamic Programming
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Contoh penggunaan
print(fibonacci_dp(10))  # Output: 55`}
        />

        <p>
            <strong>Penjelasan:</strong> Kita menyimpan hasil perhitungan
            sebelumnya dalam array <code>dp</code> untuk menghindari perhitungan
            ulang yang berlebihan.
        </p>
    </NoteSection>

    <NoteSection title="Catatan Penting">
        <blockquote class="important-note">
            💡 <strong>Tips:</strong> Selalu analisis kompleksitas waktu dan ruang
            sebelum memilih algoritma. Terkadang algoritma yang lebih "bodoh" justru
            lebih efektif untuk input yang kecil!
        </blockquote>
    </NoteSection>

    <footer class="note-footer">
        <p>
            <a href="/semester-1/algoritma-lanjut"
                >← Kembali ke Algoritma Lanjut</a
            >
        </p>
    </footer>
</article>

<style>
    .note-article {
        max-width: 800px;
    }

    .note-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px dashed var(--color-line);
    }

    .date {
        font-size: 0.875rem;
        opacity: 0.6;
    }

    .note-header h1 {
        margin: 0.5rem 0;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    ul {
        padding-left: 1.5rem;
        line-height: 2;
    }

    li {
        margin-bottom: 0.5rem;
    }

    .important-note {
        background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
        border-left: 4px solid var(--color-highlight);
        padding: 1rem 1.5rem;
        margin: 1rem 0;
        border-radius: 0 8px 8px 0;
        font-style: normal;
    }

    .note-footer {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid var(--color-line);
    }

    .note-footer a {
        color: var(--color-link);
        text-decoration: none;
    }

    .note-footer a:hover {
        text-decoration: underline;
    }
</style>
