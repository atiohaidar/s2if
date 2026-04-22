<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let initialArray: number[] = [12, 11, 13, 5, 6];
    
    let array = [...initialArray];
    let i = 1;
    let j = 0;
    let key: number | null = null;
    // states: "idle", "extract_key", "comparing", "shifting", "inserting", "done"
    let state = "idle";
    let isPlaying = false;
    let speed = 800;
    let timeoutId: any;

    let sortedIndices: number[] = [0];
    let compareIndex = -1;

    function reset() {
        clearTimeout(timeoutId);
        array = [...initialArray];
        i = 1;
        j = 0;
        key = null;
        state = "idle";
        isPlaying = false;
        sortedIndices = [0];
        compareIndex = -1;
    }

    async function step() {
        if (state === "done") return;

        if (state === "idle") {
            if (i >= array.length) {
                state = "done";
                sortedIndices = array.map((_, idx) => idx);
                compareIndex = -1;
                isPlaying = false;
                return;
            }
            state = "extract_key";
        } else if (state === "extract_key") {
            key = array[i];
            j = i - 1;
            state = "comparing";
        } else if (state === "comparing") {
            compareIndex = j;
            if (j >= 0 && array[j] > (key as number)) {
                state = "shifting";
            } else {
                state = "inserting";
                compareIndex = -1;
            }
        } else if (state === "shifting") {
            array[j + 1] = array[j];
            j -= 1;
            compareIndex = -1;
            state = "comparing";
        } else if (state === "inserting") {
            array[j + 1] = key as number;
            sortedIndices = [...sortedIndices, i];
            i += 1;
            key = null;
            if (i >= array.length) {
                state = "done";
                sortedIndices = array.map((_, idx) => idx);
                isPlaying = false;
            } else {
                state = "idle";
            }
        }
    }

    async function play() {
        if (isPlaying) return;
        if (state === "done") reset();
        isPlaying = true;
        
        const loop = async () => {
            if (!isPlaying) return;
            await step();
            if (state !== "done" && isPlaying) {
                timeoutId = setTimeout(loop, speed);
            }
        };
        loop();
    }

    function pause() {
        isPlaying = false;
        clearTimeout(timeoutId);
    }
</script>

