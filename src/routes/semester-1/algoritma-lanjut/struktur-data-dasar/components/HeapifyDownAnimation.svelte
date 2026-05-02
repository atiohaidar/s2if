<script lang="ts">
    import { onMount } from "svelte";

    export let initialArray: number[] = [7, 4, 3, 9, 10, 8];
    export let startIndex: number = 0;
    
    type State = {
        array: number[];
        description: string;
        highlight: number[]; 
        parentIdx: number;
        leftIdx: number;
        rightIdx: number;
    };

    let states: State[] = [];
    let currentStateIndex = 0;
    let isPlaying = false;
    let speed = 1500;
    let timeoutId: any;

    function generateStates(arr: number[]) {
        let array = [...arr];
        let newStates: State[] = [];

        function copyState(
            desc: string, 
            h: number[] = [], 
            p: number = -1, 
            l: number = -1, 
            r: number = -1
        ) {
            newStates.push({
                array: [...array],
                description: desc,
                highlight: h,
                parentIdx: p,
                leftIdx: l,
                rightIdx: r
            });
        }

        function heapifyDown(n: number, i: number) {
            let smallest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            copyState(`Memeriksa node di indeks ${i} (nilai: ${array[i]})`, [i], i, left < n ? left : -1, right < n ? right : -1);

            if (left < n) {
                copyState(`Bandingkan node (${array[smallest]}) dengan anak kiri (${array[left]})`, [smallest, left], i, left, right < n ? right : -1);
                if (array[left] < array[smallest]) {
                    smallest = left;
                    copyState(`Anak kiri (${array[left]}) lebih kecil, pindahkan target terkecil ke kiri`, [smallest], i, left, right < n ? right : -1);
                }
            }

            if (right < n) {
                copyState(`Bandingkan target terkecil (${array[smallest]}) dengan anak kanan (${array[right]})`, [smallest, right], i, left, right);
                if (array[right] < array[smallest]) {
                    smallest = right;
                    copyState(`Anak kanan (${array[right]}) lebih kecil, pindahkan target terkecil ke kanan`, [smallest], i, left, right);
                }
            }

            if (smallest !== i) {
                copyState(`Tukar node ${array[i]} dengan elemen terkecil ${array[smallest]}`, [i, smallest], i, left < n ? left : -1, right < n ? right : -1);
                let swap = array[i];
                array[i] = array[smallest];
                array[smallest] = swap;
                copyState(`Selesai tukar. Node ${array[smallest]} turun. Lanjut periksa di posisi barunya.`, [i, smallest], smallest, -1, -1);
                
                heapifyDown(n, smallest);
            } else {
                copyState(`Node (${array[i]}) sudah <= anak-anaknya atau tidak punya anak. Min-Heap valid.`, [i], i, left < n ? left : -1, right < n ? right : -1);
            }
        }

        copyState("Posisi awal: elemen 7 dipindahkan ke root setelah mengambil elemen terkecil (extract-min)", [], startIndex);
        heapifyDown(array.length, startIndex);
        copyState("Heapify Down Selesai!", [], -1, -1, -1);
        return newStates;
    }

    onMount(() => {
        states = generateStates(initialArray);
    });

    function reset() {
        clearTimeout(timeoutId);
        currentStateIndex = 0;
        isPlaying = false;
    }

    function step() {
        if (currentStateIndex < states.length - 1) {
            currentStateIndex++;
        } else {
            isPlaying = false;
            clearTimeout(timeoutId);
        }
    }

    function prev() {
        if (currentStateIndex > 0) {
            currentStateIndex--;
        }
    }

    function play() {
        if (isPlaying) return;
        if (currentStateIndex >= states.length - 1) reset();
        isPlaying = true;
        
        const loop = () => {
            if (!isPlaying) return;
            step();
            if (currentStateIndex < states.length - 1 && isPlaying) {
                timeoutId = setTimeout(loop, speed);
            } else {
                isPlaying = false;
            }
        };
        timeoutId = setTimeout(loop, speed);
    }

    function pause() {
        isPlaying = false;
        clearTimeout(timeoutId);
    }

    $: currentState = states[currentStateIndex] || {
        array: [...initialArray],
        description: "Loading...",
        highlight: [],
        parentIdx: -1,
        leftIdx: -1,
        rightIdx: -1
    };
    
    $: progress = states.length > 0 ? Math.round((currentStateIndex / (states.length - 1)) * 100) : 0;
