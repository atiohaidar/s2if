<script lang="ts">
    let arr = $state([3, 7, 2, 8, 1, 5, 9, 4]);
    let step = $state(0);
    let pivot = $state(0);
    let left = $state(0);
    let right = $state(0);
    let isPartitioning = $state(false);
    let history: { arr: number[]; left: number; right: number; pivot: number }[] = $state([]);

    const initialArr = [3, 7, 2, 8, 1, 5, 9, 4];

    function reset() {
        arr = [...initialArr];
        step = 0;
        pivot = initialArr[initialArr.length - 1];
        left = 0;
        right = initialArr.length - 1;
        isPartitioning = false;
        history = [];
    }

    function nextStep() {
        if (step === 0) {
            // Select pivot
            history.push({ arr: [...arr], left, right, pivot });
            isPartitioning = true;
        } else if (isPartitioning) {
            // Simulate partition: if left element < pivot, move left pointer
            // if right element >= pivot, move right pointer
            // if both pointers not crossed and elements are wrong way, swap

            if (left < right) {
                if (arr[left] >= pivot && arr[right] < pivot) {
                    // Swap
                    [arr[left], arr[right]] = [arr[right], arr[left]];
                    history.push({ arr: [...arr], left, right, pivot });
                    left++;
                    right--;
                } else {
                    if (arr[left] < pivot) left++;
                    else if (arr[right] >= pivot) right--;
                    history.push({ arr: [...arr], left, right, pivot });
                }
            } else {
                isPartitioning = false;
            }
        }
        step++;
    }

    function prevStep() {
        if (history.length > 0) {
            const prev = history.pop();
            if (prev) {
                arr = prev.arr;
                left = prev.left;
                right = prev.right;
                pivot = prev.pivot;
            }
            step--;
        }
    }
</script>

