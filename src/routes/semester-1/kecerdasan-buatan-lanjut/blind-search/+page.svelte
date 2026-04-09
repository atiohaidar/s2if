<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import BlindSearchTreeVisualizer from "./components/BlindSearchTreeVisualizer.svelte";
</script>

<svelte:head>
    <title>Blind Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Blind Search (Uninformed Search)"
        date="09 April 2026"
        status="done"
        tags={["BFS", "DFS", "UCS"]}
    />

    <NoteSection title="Definisi">
        <p>
            Blind search adalah strategi pencarian tanpa informasi tambahan
            (heuristic) tentang seberapa dekat suatu node ke tujuan.
        </p>
    </NoteSection>

    <NoteSection title="Jenis-Jenis Blind Search">
        <ul>
            <li><strong>Breadth-First Search (BFS)</strong>: eksplorasi level per level.</li>
            <li><strong>Depth-First Search (DFS)</strong>: telusuri sedalam mungkin dulu.</li>
            <li><strong>Uniform Cost Search (UCS)</strong>: pilih path dengan biaya total terkecil.</li>
        </ul>
    </NoteSection>
    <NoteSection title="Visualisasi Tree + Animasi Blind Search">
        <p>
            Di bawah ini kamu bisa membandingkan perilaku BFS, DFS, dan UCS pada
            tree yang sama. Tekan <code>Play</code> untuk animasi otomatis atau
            <code>Step</code> untuk mode langkah manual.
        </p>
        <BlindSearchTreeVisualizer />
    </NoteSection>

    <NoteSection title="Cara Mengerjakan BFS">
        <ol>
            <li>Masukkan node awal ke <code>queue</code>.</li>
            <li>Ambil node paling depan queue.</li>
            <li>Jika node adalah goal, berhenti.</li>
            <li>Masukkan semua tetangga yang belum dikunjungi ke belakang queue.</li>
            <li>Ulangi sampai goal ketemu atau queue kosong.</li>
        </ol>
        <CodeBlock
            language="python"
            code={`from collections import deque


def bfs(graph, start, goal):
    queue = deque([start])
    visited = {start}
    parent = {start: None}

    while queue:
        node = queue.popleft()

        if node == goal:
            break

        for nxt in graph.get(node, []):
            if nxt not in visited:
                visited.add(nxt)
                parent[nxt] = node
                queue.append(nxt)

    if goal not in parent:
        return None

    path = []
    cur = goal
    while cur is not None:
        path.append(cur)
        cur = parent[cur]

    return list(reversed(path))`}
        />
    </NoteSection>

    <NoteSection title="Cara Mengerjakan DFS">
        <ol>
            <li>Masukkan node awal ke <code>stack</code>.</li>
            <li>Ambil node paling atas stack.</li>
            <li>Jika node adalah goal, berhenti.</li>
            <li>Push tetangga (biasanya urutan dibalik agar traversal konsisten).</li>
            <li>Jika buntu, backtrack otomatis lewat stack.</li>
        </ol>
        <CodeBlock
            language="python"
            code={`def dfs(graph, start, goal):
    stack = [start]
    visited = set()
    parent = {start: None}

    while stack:
        node = stack.pop()
        if node in visited:
            continue

        visited.add(node)
        if node == goal:
            break

        # reversed agar urutan kunjungan kiri-ke-kanan lebih natural
        for nxt in reversed(graph.get(node, [])):
            if nxt not in visited:
                if nxt not in parent:
                    parent[nxt] = node
                stack.append(nxt)

    if goal not in parent:
        return None

    path = []
    cur = goal
    while cur is not None:
        path.append(cur)
        cur = parent[cur]

    return list(reversed(path))`}
        />
    </NoteSection>

    <NoteSection title="Cara Mengerjakan UCS">
        <ol>
            <li>Masukkan node awal ke <code>priority queue</code> dengan biaya 0.</li>
            <li>Ambil node dengan biaya terkecil.</li>
            <li>Jika node adalah goal, berhenti (ini biaya minimum).</li>
            <li>Relaksasi semua tetangga: update jika ada biaya baru lebih kecil.</li>
            <li>Ulangi sampai goal ditemukan atau queue kosong.</li>
        </ol>
        <CodeBlock
            language="python"
            code={`import heapq


def ucs(graph, start, goal):
    # graph[node] = [(neighbor, cost), ...]
    pq = [(0, start)]
    dist = {start: 0}
    parent = {start: None}

    while pq:
        cost, node = heapq.heappop(pq)

        if cost > dist[node]:
            continue

        if node == goal:
            break

        for nxt, w in graph.get(node, []):
            new_cost = cost + w
            if nxt not in dist or new_cost < dist[nxt]:
                dist[nxt] = new_cost
                parent[nxt] = node
                heapq.heappush(pq, (new_cost, nxt))

    if goal not in dist:
        return None, None

    path = []
    cur = goal
    while cur is not None:
        path.append(cur)
        cur = parent[cur]

    return list(reversed(path)), dist[goal]`}
        />
    </NoteSection>

    

    <NoteSection title="Contoh Singkat Kapan Dipakai?">
        <p>
            Untuk maze sederhana, BFS cocok jika tiap langkah punya biaya sama,
            karena BFS menjamin jalur terpendek berdasarkan jumlah langkah.
        </p>
        <ul>
            <li><strong>BFS</strong>: shortest path jika biaya tiap sisi sama.</li>
            <li><strong>DFS</strong>: memori hemat, cocok untuk eksplorasi cepat.</li>
            <li><strong>UCS</strong>: wajib saat bobot biaya antar-sisi berbeda.</li>
        </ul>

        <Callout type="info">
            Blind search sederhana dan umum dipakai sebagai baseline sebelum
            menggunakan heuristic yang lebih canggih.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>
