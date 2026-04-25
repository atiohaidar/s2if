<script lang="ts">
    import { onDestroy } from "svelte";

    type NodeId = string;

    interface TreeNode {
        id: NodeId;
        value?: number;
        children: TreeNode[];
        isMax: boolean;
        depth: number;
    }

    const tree: TreeNode = {
        id: "A", isMax: true, depth: 0, children: [
            { id: "B", isMax: false, depth: 1, children: [
                { id: "D", isMax: true, depth: 2, children: [
                    { id: "D1", isMax: false, depth: 3, value: 3, children: [] },
                    { id: "D2", isMax: false, depth: 3, value: 12, children: [] },
                ]},
                { id: "E", isMax: true, depth: 2, children: [
                    { id: "E1", isMax: false, depth: 3, value: 8, children: [] },
                    { id: "E2", isMax: false, depth: 3, value: 2, children: [] },
                ]},
            ]},
            { id: "C", isMax: false, depth: 1, children: [
                { id: "F", isMax: true, depth: 2, children: [
                    { id: "F1", isMax: false, depth: 3, value: 4, children: [] },
                    { id: "F2", isMax: false, depth: 3, value: 6, children: [] },
                ]},
                { id: "G", isMax: true, depth: 2, children: [
                    { id: "G1", isMax: false, depth: 3, value: 14, children: [] },
                    { id: "G2", isMax: false, depth: 3, value: 5, children: [] },
                ]},
            ]},
        ]
    };

    interface FlatNode {
        id: NodeId; isMax: boolean; depth: number;
        leafValue?: number; childIds: NodeId[]; parentId: NodeId | null;
    }

    const flatNodes: Record<NodeId, FlatNode> = {};
    const edges: [NodeId, NodeId][] = [];
    const depthLayers: Record<number, NodeId[]> = {};

    function flatten(node: TreeNode, parentId: NodeId | null) {
        flatNodes[node.id] = { id: node.id, isMax: node.isMax, depth: node.depth, leafValue: node.value, childIds: node.children.map(c => c.id), parentId };
        if (!depthLayers[node.depth]) depthLayers[node.depth] = [];
        depthLayers[node.depth].push(node.id);
        if (parentId) edges.push([parentId, node.id]);
        node.children.forEach(c => flatten(c, node.id));
    }
    flatten(tree, null);

    const width = 700, height = 380;
    const margin = { top: 55, bottom: 40 };
    const maxDepth = 3;
    const layerHeight = (height - margin.top - margin.bottom) / maxDepth;
    const positions: Record<NodeId, { x: number; y: number }> = {};

    const leaves = depthLayers[maxDepth];
    const leafSpacing = width / (leaves.length + 1);
    leaves.forEach((id, i) => {
        positions[id] = { x: leafSpacing * (i + 1), y: margin.top + maxDepth * layerHeight };
    });
    for (let d = maxDepth - 1; d >= 0; d--) {
        depthLayers[d].forEach(id => {
            const node = flatNodes[id];
            const avgX = node.childIds.map(cid => positions[cid].x).reduce((a, b) => a + b, 0) / node.childIds.length;
            positions[id] = { x: avgX, y: margin.top + d * layerHeight };
        });
    }

    interface Snapshot {
        action: string; detail: string; activeNode: NodeId;
        computedValues: Record<NodeId, number>; visitedNodes: NodeId[];
        activeEdge: [NodeId, NodeId] | null; solutionPath: NodeId[];
        goalReached: boolean;
        comparing?: { nodeId: NodeId; childValues: { id: NodeId; val: number }[]; chosen: number };
    }

    function simulate(): Snapshot[] {
        const snaps: Snapshot[] = [];
        const computed: Record<NodeId, number> = {};
        const visited: NodeId[] = [];

        function minimax(nodeId: NodeId, parentId: NodeId | null): number {
            const node = flatNodes[nodeId];
            visited.push(nodeId);

            snaps.push({
                action: parentId ? `Kunjungi ${nodeId}` : `Mulai dari root ${nodeId}`,
                detail: node.leafValue !== undefined
                    ? `${nodeId} adalah daun (leaf) dengan nilai ${node.leafValue}.`
                    : `${nodeId} adalah node ${node.isMax ? "MAX ▲" : "MIN ▼"}, evaluasi anak-anaknya dulu.`,
                activeNode: nodeId, computedValues: { ...computed }, visitedNodes: [...visited],
                activeEdge: parentId ? [parentId, nodeId] : null, solutionPath: [], goalReached: false,
            });

            if (node.leafValue !== undefined) {
                computed[nodeId] = node.leafValue;
                snaps.push({
                    action: `Nilai ${nodeId} = ${node.leafValue}`,
                    detail: `Leaf node: kembalikan utility ${node.leafValue} ke parent.`,
                    activeNode: nodeId, computedValues: { ...computed }, visitedNodes: [...visited],
                    activeEdge: parentId ? [parentId, nodeId] : null, solutionPath: [], goalReached: false,
                });
                return node.leafValue;
            }

            const childValues: { id: NodeId; val: number }[] = [];
            for (const childId of node.childIds) {
                const val = minimax(childId, nodeId);
                childValues.push({ id: childId, val });
            }

            const chosenVal = node.isMax
                ? Math.max(...childValues.map(c => c.val))
                : Math.min(...childValues.map(c => c.val));
            computed[nodeId] = chosenVal;

            const op = node.isMax ? "MAX" : "MIN";
            const vals = childValues.map(c => c.val).join(", ");

            snaps.push({
                action: `${op}(${vals}) → ${chosenVal}`,
                detail: `${nodeId} (${op}) memilih ${node.isMax ? "nilai terbesar" : "nilai terkecil"} dari anak-anaknya: ${op}(${vals}) = ${chosenVal}.`,
                activeNode: nodeId, computedValues: { ...computed }, visitedNodes: [...visited],
                activeEdge: null, solutionPath: [], goalReached: false,
                comparing: { nodeId, childValues, chosen: chosenVal },
            });

            return chosenVal;
        }

        minimax("A", null);

        const optimalPath: NodeId[] = [];
        function tracePath(nodeId: NodeId) {
            optimalPath.push(nodeId);
            const node = flatNodes[nodeId];
            if (node.childIds.length === 0) return;
            const bestChildId = node.childIds.find(cid => computed[cid] === computed[nodeId]);
            if (bestChildId) tracePath(bestChildId);
        }
        tracePath("A");

        snaps.push({
            action: "Keputusan optimal ditemukan!",
            detail: `Root A memilih nilai ${computed["A"]}. Jalur optimal: ${optimalPath.join(" → ")}.`,
            activeNode: "A", computedValues: { ...computed }, visitedNodes: [...visited],
            activeEdge: null, solutionPath: optimalPath, goalReached: true,
        });

        return snaps;
    }

    const snapshots = simulate();
    let step = $state(0);
    let isPlaying = $state(false);
    let timer: any = null;

    const maxStep = snapshots.length - 1;
    const snap = $derived(snapshots[Math.min(step, maxStep)]);
    const progressPct = $derived(maxStep > 0 ? (step / maxStep) * 100 : 0);
    const solutionEdgeKeys = $derived((() => {
        const keys = new Set<string>();
        for (let i = 0; i < snap.solutionPath.length - 1; i++)
            keys.add(`${snap.solutionPath[i]}|${snap.solutionPath[i + 1]}`);
        return keys;
    })());

    function edgeState(from: NodeId, to: NodeId) {
        if (solutionEdgeKeys.has(`${from}|${to}`)) return "solution";
        if (snap.activeEdge && snap.activeEdge[0] === from && snap.activeEdge[1] === to) return "active";
        if (snap.visitedNodes.includes(from) && snap.visitedNodes.includes(to)) return "visited";
        return "";
    }

    function stop() { if (timer) clearInterval(timer); isPlaying = false; }
    function reset() { stop(); step = 0; }
    function next() { if (step < maxStep) step++; else stop(); }
    function prev() { if (step > 0) { step--; stop(); } }
    function togglePlay() {
        if (isPlaying) { stop(); return; }
        isPlaying = true;
        timer = setInterval(() => { if (step >= maxStep) { stop(); return; } step++; }, 1000);
    }
    onDestroy(() => stop());

    const layerLabels = [
        { depth: 0, label: "MAX ▲" },
        { depth: 1, label: "MIN ▼" },
        { depth: 2, label: "MAX ▲" },
        { depth: 3, label: "Leaf" },
    ];
