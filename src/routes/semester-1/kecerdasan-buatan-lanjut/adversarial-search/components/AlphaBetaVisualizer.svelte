<script lang="ts">
    import { onDestroy } from "svelte";
    type NodeId = string;
    interface FlatNode { id: NodeId; isMax: boolean; depth: number; leafValue?: number; childIds: NodeId[]; parentId: NodeId | null; }

    const tree: any = {
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

    const flatNodes: Record<NodeId, FlatNode> = {};
    const edges: [NodeId, NodeId][] = [];
    const depthLayers: Record<number, NodeId[]> = {};
    function flatten(node: any, parentId: NodeId | null) {
        flatNodes[node.id] = { id: node.id, isMax: node.isMax, depth: node.depth, leafValue: node.value, childIds: node.children.map((c: any) => c.id), parentId };
        if (!depthLayers[node.depth]) depthLayers[node.depth] = [];
        depthLayers[node.depth].push(node.id);
        if (parentId) edges.push([parentId, node.id]);
        node.children.forEach((c: any) => flatten(c, node.id));
    }
    flatten(tree, null);

    const width = 700, height = 380, margin = { top: 55, bottom: 40 }, maxDepth = 3;
    const layerHeight = (height - margin.top - margin.bottom) / maxDepth;
    const positions: Record<NodeId, { x: number; y: number }> = {};
    const leaves = depthLayers[maxDepth];
    const leafSpacing = width / (leaves.length + 1);
    leaves.forEach((id, i) => { positions[id] = { x: leafSpacing * (i + 1), y: margin.top + maxDepth * layerHeight }; });
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
        goalReached: boolean; prunedEdges: Set<string>; prunedNodes: Set<string>;
        alphaVal: number; betaVal: number;
    }

    function simulate(): Snapshot[] {
        const snaps: Snapshot[] = [];
        const computed: Record<NodeId, number> = {};
        const visited: NodeId[] = [];
        const prunedEdges = new Set<string>();
        const prunedNodes = new Set<string>();

        function fmtAB(a: number, b: number) { return `α=${a === -Infinity ? "-∞" : a}, β=${b === Infinity ? "∞" : b}`; }

        function snap(action: string, detail: string, activeNode: NodeId, activeEdge: [NodeId, NodeId] | null, alpha: number, beta: number, solPath: NodeId[] = [], goal = false) {
            snaps.push({ action, detail, activeNode, computedValues: { ...computed }, visitedNodes: [...visited], activeEdge, solutionPath: solPath, goalReached: goal, prunedEdges: new Set(prunedEdges), prunedNodes: new Set(prunedNodes), alphaVal: alpha, betaVal: beta });
        }

        function markPruned(nodeId: NodeId) {
            prunedNodes.add(nodeId);
            flatNodes[nodeId].childIds.forEach(cid => { prunedEdges.add(`${nodeId}|${cid}`); markPruned(cid); });
        }

        function alphaBeta(nodeId: NodeId, alpha: number, beta: number, parentId: NodeId | null): number {
            const node = flatNodes[nodeId];
            visited.push(nodeId);

            snap(parentId ? `Kunjungi ${nodeId}` : `Mulai dari root ${nodeId}`,
                node.leafValue !== undefined ? `${nodeId} adalah leaf (${node.leafValue}). ${fmtAB(alpha, beta)}` : `${nodeId} (${node.isMax ? "MAX" : "MIN"}). ${fmtAB(alpha, beta)}`,
                nodeId, parentId ? [parentId, nodeId] : null, alpha, beta);

            if (node.leafValue !== undefined) {
                computed[nodeId] = node.leafValue;
                snap(`Nilai ${nodeId} = ${node.leafValue}`, `Kembalikan utility ${node.leafValue}.`, nodeId, parentId ? [parentId, nodeId] : null, alpha, beta);
                return node.leafValue;
            }

            if (node.isMax) {
                let value = -Infinity;
                for (let i = 0; i < node.childIds.length; i++) {
                    value = Math.max(value, alphaBeta(node.childIds[i], alpha, beta, nodeId));
                    alpha = Math.max(alpha, value);
                    if (beta <= alpha && i < node.childIds.length - 1) {
                        for (let j = i + 1; j < node.childIds.length; j++) { prunedEdges.add(`${nodeId}|${node.childIds[j]}`); markPruned(node.childIds[j]); }
                        snap(`✂️ Beta Cutoff di ${nodeId}!`, `α(${alpha}) ≥ β(${beta}). Cabang sisa dipangkas!`, nodeId, null, alpha, beta);
                        break;
                    }
                }
                computed[nodeId] = value;
                snap(`MAX(${nodeId}) = ${value}`, `${nodeId} memilih terbesar = ${value}. ${fmtAB(alpha, beta)}`, nodeId, null, alpha, beta);
                return value;
            } else {
                let value = Infinity;
                for (let i = 0; i < node.childIds.length; i++) {
                    value = Math.min(value, alphaBeta(node.childIds[i], alpha, beta, nodeId));
                    beta = Math.min(beta, value);
                    if (beta <= alpha && i < node.childIds.length - 1) {
                        for (let j = i + 1; j < node.childIds.length; j++) { prunedEdges.add(`${nodeId}|${node.childIds[j]}`); markPruned(node.childIds[j]); }
                        snap(`✂️ Alpha Cutoff di ${nodeId}!`, `β(${beta}) ≤ α(${alpha}). Cabang sisa dipangkas!`, nodeId, null, alpha, beta);
                        break;
                    }
                }
                computed[nodeId] = value;
                snap(`MIN(${nodeId}) = ${value}`, `${nodeId} memilih terkecil = ${value}. ${fmtAB(alpha, beta)}`, nodeId, null, alpha, beta);
                return value;
            }
        }

        alphaBeta("A", -Infinity, Infinity, null);

        const optimalPath: NodeId[] = [];
        function tracePath(nodeId: NodeId) {
            optimalPath.push(nodeId);
            const node = flatNodes[nodeId];
            if (node.childIds.length === 0) return;
            const best = node.childIds.find(cid => computed[cid] === computed[nodeId]);
            if (best) tracePath(best);
        }
        tracePath("A");

        snap("Selesai! Keputusan optimal ditemukan.", `Hasil sama dengan Minimax (${computed["A"]}), tapi lebih efisien! Jalur: ${optimalPath.join(" → ")}`, "A", null, computed["A"], computed["A"], optimalPath, true);
        return snaps;
    }

    const snapshots = simulate();
    let step = $state(0);
    let isPlaying = $state(false);
    let timer: any = null;
    const maxStep = snapshots.length - 1;
    const snap = $derived(snapshots[Math.min(step, maxStep)]);
    const progressPct = $derived(maxStep > 0 ? (step / maxStep) * 100 : 0);
    const solutionEdgeKeys = $derived((() => { const keys = new Set<string>(); for (let i = 0; i < snap.solutionPath.length - 1; i++) keys.add(`${snap.solutionPath[i]}|${snap.solutionPath[i + 1]}`); return keys; })());
    const prunedCount = $derived(snap.prunedNodes.size);

    function edgeState(from: NodeId, to: NodeId) {
        if (snap.prunedEdges.has(`${from}|${to}`)) return "pruned";
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
        { depth: 0, label: "MAX ▲" }, { depth: 1, label: "MIN ▼" },
        { depth: 2, label: "MAX ▲" }, { depth: 3, label: "Leaf" },
    ];
