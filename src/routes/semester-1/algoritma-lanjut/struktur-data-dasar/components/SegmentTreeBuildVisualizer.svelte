<script lang="ts">
    interface TreeNode {
        id: number;
        val: number | string;
        range: [number, number];
        x: number;
        y: number;
        left?: number;
        right?: number;
    }

    const arr = [5, 8, 6, 3, 2, 7, 1, 4];
    
    // Layout for N=8 (0-indexed tree)
    const nodes: TreeNode[] = [
        { id: 0, val: "?", range: [0, 8], x: 200, y: 30, left: 1, right: 2 },
        { id: 1, val: "?", range: [0, 4], x: 100, y: 90, left: 3, right: 4 },
        { id: 2, val: "?", range: [4, 8], x: 300, y: 90, left: 5, right: 6 },
        { id: 3, val: "?", range: [0, 2], x: 50, y: 150, left: 7, right: 8 },
        { id: 4, val: "?", range: [2, 4], x: 150, y: 150, left: 9, right: 10 },
        { id: 5, val: "?", range: [4, 6], x: 250, y: 150, left: 11, right: 12 },
        { id: 6, val: "?", range: [6, 8], x: 350, y: 150, left: 13, right: 14 },
        { id: 7, val: "?", range: [0, 1], x: 25, y: 210 },
        { id: 8, val: "?", range: [1, 2], x: 75, y: 210 },
        { id: 9, val: "?", range: [2, 3], x: 125, y: 210 },
        { id: 10, val: "?", range: [3, 4], x: 175, y: 210 },
        { id: 11, val: "?", range: [4, 5], x: 225, y: 210 },
        { id: 12, val: "?", range: [5, 6], x: 275, y: 210 },
        { id: 13, val: "?", range: [6, 7], x: 325, y: 210 },
        { id: 14, val: "?", range: [7, 8], x: 375, y: 210 },
    ];

    const edges = [
        [0, 1], [0, 2],
        [1, 3], [1, 4],
        [2, 5], [2, 6],
        [3, 7], [3, 8],
        [4, 9], [4, 10],
        [5, 11], [5, 12],
        [6, 13], [6, 14]
    ];

    let currentTree = $state(nodes.map(n => ({ ...n })));
    let isPlaying = $state(false);
    let activeNodeId = $state<number | null>(null);
    let completedNodeIds = $state<number[]>([]);
    let logs = $state<string[]>([]);
    let stepIndex = $state(0);
    let buildSteps: { nodeId: number, type: 'start' | 'leaf' | 'merge', val?: number }[] = [];

    function generateSteps() {
        const steps: { nodeId: number, type: 'start' | 'leaf' | 'merge', val?: number }[] = [];
        
        function build(nodeId: number, left: number, right: number): number {
            steps.push({ nodeId, type: 'start' });
            
            let val: number;
            if (right - left === 1) {
                val = arr[left];
                steps.push({ nodeId, type: 'leaf', val });
            } else {
                const mid = Math.floor((left + right) / 2);
                const leftNode = nodeId * 2 + 1;
                const rightNode = nodeId * 2 + 2;
                
                const leftVal = build(leftNode, left, mid);
                const rightVal = build(rightNode, mid, right);
                
                val = leftVal + rightVal;
                steps.push({ nodeId, type: 'merge', val });
            }
            return val;
        }

        build(0, 0, 8);
        return steps;
    }

    function runBuild() {
        if (isPlaying) return;
        reset();
        isPlaying = true;
        buildSteps = generateSteps();
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < buildSteps.length) {
                const step = buildSteps[i];
                const node = currentTree.find(n => n.id === step.nodeId)!;
                activeNodeId = step.nodeId;

                if (step.type === 'start') {
                    logs = [...logs, `Memanggil BUILD untuk rentang [${node.range[0]}-${node.range[1]}]`];
                } else if (step.type === 'leaf') {
                    node.val = step.val!;
                    completedNodeIds = [...completedNodeIds, step.nodeId];
                    logs = [...logs, `Leaf ditemukan di indeks ${node.range[0]}. Isi nilai: ${step.val}`];
                } else if (step.type === 'merge') {
                    node.val = step.val!;
                    completedNodeIds = [...completedNodeIds, step.nodeId];
                    logs = [...logs, `Merge selesai untuk [${node.range[0]}-${node.range[1]}]. Nilai baru: ${step.val}`];
                }
                
                i++;
                stepIndex = i;
            } else {
                activeNodeId = null;
                logs = [...logs, `Build Selesai! Segment Tree siap digunakan.`];
                clearInterval(interval);
                isPlaying = false;
            }
        }, 600);
    }

    function reset() {
        isPlaying = false;
        activeNodeId = null;
        completedNodeIds = [];
        logs = [];
        currentTree = nodes.map(n => ({ ...n }));
        stepIndex = 0;
    }
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>🔨 Visualisasi Pembangunan (Build) Segment Tree</h4>
        <div class="viz-controls">
            <button class="viz-btn primary" onclick={runBuild} disabled={isPlaying}>
                {isPlaying ? '⏳ Membangun...' : '▶ Mulai Build'}
            </button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
        <div class="array-view">
            Array Dasar:
            <div class="array-boxes">
                {#each arr as item, i}
                    <div class="array-box">
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
                <!-- Edges -->
                {#each edges as [fromId, toId]}
                    {@const fromNode = currentTree.find(n => n.id === fromId)!}
                    {@const toNode = currentTree.find(n => n.id === toId)!}
                    <line
                        x1={fromNode.x} y1={fromNode.y}
                        x2={toNode.x} y2={toNode.y}
                        stroke={completedNodeIds.includes(toId) ? "var(--color-status-success)" : activeNodeId === toId ? "var(--color-link)" : "var(--color-note-lines)"}
                        stroke-width="1.5"
                        class="tree-edge"
                    />
                {/each}

                <!-- Nodes -->
                {#each currentTree as node}
                    {@const isActive = activeNodeId === node.id}
                    {@const isCompleted = completedNodeIds.includes(node.id)}
                    <g class="tree-node">
                        <circle
                            cx={node.x} cy={node.y} r="18"
                            fill={isCompleted ? "var(--color-status-success-soft)" : isActive ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"}
                            stroke={isCompleted ? "var(--color-status-success)" : isActive ? "var(--color-link)" : "var(--color-note-lines)"}
                            stroke-width="2"
                        />
                        <text
                            x={node.x} y={node.y} dy="4" text-anchor="middle"
                            fill={isCompleted || isActive ? "var(--color-ink-strong)" : "var(--color-ink-muted)"}
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
            <div class="log-title">📋 Log Pembangunan (Top-Down & Bottom-Up)</div>
            <div class="log-entries">
                {#if logs.length === 0}
                    <p class="log-empty">Klik "Mulai Build" untuk melihat prosesnya.</p>
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
        <h5>📦 Linear Tree Array (di memori)</h5>
        <div class="tree-array">
            {#each currentTree as node, i}
                <div class="tree-array-item" class:active={activeNodeId === i} class:filled={completedNodeIds.includes(i)}>
                    <div class="tree-array-val">{node.val}</div>
                    <div class="tree-array-idx">{i}</div>
                </div>
            {/each}
        </div>
        <p class="tree-array-note">
            Perhatikan bagaimana pohon hierarki di atas "dipetakan" ke dalam array linear satu dimensi ini.
        </p>
    </div>
</div>

<style>
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
    .tree-array-item.filled .tree-array-val {
        color: var(--color-status-success-text);
        border-color: var(--color-status-success);
        background: var(--color-status-success-soft);
    }
    .tree-array-item.active .tree-array-val {
        color: var(--color-link);
        border-color: var(--color-link);
        background: var(--color-status-info-soft);
        transform: scale(1.1);
    }
    .tree-array-note {
        font-size: 0.75rem;
        color: var(--color-ink-muted);
        font-style: italic;
        margin-top: 0.75rem;
    }
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
    }
    .array-idx {
        font-size: 0.7rem;
        color: var(--color-ink-muted);
        margin-top: 0.2rem;
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
    .tree-edge { transition: all 0.3s ease; }
    .tree-node circle { transition: all 0.3s ease; }

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

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
    }
</style>
