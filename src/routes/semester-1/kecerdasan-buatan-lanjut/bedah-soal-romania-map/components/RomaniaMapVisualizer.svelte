<script lang="ts">
    import { onDestroy } from "svelte";

    type CityId = string;
    type Algo = "BFS" | "DFS" | "UCS" | "Greedy" | "AStar" | "IDS" | "BiDirectional" | "IDAStar" | "HillClimbing";

    // ===== ROMANIA MAP DATA =====
    const cities: Record<CityId, { x: number; y: number; label: string }> = {
        Oradea:   { x: 131, y: 69,  label: "Oradea" },
        Zerind:   { x: 75,  y: 121, label: "Zerind" },
        Arad:     { x: 91,  y: 218, label: "Arad" },
        Timisoara:{ x: 94,  y: 326, label: "Timisoara" },
        Lugoj:    { x: 175, y: 369, label: "Lugoj" },
        Mehadia:  { x: 178, y: 428, label: "Mehadia" },
        Dobreta:  { x: 163, y: 487, label: "Dobreta" },
        Craiova:  { x: 263, y: 515, label: "Craiova" },
        RimnicuVilcea: { x: 293, y: 360, label: "R. Vilcea" },
        Sibiu:    { x: 253, y: 260, label: "Sibiu" },
        Fagaras:  { x: 378, y: 248, label: "Fagaras" },
        Pitesti:  { x: 390, y: 400, label: "Pitesti" },
        Bucharest:{ x: 490, y: 470, label: "Bucharest" },
        Giurgiu:  { x: 445, y: 555, label: "Giurgiu" },
        Urziceni: { x: 575, y: 450, label: "Urziceni" },
        Hirsova:  { x: 655, y: 420, label: "Hirsova" },
        Eforie:   { x: 675, y: 487, label: "Eforie" },
        Vaslui:   { x: 585, y: 300, label: "Vaslui" },
        Iasi:     { x: 540, y: 225, label: "Iasi" },
        Neamt:    { x: 485, y: 168, label: "Neamt" },
    };

    const cityList = Object.keys(cities) as CityId[];

    const edges: [CityId, CityId, number][] = [
        ["Oradea", "Zerind", 71], ["Oradea", "Sibiu", 151], ["Zerind", "Arad", 75], ["Arad", "Sibiu", 140],
        ["Arad", "Timisoara", 118], ["Timisoara", "Lugoj", 111], ["Lugoj", "Mehadia", 70], ["Mehadia", "Dobreta", 75],
        ["Dobreta", "Craiova", 120], ["Craiova", "RimnicuVilcea", 146], ["Craiova", "Pitesti", 138],
        ["RimnicuVilcea", "Sibiu", 80], ["RimnicuVilcea", "Pitesti", 97], ["Sibiu", "Fagaras", 99],
        ["Fagaras", "Bucharest", 211], ["Pitesti", "Bucharest", 101], ["Bucharest", "Giurgiu", 90],
        ["Bucharest", "Urziceni", 85], ["Urziceni", "Hirsova", 98], ["Hirsova", "Eforie", 86],
        ["Urziceni", "Vaslui", 142], ["Vaslui", "Iasi", 92], ["Iasi", "Neamt", 87],
    ];

    const adj: Record<CityId, { to: CityId; cost: number }[]> = {};
    for (const id of Object.keys(cities)) adj[id] = [];
    for (const [a, b, cost] of edges) {
        adj[a].push({ to: b, cost });
        adj[b].push({ to: a, cost });
    }

    function h(a: CityId, b: CityId): number {
        const ca = cities[a], cb = cities[b];
        return Math.round(Math.sqrt((ca.x - cb.x) ** 2 + (ca.y - cb.y) ** 2));
    }

    let startCity = $state<CityId>("Arad");
    let goalCity = $state<CityId>("Bucharest");
    let selectedAlgo = $state<Algo>("AStar");

    type Snapshot = {
        current: CityId | null;
        secondaryCurrent?: CityId | null;
        frontier: string[];
        visited: CityId[];
        expandedEdges: [CityId, CityId][];
        solutionPath: CityId[];
        solutionCost: number;
        action: string;
        done: boolean;
        nodesExpanded: number;
        currentLimit?: number | string;
        nodeInfo: Record<CityId, { g: number; h: number; f: number }>;
    };

    function simulate(algo: Algo, start: CityId, goal: CityId): Snapshot[] {
        const snaps: Snapshot[] = [];
        let expanded = 0;
        let nodeInfo: Record<CityId, { g: number; h: number; f: number }> = {};

        const getPath = (p: Record<CityId, CityId | null>, g: CityId) => {
            const res: CityId[] = [];
            let c: CityId | null = g;
            while (c !== null) { res.unshift(c); c = p[c]; }
            return res;
        };

        const getCost = (p: CityId[]) => {
            let c = 0;
            for (let i = 0; i < p.length - 1; i++) {
                const e = edges.find(x => (x[0] === p[i] && x[1] === p[i+1]) || (x[1] === p[i] && x[0] === p[i+1]));
                if (e) c += e[2];
            }
            return c;
        };

        if (algo === "BFS" || algo === "DFS") {
            const queue: CityId[] = [start];
            const visited = new Set<CityId>();
            const parents: Record<CityId, CityId | null> = { [start]: null };
            while (queue.length > 0) {
                const cur = algo === "BFS" ? queue.shift()! : queue.pop()!;
                if (visited.has(cur)) continue;
                visited.add(cur); expanded++;
                if (cur === goal) {
                    const p = getPath(parents, goal);
                    snaps.push({ current: cur, frontier: [...queue], visited: [...visited], expandedEdges: [], solutionPath: p, solutionCost: getCost(p), action: "🎯 Goal ditemukan!", done: true, nodesExpanded: expanded, nodeInfo: {} });
                    break;
                }
                const newE: [CityId, CityId][] = [];
                for (const { to } of [...adj[cur]].sort((a,b)=>a.to.localeCompare(b.to))) {
                    if (!visited.has(to) && !queue.includes(to)) { queue.push(to); parents[to] = cur; newE.push([cur, to]); }
                }
                snaps.push({ current: cur, frontier: [...queue], visited: [...visited], expandedEdges: newE, solutionPath: [], solutionCost: 0, action: `Expand ${cur}`, done: false, nodesExpanded: expanded, nodeInfo: {} });
            }
        } else if (algo === "UCS" || algo === "Greedy" || algo === "AStar") {
            type Item = { node: CityId; g: number; f: number };
            const pq: Item[] = [{ node: start, g: 0, f: algo === "UCS" ? 0 : h(start, goal) }];
            const gMap: Record<CityId, number> = { [start]: 0 };
            const visited = new Set<CityId>();
            const parents: Record<CityId, CityId | null> = { [start]: null };
            while (pq.length > 0) {
                pq.sort((a,b) => a.f - b.f || a.node.localeCompare(b.node));
                const cur = pq.shift()!;
                if (visited.has(cur.node)) continue;
                visited.add(cur.node); expanded++;
                if (cur.node === goal) {
                    const p = getPath(parents, goal);
                    snaps.push({ current: cur.node, frontier: pq.map(i => i.node), visited: [...visited], expandedEdges: [], solutionPath: p, solutionCost: getCost(p), action: "🎯 Goal ditemukan!", done: true, nodesExpanded: expanded, nodeInfo: { ...nodeInfo } });
                    break;
                }
                const newE: [CityId, CityId][] = [];
                for (const { to, cost } of adj[cur.node]) {
                    const newG = cur.g + cost;
                    const hVal = h(to, goal);
                    const fVal = algo === "UCS" ? newG : (algo === "Greedy" ? hVal : newG + hVal);
                    if (gMap[to] === undefined || newG < gMap[to]) {
                        gMap[to] = newG; parents[to] = cur.node;
                        pq.push({ node: to, g: newG, f: fVal }); newE.push([cur.node, to]);
                        nodeInfo[to] = { g: newG, h: hVal, f: fVal };
                    }
                }
                snaps.push({ current: cur.node, frontier: pq.map(i => i.node), visited: [...visited], expandedEdges: newE, solutionPath: [], solutionCost: 0, action: `Expand ${cur.node}`, done: false, nodesExpanded: expanded, nodeInfo: { ...nodeInfo } });
            }
        } else if (algo === "IDS") {
            for (let depth = 0; depth < 12; depth++) {
                const stack: { node: CityId; d: number }[] = [{ node: start, d: 0 }];
                const pLocal: Record<CityId, CityId | null> = { [start]: null };
                const vLocal = new Set<CityId>();
                snaps.push({ current: null, frontier: [], visited: [], expandedEdges: [], solutionPath: [], solutionCost: 0, action: `--- Iterasi Limit Kedalaman: ${depth} ---`, done: false, nodesExpanded: expanded, currentLimit: depth, nodeInfo: {} });
                let found = false;
                while (stack.length > 0) {
                    const cur = stack.pop()!;
                    if (vLocal.has(cur.node)) continue;
                    vLocal.add(cur.node); expanded++;
                    if (cur.node === goal) {
                        const p = getPath(pLocal, goal);
                        snaps.push({ current: cur.node, frontier: stack.map(s => s.node), visited: [...vLocal], expandedEdges: [], solutionPath: p, solutionCost: getCost(p), action: `🎯 Ketemu!`, done: true, nodesExpanded: expanded, currentLimit: depth, nodeInfo: {} });
                        found = true; break;
                    }
                    if (cur.d < depth) {
                        const newE: [CityId, CityId][] = [];
                        for (const { to } of [...adj[cur.node]].reverse()) {
                            if (!vLocal.has(to)) { stack.push({ node: to, d: cur.d + 1 }); pLocal[to] = cur.node; newE.push([cur.node, to]); }
                        }
                        snaps.push({ current: cur.node, frontier: stack.map(s => s.node), visited: [...vLocal], expandedEdges: newE, solutionPath: [], solutionCost: 0, action: `Buka ${cur.node}`, done: false, nodesExpanded: expanded, currentLimit: depth, nodeInfo: {} });
                    }
                }
                if (found) break;
            }
        } else if (algo === "BiDirectional") {
            const fQ = [start], bQ = [goal];
            const fP: Record<CityId, CityId | null> = { [start]: null }, bP: Record<CityId, CityId | null> = { [goal]: null };
            const fV = new Set<CityId>(), bV = new Set<CityId>();
            while (fQ.length > 0 && bQ.length > 0) {
                const fCur = fQ.shift()!; fV.add(fCur); expanded++;
                if (bV.has(fCur)) {
                    const p = [...getPath(fP, fCur), ...getPath(bP, fCur).reverse().slice(1)];
                    snaps.push({ current: fCur, secondaryCurrent: fCur, frontier: [...fQ, ...bQ], visited: [...fV, ...bV], expandedEdges: [], solutionPath: p, solutionCost: getCost(p), action: `🤝 Bertemu di ${fCur}!`, done: true, nodesExpanded: expanded, nodeInfo: {} });
                    break;
                }
                const newEf: [CityId, CityId][] = [];
                for (const { to } of adj[fCur]) if (!fV.has(to) && !fQ.includes(to)) { fQ.push(to); fP[to] = fCur; newEf.push([fCur, to]); }
                snaps.push({ current: fCur, frontier: [...fQ, ...bQ], visited: [...fV, ...bV], expandedEdges: newEf, solutionPath: [], solutionCost: 0, action: `Maju dari ${fCur}`, done: false, nodesExpanded: expanded, nodeInfo: {} });
                
                const bCur = bQ.shift()!; bV.add(bCur); expanded++;
                if (fV.has(bCur)) {
                    const p = [...getPath(fP, bCur), ...getPath(bP, bCur).reverse().slice(1)];
                    snaps.push({ current: bCur, secondaryCurrent: bCur, frontier: [...fQ, ...bQ], visited: [...fV, ...bV], expandedEdges: [], solutionPath: p, solutionCost: getCost(p), action: `🤝 Bertemu di ${bCur}!`, done: true, nodesExpanded: expanded, nodeInfo: {} });
                    break;
                }
                const newEb: [CityId, CityId][] = [];
                for (const { to } of adj[bCur]) if (!bV.has(to) && !bQ.includes(to)) { bQ.push(to); bP[to] = bCur; newEb.push([bCur, to]); }
                snaps.push({ current: bCur, secondaryCurrent: bCur, frontier: [...fQ, ...bQ], visited: [...fV, ...bV], expandedEdges: newEb, solutionPath: [], solutionCost: 0, action: `Mundur dari ${bCur}`, done: false, nodesExpanded: expanded, nodeInfo: {} });
            }
        } else if (algo === "IDAStar") {
            let threshold = h(start, goal);
            while (threshold < 1000) {
                let minAbove = Infinity;
                const stack: { node: CityId; g: number; f: number; path: CityId[] }[] = [{ node: start, g: 0, f: h(start, goal), path: [start] }];
                snaps.push({ current: null, frontier: [], visited: [], expandedEdges: [], solutionPath: [], solutionCost: 0, action: `--- Threshold F-Cost: ${threshold} ---`, done: false, nodesExpanded: expanded, currentLimit: `F=${threshold}`, nodeInfo: {} });
                
                let found = false;
                while (stack.length > 0) {
                    const cur = stack.pop()!;
                    expanded++;
                    nodeInfo[cur.node] = { g: cur.g, h: h(cur.node, goal), f: cur.f };
                    
                    if (cur.f > threshold) {
                        minAbove = Math.min(minAbove, cur.f);
                        snaps.push({ current: cur.node, frontier: stack.map(s => s.node), visited: cur.path, expandedEdges: [], solutionPath: [], solutionCost: 0, action: `Pruning: F(${cur.f}) > ${threshold}`, done: false, nodesExpanded: expanded, currentLimit: `F=${threshold}`, nodeInfo: { ...nodeInfo } });
                        continue;
                    }
                    if (cur.node === goal) {
                        snaps.push({ current: cur.node, frontier: stack.map(s => s.node), visited: cur.path, expandedEdges: [], solutionPath: cur.path, solutionCost: getCost(cur.path), action: `🎯 Ketemu!`, done: true, nodesExpanded: expanded, currentLimit: `F=${threshold}`, nodeInfo: { ...nodeInfo } });
                        found = true; break;
                    }
                    const newE: [CityId, CityId][] = [];
                    for (const { to, cost } of adj[cur.node]) {
                        if (!cur.path.includes(to)) {
                            const ng = cur.g + cost;
                            const nf = ng + h(to, goal);
                            stack.push({ node: to, g: ng, f: nf, path: [...cur.path, to] });
                            newE.push([cur.node, to]);
                        }
                    }
                    snaps.push({ current: cur.node, frontier: stack.map(s => s.node), visited: cur.path, expandedEdges: newE, solutionPath: [], solutionCost: 0, action: `Expand ${cur.node}`, done: false, nodesExpanded: expanded, currentLimit: `F=${threshold}`, nodeInfo: { ...nodeInfo } });
                }
                if (found) break;
                if (minAbove === Infinity) break;
                threshold = minAbove;
            }
        } else if (algo === "HillClimbing") {
            let cur = start; const visited = new Set<CityId>([start]); const parents: Record<CityId, CityId | null> = { [start]: null };
            while (cur !== goal) {
                expanded++;
                const neighbors = adj[cur].sort((a,b) => h(a.to, goal) - h(b.to, goal));
                const best = neighbors[0];
                if (h(best.to, goal) >= h(cur, goal)) { snaps.push({ current: cur, frontier: [], visited: [...visited], expandedEdges: [], solutionPath: [], solutionCost: 0, action: `❌ Local Optima!`, done: true, nodesExpanded: expanded, nodeInfo: {} }); break; }
                parents[best.to] = cur;
                snaps.push({ current: cur, frontier: [best.to], visited: [...visited], expandedEdges: [[cur, best.to]], solutionPath: [], solutionCost: 0, action: `Pindah ke ${best.to}`, done: false, nodesExpanded: expanded, nodeInfo: {} });
                cur = best.to; visited.add(cur);
                if (cur === goal) {
                    const p = getPath(parents, goal);
                    snaps.push({ current: cur, frontier: [], visited: [...visited], expandedEdges: [], solutionPath: p, solutionCost: getCost(p), action: "🎯 Goal ditemukan!", done: true, nodesExpanded: expanded, nodeInfo: {} });
                }
            }
        }
        return snaps;
    }

    let snapshots = $state<Snapshot[]>(simulate(selectedAlgo, startCity, goalCity));
    let step = $state(0);
    let isPlaying = $state(false);
    let playbackSpeed = $state(600);
    let timer: any = null;
    const maxStep = $derived(snapshots.length - 1);
    const snap = $derived(snapshots[Math.min(step, maxStep)]);
    const progressPct = $derived(maxStep > 0 ? (step / maxStep) * 100 : 0);

    const visitedEdgeSet = $derived((() => {
        const s = new Set<string>();
        for (let i = 0; i <= step; i++) for (const [a, b] of snapshots[i].expandedEdges) { s.add(`${a}|${b}`); s.add(`${b}|${a}`); }
        return s;
    })());
    const solutionEdgeSet = $derived((() => {
        const s = new Set<string>();
        for (let i = 0; i < snap.solutionPath.length - 1; i++) {
            const a = snap.solutionPath[i], b = snap.solutionPath[i+1];
            s.add(`${a}|${b}`); s.add(`${b}|${a}`);
        }
        return s;
    })());

    function restart() { stop(); snapshots = simulate(selectedAlgo, startCity, goalCity); step = 0; }
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

    const algoNames: Record<Algo, string> = {
        BFS: "BFS", DFS: "DFS", UCS: "UCS", Greedy: "Greedy", AStar: "A*", IDS: "Iterative Deepening", BiDirectional: "Bi-Directional", IDAStar: "IDA*", HillClimbing: "Hill Climbing"
    };

    const algoDescriptions: Record<Algo, string> = {
        BFS: "Mencari lapis demi lapis berdasarkan jumlah langkah (tier).",
        DFS: "Mengeksplorasi satu jalur sedalam mungkin sebelum mundur.",
        UCS: "Memilih jalur dengan akumulasi biaya (g) terendah.",
        Greedy: "Hanya melihat estimasi sisa jarak (h) ke tujuan.",
        AStar: "Cerdas: Mempertimbangkan biaya jalan (g) + sisa jarak (h).",
        IDS: "DFS berulang dengan batas kedalaman bertambah.",
        BiDirectional: "Mencari dari dua arah (Start & Goal) sampai bertemu.",
        IDAStar: "A* hemat memori: DFS dengan batas F-cost bertambah.",
        HillClimbing: "Selalu pilih tetangga terdekat, risiko terjebak buntu."
    };