</script>

<div class="visualizer-card">
    <div class="progress-container"><div class="progress-bar" style="width: {progressPct}%"></div></div>

    <div class="top-controls">
        <div class="algo-label">
            <span class="algo-badge">Alpha-Beta Pruning</span>
            <span class="goal-label">Langkah {step}/{maxStep}</span>
            {#if prunedCount > 0}<span class="metric-badge">✂️ {prunedCount} dipangkas</span>{/if}
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
                <p class="action-text"><strong>🎯 {snap.action}</strong></p>
                <p class="detail-text">{snap.detail}</p>
            </div>

            <div class="decision-panel">
                <div class="ab-row"><span class="ab-label ab-alpha">α</span> <span>{snap.alphaVal === -Infinity ? "-∞" : snap.alphaVal}</span></div>
                <div class="ab-row"><span class="ab-label ab-beta">β</span> <span>{snap.betaVal === Infinity ? "∞" : snap.betaVal}</span></div>
            </div>

            {#if snap.goalReached}
                <div class="goal-alert">
                    🏆 Hasil optimal: <strong>{snap.computedValues["A"]}</strong>
                    <p style="margin: 0.5rem 0 0; font-family: var(--font-mono); font-size: 0.9rem;">{snap.solutionPath.join(" → ")}</p>
                    <p style="margin: 0.3rem 0 0; font-size: 0.8rem; color: var(--color-status-warning-text);">Hemat {prunedCount} node evaluasi!</p>
                </div>
            {/if}

            <div class="legend-box">
                <div class="legend">
                    <span><i class="dot"></i> Belum</span>
                    <span><i class="dot visited"></i> Dikunjungi</span>
                    <span><i class="dot current"></i> Aktif</span>
                    <span><i class="dot pruned"></i> Dipangkas</span>
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
                    <pattern id="grid-ab" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-line)" stroke-width="0.5" opacity="0.3"/>
                    </pattern>
                    <rect width={width} height={height} fill="url(#grid-ab)" />

                    {#each layerLabels as ll}
                        <text x="18" y={margin.top + ll.depth * layerHeight + 5} class="layer-label">{ll.label}</text>
                    {/each}

                    {#each edges as [from, to]}
                        {@const fP = positions[from]}
                        {@const tP = positions[to]}
                        {@const es = edgeState(from, to)}
                        <line x1={fP.x} y1={fP.y + 20} x2={tP.x} y2={tP.y - 20}
                            class="edge-line" class:edge-visited={es === "visited"} class:edge-expansion={es === "active"} class:edge-solution={es === "solution"} class:edge-pruned={es === "pruned"}
                        />
                        {#if es === "pruned"}
                            <text x={(fP.x + tP.x) / 2 + 8} y={(fP.y + tP.y) / 2} font-size="14">✂️</text>
                        {/if}
                    {/each}

                    {#each Object.entries(positions) as [nodeId, pos]}
                        {@const node = flatNodes[nodeId]}
                        {@const computedVal = snap.computedValues[nodeId]}
                        {@const isActive = snap.activeNode === nodeId}
                        {@const isVisited = snap.visitedNodes.includes(nodeId)}
                        {@const isOnSolution = snap.solutionPath.includes(nodeId)}
                        {@const isLeaf = node.childIds.length === 0}
                        {@const isPruned = snap.prunedNodes.has(nodeId)}

                        <g class="node" class:node-max={node.isMax && !isLeaf} class:node-min={!node.isMax && !isLeaf} class:node-leaf={isLeaf}
                            class:visited={isVisited} class:current={isActive} class:on-solution={isOnSolution} class:is-pruned={isPruned}
                            transform="translate({pos.x},{pos.y})">
                            {#if isLeaf}
                                <rect x="-18" y="-18" width="36" height="36" rx="6"></rect>
                            {:else if node.isMax}
                                <polygon points="0,-22 22,16 -22,16"></polygon>
                            {:else}
                                <polygon points="0,22 22,-16 -22,-16"></polygon>
                            {/if}
                            <text class="node-label" y={isLeaf ? 1 : (node.isMax ? 4 : -2)}>{nodeId}</text>
                            {#if computedVal !== undefined && !isPruned}
                                <g class="value-badge" transform="translate(22, -16)">
                                    <rect x="-12" y="-10" width="24" height="20" rx="6"></rect>
                                    <text y="4">{computedVal}</text>
                                </g>
                            {:else if isLeaf && node.leafValue !== undefined && !isPruned}
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
        background: var(--color-surface-elevated); border: 1px solid var(--color-line);
        border-radius: 16px; margin: 1.5rem 0; box-shadow: var(--shadow-lg); overflow: hidden;
    }
    .progress-container { height: 6px; background: var(--color-surface-soft); }
    .progress-bar { height: 100%; background: var(--color-binder); transition: width 0.3s ease; }
    .top-controls { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-line); background: color-mix(in srgb, var(--color-surface-elevated) 95%, black); flex-wrap: wrap; gap: 0.5rem; }
    .algo-label { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .algo-badge { background: var(--color-binder); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; }
    .goal-label { font-size: 0.85rem; color: var(--color-ink-soft); padding: 0.3rem 0.6rem; background: var(--color-surface-soft); border-radius: 6px; border: 1px solid var(--color-line); }
    .metric-badge { font-size: 0.85rem; color: var(--color-status-error-text, var(--color-accent)); font-weight: 700; padding: 0.3rem 0.6rem; background: var(--color-status-warning-soft); border-radius: 6px; border: 1px solid var(--color-status-warning-border); }
    .playback-controls { display: flex; gap: 0.5rem; }
    .action-btn { border: 1px solid var(--color-line); background: var(--color-surface-elevated); color: var(--color-ink); border-radius: 8px; padding: 0.5rem 0.8rem; cursor: pointer; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 0.3rem; }
    .action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .play-btn { min-width: 100px; background: var(--color-binder); color: white; border: none; }

    .visualizer-grid { display: grid; grid-template-columns: 280px 1fr; min-height: 400px; }
    .side-panel { background: var(--color-surface-soft); padding: 1.25rem; border-right: 1px solid var(--color-line); display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; max-height: 520px; }
    .status-panel { background: var(--color-surface-elevated); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .action-text { font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; }
    .detail-text { font-size: 0.85rem; color: var(--color-ink-soft); line-height: 1.5; margin: 0; }

    .decision-panel { background: var(--color-status-info-soft); padding: 0.75rem 1rem; border-radius: 10px; border-left: 3px solid var(--color-status-info-border); display: flex; gap: 1.5rem; }
    .ab-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; font-weight: 700; font-family: var(--font-mono); }
    .ab-label { padding: 0.2rem 0.5rem; border-radius: 6px; color: white; font-size: 0.85rem; }
    .ab-alpha { background: var(--color-status-info-border); }
    .ab-beta { background: var(--color-callout-warning-border); }

    .goal-alert { background: var(--color-status-success-soft); padding: 0.75rem; border-radius: 10px; text-align: center; font-weight: 700; border: 1px solid var(--color-status-success-border); animation: pulse-green 2s infinite; }

    .legend-box { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-line); }
    .legend { display: flex; flex-wrap: wrap; gap: 0.8rem; font-size: 0.75rem; }
    .edge-legend { margin-top: 0.4rem; }
    .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; border: 1px solid var(--color-line); }
    .dot.visited { background: var(--color-status-success-soft); }
    .dot.current { background: var(--color-highlight); }
    .dot.pruned { background: var(--color-status-warning-soft); border: 2px dashed var(--color-accent); }
    .dot.edge-expansion { background: var(--color-status-success-start); }
    .dot.edge-solution { background: var(--color-callout-warning-border); }

    .main-canvas { padding: 1.25rem; display: flex; flex-direction: column; justify-content: center; }
    .tree-svg { width: 100%; height: auto; overflow: visible; }
    .layer-label { font-size: 11px; font-weight: 700; font-family: var(--font-mono); fill: var(--color-ink-soft); }

    .edge-line { stroke: #444; stroke-width: 3; transition: all 0.3s; opacity: 0.8; }
    .edge-line.edge-visited { opacity: 1; stroke: var(--color-ink-strong); }
    .edge-line.edge-expansion { stroke: var(--color-status-success-start); stroke-width: 5; opacity: 1; }
    .edge-line.edge-solution { stroke: var(--color-callout-warning-border); stroke-width: 6; opacity: 1; }
    .edge-line.edge-pruned { stroke: var(--color-accent); stroke-width: 3; opacity: 0.5; stroke-dasharray: 6 4; }

    .node polygon, .node rect { fill: var(--color-surface-elevated); stroke: var(--color-line); stroke-width: 2; transition: all 0.3s; }
    .node.node-max polygon { stroke: var(--color-status-info-border); }
    .node.node-min polygon { stroke: var(--color-callout-warning-border); }
    .node.node-leaf rect { stroke: var(--color-binder); fill: color-mix(in srgb, var(--color-binder) 8%, var(--color-surface-elevated)); }
    .node.visited polygon, .node.visited rect { fill: var(--color-status-success-soft); stroke: var(--color-status-success-border); }
    .node.current polygon, .node.current rect { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; animation: node-pulse 1.5s infinite; }
    .node.on-solution polygon, .node.on-solution rect { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; }
    .node.is-pruned polygon, .node.is-pruned rect { fill: var(--color-status-warning-soft); stroke: var(--color-accent); stroke-dasharray: 4 3; opacity: 0.5; }
    .node.is-pruned .node-label { opacity: 0.4; }
    .node-label { fill: var(--color-ink-strong); font-size: 13px; text-anchor: middle; font-family: var(--font-handwriting); font-weight: bold; }
    .value-badge rect { fill: var(--color-status-success-start); stroke: none; }
    .value-badge text { fill: white; font-size: 11px; text-anchor: middle; font-weight: 700; font-family: var(--font-mono); }
    .leaf-value { fill: var(--color-binder); font-size: 12px; text-anchor: middle; font-weight: 700; font-family: var(--font-mono); }

    @keyframes node-pulse {
        0% { filter: drop-shadow(0 0 2px var(--color-callout-warning-border)); }
        50% { filter: drop-shadow(0 0 8px var(--color-callout-warning-border)); }
        100% { filter: drop-shadow(0 0 2px var(--color-callout-warning-border)); }
    }
    @keyframes pulse-green { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }

    @media (max-width: 900px) {
        .visualizer-grid { grid-template-columns: 1fr; }
        .side-panel { border-right: none; border-bottom: 1px solid var(--color-line); }
    }
</style>
