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

    let distances = $state({ A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity });
    let parents = $state({});
    let queue = $state([{ id: 'A', dist: 0 }]);
    let processed = $state(new Set());
    let activeNode = $state(null);
    let stepDescription = $state("Klik 'Next Step' untuk melihat proses Dijkstra mencari jalur terpendek dari A.");

    function reset() {
        distances = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity };
        parents = {};
        queue = [{ id: 'A', dist: 0 }];
        processed = new Set();
        activeNode = null;
        stepDescription = "Klik 'Next Step' untuk melihat proses Dijkstra mencari jalur terpendek dari A.";
    }

    function nextStep() {
        if (queue.length === 0) {
            activeNode = null;
            stepDescription = "Selesai! Semua jalur terpendek dari A telah ditemukan.";
            return;
        }

        // Sort queue by distance (Priority Queue behavior)
        queue.sort((a, b) => a.dist - b.dist);
        const u = queue.shift();
        
        if (processed.has(u.id)) {
            nextStep();
            return;
        }

        activeNode = u.id;
        processed.add(u.id);

        const neighbors = edges.filter(e => e.source === u.id);
        let updates = [];

        neighbors.forEach(edge => {
            const v = edge.target;
            const newDist = distances[u.id] + edge.weight;
            if (newDist < distances[v]) {
                distances[v] = newDist;
                parents[v] = u.id;
                queue.push({ id: v, dist: newDist });
                updates.push(v);
            }
        });

        if (updates.length > 0) {
            stepDescription = `Memproses Node ${u.id}. Berhasil relaksasi ke: ${updates.join(', ')}.`;
        } else {
            stepDescription = `Memproses Node ${u.id}. Tidak ada jalur yang lebih pendek ditemukan dari sini.`;
        }
    }
</script>

<div class="simulator-container">
    <div class="controls">
        <button class="btn primary" onclick={nextStep} disabled={queue.length === 0 && activeNode !== null}>
            Next Step
        </button>
        <button class="btn secondary" onclick={reset}>Reset</button>
    </div>

    <div class="stats-grid">
        <div class="stat-item">
            <strong>Priority Queue:</strong>
            <div class="list">
                {#each [...queue].sort((a,b)=>a.dist-b.dist) as item}
                    <span class="badge queue">{item.id}({item.dist === Infinity ? '∞' : item.dist})</span>
                {/each}
            </div>
        </div>
        <div class="stat-item">
            <strong>Jarak Terpendek (d):</strong>
            <div class="dist-list">
                {#each nodes as node}
                    <div class="dist-row">
                        <span>Node {node.id}:</span>
                        <span class="bold">{distances[node.id] === Infinity ? '∞' : distances[node.id]}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <p class="description">{stepDescription}</p>

    <GraphVisualizer 
        {nodes} 
        {edges} 
        directed={true} 
        highlightedNodes={processed}
        {activeNode}
        nodeLabels={distances}
    />

    <GraphLegend items={[
        { color: '#fff', label: 'Belum Terjangkau' },
        { color: '#ff9500', label: 'Node Aktif' },
        { color: '#007aff', label: 'Sudah Permanen' },
        { color: '#007aff', label: 'Jarak Terpendek', type: 'node' }
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
    .primary { background: #007aff; color: white; }
    .secondary { background: #f0f0f5; color: #333; }
    .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .stat-item { background: #f9f9fb; padding: 0.8rem; border-radius: 10px; }
    .list { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; }
    .badge { padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
    .queue { background: #ff9500; color: white; }
    .dist-list { margin-top: 0.5rem; font-size: 0.9rem; }
    .dist-row { display: flex; justify-content: space-between; padding: 2px 0; }
    .bold { font-weight: bold; color: #007aff; }
    .description { margin: 1rem 0; font-style: italic; color: #666; min-height: 2.5em; }
</style>
