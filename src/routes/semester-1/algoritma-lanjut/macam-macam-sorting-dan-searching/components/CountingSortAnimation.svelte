<script lang="ts">
    import { onMount } from "svelte";

    export let initialArray: number[] = [4, 2, 2, 8, 3, 3, 1];
    
    type State = {
        inputArray: (number | null)[];
        countArray: number[];
        outputArray: (number | null)[];
        description: string;
        highlightInput: number; 
        highlightCount: number;
        highlightOutput: number;
    };

    let states: State[] = [];
    let currentStateIndex = 0;
    let isPlaying = false;
    let speed = 800;
    let timeoutId: any;

    function generateStates(arr: number[]) {
        let newStates: State[] = [];
        let maxVal = Math.max(...arr);
        
        let input = [...arr];
        let count = new Array(maxVal + 1).fill(0);
        let output = new Array(arr.length).fill(null);

        function copyState(desc: string, hIn: number = -1, hCount: number = -1, hOut: number = -1) {
            newStates.push({
                inputArray: [...input],
                countArray: [...count],
                outputArray: [...output],
                description: desc,
                highlightInput: hIn,
                highlightCount: hCount,
                highlightOutput: hOut
            });
        }

        copyState(`Memulai Counting Sort. Nilai maksimum adalah ${maxVal}, jadi siapkan array Count berukuran ${maxVal + 1} (indeks 0 sampai ${maxVal}).`);

        // Phase 1: Counting
        for (let i = 0; i < input.length; i++) {
            let val = input[i];
            copyState(`Membaca elemen input di indeks ${i} yang bernilai ${val}.`, i, -1, -1);
            count[val]++;
            copyState(`Tambahkan frekuensi pada array Count di indeks (val) ${val} menjadi ${count[val]}.`, i, val, -1);
        }

        copyState(`Tahap menghitung frekuensi selesai. Sekarang kita mulai membangun array output secara urut.`);

        // Phase 2: Building output
        let outIdx = 0;
        for (let val = 0; val < count.length; val++) {
            let freq = count[val];
            if (freq > 0) {
                copyState(`Nilai ${val} muncul sebanyak ${freq} kali.`, -1, val, -1);
                for (let k = 0; k < freq; k++) {
                    output[outIdx] = val;
                    copyState(`Menambahkan nilai ${val} ke array output di indeks ${outIdx}.`, -1, val, outIdx);
                    outIdx++;
                }
            } else {
                copyState(`Nilai ${val} tidak muncul (frekuensi 0), lewati.`, -1, val, -1);
            }
        }

        copyState("Pengurutan Selesai!", -1, -1, -1);
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
        inputArray: [...initialArray],
        countArray: new Array(Math.max(...initialArray) + 1).fill(0),
        outputArray: new Array(initialArray.length).fill(null),
        description: "Loading...",
        highlightInput: -1,
        highlightCount: -1,
        highlightOutput: -1
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
        <div class="arrays-wrapper">
            <!-- Input Array -->
            <div class="array-group">
                <div class="group-label">Input Array</div>
                <div class="array-container">
                    {#each currentState.inputArray as num, idx}
                        <div 
                            class="array-element"
                            class:highlight={currentState.highlightInput === idx}
                        >
                            <div class="value">{num}</div>
                            <div class="index">{idx}</div>
                        </div>
                    {/each}
                </div>
            </div>
            
            <!-- Count Array -->
            <div class="array-group count-group">
                <div class="group-label">Count Array (Frekuensi)</div>
                <div class="array-container">
                    {#each currentState.countArray as freq, val}
                        <div 
                            class="array-element count-element"
                            class:highlight={currentState.highlightCount === val}
                            class:has-count={freq > 0}
                        >
                            <div class="value">{freq}</div>
                            <div class="index val-index">val:{val}</div>
                        </div>
                    {/each}
                </div>
            </div>
            
            <!-- Output Array -->
            <div class="array-group">
                <div class="group-label">Output Array</div>
                <div class="array-container">
                    {#each currentState.outputArray as num, idx}
                        <div 
                            class="array-element"
                            class:empty={num === null}
                            class:highlight={currentState.highlightOutput === idx}
                            class:fully-sorted={num !== null && currentStateIndex === states.length - 1}
                        >
                            <div class="value">{num !== null ? num : ''}</div>
                            <div class="index">{idx}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>Step:</strong> <span class="var-val">{currentStateIndex + 1} / {states.length}</span></p>
            <p><strong>Fokus Nilai:</strong> <span class="var-val">{currentState.highlightCount !== -1 ? currentState.highlightCount : '-'}</span></p>
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
        margin-bottom: 2rem;
    }
    
    .arrays-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }

    .array-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
    }

    .group-label {
        font-weight: bold;
        color: var(--color-link);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .count-group {
        padding: 1.5rem;
        background: var(--color-status-info-soft);
        border: 1px dashed var(--color-link);
        border-radius: 8px;
    }

    .array-container {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    .array-element {
        width: 45px;
        height: 45px;
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
        bottom: -22px;
        font-size: 0.75rem;
        color: var(--color-ink-muted);
        font-weight: normal;
        white-space: nowrap;
    }
    
    .val-index {
        color: var(--color-binder) !important;
        font-weight: bold !important;
    }

    .count-element {
        border-color: var(--color-line);
        background: transparent;
        border-style: dashed;
    }
    
    .count-element.has-count {
        border-style: solid;
        border-color: var(--color-link);
        background: var(--color-surface-elevated);
    }

    /* Colors and states */
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
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
    }
</style>
