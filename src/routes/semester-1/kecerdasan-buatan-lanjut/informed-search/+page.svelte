<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>Informed Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Informed Search (Heuristic Search)"
        date="09 April 2026"
        status="done"
        tags={["Heuristic", "Greedy", "A*"]}
    />

    <NoteSection title="Definisi">
        <p>
            Informed search memanfaatkan <strong>heuristic h(n)</strong> untuk
            memperkirakan jarak node ke tujuan, sehingga pencarian bisa lebih
            fokus ke kandidat yang menjanjikan.
        </p>
    </NoteSection>

    <NoteSection title="Algoritma Populer">
        <ul>
            <li><strong>Greedy Best-First Search</strong>: pilih node dengan h(n) terkecil.</li>
            <li><strong>A*</strong>: pilih node dengan nilai f(n) = g(n) + h(n).</li>
        </ul>
        <p>
            Di sini g(n) adalah biaya dari start ke node n, sedangkan h(n) adalah
            estimasi biaya dari n ke goal.
        </p>
    </NoteSection>

    <NoteSection title="Contoh A* (Ringkas)">
        <CodeBlock
            language="python"
            code={`import heapq


def astar(start, goal, neighbors, heuristic):
    pq = [(0, start)]
    came_from = {start: None}
    g_score = {start: 0}

    while pq:
        _, current = heapq.heappop(pq)
        if current == goal:
            break

        for nxt, cost in neighbors(current):
            tentative_g = g_score[current] + cost
            if nxt not in g_score or tentative_g < g_score[nxt]:
                g_score[nxt] = tentative_g
                f_score = tentative_g + heuristic(nxt, goal)
                heapq.heappush(pq, (f_score, nxt))
                came_from[nxt] = current

    return came_from, g_score`}
        />

        <Callout type="tip">
            A* akan optimal jika heuristic admissible (tidak overestimate biaya
            sebenarnya ke goal).
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>
