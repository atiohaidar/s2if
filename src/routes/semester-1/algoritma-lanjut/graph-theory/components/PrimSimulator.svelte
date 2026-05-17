<script lang="ts">
    import GraphVisualizer from './GraphVisualizer.svelte';
    import GraphLegend from './GraphLegend.svelte';

    const nodes = [
        { id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }
    ];

    const edges = [
        { source: 'A', target: 'B', weight: 4 },
        { source: 'A', target: 'C', weight: 2 },
        { source: 'B', target: 'C', weight: 1 },
        { source: 'B', target: 'D', weight: 5 },
        { source: 'C', target: 'D', weight: 8 },
        { source: 'C', target: 'E', weight: 10 },
        { source: 'D', target: 'E', weight: 2 }
    ];

    let mstEdges = $state(new Set<string>());
    let visited = $state(new Set<string>(['A']));
    let activeNode = $state<string | null>(null);
    let totalWeight = $state(0);
    let stepDescription = $state("Klik 'Next Step' untuk melihat proses Prim membangun Minimum Spanning Tree (MST).");

    function reset() {
        mstEdges = new Set();
        visited = new Set(['A']);
        activeNode = null;
        totalWeight = 0;
        stepDescription = "Klik 'Next Step' untuk melihat proses Prim membangun Minimum Spanning Tree (MST).";
    }

    function nextStep() {
        if (visited.size === nodes.length) {
            activeNode = null;
            stepDescription = `Selesai! MST berhasil dibangun dengan total bobot ${totalWeight}.`;
            return;
        }

        // Find the cheapest edge connecting a visited node to an unvisited node
        let cheapest: {source: string, target: string, weight: number} | null = null;
        let minWeight = Infinity;

        for (const edge of edges) {
            const uVisited = visited.has(edge.source);
            const vVisited = visited.has(edge.target);

            if ((uVisited && !vVisited) || (!uVisited && vVisited)) {
                if (edge.weight < minWeight) {
                    minWeight = edge.weight;
                    cheapest = edge;
                }
            }
        }

        if (cheapest) {
            const nextNode = visited.has(cheapest.source) ? cheapest.target : cheapest.source;
            visited.add(nextNode);
            activeNode = nextNode;
            totalWeight += cheapest.weight;
            mstEdges.add(`${cheapest.source}-${cheapest.target}`);
            stepDescription = `Memilih edge termurah (${cheapest.source} - ${cheapest.target}) dengan bobot ${cheapest.weight}. Menambahkan ${nextNode} ke MST.`;
        }
    }

    // Prepare edges with highlight info
    let displayEdges = $derived(edges.map(e => ({
        ...e,
        highlighted: mstEdges.has(`${e.source}-${e.target}`) || mstEdges.has(`${e.target}-${e.source}`)
    })));
</script>

<div class="simulator-container">
    <div class="controls">
        <button class="btn primary" onclick={nextStep} disabled={visited.size === nodes.length}>
            Next Step
        </button>
        <button class="btn secondary" onclick={reset}>Reset</button>
    </div>

    <div class="stats-panel">
        <div class="stat-item">
            <strong>Total Bobot MST:</strong>
            <span class="weight-value">{totalWeight}</span>
        </div>
        <div class="stat-item">
            <strong>Node Terhubung:</strong>
            <div class="list">
                {#each Array.from(visited) as node}
                    <span class="badge visited">{node}</span>
                {/each}
            </div>
        </div>
    </div>

    <p class="description">{stepDescription}</p>

    <GraphVisualizer 
        {nodes} 
        edges={displayEdges} 
        directed={false} 
        highlightedNodes={visited}
        {activeNode}
    />

    <GraphLegend items={[
        { color: '#fff', label: 'Belum Terhubung' },
        { color: '#4cd964', label: 'Terhubung MST' },
        { color: '#4cd964', label: 'Sisi MST', type: 'edge' },
        { color: '#ff9500', label: 'Node Baru Aktif' }
    ]} />
</div>

<style>
    .simulator-container {
        border: 1px solid var(--border-color, #eee);
        border-radius: 16px;
        padding: 1.5rem;
        background: var(--card-bg, #fff);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .controls { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .btn { padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; }
    .primary { background: #4cd964; color: white; }
    .secondary { background: #f0f0f5; color: #333; }
    .stats-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .stat-item { background: #f9f9fb; padding: 0.8rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; }
    .weight-value { font-size: 1.5rem; font-weight: bold; color: #4cd964; }
    .list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .badge { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
    .visited { background: #4cd964; color: white; }
    .description { margin: 1rem 0; font-style: italic; color: #666; min-height: 2.5em; }
</style>
