<script lang="ts">
    import { onDestroy } from "svelte";
    type NodeId = string;
    interface FlatNode { id: NodeId; isMax: boolean; depth: number; leafValue?: number; childIds: NodeId[]; parentId: NodeId | null; }

    const cases = {
        normal: {
            title: "Normal Case",
            tree: {
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
            }
        },
        lucky: {
            title: "Lucky Case (Best Move First)",
            tree: {
                id: "A", isMax: true, depth: 0, children: [
                    { id: "B", isMax: false, depth: 1, children: [
                        { id: "D", isMax: true, depth: 2, children: [
                            { id: "D1", isMax: false, depth: 3, value: 15, children: [] },
                            { id: "D2", isMax: false, depth: 3, value: 20, children: [] },
                        ]},
                        { id: "E", isMax: true, depth: 2, children: [
                            { id: "E1", isMax: false, depth: 3, value: 5, children: [] },
                            { id: "E2", isMax: false, depth: 3, value: 2, children: [] },
                        ]},
                    ]},
                    { id: "C", isMax: false, depth: 1, children: [
                        { id: "F", isMax: true, depth: 2, children: [
                            { id: "F1", isMax: false, depth: 3, value: 3, children: [] },
                            { id: "F2", isMax: false, depth: 3, value: 1, children: [] },
                        ]},
                    ]},
                ]
            }
        },
        unlucky: {
            title: "Unlucky Case (Worst Move First)",
            tree: {
                id: "A", isMax: true, depth: 0, children: [
                    { id: "B", isMax: false, depth: 1, children: [
                        { id: "D", isMax: true, depth: 2, children: [
                            { id: "D1", isMax: false, depth: 3, value: 1, children: [] },
                            { id: "D2", isMax: false, depth: 3, value: 2, children: [] },
                        ]},
                        { id: "E", isMax: true, depth: 2, children: [
                            { id: "E1", isMax: false, depth: 3, value: 3, children: [] },
                            { id: "E2", isMax: false, depth: 3, value: 4, children: [] },
                        ]},
                    ]},
                    { id: "C", isMax: false, depth: 1, children: [
                        { id: "F", isMax: true, depth: 2, children: [
                            { id: "F1", isMax: false, depth: 3, value: 5, children: [] },
                            { id: "F2", isMax: false, depth: 3, value: 6, children: [] },
                        ]},
                    ]},
                ]
            }
        },
        extreme: {
            title: "Extreme Pruning (Massive Cutoff)",
            tree: {
                id: "A", isMax: true, depth: 0, children: [
                    { id: "B", isMax: false, depth: 1, children: [
                        { id: "B1", isMax: true, depth: 2, children: [
                            { id: "L1", isMax: false, depth: 3, value: 50, children: [] },
                            { id: "L2", isMax: false, depth: 3, value: 60, children: [] },
                        ]}
                    ]},
                    { id: "C", isMax: false, depth: 1, children: [
                        { id: "C1", isMax: true, depth: 2, children: [
                            { id: "L3", isMax: false, depth: 3, value: 10, children: [] },
                            { id: "L4", isMax: false, depth: 3, value: 5, children: [] },
                        ]},
                        { id: "C2", isMax: true, depth: 2, children: [
                            { id: "L5", isMax: false, depth: 3, value: 100, children: [] },
                            { id: "L6", isMax: false, depth: 3, value: 200, children: [] },
                        ]},
                        { id: "C3", isMax: true, depth: 2, children: [
                            { id: "L7", isMax: false, depth: 3, value: 300, children: [] },
                        ]}
                    ]}
                ]
            }
        }
    };

    let currentCaseKey = $state<keyof typeof cases>("normal");
    
    const flatNodes = $derived.by(() => {
        const nodes: Record<NodeId, FlatNode> = {};
        const depthLayers: Record<number, NodeId[]> = {};
        const edges: [NodeId, NodeId][] = [];
        function flatten(node: any, parentId: NodeId | null) {
            nodes[node.id] = { id: node.id, isMax: node.isMax, depth: node.depth, leafValue: node.value, childIds: node.children.map((c: any) => c.id), parentId };
            if (!depthLayers[node.depth]) depthLayers[node.depth] = [];
            depthLayers[node.depth].push(node.id);
            if (parentId) edges.push([parentId, node.id]);
            node.children.forEach((c: any) => flatten(c, node.id));
        }
        flatten(cases[currentCaseKey].tree, null);
        return { nodes, edges, depthLayers };
    });

    const positions = $derived.by(() => {
        const { nodes, depthLayers } = flatNodes;
        const pos: Record<NodeId, { x: number; y: number }> = {};
        const width = 700, height = 380, margin = { top: 55, bottom: 40 }, maxDepth = 3;
        const layerHeight = (height - margin.top - margin.bottom) / maxDepth;
        const leaves = depthLayers[maxDepth] || [];
        const leafSpacing = width / (leaves.length + 1);
        leaves.forEach((id, i) => { pos[id] = { x: leafSpacing * (i + 1), y: margin.top + maxDepth * layerHeight }; });
        for (let d = maxDepth - 1; d >= 0; d--) {
            if (!depthLayers[d]) continue;
            depthLayers[d].forEach(id => {
                const node = nodes[id];
                if (node.childIds.length === 0) {
                    pos[id] = { x: width / 2, y: margin.top + d * layerHeight };
                    return;
                }
                const avgX = node.childIds.map(cid => pos[cid].x).reduce((a, b) => a + b, 0) / node.childIds.length;
                pos[id] = { x: avgX, y: margin.top + d * layerHeight };
            });
        }
        return pos;
    });

    interface Snapshot {
        action: string; detail: string; activeNode: NodeId;
        computedValues: Record<NodeId, number>; visitedNodes: NodeId[];
        activeEdge: [NodeId, NodeId] | null; solutionPath: NodeId[];
        goalReached: boolean; prunedEdges: Set<string>; prunedNodes: Set<string>;
        alphaVal: number; betaVal: number;
        nodeAB: Record<NodeId, { a: number; b: number }>;
    }

    const snapshots = $derived.by(() => {
        const snaps: Snapshot[] = [];
        const computed: Record<NodeId, number> = {};
        const visited: NodeId[] = [];
        const prunedEdges = new Set<string>();
        const prunedNodes = new Set<string>();
        const nodeAB: Record<NodeId, { a: number; b: number }> = {};
        const { nodes: currentNodes } = flatNodes;

        function addSnap(action: string, detail: string, activeNode: NodeId, activeEdge: [NodeId, NodeId] | null, alpha: number, beta: number, solPath: NodeId[] = [], goal = false) {
            // Clone nodeAB manually to preserve Infinity values (JSON.stringify converts them to null)
            const nodeABClone: Record<NodeId, { a: number; b: number }> = {};
            for (const [id, vals] of Object.entries(nodeAB)) {
                nodeABClone[id] = { ...vals };
            }
            snaps.push({ action, detail, activeNode, computedValues: { ...computed }, visitedNodes: [...visited], activeEdge, solutionPath: solPath, goalReached: goal, prunedEdges: new Set(prunedEdges), prunedNodes: new Set(prunedNodes), alphaVal: alpha, betaVal: beta, nodeAB: nodeABClone });
        }

        function markPruned(nodeId: NodeId) {
            prunedNodes.add(nodeId);
            currentNodes[nodeId].childIds.forEach(cid => { prunedEdges.add(`${nodeId}|${cid}`); markPruned(cid); });
        }

        function alphaBeta(nodeId: NodeId, alpha: number, beta: number, parentId: NodeId | null): number {
            const node = currentNodes[nodeId];
            visited.push(nodeId);
            nodeAB[nodeId] = { a: alpha, b: beta };

            addSnap(parentId ? `Kunjungi ${nodeId}` : `Mulai dari root ${nodeId}`,
                node.leafValue !== undefined ? `${nodeId} (Leaf). α=${alpha}, β=${beta}` : `${nodeId} (${node.isMax ? "MAX" : "MIN"}). α=${alpha}, β=${beta}`,
                nodeId, parentId ? [parentId, nodeId] : null, alpha, beta);

            if (node.leafValue !== undefined) {
                computed[nodeId] = node.leafValue;
                addSnap(`Nilai ${nodeId} = ${node.leafValue}`, `Utility leaf dikembalikan.`, nodeId, parentId ? [parentId, nodeId] : null, alpha, beta);
                return node.leafValue;
            }

            if (node.isMax) {
                let value = -Infinity;
                for (let i = 0; i < node.childIds.length; i++) {
                    value = Math.max(value, alphaBeta(node.childIds[i], alpha, beta, nodeId));
                    alpha = Math.max(alpha, value);
                    nodeAB[nodeId] = { a: alpha, b: beta };
                    if (beta <= alpha && i < node.childIds.length - 1) {
                        for (let j = i + 1; j < node.childIds.length; j++) { prunedEdges.add(`${nodeId}|${node.childIds[j]}`); markPruned(node.childIds[j]); }
                        addSnap(`✂️ Beta Cutoff!`, `α(${alpha}) ≥ β(${beta}).`, nodeId, null, alpha, beta);
                        break;
                    }
                    addSnap(`Update Alpha ${nodeId}`, `MAX mencari terbesar. α baru: ${alpha}`, nodeId, null, alpha, beta);
                }
                computed[nodeId] = value;
                return value;
            } else {
                let value = Infinity;
                for (let i = 0; i < node.childIds.length; i++) {
                    value = Math.min(value, alphaBeta(node.childIds[i], alpha, beta, nodeId));
                    beta = Math.min(beta, value);
                    nodeAB[nodeId] = { a: alpha, b: beta };
                    if (beta <= alpha && i < node.childIds.length - 1) {
                        for (let j = i + 1; j < node.childIds.length; j++) { prunedEdges.add(`${nodeId}|${node.childIds[j]}`); markPruned(node.childIds[j]); }
                        addSnap(`✂️ Alpha Cutoff!`, `β(${beta}) ≤ α(${alpha}).`, nodeId, null, alpha, beta);
                        break;
                    }
                    addSnap(`Update Beta ${nodeId}`, `MIN mencari terkecil. β baru: ${beta}`, nodeId, null, alpha, beta);
                }
                computed[nodeId] = value;
                return value;
            }
        }

        const rootId = cases[currentCaseKey].tree.id;
        alphaBeta(rootId, -Infinity, Infinity, null);

        const optimalPath: NodeId[] = [];
        function tracePath(nodeId: NodeId) {
            optimalPath.push(nodeId);
            const node = currentNodes[nodeId];
            if (node.childIds.length === 0) return;
            const best = node.childIds.find(cid => computed[cid] === computed[nodeId]);
            if (best) tracePath(best);
        }
        tracePath(rootId);

        addSnap("Selesai!", `Jalur optimal: ${optimalPath.join(" → ")}`, rootId, null, computed[rootId], computed[rootId], optimalPath, true);
        return snaps;
    });

    let step = $state(0);
    let isPlaying = $state(false);
    let timer: any = null;
    const maxStep = $derived(snapshots.length - 1);
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
        timer = setInterval(() => { if (step >= maxStep) { stop(); return; } step++; }, 800);
    }
    onDestroy(() => stop());

    function formatVal(v: number) { return v === -Infinity ? "-∞" : (v === Infinity ? "∞" : v); }
