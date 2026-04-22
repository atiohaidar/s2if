<script lang="ts">
    import { onMount } from "svelte";

    export let initialArray: number[] = [38, 27, 43, 3, 9, 82, 10];
    
    type State = {
        array: number[];
        description: string;
        highlight: number[]; 
        temp: (number | null)[]; 
        left: number; 
        right: number;
    };

    let states: State[] = [];
    let currentStateIndex = 0;
    let isPlaying = false;
    let speed = 800;
    let timeoutId: any;

    function generateStates(arr: number[]) {
        let array = [...arr];
        let newStates: State[] = [];

        function copyState(desc: string, h: number[] = [], t: (number|null)[] = [], l: number = -1, r: number = -1) {
            newStates.push({
                array: [...array],
                description: desc,
                highlight: h,
                temp: [...t],
                left: l,
                right: r
            });
        }

        function merge(l: number, m: number, r: number) {
            copyState(`Akan menggabungkan bagian kiri [${l}..${m}] dan kanan [${m+1}..${r}]`, [], [], l, r);
            let leftArr = array.slice(l, m + 1);
            let rightArr = array.slice(m + 1, r + 1);
            
            let i = 0, j = 0;
            let temp = new Array(r - l + 1).fill(null);
            let tempIndex = 0;

            while (i < leftArr.length && j < rightArr.length) {
                copyState(`Membandingkan ${leftArr[i]} dan ${rightArr[j]}`, [l + i, m + 1 + j], temp, l, r);
                if (leftArr[i] <= rightArr[j]) {
                    temp[tempIndex] = leftArr[i];
                    copyState(`Memilih ${leftArr[i]} karena lebih kecil (atau sama)`, [l + i], temp, l, r);
                    i++;
                } else {
                    temp[tempIndex] = rightArr[j];
                    copyState(`Memilih ${rightArr[j]} karena lebih kecil`, [m + 1 + j], temp, l, r);
                    j++;
                }
                tempIndex++;
            }

            while (i < leftArr.length) {
                copyState(`Memasukkan sisa elemen kiri: ${leftArr[i]}`, [l + i], temp, l, r);
                temp[tempIndex] = leftArr[i];
                i++;
                tempIndex++;
            }

            while (j < rightArr.length) {
                copyState(`Memasukkan sisa elemen kanan: ${rightArr[j]}`, [m + 1 + j], temp, l, r);
                temp[tempIndex] = rightArr[j];
                j++;
                tempIndex++;
            }
            
            copyState(`Bagian digabungkan ke temporary array`, [], temp, l, r);

            for (let idx = 0; idx < temp.length; idx++) {
                array[l + idx] = temp[idx] as number;
                copyState(`Menyalin ${temp[idx]} kembali ke array asli...`, [l + idx], temp, l, r);
            }
            copyState(`Penggabungan selesai untuk rentang [${l}..${r}]`, [], [], -1, -1);
        }

        function sort(l: number, r: number) {
            if (l < r) {
                let m = Math.floor((l + r) / 2);
                copyState(`Membagi array pada rentang [${l}..${r}] menjadi [${l}..${m}] dan [${m+1}..${r}]`, [], [], l, r);
                sort(l, m);
                sort(m + 1, r);
                merge(l, m, r);
            } else {
                copyState(`Elemen tunggal di indeks [${l}], tidak perlu dibagi`, [l], [], l, r);
            }
        }

        copyState("Memulai Merge Sort", []);
        sort(0, array.length - 1);
        copyState("Pengurutan Selesai!", [], [], -1, -1);
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
        temp: [],
        left: -1,
        right: -1
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
                <div 
                    class="array-element"
                    class:in-bounds={currentState.left !== -1 && idx >= currentState.left && idx <= currentState.right}
                    class:highlight={currentState.highlight.includes(idx)}
                    class:fully-sorted={currentStateIndex === states.length - 1}
                >
                    <div class="value">{num}</div>
                    <div class="index">{idx}</div>
                </div>
            {/each}
        </div>

        {#if currentState.temp && currentState.temp.length > 0}
            <div class="temp-container">
                <div class="key-label">Temporary Array untuk penggabungan:</div>
                <div class="array-container temp-array">
                    {#each currentState.temp as tempNum, idx}
                        <div class="array-element temp-element" class:has-value={tempNum !== null}>
                            <div class="value">{tempNum !== null ? tempNum : ''}</div>
                            <div class="index">{currentState.left + idx}</div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="temp-placeholder"></div>
        {/if}
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>Step:</strong> <span class="var-val">{currentStateIndex + 1} / {states.length}</span></p>
            <p><strong>Rentang:</strong> <span class="var-val">{currentState.left !== -1 ? `[${currentState.left}..${currentState.right}]` : '-'}</span></p>
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
        min-height: 180px;
    }

    .array-container {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    .temp-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 6px;
        background: var(--color-status-info-soft);
        border: 1px dashed var(--color-link);
        width: 100%;
    }

    .temp-placeholder {
        height: 100px;
        width: 100%;
    }

    .key-label {
        font-weight: bold;
        color: var(--color-link);
        font-size: 0.9rem;
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

    .temp-element {
        border-color: var(--color-line);
        background: transparent;
        border-style: dashed;
    }
    
    .temp-element.has-value {
        border-style: solid;
        border-color: var(--color-link);
        background: var(--color-callout-info-start);
    }

    /* Colors and states */
    .in-bounds {
        border-color: var(--color-status-wip);
        background: var(--color-callout-warning-start);
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
