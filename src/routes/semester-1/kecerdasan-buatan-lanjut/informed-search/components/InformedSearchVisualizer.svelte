<script lang="ts">
    import { onDestroy } from "svelte";
    import * as d3 from "d3";

    type Algo = "Greedy" | "AStar";
    type NodeId = string;

    let { algorithm }: { algorithm: Algo } = $props();
    const uid = `is-${algorithm}-${Math.random().toString(36).slice(2, 8)}`;
    const isGreedy = algorithm === "Greedy";

    const treeData = {
        id: "S",
        children: [
            { id: "A", children: [{ id: "H", children: [] }] },
            { id: "B", children: [{ id: "F", children: [] }] },
            { 
                id: "C", 
                children: [
                    { id: "C1", children: [{ id: "C2", children: [] }] },
                    { id: "C3", children: [] }
                ] 
            }
        ]
    };

    const edgeCosts: Record<string, number> = {
        "S-A": 1, "A-H": 1,
        "S-B": 5, "B-F": 1,
        "S-C": 10, "C-C1": 1, "C1-C2": 1, "C-C3": 1
    };

    const h: Record<NodeId, number> = {
        S: 10, A: 8, H: 0, B: 6, F: 5, C: 2, C1: 1, C2: 0.5, C3: 1.5 
    };

    const goalNode: NodeId = "H";

    // D3 Layout
    const width = 640, height = 360;
    const margin = { top: 50, right: 40, bottom: 50, left: 40 };
    const root = d3.hierarchy(treeData);
    d3.tree<any>().size([width - margin.left - margin.right, height - margin.top - margin.bottom])(root);

    const nodePos: Record<NodeId, { x: number; y: number }> = {};
    const treeEdges: [NodeId, NodeId][] = [];
    const adj: Record<NodeId, NodeId[]> = {};

    root.descendants().forEach(d => {
        nodePos[d.data.id] = { x: d.x! + margin.left, y: d.y! + margin.top };
        adj[d.data.id] = d.children ? d.children.map(c => c.data.id) : [];
        if (d.parent) treeEdges.push([d.parent.data.id, d.data.id]);
    });

    const allNodes = Object.entries(nodePos) as [NodeId, { x: number; y: number }][];

    type Snapshot = {
        node: NodeId | "-";
        action: string;
        frontier: string[];
        visited: NodeId[];
        currentPath: NodeId[];
        expandedEdges: [NodeId, NodeId][];
        goalReached: boolean;
        nodesExpanded: number;
        decision: string;
        nodeCosts: Record<NodeId, { g: number; f: number }>; // TRACK COSTS FOR VISUALIZATION
    };

    function buildPath(parents: Partial<Record<NodeId, NodeId | null>>, node: NodeId): NodeId[] {
        const path: NodeId[] = [node];
        let cur = parents[node];
        while (cur) { path.unshift(cur); cur = parents[cur]; }
        return path;
    }

    function simulate(): Snapshot[] {
        const snaps: Snapshot[] = [];
        const frontier: { node: NodeId; g: number; h: number; f: number }[] = [];
        const visited = new Set<NodeId>();
        const bestCost: Record<NodeId, number> = { S: 0 };
        const parents: Partial<Record<NodeId, NodeId | null>> = { S: null };
        let expandedCount = 0;

        frontier.push({ node: "S", g: 0, h: h["S"], f: isGreedy ? h["S"] : h["S"] });

        const fmt = (e: { node: string; g: number; h: number; f: number }) =>
            isGreedy ? `${e.node}(h=${e.h})` : `${e.node}(f=${e.f})`;

        snaps.push({
            node: "-", action: `Mulai dari S.`,
            frontier: [fmt(frontier[0])],
            visited: [], currentPath: ["S"], expandedEdges: [],
            goalReached: false, nodesExpanded: 0, decision: "",
            nodeCosts: { S: { g: 0, f: h["S"] } }
        });

        while (frontier.length > 0) {
            frontier.sort((a, b) => a.f - b.f || a.node.localeCompare(b.node));
            const ranked = frontier.map(fmt);
            const cur = frontier.shift()!;
            if (visited.has(cur.node)) continue;

            const decision = isGreedy
                ? `Pilih ${cur.node} (h=${cur.h} terkecil).`
                : `Pilih ${cur.node} (f=${cur.f} terkecil).`;

            visited.add(cur.node);
            expandedCount++;
            const path = buildPath(parents, cur.node);

            // Record costs for current snapshot
            const currentCosts: Record<NodeId, { g: number; f: number }> = {};
            Object.keys(bestCost).forEach(k => {
                currentCosts[k] = { g: bestCost[k], f: isGreedy ? h[k] : bestCost[k] + h[k] };
            });

            if (cur.node === goalNode) {
                snaps.push({
                    node: cur.node, action: `🎯 Goal H ditemukan!`,
                    frontier: frontier.map(fmt), visited: [...visited],
                    currentPath: path, expandedEdges: [],
                    goalReached: true, nodesExpanded: expandedCount,
                    decision, nodeCosts: currentCosts
                });
                break;
            }

            const expandedEdges: [NodeId, NodeId][] = [];
            adj[cur.node].forEach(child => {
                const gCost = cur.g + (edgeCosts[`${cur.node}-${child}`] ?? 0);
                const hCost = h[child];
                const fCost = isGreedy ? hCost : gCost + hCost;

                if (bestCost[child] === undefined || gCost < bestCost[child]) {
                    bestCost[child] = gCost;
                    parents[child] = cur.node;
                    frontier.push({ node: child, g: gCost, h: hCost, f: fCost });
                    expandedEdges.push([cur.node, child]);
                }
            });

            snaps.push({
                node: cur.node,
                action: expandedEdges.length > 0 ? `Buka tetangga ${cur.node}.` : `Buntu di ${cur.node}.`,
                frontier: frontier.map(fmt), visited: [...visited],
                currentPath: path, expandedEdges,
                goalReached: false, nodesExpanded: expandedCount,
                decision, nodeCosts: currentCosts
            });
        }
        return snaps;
    }

    const snapshots = simulate();
    let step = $state(0);
    let isPlaying = $state(false);
    let playbackSpeed = $state(850);
    let hoveredNode = $state<NodeId | null>(null);
    let timer: any = null;

    const maxStep = snapshots.length - 1;
    const snap = $derived(snapshots[Math.min(step, maxStep)]);
    const progressPct = $derived(maxStep > 0 ? (step / maxStep) * 100 : 0);
    const pathEdges = $derived((() => {
        const keys = new Set<string>();
        for (let i = 0; i < snap.currentPath.length - 1; i++)
            keys.add(`${snap.currentPath[i]}|${snap.currentPath[i + 1]}`);
        return keys;
    })());

    function edgeState(from: NodeId, to: NodeId) {
        if (pathEdges.has(`${from}|${to}`)) return "solution";
        if (snap.expandedEdges.some(([f, t]) => f === from && t === to)) return "expansion";
        if (snap.visited.includes(from) && snap.visited.includes(to)) return "visited";
        return "";
    }

    function stop() { if (timer) clearInterval(timer); isPlaying = false; }
    function reset() { stop(); step = 0; }
    function next() { if (step < maxStep) step++; else stop(); }
    function prev() { if (step > 0) { step--; stop(); } }
    function togglePlay() {
        if (isPlaying) { stop(); return; }
        isPlaying = true;
        timer = setInterval(() => { if (step >= maxStep) { stop(); return; } step++; }, playbackSpeed);
    }
    onDestroy(() => stop());