</script>

<div class="visualizer-card">
    <div class="progress-container"><div class="progress-bar" style="width: {progressPct}%"></div></div>

    <div class="top-controls">
        <div class="algo-label">
            <span class="algo-badge">Alpha-Beta Pruning</span>
            <span class="goal-label">Langkah {step}/{maxStep}</span>
            {#if prunedCount > 0}<span class="metric-badge">✂️ {prunedCount} dipangkas</span>{/if}
        </div>
        
        <div class="case-selector">
            {#each Object.keys(cases) as k}
                <button class="case-btn" class:active={currentCaseKey === k} onclick={() => { currentCaseKey = k as any; reset(); }}>
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                </button>
            {/each}
        </div>

        <div class="playback-controls">
            <button class="action-btn" onclick={prev} disabled={step === 0}><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6" /></svg></button>
            <button class="action-btn play-btn" onclick={togglePlay}>
                {#if isPlaying}<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                {:else}<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>{/if}
            </button>
            <button class="action-btn" onclick={next} disabled={step >= maxStep}><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6" /></svg></button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="visualizer-grid">
        <div class="side-panel">
            <div class="status-panel">
                <p class="case-title">📂 {cases[currentCaseKey].title}</p>
                <p class="action-text"><strong>🎯 {snap.action}</strong></p>
                <p class="detail-text">{snap.detail}</p>
            </div>

            <div class="decision-panel">
                <div class="ab-row">
                    <span class="ab-label ab-alpha">α</span> 
                    <span class="ab-owner">MAX</span>
                    <span class="ab-val">{formatVal(snap.alphaVal)}</span>
                </div>
                <div class="ab-row">
                    <span class="ab-label ab-beta">β</span> 
                    <span class="ab-owner">MIN</span>
                    <span class="ab-val">{formatVal(snap.betaVal)}</span>
                </div>
            </div>

            {#if snap.goalReached}
                <div class="goal-alert">🏆 Hasil: <strong>{snap.computedValues[cases[currentCaseKey].tree.id]}</strong></div>
            {/if}

            <div class="legend-box">
                <div class="legend">
                    <span><i class="dot"></i> Belum</span>
                    <span><i class="dot visited"></i> Dikunjungi</span>
                    <span><i class="dot pruned"></i> Dipangkas</span>
                </div>
            </div>
        </div>

        <div class="main-canvas">
            <svg class="tree-svg" viewBox="0 0 700 380" preserveAspectRatio="xMidYMid meet">
                <pattern id="grid-ab" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-line)" stroke-width="0.5" opacity="0.3"/>
                </pattern>
                <rect width="700" height="380" fill="url(#grid-ab)" />

                {#each flatNodes.edges as [from, to]}
                    {@const fP = positions[from]}
                    {@const tP = positions[to]}
                    {@const es = edgeState(from, to)}
                    {#if fP && tP}
                        <line x1={fP.x} y1={fP.y + 20} x2={tP.x} y2={tP.y - 20}
                            class="edge-line" class:edge-visited={es === "visited"} class:edge-expansion={es === "active"} class:edge-solution={es === "solution"} class:edge-pruned={es === "pruned"}
                        />
                        {#if es === "pruned"}<text x={(fP.x + tP.x) / 2 + 8} y={(fP.y + tP.y) / 2} font-size="14">✂️</text>{/if}
                    {/if}
                {/each}

                {#each Object.entries(positions) as [nodeId, pos]}
                    {@const node = flatNodes.nodes[nodeId]}
                    {@const computedVal = snap.computedValues[nodeId]}
                    {@const isActive = snap.activeNode === nodeId}
                    {@const isVisited = snap.visitedNodes.includes(nodeId)}
                    {@const isOnSolution = snap.solutionPath.includes(nodeId)}
                    {@const isLeaf = node.childIds.length === 0}
                    {@const isPruned = snap.prunedNodes.has(nodeId)}
                    {@const ab = snap.nodeAB[nodeId]}

                    <g class="node" class:node-max={node.isMax && !isLeaf} class:node-min={!node.isMax && !isLeaf} class:node-leaf={isLeaf}
                        class:visited={isVisited} class:current={isActive} class:on-solution={isOnSolution} class:is-pruned={isPruned}
                        transform="translate({pos.x},{pos.y})">
                        {#if isLeaf}<rect x="-18" y="-18" width="36" height="36" rx="6"></rect>
                        {:else if node.isMax}<polygon points="0,-22 22,16 -22,16"></polygon>
                        {:else}<polygon points="0,22 22,-16 -22,-16"></polygon>{/if}
                        
                        <text class="node-label" y={isLeaf ? 1 : (node.isMax ? 4 : -2)}>{nodeId}</text>
                        
                        {#if ab && !isLeaf && isVisited}
                            <g class="node-ab-labels" transform="translate(-35, -5)">
                                <text class="node-ab-text">α={formatVal(ab.a)}</text>
                                <text class="node-ab-text" y="12">β={formatVal(ab.b)}</text>
                            </g>
                        {/if}

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

<style>
    .visualizer-card { background: var(--color-surface-elevated); border: 1px solid var(--color-line); border-radius: 16px; margin: 1.5rem 0; box-shadow: var(--shadow-lg); overflow: hidden; }
    .progress-container { height: 6px; background: var(--color-surface-soft); }
    .progress-bar { height: 100%; background: var(--color-binder); transition: width 0.3s ease; }
    .top-controls { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-line); background: color-mix(in srgb, var(--color-surface-elevated) 95%, black); flex-wrap: wrap; gap: 0.75rem; }
    .case-selector { display: flex; gap: 0.35rem; background: var(--color-surface-soft); padding: 0.25rem; border-radius: 10px; }
    .case-btn { border: none; background: transparent; color: var(--color-ink-soft); padding: 0.4rem 0.6rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .case-btn.active { background: var(--color-surface-elevated); color: var(--color-binder); box-shadow: var(--shadow-sm); }
    .algo-badge { background: var(--color-binder); color: white; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; }
    .goal-label { font-size: 0.8rem; color: var(--color-ink-soft); padding: 0.3rem 0.6rem; background: var(--color-surface-soft); border-radius: 6px; }
    .metric-badge { font-size: 0.8rem; color: var(--color-status-error-text); font-weight: 700; padding: 0.3rem 0.6rem; background: var(--color-status-warning-soft); border-radius: 6px; border: 1px solid var(--color-status-warning-border); }
    .playback-controls { display: flex; gap: 0.4rem; }
    .action-btn { border: 1px solid var(--color-line); background: var(--color-surface-elevated); border-radius: 8px; padding: 0.4rem 0.7rem; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
    .play-btn { background: var(--color-binder); color: white; border: none; }
    .visualizer-grid { display: grid; grid-template-columns: 260px 1fr; min-height: 400px; }
    .side-panel { background: var(--color-surface-soft); padding: 1.25rem; border-right: 1px solid var(--color-line); display: flex; flex-direction: column; gap: 0.8rem; }
    .status-panel { background: var(--color-surface-elevated); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .case-title { font-size: 0.7rem; font-weight: 800; color: var(--color-binder); text-transform: uppercase; margin-bottom: 0.4rem; }
    .action-text { font-size: 0.85rem; margin-bottom: 0.3rem; }
    .detail-text { font-size: 0.75rem; color: var(--color-ink-soft); line-height: 1.4; }
    .decision-panel { background: var(--color-status-info-soft); padding: 0.8rem; border-radius: 10px; border-left: 3px solid var(--color-status-info-border); display: flex; flex-direction: column; gap: 0.5rem; }
    .ab-row { display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; font-weight: 700; font-family: var(--font-mono); }
    .ab-label { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: white; font-size: 0.75rem; }
    .ab-alpha { background: #3b82f6; } .ab-beta { background: #ec4899; }
    .ab-owner { font-size: 0.65rem; color: var(--color-ink-soft); width: 30px; }
    .goal-alert { background: var(--color-status-success-soft); padding: 0.6rem; border-radius: 10px; text-align: center; font-weight: 700; font-size: 0.85rem; }
    .legend-box { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-line); }
    .legend { display: flex; flex-wrap: wrap; gap: 0.6rem; font-size: 0.7rem; }
    .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; border: 1px solid var(--color-line); }
    .dot.visited { background: var(--color-status-success-soft); }
    .dot.pruned { background: var(--color-status-warning-soft); border: 1.5px dashed var(--color-accent); }
    .main-canvas { padding: 1rem; display: flex; flex-direction: column; justify-content: center; }
    .tree-svg { width: 100%; height: auto; overflow: visible; }
    .edge-line { stroke: #444; stroke-width: 3; transition: all 0.3s; opacity: 0.8; }
    .edge-line.edge-visited { opacity: 1; stroke: var(--color-ink-strong); }
    .edge-line.edge-expansion { stroke: var(--color-status-success-start); stroke-width: 5; opacity: 1; }
    .edge-line.edge-solution { stroke: var(--color-callout-warning-border); stroke-width: 6; opacity: 1; }
    .edge-line.edge-pruned { stroke: var(--color-accent); stroke-width: 3; opacity: 0.4; stroke-dasharray: 6 4; }
    .node polygon, .node rect { fill: var(--color-surface-elevated); stroke: var(--color-line); stroke-width: 2; transition: all 0.3s; }
    .node.node-max polygon { stroke: var(--color-status-info-border); }
    .node.node-min polygon { stroke: var(--color-callout-warning-border); }
    .node.node-leaf rect { stroke: var(--color-binder); fill: color-mix(in srgb, var(--color-binder) 8%, var(--color-surface-elevated)); }
    .node.visited polygon, .node.visited rect { fill: var(--color-status-success-soft); stroke: var(--color-status-success-border); }
    .node.current polygon, .node.current rect { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; }
    .node.on-solution polygon, .node.on-solution rect { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; }
    .node.is-pruned polygon, .node.is-pruned rect { fill: var(--color-status-warning-soft); stroke: var(--color-accent); stroke-dasharray: 4 3; opacity: 0.4; }
    .node-label { fill: var(--color-ink-strong); font-size: 13px; text-anchor: middle; font-family: var(--font-handwriting); font-weight: bold; }
    .node-ab-labels { pointer-events: none; }
    .node-ab-text { font-size: 9px; fill: var(--color-ink-soft); font-family: var(--font-mono); font-weight: bold; text-anchor: end; }
    .value-badge rect { fill: var(--color-status-success-start); stroke: none; }
    .value-badge text { fill: #1a1a1a; font-size: 11px; text-anchor: middle; font-weight: 800; font-family: var(--font-mono); }
    .leaf-value { fill: var(--color-binder); font-size: 12px; text-anchor: middle; font-weight: 700; font-family: var(--font-mono); }
    @media (max-width: 900px) { .visualizer-grid { grid-template-columns: 1fr; } .side-panel { border-right: none; border-bottom: 1px solid var(--color-line); max-height: 250px; } }
</style>
