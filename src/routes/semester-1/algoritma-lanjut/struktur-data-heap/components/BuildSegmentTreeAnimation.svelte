<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    type TreeNode = {
        id: number;
        range: string;
        val: number | string;
        x: number;
        y: number;
        left?: number;
        right?: number;
        status: 'hidden' | 'active' | 'completed';
    };

    const arrayData = [2, 5, 1, 4];
    
    let treeNodes: TreeNode[] = [
        { id: 1, range: "[0..3]", val: "?", x: 150, y: 30, left: 2, right: 3, status: 'hidden' },
        { id: 2, range: "[0..1]", val: "?", x: 70, y: 90, left: 4, right: 5, status: 'hidden' },
        { id: 3, range: "[2..3]", val: "?", x: 230, y: 90, left: 6, right: 7, status: 'hidden' },
        { id: 4, range: "[0..0]", val: "?", x: 30, y: 150, status: 'hidden' },
        { id: 5, range: "[1..1]", val: "?", x: 110, y: 150, status: 'hidden' },
        { id: 6, range: "[2..2]", val: "?", x: 190, y: 150, status: 'hidden' },
        { id: 7, range: "[3..3]", val: "?", x: 270, y: 150, status: 'hidden' }
    ];

    const edges = [
        { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 2, to: 4 }, { from: 2, to: 5 },
        { from: 3, to: 6 }, { from: 3, to: 7 }
    ];

    let message = "Klik 'Mulai Bangun Pohon' untuk melihat proses rekursif pembangunan Segment Tree.";
    let isAnimating = false;
    let currentHighlightArr: number | null = null;

    async function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function updateNode(id: number, updates: Partial<TreeNode>) {
        treeNodes = treeNodes.map(n => n.id === id ? { ...n, ...updates } : n);
    }

    async function animateBuild() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset
        treeNodes = treeNodes.map(n => ({ ...n, val: "?", status: 'hidden' }));
        currentHighlightArr = null;

        message = "1. Mulai dari Root (Node 0) mewakili rentang [0..3].";
        updateNode(1, { status: 'active' });
        await sleep(1000);

        message = "2. Belah ke kiri: Node [0..1].";
        updateNode(2, { status: 'active' });
        await sleep(800);

        message = "3. Belah lagi ke kiri: Node [0..0]. Ini adalah DAUN.";
        updateNode(4, { status: 'active' });
        await sleep(800);

        message = "4. Ambil nilai dari array indeks [0] yaitu '2'.";
        currentHighlightArr = 0;
        updateNode(4, { val: 2, status: 'completed' });
        await sleep(1200);

        message = "5. Kembali ke paruh kanan dari [0..1], yaitu [1..1]. Ini juga DAUN.";
        currentHighlightArr = 1;
        updateNode(5, { status: 'active', val: 5 });
        await sleep(800);
        updateNode(5, { status: 'completed' });
        await sleep(800);

        message = "6. Gabungkan hasil anak [0..0] dan [1..1] ke parent [0..1]: 2 + 5 = 7.";
        currentHighlightArr = null;
        updateNode(2, { val: 7, status: 'completed' });
        await sleep(1200);

        message = "7. Sisi kiri selesai. Sekarang ke sisi kanan Root: Node [2..3].";
        updateNode(3, { status: 'active' });
        await sleep(800);

        message = "8. Belah ke [2..2] (Daun). Ambil array indeks [2] yaitu '1'.";
        currentHighlightArr = 2;
        updateNode(6, { status: 'active', val: 1 });
        await sleep(800);
        updateNode(6, { status: 'completed' });
        await sleep(800);

        message = "9. Belah ke [3..3] (Daun). Ambil array indeks [3] yaitu '4'.";
        currentHighlightArr = 3;
        updateNode(7, { status: 'active', val: 4 });
        await sleep(800);
        updateNode(7, { status: 'completed' });
        await sleep(800);

        message = "10. Gabungkan hasil anak [2..2] dan [3..3] ke parent [2..3]: 1 + 4 = 5.";
        currentHighlightArr = null;
        updateNode(3, { val: 5, status: 'completed' });
        await sleep(1200);

        message = "11. Langkah terakhir: Gabungkan hasil [0..1] dan [2..3] ke Root [0..3]: 7 + 5 = 12.";
        updateNode(1, { val: 12, status: 'completed' });
        await sleep(1500);

        message = "Selesai! Pohon Segmen berhasil dibangun secara Bottom-Up melalui rekursi.";
        isAnimating = false;
    }

    function reset() {
        if (isAnimating) return;
        treeNodes = treeNodes.map(n => ({ ...n, val: "?", status: 'hidden' }));
        currentHighlightArr = null;
        message = "Klik 'Mulai Bangun Pohon' untuk melihat proses rekursif pembangunan Segment Tree.";
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
                    class:visible={toNode?.status !== 'hidden'}
                    class:active-edge={fromNode?.status === 'active' && toNode?.status === 'active'}
                />
            {/each}
            
            <!-- Nodes -->
            {#each treeNodes as node}
                <g class="node-group" 
                   class:hidden={node.status === 'hidden'}
                   class:completed={node.status === 'completed'}
                   class:active={node.status === 'active'}>
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
        <div class="array-label">Data Asli:</div>
        <div class="array-boxes">
            {#each arrayData as val, i}
                <div class="array-item" class:highlighted-arr={currentHighlightArr === i}>
                    <div class="arr-val">{val}</div>
                    <div class="arr-idx">[{i}]</div>
                </div>
            {/each}
        </div>
    </div>

    <div class="controls">
        <button class="btn-play" on:click={animateBuild} disabled={isAnimating}>Mulai Bangun Pohon</button>
        <button class="btn-reset" on:click={reset} disabled={isAnimating}>Reset</button>
    </div>
</div>

<style>
    .demo-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1rem 0 2rem;
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
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info-panel p {
        margin: 0;
        font-weight: 600;
        color: var(--color-ink);
        line-height: 1.4;
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
        opacity: 0;
        transition: opacity 0.3s, stroke 0.3s, stroke-width 0.3s;
    }

    .edge.visible {
        opacity: 0.3;
    }

    .active-edge {
        stroke: var(--color-accent);
        stroke-width: 3.5;
        opacity: 1 !important;
    }

    .node-circle {
        fill: var(--color-surface-elevated);
        stroke: var(--color-ink-muted);
        stroke-width: 2;
        transition: all 0.4s ease;
    }

    .node-val {
        font-size: 14px;
        font-weight: bold;
        fill: var(--color-ink);
        text-anchor: middle;
        opacity: 0.8;
    }

    .node-range {
        font-size: 9px;
        fill: var(--color-ink-muted);
        text-anchor: middle;
    }

    .node-group {
        transition: opacity 0.4s;
    }

    .node-group.hidden {
        opacity: 0.2;
    }

    .node-group.active .node-circle {
        stroke: var(--color-accent);
        stroke-width: 4;
        fill: var(--color-surface);
    }

    .node-group.completed .node-circle {
        fill: var(--color-status-info-soft);
        stroke: var(--color-link);
        stroke-width: 2.5;
    }
    
    .node-group.completed .node-val {
        opacity: 1;
        fill: var(--color-link);
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
        background: var(--color-accent-soft);
        border-color: var(--color-accent);
        transform: translateY(-4px);
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
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        color: white;
        transition: all 0.2s;
    }
    
    button:active:not(:disabled) { transform: scale(0.95); }
    button:hover:not(:disabled) { opacity: 0.9; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    button:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-play { background: var(--color-accent); }
    .btn-reset { background: var(--color-ink-muted); }
</style>
