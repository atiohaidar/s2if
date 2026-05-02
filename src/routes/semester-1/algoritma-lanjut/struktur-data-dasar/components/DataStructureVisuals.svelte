<script lang="ts">
    // DataStructureVisuals.svelte
</script>

<div class="visuals-grid">
    <!-- STACK -->
    <div class="ds-card">
        <h3>Stack (LIFO)</h3>
        <div class="ds-content flex-col">
            <div class="stack-arrow">
                <span class="label">Top</span>
                <span class="arrow">&rarr;</span>
            </div>
            <div class="stack-container">
                <div class="stack-item top">30</div>
                <div class="stack-item">20</div>
                <div class="stack-item">10</div>
                <div class="stack-base">Bottom</div>
            </div>
        </div>
    </div>

    <!-- QUEUE -->
    <div class="ds-card">
        <h3>Queue (FIFO)</h3>
        <div class="ds-content">
            <div class="queue-container">
                <div class="queue-arrow out">
                    <span class="label">Front<br/>(Dequeue)</span>
                    <span class="arrow">&larr;</span>
                </div>
                <div class="queue-box">
                    <div class="queue-item">A</div>
                    <div class="queue-item">B</div>
                    <div class="queue-item">C</div>
                </div>
                <div class="queue-arrow in">
                    <span class="label">Back<br/>(Enqueue)</span>
                    <span class="arrow">&larr;</span>
                </div>
            </div>
        </div>
    </div>

    <!-- LINKED LIST -->
    <div class="ds-card">
        <h3>Linked List</h3>
        <div class="ds-content">
            <div class="ll-container">
                <div class="ll-head-label">Head &rarr;</div>
                <div class="ll-node">
                    <div class="ll-data">7</div>
                    <div class="ll-ptr">&bull;</div>
                </div>
                <div class="ll-arrow">&rarr;</div>
                <div class="ll-node">
                    <div class="ll-data">9</div>
                    <div class="ll-ptr">&bull;</div>
                </div>
                <div class="ll-arrow">&rarr;</div>
                <div class="ll-node">
                    <div class="ll-data">12</div>
                    <div class="ll-ptr null-ptr">/</div>
                </div>
            </div>
        </div>
    </div>

    <!-- HASH TABLE -->
    <div class="ds-card">
        <h3>Hash Table</h3>
        <div class="ds-content">
            <div class="hash-container">
                <div class="hash-bucket">
                    <div class="bucket-idx">0</div>
                    <div class="bucket-val empty">-</div>
                </div>
                <div class="hash-bucket">
                    <div class="bucket-idx">1</div>
                    <div class="bucket-val">Andi: 88</div>
                </div>
                <div class="hash-bucket">
                    <div class="bucket-idx">2</div>
                    <div class="bucket-val">Budi: 91</div>
                    <div class="ll-arrow" style="margin: 0 4px;">&rarr;</div>
                    <div class="bucket-val">Cici: 95</div>
                </div>
            </div>
        </div>
    </div>

    <!-- TREE -->
    <div class="ds-card">
        <h3>Tree / Heap</h3>
        <div class="ds-content svg-content">
            <svg viewBox="0 0 200 120" class="graph-svg">
                <!-- Edges -->
                <line x1="100" y1="20" x2="60" y2="60" class="edge" />
                <line x1="100" y1="20" x2="140" y2="60" class="edge" />
                <line x1="60" y1="60" x2="40" y2="100" class="edge" />
                <line x1="60" y1="60" x2="80" y2="100" class="edge" />
                <line x1="140" y1="60" x2="160" y2="100" class="edge" />
                
                <!-- Nodes -->
                <circle cx="100" cy="20" r="14" class="node root" />
                <text x="100" y="24" class="node-text">8</text>
                
                <circle cx="60" cy="60" r="14" class="node" />
                <text x="60" y="64" class="node-text">3</text>
                
                <circle cx="140" cy="60" r="14" class="node" />
                <text x="140" y="64" class="node-text">10</text>
                
                <circle cx="40" cy="100" r="14" class="node leaf" />
                <text x="40" y="104" class="node-text">1</text>
                
                <circle cx="80" cy="100" r="14" class="node leaf" />
                <text x="80" y="104" class="node-text">6</text>
                
                <circle cx="160" cy="100" r="14" class="node leaf" />
                <text x="160" y="104" class="node-text">14</text>
            </svg>
        </div>
    </div>

    <!-- GRAPH -->
    <div class="ds-card">
        <h3>Graph (Undirected)</h3>
        <div class="ds-content svg-content">
            <svg viewBox="0 0 200 120" class="graph-svg">
                <!-- Edges -->
                <line x1="50" y1="30" x2="150" y2="30" class="edge" />
                <line x1="50" y1="30" x2="50" y2="90" class="edge" />
                <line x1="150" y1="30" x2="150" y2="90" class="edge" />
                <line x1="50" y1="90" x2="150" y2="30" class="edge" />
                
                <!-- Nodes -->
                <circle cx="50" cy="30" r="16" class="node" />
                <text x="50" y="35" class="node-text">1</text>
                
                <circle cx="150" cy="30" r="16" class="node" />
                <text x="150" y="35" class="node-text">2</text>
                
                <circle cx="50" cy="90" r="16" class="node" />
                <text x="50" y="95" class="node-text">4</text>
                
                <circle cx="150" cy="90" r="16" class="node" />
                <text x="150" y="95" class="node-text">3</text>
            </svg>
        </div>
    </div>
