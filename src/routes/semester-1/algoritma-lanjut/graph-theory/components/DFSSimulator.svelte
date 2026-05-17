<script lang="ts">
    import GraphVisualizer from './GraphVisualizer.svelte';
    import GraphLegend from './GraphLegend.svelte';

    const nodes = [
        { id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' },
        { id: 'E' }, { id: 'F' }, { id: 'G' }
    ];

    const edges = [
        { source: 'A', target: 'B' }, { source: 'A', target: 'C' },
        { source: 'B', target: 'D' }, { source: 'B', target: 'E' },
        { source: 'C', target: 'F' }, { source: 'C', target: 'G' },
        { source: 'D', target: 'A' }
    ];

    let stack = $state(['A']);
    let visited = $state(new Set(['A']));
    let activeNode = $state<string | null>(null);
    let stepDescription = $state("Klik 'Mulai' atau 'Next Step' untuk melihat simulasi DFS.");
    let isRunning = $state(false);

    function reset() {
        stack = ['A'];
        visited = new Set(['A']);
        activeNode = null;
        stepDescription = "Klik 'Mulai' atau 'Next Step' untuk melihat simulasi DFS.";
        isRunning = false;
    }

    function nextStep() {
        if (stack.length === 0) {
            activeNode = null;
            stepDescription = "Selesai! Semua node telah dikunjungi.";
            return;
        }

        isRunning = true;
        const u = stack.pop()!;
        activeNode = u;
        
        const neighbors = edges
            .filter(e => e.source === u)
            .map(e => e.target)
            .reverse(); // Reverse to process in a more intuitive order for stack

        let addedNodes: string[] = [];
        neighbors.forEach(v => {
            if (!visited.has(v)) {
                visited.add(v);
                stack.push(v);
                addedNodes.push(v);
            }
        });

        if (addedNodes.length > 0) {
            stepDescription = `Mengunjungi node ${u}. Menuju cabang baru: ${addedNodes.join(', ')}. Masukkan ke stack.`;
        } else {
            stepDescription = `Mengunjungi node ${u}. Buntu, kembali ke node sebelumnya (backtrack).`;
        }
    }
</script>

<div class="simulator-container">
    <div class="controls">
        <button class="btn primary" onclick={nextStep} disabled={stack.length === 0 && activeNode !== null}>
            {isRunning ? 'Next Step' : 'Mulai DFS (dari A)'}
        </button>
        <button class="btn secondary" onclick={reset}>Reset</button>
    </div>

    <div class="status-panel">
        <div class="status-item">
            <strong>Tumpukan (Stack):</strong>
            <div class="list">
                {#each stack as item}
                    <span class="badge stack">{item}</span>
                {/each}
            </div>
        </div>
        <div class="status-item">
            <strong>Sudah Dikunjungi:</strong>
            <div class="list">
                {#each Array.from(visited) as item}
                    <span class="badge visited">{item}</span>
                {/each}
            </div>
        </div>
    </div>

    <p class="description">{stepDescription}</p>

    <GraphVisualizer 
        {nodes} 
        {edges} 
        directed={true} 
        highlightedNodes={visited}
        {activeNode}
    />

    <GraphLegend items={[
        { color: '#fff', label: 'Belum Dikunjungi' },
        { color: '#ffcc00', label: 'Dalam Tumpukan (Stack)' },
        { color: '#5856d6', label: 'Sudah Dikunjungi' },
        { color: '#ff9500', label: 'Node Aktif' }
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

    .controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .btn {
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        border: none;
        transition: transform 0.1s, opacity 0.2s;
    }

    .btn:active { transform: scale(0.95); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .primary { background: var(--secondary-color, #5856d6); color: white; }
    .secondary { background: var(--bg-secondary, #f0f0f5); color: var(--text-color, #333); }

    .status-panel {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .status-item {
        background: var(--bg-secondary, #f9f9fb);
        padding: 0.8rem;
        border-radius: 10px;
    }

    .list {
        display: flex;
        flex-wrap: wrap-reverse;
        gap: 0.4rem;
        margin-top: 0.4rem;
    }

    .badge {
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: bold;
    }

    .stack { background: #ffcc00; color: #000; }
    .visited { background: var(--secondary-color, #5856d6); color: white; }

    .description {
        margin: 1rem 0;
        font-style: italic;
        color: var(--text-secondary, #666);
        min-height: 2.5em;
    }
</style>
