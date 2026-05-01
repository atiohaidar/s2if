<script lang="ts">
    type Point = { x: number; y: number };

    let data: Point[] = [
        { x: 10, y: 15 },
        { x: 20, y: 25 },
        { x: 30, y: 35 },
        { x: 40, y: 45 },
        { x: 50, y: 55 }
    ];

    const chartW = 500;
    const chartH = 300;
    const pad = 40;

    function calculatePearson(pts: Point[]): number {
        const n = pts.length;
        if (n < 2) return 0;

        const meanX = pts.reduce((sum, p) => sum + p.x, 0) / n;
        const meanY = pts.reduce((sum, p) => sum + p.y, 0) / n;

        let num = 0;
        let denX = 0;
        let denY = 0;

        for (const p of pts) {
            const dx = p.x - meanX;
            const dy = p.y - meanY;
            num += dx * dy;
            denX += dx * dx;
            denY += dy * dy;
        }

        const den = Math.sqrt(denX * denY);
        return den === 0 ? 0 : num / den;
    }

    $: r = calculatePearson(data);

    function setPreset(type: 'pos' | 'neg' | 'none' | 'perfect') {
        if (type === 'perfect') {
            data = [
                { x: 10, y: 10 },
                { x: 20, y: 20 },
                { x: 30, y: 30 },
                { x: 40, y: 40 },
                { x: 50, y: 50 }
            ];
        } else if (type === 'pos') {
            data = [
                { x: 10, y: 12 },
                { x: 20, y: 28 },
                { x: 30, y: 32 },
                { x: 40, y: 48 },
                { x: 50, y: 52 }
            ];
        } else if (type === 'neg') {
            data = [
                { x: 10, y: 50 },
                { x: 20, y: 38 },
                { x: 30, y: 32 },
                { x: 40, y: 22 },
                { x: 50, y: 10 }
            ];
        } else {
            data = Array.from({ length: 6 }, (_, i) => ({
                x: 10 + i * 8,
                y: 10 + Math.random() * 40
            }));
        }
    }

    function sx(val: number) {
        return pad + (val / 60) * (chartW - 2 * pad);
    }
    function sy(val: number) {
        return chartH - pad - (val / 60) * (chartH - 2 * pad);
    }

    let draggingIdx: number | null = null;
    let svgEl: SVGSVGElement;

    function handleMouseDown(i: number) {
        draggingIdx = i;
    }

    function handleMouseMove(e: MouseEvent) {
        if (draggingIdx === null) return;
        const rect = svgEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Reverse sx and sy
        const xVal = ((mouseX - pad) / (chartW - 2 * pad)) * 60;
        const yVal = ((chartH - pad - mouseY) / (chartH - 2 * pad)) * 60;

        data[draggingIdx] = {
            x: Math.max(0, Math.min(60, xVal)),
            y: Math.max(0, Math.min(60, yVal))
        };
    }

    function handleGlobalUp() {
        draggingIdx = null;
    }
</script>

<svelte:window on:mouseup={handleGlobalUp} on:mousemove={handleMouseMove} />

<div class="viz-container">
    <div class="header">
        <div class="r-value" class:positive={r > 0.5} class:negative={r < -0.5} class:neutral={Math.abs(r) <= 0.5}>
            r = {r.toFixed(4)}
        </div>
        <div class="interpretation">
            {#if r > 0.9} Sangat Kuat (Positif)
            {:else if r > 0.7} Kuat (Positif)
            {:else if r > 0.3} Moderat (Positif)
            {:else if r > -0.3} Lemah / Tidak Ada
            {:else if r > -0.7} Moderat (Negatif)
            {:else if r > -0.9} Kuat (Negatif)
            {:else} Sangat Kuat (Negatif)
            {/if}
        </div>
    </div>

    <svg 
        bind:this={svgEl}
        viewBox="0 0 {chartW} {chartH}"
        class:dragging={draggingIdx !== null}
    >
        <!-- Grid -->
        {#each Array(7) as _, i}
            {@const val = i * 10}
            <line x1={sx(val)} y1={pad} x2={sx(val)} y2={chartH - pad} stroke="#e2e8f0" stroke-width="1" />
            <line x1={pad} y1={sy(val)} x2={chartW - pad} y2={sy(val)} stroke="#e2e8f0" stroke-width="1" />
            <text x={sx(val)} y={chartH - pad + 15} font-size="10" text-anchor="middle" fill="#94a3b8">{val}</text>
            <text x={pad - 10} y={sy(val) + 4} font-size="10" text-anchor="end" fill="#94a3b8">{val}</text>
        {/each}

        <!-- Axes -->
        <line x1={pad} y1={chartH - pad} x2={chartW - pad} y2={chartH - pad} stroke="#475569" stroke-width="2" />
        <line x1={pad} y1={pad} x2={pad} y2={chartH - pad} stroke="#475569" stroke-width="2" />

        <!-- Points -->
        {#each data as p, i}
            <circle 
                cx={sx(p.x)} 
                cy={sy(p.y)} 
                r={draggingIdx === i ? 8 : 6}
                class="point"
                class:active={draggingIdx === i}
                on:mousedown={() => handleMouseDown(i)}
            />
        {/each}
    </svg>

    <div class="controls">
        <button on:click={() => setPreset('perfect')}>Perfect Positive</button>
        <button on:click={() => setPreset('pos')}>Strong Positive</button>
        <button on:click={() => setPreset('neg')}>Strong Negative</button>
        <button on:click={() => setPreset('none')}>Random</button>
    </div>
    <p class="hint">Geser titik-titik di atas untuk melihat perubahan nilai r secara real-time.</p>
</div>

<style>
    .viz-container {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .r-value {
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.5rem;
        font-weight: 700;
        padding: 0.5rem 1rem;
        border-radius: 8px;
    }

    .positive { background: #dcfce7; color: #166534; }
    .negative { background: #fee2e2; color: #991b1b; }
    .neutral { background: #f1f5f9; color: #475569; }

    .interpretation {
        font-weight: 600;
        color: #64748b;
    }

    svg {
        width: 100%;
        height: auto;
        cursor: crosshair;
        overflow: visible;
    }

    svg.dragging {
        cursor: grabbing;
    }

    .point {
        fill: #3b82f6;
        stroke: white;
        stroke-width: 2;
        cursor: grab;
        transition: r 0.2s, fill 0.2s;
    }

    .point:hover {
        fill: #2563eb;
        r: 8;
    }

    .point.active {
        fill: #1d4ed8;
        cursor: grabbing;
    }

    .controls {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        flex-wrap: wrap;
    }

    button {
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
        background: white;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    button:hover {
        background: #f8fafc;
        border-color: #94a3b8;
    }

    .hint {
        font-size: 0.8rem;
        color: #94a3b8;
        margin-top: 0.5rem;
        text-align: center;
    }
</style>