</script>

<div class="animation-container">
    <div class="controls">
        <button on:click={isPlaying ? pause : play}>
            {isPlaying ? 'Pause' : (currentStateIndex >= states.length - 1 ? 'Replay' : 'Play')}
        </button>
        <button on:click={prev} disabled={isPlaying || currentStateIndex === 0} class="btn-secondary">Prev</button>
        <button on:click={step} disabled={isPlaying || currentStateIndex >= states.length - 1}>Next</button>
        <button on:click={reset} class="btn-secondary">Reset</button>
        <div class="speed-control">
            <label for="speed">Speed (ms):</label>
            <input type="range" id="speed" min="100" max="2500" bind:value={speed} style="direction: rtl" />
            <span class="speed-value">{speed}</span>
        </div>
    </div>
    
    <div class="progress-container">
        <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    
    <div class="visualization-area">
        <div class="array-container">
            {#each currentState.array as num, idx}
                <div class="element-wrapper">
                    <div class="pointers">
                        {#if currentState.parentIdx === idx}<span class="badge badge-parent">N</span>{/if}
                        {#if currentState.leftIdx === idx}<span class="badge badge-child">L</span>{/if}
                        {#if currentState.rightIdx === idx}<span class="badge badge-child">R</span>{/if}
                    </div>
                    <div 
                        class="array-element"
                        class:highlight={currentState.highlight.includes(idx)}
                    >
                        <div class="value">{num}</div>
                        <div class="index">{idx}</div>
                    </div>
                </div>
            {/each}
        </div>
        
        <div class="pointers-legend">
            <div class="legend-item"><span class="badge badge-parent">N</span> Node saat ini</div>
            <div class="legend-item"><span class="badge badge-child">L / R</span> Anak (Left/Right)</div>
        </div>
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>Step:</strong> <span class="var-val">{currentStateIndex + 1} / {states.length}</span></p>
            <p><strong>N / L / R:</strong> <span class="var-val">{currentState.parentIdx !== -1 ? currentState.parentIdx : '-'} / {currentState.leftIdx !== -1 ? currentState.leftIdx : '-'} / {currentState.rightIdx !== -1 ? currentState.rightIdx : '-'}</span></p>
        </div>
        <div class="status">
            <p><strong>Status:</strong> 
                <span class="status-text">{currentState.description}</span>
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
        margin-bottom: 1rem;
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
    
    .progress-container {
        height: 4px;
        background: var(--color-line);
        border-radius: 2px;
        margin-bottom: 2rem;
        overflow: hidden;
    }
    
    .progress-bar {
        height: 100%;
        background: var(--color-link);
        transition: width 0.3s ease;
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
        flex-wrap: wrap;
    }

    .element-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        position: relative;
    }

    .pointers {
        height: 20px;
        display: flex;
        gap: 4px;
        justify-content: center;
        align-items: flex-end;
        position: absolute;
        top: -26px;
        width: 100%;
    }

    .badge {
        font-size: 0.7rem;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 4px;
        color: white;
        box-shadow: var(--shadow-sm);
        z-index: 5;
    }
    
    .badge-parent { background: var(--color-accent); }
    .badge-child { background: var(--color-link); }
    
    .pointers-legend {
        display: flex;
        gap: 1.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--color-surface);
        border-radius: 6px;
        border: 1px dashed var(--color-line);
        font-size: 0.9rem;
        color: var(--color-ink);
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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

    .highlight {
        background: var(--color-callout-warning-end);
        border-color: var(--color-status-wip);
        transform: scale(1.1);
        z-index: 10;
        box-shadow: var(--shadow-sm);
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
