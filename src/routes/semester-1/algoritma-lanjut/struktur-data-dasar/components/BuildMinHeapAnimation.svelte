<script lang="ts">
    import { onMount } from "svelte";

    export let initialArray: number[] = [9, 1, 7, 3, 6];
    let customInputStr = initialArray.join(", ");
    
    type State = {
        array: number[];
        description: string;
        highlight: number[]; 
        parentIdx: number;
        leftIdx: number;
        rightIdx: number;
        activeSubtreeRoot: number;
    };

    let states: State[] = [];
    let currentStateIndex = 0;
    let isPlaying = false;
    let speed = 1500;
    let timeoutId: any;

    function generateStates(arr: number[]) {
        let array = [...arr];
        let newStates: State[] = [];
        let currentSubtreeRoot = -1;

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
                rightIdx: r,
                activeSubtreeRoot: currentSubtreeRoot
            });
        }

        function heapifyDown(n: number, i: number) {
            let smallest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            copyState(`Heapify-down pada subtree root ${currentSubtreeRoot}: Memeriksa node di indeks ${i} (nilai: ${array[i]})`, [i], i, left < n ? left : -1, right < n ? right : -1);

            if (left < n) {
                copyState(`Bandingkan node (${array[smallest]}) dengan anak kiri (${array[left]})`, [smallest, left], i, left, right < n ? right : -1);
                if (array[left] < array[smallest]) {
                    smallest = left;
                    copyState(`Anak kiri (${array[left]}) lebih kecil, target terkecil sementara pindah ke kiri`, [smallest], i, left, right < n ? right : -1);
                }
            }

            if (right < n) {
                copyState(`Bandingkan target terkecil (${array[smallest]}) dengan anak kanan (${array[right]})`, [smallest, right], i, left, right);
                if (array[right] < array[smallest]) {
                    smallest = right;
                    copyState(`Anak kanan (${array[right]}) lebih kecil, target terkecil pindah ke kanan`, [smallest], i, left, right);
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
                copyState(`Subtree dari root ${currentSubtreeRoot} valid: Node (${array[i]}) sudah <= anak-anaknya.`, [i], i, left < n ? left : -1, right < n ? right : -1);
            }
        }

        function buildHeap() {
            let n = array.length;
            copyState("Posisi awal: Array acak yang belum menjadi Heap.", []);
            
            // Start from the last non-leaf node
            let startIdx = Math.floor(n / 2) - 1;
            copyState(`Mulai dari node non-leaf paling kanan (indeks floor(${n}/2)-1 = ${startIdx}) hingga root.`, [startIdx]);

            for (let i = startIdx; i >= 0; i--) {
                currentSubtreeRoot = i;
                copyState(`>>> Mulai iterasi untuk subtree dengan root di indeks ${i} (nilai: ${array[i]})`, [i]);
                heapifyDown(n, i);
            }
            
            currentSubtreeRoot = -1;
            copyState("Build-Heap selesai! Array sekarang merupakan Min-Heap yang valid.", [], -1, -1, -1);
        }

        buildHeap();
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
        parentIdx: -1,
        leftIdx: -1,
        rightIdx: -1,
        activeSubtreeRoot: -1
    };
    
    $: progress = states.length > 0 ? Math.round((currentStateIndex / (states.length - 1)) * 100) : 0;

    // Menghitung dimensi SVG yang dinamis agar aman untuk array panjang
    $: maxLevel = currentState.array.length > 0 ? Math.floor(Math.log2(currentState.array.length)) : 0;
    $: svgHeight = Math.max(250, (maxLevel + 1) * 75 + 40);
    $: maxNodesInLevel = Math.pow(2, maxLevel);
    $: svgWidth = Math.max(600, maxNodesInLevel * 60); // min 60px lebar per node

    // Menghitung koordinat untuk Tree Visualization
    $: treeNodes = currentState.array.map((val, idx) => {
        let level = Math.floor(Math.log2(idx + 1));
        let nodesInLevel = Math.pow(2, level);
        let posInLevel = idx - (nodesInLevel - 1);
        
        let y = 40 + level * 75;
        let segmentWidth = svgWidth / nodesInLevel;
        let x = segmentWidth / 2 + posInLevel * segmentWidth;
        
        return { val, idx, x, y };
    });

    $: treeEdges = treeNodes.map(node => {
        let leftIdx = 2 * node.idx + 1;
        let rightIdx = 2 * node.idx + 2;
        let edges = [];
        if (leftIdx < treeNodes.length) {
            edges.push({ x1: node.x, y1: node.y, x2: treeNodes[leftIdx].x, y2: treeNodes[leftIdx].y });
        }
        if (rightIdx < treeNodes.length) {
            edges.push({ x1: node.x, y1: node.y, x2: treeNodes[rightIdx].x, y2: treeNodes[rightIdx].y });
        }
        return edges;
    }).flat();
