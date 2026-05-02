<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    // Original array: [1, 3, 5, 7, 9, 11] (padded to 8 elements for perfect binary tree visually: [1, 3, 5, 7, 9, 11, 0, 0])
    // But let's use 4 elements to make it simple and fit nicely: [2, 5, 1, 4]
    
    type TreeNode = {
        id: number;
        range: string;
        val: number;
        x: number;
        y: number;
        left?: number;
        right?: number;
    };

    const arrayData = [2, 5, 1, 4];
    
    const treeNodes: TreeNode[] = [
        { id: 1, range: "[0..3]", val: 12, x: 150, y: 30, left: 2, right: 3 },
        { id: 2, range: "[0..1]", val: 7, x: 70, y: 90, left: 4, right: 5 },
        { id: 3, range: "[2..3]", val: 5, x: 230, y: 90, left: 6, right: 7 },
        { id: 4, range: "[0..0]", val: 2, x: 30, y: 150 },
        { id: 5, range: "[1..1]", val: 5, x: 110, y: 150 },
        { id: 6, range: "[2..2]", val: 1, x: 190, y: 150 },
        { id: 7, range: "[3..3]", val: 4, x: 270, y: 150 }
    ];

    const edges = [
        { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 2, to: 4 }, { from: 2, to: 5 },
        { from: 3, to: 6 }, { from: 3, to: 7 }
    ];

    let highlightedNodes: number[] = [];
    let activePath: number[] = [];
    let message = "Pilih operasi di bawah untuk melihat animasi pada Segment Tree.";
    let isAnimating = false;

    async function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function queryRange() {
        if (isAnimating) return;
        isAnimating = true;
        highlightedNodes = [];
        activePath = [];
        
        message = "Query Rentang [1..2]. Mulai dari Root [0..3]";
        activePath = [1];
        await sleep(1000);
        
        message = "Rentang [1..2] beririsan parsial dengan [0..3]. Pecah pencarian ke anak Kiri dan Kanan.";
        await sleep(1000);
        
        // Go Left
        message = "Mengecek Kiri: Node [0..1]. Beririsan parsial dengan [1..2].";
        activePath = [1, 2];
        await sleep(1000);
        
        message = "Pecah lagi. Ke [0..0] -> Di luar rentang [1..2], Abaikan (Return 0).";
        activePath = [1, 2, 4];
        await sleep(1000);
        
        message = "Ke [1..1] -> Masuk SEPENUHNYA di dalam [1..2]. Ambil nilainya (5)!";
        activePath = [1, 2, 5];
        highlightedNodes = [5];
        await sleep(1200);
        
        // Go Right
        message = "Kembali ke atas. Sekarang mengecek Kanan: Node [2..3]. Beririsan parsial dengan [1..2].";
        activePath = [1, 3];
        await sleep(1000);
        
        message = "Pecah lagi. Ke [2..2] -> Masuk SEPENUHNYA di dalam [1..2]. Ambil nilainya (1)!";
        activePath = [1, 3, 6];
        highlightedNodes = [5, 6];
        await sleep(1200);
        
        message = "Ke [3..3] -> Di luar rentang [1..2], Abaikan (Return 0).";
        activePath = [1, 3, 6, 7];
        await sleep(1000);
        
        message = "Selesai! Hasil akhir: 5 + 1 = 6. Hanya mengunjungi 5 node dari 7 node yang ada.";
        activePath = [];
        isAnimating = false;
    }

    function reset() {
        if (isAnimating) return;
        highlightedNodes = [];
        activePath = [];
        message = "Pilih operasi di bawah untuk melihat animasi pada Segment Tree.";
    }
</script>

