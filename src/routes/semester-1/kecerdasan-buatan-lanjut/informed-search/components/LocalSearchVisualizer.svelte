<script lang="ts">
    import { onMount } from 'svelte';
    import ThemeIcon from '$lib/components/ThemeIcon.svelte';

    let { type = 'HC' }: { type?: 'HC' | 'SA' } = $props();

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let width = 600;
    let height = 200;

    // Landscape function: y = sin(x/20) * 40 + sin(x/10) * 20
    function getY(x: number) {
        return Math.sin(x * 0.05) * 40 + Math.sin(x * 0.12) * 25 + height / 2;
    }

    let ballX = 50;
    let ballY = getY(ballX);
    let temp = 100;
    let isRunning = false;
    let iteration = 0;
    let status = "Klik Start untuk Simulasi";

    function reset() {
        ballX = 50 + Math.random() * 50;
        ballY = getY(ballX);
        temp = 100;
        iteration = 0;
        isRunning = false;
        status = "Reset Berhasil";
        draw();
    }

    function start() {
        if (isRunning) return;
        isRunning = true;
        status = type === 'HC' ? "Mencari Puncak Terdekat..." : "Eksplorasi (Suhu Tinggi)...";
        step();
    }

    function step() {
        if (!isRunning) return;

        let moved = false;
        const stepSize = 5;

        if (type === 'HC') {
            // Check left and right
            let leftX = ballX - stepSize;
            let rightX = ballX + stepSize;
            
            let currentVal = -getY(ballX); // Negative because canvas Y is inverted
            let leftVal = -getY(leftX);
            let rightVal = -getY(rightX);

            if (leftVal > currentVal || rightVal > currentVal) {
                ballX = leftVal > rightVal ? leftX : rightX;
                moved = true;
            } else {
                // Check if we are at the global maxima
                let maxVal = Infinity;
                let maxX = 0;
                for (let x = 0; x < width; x++) {
                    let y = getY(x);
                    if (y < maxVal) { maxVal = y; maxX = x; }
                }

                if (Math.abs(ballX - maxX) < 10) {
                    status = "Berhasil! Menemukan Global Maxima ✨";
                } else {
                    status = "Terjebak di Local Maxima! (Puncak Kecil) ⚠️";
                }
                isRunning = false;
            }
        } else {
            // Simulated Annealing
            let nextX = ballX + (Math.random() - 0.5) * 40 * (temp / 100 + 0.1);
            if (nextX < 20) nextX = 20;
            if (nextX > width - 20) nextX = width - 20;

            let currentVal = -getY(ballX);
            let nextVal = -getY(nextX);
            let delta = nextVal - currentVal;

            if (delta > 0) {
                ballX = nextX;
                moved = true;
            } else {
                // Probabilistic move
                let p = Math.exp(delta / temp);
                if (Math.random() < p) {
                    ballX = nextX;
                    moved = true;
                }
            }

            temp *= 0.98;
            if (temp < 0.5) {
                isRunning = false;
                status = "Suhu Dingin. Berhenti.";
            } else {
                status = temp > 50 ? "Mencari (Suhu Tinggi)" : "Menetap (Suhu Rendah)";
            }
        }

        ballY = getY(ballX);
        iteration++;
        draw();

        if (isRunning) {
            setTimeout(step, 50);
        }
    }

    function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        // Find the absolute highest peak (Global Maxima)
        let maxVal = Infinity;
        let maxX = 0;
        for (let x = 0; x < width; x++) {
            let y = getY(x);
            if (y < maxVal) { // Lower Y means higher on screen
                maxVal = y;
                maxX = x;
            }
        }

        // Draw Landscape
        ctx.beginPath();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
            if (x === 0) ctx.moveTo(x, getY(x));
            else ctx.lineTo(x, getY(x));
        }
        ctx.stroke();

        // Draw Goal (The Highest Peak)
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(maxX, maxVal, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px Inter';
        ctx.fillText('Global Maxima', maxX - 35, maxVal - 15);

        // Draw Ball
        ctx.fillStyle = type === 'HC' ? '#ef4444' : '#f59e0b';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label for the ball
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 12px Inter';
        ctx.fillText(type, ballX - 10, ballY - 15);
    }

    onMount(() => {
        ctx = canvas.getContext('2d')!;
        draw();
    });
</script>

<div class="local-search-container">
    <div class="vis-header">
        <div class="title-group">
            <span class="type-badge" class:hc={type === 'HC'} class:sa={type === 'SA'}>
                {type === 'HC' ? 'Hill Climbing' : 'Simulated Annealing'}
            </span>
            <span class="status-text">{status}</span>
        </div>
        <div class="controls">
            <button on:click={start} disabled={isRunning}>
                <ThemeIcon name="play" size={14} /> Start
            </button>
            <button on:click={reset} disabled={isRunning}>
                <ThemeIcon name="refresh" size={14} /> Reset
            </button>
        </div>
    </div>

    <div class="canvas-wrap">
        <canvas bind:this={canvas} {width} {height}></canvas>
        <div class="stats">
            <span>Iterasi: {iteration}</span>
            {#if type === 'SA'}
                <span>Suhu (T): {temp.toFixed(1)}°</span>
            {/if}
        </div>
    </div>

    <div class="info-box">
        {#if type === 'HC'}
            <p>🔴 <strong>Hill Climbing</strong> cuma liat langkah selanjutnya. Kalau lebih tinggi dia naik, kalau lebih rendah dia berhenti.</p>
        {:else}
            <p>🟠 <strong>Simulated Annealing</strong> berani lompat ke area yang lebih rendah (suhu tinggi) supaya nggak terjebak di puncak kecil.</p>
        {/if}
    </div>
</div>

<style>
    .local-search-container {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 16px;
        padding: 1.25rem;
        margin: 1rem 0;
    }
    .vis-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .type-badge {
        font-size: 0.75rem;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 20px;
        text-transform: uppercase;
        margin-right: 0.75rem;
    }
    .type-badge.hc { background: #fee2e2; color: #ef4444; }
    .type-badge.sa { background: #fef3c7; color: #d97706; }
    .status-text { font-size: 0.85rem; color: var(--color-ink-soft); font-style: italic; }

    .controls { display: flex; gap: 0.5rem; }
    .controls button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid var(--color-line);
        background: var(--color-surface-soft);
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }
    .controls button:hover:not(:disabled) { background: var(--color-line); transform: translateY(-1px); }
    .controls button:disabled { opacity: 0.5; cursor: not-allowed; }

    .canvas-wrap { position: relative; background: var(--color-surface-soft); border-radius: 12px; overflow: hidden; }
    canvas { width: 100%; display: block; }
    
    .stats {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        gap: 1rem;
        font-size: 0.7rem;
        font-family: var(--font-mono);
        background: rgba(255, 255, 255, 0.8);
        padding: 4px 8px;
        border-radius: 6px;
        color: #000;
    }

    .info-box {
        margin-top: 1rem;
        padding: 0.75rem;
        background: rgba(var(--color-binder-rgb), 0.05);
        border-radius: 8px;
        font-size: 0.85rem;
        line-height: 1.4;
    }
    .info-box p { margin: 0; }
</style>
