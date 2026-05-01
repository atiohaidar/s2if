<script lang="ts">
    interface TreeNode {
        val: number;
        x: number;
        y: number;
        left?: TreeNode;
        right?: TreeNode;
    }

    const tree: TreeNode = {
        val: 29, x: 200, y: 40,
        left: {
            val: 17, x: 100, y: 110,
            left: { val: 10, x: 50, y: 180 },
            right: { val: 25, x: 150, y: 180 }
        },
        right: {
            val: 41, x: 300, y: 110,
            left: { val: 35, x: 250, y: 180 },
            right: { val: 52, x: 350, y: 180 }
        }
    };

    let searchTarget = $state(35);
    let path = $state<number[]>([]);
    let currentStep = $state(-1);
    let isPlaying = $state(false);
    let logs = $state<string[]>([]);

    function flattenNodes(node: TreeNode): {val:number, x:number, y:number}[] {
        let result = [{val: node.val, x: node.x, y: node.y}];
        if (node.left) result = [...result, ...flattenNodes(node.left)];
        if (node.right) result = [...result, ...flattenNodes(node.right)];
        return result;
    }

    function flattenEdges(node: TreeNode): {x1:number, y1:number, x2:number, y2:number}[] {
        let result: {x1:number, y1:number, x2:number, y2:number}[] = [];
        if (node.left) {
            result.push({x1: node.x, y1: node.y, x2: node.left.x, y2: node.left.y});
            result = [...result, ...flattenEdges(node.left)];
        }
        if (node.right) {
            result.push({x1: node.x, y1: node.y, x2: node.right.x, y2: node.right.y});
            result = [...result, ...flattenEdges(node.right)];
        }
        return result;
    }

    function buildPath(target: number): {path: number[], logs: string[]} {
        const p: number[] = [];
        const l: string[] = [];
        let curr: TreeNode | undefined = tree;
        while (curr) {
            p.push(curr.val);
            if (curr.val === target) {
                l.push(`${target} == ${curr.val} → Ketemu!`);
                break;
            } else if (target < curr.val) {
                l.push(`${target} < ${curr.val} → Belok ke KIRI`);
                curr = curr.left;
            } else {
                l.push(`${target} > ${curr.val} → Belok ke KANAN`);
                curr = curr.right;
            }
            if (!curr) {
                l.push(`Simpul nil → Tidak ditemukan!`);
            }
        }
        return {path: p, logs: l};
    }

    const allNodes = flattenNodes(tree);
    const allEdges = flattenEdges(tree);

    function runSearch() {
        if (isPlaying) return;
        isPlaying = true;
        const result = buildPath(searchTarget);
        path = result.path;
        logs = [];
        currentStep = 0;
        logs = [result.logs[0]];

        let i = 1;
        const interval = setInterval(() => {
            if (i < result.logs.length) {
                currentStep = Math.min(i, path.length - 1);
                logs = [...logs, result.logs[i]];
                i++;
            } else {
                clearInterval(interval);
                isPlaying = false;
            }
        }, 1000);
    }

    function reset() {
        currentStep = -1;
        path = [];
        isPlaying = false;
        logs = [];
    }

    const found = $derived(currentStep >= 0 && !isPlaying && path.includes(searchTarget));
    const notFound = $derived(currentStep >= 0 && !isPlaying && !path.includes(searchTarget));
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>🔍 Visualisasi Pencarian BST</h4>
        <div class="viz-controls">
            <label for="search-target">Cari:</label>
            <select id="search-target" bind:value={searchTarget} disabled={isPlaying}>
                {#each [10, 17, 25, 29, 35, 41, 52, 99] as num}
                    <option value={num}>{num}{num === 99 ? ' (tidak ada)' : ''}</option>
                {/each}
            </select>
            <button class="viz-btn primary" onclick={runSearch} disabled={isPlaying}>
                {isPlaying ? '⏳ Mencari...' : '▶ Mulai'}
            </button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid meet">
                <!-- Edges -->
                {#each allEdges as edge}
                    {@const isActivePath = currentStep >= 0 && (() => {
                        for (let k = 0; k < Math.min(currentStep, path.length - 1); k++) {
                            const from = allNodes.find(n => n.val === path[k]);
                            const to = allNodes.find(n => n.val === path[k+1]);
                            if (from && to && edge.x1 === from.x && edge.y1 === from.y && edge.x2 === to.x && edge.y2 === to.y) return true;
                        }
                        return false;
                    })()}
                    <line
                        x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2}
                        stroke={isActivePath ? "var(--color-link)" : "var(--color-note-lines)"}
                        stroke-width={isActivePath ? 3 : 1.5}
                        stroke-linecap="round"
                        class="tree-edge"
                    />
                {/each}

                <!-- Nodes -->
                {#each allNodes as node}
                    {@const stepIdx = path.indexOf(node.val)}
                    {@const isVisited = stepIdx >= 0 && stepIdx <= currentStep}
                    {@const isCurrent = path[currentStep] === node.val}
                    {@const isFound = found && isCurrent}
                    <g class="tree-node">
                        <circle
                            cx={node.x} cy={node.y} r="20"
                            fill={isFound ? "var(--color-status-success-soft)" : isCurrent ? "var(--color-link)" : isVisited ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"}
                            stroke={isFound ? "var(--color-status-success-border)" : isCurrent ? "var(--color-link)" : isVisited ? "var(--color-callout-info-border)" : "var(--color-note-lines)"}
                            stroke-width="2.5"
                        />
                        {#if isFound}
                            <circle cx={node.x} cy={node.y} r="20" fill="none" stroke="var(--color-status-success-border)" stroke-width="2" class="pulse-ring" />
                        {/if}
                        <text
                            x={node.x} y={node.y}
                            dy="5"
                            text-anchor="middle"
                            fill={isCurrent && !isFound ? "var(--color-text-on-accent)" : "var(--color-ink-strong)"}
                            font-weight="700"
                            font-size="14"
                        >
                            {node.val}
                        </text>
                    </g>
                {/each}
            </svg>
        </div>

        <div class="log-panel">
            <div class="log-title">📋 Langkah Pencarian</div>
            <div class="log-entries">
                {#if logs.length === 0}
                    <p class="log-empty">Pilih angka dan klik "Mulai" untuk melihat proses pencarian langkah demi langkah.</p>
                {:else}
                    {#each logs as log, i}
                        <div class="log-entry" class:latest={i === logs.length - 1} class:success-log={log.includes('Ketemu')} class:fail-log={log.includes('Tidak ditemukan')}>
                            <span class="log-step">#{i + 1}</span>
                            <span class="log-text">{log}</span>
                        </div>
                    {/each}
                {/if}
            </div>
            {#if found}
                <div class="log-result success">✅ Nilai {searchTarget} ditemukan di pohon!</div>
            {:else if notFound}
                <div class="log-result fail">❌ Nilai {searchTarget} tidak ada di pohon.</div>
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
        max-height: 160px;
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
    .log-entry.fail-log { background: var(--color-status-warning-soft); }
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
    .log-result.fail { background: var(--color-status-warning-soft); color: var(--color-status-warning-text); }

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 0.3; r: 20; }
        50% { opacity: 0.8; r: 28; }
    }
    .pulse-ring { animation: pulse 1.2s ease infinite; }
</style>
