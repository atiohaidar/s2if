<script lang="ts">
    // Menggunakan Svelte 5 Runes agar konsisten dengan komponen lain
    let low = $state(0);
    let high = $state(7);
    let mid = $state(-1);
    let ans = $state(-1);
    let step = $state(0);
    let k = $state(5);
    let finished = $state(false);
    let message = $state('Klik "Mulai" untuk mencari elemen ke-k');

    // Data tetap untuk visualisasi
    const cumFreq = [1, 3, 7, 8, 9, 10, 10, 10];
    const K = 7;

    let stepHistory = $state<Array<{
        low: number;
        high: number;
        mid: number;
        ans: number;
        message: string;
        finished: boolean;
    }>>([]);

    function recordStep(msg: string) {
        stepHistory.push({
            low,
            high,
            mid,
            ans,
            message: msg,
            finished
        });
    }

    function reset() {
        low = 0;
        high = 7;
        mid = -1;
        ans = -1;
        step = 0;
        finished = false;
        stepHistory = [];
        message = 'Masukkan nilai k, lalu klik "Mulai"';
    }

    function start() {
        reset();
        recordStep('Siap mencari elemen ke-' + k);
        message = `Mencari nilai data ke-${k} (Median dari 10 data)`;
    }

    function setMedian() {
        k = 5;
        start();
    }

    function nextStep() {
        if (finished) return;

        if (low <= high) {
            mid = Math.floor((low + high) / 2);
            
            let msg = "";
            if (cumFreq[mid] >= k) {
                ans = mid;
                msg = `C[${mid}] (${cumFreq[mid]}) >= ${k}. Simpan ans=${mid}, persempit ke kiri (high=${mid - 1})`;
                high = mid - 1;
            } else {
                msg = `C[${mid}] (${cumFreq[mid]}) < ${k}. Nilai target lebih besar, geser ke kanan (low=${mid + 1})`;
                low = mid + 1;
            }
            
            step++;
            message = msg;
            recordStep(msg);

            if (low > high) {
                finished = true;
                message = `SELESAI! Elemen ke-${k} ditemukan pada nilai: ${ans}`;
            }
        }
    }

    function prevStep() {
        if (stepHistory.length > 1) {
            stepHistory.pop();
            const prev = stepHistory[stepHistory.length - 1];
            low = prev.low;
            high = prev.high;
            mid = prev.mid;
            ans = prev.ans;
            message = prev.message;
            finished = prev.finished;
            step--;
        }
    }
</script>

<div class="visualizer-box">
    <div class="controls">
        <div class="input-inline">
            <label for="k-val">Target k: </label>
            <input type="number" id="k-val" bind:value={k} min="1" max="10" disabled={step > 0} />
        </div>
        <button onclick={setMedian} disabled={step > 0 && !finished} class="median-btn">Mencari Median (k=5)</button>
        <button onclick={start} disabled={step > 0 && !finished}>▶ Mulai (Custom k)</button>
        <button onclick={nextStep} disabled={finished || stepHistory.length === 0}>→ Next</button>
        <button onclick={prevStep} disabled={stepHistory.length <= 1}>← Prev</button>
        <button onclick={reset}>↻ Reset</button>
        <span class="step-info">Step: {step}</span>
    </div>

    <div class="message-box">
        <strong>{message}</strong>
    </div>

    <div class="arrays-section">
        <div class="array-group">
            <h4>Array Frekuensi Kumulatif (C)</h4>
            <div class="array-display">
                {#each cumFreq as val, i}
                    {@const isMid = i === mid}
                    {@const inRange = i >= low && i <= high}
                    {@const isAns = i === ans && finished}
                    <div class="cell" class:highlight={isMid} class:in-range={inRange && !finished} class:filled={isAns}>
                        {val}
                    </div>
                {/each}
            </div>
            <div class="label-row">
                {#each cumFreq as _, i}
                    <span class="label" class:active-label={i === low || i === high || i === mid}>
                        {i}
                        {#if i === low}<br/><small>Low</small>{/if}
                        {#if i === high}<br/><small>High</small>{/if}
                        {#if i === mid}<br/><small>Mid</small>{/if}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .visualizer-box {
        border: 2px solid var(--color-link);
        border-radius: 8px;
        padding: 20px;
        background-color: var(--color-surface-alt);
        margin: 20px 0;
        font-family: var(--font-mono);
    }

    .controls {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        flex-wrap: wrap;
        align-items: center;
    }

    .input-inline {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-right: 10px;
    }

    input[type="number"] {
        width: 50px;
        padding: 4px;
        background: var(--color-surface);
        border: 1px solid var(--color-line);
        color: var(--color-ink);
        border-radius: 4px;
    }

    button {
        padding: 8px 16px;
        font-size: 14px;
        border: 1px solid var(--color-link);
        background-color: var(--color-link);
        color: var(--color-surface);
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s, opacity 0.2s;
    }

    .median-btn {
        background-color: var(--color-status-success-border) !important;
        border-color: var(--color-status-success-text) !important;
    }

    button:hover:not(:disabled) {
        opacity: 0.9;
    }

    button:disabled {
        background-color: var(--color-status-neutral-border);
        border-color: var(--color-status-neutral-border);
        cursor: not-allowed;
        opacity: 0.7;
    }

    .step-info {
        padding: 8px 16px;
        background-color: var(--color-status-neutral-soft);
        color: var(--color-ink);
        border-radius: 4px;
        font-weight: bold;
    }

    .message-box {
        background-color: var(--color-callout-info-start, #e7f3ff);
        border-left: 4px solid var(--color-callout-info-border, #3b82f6);
        padding: 12px;
        margin-bottom: 15px;
        border-radius: 4px;
        color: var(--color-ink);
    }

    .array-group {
        background-color: var(--color-surface-elevated);
        padding: 15px;
        border-radius: 4px;
        border: 1px solid var(--color-line);
    }

    .array-group h4 {
        margin: 0 0 10px 0;
        color: var(--color-ink-strong);
        font-size: 14px;
    }

    .array-display {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
    }

    .cell {
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--color-line);
        border-radius: 4px;
        background-color: var(--color-surface);
        color: var(--color-ink);
        font-weight: bold;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .cell.highlight {
        background-color: var(--color-status-info-border, #3b82f6);
        color: white;
        border-color: #2563eb;
        transform: scale(1.1);
        z-index: 2;
    }

    .cell.in-range {
        border-color: var(--color-link);
        background-color: rgba(var(--color-link-rgb), 0.1);
    }

    .cell.filled {
        background-color: var(--color-status-success-border);
        color: white;
        border-color: var(--color-status-success-text);
    }

    .label-row {
        display: flex;
        gap: 8px;
        margin-top: 8px;
        align-items: flex-start;
    }

    .label {
        width: 45px;
        text-align: center;
        font-size: 11px;
        color: var(--color-ink-soft);
        font-weight: bold;
        line-height: 1.2;
    }

    .active-label {
        color: var(--color-link);
    }
</style>
