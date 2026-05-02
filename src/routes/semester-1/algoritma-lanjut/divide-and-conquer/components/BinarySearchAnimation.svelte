<script lang="ts">
    const initialArr = [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91];
    let targetVal = $state(23);

    type SearchStep = {
        left: number; right: number; mid: number;
        comparison: "equal" | "go-left" | "go-right";
        msg: string;
        pruned: "left" | "right" | "none" | "found";
    };

    function computeSearch(target: number): SearchStep[] {
        const steps: SearchStep[] = [];
        let left = 0, right = initialArr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (initialArr[mid] === target) {
                steps.push({
                    left, right, mid,
                    comparison: "equal",
                    msg: `arr[${mid}] = ${initialArr[mid]} = target! Ditemukan di indeks ${mid}.`,
                    pruned: "found"
                });
                return steps;
            } else if (initialArr[mid] < target) {
                steps.push({
                    left, right, mid,
                    comparison: "go-right",
                    msg: `arr[${mid}] = ${initialArr[mid]} < ${target}. Buang sisi KIRI (indeks ${left}..${mid}). Sisa: ${mid + 1}..${right}.`,
                    pruned: "left"
                });
                left = mid + 1;
            } else {
                steps.push({
                    left, right, mid,
                    comparison: "go-left",
                    msg: `arr[${mid}] = ${initialArr[mid]} > ${target}. Buang sisi KANAN (indeks ${mid}..${right}). Sisa: ${left}..${mid - 1}.`,
                    pruned: "right"
                });
                right = mid - 1;
            }
        }

        steps.push({
            left, right, mid: -1,
            comparison: "equal",
            msg: `Target ${target} tidak ditemukan dalam array.`,
            pruned: "none"
        });

        return steps;
    }

    let allSteps = $state<SearchStep[]>(computeSearch(targetVal));
    let step = $state(0);
    let currentStep = $state<SearchStep | null>(null);
    let message = $state("Klik 'Next' untuk mulai Binary Search. Perhatikan bagaimana setengah array dibuang (pruning) setiap langkah!");
    let isFinished = $state(false);
    let prunedIndices = $state<Set<number>>(new Set());

    function nextStep() {
        if (step >= allSteps.length) {
            isFinished = true;
            return;
        }
        const s = allSteps[step];
        currentStep = s;
        message = s.msg;

        // Mark pruned indices
        if (s.pruned === "left") {
            for (let i = s.left; i <= s.mid; i++) prunedIndices.add(i);
            prunedIndices = new Set(prunedIndices);
        } else if (s.pruned === "right") {
            for (let i = s.mid; i <= s.right; i++) prunedIndices.add(i);
            prunedIndices = new Set(prunedIndices);
        }

        step++;
        if (step >= allSteps.length) isFinished = true;
    }

    function reset() {
        allSteps = computeSearch(targetVal);
        step = 0;
        currentStep = null;
        message = "Klik 'Next' untuk mulai Binary Search.";
        isFinished = false;
        prunedIndices = new Set();
    }

    function changeTarget(val: number) {
        targetVal = val;
        reset();
    }
</script>

