<script lang="ts">
    import { onMount } from 'svelte';

    type Node = {
        id: number;
        value: number;
        x: number;
        y: number;
        isRoot?: boolean;
        isLeaf?: boolean;
        left?: number;
        right?: number;
    };

    const nodes: Node[] = [
        { id: 1, value: 8, x: 150, y: 30, isRoot: true, left: 2, right: 3 },
        { id: 2, value: 3, x: 70, y: 90, left: 4, right: 5 },
        { id: 3, value: 10, x: 230, y: 90, right: 6 },
        { id: 4, value: 1, x: 30, y: 150, isLeaf: true },
        { id: 5, value: 6, x: 110, y: 150, isLeaf: true },
        { id: 6, value: 14, x: 270, y: 150, isLeaf: true }
    ];

    const edges = [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 6 }
    ];

    const inorderPath = [4, 2, 5, 1, 3, 6]; // Node IDs in inorder: 1, 3, 6, 8, 10, 14

    let highlightedNodes: number[] = [];
    let highlightEdges: boolean = false;
    let infoText = "Pilih salah satu tombol di bawah untuk melihat istilah atau simulasi traversal.";
    let inorderResult: number[] = [];
    let isPlaying = false;

    function reset() {
        highlightedNodes = [];
        inorderResult = [];
        highlightEdges = false;
        isPlaying = false;
        infoText = "Pilih salah satu tombol di bawah untuk melihat istilah atau simulasi traversal.";
    }

    function showRoot() {
        reset();
        highlightedNodes = [1];
        infoText = "Root (Akar) adalah node paling atas yang tidak memiliki parent (Angka 8).";
    }

    function showLeaves() {
        reset();
        highlightedNodes = [4, 5, 6];
        infoText = "Leaf (Daun) adalah node di ujung bawah yang tidak memiliki anak/child (Angka 1, 6, dan 14).";
    }

    function showParentChild() {
        reset();
        highlightedNodes = [2, 4, 5];
        highlightEdges = true;
        infoText = "Contoh Relasi: Node 3 adalah PARENT dari Node 1 dan Node 6. Node 1 dan 6 adalah CHILD dari Node 3.";
    }

    async function playInorder() {
        if (isPlaying) return;
        reset();
        isPlaying = true;
        infoText = "Inorder Traversal (Kiri -> Root -> Kanan). Memulai perjalanan...";
        
        for (let i = 0; i < inorderPath.length; i++) {
            if (!isPlaying) break; // If user clicked reset
            
            const nodeId = inorderPath[i];
            const node = nodes.find(n => n.id === nodeId);
            
            highlightedNodes = [nodeId];
            inorderResult = [...inorderResult, node!.value];
            
            await new Promise(r => setTimeout(r, 800));
        }
        
        if (isPlaying) {
            highlightedNodes = inorderPath; // Highlight all at the end
            infoText = "Inorder Traversal Selesai! Hasilnya menghasilkan urutan naik (sorted) pada BST.";
            isPlaying = false;
        }
    }
</script>

<div class="demo-container">
    <div class="info-panel">
        <p>{infoText}</p>
        {#if inorderResult.length > 0}
            <div class="result-box">
                Hasil Inorder: <strong>{inorderResult.join(', ')}</strong>
            </div>
        {/if}
    </div>

    <div class="visual-area">
        <svg viewBox="0 0 300 190" class="tree-svg">
            <!-- Edges -->
            {#each edges as edge}
                {@const fromNode = nodes.find(n => n.id === edge.from)}
                {@const toNode = nodes.find(n => n.id === edge.to)}
                <line 
                    x1={fromNode?.x} 
                    y1={fromNode?.y} 
                    x2={toNode?.x} 
                    y2={toNode?.y} 
                    class="edge"
                    class:highlighted-edge={highlightEdges && (highlightedNodes.includes(edge.from) && highlightedNodes.includes(edge.to))}
                />
            {/each}
            
            <!-- Nodes -->
            {#each nodes as node}
                <g class="node-group" class:highlighted={highlightedNodes.includes(node.id)}>
                    <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r="18" 
                        class="node-circle"
                    />
                    <text x={node.x} y={node.y + 1} class="node-text">{node.value}</text>
                </g>
            {/each}
        </svg>
    </div>

    <div class="controls">
        <button class="btn-info" on:click={showRoot}>Show Root</button>
        <button class="btn-info" on:click={showLeaves}>Show Leaves</button>
        <button class="btn-info" on:click={showParentChild}>Show Parent-Child</button>
        <button class="btn-play" on:click={playInorder} disabled={isPlaying}>Play Inorder Traversal</button>
        <button class="btn-reset" on:click={reset}>Reset</button>
    </div>
</div>

<style>
    .demo-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1rem 0;
        font-family: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .info-panel {
        background: var(--color-surface);
        border: 1px dashed var(--color-link);
        border-radius: 6px;
        padding: 1rem;
        width: 100%;
        margin-bottom: 1rem;
        text-align: center;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .info-panel p {
        margin: 0;
        color: var(--color-ink);
        font-weight: 500;
    }

    .result-box {
        margin-top: 10px;
        background: var(--color-callout-success-end);
        color: var(--color-status-success-text);
        padding: 6px 16px;
        border-radius: 20px;
        display: inline-block;
        font-size: 1.1rem;
        border: 1px solid var(--color-status-success-border);
    }

    .visual-area {
        width: 100%;
        max-width: 400px;
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
    }

    .tree-svg {
        width: 100%;
        height: auto;
        overflow: visible;
    }

    .edge {
        stroke: var(--color-ink-muted);
        stroke-width: 2.5;
        transition: stroke 0.3s, stroke-width 0.3s;
    }

    .highlighted-edge {
        stroke: var(--color-status-wip);
        stroke-width: 4;
    }

    .node-circle {
        fill: var(--color-surface-elevated);
        stroke: var(--color-link);
        stroke-width: 3;
        transition: all 0.3s ease;
    }

    .node-text {
        font-size: 16px;
        font-weight: bold;
        fill: var(--color-ink);
        text-anchor: middle;
        dominant-baseline: central;
        pointer-events: none;
    }

    .node-group.highlighted .node-circle {
        fill: var(--color-status-wip);
        stroke: var(--color-accent);
        transform: scale(1.15);
        transform-origin: center;
    }
    
    .node-group.highlighted .node-text {
        fill: var(--color-surface); /* White text on yellow/orange bg usually looks good, or keep ink */
    }

    .controls {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        color: white;
        transition: transform 0.1s, opacity 0.2s;
        font-size: 0.85rem;
    }
    
    button:active:not(:disabled) { transform: scale(0.95); }
    button:hover:not(:disabled) { opacity: 0.9; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }

    .btn-info { background: var(--color-link); }
    .btn-play { background: var(--color-status-success-border); }
    .btn-reset { background: var(--color-ink-muted); }
</style>
