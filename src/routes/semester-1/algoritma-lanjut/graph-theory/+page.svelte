<!--
  CONTOH CATATAN VISUAL (Visual Note)
  ===================================
  Ini adalah contoh catatan dengan visualisasi interaktif.
  Studi kasus: Teori Graf - Visualisasi konektivitas node.
-->
<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";

    // State untuk visualisasi Graph
    let nodes = $state([
        { id: 1, x: 100, y: 100, label: "A" },
        { id: 2, x: 250, y: 80, label: "B" },
        { id: 3, x: 150, y: 250, label: "C" },
        { id: 4, x: 300, y: 200, label: "D" },
    ]);

    let edges = $state([
        { source: 1, target: 2 },
        { source: 2, target: 4 },
        { source: 1, target: 3 },
        { source: 3, target: 4 },
    ]);

    let selectedNode: number | null = $state(null);
    let draggingNode: number | null = $state(null);

    function handleMouseDown(id: number, event: MouseEvent) {
        selectedNode = id;
        draggingNode = id;
    }

    function handleMouseMove(event: MouseEvent) {
        if (draggingNode) {
            const svg = event.currentTarget as SVGSVGElement;
            const pt = svg.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

            const node = nodes.find((n) => n.id === draggingNode);
            if (node) {
                node.x = svgP.x;
                node.y = svgP.y;
            }
        }
    }

    function handleMouseUp() {
        draggingNode = null;
    }

    // Helper to get coordinates
    function getCoords(id: number) {
        return nodes.find((n) => n.id === id) || { x: 0, y: 0 };
    }
</script>

<svelte:head>
    <title>Teori Graf - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Teori Graf: Representasi Visual"
        date="15 Januari 2026"
        status="wip"
        tags={["Interactive"]}
    />

    <NoteSection title="Konsep Dasar">
        <p>
            Graf adalah kumpulan <span class="highlight">Vertices (Simpul)</span
            >
            dan
            <span class="highlight">Edges (Sisi)</span>. Di bawah ini adalah
            representasi interaktif dari graf sederhana.
        </p>
        <Callout type="info" title="Interaktif">
            Coba drag (seret) simpul-simpul di visualisasi di bawah ini!
        </Callout>
    </NoteSection>

    <!-- Visualisasi Interaktif -->
    <div class="visualization-container">
        <div class="controls">
            <button
                class="btn"
                onclick={() => {
                    nodes = [
                        ...nodes,
                        {
                            id: nodes.length + 1,
                            x: Math.random() * 400 + 50,
                            y: Math.random() * 300 + 50,
                            label: String.fromCharCode(65 + nodes.length),
                        },
                    ];
                }}>+ Tambah Node</button
            >

            <button
                class="btn btn-secondary"
                onclick={() => {
                    nodes = [
                        { id: 1, x: 100, y: 100, label: "A" },
                        { id: 2, x: 250, y: 80, label: "B" },
                        { id: 3, x: 150, y: 250, label: "C" },
                        { id: 4, x: 300, y: 200, label: "D" },
                    ];
                }}>Reset</button
            >
        </div>

        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <svg
            viewBox="0 0 500 400"
            class="graph-svg"
            onmousemove={handleMouseMove}
            onmouseup={handleMouseUp}
            role="application"
            aria-label="Interactive graph visualization"
        >
            <!-- Edges -->
            {#each edges as edge}
                {@const source = getCoords(edge.source)}
                {@const target = getCoords(edge.target)}
                <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    class="edge"
                />
            {/each}

            <!-- Nodes -->
            {#each nodes as node (node.id)}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <g
                    class="node-group"
                    transform="translate({node.x}, {node.y})"
                    onmousedown={(e) => handleMouseDown(node.id, e)}
                    class:selected={selectedNode === node.id}
                    class:dragging={draggingNode === node.id}
                >
                    <circle r="20" class="node-circle" />
                    <text dy="5" class="node-label">{node.label}</text>
                </g>
            {/each}
        </svg>

        <div class="stats">
            <p>
                Total Nodes: <strong>{nodes.length}</strong> | Total Edges:
                <strong>{edges.length}</strong>
            </p>
        </div>
    </div>

    <NoteSection title="Matriks Adjasensi">
        <p>Representasi matematis dari graf di atas:</p>
        <div class="matrix-box">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {#each nodes as node}
                            <th>{node.label}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each nodes as rowNode}
                        <tr>
                            <th>{rowNode.label}</th>
                            {#each nodes as colNode}
                                {@const isConnected = edges.some(
                                    (e) =>
                                        (e.source === rowNode.id &&
                                            e.target === colNode.id) ||
                                        (e.source === colNode.id &&
                                            e.target === rowNode.id),
                                )}
                                <td class:active={isConnected}>
                                    {isConnected ? 1 : 0}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </NoteSection>

    <BackLink
        href="/semester-1/algoritma-lanjut"
        label="Kembali ke Algoritma Lanjut"
    />
</article>

<style>
    .note-article {
        max-width: 800px;
    }

    /* Visualization Styles */
    .visualization-container {
        background: white;
        border: 1px solid var(--color-line);
        border-radius: 12px;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 2rem;
    }

    .controls {
        margin-bottom: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    .btn {
        background: var(--color-binder);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-family: var(--font-handwriting);
        font-size: 1.1rem;
    }

    .btn-secondary {
        background: #95a5a6;
    }

    .graph-svg {
        width: 100%;
        height: 300px;
        background: #fdfdfd;
        border: 1px dashed #eee;
        border-radius: 8px;
        cursor: crosshair;
    }

    .edge {
        stroke: #bdc3c7;
        stroke-width: 2;
    }

    .node-group {
        cursor: grab;
    }

    .node-group:active {
        cursor: grabbing;
    }

    .node-circle {
        fill: white;
        stroke: var(--color-ink);
        stroke-width: 2;
        transition: all 0.2s;
    }

    .node-group:hover .node-circle {
        fill: #ecf0f1;
        stroke: var(--color-binder);
    }

    .node-group.dragging .node-circle {
        fill: var(--color-highlight);
        stroke: var(--color-accent);
        stroke-width: 3;
    }

    .node-label {
        text-anchor: middle;
        font-family: var(--font-handwriting);
        font-weight: bold;
        font-size: 1.2rem;
        pointer-events: none;
        user-select: none;
    }

    .stats {
        text-align: right;
        font-size: 0.8rem;
        color: #7f8c8d;
        margin-top: 0.5rem;
    }

    /* Matrix Styles */
    .matrix-box {
        overflow-x: auto;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--color-line);
    }

    table {
        border-collapse: collapse;
        width: 100%;
        font-family: var(--font-mono);
    }

    th,
    td {
        border: 1px solid #eee;
        padding: 0.5rem;
        text-align: center;
    }

    th {
        background: #f9f9f9;
        color: var(--color-binder);
    }

    td.active {
        background: #e8f6f3;
        color: #27ae60;
        font-weight: bold;
    }
</style>