</script>

<div class="romania-card">
    <div class="config-bar">
        <div class="config-group">
            <label>Start: <select bind:value={startCity} onchange={restart}>{#each cityList as c}<option value={c}>{cities[c].label}</option>{/each}</select></label>
            <label>Goal: <select bind:value={goalCity} onchange={restart}>{#each cityList as c}<option value={c}>{cities[c].label}</option>{/each}</select></label>
            <label>Algo: <select bind:value={selectedAlgo} onchange={restart}>{#each (Object.keys(algoNames) as Algo[]) as a}<option value={a}>{algoNames[a]}</option>{/each}</select></label>
        </div>
        <p class="algo-desc">ℹ️ {algoDescriptions[selectedAlgo]}</p>
    </div>

    <div class="progress-container"><div class="progress-bar" style="width: {progressPct}%"></div></div>

    <div class="top-controls">
        <div class="algo-label">
            <span class="algo-badge">{algoNames[selectedAlgo]}</span>
            <span class="metric-badge">Expanded: {snap.nodesExpanded}</span>
            {#if snap.solutionCost > 0}<span class="cost-badge">Cost: {snap.solutionCost}</span>{/if}
            {#if snap.currentLimit !== undefined}<span class="limit-badge">{snap.currentLimit}</span>{/if}
        </div>
        <div class="playback-controls">
            <button class="action-btn" onclick={prev} disabled={step === 0}>&lt;</button>
            <button class="action-btn play-btn" onclick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <button class="action-btn" onclick={next} disabled={step >= maxStep}>&gt;</button>
            <button class="action-btn" onclick={reset}>Reset</button>
        </div>
    </div>

    <div class="visualizer-grid">
        <div class="side-panel">
            <div class="status-panel">
                <p><strong>Langkah:</strong> {step}/{maxStep}</p>
                <p class="action-text">{snap.action}</p>
            </div>
            {#if selectedAlgo.includes('AStar') || selectedAlgo === "Greedy" || selectedAlgo === "UCS"}
                <div class="heuristic-panel">
                    <p><strong>Estimasi (h) ke {goalCity}:</strong></p>
                    <div class="h-list">
                        {#each cityList as c}<div class="h-row" class:is-goal={c === goalCity}><span>{cities[c].label}</span><strong>{h(c, goalCity)}</strong></div>{/each}
                    </div>
                </div>
            {/if}
            <div class="frontier-panel">
                <p><strong>Frontier:</strong></p>
                <div class="frontier-list">{#each snap.frontier as c, i}<span class="frontier-item" class:is-head={i === 0}>{cities[c]?.label || c}</span>{/each}</div>
            </div>
        </div>

        <div class="main-canvas">
            <svg viewBox="0 0 760 620" class="map-svg">
                {#each edges as [a, b, cost]}
                    {@const ca = cities[a]} {@const cb = cities[b]}
                    <line x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y} class="road {solutionEdgeSet.has(`${a}|${b}`) ? 'edge-solution' : (visitedEdgeSet.has(`${a}|${b}`) ? 'edge-visited' : '')}" />
                    <g transform="translate({(ca.x+cb.x)/2},{(ca.y+cb.y)/2})"><rect x="-12" y="-8" width="24" height="16" rx="3" fill="white" stroke="#eee" opacity="0.8"></rect><text dy=".35em" font-size="8" text-anchor="middle" font-weight="bold">{cost}</text></g>
                {/each}
                {#each Object.entries(cities) as [id, c]}
                    {@const info = snap.nodeInfo[id]}
                    <g transform="translate({c.x},{c.y})" class="city-node" class:visited={snap.visited.includes(id)} class:current={snap.current === id || snap.secondaryCurrent === id} class:start={id === startCity} class:goal={id === goalCity} class:on-path={snap.solutionPath.includes(id)}>
                        <circle r="12"></circle><text class="city-label" dy="-18">{c.label}</text>
                        {#if info && (selectedAlgo.includes('AStar') || selectedAlgo === "Greedy" || selectedAlgo === "UCS")}
                            <g transform="translate(0, 22)"><rect x="-25" y="-7" width="50" height="14" rx="4" fill="var(--color-surface-elevated)" stroke="var(--color-line)"></rect><text class="info-text" text-anchor="middle" dy=".3em">{#if selectedAlgo.includes('AStar')}{info.g}+{info.h}={info.f}{:else if selectedAlgo === "Greedy"}h={info.h}{:else}g={info.g}{/if}</text></g>
                        {/if}
                    </g>
                {/each}
            </svg>
        </div>
    </div>
</div>

<style>
    .romania-card { background: var(--color-surface-elevated); border: 1px solid var(--color-line); border-radius: 16px; margin: 1.5rem 0; box-shadow: var(--shadow-lg); overflow: hidden; }
    .config-bar { padding: 0.75rem; background: var(--color-surface-soft); border-bottom: 1px solid var(--color-line); }
    .config-group { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.4rem; }
    .config-group select { padding: 0.3rem; border-radius: 6px; border: 1px solid var(--color-line); background: var(--color-surface-elevated); }
    .algo-desc { font-size: 0.75rem; color: var(--color-ink-soft); margin: 0; }
    .progress-container { height: 4px; background: var(--color-surface-soft); }
    .progress-bar { height: 100%; background: var(--color-binder); transition: width 0.3s; }
    .top-controls { display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid var(--color-line); align-items: center; }
    .algo-badge { background: var(--color-binder); color: white; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: bold; font-size: 0.8rem; }
    .metric-badge, .cost-badge, .limit-badge { font-size: 0.7rem; padding: 0.2rem 0.4rem; background: var(--color-surface-soft); border-radius: 4px; border: 1px solid var(--color-line); margin-left: 0.4rem; font-weight: 700; }
    .limit-badge { background: var(--color-status-info-soft); color: var(--color-status-info-text); border-color: var(--color-status-info-border); }
    .action-btn { padding: 0.3rem 0.6rem; cursor: pointer; border: 1px solid var(--color-line); background: white; border-radius: 4px; font-weight: 600; font-size: 0.8rem; }
    .play-btn { background: var(--color-binder); color: white; border: none; min-width: 70px; }
    .visualizer-grid { display: grid; grid-template-columns: 240px 1fr; min-height: 520px; }
    .side-panel { background: var(--color-surface-soft); padding: 0.75rem; border-right: 1px solid var(--color-line); display: flex; flex-direction: column; gap: 0.75rem; }
    .status-panel, .heuristic-panel { background: white; padding: 0.6rem; border-radius: 8px; border: 1px solid var(--color-line); }
    .heuristic-panel { flex-grow: 1; overflow: hidden; display: flex; flex-direction: column; font-size: 0.7rem; }
    .h-list { overflow-y: auto; margin-top: 0.3rem; }
    .h-row { display: flex; justify-content: space-between; padding: 0.1rem 0; border-bottom: 1px solid #f9f9f9; }
    .h-row.is-goal { color: #ff4444; font-weight: bold; }
    .frontier-list { display: flex; flex-direction: column; gap: 0.2rem; max-height: 100px; overflow-y: auto; margin-top: 0.3rem; }
    .frontier-item { padding: 0.2rem; background: white; border: 1px solid var(--color-line); border-radius: 3px; font-size: 0.7rem; }
    .frontier-item.is-head { background: var(--color-highlight); border-color: var(--color-callout-warning-border); }
    .main-canvas { padding: 0.75rem; }
    .map-svg { width: 100%; height: auto; max-height: 550px; }
    .road { stroke: #ddd; stroke-width: 2; transition: 0.3s; }
    .road.edge-visited { stroke: #999; stroke-width: 3; }
    .road.edge-solution { stroke: var(--color-callout-warning-border); stroke-width: 5; }
    .city-node circle { fill: white; stroke: #ccc; stroke-width: 2; transition: 0.3s; }
    .city-node .city-label { font-size: 8px; font-weight: bold; text-anchor: middle; fill: #444; }
    .city-node .info-text { font-size: 7.5px; font-weight: bold; fill: var(--color-binder); font-family: monospace; }
    .city-node.visited circle { fill: var(--color-status-success-soft); stroke: var(--color-status-success-border); }
    .city-node.current circle { fill: var(--color-highlight); stroke: var(--color-callout-warning-border); stroke-width: 3; }
    .city-node.start circle { fill: #22d3ee; stroke: #06b6d4; }
    .city-node.goal circle { stroke: #ff4444; stroke-dasharray: 4 2; }
    .city-node.on-path circle { stroke: var(--color-callout-warning-border); stroke-width: 3; fill: var(--color-highlight); }
</style>