</script>

<div class="visualizer-card">
    <div class="progress-container"><div class="progress-bar" style="width: {progressPct}%"></div></div>

    <div class="top-controls">
        <div class="algo-label">
            <span class="algo-badge">Minimax</span>
            <span class="goal-label">Langkah {step}/{maxStep}</span>
        </div>
        <div class="playback-controls">
            <button class="action-btn" onclick={prev} disabled={step === 0} aria-label="Previous step">
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
            <button class="action-btn" onclick={next} disabled={step >= maxStep} aria-label="Next step">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="visualizer-grid">
        <div class="side-panel">
            <div class="status-panel">
                <p class="action-text"><strong>🎯 Aksi:</strong> {snap.action}</p>
                <p class="detail-text">{snap.detail}</p>
            </div>

            {#if snap.comparing}
                <div class="decision-panel">
                    <p><strong>{flatNodes[snap.comparing.nodeId].isMax ? "MAX ▲" : "MIN ▼"} memilih:</strong></p>
                    <div class="frontier-list" style="flex-direction: row; flex-wrap: wrap;">
                        {#each snap.comparing.childValues as cv}
                            <span class="frontier-item" class:is-head={cv.val === snap.comparing?.chosen}>
                                {cv.id} = {cv.val}
                            </span>
                        {/each}
                    </div>
                    <p class="decision-text">→ Dipilih: <strong>{snap.comparing.chosen}</strong></p>
                </div>
            {/if}

            {#if snap.goalReached}
                <div class="goal-alert">
                    🏆 Jalur optimal ditemukan!
                    <p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.9rem;">{snap.solutionPath.join(" → ")}</p>
                </div>
            {/if}

            <div class="legend-box">
                <div class="legend">
                    <span><i class="dot"></i> Belum</span>
                    <span><i class="dot visited"></i> Dikunjungi</span>
                    <span><i class="dot current"></i> Aktif</span>
                </div>
                <div class="legend edge-legend">
                    <span><i class="dot edge-expansion"></i> Traversal</span>
                    <span><i class="dot edge-solution"></i> Solusi</span>
                </div>
            </div>
        </div>

        <div class="main-canvas">
            <div class="tree-wrap">
                <svg class="tree-svg" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
                    <pattern id="grid-mm" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-line)" stroke-width="0.5" opacity="0.3"/>
                    </pattern>
                    <rect width={width} height={height} fill="url(#grid-mm)" />

                    <!-- Layer labels -->
                    {#each layerLabels as ll}
                        <text x="18" y={margin.top + ll.depth * layerHeight + 5} class="layer-label">{ll.label}</text>
                    {/each}

                    <!-- Edges -->
                    {#each edges as [from, to]}
                        {@const fP = positions[from]}
                        {@const tP = positions[to]}
                        <line x1={fP.x} y1={fP.y + 20} x2={tP.x} y2={tP.y - 20}
                            class="edge-line"
                            class:edge-visited={edgeState(from, to) === "visited"}
                            class:edge-expansion={edgeState(from, to) === "active"}
                            class:edge-solution={edgeState(from, to) === "solution"}
                        />
                    {/each}

                    <!-- Nodes -->
                    {#each Object.entries(positions) as [nodeId, pos]}
                        {@const node = flatNodes[nodeId]}
                        {@const computedVal = snap.computedValues[nodeId]}
                        {@const isActive = snap.activeNode === nodeId}
                        {@const isVisited = snap.visitedNodes.includes(nodeId)}
                        {@const isOnSolution = snap.solutionPath.includes(nodeId)}
                        {@const isLeaf = node.childIds.length === 0}

                        <g class="node"
                            class:node-max={node.isMax && !isLeaf}
                            class:node-min={!node.isMax && !isLeaf}
                            class:node-leaf={isLeaf}
                            class:visited={isVisited}
                            class:current={isActive}
                            class:on-solution={isOnSolution}
                            transform="translate({pos.x},{pos.y})"
                        >
                            {#if isLeaf}
                                <rect x="-18" y="-18" width="36" height="36" rx="6"></rect>
                            {:else if node.isMax}
                                <polygon points="0,-22 22,16 -22,16"></polygon>
                            {:else}
                                <polygon points="0,22 22,-16 -22,-16"></polygon>
                            {/if}

                            <text class="node-label" y={isLeaf ? 1 : (node.isMax ? 4 : -2)}>{nodeId}</text>

                            {#if computedVal !== undefined}
                                <g class="value-badge" transform="translate(22, -16)">
                                    <rect x="-12" y="-10" width="24" height="20" rx="6"></rect>
                                    <text y="4">{computedVal}</text>
                                </g>
                            {:else if isLeaf && node.leafValue !== undefined}
                                <text class="leaf-value" y="30">{node.leafValue}</text>
                            {/if}
                        </g>
                    {/each}
                </svg>
            </div>
        </div>
    </div>
</div>

<style>
    .visualizer-card {
        --color-status-success-start: #4ade80;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 16px;
        margin: 1.5rem 0;
        box-shadow: var(--shadow-lg);
        overflow: hidden;
    }

    .progress-container { height: 6px; background: var(--color-surface-soft); }
    .progress-bar { height: 100%; background: var(--color-binder); transition: width 0.3s ease; }

    .top-controls {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-line);
        background: color-mix(in srgb, var(--color-surface-elevated) 95%, black);
        flex-wrap: wrap; gap: 0.5rem;
    }

    .algo-label { display: flex; align-items: center; gap: 0.75rem; }
    .algo-badge { background: var(--color-binder); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; }
    .goal-label { font-size: 0.85rem; color: var(--color-ink-soft); padding: 0.3rem 0.6rem; background: var(--color-surface-soft); border-radius: 6px; border: 1px solid var(--color-line); }

    .playback-controls { display: flex; gap: 0.5rem; }
    .action-btn { border: 1px solid var(--color-line); background: var(--color-surface-elevated); color: var(--color-ink); border-radius: 8px; padding: 0.5rem 0.8rem; cursor: pointer; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 0.3rem; }
    .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .play-btn { min-width: 100px; background: var(--color-binder); color: white; border: none; }

    .visualizer-grid { display: grid; grid-template-columns: 280px 1fr; min-height: 400px; }

    .side-panel {
        background: var(--color-surface-soft); padding: 1.25rem;
        border-right: 1px solid var(--color-line);
        display: flex; flex-direction: column; gap: 1rem;
        overflow-y: auto; max-height: 520px;
    }

    .status-panel { background: var(--color-surface-elevated); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .action-text { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; }
    .detail-text { font-size: 0.85rem; color: var(--color-ink-soft); line-height: 1.5; margin: 0; }

    .decision-panel { background: var(--color-status-info-soft); padding: 0.75rem; border-radius: 10px; border-left: 3px solid var(--color-status-info-border); font-size: 0.85rem; }
    .decision-text { color: var(--color-ink-strong); margin: 0.5rem 0 0; line-height: 1.4; }

    .frontier-list { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem; }
    .frontier-item { padding: 0.4rem 0.75rem; background: var(--color-surface-elevated); border: 1px solid var(--color-line); border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
    .frontier-item.is-head { border-color: var(--color-callout-warning-border); background: var(--color-highlight); }

    .goal-alert { margin-top: 0.5rem; background: var(--color-status-success-soft); padding: 0.75rem; border-radius: 10px; text-align: center; font-weight: 700; border: 1px solid var(--color-status-success-border); animation: pulse-green 2s infinite; }

    .legend-box { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-line); }
    .legend { display: flex; flex-wrap: wrap; gap: 0.8rem; font-size: 0.75rem; }
    .edge-legend { margin-top: 0.4rem; }
    .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; border: 1px solid var(--color-line); }
    .dot.visited { background: var(--color-status-success-soft); }
    .dot.current { background: var(--color-highlight); }
    .dot.edge-expansion { background: var(--color-status-success-start); }
    .dot.edge-solution { background: var(--color-callout-warning-border); }

    .main-canvas { padding: 1.25rem; display: flex; flex-direction: column; justify-content: center; }
    .tree-svg { width: 100%; height: auto; overflow: visible; }

    .layer-label { font-size: 11px; font-weight: 700; font-family: var(--font-mono); fill: var(--color-ink-soft); }

    /* Edges - same pattern as BlindSearchTreeVisualizer */
    .edge-line { stroke: #444; stroke-width: 3; transition: all 0.3s; opacity: 0.8; }
    .edge-line.edge-visited { opacity: 1; stroke: var(--color-ink-strong); }
    .edge-line.edge-expansion { stroke: var(--color-status-success-start); stroke-width: 5; opacity: 1; }
    .edge-line.edge-solution { stroke: var(--color-callout-warning-border); stroke-width: 6; opacity: 1; }

    /* Nodes - using project tokens */
    .node polygon, .node rect { fill: var(--color-surface-elevated); stroke: var(--color-line); stroke-width: 2; transition: all 0.3s; }
    .node.node-max polygon { stroke: var(--color-status-info-border); }
    .node.node-min polygon { stroke: var(--color-status-warning-border); }
    .node.node-leaf rect { stroke: var(--color-binder); fill: color-mix(in srgb, var(--color-binder) 8%, var(--color-surface-elevated)); }

    .node.visited polygon, .node.visited rect { fill: var(--color-status-success-soft); stroke: var(--color-status-success-border); }
    .node.current polygon, .node.current rect { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; animation: node-pulse 1.5s infinite; }
    .node.on-solution polygon, .node.on-solution rect { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; }

    .node-label { fill: var(--color-ink-strong); font-size: 13px; text-anchor: middle; font-family: var(--font-handwriting); font-weight: bold; }

    .value-badge rect { fill: var(--color-status-success-start); stroke: none; }
    .value-badge text { fill: #1a1a1a; font-size: 11px; text-anchor: middle; font-weight: 800; font-family: var(--font-mono); }

    .leaf-value { fill: var(--color-binder); font-size: 12px; text-anchor: middle; font-weight: 700; font-family: var(--font-mono); }

    @keyframes node-pulse {
        0% { filter: drop-shadow(0 0 2px var(--color-callout-warning-border)); }
        50% { filter: drop-shadow(0 0 8px var(--color-callout-warning-border)); }
        100% { filter: drop-shadow(0 0 2px var(--color-callout-warning-border)); }
    }

    @keyframes pulse-green {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }

    @media (max-width: 900px) {
        .visualizer-grid { grid-template-columns: 1fr; }
        .side-panel { border-right: none; border-bottom: 1px solid var(--color-line); }
    }
</style>
