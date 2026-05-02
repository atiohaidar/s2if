<script lang="ts">
    import { onDestroy } from "svelte";
    import * as d3 from "d3";

    type Algo = "BFS" | "DFS" | "UCS" | "DLS" | "IDS" | "BDS";
    type NodeId = string;

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
        ucsDecision?: string;
        ucsUpdates?: string[];
        goalReached: boolean;
        frontierSize: number;
        depthLimit?: number;
        idsIteration?: number;
        direction?: string;
    };

    const treeData = {
        id: "S",
        children: [
            {
                id: "A",
                children: [
                    { id: "D", children: [] },
                    { id: "E", children: [] }
                ]
            },
            {
                id: "B",
                children: [
                    { id: "F", children: [] },
                    { id: "G", children: [] }
                ]
            },
            {
                id: "C",
                children: [
                    { id: "H", children: [] },
                    { id: "I", children: [] }
                ]
            }
        ]
    };

    const edgeCosts: Record<string, number> = {
        "S-A": 1, "S-B": 5, "S-C": 2,
        "A-D": 4, "A-E": 1,
        "B-F": 1, "B-G": 1,
        "C-H": 1, "C-I": 5,
    };

    const goalNode: NodeId = "H";

    // --- D3 Layout Calculation (Fixed to be more symmetric) ---
    const width = 640;
    const height = 340;
    const margin = { top: 50, right: 40, bottom: 50, left: 40 };

    const root = d3.hierarchy(treeData);
    // Menggunakan d3.tree().nodeSize() agar lebih stabil posisinya
    const treeLayout = d3.tree<any>().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
    treeLayout(root);

    const nodePositions: Record<NodeId, { x: number; y: number }> = {};
    const treeEdges: [NodeId, NodeId][] = [];
    const adjacency: Record<NodeId, NodeId[]> = {};

    root.descendants().forEach(d => {
        // Kita simpan koordinat x dan y yang sudah dihitung D3
        const x = (d.x ?? 0) + margin.left;
        const y = (d.y ?? 0) + margin.top;
        nodePositions[d.data.id] = { x, y };
        adjacency[d.data.id] = d.children ? d.children.map(c => c.data.id) : [];
        if (d.parent) {
            treeEdges.push([d.parent.data.id, d.data.id]);
        }
    });

    const allNodes = Object.entries(nodePositions) as [NodeId, { x: number; y: number }][];

    // --- Simulation Logic ---
    function buildPath(parents: Partial<Record<NodeId, NodeId | null>>, node: NodeId): NodeId[] {
        const path: NodeId[] = [node];
        let cursor = parents[node];
        while (cursor) {
            path.unshift(cursor);
            cursor = parents[cursor];
        }
        return path;
    }

    function formatFrontier(entries: QueueEntry[]): string[] {
        return entries.map((e) => `${e.node}${e.cost > 0 ? `(${e.cost})` : ""}`);
    }

    function simulateBfs(): Snapshot[] {
        const snapshots: Snapshot[] = [];
        const queue: QueueEntry[] = [{ node: "S", cost: 0, depth: 0 }];
        const visited = new Set<NodeId>();
        const discovered = new Set<NodeId>(["S"]);
        const parents: Partial<Record<NodeId, NodeId | null>> = { S: null };

        snapshots.push({
            node: "-", action: "Start dari root S dan masukkan ke queue.",
            frontier: ["S"], visited: [], currentPath: ["S"], goalReached: false, frontierSize: 1
        });

        while (queue.length > 0) {
            const current = queue.shift()!;
            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node, action: `Pop ${current.node}, goal ditemukan.`,
                    frontier: formatFrontier(queue), visited: [...visited], currentPath, goalReached: true, frontierSize: queue.length
                });
                break;
            }

            const children = adjacency[current.node].filter(c => !discovered.has(c));
            const expandedEdges: [NodeId, NodeId][] = [];
            children.forEach(c => {
                discovered.add(c);
                parents[c] = current.node;
                queue.push({ node: c, cost: 0, depth: current.depth + 1 });
                expandedEdges.push([current.node, c]);
            });

            snapshots.push({
                node: current.node, action: children.length > 0 ? `Pop ${current.node}, enqueue: ${children.join(", ")}.` : `Pop ${current.node}, tidak ada child baru.`,
                frontier: formatFrontier(queue), visited: [...visited], currentPath, expandedEdges, goalReached: false, frontierSize: queue.length
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
            node: "-", action: "Start dari root S dan push ke stack.",
            frontier: ["S"], visited: [], currentPath: ["S"], goalReached: false, frontierSize: 1
        });

        while (stack.length > 0) {
            const current = stack.pop()!;
            if (visited.has(current.node)) continue;

            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node, action: `Pop ${current.node}, goal ditemukan.`,
                    frontier: formatFrontier(stack), visited: [...visited], currentPath, goalReached: true, frontierSize: stack.length
                });
                break;
            }

            const children = [...adjacency[current.node]].reverse().filter(c => !discovered.has(c));
            const expandedEdges: [NodeId, NodeId][] = [];
            children.forEach(c => {
                discovered.add(c);
                parents[c] = current.node;
                stack.push({ node: c, cost: 0, depth: current.depth + 1 });
                expandedEdges.push([current.node, c]);
            });

            snapshots.push({
                node: current.node, action: children.length > 0 ? `Pop ${current.node}, push: ${children.slice().reverse().join(", ")}.` : `Pop ${current.node}, tidak ada child baru.`,
                frontier: formatFrontier(stack), visited: [...visited], currentPath, expandedEdges, goalReached: false, frontierSize: stack.length
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
            node: "-", action: "Start dari S dengan biaya 0 di priority queue.",
            frontier: ["S(0)"], visited: [], currentPath: ["S"], goalReached: false, frontierSize: 1
        });

        while (frontier.length > 0) {
            frontier.sort((a, b) => a.cost - b.cost || a.depth - b.depth || a.node.localeCompare(b.node));
            const rankedFrontier = frontier.map(e => `${e.node}(${e.cost})`);
            const bestCandidate = frontier[0];
            const sameCostCandidates = frontier.filter(e => e.cost === bestCandidate.cost);
            const current = frontier.shift()!;

            if (visited.has(current.node)) continue;

            const tieBreak = sameCostCandidates.length > 1 ? `Biaya sama (${current.cost}), pilih via depth/abjad.` : `Biaya terkecil (${current.cost}).`;
            const decision = `Pilih ${current.node}(${current.cost}) dari [${rankedFrontier.join(", ")}]. ${tieBreak}`;

            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node, action: `Pop ${current.node}, goal ketemu (biaya ${current.cost}).`,
                    frontier: formatFrontier(frontier), visited: [...visited], currentPath, goalReached: true, frontierSize: frontier.length, ucsDecision: decision
                });
                break;
            }

            const expandedEdges: [NodeId, NodeId][] = [];
            const ucsUpdates: string[] = [];
            adjacency[current.node].forEach(child => {
                const totalCost = current.cost + (edgeCosts[`${current.node}-${child}`] ?? 0);
                if (bestCost[child] === undefined || totalCost < bestCost[child]!) {
                    bestCost[child] = totalCost;
                    parents[child] = current.node;
                    frontier.push({ node: child, cost: totalCost, depth: current.depth + 1 });
                    expandedEdges.push([current.node, child]);
                    ucsUpdates.push(`${child}: update ke ${totalCost} (via ${current.node}).`);
                } else {
                    ucsUpdates.push(`${child}: abaikan biaya ${totalCost} (sudah ada yang lebih murah).`);
                }
            });

            snapshots.push({
                node: current.node, action: `Pop ${current.node}, update kandidat biaya.`,
                frontier: formatFrontier(frontier), visited: [...visited], currentPath, expandedEdges, goalReached: false, frontierSize: frontier.length, ucsDecision: decision, ucsUpdates
            });
        }
        return snapshots;
    }

    function simulateDls(limit: number = 2, idsIter?: number): Snapshot[] {
        const snapshots: Snapshot[] = [];
        const stack: QueueEntry[] = [{ node: "S", cost: 0, depth: 0 }];
        const visited = new Set<NodeId>();
        const parents: Partial<Record<NodeId, NodeId | null>> = { S: null };

        const prefix = idsIter !== undefined ? `[IDS L=${limit}] ` : "";
        snapshots.push({
            node: "-", action: `${prefix}Start DLS dengan depth limit = ${limit}.`,
            frontier: ["S"], visited: [], currentPath: ["S"], goalReached: false, frontierSize: 1, depthLimit: limit, idsIteration: idsIter
        });

        while (stack.length > 0) {
            const current = stack.pop()!;
            if (visited.has(current.node)) continue;
            visited.add(current.node);
            const currentPath = buildPath(parents, current.node);

            if (current.node === goalNode) {
                snapshots.push({
                    node: current.node, action: `${prefix}Pop ${current.node}, goal ditemukan di depth ${current.depth}!`,
                    frontier: formatFrontier(stack), visited: [...visited], currentPath, goalReached: true, frontierSize: stack.length, depthLimit: limit, idsIteration: idsIter
                });
                return snapshots;
            }

            if (current.depth >= limit) {
                snapshots.push({
                    node: current.node, action: `${prefix}Pop ${current.node}, depth ${current.depth} = limit ${limit}. Tidak ekspansi.`,
                    frontier: formatFrontier(stack), visited: [...visited], currentPath, goalReached: false, frontierSize: stack.length, depthLimit: limit, idsIteration: idsIter
                });
                continue;
            }

            const children = [...adjacency[current.node]].reverse().filter(c => !visited.has(c));
            const expandedEdges: [NodeId, NodeId][] = [];
            children.forEach(c => {
                parents[c] = current.node;
                stack.push({ node: c, cost: 0, depth: current.depth + 1 });
                expandedEdges.push([current.node, c]);
            });

            snapshots.push({
                node: current.node,
                action: children.length > 0
                    ? `${prefix}Pop ${current.node} (depth ${current.depth}), push: ${children.slice().reverse().join(", ")}.`
                    : `${prefix}Pop ${current.node} (depth ${current.depth}), tidak ada child baru.`,
                frontier: formatFrontier(stack), visited: [...visited], currentPath, expandedEdges, goalReached: false, frontierSize: stack.length, depthLimit: limit, idsIteration: idsIter
            });
        }

        snapshots.push({
            node: "-", action: `${prefix}Limit ${limit} habis, goal belum ditemukan.`,
            frontier: [], visited: [...visited], currentPath: [], goalReached: false, frontierSize: 0, depthLimit: limit, idsIteration: idsIter
        });
        return snapshots;
    }

    function simulateIds(): Snapshot[] {
        const allSnapshots: Snapshot[] = [];
        for (let limit = 0; limit <= 3; limit++) {
            const iterSnaps = simulateDls(limit, limit);
            allSnapshots.push(...iterSnaps);
            const found = iterSnaps.some(s => s.goalReached);
            if (found) break;
        }
        return allSnapshots;
    }

    function simulateBds(): Snapshot[] {
        const snapshots: Snapshot[] = [];
        const forwardQueue: NodeId[] = ["S"];
        const backwardQueue: NodeId[] = [goalNode];
        const forwardVisited = new Set<NodeId>(["S"]);
        const backwardVisited = new Set<NodeId>([goalNode]);
        const forwardParent: Partial<Record<NodeId, NodeId | null>> = { S: null };
        const backwardParent: Partial<Record<NodeId, NodeId | null>> = { [goalNode]: null };

        // Build reverse adjacency for backward search
        const reverseAdj: Record<NodeId, NodeId[]> = {};
        for (const [node, children] of Object.entries(adjacency)) {
            for (const child of children) {
                if (!reverseAdj[child]) reverseAdj[child] = [];
                reverseAdj[child].push(node);
            }
        }

        snapshots.push({
            node: "-", action: "Start BDS: Forward dari S, Backward dari H.",
            frontier: ["F:[S]", "B:[H]"], visited: [], currentPath: [], goalReached: false, frontierSize: 2, direction: "both"
        });

        let meetNode: NodeId | null = null;
        let maxIter = 20;

        while (forwardQueue.length > 0 && backwardQueue.length > 0 && maxIter-- > 0) {
            // Forward step
            if (forwardQueue.length > 0) {
                const fNode = forwardQueue.shift()!;
                const fChildren = (adjacency[fNode] || []).filter(c => !forwardVisited.has(c));
                const expandedEdges: [NodeId, NodeId][] = [];
                fChildren.forEach(c => {
                    forwardVisited.add(c);
                    forwardParent[c] = fNode;
                    forwardQueue.push(c);
                    expandedEdges.push([fNode, c]);
                });

                snapshots.push({
                    node: fNode,
                    action: `Forward: Pop ${fNode}, enqueue: ${fChildren.join(", ") || "(kosong)"}.`,
                    frontier: [`F:[${forwardQueue.join(",")}]`, `B:[${backwardQueue.join(",")}]`],
                    visited: [...forwardVisited, ...backwardVisited],
                    currentPath: buildPath(forwardParent, fNode),
                    expandedEdges,
                    goalReached: false,
                    frontierSize: forwardQueue.length + backwardQueue.length,
                    direction: "forward"
                });

                // Check intersection
                const fwdMeet = fChildren.find(c => backwardVisited.has(c));
                if (fwdMeet) { meetNode = fwdMeet; }
                if (backwardVisited.has(fNode)) { meetNode = fNode; }
                if (meetNode) break;
            }

            // Backward step
            if (backwardQueue.length > 0) {
                const bNode = backwardQueue.shift()!;
                const bChildren = (reverseAdj[bNode] || []).filter(c => !backwardVisited.has(c));
                const expandedEdges: [NodeId, NodeId][] = [];
                bChildren.forEach(c => {
                    backwardVisited.add(c);
                    backwardParent[c] = bNode;
                    backwardQueue.push(c);
                    expandedEdges.push([bNode, c]);
                });

                snapshots.push({
                    node: bNode,
                    action: `Backward: Pop ${bNode}, enqueue: ${bChildren.join(", ") || "(kosong)"}.`,
                    frontier: [`F:[${forwardQueue.join(",")}]`, `B:[${backwardQueue.join(",")}]`],
                    visited: [...forwardVisited, ...backwardVisited],
                    currentPath: buildPath(backwardParent, bNode),
                    expandedEdges,
                    goalReached: false,
                    frontierSize: forwardQueue.length + backwardQueue.length,
                    direction: "backward"
                });

                const bwdMeet = bChildren.find(c => forwardVisited.has(c));
                if (bwdMeet) { meetNode = bwdMeet; }
                if (forwardVisited.has(bNode)) { meetNode = bNode; }
                if (meetNode) break;
            }
        }

        if (meetNode) {
            // Reconstruct full path
            const fwdPath = buildPath(forwardParent, meetNode);
            const bwdPath: NodeId[] = [];
            let cur: NodeId | null | undefined = meetNode;
            while (cur && backwardParent[cur] !== undefined && backwardParent[cur] !== null) {
                bwdPath.push(backwardParent[cur]!);
                cur = backwardParent[cur];
            }
            const fullPath = [...fwdPath, ...bwdPath];

            snapshots.push({
                node: meetNode,
                action: `Bertemu di ${meetNode}! Jalur: ${fullPath.join(" → ")}.`,
                frontier: [],
                visited: [...forwardVisited, ...backwardVisited],
                currentPath: fullPath,
                goalReached: true,
                frontierSize: 0,
                direction: "meet"
            });
        }

        return snapshots;
    }

    const snapshotsByAlgo: Record<Algo, Snapshot[]> = {
        BFS: simulateBfs(),
        DFS: simulateDfs(),
        UCS: simulateUcs(),
        DLS: simulateDls(2),
        IDS: simulateIds(),
        BDS: simulateBds(),
    };

    let algorithm = $state<Algo>("BFS");
    let step = $state(0);
    let isPlaying = $state(false);
    let playbackSpeed = $state(850);
    let hoveredNode = $state<NodeId | null>(null);
    let timer: any = null;

    const snapshots = $derived(snapshotsByAlgo[algorithm]);
    const maxFrontierSize = $derived(Math.max(...snapshots.map((s) => s.frontierSize)));
    const currentSnapshot = $derived(snapshots[Math.min(step, snapshots.length - 1)] ?? snapshots[0]);
    const visitedNow = $derived(currentSnapshot?.visited ?? []);
    const currentNode = $derived(currentSnapshot?.node ?? "-");
    const goalReached = $derived(Boolean(currentSnapshot?.goalReached));
    const action = $derived(currentSnapshot?.action ?? "Tekan Play untuk mulai animasi.");
    const frontier = $derived(currentSnapshot?.frontier ?? []);
    const currentPath = $derived(currentSnapshot?.currentPath ?? []);
    const expansionEdges = $derived(currentSnapshot?.expandedEdges ?? []);
    const ucsDecision = $derived(currentSnapshot?.ucsDecision ?? "");
    const ucsUpdates = $derived(currentSnapshot?.ucsUpdates ?? []);
    const solutionEdgeKeys = $derived(getPathEdgeKeys(currentPath));
    const progressPercentage = $derived((step / (snapshots.length - 1)) * 100);

    function getPathEdgeKeys(path: NodeId[]) {
        const keys = new Set<string>();
        for (let i = 0; i < path.length - 1; i++) keys.add(`${path[i]}|${path[i + 1]}`);
        return keys;
    }

    function getEdgeState(from: NodeId, to: NodeId) {
        const key = `${from}|${to}`;
        if (solutionEdgeKeys.has(key)) return "solution";
        if (expansionEdges.some(([f, t]) => f === from && t === to)) return "expansion";
        if (visitedNow.includes(from) && visitedNow.includes(to)) return "visited";
        return "";
    }

    function getEdgeCost(from: NodeId, to: NodeId) { return edgeCosts[`${from}-${to}`]; }

    function getEdgeLabelPosition(from: NodeId, to: NodeId) {
        const f = nodePositions[from];
        const t = nodePositions[to];
        if (!f || !t) return { x: 0, y: 0 };
        const midX = (f.x + t.x) / 2;
        const midY = (f.y + t.y) / 2;
        // Geser sedikit agar tidak menempel di garis
        return { x: midX + 12, y: midY };
    }

    function stopPlayback() { if (timer) clearInterval(timer); isPlaying = false; }
    function reset() { stopPlayback(); step = 0; }
    function setAlgorithm(next: Algo) { if (algorithm !== next) { algorithm = next; reset(); } }
    function nextStep() { if (step < snapshots.length - 1) step++; else stopPlayback(); }
    function prevStep() { if (step > 0) { step--; stopPlayback(); } }

    function togglePlay() {
        if (isPlaying) { stopPlayback(); return; }
        isPlaying = true;
        timer = setInterval(() => {
            if (step >= snapshots.length - 1) { stopPlayback(); return; }
            step++;
        }, playbackSpeed);
    }

    onDestroy(() => stopPlayback());
