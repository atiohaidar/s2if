<script lang="ts">
    import { onMount } from "svelte";

    export let initialArray: number[] = [5, 1, 4, 2, 8];
    let customInputStr = initialArray.join(", ");
    
    type State = {
        array: number[];
        description: string;
        highlight: number[]; 
        sortedIndices: number[];
        currIndex: number;
        compareIndex: number;
    };

    let states: State[] = [];
    let currentStateIndex = 0;
    let isPlaying = false;
    let speed = 1000;
    let timeoutId: any;

    function generateStates(arr: number[]) {
        let array = [...arr];
        let newStates: State[] = [];
        let sortedIndices: number[] = [];

        function copyState(
            desc: string, 
            h: number[] = [], 
            c: number = -1, 
            cmp: number = -1
        ) {
            newStates.push({
                array: [...array],
                description: desc,
                highlight: h,
                sortedIndices: [...sortedIndices],
                currIndex: c,
                compareIndex: cmp
            });
        }

        copyState("Posisi Awal: Belum ada yang terurut.", []);

        let n = array.length;
        for (let i = 0; i < n; i++) {
            let swapped = false;
            copyState(`Putaran i=${i}: Mulai scan dari awal array sampai batas belum terurut.`, [], 0, 1);

            for (let j = 0; j < n - i - 1; j++) {
                copyState(`Bandingkan elemen di indeks ${j} (${array[j]}) dengan indeks ${j+1} (${array[j+1]})`, [j, j+1], j, j+1);
                
                if (array[j] > array[j + 1]) {
                    copyState(`Karena ${array[j]} > ${array[j+1]}, maka kita TUKAR posisi mereka!`, [j, j+1], j, j+1);
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;
                    copyState(`Hasil pertukaran: Elemen yang lebih besar (${array[j+1]}) bergeser ke kanan.`, [j, j+1], j, j+1);
                } else {
                    copyState(`Karena ${array[j]} <= ${array[j+1]}, urutan sudah benar. Tidak ada pertukaran.`, [j, j+1], j, j+1);
                }
            }

            // Elemen terbesar di iterasi ini sudah fix di posisi n-i-1
            let sortedIdx = n - i - 1;
            sortedIndices.push(sortedIdx);
            
            if (!swapped) {
                copyState(`Tidak ada pertukaran sama sekali pada putaran ini! Array SUDAH sepenuhnya terurut. Berhenti lebih awal.`, [], -1, -1);
                // Tandai sisa elemen sebagai sorted
                for (let k = 0; k < sortedIdx; k++) {
                    if (!sortedIndices.includes(k)) sortedIndices.push(k);
                }
                break;
            } else {
                copyState(`Putaran selesai. Elemen terbesar (${array[sortedIdx]}) telah sampai di ujung kanan (posisi terurut).`, [sortedIdx], -1, -1);
            }
        }
        
        copyState("Pengurutan Bubble Sort Selesai!", [], -1, -1);
        return newStates;
    }

    onMount(() => {
        states = generateStates(initialArray);
    });

    function applyCustomArray() {
        const parsed = customInputStr.split(",")
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));
        
        if (parsed.length > 0) {
            pause();
            initialArray = parsed;
            states = generateStates(initialArray);
            reset();
        }
    }

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
        sortedIndices: [],
        currIndex: -1,
        compareIndex: -1
    };
    
    $: progress = states.length > 0 ? Math.round((currentStateIndex / (states.length - 1)) * 100) : 0;
</script>

<div class="custom-input-container">
    <label for="custom-array-bub">Input Array (pisahkan dengan koma):</label>
    <div class="input-group">
        <input type="text" id="custom-array-bub" bind:value={customInputStr} placeholder="Contoh: 5, 1, 4, 2, 8" on:keydown={(e) => e.key === 'Enter' && applyCustomArray()} />
        <button on:click={applyCustomArray} class="apply-btn">Terapkan</button>
    </div>
</div>

<div class="animation-container">
    <div class="controls">
        <button on:click={isPlaying ? pause : play}>
            {isPlaying ? 'Pause' : (currentStateIndex >= states.length - 1 ? 'Replay' : 'Play')}
        </button>
        <button on:click={prev} disabled={isPlaying || currentStateIndex === 0} class="btn-secondary">Prev</button>
        <button on:click={step} disabled={isPlaying || currentStateIndex >= states.length - 1}>Next</button>
        <button on:click={reset} class="btn-secondary">Reset</button>
        <div class="speed-control">
            <label for="speed-bub">Speed (ms):</label>
            <input type="range" id="speed-bub" min="100" max="2500" bind:value={speed} style="direction: rtl" />
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
                        {#if currentState.currIndex === idx}<span class="badge badge-curr">j</span>{/if}
                        {#if currentState.compareIndex === idx}<span class="badge badge-compare">j+1</span>{/if}
                    </div>
                    <div 
                        class="array-element"
                        class:highlight={currentState.highlight.includes(idx)}
                        class:sorted={currentState.sortedIndices.includes(idx)}
                    >
                        <div class="value">{num}</div>
                        <div class="index">{idx}</div>
                    </div>
                </div>
            {/each}
        </div>
        
        <div class="pointers-legend">
            <div class="legend-item"><span class="badge badge-curr">j</span> Elemen Pertama</div>
            <div class="legend-item"><span class="badge badge-compare">j+1</span> Elemen Kedua</div>
        </div>
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>Step:</strong> <span class="var-val">{currentStateIndex + 1} / {states.length}</span></p>
            <p><strong>j / j+1:</strong> <span class="var-val">{currentState.currIndex !== -1 ? currentState.currIndex : '-'} / {currentState.compareIndex !== -1 ? currentState.compareIndex : '-'}</span></p>
        </div>
        <div class="status">
            <p><strong>Status:</strong> 
                <span class="status-text">{currentState.description}</span>
            </p>
        </div>
    </div>
</div>

<style>
    .custom-input-container {
        margin-bottom: 1rem;
        font-family: inherit;
        color: var(--color-ink);
        background: var(--color-surface-alt);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--color-line);
    }
    
    .custom-input-container label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 0.9rem;
    }

    .input-group {
        display: flex;
        gap: 0.5rem;
    }

    .input-group input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid var(--color-line);
        border-radius: 4px;
        background: var(--color-surface);
        color: var(--color-ink);
        font-family: var(--font-mono, monospace);
    }

    .apply-btn {
        background: var(--color-accent);
    }

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
    
    .badge-curr { background: var(--color-accent); }
    .badge-compare { background: var(--color-link); }
    
    .pointers-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--color-surface);
        border-radius: 6px;
        border: 1px dashed var(--color-line);
        font-size: 0.9rem;
        color: var(--color-ink);
        align-items: center;
        justify-content: center;
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

    .sorted {
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