</div>

<style>
    .visuals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }

    .ds-card {
        background: var(--color-surface);
        border: 1px solid var(--color-line);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
    }

    .ds-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-link);
    }

    .ds-card h3 {
        margin: 0;
        padding: 0.75rem 1rem;
        background: var(--color-surface-alt);
        border-bottom: 1px solid var(--color-line);
        font-size: 1rem;
        text-align: center;
        color: var(--color-ink);
    }

    .ds-content {
        padding: 1.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        background: var(--color-surface);
    }
    
    .flex-col {
        flex-direction: column;
    }

    /* Stack Styles */
    .stack-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: 3px solid var(--color-ink-muted);
        border-right: 3px solid var(--color-ink-muted);
        border-bottom: 3px solid var(--color-ink-muted);
        border-radius: 0 0 8px 8px;
        padding: 4px;
        width: 80px;
    }

    .stack-item {
        width: 100%;
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-link);
        color: var(--color-ink);
        padding: 8px 0;
        text-align: center;
        font-weight: bold;
        margin-bottom: 4px;
        border-radius: 4px;
    }
    
    .stack-item.top {
        background: var(--color-status-success-soft);
        border-color: var(--color-status-success-border);
    }

    .stack-base {
        font-size: 0.75rem;
        color: var(--color-ink-muted);
        margin-top: 4px;
    }

    .stack-arrow {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 100px;
        margin-bottom: -20px;
        z-index: 2;
    }
    
    .stack-arrow .label {
        font-weight: bold;
        color: var(--color-status-success-text);
        font-size: 0.85rem;
    }

    /* Queue Styles */
    .queue-container {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
    }

    .queue-box {
        display: flex;
        border-top: 3px solid var(--color-ink-muted);
        border-bottom: 3px solid var(--color-ink-muted);
        padding: 4px;
        gap: 4px;
    }

    .queue-item {
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-accent);
        color: var(--color-ink);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 4px;
    }

    .queue-arrow {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 10px;
        color: var(--color-ink-muted);
        font-size: 0.75rem;
        text-align: center;
    }
    
    .queue-arrow.out { color: var(--color-status-success-text); font-weight: bold; }
    .queue-arrow.in { color: var(--color-link); font-weight: bold; }
    .queue-arrow .arrow { font-size: 1.2rem; }

    /* Linked List Styles */
    .ll-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .ll-head-label {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--color-link);
        margin-right: 8px;
    }

    .ll-node {
        display: flex;
        border: 2px solid var(--color-status-wip);
        border-radius: 6px;
        overflow: hidden;
        background: var(--color-surface-elevated);
    }

    .ll-data {
        padding: 6px 10px;
        font-weight: bold;
        color: var(--color-ink);
        border-right: 1px solid var(--color-status-wip);
    }

    .ll-ptr {
        padding: 6px;
        background: rgba(0, 0, 0, 0.03);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .null-ptr {
        color: var(--color-status-error);
        font-weight: bold;
    }

    .ll-arrow {
        margin: 0 6px;
        color: var(--color-ink-muted);
        font-weight: bold;
    }

    /* Hash Table Styles */
    .hash-container {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
    }

    .hash-bucket {
        display: flex;
        align-items: center;
    }

    .bucket-idx {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 4px;
        margin-right: 12px;
        font-weight: bold;
        color: var(--color-ink-muted);
    }

    .bucket-val {
        padding: 4px 10px;
        background: var(--color-callout-info-end);
        border: 1px solid var(--color-link);
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: bold;
        color: var(--color-ink);
    }
    
    .bucket-val.empty {
        background: var(--color-surface-alt);
        border-color: var(--color-line);
        color: var(--color-ink-muted);
    }

    /* SVG Graphics Styles */
    .svg-content {
        padding: 1rem;
    }
    
    .graph-svg {
        width: 100%;
        height: 100%;
        max-height: 150px;
    }
    
    .node {
        fill: var(--color-surface-elevated);
        stroke: var(--color-status-success-border);
        stroke-width: 2.5;
    }
    
    .node.root {
        stroke: var(--color-accent);
        fill: rgba(255, 99, 71, 0.1);
    }
    
    .node.leaf {
        stroke: var(--color-status-todo);
    }
    
    .node-text {
        font-size: 14px;
        font-weight: bold;
        fill: var(--color-ink);
        text-anchor: middle;
        dominant-baseline: central;
    }
    
    .edge {
        stroke: var(--color-ink-muted);
        stroke-width: 2;
    }
</style>
