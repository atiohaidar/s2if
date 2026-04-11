<script lang="ts">
    type Point = { x: number; y: number };

    const data: Point[] = [
        { x: 1, y: 2.0 },
        { x: 2, y: 4.1 },
        { x: 3, y: 6.3 },
        { x: 4, y: 7.9 },
        { x: 5, y: 10.2 }
    ];

    let w = 1.5;
    let b = 0.3;
    let alpha = 0.01;
    let epochs = 200;

    let initialW = w;
    let initialB = b;

    let lossHistory: number[] = [];

    const chartW = 560;
    const chartH = 280;
    const pad = 36;

    function predict(x: number, weight: number, bias: number): number {
        return weight * x + bias;
    }

    function mse(points: Point[], weight: number, bias: number): number {
        const total = points.reduce((sum, p) => {
            const err = predict(p.x, weight, bias) - p.y;
            return sum + err * err;
        }, 0);

        return total / points.length;
    }

    function gradientStep(weight: number, bias: number): { w: number; b: number } {
        const m = data.length;
        let dw = 0;
        let db = 0;

        for (const p of data) {
            const err = predict(p.x, weight, bias) - p.y;
            dw += err * p.x;
            db += err;
        }

        dw = (2 / m) * dw;
        db = (2 / m) * db;

        return {
            w: weight - alpha * dw,
            b: bias - alpha * db
        };
    }

    function trainOneStep(): void {
        const next = gradientStep(w, b);
        w = next.w;
        b = next.b;
        lossHistory = [...lossHistory, mse(data, w, b)];
    }

    function trainMany(): void {
        const history: number[] = [];
        let weight = w;
        let bias = b;

        for (let i = 0; i < epochs; i += 1) {
            const next = gradientStep(weight, bias);
            weight = next.w;
            bias = next.b;
            history.push(mse(data, weight, bias));
        }

        w = weight;
        b = bias;
        lossHistory = history;
    }

    function resetModel(): void {
        w = initialW;
        b = initialB;
        lossHistory = [mse(data, w, b)];
    }

    const xMin = Math.min(...data.map((p) => p.x));
    const xMax = Math.max(...data.map((p) => p.x));

    $: predictions = data.map((p) => ({
        x: p.x,
        yTrue: p.y,
        yPred: predict(p.x, w, b),
        residual: p.y - predict(p.x, w, b)
    }));

    $: yMin = Math.min(...predictions.flatMap((p) => [p.yTrue, p.yPred])) - 0.6;
    $: yMax = Math.max(...predictions.flatMap((p) => [p.yTrue, p.yPred])) + 0.6;
    $: currentLoss = mse(data, w, b);

    $: lineY1 = predict(xMin, w, b);
    $: lineY2 = predict(xMax, w, b);

    $: residualMaxAbs = Math.max(0.25, ...predictions.map((p) => Math.abs(p.residual)));

    function sx(value: number): number {
        return pad + ((value - xMin) / (xMax - xMin || 1)) * (chartW - 2 * pad);
    }

    function sy(value: number): number {
        return chartH - pad - ((value - yMin) / (yMax - yMin || 1)) * (chartH - 2 * pad);
    }

    function sr(value: number): number {
        const rMin = -residualMaxAbs;
        const rMax = residualMaxAbs;
        return chartH - pad - ((value - rMin) / (rMax - rMin || 1)) * (chartH - 2 * pad);
    }

    function lx(index: number, total: number): number {
        if (total <= 1) return pad;
        return pad + (index / (total - 1)) * (chartW - 2 * pad);
    }

    function ly(value: number, maxValue: number): number {
        return chartH - pad - (value / (maxValue || 1)) * (chartH - 2 * pad);
    }

    $: if (lossHistory.length === 0) {
        lossHistory = [currentLoss];
    }
</script>