</script>

<div class="visualizer-card">
    <div class="progress-container">
        <div class="progress-bar" style="width: {progressPercentage}%"></div>
    </div>

    <div class="top-controls">
        <div class="algo-tabs">
            {#each ["BFS", "DFS", "UCS", "DLS", "IDS", "BDS"] as algo}
                <button
                    class="algo-btn"
                    class:active={algorithm === algo}
                    onclick={() => setAlgorithm(algo as Algo)}
                >
                    {algo}
                </button>
            {/each}
        </div>

        <div class="playback-controls">
            <button class="action-btn" onclick={prevStep} disabled={step === 0}>
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
            <button class="action-btn" onclick={nextStep} disabled={step >= snapshots.length - 1}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="speed-control">
        <span>Speed: {playbackSpeed}ms</span>
        <input type="range" min="100" max="2000" step="100" bind:value={playbackSpeed} />
    </div>

    <div class="visualizer-grid">
        <div class="side-panel">
            <div class="status-panel">
                <p><strong>Node:</strong> <span class="node-badge">{currentNode}</span></p>
                <p><strong>Langkah:</strong> {step}/{snapshots.length - 1}</p>
                <p><strong>Memori (Max Frontier):</strong> <span class="memory-badge">{maxFrontierSize} nodes</span></p>
                <p class="action-text"><strong>Aksi:</strong> {action}</p>
                {#if goalReached}
                    <div class="goal-alert">Goal H Ditemukan!</div>
                {/if}
            </div>

            <div class="frontier-panel">
                <p><strong>{algorithm === "BFS" || algorithm === "BDS" ? "Queue" : algorithm === "DFS" || algorithm === "DLS" || algorithm === "IDS" ? "Stack" : "Priority queue"}:</strong></p>
                {#if frontier.length > 0}
                    <div class="frontier-list">
                        {#each frontier as item, i}
                            {@const nodeId = item.split("(")[0]}
                            <span 
                                class="frontier-item" 
                                class:is-head={i === 0}
                                class:is-hovered={hoveredNode === nodeId}
                                onmouseenter={() => hoveredNode = nodeId}
                                onmouseleave={() => hoveredNode = null}
                            >
                                {item}
                            </span>
                        {/each}
                    </div>
                {:else}
                    <p class="frontier-empty">Kosong</p>
                {/if}
            </div>

            <div class="legend-box">
                <div class="legend">
                    <span><i class="dot"></i> Belum</span>
                    <span><i class="dot visited"></i> Dikunjungi</span>
                    <span><i class="dot current"></i> Aktif</span>
                    <span><i class="dot goal"></i> Goal</span>
                </div>
                <div class="legend edge-legend">
                    <span><i class="dot edge-expansion"></i> Ekspansi</span>
                    <span><i class="dot edge-solution"></i> Solusi</span>
                </div>
            </div>
        </div>

        <div class="main-canvas">
            <div class="tree-wrap">
                <svg class="tree-svg" viewBox="0 0 640 340" preserveAspectRatio="xMidYMid meet">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-line)" stroke-width="0.5" opacity="0.3"/>
                    </pattern>
                    <rect width="640" height="340" fill="url(#grid)" />

                    <!-- Edges -->
                    {#each treeEdges as [from, to]}
                        {@const fPos = nodePositions[from]}
                        {@const tPos = nodePositions[to]}
                        <line
                            x1={fPos.x}
                            y1={fPos.y + 22}
                            x2={tPos.x}
                            y2={tPos.y - 22}
                            class="edge-line"
                            class:edge-visited={getEdgeState(from, to) === "visited"}
                            class:edge-expansion={getEdgeState(from, to) === "expansion"}
                            class:edge-solution={getEdgeState(from, to) === "solution"}
                        />
                    {/each}

                    <!-- Edge Labels -->
                    <g class="edge-labels" class:show-costs={algorithm === "UCS" || algorithm === "BDS"}>
                        {#each treeEdges as [from, to]}
                            {@const labelPos = getEdgeLabelPosition(from, to)}
                            <g class="edge-weight" transform={`translate(${labelPos.x}, ${labelPos.y})`}>
                                <rect x="-10" y="-10" width="20" height="20" rx="4" fill="var(--color-surface-elevated)" stroke="var(--color-line)"></rect>
                                <text x="0" y="1">{getEdgeCost(from, to)}</text>
                            </g>
                        {/each}
                    </g>

                    <!-- Nodes -->
                    {#each allNodes as [node, pos]}
                        <g
                            class="node"
                            class:visited={visitedNow.includes(node)}
                            class:current={currentNode === node}
                            class:goal={node === "H"}
                            class:is-hovered={hoveredNode === node}
                            transform={`translate(${pos.x}, ${pos.y})`}
                            onmouseenter={() => hoveredNode = node}
                            onmouseleave={() => hoveredNode = null}
                        >
                            <circle r="22"></circle>
                            <text>{node}</text>
                        </g>
                    {/each}
                </svg>
            </div>
            
            {#if currentPath.length > 0}
                <div class="path-display">
                    <strong>Path:</strong> {currentPath.join(" → ")}
                </div>
            {/if}

            {#if algorithm === "UCS" && ucsDecision}
                <div class="ucs-explain">
                    <p class="decision"><strong>Decision:</strong> {ucsDecision}</p>
                    {#if ucsUpdates.length > 0}
                        <ul class="updates">
                            {#each ucsUpdates as up}
                                <li>{up}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/if}

            {#if (algorithm === "DLS" || algorithm === "IDS") && currentSnapshot.depthLimit !== undefined}
                <div class="ucs-explain">
                    <p class="decision"><strong>Depth Limit:</strong> {currentSnapshot.depthLimit}</p>
                    {#if currentSnapshot.idsIteration !== undefined}
                        <p style="margin:0.25rem 0 0; font-size:0.85rem; color: var(--color-ink-soft);">Iterasi IDS ke-{currentSnapshot.idsIteration + 1}</p>
                    {/if}
                </div>
            {/if}

            {#if algorithm === "BDS" && currentSnapshot.direction}
                <div class="ucs-explain">
                    <p class="decision"><strong>Arah:</strong> {currentSnapshot.direction === "forward" ? "→ Forward" : currentSnapshot.direction === "backward" ? "← Backward" : currentSnapshot.direction === "meet" ? "🤝 Bertemu!" : "Dua arah"}</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .visualizer-card {
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--color-line);
        background: color-mix(in srgb, var(--color-surface-elevated) 95%, black);
    }

    .algo-tabs, .playback-controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .algo-btn, .action-btn {
        border: 1px solid var(--color-line);
        background: var(--color-surface-elevated);
        color: var(--color-ink);
        border-radius: 8px;
        padding: 0.5rem 0.8rem;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
    }

    .algo-btn.active { background: var(--color-binder); color: white; border-color: var(--color-binder); }
    .play-btn { min-width: 100px; background: var(--color-binder); color: white; border: none; }

    .speed-control {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1.25rem;
        font-size: 0.85rem;
        background: var(--color-surface-soft);
        border-bottom: 1px solid var(--color-line);
    }

    .speed-control input { flex: 1; max-width: 200px; accent-color: var(--color-binder); }

    .visualizer-grid { display: grid; grid-template-columns: 280px 1fr; min-height: 400px; }

    .side-panel {
        background: var(--color-surface-soft);
        padding: 1.25rem;
        border-right: 1px solid var(--color-line);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .status-panel {
        background: var(--color-surface-elevated);
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }

    .node-badge { background: var(--color-binder); color: white; padding: 2px 8px; border-radius: 6px; }
    .memory-badge { color: var(--color-status-error-text); font-weight: bold; }
    .goal-alert { margin-top: 0.75rem; background: var(--color-status-success-soft); padding: 0.5rem; border-radius: 6px; text-align: center; animation: pulse-green 2s infinite; }

    .frontier-list { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem; }
    .frontier-item { padding: 0.4rem 0.75rem; background: var(--color-surface-elevated); border: 1px solid var(--color-line); border-radius: 8px; font-size: 0.85rem; font-weight: 600; }
    .frontier-item.is-head { border-color: var(--color-callout-warning-border); background: var(--color-highlight); position: relative; }
    .frontier-item.is-head::after { content: 'NEXT'; position: absolute; right: 8px; font-size: 10px; color: var(--color-callout-warning-border); }
    .frontier-item.is-hovered { border-color: var(--color-binder); }

    .main-canvas { padding: 1.25rem; display: flex; flex-direction: column; justify-content: center; }
    .tree-svg { width: 100%; height: auto; overflow: visible; }
    
    .edge-line { 
        stroke: #444; 
        stroke-width: 3; 
        transition: all 0.3s; 
        opacity: 0.8;
    }
    .edge-line.edge-visited { opacity: 1; stroke: var(--color-ink-strong); }
    .edge-line.edge-expansion { stroke: var(--color-status-success-start); stroke-width: 5; opacity: 1; }
    .edge-line.edge-solution { stroke: var(--color-callout-warning-border); stroke-width: 6; opacity: 1; }

    .edge-weight rect { fill: var(--color-surface-elevated); stroke: var(--color-line); }
    .edge-weight text { font-size: 11px; fill: var(--color-ink-strong); font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
    .edge-labels:not(.show-costs) { display: none; }

    .node circle { fill: var(--color-surface-elevated); stroke: var(--color-line); stroke-width: 2; transition: all 0.3s; }
    .node text { fill: var(--color-ink-strong); font-size: 18px; text-anchor: middle; dominant-baseline: middle; font-family: var(--font-handwriting); font-weight: bold; }
    .node.visited circle { fill: var(--color-status-success-soft); stroke: var(--color-status-success-border); }
    .node.current circle { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; animation: node-pulse 1.5s infinite; }
    .node.is-hovered circle { stroke: var(--color-binder); stroke-width: 4; }

    .path-display { margin-top: 1rem; padding: 0.75rem; background: var(--color-surface-soft); border-radius: 8px; font-family: monospace; border-left: 3px solid var(--color-binder); }
    .ucs-explain { margin-top: 1rem; padding: 0.75rem; background: var(--color-status-info-soft); border-radius: 8px; font-size: 0.85rem; border-left: 3px solid var(--color-status-info-border); }
    .ucs-explain .decision { color: var(--color-ink-strong); margin-bottom: 0.5rem; }
    .ucs-explain .updates { margin: 0; padding-left: 1.2rem; color: var(--color-ink-soft); }
    .ucs-explain li { margin-bottom: 0.2rem; }

    .legend-box { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--color-line); }
    .legend { display: flex; flex-wrap: wrap; gap: 0.8rem; font-size: 0.75rem; }
    .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; border: 1px solid var(--color-line); }
    .dot.visited { background: var(--color-status-success-soft); }
    .dot.current { background: var(--color-highlight); }
    .dot.goal { background: white; border: 2px dashed #ff4444; }

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