</script>

<div class="visualizer-card">
    <div class="progress-container"><div class="progress-bar" style="width: {progressPct}%"></div></div>

    <div class="top-controls">
        <div class="algo-label">
            <span class="algo-badge">{isGreedy ? "Greedy (Trap)" : "A* (Smart)"}</span>
            <span class="goal-label">Goal: {goalNode}</span>
            <span class="metric-badge">Expanded: {snap.nodesExpanded}</span>
        </div>
        <div class="playback-controls">
            <button class="action-btn" onclick={prev} disabled={step === 0}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button class="action-btn play-btn" onclick={togglePlay}>
                {#if isPlaying}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                {:else}
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                {/if}
                {isPlaying ? "Pause" : "Play"}
            </button>
            <button class="action-btn" onclick={next} disabled={step >= maxStep}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="visualizer-grid">
        <div class="side-panel">
            <div class="status-panel">
                <p><strong>Langkah:</strong> {step}/{maxStep}</p>
                <p class="action-text"><strong>Aksi:</strong> {snap.action}</p>
            </div>
            {#if snap.decision}<div class="decision-panel"><p class="decision-text">🧠 {snap.decision}</p></div>{/if}
            <div class="frontier-panel">
                <p><strong>Priority Queue:</strong></p>
                <div class="frontier-list">
                    {#each snap.frontier as item, i}<span class="frontier-item" class:is-head={i === 0}>{item}</span>{/each}
                </div>
            </div>
        </div>

        <div class="main-canvas">
            <div class="tree-wrap">
                <svg class="tree-svg" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
                    <rect width={width} height={height} fill="none" />
                    {#each treeEdges as [from, to]}
                        {@const fP = nodePos[from]} {@const tP = nodePos[to]}
                        <line x1={fP.x} y1={fP.y + 22} x2={tP.x} y2={tP.y - 22} class="edge-line"
                            class:edge-visited={edgeState(from, to) === "visited"}
                            class:edge-expansion={edgeState(from, to) === "expansion"}
                            class:edge-solution={edgeState(from, to) === "solution"}
                        />
                    {/each}
                    {#each treeEdges as [from, to]}
                        {@const fP = nodePos[from]} {@const tP = nodePos[to]}
                        <g transform="translate({(fP.x+tP.x)/2 + 14},{(fP.y+tP.y)/2})" class="edge-weight">
                            <rect x="-10" y="-10" width="20" height="20" rx="4" fill="white" stroke="#ccc"></rect>
                            <text dy=".3em" font-size="10" text-anchor="middle">{edgeCosts[`${from}-${to}`]}</text>
                        </g>
                    {/each}

                    {#each allNodes as [node, pos]}
                        {@const costInfo = snap.nodeCosts[node]}
                        <g class="node" class:visited={snap.visited.includes(node)} class:current={snap.node === node} class:goal={node === goalNode} transform="translate({pos.x},{pos.y})">
                            <circle r="22"></circle>
                            <text class="node-label" y="-4">{node}</text>
                            <text class="h-label" y="12">
                                {#if isGreedy}
                                    h={h[node]}
                                {:else if costInfo}
                                    {costInfo.g}+{h[node]}={costInfo.f}
                                {:else}
                                    h={h[node]}
                                {/if}
                            </text>
                        </g>
                    {/each}
                </svg>
            </div>
        </div>
    </div>
</div>

<style>
    .visualizer-card { background: var(--color-surface-elevated); border: 1px solid var(--color-line); border-radius: 16px; margin: 1.5rem 0; box-shadow: var(--shadow-lg); overflow: hidden; --color-status-success-start: #4ade80; }
    .progress-container { height: 6px; background: var(--color-surface-soft); }
    .progress-bar { height: 100%; background: var(--color-binder); transition: width 0.3s ease; }
    .top-controls { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-line); background: color-mix(in srgb, var(--color-surface-elevated) 95%, black); }
    .algo-label { display: flex; align-items: center; gap: 0.75rem; }
    .algo-badge { background: var(--color-binder); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; }
    .goal-label, .metric-badge { font-size: 0.85rem; color: var(--color-ink-soft); padding: 0.3rem 0.6rem; background: var(--color-surface-soft); border-radius: 6px; border: 1px solid var(--color-line); }
    .metric-badge { color: var(--color-status-error-text); font-weight: 700; }
    .playback-controls { display: flex; gap: 0.5rem; }
    .action-btn { border: 1px solid var(--color-line); background: var(--color-surface-elevated); color: var(--color-ink); border-radius: 8px; padding: 0.5rem 0.8rem; cursor: pointer; font-weight: 600; transition: all 0.2s; }
    .play-btn { min-width: 100px; background: var(--color-binder); color: white; border: none; }
    .visualizer-grid { display: grid; grid-template-columns: 280px 1fr; min-height: 400px; }
    .side-panel { background: var(--color-surface-soft); padding: 1.25rem; border-right: 1px solid var(--color-line); display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; max-height: 520px; }
    .status-panel { background: var(--color-surface-elevated); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .action-text { font-size: 0.85rem; line-height: 1.4; margin-top: 0.5rem; }
    .decision-panel { background: var(--color-status-info-soft); padding: 0.75rem; border-radius: 10px; border-left: 3px solid var(--color-status-info-border); font-size: 0.85rem; }
    .decision-text { color: var(--color-ink-strong); margin: 0; line-height: 1.4; }
    .frontier-list { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem; }
    .frontier-item { padding: 0.4rem 0.75rem; background: var(--color-surface-elevated); border: 1px solid var(--color-line); border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
    .frontier-item.is-head { border-color: var(--color-callout-warning-border); background: var(--color-highlight); }
    .main-canvas { padding: 1.25rem; display: flex; flex-direction: column; justify-content: center; }
    .tree-svg { width: 100%; height: auto; overflow: visible; }
    .edge-line { stroke: #444; stroke-width: 3; transition: all 0.3s; opacity: 0.8; }
    .edge-line.edge-visited { opacity: 1; stroke: var(--color-ink-strong); }
    .edge-line.edge-expansion { stroke: var(--color-status-success-start); stroke-width: 5; opacity: 1; }
    .edge-line.edge-solution { stroke: var(--color-callout-warning-border); stroke-width: 6; opacity: 1; }
    .edge-weight rect { fill: var(--color-surface-elevated); stroke: var(--color-line); }
    .edge-weight text { font-weight: bold; fill: var(--color-ink-strong); }
    .node circle { fill: var(--color-surface-elevated); stroke: var(--color-line); stroke-width: 2; transition: all 0.3s; }
    .node .node-label { fill: var(--color-ink-strong); font-size: 16px; text-anchor: middle; font-family: var(--font-handwriting); font-weight: bold; }
    .node .h-label { font-size: 10px; fill: var(--color-binder); text-anchor: middle; font-family: var(--font-mono, monospace); font-weight: 700; }
    .node.visited circle { fill: var(--color-status-success-soft); stroke: var(--color-status-success-border); }
    .node.current circle { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; }
    .node.goal circle { stroke: #ff4444; stroke-dasharray: 4 3; }
</style>
