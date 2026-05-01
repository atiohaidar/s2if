<script lang="ts">
    type TraversalType = 'inorder' | 'preorder' | 'postorder';
    let mode = $state<TraversalType>('inorder');
    let currentStep = $state(-1);
    let isPlaying = $state(false);
    let result = $state<number[]>([]);

    interface TNode {
        val: number;
        x: number;
        y: number;
        leftIdx: number;
        rightIdx: number;
    }

    const nodes: TNode[] = [
        {val: 15, x: 200, y: 40, leftIdx: 1, rightIdx: 2},
        {val: 6,  x: 100, y: 110, leftIdx: 3, rightIdx: 4},
        {val: 20, x: 300, y: 110, leftIdx: 5, rightIdx: -1},
        {val: 3,  x: 50,  y: 180, leftIdx: -1, rightIdx: -1},
        {val: 7,  x: 150, y: 180, leftIdx: -1, rightIdx: -1},
        {val: 18, x: 250, y: 180, leftIdx: -1, rightIdx: -1},
    ];

    const edges: [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5]];

    function getTraversal(type: TraversalType): number[] {
        const order: number[] = [];
        function inorder(idx: number) {
            if (idx < 0) return;
            inorder(nodes[idx].leftIdx);
            order.push(idx);
            inorder(nodes[idx].rightIdx);
        }
        function preorder(idx: number) {
            if (idx < 0) return;
            order.push(idx);
            preorder(nodes[idx].leftIdx);
            preorder(nodes[idx].rightIdx);
        }
        function postorder(idx: number) {
            if (idx < 0) return;
            postorder(nodes[idx].leftIdx);
            postorder(nodes[idx].rightIdx);
            order.push(idx);
        }
        if (type === 'inorder') inorder(0);
        else if (type === 'preorder') preorder(0);
        else postorder(0);
        return order;
    }

    function play() {
        if (isPlaying) return;
        isPlaying = true;
        const traversal = getTraversal(mode);
        currentStep = -1;
        result = [];

        let i = 0;
        const interval = setInterval(() => {
            if (i < traversal.length) {
                currentStep = traversal[i];
                result = [...result, nodes[traversal[i]].val];
                i++;
            } else {
                clearInterval(interval);
                isPlaying = false;
            }
        }, 800);
    }

    function reset() {
        currentStep = -1;
        isPlaying = false;
        result = [];
    }

    function setMode(m: TraversalType) {
        mode = m;
        reset();
    }

    const descriptions: Record<TraversalType, {title: string, order: string, use: string}> = {
        inorder: {
            title: 'In-Order (Kiri → Akar → Kanan)',
            order: 'Kunjungi sub-pohon kiri, proses akar, lalu sub-pohon kanan.',
            use: 'Menghasilkan urutan data TERURUT MENAIK.'
        },
        preorder: {
            title: 'Pre-Order (Akar → Kiri → Kanan)',
            order: 'Proses akar dulu, lalu sub-pohon kiri, lalu kanan.',
            use: 'Digunakan untuk menyalin (replikasi) pohon.'
        },
        postorder: {
            title: 'Post-Order (Kiri → Kanan → Akar)',
            order: 'Kunjungi sub-pohon kiri dan kanan dulu, baru proses akar.',
            use: 'Digunakan untuk menghapus pohon atau evaluasi ekspresi.'
        }
    };

    const visitedSet = $derived(new Set(result.map((_, i) => {
        const traversal = getTraversal(mode);
        return traversal[i];
    })));
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>🔄 Visualisasi Traversal BST</h4>
        <div class="tabs">
            {#each (['inorder', 'preorder', 'postorder'] as const) as m}
                <button class:active={mode === m} onclick={() => setMode(m)}>
                    {m === 'inorder' ? 'In-Order' : m === 'preorder' ? 'Pre-Order' : 'Post-Order'}
                </button>
            {/each}
        </div>
    </div>

    <div class="desc-bar">
        <strong>{descriptions[mode].title}</strong>
        <span>{descriptions[mode].order}</span>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid meet">
                <!-- Edges -->
                {#each edges as [fromIdx, toIdx]}
                    <line
                        x1={nodes[fromIdx].x} y1={nodes[fromIdx].y}
                        x2={nodes[toIdx].x} y2={nodes[toIdx].y}
                        stroke="var(--color-note-lines)"
                        stroke-width="1.5"
                    />
                {/each}

                <!-- Nodes -->
                {#each nodes as node, idx}
                    {@const isCurrent = currentStep === idx}
                    {@const isVisited = visitedSet.has(idx)}
                    {@const visitOrder = isVisited ? result.indexOf(node.val) + 1 : -1}
                    <g class="tree-node">
                        <circle
                            cx={node.x} cy={node.y} r="20"
                            fill={isCurrent ? "var(--color-link)" : isVisited ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"}
                            stroke={isCurrent ? "var(--color-link)" : isVisited ? "var(--color-callout-info-border)" : "var(--color-note-lines)"}
                            stroke-width="2.5"
                        />
                        {#if isCurrent}
                            <circle cx={node.x} cy={node.y} r="20" fill="none" stroke="var(--color-link)" stroke-width="2" class="pulse-ring" />
                        {/if}
                        <text
                            x={node.x} y={node.y} dy="5" text-anchor="middle"
                            fill={isCurrent ? "var(--color-text-on-accent)" : "var(--color-ink-strong)"}
                            font-weight="700" font-size="14"
                        >{node.val}</text>
                        {#if visitOrder > 0}
                            <circle cx={node.x + 16} cy={node.y - 16} r="9" fill="var(--color-link)" />
                            <text x={node.x + 16} y={node.y - 16} dy="3.5" text-anchor="middle" fill="var(--color-text-on-accent)" font-size="9" font-weight="700">{visitOrder}</text>
                        {/if}
                    </g>
                {/each}
            </svg>
        </div>

        <div class="result-panel">
            <div class="result-title">📋 Urutan Kunjungan</div>
            <div class="result-chips">
                {#if result.length === 0}
                    <p class="result-empty">Klik "Mulai" untuk melihat urutan kunjungan simpul.</p>
                {:else}
                    {#each result as val, i}
                        <span class="chip" class:latest={i === result.length - 1}>
                            {val}
                        </span>
                        {#if i < result.length - 1}
                            <span class="arrow">→</span>
                        {/if}
                    {/each}
                {/if}
            </div>
            {#if !isPlaying && result.length > 0}
                <div class="result-note">
                    💡 {descriptions[mode].use}
                </div>
            {/if}
            <div class="result-actions">
                <button class="viz-btn primary" onclick={play} disabled={isPlaying}>
                    {isPlaying ? '⏳ Berjalan...' : '▶ Mulai'}
                </button>
                <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
            </div>
        </div>
    </div>
</div>

<style>
    .viz-container {
        background: var(--color-surface-soft);
        border: 1px solid var(--color-line);
        border-radius: 12px;
        padding: 1.25rem;
        margin: 1.5rem 0;
    }
    .viz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .viz-header h4 { margin: 0; color: var(--color-ink-strong); font-size: 1.1rem; }
    .tabs {
        display: flex;
        gap: 0.25rem;
        background: var(--color-surface);
        padding: 0.25rem;
        border-radius: 8px;
        border: 1px solid var(--color-line);
    }
    .tabs button {
        border: none;
        background: none;
        padding: 0.35rem 0.7rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-ink-soft);
        transition: all 0.2s;
    }
    .tabs button.active {
        background: var(--color-link);
        color: var(--color-text-on-accent);
    }

    .desc-bar {
        background: var(--color-surface);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 0.6rem 0.8rem;
        margin-bottom: 1rem;
        font-size: 0.82rem;
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }
    .desc-bar strong { color: var(--color-ink-strong); }
    .desc-bar span { color: var(--color-ink-soft); }

    .viz-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    @media (max-width: 640px) {
        .viz-body { grid-template-columns: 1fr; }
    }

    .tree-canvas {
        background: var(--color-surface);
        border-radius: 8px;
        border: 1px solid var(--color-line);
        padding: 0.5rem;
    }
    .tree-node circle { transition: all 0.3s ease; }

    .result-panel {
        background: var(--color-surface);
        border-radius: 8px;
        border: 1px solid var(--color-line);
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .result-title {
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--color-ink-strong);
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed var(--color-line);
    }
    .result-chips {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.3rem;
        flex: 1;
        min-height: 60px;
    }
    .result-empty {
        font-size: 0.8rem;
        color: var(--color-ink-muted);
        text-align: center;
        margin: auto;
    }
    .chip {
        background: var(--color-status-info-soft);
        border: 1px solid var(--color-callout-info-border);
        padding: 0.25rem 0.6rem;
        border-radius: 12px;
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--color-ink-strong);
        animation: popIn 0.3s ease;
    }
    .chip.latest {
        background: var(--color-link);
        color: var(--color-text-on-accent);
        border-color: var(--color-link);
    }
    .arrow {
        font-size: 0.7rem;
        color: var(--color-ink-muted);
    }
    .result-note {
        background: var(--color-surface-soft);
        border-radius: 6px;
        padding: 0.4rem 0.6rem;
        font-size: 0.78rem;
        color: var(--color-ink-soft);
    }
    .result-actions {
        display: flex;
        gap: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px dashed var(--color-line);
    }
    .viz-btn {
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.8rem;
        transition: all 0.2s;
        flex: 1;
    }
    .viz-btn.primary { background: var(--color-link); color: var(--color-text-on-accent); }
    .viz-btn.secondary { background: var(--color-surface-soft); border: 1px solid var(--color-line); color: var(--color-ink-soft); }
    .viz-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    @keyframes popIn {
        0% { opacity: 0; transform: scale(0.5); }
        100% { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    .pulse-ring { animation: pulse 1s ease infinite; }
</style>