<div class="viz-wrap">
    <div class="controls">
        <label>
            w
            <input type="number" step="0.1" bind:value={w} />
        </label>
        <label>
            b
            <input type="number" step="0.1" bind:value={b} />
        </label>
        <label>
            alpha
            <input type="number" min="0.0001" step="0.001" bind:value={alpha} />
        </label>
        <label>
            epochs
            <input type="number" min="1" step="10" bind:value={epochs} />
        </label>
    </div>

    <div class="actions">
        <button type="button" on:click={trainOneStep}>1 Step</button>
        <button type="button" on:click={trainMany}>Train {epochs} Epoch</button>
        <button type="button" class="ghost" on:click={resetModel}>Reset</button>
    </div>

    <p class="stats">
        Model saat ini: y = {w.toFixed(3)}x + {b.toFixed(3)} | Loss (MSE): {currentLoss.toFixed(5)}
    </p>

    <h4>1) Scatter Data + Garis Prediksi</h4>
    <svg viewBox={`0 0 ${chartW} ${chartH}`} aria-label="Scatter dan garis prediksi">
        <line x1={pad} y1={chartH - pad} x2={chartW - pad} y2={chartH - pad} class="axis" />
        <line x1={pad} y1={pad} x2={pad} y2={chartH - pad} class="axis" />

        <line x1={sx(xMin)} y1={sy(lineY1)} x2={sx(xMax)} y2={sy(lineY2)} class="fit-line" />

        {#each predictions as p}
            <line x1={sx(p.x)} y1={sy(p.yTrue)} x2={sx(p.x)} y2={sy(p.yPred)} class="res-line" />
            <circle cx={sx(p.x)} cy={sy(p.yTrue)} r="4.5" class="dot-true" />
            <circle cx={sx(p.x)} cy={sy(p.yPred)} r="3.5" class="dot-pred" />
        {/each}
    </svg>

    <p class="legend">
        Titik biru = data asli, titik oranye = prediksi, garis tipis merah = residual.
    </p>

    <h4>2) Residual Plot (x vs y - y_hat)</h4>
    <svg viewBox={`0 0 ${chartW} ${chartH}`} aria-label="Residual plot">
        <line x1={pad} y1={chartH - pad} x2={chartW - pad} y2={chartH - pad} class="axis" />
        <line x1={pad} y1={pad} x2={pad} y2={chartH - pad} class="axis" />
        <line x1={pad} y1={sr(0)} x2={chartW - pad} y2={sr(0)} class="zero-line" />

        {#each predictions as p}
            <line x1={sx(p.x)} y1={sr(0)} x2={sx(p.x)} y2={sr(p.residual)} class="res-stick" />
            <circle cx={sx(p.x)} cy={sr(p.residual)} r="4.5" class="res-dot" />
        {/each}
    </svg>

    <h4>3) Loss vs Iterasi</h4>
    <svg viewBox={`0 0 ${chartW} ${chartH}`} aria-label="Loss vs iterasi">
        <line x1={pad} y1={chartH - pad} x2={chartW - pad} y2={chartH - pad} class="axis" />
        <line x1={pad} y1={pad} x2={pad} y2={chartH - pad} class="axis" />

        {#if lossHistory.length > 1}
            <polyline
                fill="none"
                class="loss-line"
                points={lossHistory
                    .map((v, i) => `${lx(i, lossHistory.length)},${ly(v, Math.max(...lossHistory))}`)
                    .join(" ")}
            />
        {/if}
    </svg>
</div>

<style>
    .viz-wrap {
        border: 1px solid var(--color-border, #d6c9b7);
        border-radius: 16px;
        padding: 1rem;
        background: color-mix(in oklab, var(--color-surface, #f8efdf) 95%, white);
    }

    .controls {
        display: grid;
        grid-template-columns: repeat(4, minmax(120px, 1fr));
        gap: 0.6rem;
        margin-bottom: 0.8rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.92rem;
        font-weight: 600;
    }

    input {
        border: 1px solid var(--color-border, #d6c9b7);
        border-radius: 10px;
        padding: 0.45rem 0.55rem;
        background: #fffdf8;
        color: inherit;
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.7rem;
    }

    button {
        border: 0;
        border-radius: 10px;
        padding: 0.45rem 0.75rem;
        cursor: pointer;
        font-weight: 600;
        background: #2f5a82;
        color: #f7fafc;
    }

    button.ghost {
        background: #866953;
    }

    .stats {
        margin: 0.3rem 0 0.9rem;
        font-weight: 600;
    }

    h4 {
        margin: 1rem 0 0.5rem;
        font-size: 1rem;
    }

    svg {
        width: 100%;
        border-radius: 12px;
        background: #fffdf9;
        border: 1px solid #dbc8ad;
    }

    .axis {
        stroke: #8e7a62;
        stroke-width: 1.3;
    }

    .fit-line {
        stroke: #b95b34;
        stroke-width: 2.2;
    }

    .dot-true {
        fill: #2f5a82;
    }

    .dot-pred {
        fill: #d7862f;
    }

    .res-line {
        stroke: #a73e3e;
        stroke-dasharray: 3 3;
    }

    .legend {
        margin: 0.45rem 0 0;
        font-size: 0.9rem;
    }

    .zero-line {
        stroke: #888;
        stroke-dasharray: 4 4;
    }

    .res-stick {
        stroke: #b45555;
        stroke-width: 2;
    }

    .res-dot {
        fill: #7f2f2f;
    }

    .loss-line {
        stroke: #2f7a52;
        stroke-width: 2.2;
    }

    @media (max-width: 768px) {
        .controls {
            grid-template-columns: repeat(2, minmax(120px, 1fr));
        }

        .viz-wrap {
            padding: 0.8rem;
        }
    }

    @media (max-width: 480px) {
        .controls {
            grid-template-columns: 1fr;
        }

        button {
            width: 100%;
        }
    }
</style>
