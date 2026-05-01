<script lang="ts">
    interface LCANode {
        val: number;
        x: number;
        y: number;
        leftIdx: number;
        rightIdx: number;
    }

    const nodes: LCANode[] = [
        { val: 15, x: 200, y: 40, leftIdx: 1, rightIdx: 2 },
        { val: 6,  x: 100, y: 110, leftIdx: 3, rightIdx: 4 },
        { val: 20, x: 300, y: 110, leftIdx: 5, rightIdx: -1 },
        { val: 3,  x: 50,  y: 180, leftIdx: -1, rightIdx: -1 },
        { val: 7,  x: 150, y: 180, leftIdx: -1, rightIdx: -1 },
        { val: 18, x: 250, y: 180, leftIdx: -1, rightIdx: -1 },
    ];

    const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]];

    let u = $state(3);
    let v = $state(7);
    let currentIdx = $state(-1);
    let lcaIdx = $state(-1);
    let isPlaying = $state(false);
    let logs = $state<string[]>([]);

    function findLCA() {
        if (isPlaying) return;
        isPlaying = true;
        logs = [];
        currentIdx = 0;
        lcaIdx = -1;

        let valU = Math.min(u, v);
        let valV = Math.max(u, v);
        
        let steps: {idx: number, log: string, found: boolean}[] = [];
        let curr = 0;

        while (curr !== -1) {
            let nodeVal = nodes[curr].val;
            steps.push({ idx: curr, log: `Cek simpul ${nodeVal}.`, found: false });

            if (nodeVal > valV) {
                steps.push({ idx: curr, log: `${nodeVal} > max(${valU}, ${valV}). Ke KIRI.`, found: false });
                curr = nodes[curr].leftIdx;
            } else if (nodeVal < valU) {
                steps.push({ idx: curr, log: `${nodeVal} < min(${valU}, ${valV}). Ke KANAN.`, found: false });
                curr = nodes[curr].rightIdx;
            } else {
                steps.push({ idx: curr, log: `${valU} ≤ ${nodeVal} ≤ ${valV}. Ketemu LCA!`, found: true });
                break;
            }
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                currentIdx = steps[i].idx;
                logs = [...logs, steps[i].log];
                if (steps[i].found) lcaIdx = currentIdx;
                i++;
            } else {
                clearInterval(interval);
                isPlaying = false;
            }
        }, 1200);
    }

    function reset() {
        currentIdx = -1;
        lcaIdx = -1;
        isPlaying = false;
        logs = [];
    }
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>🤝 Visualisasi Lowest Common Ancestor (LCA)</h4>
        <div class="viz-controls">
            <label>u:</label>
            <select bind:value={u} disabled={isPlaying}>
                {#each nodes as n}<option value={n.val}>{n.val}</option>{/each}
            </select>
            <label>v:</label>
            <select bind:value={v} disabled={isPlaying}>
                {#each nodes as n}<option value={n.val}>{n.val}</option>{/each}
            </select>
            <button class="viz-btn primary" onclick={findLCA} disabled={isPlaying}>▶ Cari LCA</button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 230">
                {#each edges as [f, t]}
                    <line x1={nodes[f].x} y1={nodes[f].y} x2={nodes[t].x} y2={nodes[t].y} stroke="var(--color-note-lines)" stroke-width="1.5" />
                {/each}

                {#each nodes as node, idx}
                    {@const isU = node.val === u}
                    {@const isV = node.val === v}
                    {@const isLCA = lcaIdx === idx}
                    {@const isCurrent = currentIdx === idx}
                    <g transform="translate({node.x}, {node.y})">
                        <circle r="20" 
                            fill={isLCA ? "var(--color-status-success-soft)" : isCurrent ? "var(--color-link)" : isU || isV ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"} 
                            stroke={isLCA ? "var(--color-status-success-border)" : isCurrent ? "var(--color-link)" : isU || isV ? "var(--color-status-info-border)" : "var(--color-note-lines)"} 
                            stroke-width="2.5" />
                        <text dy="5" text-anchor="middle" font-weight="700" font-size="14" fill={isCurrent && !isLCA ? "var(--color-text-on-accent)" : "var(--color-ink-strong)"}>{node.val}</text>
                        {#if isU}<text y="35" text-anchor="middle" font-size="10" font-weight="700" fill="var(--color-link)">u</text>{/if}
                        {#if isV}<text y={isU ? 45 : 35} text-anchor="middle" font-size="10" font-weight="700" fill="var(--color-link)">v</text>{/if}
                    </g>
                {/each}
            </svg>
        </div>

        <div class="log-panel">
            <div class="log-title">📋 Algoritma LCA pada BST</div>
            <p class="desc">LCA adalah simpul pertama dimana jalur u dan v memisah.</p>
            <div class="log-entries">
                {#each logs as log, i}
                    <div class="log-entry" class:latest={i === logs.length - 1} class:success={log.includes('Ketemu')}>
                        {log}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .viz-container { background: var(--color-surface-soft); border: 1px solid var(--color-line); border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0; }
    .viz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
    .viz-controls { display: flex; align-items: center; gap: 0.5rem; }
    .viz-body { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 640px) { .viz-body { grid-template-columns: 1fr; } }
    .tree-canvas { background: var(--color-surface); border-radius: 8px; border: 1px solid var(--color-line); padding: 0.5rem; }
    .log-panel { background: var(--color-surface); border-radius: 8px; border: 1px solid var(--color-line); padding: 0.75rem; display: flex; flex-direction: column; }
    .log-title { font-weight: 700; font-size: 0.85rem; margin-bottom: 0.25rem; }
    .desc { font-size: 0.75rem; color: var(--color-ink-soft); margin-bottom: 0.5rem; border-bottom: 1px dashed var(--color-line); padding-bottom: 0.5rem; }
    .log-entries { flex: 1; overflow-y: auto; max-height: 150px; display: flex; flex-direction: column; gap: 0.35rem; }
    .log-entry { padding: 0.3rem 0.5rem; border-radius: 6px; font-size: 0.8rem; background: var(--color-surface-soft); }
    .log-entry.latest { background: var(--color-status-info-soft); font-weight: 600; }
    .log-entry.success { background: var(--color-status-success-soft); color: var(--color-status-success-text); }
    .viz-btn { border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
    .viz-btn.primary { background: var(--color-link); color: var(--color-text-on-accent); }
    .viz-btn.secondary { background: var(--color-surface); border: 1px solid var(--color-line); }
</style>
