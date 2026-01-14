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
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Pengantar Algoritma Lanjut - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pengantar Algoritma Lanjut"
        date="14 Januari 2026"
        status="done"
        tags={["Penting"]}
    />

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
        <Callout type="tip">
            Selalu analisis kompleksitas waktu dan ruang sebelum memilih
            algoritma. Terkadang algoritma yang lebih "bodoh" justru lebih
            efektif untuk input yang kecil!
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Algoritma Lanjut"
    />
</article>

<style>
</style>
