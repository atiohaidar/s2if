<script lang="ts">
    interface TreeNode {
        id: number;
        val: number;
        range: [number, number];
        x: number;
        y: number;
        left?: number;
        right?: number;
    }

    const arr = [5, 8, 6, 3, 2, 7, 1, 4];
    
    // Layout for N=8 (0-indexed tree)
    const baseTree: TreeNode[] = [
        { id: 0, val: 36, range: [0, 8], x: 200, y: 30, left: 1, right: 2 },
        { id: 1, val: 22, range: [0, 4], x: 100, y: 90, left: 3, right: 4 },
        { id: 2, val: 14, range: [4, 8], x: 300, y: 90, left: 5, right: 6 },
        { id: 3, val: 13, range: [0, 2], x: 50, y: 150, left: 7, right: 8 },
        { id: 4, val: 9, range: [2, 4], x: 150, y: 150, left: 9, right: 10 },
        { id: 5, val: 9, range: [4, 6], x: 250, y: 150, left: 11, right: 12 },
        { id: 6, val: 5, range: [6, 8], x: 350, y: 150, left: 13, right: 14 },
        { id: 7, val: 5, range: [0, 1], x: 25, y: 210 },
        { id: 8, val: 8, range: [1, 2], x: 75, y: 210 },
        { id: 9, val: 6, range: [2, 3], x: 125, y: 210 },
        { id: 10, val: 3, range: [3, 4], x: 175, y: 210 },
        { id: 11, val: 2, range: [4, 5], x: 225, y: 210 },
        { id: 12, val: 7, range: [5, 6], x: 275, y: 210 },
        { id: 13, val: 1, range: [6, 7], x: 325, y: 210 },
        { id: 14, val: 4, range: [7, 8], x: 375, y: 210 },
    ];

    const baseEdges = [
        [0, 1], [0, 2],
        [1, 3], [1, 4],
        [2, 5], [2, 6],
        [3, 7], [3, 8],
        [4, 9], [4, 10],
        [5, 11], [5, 12],
        [6, 13], [6, 14]
    ];

    let queryL = $state(2);
    let queryR = $state(5); // Now inclusive for query view [L, R-1] logic in display
    let isPlaying = $state(false);
    let activeNodes = $state<number[]>([]);
    let selectedNodes = $state<number[]>([]); // Nodes that fully cover the query range
    let logs = $state<string[]>([]);
    let currentSum = $state(0);

    const queryOptions = [0, 1, 2, 3, 4, 5, 6, 7];

    function runQuery() {
        if (isPlaying) return;
        if (queryL > queryR) {
            logs = ["Query tidak valid: L harus ≤ R"];
            return;
        }

        isPlaying = true;
        activeNodes = [];
        selectedNodes = [];
        logs = [];
        currentSum = 0;

        const steps: {nodeId: number, type: 'visit'|'select'|'ignore', val: number, range: [number, number]}[] = [];

        function dfs(nodeId: number, ql: number, qr: number) {
            const node = baseTree.find(n => n.id === nodeId)!;
            const nl = node.range[0];
            const nr = node.range[1];

            steps.push({ nodeId, type: 'visit', val: node.val as number, range: [nl, nr] });

            // Ignore if disjoint: [ql, qr] and [nl, nr]
            // Since we use half-open for node ranges [nl, nr), nr is exclusive
            if (nr <= ql || nl > qr) {
                steps.push({ nodeId, type: 'ignore', val: node.val as number, range: [nl, nr] });
                return;
            }

            // Select if fully covers: [ql, qr] covers [nl, nr)
            if (ql <= nl && nr - 1 <= qr) {
                steps.push({ nodeId, type: 'select', val: node.val as number, range: [nl, nr] });
                return;
            }

            // Partially covers, go deeper
            if (node.left !== undefined) dfs(node.left, ql, qr);
            if (node.right !== undefined) dfs(node.right, ql, qr);
        }

        dfs(0, queryL, queryR);

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                const step = steps[i];
                const rangeStr = `[${step.range[0]}-${step.range[1]}]`;
                
                if (step.type === 'visit') {
                    activeNodes = [...activeNodes, step.nodeId];
                    logs = [...logs, `Mengunjungi Node ${rangeStr}`];
                } else if (step.type === 'ignore') {
                    logs = [...logs, `Node ${rangeStr} di luar rentang kueri. Abaikan.`];
                } else if (step.type === 'select') {
                    selectedNodes = [...selectedNodes, step.nodeId];
                    currentSum += step.val;
                    logs = [...logs, `Node ${rangeStr} sepenuhnya di dalam rentang. Ambil nilai: ${step.val}`];
                }
                
                i++;
            } else {
                logs = [...logs, `Kueri Selesai! Total Penjumlahan = ${currentSum}`];
                clearInterval(interval);
                isPlaying = false;
            }
        }, 800);
    }

    function reset() {
        isPlaying = false;
        activeNodes = [];
        selectedNodes = [];
        logs = [];
        currentSum = 0;
    }
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>🌲 Visualisasi Kueri Segment Tree (Sum)</h4>
        <div class="viz-controls">
            <label for="query-l">Rentang (L):</label>
            <select id="query-l" bind:value={queryL} disabled={isPlaying}>
                {#each queryOptions as num}
                    <option value={num}>{num}</option>
                {/each}
            </select>
            
            <label for="query-r">sampai (R):</label>
            <select id="query-r" bind:value={queryR} disabled={isPlaying}>
                {#each queryOptions as num}
                    <option value={num}>{num}</option>
                {/each}
            </select>

            <button class="viz-btn primary" onclick={runQuery} disabled={isPlaying}>
                {isPlaying ? '⏳ Mencari...' : '▶ Jalankan Kueri'}
            </button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
        <div class="array-view">
            Array Awal:
            <div class="array-boxes">
                {#each arr as item, i}
                    <div class="array-box" class:in-query={i >= queryL && i <= queryR}>
                        <div class="array-val">{item}</div>
                        <div class="array-idx">{i}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet">
                <!-- Base Edges -->
                {#each baseEdges as [fromId, toId]}
                    {@const fromNode = baseTree.find(n => n.id === fromId)!}
                    {@const toNode = baseTree.find(n => n.id === toId)!}
                    <line
                        x1={fromNode.x} y1={fromNode.y}
                        x2={toNode.x} y2={toNode.y}
                        stroke={activeNodes.includes(toId) ? "var(--color-link)" : "var(--color-note-lines)"}
                        stroke-width="1.5"
                        class="tree-edge"
                    />
                {/each}

                <!-- Base Nodes -->
                {#each baseTree as node}
                    {@const isVisited = activeNodes.includes(node.id)}
                    {@const isSelected = selectedNodes.includes(node.id)}
                    <g class="tree-node">
                        <circle
                            cx={node.x} cy={node.y} r="18"
                            fill={isSelected ? "var(--color-status-success-soft)" : isVisited ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"}
                            stroke={isSelected ? "var(--color-status-success)" : isVisited ? "var(--color-link)" : "var(--color-note-lines)"}
                            stroke-width="2"
                        />
                        <text
                            x={node.x} y={node.y} dy="4" text-anchor="middle"
                            fill={isSelected ? "var(--color-status-success-text)" : isVisited ? "var(--color-ink-strong)" : "var(--color-ink-strong)"}
                            font-weight="700" font-size="12"
                        >{node.val}</text>
                        <!-- Range Label -->
                        <text
                            x={node.x} y={node.y + 28} text-anchor="middle"
                            fill="var(--color-ink-muted)"
                            font-size="9"
                        >[{node.range[0]}-{node.range[1]})</text>
                    </g>
                {/each}
            </svg>
        </div>

        <div class="log-panel">
            <div class="log-title">📋 Proses Kueri {currentSum > 0 ? `(Sum: ${currentSum})` : ''}</div>
            <div class="log-entries">
                {#if logs.length === 0}
                    <p class="log-empty">Atur rentang dan klik "Jalankan Kueri".</p>
                {:else}
                    {#each logs as log, i}
                        <div class="log-entry" class:latest={i === logs.length - 1} class:success-log={log.includes('Selesai')}>
                            <span class="log-step">#{i + 1}</span>
                            <span class="log-text">{log}</span>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>

    <div class="tree-array-container">
        <h5>📦 Linear Tree Array (Akses Memori)</h5>
        <div class="tree-array">
            {#each baseTree as node, i}
                {@const isVisited = activeNodes.includes(node.id)}
                {@const isSelected = selectedNodes.includes(node.id)}
                <div class="tree-array-item" class:active={isVisited} class:selected={isSelected}>
                    <div class="tree-array-val">{node.val}</div>
                    <div class="tree-array-idx">{i}</div>
                </div>
            {/each}
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
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }
    .viz-header h4 { margin: 0; color: var(--color-ink-strong); font-size: 1.1rem; }
    .viz-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    .viz-controls label { font-size: 0.85rem; font-weight: 600; color: var(--color-ink-soft); }
    .viz-controls select {
        padding: 0.35rem 0.6rem;
        border-radius: 6px;
        border: 1px solid var(--color-line);
        background: var(--color-surface);
        font-size: 0.85rem;
        color: var(--color-ink);
    }
    .viz-btn {
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.8rem;
        transition: all 0.2s;
    }
    .viz-btn.primary { background: var(--color-link); color: var(--color-text-on-accent); }
    .viz-btn.secondary { background: var(--color-surface); border: 1px solid var(--color-line); color: var(--color-ink-soft); }
    .viz-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .array-view {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-ink-soft);
        margin-top: 0.5rem;
    }
    .array-boxes {
        display: flex;
        gap: 0.25rem;
    }
    .array-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 32px;
    }
    .array-val {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-surface);
        border: 1px solid var(--color-line);
        border-radius: 6px;
        font-weight: 700;
        color: var(--color-ink-strong);
        transition: all 0.3s ease;
    }
    .array-idx {
        font-size: 0.7rem;
        color: var(--color-ink-muted);
        margin-top: 0.2rem;
    }
    .array-box.in-query .array-val {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success);
        color: var(--color-status-success-text);
    }

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
    .tree-edge { transition: all 0.4s ease; }
    .tree-node circle { transition: all 0.4s ease; }

    .log-panel {
        background: var(--color-surface);
        border-radius: 8px;
        border: 1px solid var(--color-line);
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
    }
    .log-title {
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--color-ink-strong);
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed var(--color-line);
    }
    .log-entries {
        flex: 1;
        overflow-y: auto;
        max-height: 220px;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }
    .log-empty {
        font-size: 0.8rem;
        color: var(--color-ink-muted);
        text-align: center;
        margin: auto;
    }
    .log-entry {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        padding: 0.3rem 0.5rem;
        border-radius: 6px;
        font-size: 0.8rem;
        background: var(--color-surface-soft);
        animation: slideIn 0.3s ease;
    }
    .log-entry.latest { background: var(--color-status-info-soft); font-weight: 600; }
    .log-entry.success-log { background: var(--color-status-success-soft); }
    .log-step {
        font-weight: 700;
        font-size: 0.7rem;
        color: var(--color-ink-muted);
        min-width: 1.5rem;
    }
    .log-text { color: var(--color-ink); }

    .tree-array-container {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px dashed var(--color-line);
    }
    .tree-array-container h5 { margin: 0 0 0.75rem 0; font-size: 0.9rem; color: var(--color-ink-strong); }
    .tree-array {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
    }
    .tree-array-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 32px;
        transition: all 0.3s;
    }
    .tree-array-val {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-surface);
        border: 1px solid var(--color-line);
        border-radius: 4px;
        font-weight: 700;
        font-size: 0.8rem;
        color: var(--color-ink-muted);
    }
    .tree-array-idx {
        font-size: 0.65rem;
        color: var(--color-ink-muted);
        margin-top: 0.2rem;
    }
    .tree-array-item.selected .tree-array-val {
        color: var(--color-status-success-text);
        border-color: var(--color-status-success);
        background: var(--color-status-success-soft);
    }
    .tree-array-item.active .tree-array-val {
        color: var(--color-link);
        border-color: var(--color-link);
        background: var(--color-status-info-soft);
        transform: scale(1.05);
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
    }
</style>