<div class="visualizer-container">
    <div class="controls">
        <button onclick={nextStep} disabled={step > 20}>
            ▶ Next Step
        </button>
        <button onclick={prevStep} disabled={history.length === 0}>
            ◀ Prev
        </button>
        <button onclick={reset}>↻ Reset</button>
        <span class="step-info">Step: {step}</span>
    </div>

    <div class="array-display">
        <div class="array-visualization">
            {#each arr as val, i (i)}
                {@const isLeft = i === left}
                {@const isRight = i === right}
                {@const isPivot = val === pivot && i === arr.length - 1}
                <div
                    class="array-item"
                    class:pivot={isPivot}
                    class:left-pointer={isLeft}
                    class:right-pointer={isRight}
                >
                    <span class="value">{val}</span>
                    {#if isLeft}
                        <span class="pointer-label">L</span>
                    {/if}
                    {#if isRight}
                        <span class="pointer-label">R</span>
                    {/if}
                    {#if isPivot}
                        <span class="pointer-label">P</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="info-panel">
        {#if step === 0}
            <p>
                <strong>Mulai partisi:</strong> Pilih pivot dari akhir array. Pivot =
                {pivot}
            </p>
        {:else}
            <p>
                <strong>Pointer L:</strong> {left} (array[{left}] = {arr[left]})<br />
                <strong>Pointer R:</strong> {right} (array[{right}] = {arr[right]})<br />
                <strong>Pivot:</strong> {pivot}
            </p>
            {#if isPartitioning}
                <p class="hint">
                    Gerakkan pointer sampai L dan R bertemu, swap jika ada element
                    yang salah tempat.
                </p>
            {:else}
                <p class="success">✓ Partisi selesai!</p>
            {/if}
        {/if}
    </div>
</div>

<style>
    .visualizer-container {
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-binder);
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.1);
        overflow-x: auto;
    }

    .controls {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    button {
        padding: 0.6rem 1.2rem;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
        font-size: 0.95rem;
        white-space: nowrap;
    }

    button:hover:not(:disabled) {
        background: var(--color-ink-muted);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .step-info {
        margin-left: 1rem;
        font-weight: 600;
        color: var(--color-ink);
        white-space: nowrap;
    }

    .array-display {
        margin: 1.5rem 0;
        padding: 1rem;
        background: var(--color-surface-soft);
        border-radius: 8px;
    }

    .array-visualization {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .array-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        position: relative;
    }

    .value {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-line);
        border-radius: 6px;
        font-weight: 600;
        font-size: 1.1rem;
        transition: all 0.3s;
    }

    .array-item.pivot .value {
        background: var(--color-highlight);
        border-color: var(--color-callout-warning-border);
        color: var(--color-binder);
        font-weight: 700;
        box-shadow: 0 0 8px rgba(255, 165, 0, 0.3);
    }

    .array-item.left-pointer .value {
        background: var(--color-status-info-soft);
        border-color: var(--color-status-info-border);
        color: var(--color-status-info-border);
    }

    .array-item.right-pointer .value {
        background: var(--color-callout-danger-start);
        border-color: var(--color-callout-danger-border);
        color: var(--color-callout-danger-text);
    }

    .pointer-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.8;
        margin-top: 0.25rem;
    }

    .array-item.left-pointer .pointer-label {
        color: var(--color-status-info-border);
    }

    .array-item.right-pointer .pointer-label {
        color: var(--color-callout-danger-border);
    }

    .array-item.pivot .pointer-label {
        color: var(--color-callout-warning-border);
    }

    .info-panel {
        background: var(--color-status-neutral-soft);
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid var(--color-binder);
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .info-panel p {
        margin: 0.5rem 0;
    }

    .hint {
        color: var(--color-ink-soft);
        font-style: italic;
    }

    .success {
        color: var(--color-status-done-start);
        font-weight: 600;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .visualizer-container {
            padding: 1rem;
            margin: 1rem 0;
        }

        .controls {
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        button {
            padding: 0.5rem 0.9rem;
            font-size: 0.9rem;
        }

        .step-info {
            margin-left: 0.5rem;
            font-size: 0.9rem;
        }

        .array-display {
            padding: 0.75rem;
            margin: 1rem 0;
        }

        .array-visualization {
            gap: 0.5rem;
        }

        .value {
            width: 42px;
            height: 42px;
            font-size: 1rem;
        }

        .pointer-label {
            font-size: 0.7rem;
        }

        .info-panel {
            font-size: 0.9rem;
            padding: 0.75rem;
            line-height: 1.5;
        }

        .info-panel p {
            margin: 0.4rem 0;
        }
    }

    @media (max-width: 480px) {
        .visualizer-container {
            padding: 0.75rem;
            border-width: 1px;
        }

        .controls {
            gap: 0.3rem;
            margin-bottom: 0.75rem;
        }

        button {
            padding: 0.45rem 0.75rem;
            font-size: 0.85rem;
        }

        .step-info {
            margin-left: 0.25rem;
            font-size: 0.85rem;
        }

        .array-display {
            padding: 0.5rem;
            margin: 0.75rem 0;
        }

        .array-visualization {
            gap: 0.4rem;
        }

        .value {
            width: 36px;
            height: 36px;
            font-size: 0.95rem;
            border-width: 1.5px;
        }

        .pointer-label {
            font-size: 0.65rem;
        }

        .info-panel {
            font-size: 0.85rem;
            padding: 0.65rem;
            border-left-width: 3px;
            line-height: 1.4;
        }

        .hint {
            font-size: 0.8rem;
        }

        .success {
            font-size: 0.85rem;
        }
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .visualizer-container {
            padding: 1rem;
            margin: 1rem 0;
        }

        .controls {
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        button {
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
        }

        .step-info {
            margin-left: 0.5rem;
            font-size: 0.9rem;
        }

        .array-display {
            margin: 1rem 0;
            padding: 0.75rem;
        }

        .array-visualization {
            gap: 0.5rem;
        }

        .value {
            width: 40px;
            height: 40px;
            font-size: 0.95rem;
        }

        .pointer-label {
            font-size: 0.65rem;
            position: relative;
            display: block;
            margin-top: 2px;
        }

        .info-panel {
            font-size: 0.9rem;
            padding: 0.75rem;
        }

        .info-panel p {
            margin: 0.35rem 0;
        }
    }

    @media (max-width: 480px) {
        .visualizer-container {
            padding: 0.75rem;
            border-radius: 8px;
        }

        .controls {
            flex-direction: column;
            gap: 0.4rem;
        }

        button {
            width: 100%;
            padding: 0.5rem;
            font-size: 0.85rem;
        }

        .step-info {
            width: 100%;
            text-align: center;
            margin-left: 0;
            margin-top: 0.5rem;
        }

        .array-visualization {
            gap: 0.4rem;
            justify-content: flex-start;
            overflow-x: auto;
            padding: 0.5rem;
        }

        .value {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
            flex-shrink: 0;
        }

        .pointer-label {
            font-size: 0.6rem;
        }

        .info-panel {
            font-size: 0.85rem;
            padding: 0.5rem;
            border-left-width: 3px;
        }

        .info-panel p {
            margin: 0.25rem 0;
            line-height: 1.4;
        }
    }
</style>
