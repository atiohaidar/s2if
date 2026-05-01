<script lang="ts">
    interface TreeNode {
        val: number;
        x: number;
        y: number;
    }

    const baseTree: TreeNode[] = [
        {val: 15, x: 200, y: 40},
        {val: 6, x: 100, y: 110},
        {val: 20, x: 300, y: 110},
        {val: 3, x: 50, y: 180},
        {val: 7, x: 150, y: 180},
    ];
    const baseEdges: [number, number][] = [[0,1],[0,2],[1,3],[1,4]];

    let insertVal = $state(10);
    let step = $state(-1);
    let isPlaying = $state(false);
    let logs = $state<string[]>([]);
    let pathNodes = $state<number[]>([]);
    let inserted = $state(false);

    const insertOptions = [2, 5, 10, 13, 18, 25];

    function getInsertPath(val: number): {path: number[], logs: string[], parentIdx: number, side: 'left'|'right'} {
        const p: number[] = [];
        const l: string[] = [];
        let parentIdx = -1;
        let side: 'left'|'right' = 'left';

        // Simulate search through tree
        const tree = [{val:15, left:1, right:2}, {val:6, left:3, right:4}, {val:20, left:-1, right:-1}, {val:3, left:-1, right:-1}, {val:7, left:-1, right:-1}];
        let idx = 0;
        while (idx >= 0) {
            p.push(baseTree[idx].val);
            if (val < tree[idx].val) {
                l.push(`${val} < ${tree[idx].val} → Turun ke KIRI`);
                if (tree[idx].left === -1) {
                    l.push(`Anak kiri kosong → Sisipkan di sini!`);
                    parentIdx = idx;
                    side = 'left';
                    break;
                }
                idx = tree[idx].left;
            } else {
                l.push(`${val} ≥ ${tree[idx].val} → Turun ke KANAN`);
                if (tree[idx].right === -1) {
                    l.push(`Anak kanan kosong → Sisipkan di sini!`);
                    parentIdx = idx;
                    side = 'right';
                    break;
                }
                idx = tree[idx].right;
            }
        }
        return { path: p, logs: l, parentIdx, side };
    }

    function getNewNodePos(parentIdx: number, side: 'left'|'right'): {x: number, y: number} {
        const parent = baseTree[parentIdx];
        const offset = side === 'left' ? -40 : 40;
        return { x: parent.x + offset, y: parent.y + 70 };
    }

    function runInsert() {
        if (isPlaying) return;
        isPlaying = true;
        inserted = false;
        const result = getInsertPath(insertVal);
        pathNodes = [];
        logs = [];
        step = 0;

        let i = 0;
        const interval = setInterval(() => {
            if (i < result.logs.length) {
                logs = [...logs, result.logs[i]];
                if (i < result.path.length) {
                    pathNodes = [...pathNodes, result.path[i]];
                }
                step = i;
                i++;
            } else {
                inserted = true;
                clearInterval(interval);
                isPlaying = false;
            }
        }, 900);
    }

    function reset() {
        step = -1;
        isPlaying = false;
        logs = [];
        pathNodes = [];
        inserted = false;
    }

    const insertResult = $derived(getInsertPath(insertVal));
    const newNodePos = $derived(getNewNodePos(insertResult.parentIdx, insertResult.side));
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>➕ Visualisasi Penyisipan BST</h4>
        <div class="viz-controls">
            <label for="insert-val">Sisipkan:</label>
            <select id="insert-val" bind:value={insertVal} disabled={isPlaying}>
                {#each insertOptions as num}
                    <option value={num}>{num}</option>
                {/each}
            </select>
            <button class="viz-btn primary" onclick={runInsert} disabled={isPlaying}>
                {isPlaying ? '⏳ Mencari posisi...' : '▶ Sisipkan'}
            </button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                <!-- Base Edges -->
                {#each baseEdges as [fromIdx, toIdx]}
                    <line
                        x1={baseTree[fromIdx].x} y1={baseTree[fromIdx].y}
                        x2={baseTree[toIdx].x} y2={baseTree[toIdx].y}
                        stroke="var(--color-note-lines)"
                        stroke-width="1.5"
                        class="tree-edge"
                    />
                {/each}

                <!-- New edge (when inserted) -->
                {#if inserted}
                    {@const parent = baseTree[insertResult.parentIdx]}
                    <line
                        x1={parent.x} y1={parent.y}
                        x2={newNodePos.x} y2={newNodePos.y}
                        stroke="#28a745"
                        stroke-width="2.5"
                        class="tree-edge"
                    />
                {/if}

                <!-- Base Nodes -->
                {#each baseTree as node}
                    {@const isOnPath = pathNodes.includes(node.val)}
                    {@const isCurrent = pathNodes.length > 0 && pathNodes[pathNodes.length - 1] === node.val && !inserted}
                    <g class="tree-node">
                        <circle
                            cx={node.x} cy={node.y} r="20"
                            fill={isCurrent ? "var(--color-link)" : isOnPath ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"}
                            stroke={isCurrent ? "var(--color-link)" : isOnPath ? "var(--color-callout-info-border)" : "var(--color-note-lines)"}
                            stroke-width="2.5"
                        />
                        <text
                            x={node.x} y={node.y} dy="5" text-anchor="middle"
                            fill={isCurrent ? "var(--color-text-on-accent)" : "var(--color-ink-strong)"}
                            font-weight="700" font-size="14"
                        >{node.val}</text>
                    </g>
                {/each}

                <!-- New Node (when inserted) -->
                {#if inserted}
                    <g class="tree-node new-node">
                        <circle
                            cx={newNodePos.x} cy={newNodePos.y} r="20"
                            fill="#d4edda" stroke="#28a745" stroke-width="2.5"
                        />
                        <circle cx={newNodePos.x} cy={newNodePos.y} r="20" fill="none" stroke="#28a745" stroke-width="2" class="pulse-ring" />
                        <text
                            x={newNodePos.x} y={newNodePos.y - 30}
                            text-anchor="middle" font-size="10" fill="#28a745" font-weight="700"
                        >baru!</text>
                        <text
                            x={newNodePos.x} y={newNodePos.y} dy="5" text-anchor="middle"
                            fill="var(--color-ink-strong)" font-weight="700" font-size="14"
                        >{insertVal}</text>
                    </g>
                {/if}
            </svg>
        </div>

        <div class="log-panel">
            <div class="log-title">📋 Langkah Penyisipan</div>
            <div class="log-entries">
                {#if logs.length === 0}
                    <p class="log-empty">Pilih angka dan klik "Sisipkan" untuk melihat proses pencarian posisi langkah demi langkah.</p>
                {:else}
                    {#each logs as log, i}
                        <div class="log-entry" class:latest={i === logs.length - 1} class:success-log={log.includes('Sisipkan')}>
                            <span class="log-step">#{i + 1}</span>
                            <span class="log-text">{log}</span>
                        </div>
                    {/each}
                {/if}
            </div>
            {#if inserted}
                <div class="log-result success">✅ Simpul {insertVal} berhasil disisipkan!</div>
            {/if}
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
        max-height: 180px;
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
    .log-result {
        margin-top: 0.5rem;
        padding: 0.5rem;
        border-radius: 6px;
        text-align: center;
        font-weight: 700;
        font-size: 0.85rem;
    }
    .log-result.success { background: var(--color-status-success-soft); color: var(--color-status-success-text); }

    .new-node { animation: popIn 0.5s ease; }

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes popIn {
        0% { opacity: 0; transform: scale(0.3); }
        70% { transform: scale(1.15); }
        100% { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    .pulse-ring { animation: pulse 1.2s ease infinite; }
</style>
