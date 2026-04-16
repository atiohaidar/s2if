<script lang="ts">
    type Snapshot = {
        arr: number[];
        i: number;
        j: number;
        comparisons: number;
        phase: "scan" | "final" | "done";
        message: string;
    };

    const initial = [5, 1, 3, 4, 5, 1, 9, 5, 1];
    const low = 0;
    const high = initial.length - 1;
    const px = 4;

    let arr = $state([...initial]);
    let pivotValue = $state(initial[px]);
    let i = $state(low + 1);
    let j = $state(low + 1);
    let comparisons = $state(0);
    let phase = $state<"scan" | "final" | "done">("scan");
    let message = $state("Klik Next untuk mulai partisi.");
    let history = $state<Snapshot[]>([]);

    function reset() {
        arr = [...initial];
        pivotValue = initial[px];
        i = low + 1;
        j = low + 1;
        comparisons = 0;
        phase = "scan";
        message = "Klik Next untuk mulai partisi.";
        history = [];
    }

    function saveSnapshot() {
        history.push({ arr: [...arr], i, j, comparisons, phase, message });
    }

    function swap(a: number, b: number) {
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }

    function nextStep() {
        if (phase === "done") {
            message = "Partisi sudah selesai.";
            return;
        }

        saveSnapshot();

        if (history.length === 1) {
            swap(px, low);
            pivotValue = arr[low];
            message = `Swap awal: A[px=${px}] dengan A[low=${low}] agar pivot (${pivotValue}) ada di depan.`;
            return;
        }

        if (phase === "scan") {
            if (j <= high) {
                comparisons += 1;
                if (arr[j] < pivotValue) {
                    swap(i, j);
                    message = `Bandingkan A[${j}] = ${arr[j]} < pivot (${pivotValue}) -> swap A[${i}] dan A[${j}], lalu i++.`;
                    i += 1;
                } else {
                    message = `Bandingkan A[${j}] = ${arr[j]} < pivot (${pivotValue}) -> tidak, lanjut.`;
                }
                j += 1;
                return;
            }

            phase = "final";
        }

        if (phase === "final") {
            const pivotIndex = i - 1;
            swap(low, pivotIndex);
            phase = "done";
            message = `Swap akhir A[low=${low}] dengan A[${pivotIndex}] -> selesai. Hasil: [${arr.join(",")}].`;
        }
    }

    function prevStep() {
        const prev = history.pop();
        if (!prev) return;

        arr = [...prev.arr];
        i = prev.i;
        j = prev.j;
        comparisons = prev.comparisons;
        phase = prev.phase;
        message = prev.message;
    }
</script>

<div class="visualizer-container">
    <div class="header-row">
        <h4>Partition Visualizer</h4>
        <span class="badge">Komparasi: {comparisons}</span>
    </div>

    <p class="meta">
        low = <code>{low}</code>, high = <code>{high}</code>, px = <code>{px}</code>, pivot = <code>{pivotValue}</code>,
        i = <code>{i}</code>, j = <code>{j}</code>
    </p>

    <div class="controls">
        <button onclick={prevStep} disabled={history.length === 0}>Prev</button>
        <button onclick={nextStep} disabled={phase === "done"}>Next</button>
        <button onclick={reset}>Reset</button>
    </div>

    <div class="array-row">
        {#each arr as value, idx}
            <div
                class="cell"
                class:pivot={idx === low}
                class:i={idx === i}
                class:j={idx === j}
            >
                <span class="idx">{idx}</span>
                <span class="val">{value}</span>
            </div>
        {/each}
    </div>

    <div class="message">{message}</div>
</div>

<style>
    .visualizer-container {
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-binder);
        border-radius: 12px;
        padding: 1.25rem;
        margin: 1rem 0 1.25rem;
    }

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.8rem;
    }

    .header-row h4 {
        margin: 0;
    }

    .badge {
        background: var(--color-status-info-soft);
        color: var(--color-status-info-border);
        border-radius: 999px;
        padding: 0.2rem 0.65rem;
        font-size: 0.85rem;
        font-weight: 700;
    }

    .meta {
        margin: 0 0 0.75rem;
        font-size: 0.92rem;
    }

    .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
        margin-bottom: 0.75rem;
    }

    button {
        border: none;
        border-radius: 8px;
        padding: 0.5rem 0.9rem;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        cursor: pointer;
        font-weight: 600;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .array-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        margin-bottom: 0.75rem;
    }

    .cell {
        width: 58px;
        border: 1px solid var(--color-line);
        border-radius: 8px;
        text-align: center;
        background: var(--color-paper);
        padding: 0.35rem 0.25rem;
    }

    .cell.pivot {
        background: var(--color-callout-warning-start);
        border-color: var(--color-callout-warning-border);
    }

    .cell.i {
        background: var(--color-status-info-soft);
        border-color: var(--color-status-info-border);
    }

    .cell.j {
        background: var(--color-callout-danger-start);
        border-color: var(--color-callout-danger-border);
    }

    .idx {
        display: block;
        font-size: 0.72rem;
        opacity: 0.8;
    }

    .val {
        display: block;
        font-size: 1rem;
        font-weight: 700;
    }

    .message {
        background: var(--color-surface-soft);
        border-left: 4px solid var(--color-binder);
        border-radius: 8px;
        padding: 0.65rem 0.75rem;
        font-size: 0.92rem;
    }
</style>
