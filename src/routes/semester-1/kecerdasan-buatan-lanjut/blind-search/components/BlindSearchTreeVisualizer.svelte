<script lang="ts">
    import { onDestroy } from "svelte";

    type Algo = "BFS" | "DFS" | "UCS";

    const edgeCosts: Record<string, number> = {
        "S-A": 1,
        "S-B": 5,
        "S-C": 2,
        "A-D": 4,
        "A-E": 1,
        "B-F": 1,
        "B-G": 1,
        "C-H": 1,
        "C-I": 5,
    };

    const nodePositions = {
        S: { x: 320, y: 40 },
        A: { x: 160, y: 130 },
        B: { x: 320, y: 130 },
        C: { x: 480, y: 130 },
        D: { x: 80, y: 230 },
        E: { x: 160, y: 230 },
        F: { x: 280, y: 230 },
        G: { x: 360, y: 230 },
        H: { x: 480, y: 230 },
        I: { x: 560, y: 230 },
    } as const;

    const treeEdges = [
        ["S", "A"],
        ["S", "B"],
        ["S", "C"],
        ["A", "D"],
        ["A", "E"],
        ["B", "F"],
        ["B", "G"],
        ["C", "H"],
        ["C", "I"],
    ] as const;

    const allNodes = Object.entries(nodePositions) as [
        keyof typeof nodePositions,
        (typeof nodePositions)[keyof typeof nodePositions],
    ][];

    const traversals: Record<Algo, string[]> = {
        BFS: ["S", "A", "B", "C", "D", "E", "F", "G", "H"],
        DFS: ["S", "A", "D", "E", "B", "F", "G", "C", "H"],
        UCS: ["S", "A", "C", "E", "H"],
    };

    const pseudoAction: Record<Algo, string[]> = {
        BFS: [
            "Start dari root S, masukkan ke queue.",
            "Pop S, enqueue semua child: A, B, C.",
            "Pop A, enqueue child A: D, E.",
            "Pop B, enqueue child B: F, G.",
            "Pop C, enqueue child C: H, I.",
            "Pop D, belum goal.",
            "Pop E, belum goal.",
            "Pop F lalu G, belum goal.",
            "Pop H, goal ditemukan.",
        ],
        DFS: [
            "Start dari root S, push ke stack.",
            "Kunjungi A (cabang kiri dulu).",
            "Turun ke D (paling dalam pada cabang A).",
            "Backtrack ke E.",
            "Backtrack ke B.",
            "Turun ke F.",
            "Lanjut ke G.",
            "Backtrack ke C.",
            "Turun ke H, goal ditemukan.",
        ],
        UCS: [
            "Start dari S dengan biaya 0 di priority queue.",
            "Pilih A (biaya 1) karena paling kecil.",
            "Pilih C (biaya 2) lebih kecil dari kandidat lain.",
            "Pilih E (biaya 2) dari jalur S-A-E.",
            "Pilih H (biaya 3), goal ditemukan paling murah.",
        ],
    };

    let algorithm = $state<Algo>("BFS");
    let step = $state(0);
    let isPlaying = $state(false);
    let timer: ReturnType<typeof setInterval> | null = null;

    const order = $derived(traversals[algorithm]);
    const visitedNow = $derived(order.slice(0, step));
    const currentNode = $derived(step > 0 ? order[step - 1] : "-");
    const goalReached = $derived(visitedNow.includes("H"));
    const action = $derived(step > 0 ? pseudoAction[algorithm][step - 1] : "Tekan Play untuk mulai animasi.");

    function isEdgeVisited(from: string, to: string) {
        return visitedNow.includes(from) && visitedNow.includes(to);
    }

    function getEdgeCost(from: keyof typeof nodePositions, to: keyof typeof nodePositions) {
        return edgeCosts[`${from}-${to}`];
    }

    function getEdgeLabelPosition(from: keyof typeof nodePositions, to: keyof typeof nodePositions) {
        const fromPos = nodePositions[from];
        const toPos = nodePositions[to];

        const x1 = fromPos.x;
        const y1 = fromPos.y + 24;
        const x2 = toPos.x;
        const y2 = toPos.y - 24;

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        // Geser label sedikit dari garis agar tidak menimpa edge.
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.hypot(dx, dy) || 1;
        const nx = -dy / length;
        const ny = dx / length;
        const offset = 12;

        return {
            x: midX + nx * offset,
            y: midY + ny * offset,
        };
    }

    function clearTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function stopPlayback() {
        clearTimer();
        isPlaying = false;
    }

    function reset() {
        stopPlayback();
        step = 0;
    }

    function setAlgorithm(next: Algo) {
        if (algorithm === next) return;
        algorithm = next;
        reset();
    }

    function nextStep() {
        if (step < order.length) {
            step += 1;
        } else {
            stopPlayback();
        }
    }

    function togglePlay() {
        if (isPlaying) {
            stopPlayback();
            return;
        }

        isPlaying = true;
        timer = setInterval(() => {
            if (step >= order.length) {
                stopPlayback();
                return;
            }
            step += 1;
        }, 850);
    }

    onDestroy(() => {
        clearTimer();
    });
