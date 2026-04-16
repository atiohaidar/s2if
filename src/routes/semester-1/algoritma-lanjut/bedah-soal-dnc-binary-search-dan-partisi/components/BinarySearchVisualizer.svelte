<script lang="ts">
    const arr = [1, 1, 1, 3, 4, 5, 5, 5, 9];
    const target = 7;

    let low = $state(0);
    let high = $state(arr.length - 1);
    let mid = $state<number | null>(null);
    let comparisons = $state(0);
    let finished = $state(false);
    let message = $state("Klik Next untuk mulai binary search.");

    type Snapshot = {
        low: number;
        high: number;
        mid: number | null;
        comparisons: number;
        finished: boolean;
        message: string;
    };

    let history = $state<Snapshot[]>([]);

    function reset() {
        low = 0;
        high = arr.length - 1;
        mid = null;
        comparisons = 0;
        finished = false;
        message = "Klik Next untuk mulai binary search.";
        history = [];
    }

    function nextStep() {
        if (finished) {
            message = "Proses sudah selesai.";
            return;
        }

        history.push({ low, high, mid, comparisons, finished, message });

        if (low < high) {
            mid = Math.floor((low + high) / 2);
            comparisons += 1;

            if (target <= arr[mid]) {
                message = `Step ${comparisons}: target (${target}) <= A[${mid}] (${arr[mid]}), maka high = ${mid}`;
                high = mid;
            } else {
                message = `Step ${comparisons}: target (${target}) > A[${mid}] (${arr[mid]}), maka low = ${mid + 1}`;
                low = mid + 1;
            }
        }

        if (low >= high) {
            finished = true;
            message = `${message}. Stop saat low == high == ${low}. Total komparasi data = ${comparisons}.`;
        }
    }

    function prevStep() {
        const prev = history.pop();
        if (!prev) return;

        low = prev.low;
        high = prev.high;
        mid = prev.mid;
        comparisons = prev.comparisons;
        finished = prev.finished;
        message = prev.message;
    }
</script>

<div class="visualizer-container">
    <div class="header-row">
        <h4>Binary Search Visualizer</h4>
        <span class="badge">Komparasi: {comparisons}</span>
    </div>

    <div class="controls">
        <button onclick={prevStep} disabled={history.length === 0}>Prev</button>
        <button onclick={nextStep} disabled={finished}>Next</button>
        <button onclick={reset}>Reset</button>
    </div>

    <p class="meta">
        target = <code>{target}</code>, low = <code>{low}</code>, high = <code>{high}</code>,
        mid = <code>{mid === null ? "-" : mid}</code>
    </p>

    <div class="array-row">
        {#each arr as value, i}
            <div
                class="cell"
                class:low={i === low}
                class:high={i === high}
                class:mid={mid !== null && i === mid}
            >
                <span class="idx">{i}</span>
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

    .meta {
        margin: 0 0 0.75rem;
        font-size: 0.92rem;
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

    .cell.low {
        background: var(--color-status-info-soft);
        border-color: var(--color-status-info-border);
    }

    .cell.high {
        background: var(--color-callout-warning-start);
        border-color: var(--color-callout-warning-border);
    }

    .cell.mid {
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