<div class="demo-container">
    <div class="info-panel">
        <p>{message}</p>
    </div>

    <div class="visual-area">
        <svg viewBox="0 0 300 180" class="tree-svg">
            <!-- Edges -->
            {#each edges as edge}
                {@const fromNode = treeNodes.find(n => n.id === edge.from)}
                {@const toNode = treeNodes.find(n => n.id === edge.to)}
                <line 
                    x1={fromNode?.x} 
                    y1={fromNode?.y} 
                    x2={toNode?.x} 
                    y2={toNode?.y} 
                    class="edge"
                    class:active-edge={activePath.includes(edge.from) && activePath.includes(edge.to)}
                />
            {/each}
            
            <!-- Nodes -->
            {#each treeNodes as node}
                <g class="node-group" 
                   class:highlighted={highlightedNodes.includes(node.id)}
                   class:active={activePath.includes(node.id)}>
                    <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r="18" 
                        class="node-circle"
                    />
                    <text x={node.x} y={node.y - 2} class="node-val">{node.val}</text>
                    <text x={node.x} y={node.y + 10} class="node-range">{node.range}</text>
                </g>
            {/each}
        </svg>
    </div>

    <div class="array-container">
        <div class="array-label">Array Asli:</div>
        <div class="array-boxes">
            {#each arrayData as val, i}
                <div class="array-item" class:highlighted-arr={highlightedNodes.length > 0 && (i === 1 || i === 2)}>
                    <div class="arr-val">{val}</div>
                    <div class="arr-idx">[{i}]</div>
                </div>
            {/each}
        </div>
    </div>

    <div class="controls">
        <button class="btn-play" on:click={queryRange} disabled={isAnimating}>Simulasi Query Range [1..2]</button>
        <button class="btn-reset" on:click={reset} disabled={isAnimating}>Reset</button>
    </div>
</div>

<style>
    .demo-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: inherit;
    }

    .info-panel {
        background: var(--color-surface);
        border: 1px dashed var(--color-link);
        border-radius: 6px;
        padding: 1rem;
        width: 100%;
        margin-bottom: 1rem;
        text-align: center;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info-panel p {
        margin: 0;
        font-weight: 600;
        color: var(--color-ink);
    }

    .visual-area {
        width: 100%;
        max-width: 400px;
        margin-bottom: 1rem;
    }

    .tree-svg {
        width: 100%;
        height: auto;
        overflow: visible;
    }

    .edge {
        stroke: var(--color-ink-muted);
        stroke-width: 2;
        transition: stroke 0.3s, stroke-width 0.3s;
    }

    .active-edge {
        stroke: var(--color-accent);
        stroke-width: 3.5;
    }

    .node-circle {
        fill: var(--color-surface-elevated);
        stroke: var(--color-link);
        stroke-width: 2.5;
        transition: all 0.3s ease;
    }

    .node-val {
        font-size: 14px;
        font-weight: bold;
        fill: var(--color-ink);
        text-anchor: middle;
    }

    .node-range {
        font-size: 9px;
        fill: var(--color-ink-muted);
        text-anchor: middle;
    }

    .node-group.active .node-circle {
        stroke: var(--color-accent);
        stroke-width: 4;
    }

    .node-group.highlighted .node-circle {
        fill: var(--color-status-success-soft);
        stroke: var(--color-status-success-border);
        stroke-width: 3;
    }

    .array-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem 1rem;
        background: var(--color-surface);
        border-radius: 6px;
        border: 1px solid var(--color-line);
    }

    .array-label {
        font-weight: bold;
        color: var(--color-ink-muted);
    }

    .array-boxes {
        display: flex;
        gap: 4px;
    }

    .array-item {
        border: 2px solid var(--color-line);
        border-radius: 4px;
        text-align: center;
        width: 36px;
        transition: all 0.3s;
    }

    .highlighted-arr {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
    }

    .arr-val {
        padding: 4px 0;
        font-weight: bold;
        color: var(--color-ink);
        border-bottom: 1px solid var(--color-line);
    }

    .arr-idx {
        font-size: 0.75rem;
        color: var(--color-ink-muted);
        padding: 2px 0;
        background: rgba(0,0,0,0.02);
    }

    .controls {
        display: flex;
        gap: 0.5rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        color: white;
        transition: transform 0.1s, opacity 0.2s;
    }
    
    button:active:not(:disabled) { transform: scale(0.95); }
    button:hover:not(:disabled) { opacity: 0.9; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }

    .btn-play { background: var(--color-link); }
    .btn-reset { background: var(--color-ink-muted); }
</style>
