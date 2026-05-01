<script lang="ts">
    interface RankNode {
        val: number;
        size: number;
        x: number;
        y: number;
        leftIdx: number;
        rightIdx: number;
    }

    const nodes: RankNode[] = [
        { val: 15, size: 6, x: 200, y: 40, leftIdx: 1, rightIdx: 2 },
        { val: 6,  size: 3, x: 100, y: 110, leftIdx: 3, rightIdx: 4 },
        { val: 20, size: 2, x: 300, y: 110, leftIdx: 5, rightIdx: -1 },
        { val: 3,  size: 1, x: 50,  y: 180, leftIdx: -1, rightIdx: -1 },
        { val: 7,  size: 1, x: 150, y: 180, leftIdx: -1, rightIdx: -1 },
        { val: 18, size: 1, x: 250, y: 180, leftIdx: -1, rightIdx: -1 },
    ];

    const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]];

    let targetRank = $state(4);
    let currentStep = $state(-1);
    let isPlaying = $state(false);
    let logs = $state<string[]>([]);
    let path = $state<number[]>([]);

    function runRankSearch() {
        if (isPlaying) return;
        isPlaying = true;
        path = [];
        logs = [];
        currentStep = -1;

        let k = targetRank;
        let idx = 0;
        let steps: {idx: number, log: string, k: number}[] = [];

        while (idx >= 0) {
            let leftIdx = nodes[idx].leftIdx;
            let leftSize = leftIdx >= 0 ? nodes[leftIdx].size : 0;
            let rank = leftSize + 1;

            steps.push({ idx, log: `Cek simpul ${nodes[idx].val}. Peringkat lokal = ${leftSize} (kiri) + 1 = ${rank}`, k });

            if (k === rank) {
                steps.push({ idx, log: `Peringkat lokal (${rank}) == target (${k}). Ketemu!`, k });
                break;
            } else if (k < rank) {
                steps.push({ idx, log: `Target ${k} < ${rank}. Cari di sub-pohon KIRI.`, k });
                idx = leftIdx;
            } else {
                steps.push({ idx, log: `Target ${k} > ${rank}. Cari di sub-pohon KANAN. Update k: ${k} - ${rank} = ${k - rank}`, k });
                k -= rank;
                idx = nodes[idx].rightIdx;
            }
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                currentStep = steps[i].idx;
                logs = [...logs, steps[i].log];
                if (!path.includes(currentStep)) path = [...path, currentStep];
                i++;
            } else {
                clearInterval(interval);
                isPlaying = false;
            }
        }, 1200);
    }

    function reset() {
        currentStep = -1;
        isPlaying = false;
        logs = [];
        path = [];
    }
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>📊 Visualisasi Rank Search (K-th Smallest)</h4>
        <div class="viz-controls">
            <label for="rank-val">Cari Peringkat ke-:</label>
            <select id="rank-val" bind:value={targetRank} disabled={isPlaying}>
                {#each [1, 2, 3, 4, 5, 6] as r}
                    <option value={r}>{r}</option>
                {/each}
            </select>
            <button class="viz-btn primary" onclick={runRankSearch} disabled={isPlaying}>
                {isPlaying ? '⏳ Mencari...' : '▶ Cari'}
            </button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid meet">
                {#each edges as [from, to]}
                    <line x1={nodes[from].x} y1={nodes[from].y} x2={nodes[to].x} y2={nodes[to].y} stroke="var(--color-note-lines)" stroke-width="1.5" />
                {/each}

                {#each nodes as node, idx}
                    {@const isCurrent = currentStep === idx}
                    {@const isOnPath = path.includes(idx)}
                    <g class="tree-node">
                        <circle cx={node.x} cy={node.y} r="20" 
                            fill={isCurrent ? "var(--color-link)" : isOnPath ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"} 
                            stroke={isCurrent ? "var(--color-link)" : isOnPath ? "var(--color-status-info-border)" : "var(--color-note-lines)"} 
                            stroke-width="2.5" />
                        <text x={node.x} y={node.y} dy="5" text-anchor="middle" 
                            fill={isCurrent ? "var(--color-text-on-accent)" : "var(--color-ink-strong)"} 
                            font-weight="700" font-size="14">{node.val}</text>
                        <!-- Size Label -->
                        <rect x={node.x + 12} y={node.y + 12} width="18" height="18" rx="4" fill="var(--color-surface-soft)" stroke="var(--color-line)" />
                        <text x={node.x + 21} y={node.y + 25} text-anchor="middle" font-size="10" font-weight="700" fill="var(--color-primary)">{node.size}</text>
                    </g>
                {/each}
            </svg>
            <div class="legend">
                <span class="legend-item"><span class="box"></span> Size sub-pohon</span>
            </div>
        </div>

        <div class="log-panel">
            <div class="log-title">📋 Proses Penentuan Peringkat</div>
            <div class="log-entries">
                {#if logs.length === 0}
                    <p class="log-empty">Pilih peringkat (k) dan klik "Cari".</p>
                {:else}
                    {#each logs as log, i}
                        <div class="log-entry" class:latest={i === logs.length - 1} class:success={log.includes('Ketemu')}>
                            <span class="log-text">{log}</span>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .viz-container { background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0; }
    .viz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .viz-controls { display: flex; align-items: center; gap: 0.5rem; }
    .viz-body { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 640px) { .viz-body { grid-template-columns: 1fr; } }
    .tree-canvas { background: var(--color-surface); border-radius: 8px; border: 1px solid var(--color-line); padding: 0.5rem; position: relative; }
    .log-panel { background: var(--color-surface); border-radius: 8px; border: 1px solid var(--color-line); padding: 0.75rem; display: flex; flex-direction: column; }
    .log-title { font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem; border-bottom: 1px dashed var(--color-line); }
    .log-entries { flex: 1; overflow-y: auto; max-height: 180px; display: flex; flex-direction: column; gap: 0.35rem; }
    .log-entry { padding: 0.3rem 0.5rem; border-radius: 6px; font-size: 0.8rem; background: var(--color-surface-soft); }
    .log-entry.latest { background: var(--color-status-info-soft); font-weight: 600; }
    .log-entry.success { background: var(--color-status-success-soft); color: var(--color-status-success-text); }
    .viz-btn { border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
    .viz-btn.primary { background: var(--color-link); color: var(--color-text-on-accent); }
    .viz-btn.secondary { background: var(--color-surface); border: 1px solid var(--color-line); }
    .legend { position: absolute; bottom: 10px; right: 10px; font-size: 0.75rem; color: var(--color-ink-muted); }
    .box { display: inline-block; width: 10px; height: 10px; background: var(--color-surface-soft); border: 1px solid var(--color-line); margin-right: 4px; }
</style>
