<script lang="ts">
    import { onDestroy } from "svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    let { algorithm = "IDAStar" }: { algorithm?: "IDAStar" | "SMAStar" } = $props();

    const treeData = {
        id: "S",
        h: 10,
        children: [
            { id: "A", h: 8, cost: 2, children: [
                { id: "D", h: 7, cost: 3, children: [] },
                { id: "E", h: 1, cost: 10, children: [] }
            ]},
            { id: "B", h: 5, cost: 5, children: [
                { id: "F", h: 2, cost: 2, children: [
                    { id: "G", h: 0, cost: 1, children: [] } // Goal
                ]}
            ]}
        ]
    };

    const nodePositions: Record<string, {x: number, y: number}> = {
        S: {x: 300, y: 50},
        A: {x: 150, y: 130},
        B: {x: 450, y: 130},
        D: {x: 70, y: 210},
        E: {x: 230, y: 210},
        F: {x: 450, y: 210},
        G: {x: 450, y: 290}
    };

    const edges = [
        {from: 'S', to: 'A', cost: 2}, {from: 'S', to: 'B', cost: 5},
        {from: 'A', to: 'D', cost: 3}, {from: 'A', to: 'E', cost: 10},
        {from: 'B', to: 'F', cost: 2}, {from: 'F', to: 'G', cost: 1}
    ];

    const hValue: Record<string, number> = { S: 10, A: 8, B: 5, D: 7, E: 1, F: 2, G: 0 };

    type Snapshot = {
        currentNode: string;
        visited: string[];
        memory: string[];
        action: string;
        limit?: number;
        fValue?: number;
    };

    function simulate(): Snapshot[] {
        const snaps: Snapshot[] = [];
        if (algorithm === "IDAStar") {
            let limit = 10; // Initial limit S(h=10)
            let found = false;
            
            while (!found && limit < 25) {
                snaps.push({ currentNode: "-", visited: [], memory: [], action: `Set Batas Biaya (f-limit) = ${limit}`, limit });
                
                const dfs = (node: any, g: number, path: string[]) => {
                    const f = g + node.h;
                    const currentPath = [...path, node.id];
                    
                    if (f > limit) {
                        snaps.push({ currentNode: node.id, visited: currentPath, memory: [], action: `Stop! f=${f} melebihi batas ${limit}. Backtrack.`, limit, fValue: f });
                        return;
                    }

                    snaps.push({ currentNode: node.id, visited: currentPath, memory: [], action: `Cek ${node.id} (f=${f} <= ${limit})`, limit, fValue: f });

                    if (node.id === "G") {
                        found = true;
                        snaps.push({ currentNode: node.id, visited: currentPath, memory: [], action: `🎯 Goal G Ditemukan!`, limit, fValue: f });
                        return;
                    }

                    for (const child of node.children) {
                        if (found) return;
                        dfs(child, g + child.cost, currentPath);
                    }
                };

                dfs(treeData, 0, []);
                if (!found) limit += 3;
            }
        } else {
            // SMA* Simulation (Simplified for visualization)
            const memoryLimit = 3;
            let memory: string[] = ["S"];
            snaps.push({ currentNode: "S", visited: ["S"], memory: [...memory], action: "Mulai dari S. Memori: [S]" });

            // Step 1: Expand S to A, B
            memory = ["S", "A", "B"];
            snaps.push({ currentNode: "S", visited: ["S"], memory: [...memory], action: "Ekspansi S. Memori penuh (3/3)." });

            // Step 2: Need to expand A, but memory full. Forget B (worst f: 5+5=10)
            memory = ["S", "A", "D"]; // Simplified: forget B, add D
            snaps.push({ currentNode: "A", visited: ["S", "A"], memory: [...memory], action: "Memori Penuh! Hapus B (jalur buruk), simpan D." });

            // Step 3: Forget D (not goal), add B back or expand F
            memory = ["S", "B", "F"];
            snaps.push({ currentNode: "B", visited: ["S", "B"], memory: [...memory], action: "D bukan goal. Hapus D, panggil B lagi dan cek F." });

            // Step 4: Expand F to G
            memory = ["S", "F", "G"];
            snaps.push({ currentNode: "G", visited: ["S", "B", "F", "G"], memory: [...memory], action: "🎯 Goal G Ditemukan!" });
        }
        return snaps;
    }

    const snapshots = simulate();
    let step = $state(0);
    let isPlaying = $state(false);
    const maxStep = snapshots.length - 1;
    const snap = $derived(snapshots[step]);
    let timer: any;

    function next() { if (step < maxStep) step++; else stop(); }
    function prev() { if (step > 0) step--; stop(); }
    function stop() { if (timer) clearInterval(timer); isPlaying = false; }
    function togglePlay() {
        if (isPlaying) { stop(); return; }
        isPlaying = true;
        timer = setInterval(next, 1000);
    }
    onDestroy(stop);
</script>

