<script lang="ts">
    let phase = $state<'init' | 'frequency' | 'cumulative' | 'placement' | 'done'>('init');
    let step = $state(0);
    let stepHistory = $state<
        Array<{
            phase: string;
            A: number[];
            C: number[];
            B: number[];
            currentIdx: number;
            message: string;
            placementMode: 'decrement' | 'place';
            pendingVal: number | null;
            pendingPos: number | null;
        }>
    >([]);

    // Data awal
    const A = [3, 1, 2, 3, 0, 1];
    const K = 3;
    let C = $state<number[]>([0, 0, 0, 0]);
    let B = $state<number[]>(Array(A.length).fill(-1));
    let currentIdx = $state(-1);
    let placementMode = $state<'decrement' | 'place'>('decrement');
    let pendingVal = $state<number | null>(null);
    let pendingPos = $state<number | null>(null);
    let message = $state('Klik "Mulai" untuk memulai visualisasi');

    function recordStep(phaseStr: string, msg: string) {
        stepHistory.push({
            phase: phaseStr,
            A: [...A],
            C: [...C],
            B: [...B],
            currentIdx: currentIdx,
            message: msg,
            placementMode,
            pendingVal,
            pendingPos,
        });
    }

    function reset() {
        phase = 'init';
        step = 0;
        C = [0, 0, 0, 0];
        B = Array(A.length).fill(-1);
        currentIdx = -1;
        placementMode = 'decrement';
        pendingVal = null;
        pendingPos = null;
        stepHistory = [];
        message = 'Klik "Mulai" untuk memulai visualisasi';
    }

    function start() {
        phase = 'frequency';
        step = 0;
        C = [0, 0, 0, 0];
        B = Array(A.length).fill(-1);
        currentIdx = -1;
        placementMode = 'decrement';
        pendingVal = null;
        pendingPos = null;
        stepHistory = [];
        recordStep('init', 'Siap menghitung frekuensi...');
        message = 'TAHAP 1: Hitung Frekuensi. Tekan "Next" untuk lanjut.';
    }

    function nextStep() {
        if (phase === 'frequency') {
            if (currentIdx < A.length - 1) {
                currentIdx++;
                const val = A[currentIdx];
                C[val]++;
                recordStep(`frequency_${currentIdx}`, `Elemen A[${currentIdx}]=${val}, C[${val}] ditambah -> C=${C}`);
                message = `Proses A[${currentIdx}]=${val}: C[${val}]++`;
                step++;
            } else {
                // Selesai frequency, lanjut cumulative
                phase = 'cumulative';
                // Mulai dari indeks 1 karena C[0] tidak perlu dijumlahkan dengan elemen sebelumnya.
                currentIdx = 1;
                recordStep('frequency_done', `Frekuensi selesai: C=${C}`);
                message = 'TAHAP 2: Ubah ke Kumulatif. Tekan "Next" untuk lanjut.';
            }
        } else if (phase === 'cumulative') {
            if (currentIdx <= K) {
                C[currentIdx] += C[currentIdx - 1];
                recordStep(
                    `cumulative_${currentIdx}`,
                    `C[${currentIdx}] += C[${currentIdx - 1}] -> C=${C}`
                );
                message = `Update C[${currentIdx}]: C[${currentIdx}] += C[${currentIdx - 1}]`;
                currentIdx++;
                step++;
            } else {
                // Selesai cumulative, lanjut placement
                phase = 'placement';
                currentIdx = A.length - 1;
                placementMode = 'decrement';
                recordStep('cumulative_done', `Kumulatif selesai: C=${C}`);
                message = 'TAHAP 3: Placement Mundur. Tekan "Next" untuk lanjut.';
            }
        } else if (phase === 'placement') {
            if (currentIdx >= 0) {
                if (placementMode === 'decrement') {
                    const val = A[currentIdx];
                    C[val]--;
                    pendingVal = val;
                    pendingPos = C[val];
                    placementMode = 'place';
                    recordStep(
                        `placement_dec_${currentIdx}`,
                        `STEP A[${currentIdx}]=${val}: C[${val}]--, sekarang C[${val}]=${C[val]}`
                    );
                    message = `Decrement dulu: C[${val}] menjadi ${C[val]}. Next lagi untuk place ke B[${C[val]}].`;
                    step++;
                } else {
                    if (pendingVal !== null && pendingPos !== null) {
                        B[pendingPos] = pendingVal;
                        recordStep(
                            `placement_put_${currentIdx}`,
                            `STEP A[${currentIdx}]=${pendingVal}: taruh ke B[${pendingPos}] -> B=${B}`
                        );
                        message = `Placement: nilai ${pendingVal} ditaruh ke B[${pendingPos}].`;
                    }

                    pendingVal = null;
                    pendingPos = null;
                    placementMode = 'decrement';
                    currentIdx--;
                    step++;
                }
            } else {
                // Selesai placement
                phase = 'done';
                recordStep('done', `Selesai! Hasil: B=${B}`);
                message = `Selesai! Array terurut: ${B.join(', ')}`;
            }
        }
    }

    function prevStep() {
        if (stepHistory.length > 1) {
            stepHistory.pop();
            const prev = stepHistory[stepHistory.length - 1];
            phase = (prev.phase.split('_')[0] as any) || 'init';
            C = prev.C;
            B = prev.B;
            currentIdx = prev.currentIdx;
            message = prev.message;
            placementMode = prev.placementMode;
            pendingVal = prev.pendingVal;
            pendingPos = prev.pendingPos;
            step--;
        }
    }
