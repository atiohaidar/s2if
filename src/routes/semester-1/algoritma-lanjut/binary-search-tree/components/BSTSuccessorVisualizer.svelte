<script lang="ts">
    interface SNode {
        val: number;
        x: number;
        y: number;
        parent?: number;
        left?: number;
        right?: number;
    }

    const nodes: SNode[] = [
        { val: 15, x: 200, y: 40, right: 2, left: 1 },
        { val: 6,  x: 100, y: 110, parent: 0, left: 3, right: 4 },
        { val: 20, x: 300, y: 110, parent: 0, left: 5 },
        { val: 3,  x: 50,  y: 180, parent: 1 },
        { val: 7,  x: 150, y: 180, parent: 1 },
        { val: 18, x: 250, y: 180, parent: 2 },
    ];

    const edges: [number, number][] = [[0,1],[0,2],[1,3],[1,4],[2,5]];

    let targetIdx = $state(1); // Start with node 6
    let step = $state(0);
    let isPlaying = $state(false);
    let path = $state<number[]>([]);
    let logs = $state<string[]>([]);
    let foundIdx = $state(-1);

    function findSuccessor() {
        if (isPlaying) return;
        isPlaying = true;
        path = [targetIdx];
        logs = [`Mencari suksesor dari simpul ${nodes[targetIdx].val}...`];
        step = 0;
        foundIdx = -1;

        let node = nodes[targetIdx];
        let currSteps: {idx: number, log: string, isFinal: boolean}[] = [];

        if (node.right !== undefined) {
            currSteps.push({ idx: targetIdx, log: `Punya anak kanan (${nodes[node.right].val}). Suksesor adalah NILAI MINIMUM di sub-pohon kanan.`, isFinal: false });
            let curr: number | undefined = node.right;
            while (curr !== undefined) {
                const cIdx: number = curr;
                currSteps.push({ idx: cIdx, log: `Cek ${nodes[cIdx].val}...`, isFinal: false });
                if (nodes[cIdx].left !== undefined) {
                    curr = nodes[cIdx].left;
                } else {
                    currSteps.push({ idx: cIdx, log: `Ketemu! Suksesor adalah ${nodes[cIdx].val}.`, isFinal: true });
                    break;
                }
            }
        } else {
            currSteps.push({ idx: targetIdx, log: `Tidak punya anak kanan. Naik ke atas (parent) mencari belokan kanan pertama.`, isFinal: false });
            let curr: number = targetIdx;
            let p: number | undefined = nodes[curr].parent;
            while (p !== undefined && nodes[p].right === curr) {
                const pIdx: number = p;
                currSteps.push({ idx: pIdx, log: `${nodes[curr].val} adalah anak KANAN dari ${nodes[pIdx].val}. Naik lagi...`, isFinal: false });
                curr = pIdx;
                p = nodes[pIdx].parent;
            }
            if (p !== undefined) {
                const pIdx: number = p;
                currSteps.push({ idx: pIdx, log: `${nodes[curr].val} adalah anak KIRI dari ${nodes[pIdx].val}. Ketemu! Suksesor adalah ${nodes[pIdx].val}.`, isFinal: true });
            } else {
                currSteps.push({ idx: -1, log: `Sudah sampai akar dan tidak ada lagi. Simpul ini adalah nilai terbesar (tidak punya suksesor).`, isFinal: true });
            }
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < currSteps.length) {
                let s = currSteps[i];
                if (s.idx !== -1) {
                    if (!path.includes(s.idx)) path = [...path, s.idx];
                    step = s.idx;
                }
                logs = [...logs, s.log];
                if (s.isFinal) foundIdx = s.idx;
                i++;
            } else {
                clearInterval(interval);
                isPlaying = false;
            }
        }, 1200);
    }

    function reset() {
        step = 0;
        isPlaying = false;
        path = [];
        logs = [];
        foundIdx = -1;
    }
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>⏭️ Visualisasi Successor (Penerus)</h4>
        <div class="viz-controls">
            <label>Cari suksesor dari:</label>
            <select bind:value={targetIdx} disabled={isPlaying} onchange={reset}>
                {#each nodes as n, i}<option value={i}>{n.val}</option>{/each}
            </select>
            <button class="viz-btn primary" onclick={findSuccessor} disabled={isPlaying}>▶ Cari</button>
            <button class="viz-btn secondary" onclick={reset} disabled={isPlaying}>↺ Reset</button>
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 230">
                {#each edges as [f, t]}
                    <line x1={nodes[f].x} y1={nodes[f].y} x2={nodes[t].x} y2={nodes[t].y} stroke="var(--color-note-lines)" stroke-width="1.5" />
                {/each}

                {#each nodes as node, i}
                    {@const isTarget = targetIdx === i}
                    {@const isCurrent = step === i && isPlaying}
                    {@const isFound = foundIdx === i}
                    {@const isOnPath = path.includes(i)}
                    <g transform="translate({node.x}, {node.y})">
                        <circle r="20" 
                            fill={isFound ? "var(--color-status-success-soft)" : isCurrent ? "var(--color-link)" : isTarget ? "var(--color-status-warning-soft)" : isOnPath ? "var(--color-status-info-soft)" : "var(--color-surface-elevated)"} 
                            stroke={isFound ? "var(--color-status-success-border)" : isCurrent ? "var(--color-link)" : isTarget ? "var(--color-status-warning-border)" : "var(--color-note-lines)"} 
                            stroke-width="2.5" />
                        <text dy="5" text-anchor="middle" font-weight="700" font-size="14" fill={isCurrent && !isFound ? "var(--color-text-on-accent)" : "var(--color-ink-strong)"}>{node.val}</text>
                        {#if isTarget}<text y="-25" text-anchor="middle" font-size="9" font-weight="700" fill="var(--color-status-warning-text)">TARGET</text>{/if}
                        {#if isFound}<text y="-25" text-anchor="middle" font-size="9" font-weight="700" fill="var(--color-status-success-text)">SUCCESSOR</text>{/if}
                    </g>
                {/each}
            </svg>
        </div>

        <div class="log-panel">
            <div class="log-title">📋 Log Pencarian Successor</div>
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
    .log-title { font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem; border-bottom: 1px dashed var(--color-line); padding-bottom: 0.5rem; }
    .log-entries { flex: 1; overflow-y: auto; max-height: 180px; display: flex; flex-direction: column; gap: 0.35rem; }
    .log-entry { padding: 0.3rem 0.5rem; border-radius: 6px; font-size: 0.8rem; background: var(--color-surface-soft); }
    .log-entry.latest { background: var(--color-status-info-soft); font-weight: 600; }
    .log-entry.success { background: var(--color-status-success-soft); }
    .viz-btn { border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
    .viz-btn.primary { background: var(--color-link); color: var(--color-text-on-accent); }
    .viz-btn.secondary { background: var(--color-surface); border: 1px solid var(--color-line); }
</style>