<div class="animation-container">
    <div class="controls">
        <button on:click={isPlaying ? pause : play}>
            {isPlaying ? 'Pause' : (state === 'done' ? 'Replay' : 'Play')}
        </button>
        <button on:click={step} disabled={isPlaying || state === 'done'}>Step</button>
        <button on:click={reset} class="btn-secondary">Reset</button>
        <div class="speed-control">
            <label for="speed">Speed (ms):</label>
            <input type="range" id="speed" min="100" max="2000" bind:value={speed} style="direction: rtl" />
            <span class="speed-value">{speed}</span>
        </div>
    </div>
    
    <div class="visualization-area">
        <div class="array-container">
            {#each array as num, idx}
                <div 
                    class="array-element"
                    class:sorted={sortedIndices.includes(idx) && idx !== i && state !== "done"}
                    class:fully-sorted={state === "done"}
                    class:comparing={idx === compareIndex}
                    class:empty={(state !== "idle" && state !== "done" && state !== "extract_key") && idx === j + 1 && (state === 'inserting' || state === 'comparing')}
                    class:extracting={idx === i && state !== "idle" && key !== null}
                >
                    <div class="value">
                        <!-- hide value if it's the key currently being extracted or the empty slot before insertion -->
                        {#if idx === i && key !== null && state !== 'inserting'}
                            <span style="opacity: 0.3">{num}</span>
                        {:else if state !== "idle" && state !== "done" && idx === j + 1 && state === 'inserting'}
                            <!-- empty waiting for key -->
                        {:else}
                            {num}
                        {/if}
                    </div>
                    <div class="index">{idx}</div>
                </div>
            {/each}
        </div>

        <div class="key-container">
            <div class="key-label">Key:</div>
            <div class="array-element key-element" class:active={key !== null}>
                {#if key !== null}
                    <div transition:fade class="value">{key}</div>
                {/if}
            </div>
        </div>
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>i:</strong> <span class="var-val">{i < array.length ? i : '-'}</span></p>
            <p><strong>j:</strong> <span class="var-val">{j >= -1 && state !== 'idle' && state !== 'extract_key' ? j : '-'}</span></p>
            <p><strong>key:</strong> <span class="var-val">{key !== null ? key : '-'}</span></p>
        </div>
        <div class="status">
            <p><strong>Status:</strong> 
                <span class="status-text">
                    {#if state === 'idle'}
                        Menunggu untuk memproses elemen ke-{i} (nilai: {array[i]})
                    {:else if state === 'extract_key'}
                        Menyimpan {array[i]} ke dalam variabel `key`
                    {:else if state === 'comparing'}
                        {#if j >= 0}
                            Membandingkan key ({key}) dengan array[{j}] ({array[j]})
                        {:else}
                            Indeks j sudah melewati batas (j &lt; 0).
                        {/if}
                    {:else if state === 'shifting'}
                        Karena array[{j}] ({array[j]}) &gt; key ({key}), geser {array[j]} ke kanan (posisi {j+1})
                    {:else if state === 'inserting'}
                        Menyisipkan key ({key}) ke posisi j+1 ({j+1})
                    {:else if state === 'done'}
                        Pengurutan Selesai!
                    {/if}
                </span>
            </p>
        </div>
    </div>
</div>

<style>
    .animation-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        font-family: inherit;
        box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.07));
    }

    .controls {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        align-items: center;
    }

    button {
        background: var(--color-link);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s, transform 0.1s;
    }

    button:active:not(:disabled) {
        transform: scale(0.95);
    }

    button:hover:not(:disabled) {
        opacity: 0.9;
    }

    button:disabled {
        background: var(--color-status-todo);
        cursor: not-allowed;
        opacity: 0.7;
    }
    
    .btn-secondary {
        background: var(--color-ink-muted);
    }

    .speed-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: auto;
        font-size: 0.9rem;
        color: var(--color-ink);
    }
    
    .speed-value {
        font-family: var(--font-mono, monospace);
        min-width: 3rem;
        text-align: right;
    }

    .visualization-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
        min-height: 150px;
    }

    .array-container {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        align-items: flex-end;
    }

    .key-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        background: var(--color-surface);
        border: 1px dashed var(--color-line);
    }

    .key-label {
        font-weight: bold;
        color: var(--color-link);
    }

    .array-element {
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-line);
        border-radius: 6px;
        font-weight: bold;
        font-size: 1.2rem;
        position: relative;
        transition: all 0.3s ease;
        color: var(--color-ink);
    }

    .array-element .value {
        z-index: 2;
    }

    .array-element .index {
        position: absolute;
        bottom: -25px;
        font-size: 0.8rem;
        color: var(--color-ink-muted);
        font-weight: normal;
    }

    .key-element {
        border-color: var(--color-link);
        background: var(--color-status-info-soft);
    }
    
    .key-element.active {
        background: var(--color-callout-info-end);
        box-shadow: 0 0 10px rgba(41, 128, 185, 0.3);
    }

    /* Colors and states */
    .sorted {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
    }

    .fully-sorted {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
        color: var(--color-status-success-text);
    }

    .comparing {
        background: var(--color-callout-warning-start);
        border-color: var(--color-status-wip);
        transform: scale(1.1);
        z-index: 10;
        box-shadow: var(--shadow-sm);
    }

    .extracting {
        border-color: var(--color-link);
        border-style: dashed;
        background: var(--color-status-info-soft);
    }
    
    .empty {
        background: repeating-linear-gradient(
            45deg,
            var(--color-surface),
            var(--color-surface) 10px,
            var(--color-line) 10px,
            var(--color-line) 20px
        );
        color: transparent;
        border-color: var(--color-line);
        border-style: dashed;
    }

    .info-panel {
        background: var(--color-surface);
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid var(--color-line);
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
        color: var(--color-ink);
    }

    .variables p, .status p {
        margin: 0.25rem 0;
    }

    .var-val {
        font-family: var(--font-mono, monospace);
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
        font-weight: bold;
    }

    .status-text {
        font-style: italic;
        color: var(--color-link);
    }

    @media (max-width: 600px) {
        .info-panel {
            grid-template-columns: 1fr;
        }
        .array-element {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
    }
</style>
