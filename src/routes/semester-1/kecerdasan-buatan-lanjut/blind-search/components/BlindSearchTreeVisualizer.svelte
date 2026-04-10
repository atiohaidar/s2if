<script lang="ts">
    import { onDestroy } from "svelte";

    type Algo = "BFS" | "DFS" | "UCS";
    type NodeId = keyof typeof nodePositions;

    type QueueEntry = {
        node: NodeId;
        cost: number;
        depth: number;
    };

    type Snapshot = {
        node: NodeId | "-";
        action: string;
        frontier: string[];
        visited: NodeId[];
        currentPath: NodeId[];
        expandedEdges?: [NodeId, NodeId][];
        goalReached: boolean;
    };

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
        S: { x: 320, y: 35 },
        A: { x: 200, y: 125 },
        B: { x: 320, y: 125 },
        C: { x: 440, y: 125 },
        D: { x: 120, y: 245 },
        E: { x: 200, y: 245 },
        F: { x: 280, y: 245 },
        G: { x: 360, y: 245 },
        H: { x: 440, y: 245 },
        I: { x: 520, y: 245 },
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
        NodeId,
        (typeof nodePositions)[keyof typeof nodePositions],
    ][];

    const adjacency: Record<NodeId, NodeId[]> = {
        S: ["A", "B", "C"],
        A: ["D", "E"],
        B: ["F", "G"],
        C: ["H", "I"],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
    };

    const goalNode: NodeId = "H";

    function buildPath(
        parents: Partial<Record<NodeId, NodeId | null>>,
        node: NodeId,
    ): NodeId[] {
        const path: NodeId[] = [node];
        let cursor = parents[node] ?? null;

        while (cursor) {
            path.unshift(cursor);
            cursor = parents[cursor] ?? null;
        }

        return path;
    }

    function formatFrontier(entries: QueueEntry[]): string[] {
        return entries.map((entry) => `${entry.node}${entry.cost > 0 ? `(${entry.cost})` : ""}`);
    }

    function snapshotGoal(
        node: NodeId,
        action: string,
        frontier: QueueEntry[],
        visited: NodeId[],
        parents: Partial<Record<NodeId, NodeId | null>>,
        expandedEdges?: [NodeId, NodeId][],
    ): Snapshot {
        return {
            node,
            action,
            frontier: formatFrontier(frontier),
            visited: [...visited],
            currentPath: buildPath(parents, node),
            expandedEdges,
            goalReached: node === goalNode,
        };
    }

    function simulateBfs(): Snapshot[] {
        const snapshots: Snapshot[] = [];
        const queue: QueueEntry[] = [{ node: "S", cost: 0, depth: 0 }];
        const visited = new Set<NodeId>();
        const discovered = new Set<NodeId>(["S"]);
        const parents: Partial<Record<NodeId, NodeId | null>> = { S: null };

        snapshots.push({
            node: "-",
            action: "Start dari root S dan masukkan ke queue.",
            frontier: ["S"],
            visited: [],
            currentPath: ["S"],
            goalReached: false,
        });

        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) break;

            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node,
                    action: `Pop ${current.node}, goal ditemukan.`,
                    frontier: formatFrontier(queue),
                    visited: [...visited],
                    currentPath,
                    expandedEdges: [],
                    goalReached: true,
                });
                break;
            }

            const children = adjacency[current.node].filter((child) => !discovered.has(child));
            const expandedEdges: [NodeId, NodeId][] = [];
            children.forEach((child) => {
                discovered.add(child);
                parents[child] = current.node;
                queue.push({ node: child, cost: 0, depth: current.depth + 1 });
                expandedEdges.push([current.node, child]);
            });

            snapshots.push({
                node: current.node,
                action:
                    children.length > 0
                        ? `Pop ${current.node}, enqueue child: ${children.join(", ")}.`
                        : `Pop ${current.node}, tidak ada child baru.`,
                frontier: formatFrontier(queue),
                visited: [...visited],
                currentPath,
                expandedEdges,
                goalReached: false,
            });
        }

        return snapshots;
    }

    function simulateDfs(): Snapshot[] {
        const snapshots: Snapshot[] = [];
        const stack: QueueEntry[] = [{ node: "S", cost: 0, depth: 0 }];
        const visited = new Set<NodeId>();
        const discovered = new Set<NodeId>(["S"]);
        const parents: Partial<Record<NodeId, NodeId | null>> = { S: null };

        snapshots.push({
            node: "-",
            action: "Start dari root S dan push ke stack.",
            frontier: ["S"],
            visited: [],
            currentPath: ["S"],
            goalReached: false,
        });

        while (stack.length > 0) {
            const current = stack.pop();
            if (!current) break;

            if (visited.has(current.node)) {
                continue;
            }

            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node,
                    action: `Pop ${current.node}, goal ditemukan.`,
                    frontier: formatFrontier(stack),
                    visited: [...visited],
                    currentPath,
                    expandedEdges: [],
                    goalReached: true,
                });
                break;
            }

            const children = [...adjacency[current.node]].reverse().filter((child) => !discovered.has(child));
            const expandedEdges: [NodeId, NodeId][] = [];
            children.forEach((child) => {
                discovered.add(child);
                parents[child] = current.node;
                stack.push({ node: child, cost: 0, depth: current.depth + 1 });
                expandedEdges.push([current.node, child]);
            });

            snapshots.push({
                node: current.node,
                action:
                    children.length > 0
                        ? `Pop ${current.node}, push child: ${children.slice().reverse().join(", ")}.`
                        : `Pop ${current.node}, tidak ada child baru.`,
                frontier: formatFrontier(stack),
                visited: [...visited],
                currentPath,
                expandedEdges,
                goalReached: false,
            });
        }

        return snapshots;
    }

    function simulateUcs(): Snapshot[] {
        const snapshots: Snapshot[] = [];
        const frontier: QueueEntry[] = [{ node: "S", cost: 0, depth: 0 }];
        const visited = new Set<NodeId>();
        const bestCost: Partial<Record<NodeId, number>> = { S: 0 };
        const parents: Partial<Record<NodeId, NodeId | null>> = { S: null };

        snapshots.push({
            node: "-",
            action: "Start dari S dengan biaya 0 di priority queue.",
            frontier: ["S(0)"],
            visited: [],
            currentPath: ["S"],
            goalReached: false,
        });

        while (frontier.length > 0) {
            frontier.sort((left, right) => left.cost - right.cost || left.depth - right.depth || left.node.localeCompare(right.node));
            const current = frontier.shift();
            if (!current) break;

            if (visited.has(current.node)) {
                continue;
            }

            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node,
                    action: `Pop ${current.node}, goal ditemukan dengan biaya total ${current.cost}.`,
                    frontier: formatFrontier(frontier),
                    visited: [...visited],
                    currentPath,
                    expandedEdges: [],
                    goalReached: true,
                });
                break;
            }

            const expandedEdges: [NodeId, NodeId][] = [];
            adjacency[current.node].forEach((child) => {
                const totalCost = current.cost + (edgeCosts[`${current.node}-${child}`] ?? 0);
                if (bestCost[child] === undefined || totalCost < bestCost[child]!) {
                    bestCost[child] = totalCost;
                    parents[child] = current.node;
                    frontier.push({ node: child, cost: totalCost, depth: current.depth + 1 });
                    expandedEdges.push([current.node, child]);
                }
            });

            snapshots.push({
                node: current.node,
                action: `Pop ${current.node}, update kandidat berdasarkan biaya total.`,
                frontier: formatFrontier(frontier),
                visited: [...visited],
                currentPath,
                expandedEdges,
                goalReached: false,
            });
        }

        return snapshots;
    }

    const snapshotsByAlgo: Record<Algo, Snapshot[]> = {
        BFS: simulateBfs(),
        DFS: simulateDfs(),
        UCS: simulateUcs(),
    };

    let algorithm = $state<Algo>("BFS");
    let step = $state(0);
    let isPlaying = $state(false);
    let timer: ReturnType<typeof setInterval> | null = null;

    const snapshots = $derived(snapshotsByAlgo[algorithm]);
    const currentSnapshot = $derived(snapshots[Math.min(step, snapshots.length - 1)] ?? snapshots[0]);
    const visitedNow = $derived(currentSnapshot?.visited ?? []);
    const currentNode = $derived(currentSnapshot?.node ?? "-");
    const goalReached = $derived(Boolean(currentSnapshot?.goalReached));
    const action = $derived(currentSnapshot?.action ?? "Tekan Play untuk mulai animasi.");
    const frontier = $derived(currentSnapshot?.frontier ?? []);
    const currentPath = $derived(currentSnapshot?.currentPath ?? []);
    const expansionEdges = $derived(currentSnapshot?.expandedEdges ?? []);
    const solutionEdgeKeys = $derived(getPathEdgeKeys(currentPath));

    function getPathEdgeKeys(path: NodeId[]) {
        const keys = new Set<string>();

        for (let index = 0; index < path.length - 1; index += 1) {
            keys.add(`${path[index]}|${path[index + 1]}`);
        }

        return keys;
    }

    function getEdgeState(from: NodeId, to: NodeId) {
        const edgeKey = `${from}|${to}`;

        if (solutionEdgeKeys.has(edgeKey)) {
            return "solution";
        }

        if (expansionEdges.some(([edgeFrom, edgeTo]) => edgeFrom === from && edgeTo === to)) {
            return "expansion";
        }

        if (visitedNow.includes(from) && visitedNow.includes(to)) {
            return "visited";
        }

        return "";
    }

    function getEdgeCost(from: NodeId, to: NodeId) {
        return edgeCosts[`${from}-${to}`];
    }

    function getEdgeLabelPosition(from: NodeId, to: NodeId) {
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
        if (step < snapshots.length - 1) {
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
            if (step >= snapshots.length - 1) {
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
            <button class="action-btn" onclick={nextStep} disabled={step >= snapshots.length - 1}>Step</button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="status-panel">
        <p><strong>Node saat ini:</strong> {currentNode}</p>
        <p><strong>Langkah:</strong> {step}/{Math.max(snapshots.length - 1, 0)}</p>
        <p><strong>Aksi:</strong> {action}</p>
        <p><strong>Status goal H:</strong> {goalReached ? "Ditemukan" : "Belum"}</p>
    </div>

    <div class="frontier-panel">
        <p><strong>{algorithm === "BFS" ? "Queue" : algorithm === "DFS" ? "Stack" : "Priority queue"}:</strong></p>
        {#if frontier.length > 0}
            <div class="frontier-list">
                {#each frontier as item}
                    <span class="frontier-item">{item}</span>
                {/each}
            </div>
        {:else}
            <p class="frontier-empty">Kosong</p>
        {/if}
        <p class="frontier-note">Hijau = edge ekspansi aktif, emas = jalur solusi saat goal ditemukan.</p>
        {#if currentPath.length > 0}
            <p class="path-line"><strong>Jalur aktif:</strong> {currentPath.join(" → ")}</p>
        {/if}
    </div>

    <div class="tree-wrap" role="img" aria-label="Tree pencarian blind search">
        <svg class="tree-svg" viewBox="0 0 640 310" preserveAspectRatio="xMidYMid meet">
            {#each treeEdges as [from, to]}
                <line
                    x1={nodePositions[from].x}
                    y1={nodePositions[from].y + 24}
                    x2={nodePositions[to].x}
                    y2={nodePositions[to].y - 24}
                    class:edge-visited={getEdgeState(from, to) === "visited"}
                    class:edge-expansion={getEdgeState(from, to) === "expansion"}
                    class:edge-solution={getEdgeState(from, to) === "solution"}
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

            {#each allNodes as [node, pos]}
                <g
                    class="node"
                    class:visited={visitedNow.includes(node)}
                    class:current={currentNode === node}
                    class:goal={node === "H"}
                    transform={`translate(${pos.x}, ${pos.y})`}
                >
                    <circle r="24"></circle>
                    <text>{node}</text>
                </g>
            {/each}
        </svg>
    </div>

    <div class="legend">
        <span><i class="dot"></i> Belum dikunjungi</span>
        <span><i class="dot visited"></i> Sudah dikunjungi</span>
        <span><i class="dot current"></i> Sedang dieksekusi</span>
        <span><i class="dot goal"></i> Goal</span>
    </div>

    <div class="legend edge-legend">
        <span><i class="dot edge-edge"></i> Edge visited</span>
        <span><i class="dot edge-expansion"></i> Edge ekspansi aktif</span>
        <span><i class="dot edge-solution"></i> Jalur solusi</span>
    </div>

    <details class="costs">
        <summary>Bobot sisi untuk simulasi UCS</summary>
        <p>S-A(1), S-B(5), S-C(2), A-D(4), A-E(1), B-F(1), B-G(1), C-H(1), C-I(5)</p>
    </details>
</div>

<style>
    .visualizer-card {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 12px;
        padding: 1rem;
        margin: 1rem 0;
        box-shadow: var(--shadow-md);
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
        background: var(--color-surface-elevated);
        color: var(--color-ink);
        border-radius: 8px;
        padding: 0.45rem 0.75rem;
        cursor: pointer;
        font-weight: 600;
    }

    .algo-btn.active {
        background: var(--color-surface-soft);
        border-color: var(--color-binder);
        color: var(--color-ink-strong);
    }

    .action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .status-panel {
        margin: 0.95rem 0;
        padding: 0.8rem;
        background: var(--color-surface-soft);
        border-radius: 8px;
        border-left: 4px solid var(--color-binder);
    }

    .frontier-panel {
        margin: 0.95rem 0 1rem;
        padding: 0.8rem;
        background: var(--color-surface-soft);
        border-radius: 8px;
        border: 1px dashed var(--color-line);
    }

    .frontier-panel p {
        margin: 0.15rem 0;
    }

    .frontier-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.45rem;
    }

    .frontier-item {
        display: inline-flex;
        align-items: center;
        padding: 0.25rem 0.55rem;
        border-radius: 9999px;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        font-size: 0.85rem;
        font-weight: 600;
    }

    .frontier-empty,
    .path-line {
        color: var(--color-ink-soft);
    }

    .frontier-note {
        margin-top: 0.35rem;
        color: var(--color-ink-soft);
        font-size: 0.85rem;
    }

    .status-panel p {
        margin: 0.2rem 0;
        font-size: 0.93rem;
    }

    .tree-wrap {
        padding: 0.8rem 0.2rem;
    }

    .tree-svg {
        width: 100%;
        max-width: 640px;
        height: auto;
        display: block;
        margin: 0 auto;
        overflow: visible;
    }

    .tree-svg line {
        stroke: var(--color-line-dark);
        stroke-width: 3;
        stroke-linecap: round;
        transition: stroke 0.25s ease;
    }

    .tree-svg line.edge-visited {
        stroke: var(--color-ink-soft);
        opacity: 0.55;
    }

    .tree-svg line.edge-expansion {
        stroke: var(--color-status-success-start);
        stroke-width: 4.5;
        opacity: 1;
    }

    .tree-svg line.edge-solution {
        stroke: var(--color-callout-warning-border);
        stroke-width: 4.5;
        opacity: 1;
    }

    .edge-labels {
        opacity: 0.45;
        transition: opacity 0.2s ease;
    }

    .edge-labels.show-costs {
        opacity: 1;
    }

    .edge-weight circle {
        fill: var(--color-surface-elevated);
        stroke: var(--color-line-dark);
        stroke-width: 1.2;
    }

    .edge-labels.show-costs .edge-weight circle {
        fill: var(--color-surface-muted);
        stroke: var(--color-binder);
    }

    .edge-weight text {
        text-anchor: middle;
        dominant-baseline: middle;
        font-size: 11px;
        font-weight: 700;
        fill: var(--color-ink-strong);
        user-select: none;
    }

    .node {
        transition: transform 0.28s ease;
    }

    .node circle {
        fill: var(--color-surface-elevated);
        stroke: var(--color-line);
        stroke-width: 2;
        transition: fill 0.28s ease, stroke 0.28s ease, filter 0.28s ease;
    }

    .node text {
        fill: var(--color-ink-strong);
        font-size: 26px;
        font-family: var(--font-handwriting);
        font-weight: 700;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
    }

    .node.visited circle {
        fill: var(--color-status-success-soft);
        stroke: var(--color-status-success-border);
    }

    .node.visited text {
        fill: var(--color-status-success-text);
        animation: pop 0.3s ease;
    }

    .node.current circle {
        r: 26;
        fill: var(--color-highlight);
        stroke: var(--color-callout-warning-border);
        stroke-width: 2.5;
        filter: drop-shadow(0 0 0.35rem color-mix(in srgb, var(--color-callout-warning-border) 35%, transparent));
    }

    .node.current text {
        fill: var(--color-callout-warning-text);
    }

    .node.goal circle {
        stroke-dasharray: 5 4;
    }

    .node.current.goal circle {
        fill: var(--color-highlight);
        stroke: var(--color-callout-warning-border);
    }

    .node.current.goal text {
        fill: var(--color-callout-warning-text);
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
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        display: inline-block;
    }

    .dot.visited {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
    }

    .dot.current {
        background: var(--color-highlight);
        border-color: var(--color-callout-warning-border);
    }

    .dot.goal {
        background: var(--color-surface-elevated);
        border: 1px dashed var(--color-status-done-start);
    }

    .edge-legend {
        margin-top: 0.5rem;
        color: var(--color-ink-soft);
    }

    .dot.edge-edge {
        background: var(--color-ink-soft);
        border-color: var(--color-ink-soft);
    }

    .dot.edge-expansion {
        background: var(--color-status-success-start);
        border-color: var(--color-status-success-start);
    }

    .dot.edge-solution {
        background: var(--color-callout-warning-border);
        border-color: var(--color-callout-warning-border);
    }

    .costs {
        margin-top: 0.8rem;
        font-size: 0.9rem;
        color: var(--color-ink-strong);
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
        .node circle {
            r: 21;
        }

        .node text {
            font-size: 23px;
        }

        .status-panel p {
            font-size: 0.88rem;
        }
    }

    @media (max-width: 480px) {
        .node circle {
            r: 19;
        }

        .node text {
            font-size: 20px;
        }
    }
</style>