<div class="demo-container">
    <div class="demo-header">
        <h4>Binary Search: Visualisasi Pruning</h4>
        <span class="step-badge">Step {step}/{allSteps.length}</span>
    </div>

    <div class="target-selector">
        <span class="target-label">Cari nilai:</span>
        {#each [5, 16, 23, 42, 99] as t}
            <button
                class="target-btn"
                class:active-target={targetVal === t}
                onclick={() => changeTarget(t)}
            >{t}</button>
        {/each}
    </div>

    <div class="array-visual">
        {#each initialArr as val, i}
            <div 
                class="cell"
                class:pruned={prunedIndices.has(i)}
                class:mid-cell={currentStep && currentStep.mid === i && !isFinished}
                class:found-cell={currentStep && currentStep.pruned === "found" && currentStep.mid === i}
                class:active-range={currentStep && !prunedIndices.has(i) && i >= (currentStep.left) && i <= (currentStep.right)}
            >
                <span class="idx">{i}</span>
                <span class="val">{val}</span>
            </div>
        {/each}
    </div>

    <div class="info-panel" class:found-panel={currentStep?.pruned === "found"}>
        <p>{message}</p>
    </div>

    <div class="stats">
        {#if step > 0}
            <span class="stat">🔍 Langkah: <strong>{step}</strong></span>
            <span class="stat">🗑️ Elemen dibuang: <strong>{prunedIndices.size}</strong> / {initialArr.length}</span>
            <span class="stat">📊 Sisa: <strong>{initialArr.length - prunedIndices.size}</strong></span>
        {/if}
    </div>

    <div class="controls">
        <button class="btn-play" onclick={nextStep} disabled={isFinished}>Next</button>
        <button class="btn-reset" onclick={reset}>Reset</button>
    </div>
</div>

<style>
    .demo-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1.5rem 0;
    }
    .demo-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;
    }
    .demo-header h4 { margin: 0; color: var(--color-ink); }
    .step-badge {
        background: var(--color-status-info-soft); color: var(--color-status-info-border);
        padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600;
    }

    .target-selector {
        display: flex; gap: 0.4rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap;
    }
    .target-label { font-weight: 600; font-size: 0.9rem; color: var(--color-ink-muted); margin-right: 0.3rem; }
    .target-btn {
        padding: 0.3rem 0.7rem; border: 2px solid var(--color-line); border-radius: 6px;
        background: var(--color-surface); cursor: pointer; font-weight: 600; font-size: 0.9rem;
        color: var(--color-ink); transition: all 0.2s;
    }
    .target-btn:hover { border-color: var(--color-link); }
    .active-target { background: var(--color-link); color: white; border-color: var(--color-link); }

    .array-visual {
        display: flex; gap: 4px; margin-bottom: 1rem; overflow-x: auto; padding: 0.5rem 0;
    }
    .cell {
        display: flex; flex-direction: column; align-items: center;
        min-width: 42px; padding: 0.4rem 0.3rem; border: 2px solid var(--color-line);
        border-radius: 6px; background: var(--color-surface);
        transition: all 0.4s ease;
    }
    .idx { font-size: 0.7rem; color: var(--color-ink-muted); }
    .val { font-weight: bold; font-size: 1rem; }

    .pruned {
        opacity: 0.25; background: var(--color-surface-soft);
        border-color: transparent; transform: scale(0.9);
        text-decoration: line-through; color: var(--color-ink-muted);
    }

    .mid-cell {
        background: var(--color-status-info-soft) !important;
        border-color: var(--color-link) !important;
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .found-cell {
        background: var(--color-status-success-soft) !important;
        border-color: var(--color-status-success-border) !important;
        transform: scale(1.15);
        box-shadow: 0 2px 12px rgba(0,128,0,0.2);
    }
    .active-range:not(.pruned):not(.mid-cell):not(.found-cell) {
        border-color: var(--color-binder);
    }

    .info-panel {
        background: var(--color-surface); border: 1px dashed var(--color-link);
        border-radius: 6px; padding: 0.8rem 1rem; margin-bottom: 0.8rem;
        min-height: 42px; display: flex; align-items: center;
    }
    .found-panel { border-color: var(--color-status-success-border); background: var(--color-status-success-soft); }
    .info-panel p { margin: 0; font-weight: 600; font-size: 0.9rem; color: var(--color-ink); }

    .stats { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; font-size: 0.85rem; color: var(--color-ink-muted); }
    .stat strong { color: var(--color-ink); }

    .controls { display: flex; gap: 0.5rem; }
    button {
        padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;
        font-weight: bold; color: white; transition: transform 0.1s, opacity 0.2s;
    }
    button:active:not(:disabled) { transform: scale(0.95); }
    button:hover:not(:disabled) { opacity: 0.9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-play { background: var(--color-link); }
    .btn-reset { background: var(--color-ink-muted); }
</style>
