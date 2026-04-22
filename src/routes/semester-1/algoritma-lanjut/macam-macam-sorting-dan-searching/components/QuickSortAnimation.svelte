<script lang="ts">
    import { onMount } from "svelte";

    export let initialArray: number[] = [10, 7, 8, 9, 1, 5];
    
    type State = {
        array: number[];
        description: string;
        highlight: number[]; 
        low: number; 
        high: number;
        pivotIdx: number;
        i: number;
        j: number;
        sortedIndices: number[];
    };

    let states: State[] = [];
    let currentStateIndex = 0;
    let isPlaying = false;
    let speed = 800;
    let timeoutId: any;

    function generateStates(arr: number[]) {
        let array = [...arr];
        let newStates: State[] = [];
        let sortedIndices: number[] = [];

        function copyState(desc: string, h: number[] = [], l: number = -1, r: number = -1, p: number = -1, iv: number = -2, jv: number = -2) {
            newStates.push({
                array: [...array],
                description: desc,
                highlight: h,
                low: l,
                high: r,
                pivotIdx: p,
                i: iv,
                j: jv,
                sortedIndices: [...sortedIndices]
            });
        }

        function partition(low: number, high: number): number {
            let pivot = array[high];
            copyState(`Memilih pivot ${pivot} dari rentang [${low}..${high}]`, [high], low, high, high, low - 1, -2);
            
            let i = low - 1;
            
            for (let j = low; j < high; j++) {
                copyState(`Memeriksa apakah array[${j}] (${array[j]}) <= pivot (${pivot})`, [j, high], low, high, high, i, j);
                if (array[j] <= pivot) {
                    i++;
                    if (i !== j) {
                        copyState(`Karena ${array[j]} <= ${pivot}, tukar array[${i}] dengan array[${j}]`, [i, j], low, high, high, i, j);
                        let temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                        copyState(`Hasil pertukaran`, [i, j], low, high, high, i, j);
                    } else {
                        copyState(`Karena ${array[j]} <= ${pivot}, namun i sama dengan j, posisi tetap (i=${i})`, [i], low, high, high, i, j);
                    }
                }
            }
            
            copyState(`Pindahkan pivot ${pivot} ke posisi yang benar (tukar dengan array[${i + 1}])`, [i + 1, high], low, high, high, i, -2);
            let temp = array[i + 1];
            array[i + 1] = array[high];
            array[high] = temp;
            
            // i+1 is now in its final sorted position
            sortedIndices.push(i + 1);
            copyState(`Partisi selesai. Pivot ${pivot} berada di posisi akhir yang benar (indeks ${i+1})`, [i + 1], low, high, -1, -2, -2);
            
            return i + 1;
        }

        function quickSort(low: number, high: number) {
            if (low < high) {
                let pi = partition(low, high);
                quickSort(low, pi - 1);
                quickSort(pi + 1, high);
            } else if (low === high && !sortedIndices.includes(low)) {
                sortedIndices.push(low);
                copyState(`Elemen tunggal di indeks ${low} (${array[low]}) otomatis menempati posisi akhir`, [low], low, high, -1, -2, -2);
            }
        }

        copyState("Memulai Quick Sort", []);
        quickSort(0, array.length - 1);
        
        // ensure all are marked sorted
        for (let idx = 0; idx < array.length; idx++) {
            if (!sortedIndices.includes(idx)) sortedIndices.push(idx);
        }
        
        copyState("Pengurutan Selesai!", [], -1, -1, -1, -2, -2);
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
        low: -1,
        high: -1,
        pivotIdx: -1,
        i: -2,
        j: -2,
        sortedIndices: []
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
            <input type="range" id="speed" min="100" max="2000" bind:value={speed} style="direction: rtl" />
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
                        {#if currentState.pivotIdx === idx}<span class="badge badge-pivot">P</span>{/if}
                        {#if currentState.i === idx}<span class="badge badge-i">i</span>{/if}
                        {#if currentState.j === idx}<span class="badge badge-j">j</span>{/if}
                    </div>
                    <div 
                        class="array-element"
                        class:in-bounds={currentState.low !== -1 && idx >= currentState.low && idx <= currentState.high}
                        class:highlight={currentState.highlight.includes(idx)}
                        class:pivot={currentState.pivotIdx === idx}
                        class:fully-sorted={currentState.sortedIndices.includes(idx)}
                    >
                        <div class="value">{num}</div>
                        <div class="index">{idx}</div>
                    </div>
                </div>
            {/each}
        </div>
        
        <div class="pointers-legend">
            <div class="legend-item"><span class="badge badge-pivot">P</span> Pivot</div>
            <div class="legend-item"><span class="badge badge-i">i</span> Indeks &lt;= pivot</div>
            <div class="legend-item"><span class="badge badge-j">j</span> Iterator</div>
        </div>
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>Step:</strong> <span class="var-val">{currentStateIndex + 1} / {states.length}</span></p>
            <p><strong>Rentang:</strong> <span class="var-val">{currentState.low !== -1 ? `[${currentState.low}..${currentState.high}]` : '-'}</span></p>
            <p><strong>i:</strong> <span class="var-val">{currentState.i !== -2 ? currentState.i : '-'}</span></p>
            <p><strong>j:</strong> <span class="var-val">{currentState.j !== -2 ? currentState.j : '-'}</span></p>
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
    
    .badge-pivot { background: var(--color-accent); }
    .badge-i { background: var(--color-link); }
    .badge-j { background: var(--color-status-wip); }
    
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

    /* Colors and states */
    .in-bounds {
        border-color: var(--color-binder);
        background: rgba(139, 69, 19, 0.05); /* very soft brown based on binder */
    }

    .pivot {
        border-color: var(--color-accent);
        border-style: dashed;
    }

    .highlight {
        background: var(--color-callout-warning-end);
        border-color: var(--color-status-wip);
        transform: scale(1.1);
        z-index: 10;
        box-shadow: var(--shadow-sm);
    }

    .fully-sorted {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
        color: var(--color-status-success-text);
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