</script>

<div class="visualizer-card">
    <div class="top-controls">
        <div class="algo-tabs" role="tablist" aria-label="Pilih algoritma blind search">
            {#each (["BFS", "DFS", "UCS"] as Algo[]) as algo}
                <button
                    class="algo-btn"
                    class:active={algorithm === algo}
                    role="tab"
                    aria-selected={algorithm === algo}
                    onclick={() => setAlgorithm(algo)}
                >
                    {algo}
                </button>
            {/each}
        </div>

        <div class="playback-controls">
            <button class="action-btn" onclick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <button class="action-btn" onclick={nextStep} disabled={step >= order.length}>Step</button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="status-panel">
        <p><strong>Node saat ini:</strong> {currentNode}</p>
        <p><strong>Langkah:</strong> {step}/{order.length}</p>
        <p><strong>Aksi:</strong> {action}</p>
        <p><strong>Status goal H:</strong> {goalReached ? "Ditemukan" : "Belum"}</p>
    </div>

    <div class="tree-wrap">
        <div class="tree-canvas" role="img" aria-label="Tree pencarian blind search">
            <svg class="tree-lines" viewBox="0 0 640 270" preserveAspectRatio="xMidYMid meet">
                {#each treeEdges as [from, to]}
                    <line
                        x1={nodePositions[from].x}
                        y1={nodePositions[from].y + 24}
                        x2={nodePositions[to].x}
                        y2={nodePositions[to].y - 24}
                        class:edge-visited={isEdgeVisited(from, to)}
                    />
                {/each}

                <g class="edge-labels" class:show-costs={algorithm === "UCS"}>
                    {#each treeEdges as [from, to]}
                        {@const labelPos = getEdgeLabelPosition(from, to)}
                        <g class="edge-weight" transform={`translate(${labelPos.x}, ${labelPos.y})`}>
                            <circle r="11"></circle>
                            <text x="0" y="1">{getEdgeCost(from, to)}</text>
                        </g>
                    {/each}
                </g>
            </svg>

            {#each allNodes as [node, pos]}
                <div
                    class="node"
                    class:visited={visitedNow.includes(node)}
                    class:current={currentNode === node}
                    class:goal={node === "H"}
                    style={`left: ${pos.x}px; top: ${pos.y}px;`}
                >
                    {node}
                </div>
            {/each}
        </div>
    </div>

    <div class="legend">
        <span><i class="dot"></i> Belum dikunjungi</span>
        <span><i class="dot visited"></i> Sudah dikunjungi</span>
        <span><i class="dot current"></i> Sedang dieksekusi</span>
        <span><i class="dot goal"></i> Goal</span>
    </div>

    <details class="costs">
        <summary>Bobot sisi untuk simulasi UCS</summary>
        <p>S-A(1), S-B(5), S-C(2), A-D(4), A-E(1), B-F(1), B-G(1), C-H(1), C-I(5)</p>
    </details>
</div>

<style>
    .visualizer-card {
        background: #fff;
        border: 1px solid var(--color-line);
        border-radius: 12px;
        padding: 1rem;
        margin: 1rem 0;
        box-shadow: 0 6px 18px rgba(60, 45, 30, 0.08);
    }

    .top-controls {
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .algo-tabs,
    .playback-controls {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .algo-btn,
    .action-btn {
        border: 1px solid var(--color-line);
        background: #fff;
        color: var(--color-ink);
        border-radius: 8px;
        padding: 0.45rem 0.75rem;
        cursor: pointer;
        font-weight: 600;
    }

    .algo-btn.active {
        background: #f4e5d5;
        border-color: #bb8a56;
        color: #5a3c1d;
    }

    .action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .status-panel {
        margin: 0.95rem 0;
        padding: 0.8rem;
        background: #fbf7f1;
        border-radius: 8px;
        border-left: 4px solid #c5863f;
    }

    .status-panel p {
        margin: 0.2rem 0;
        font-size: 0.93rem;
    }

    .tree-wrap {
        overflow-x: auto;
        padding: 0.8rem 0.2rem;
    }

    .tree-canvas {
        width: 640px;
        min-width: 640px;
        height: 270px;
        position: relative;
        margin: 0 auto;
    }

    .tree-lines {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .tree-lines line {
        stroke: #b9a690;
        stroke-width: 3;
        stroke-linecap: round;
        transition: stroke 0.25s ease;
    }

    .tree-lines line.edge-visited {
        stroke: #6da070;
    }

    .edge-labels {
        opacity: 0.45;
        transition: opacity 0.2s ease;
    }

    .edge-labels.show-costs {
        opacity: 1;
    }

    .edge-weight circle {
        fill: #fff;
        stroke: #b9a690;
        stroke-width: 1.2;
    }

    .edge-labels.show-costs .edge-weight circle {
        fill: #fff7e8;
        stroke: #b47d33;
    }

    .edge-weight text {
        text-anchor: middle;
        dominant-baseline: middle;
        font-size: 11px;
        font-weight: 700;
        fill: #5b4634;
        user-select: none;
    }

    .node {
        width: 48px;
        height: 48px;
        border-radius: 999px;
        border: 2px solid #c8b29a;
        background: #fff;
        color: #5b4634;
        display: grid;
        place-items: center;
        font-weight: 700;
        position: absolute;
        transform: translate(-50%, -50%);
        transition: transform 0.28s ease, background-color 0.28s ease, box-shadow 0.28s ease;
    }

    .node.visited {
        background: #e8f5e9;
        border-color: #5f9a62;
        color: #1f5a23;
        animation: pop 0.3s ease;
    }

    .node.current {
        background: #fff3cd;
        border-color: #d29b31;
        color: #704a00;
        box-shadow: 0 0 0 4px rgba(210, 155, 49, 0.2);
        transform: translate(-50%, -50%) scale(1.08);
    }

    .node.goal {
        border-style: dashed;
    }

    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 0.9rem;
        margin-top: 0.75rem;
        font-size: 0.9rem;
    }

    .legend span {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
    }

    .dot {
        width: 11px;
        height: 11px;
        border-radius: 999px;
        background: #fff;
        border: 1px solid #c8b29a;
        display: inline-block;
    }

    .dot.visited {
        background: #e8f5e9;
        border-color: #5f9a62;
    }

    .dot.current {
        background: #fff3cd;
        border-color: #d29b31;
    }

    .dot.goal {
        background: #fff;
        border: 1px dashed #6b8f3b;
    }

    .costs {
        margin-top: 0.8rem;
        font-size: 0.9rem;
        color: #5b4634;
    }

    .costs summary {
        cursor: pointer;
        font-weight: 600;
    }

    @keyframes pop {
        0% {
            transform: scale(0.82);
        }

        100% {
            transform: scale(1);
        }
    }

    @media (max-width: 768px) {
        .node {
            width: 42px;
            height: 42px;
            font-size: 0.92rem;
        }

        .tree-canvas {
            width: 600px;
            min-width: 600px;
            height: 270px;
        }

        .status-panel p {
            font-size: 0.88rem;
        }
    }

    @media (max-width: 480px) {
        .node {
            width: 36px;
            height: 36px;
            font-size: 0.85rem;
        }

        .tree-canvas {
            width: 560px;
            min-width: 560px;
            height: 255px;
        }
    }
</style>