</script>

<div class="custom-input-container">
    <label for="custom-array">Input Array (pisahkan dengan koma):</label>
    <div class="input-group">
        <input type="text" id="custom-array" bind:value={customInputStr} placeholder="Contoh: 9, 1, 7, 3, 6" on:keydown={(e) => e.key === 'Enter' && applyCustomArray()} />
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
            <label for="speed">Speed (ms):</label>
            <input type="range" id="speed" min="100" max="2500" bind:value={speed} style="direction: rtl" />
            <span class="speed-value">{speed}</span>
        </div>
    </div>
    
    <div class="progress-container">
        <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    
    <div class="visualization-area">
        <div class="visual-split">
            <!-- Representasi Array -->
            <div class="array-section">
                <h5 class="section-title">Array View</h5>
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
                                class:active-root={currentState.activeSubtreeRoot === idx}
                            >
                                <div class="value">{num}</div>
                                <div class="index">{idx}</div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Representasi Tree -->
            <div class="tree-section">
                <h5 class="section-title">Tree View</h5>
                <div class="tree-container">
                    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} class="heap-tree" style={`min-width: ${svgWidth}px; height: ${svgHeight}px;`}>
                        <!-- Edges -->
                        {#each treeEdges as edge}
                            <line x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} stroke="var(--color-line)" stroke-width="2" />
                        {/each}
                        
                        <!-- Nodes -->
                        {#each treeNodes as node}
                            <g class="tree-node" style={`transform: translate(${node.x}px, ${node.y}px); transition: transform 0.3s ease;`}>
                                <circle 
                                    r="20" 
                                    fill={currentState.activeSubtreeRoot === node.idx ? "var(--color-status-success-soft)" : (currentState.highlight.includes(node.idx) ? "var(--color-callout-warning-end)" : "var(--color-surface-elevated)")} 
                                    stroke={currentState.activeSubtreeRoot === node.idx ? "var(--color-status-success-border)" : (currentState.highlight.includes(node.idx) ? "var(--color-status-wip)" : "var(--color-line)")}
                                    stroke-width="2"
                                    style="transition: all 0.3s ease;"
                                />
                                <text text-anchor="middle" dy=".3em" font-weight="bold" fill="var(--color-ink)">{node.val}</text>
                                <text text-anchor="middle" dy="2.5em" font-size="11" fill="var(--color-ink-muted)">{node.idx}</text>
                                
                                <!-- Pointers -->
                                {#if currentState.parentIdx === node.idx}
                                    <text text-anchor="middle" dy="-1.6em" font-size="12" font-weight="bold" fill="var(--color-accent)">N</text>
                                {/if}
                                {#if currentState.leftIdx === node.idx}
                                    <text text-anchor="middle" dy="-1.6em" font-size="12" font-weight="bold" fill="var(--color-link)">L</text>
                                {/if}
                                {#if currentState.rightIdx === node.idx}
                                    <text text-anchor="middle" dy="-1.6em" font-size="12" font-weight="bold" fill="var(--color-link)">R</text>
                                {/if}
                            </g>
                        {/each}
                    </svg>
                </div>
            </div>
        </div>
        
        <div class="pointers-legend">
            <div class="legend-item"><span class="badge badge-parent">N</span> Node saat ini</div>
            <div class="legend-item"><span class="badge badge-child">L / R</span> Anak (Left/Right)</div>
            <div class="legend-item"><div class="legend-color active-root-color"></div> Root Subtree Aktif</div>
        </div>
    </div>

    <div class="info-panel">
        <div class="variables">
            <p><strong>Step:</strong> <span class="var-val">{currentStateIndex + 1} / {states.length}</span></p>
            <p><strong>Subtree Root (i):</strong> <span class="var-val">{currentState.activeSubtreeRoot !== -1 ? currentState.activeSubtreeRoot : '-'}</span></p>
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
    }

    .visual-split {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 2rem;
    }

    .section-title {
        text-align: center;
        margin-bottom: 1rem;
        color: var(--color-ink-muted);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .tree-container {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        overflow-x: auto;
        background: var(--color-surface);
        border: 1px dashed var(--color-line);
        border-radius: 8px;
        padding: 1rem;
    }

    .heap-tree {
        max-width: none;
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
        align-items: center;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
    }

    .active-root-color {
        background: var(--color-status-success-soft);
        border: 2px solid var(--color-status-success-border);
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

    .active-root {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
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