</script>

<div class="visualizer-box">
    <div class="controls">
        <button onclick={start} disabled={phase !== 'init'}>
            ▶ Mulai
        </button>
        <button onclick={nextStep} disabled={phase === 'init' || phase === 'done'}>
            → Next Step
        </button>
        <button onclick={prevStep} disabled={stepHistory.length <= 1}>
            ← Prev
        </button>
        <button onclick={reset}>↻ Reset</button>
        <span class="step-info">Step: {step}</span>
    </div>

    <div class="message-box">
        <strong>{message}</strong>
    </div>

    <div class="arrays-section">
        <div class="array-group">
            <h4>Array Input: A</h4>
            <div class="array-display">
                {#each A as val, i (i)}
                    {@const highlight = i === currentIdx && (phase === 'frequency' || phase === 'placement')}
                    <div class="cell" class:highlight>
                        {val}
                    </div>
                {/each}
            </div>
        </div>

        <div class="array-group">
            <h4>Frekuensi: C</h4>
            <div class="array-display">
                {#each C as val, i (i)}
                    <div
                        class="cell"
                        class:highlight={
                            (phase === 'frequency' && currentIdx >= 0 && i === A[currentIdx]) ||
                            (phase === 'cumulative' && currentIdx >= 1 && i === currentIdx - 1) ||
                            (phase === 'placement' && pendingVal !== null && i === pendingVal)
                        }
                    >
                        {val}
                    </div>
                {/each}
            </div>
            <div class="label-row">
                {#each Array(K + 1)
                    .fill(0)
                    .map((_, i) => i) as i}
                    <span class="label">{i}</span>
                {/each}
            </div>
        </div>

        {#if phase !== 'init' && phase !== 'frequency'}
            <div class="array-group">
                <h4>Hasil: B (Terurut)</h4>
                <div class="array-display">
                    {#each B as val, i (i)}
                        {@const filled = val !== -1}
                        <div class="cell" class:filled>
                            {filled ? val : '?'}
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .visualizer-box {
        border: 2px solid #007acc;
        border-radius: 8px;
        padding: 20px;
        background-color: #f5f5f5;
        margin: 20px 0;
        font-family: 'Courier New', monospace;
    }

    .controls {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        flex-wrap: wrap;
    }

    button {
        padding: 8px 16px;
        font-size: 14px;
        border: 1px solid #007acc;
        background-color: #007acc;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover:not(:disabled) {
        background-color: #005a9e;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .step-info {
        padding: 8px 16px;
        background-color: #e0e0e0;
        border-radius: 4px;
        font-weight: bold;
    }

    .message-box {
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
        padding: 12px;
        margin-bottom: 15px;
        border-radius: 4px;
        color: #333;
    }

    .arrays-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .array-group {
        background-color: white;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }

    .array-group h4 {
        margin: 0 0 10px 0;
        color: #333;
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
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f9f9f9;
        font-weight: bold;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .cell.highlight {
        background-color: #4caf50;
        color: white;
        border-color: #2e7d32;
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .cell.filled {
        background-color: #e8f5e9;
        border-color: #4caf50;
    }

    .label-row {
        display: flex;
        gap: 8px;
        margin-top: 8px;
        align-items: center;
        flex-wrap: wrap;
    }

    .label {
        width: 45px;
        text-align: center;
        font-size: 12px;
        color: #666;
        font-weight: bold;
    }
</style>