<div class="mb-visualizer">
    <div class="vis-header">
        <div class="algo-info">
            <span class="badge">{algorithm === 'IDAStar' ? 'IDA*' : 'SMA*'}</span>
            <span class="status">{snap.action}</span>
        </div>
        <div class="controls">
            <button onclick={prev} disabled={step === 0}>Prev</button>
            <button onclick={togglePlay} class="play-btn">
                {isPlaying ? "Pause" : "Play"}
            </button>
            <button onclick={next} disabled={step === maxStep}>Next</button>
            <button onclick={() => { step = 0; stop(); }}>Reset</button>
        </div>
    </div>

    <div class="vis-content">
        <div class="canvas-area">
            <svg viewBox="0 0 600 350">
                <!-- Edges -->
                {#each edges as edge}
                    <line 
                        x1={nodePositions[edge.from].x} y1={nodePositions[edge.from].y}
                        x2={nodePositions[edge.to].x} y2={nodePositions[edge.to].y}
                        class="edge"
                        class:active={snap.visited.includes(edge.from) && snap.visited.includes(edge.to)}
                    />
                    <text 
                        x={(nodePositions[edge.from].x + nodePositions[edge.to].x) / 2 + 10}
                        y={(nodePositions[edge.from].y + nodePositions[edge.to].y) / 2}
                        class="edge-label"
                    >{edge.cost}</text>
                {/each}

                <!-- Nodes -->
                {#each Object.entries(nodePositions) as [id, pos]}
                    <g transform="translate({pos.x},{pos.y})" class="node" 
                       class:current={snap.currentNode === id}
                       class:in-memory={algorithm === 'SMAStar' && snap.memory.includes(id)}
                       class:visited={snap.visited.includes(id)}>
                        <circle r="18" />
                        <text class="label" dy="5">{id}</text>
                        <text class="h-val" y="30">h={hValue[id]}</text>
                    </g>
                {/each}

                <!-- IDA* Limit Line -->
                {#if algorithm === 'IDAStar' && snap.limit}
                    <g transform="translate(450, 40)">
                        <rect width="120" height="30" rx="5" fill="#fee2e2" stroke="#ef4444" />
                        <text x="10" y="20" font-size="12" font-weight="bold" fill="#b91c1c">f-limit: {snap.limit}</text>
                    </g>
                {/if}
            </svg>
        </div>

        <div class="side-panel">
            {#if algorithm === 'IDAStar'}
                <div class="panel-box limit-box">
                    <h4>Logika IDA*</h4>
                    <p>Mencari dengan batas biaya <strong>f</strong>. Jika gagal, batas dinaikkan.</p>
                    <div class="limit-indicator">
                        <span>Current f: <strong>{snap.fValue || '-'}</strong></span>
                        <span>Limit: <strong>{snap.limit || '-'}</strong></span>
                    </div>
                </div>
            {:else}
                <div class="panel-box memory-box">
                    <h4>Memori SMA*</h4>
                    <p>Limit Memori: <strong>3 Node</strong></p>
                    <div class="mem-list">
                        {#each snap.memory as m}
                            <span class="mem-tag">{m}</span>
                        {/each}
                    </div>
                </div>
            {/if}
            
            <div class="explanation">
                <p><strong>Kenapa pakai ini?</strong></p>
                {#if algorithm === 'IDAStar'}
                    <p>Karena IDA* irit memori (pakai DFS) tapi tetap menjamin jalur terpendek (pakai f-cost).</p>
                {:else}
                    <p>SMA* mencegah komputer "hang" saat kehabisan RAM dengan cara menghapus jalur yang paling tidak menjanjikan.</p>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .mb-visualizer {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 16px;
        padding: 1.5rem;
        margin: 1.5rem 0;
    }
    .vis-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .algo-info { display: flex; align-items: center; gap: 1rem; }
    .badge { background: var(--color-binder); color: white; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; }
    .status { font-size: 0.9rem; font-weight: 600; color: var(--color-ink-soft); }

    .controls { display: flex; gap: 0.5rem; }
    .controls button {
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid var(--color-line);
        background: var(--color-surface-soft);
        font-size: 0.8rem;
        cursor: pointer;
    }
    .play-btn { background: var(--color-binder) !important; color: white; border: none !important; min-width: 70px; }

    .vis-content { display: grid; grid-template-columns: 1fr 220px; gap: 1.5rem; }
    .canvas-area { background: var(--color-surface-soft); border-radius: 12px; }
    svg { width: 100%; height: auto; }

    .edge { stroke: #cbd5e1; stroke-width: 2; }
    .edge.active { stroke: var(--color-binder); stroke-width: 4; transition: all 0.3s; }
    .edge-label { font-size: 12px; fill: #64748b; font-weight: bold; }

    .node circle { fill: var(--color-surface-elevated); stroke: #cbd5e1; stroke-width: 2; transition: all 0.3s; }
    .node .label { text-anchor: middle; font-weight: 800; font-size: 14px; fill: var(--color-ink-strong); }
    .node .h-val { text-anchor: middle; font-size: 10px; fill: #64748b; font-weight: bold; }

    .node.visited circle { stroke: var(--color-binder); }
    .node.current circle { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 4; }
    .node.in-memory circle { fill: #dcfce7; stroke: #22c55e; }

    .side-panel { display: flex; flex-direction: column; gap: 1rem; }
    .panel-box { background: var(--color-surface-soft); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .panel-box h4 { margin: 0 0 0.5rem; font-size: 0.9rem; color: var(--color-binder); }
    .panel-box p { font-size: 0.75rem; margin: 0; line-height: 1.4; color: var(--color-ink-soft); }

    .limit-indicator { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.75rem; font-size: 0.85rem; }
    .mem-list { display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap; }
    .mem-tag { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }

    .explanation { font-size: 0.8rem; line-height: 1.5; padding: 0.5rem; border-left: 3px solid var(--color-line); }

    @media (max-width: 768px) {
        .vis-content { grid-template-columns: 1fr; }
    }
</style>
