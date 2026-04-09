<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Adversarial Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Adversarial Search"
        date="09 April 2026"
        status="done"
        tags={["Game AI", "Minimax", "Alpha-Beta"]}
    />

    <NoteSection title="Definisi">
        <p>
            Adversarial search digunakan pada masalah multi-agent kompetitif,
            seperti catur atau tic-tac-toe, di mana setiap agen berusaha
            memaksimalkan keuntungannya dan meminimalkan keuntungan lawan.
        </p>
    </NoteSection>

    <NoteSection title="Minimax dan Alpha-Beta Pruning">
        <ul>
            <li><strong>Minimax</strong>: MAX memilih nilai terbesar, MIN memilih nilai terkecil.</li>
            <li>
                <strong>Alpha-Beta Pruning</strong>: memangkas cabang yang pasti tidak
                mempengaruhi keputusan akhir.
            </li>
        </ul>
        <Callout type="info">
            Alpha-Beta memberi hasil keputusan yang sama dengan Minimax, tetapi
            dengan jumlah evaluasi node yang lebih sedikit.
        </Callout>
    </NoteSection>

    <NoteSection title="Contoh Pseudocode Minimax">
        <CodeBlock
            language="python"
            code={`def minimax(node, depth, maximizing_player):
    if depth == 0 or node.is_terminal():
        return node.utility()

    if maximizing_player:
        best = float('-inf')
        for child in node.children():
            best = max(best, minimax(child, depth - 1, False))
        return best
    else:
        best = float('inf')
        for child in node.children():
            best = min(best, minimax(child, depth - 1, True))
        return best`}
        />
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>
