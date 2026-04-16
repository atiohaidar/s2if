<script lang="ts">
    type NodeId = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
    type TieMode = "kanan" | "kiri";

    type Operation =
        | { kind: "union"; x: NodeId; y: NodeId }
        | { kind: "find"; x: NodeId };

    const nodes: NodeId[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    const operations: Operation[] = [
        { kind: "union", x: "a", y: "e" },
        { kind: "union", x: "d", y: "g" },
        { kind: "union", x: "h", y: "g" },
        { kind: "find", x: "h" },
        { kind: "union", x: "e", y: "f" },
        { kind: "union", x: "b", y: "c" },
        { kind: "union", x: "a", y: "b" },
        { kind: "find", x: "b" },
        { kind: "find", x: "d" }
    ];

    function makeFreshRecord<T>(value: T): Record<NodeId, T> {
        return {
            a: value,
            b: value,
            c: value,
            d: value,
            e: value,
            f: value,
            g: value,
            h: value
        };
    }

    let parent = $state<Record<NodeId, NodeId>>({
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        e: "e",
        f: "f",
        g: "g",
        h: "h"
    });

    let rank = $state<Record<NodeId, number>>(makeFreshRecord(0));
    let tieMode = $state<TieMode>("kanan");
    let step = $state(0);
    let message = $state("Klik Next untuk mulai simulasi operasi DSU.");

    function findRoot(x: NodeId): NodeId {
        if (parent[x] !== x) {
            parent[x] = findRoot(parent[x]);
        }
        return parent[x];
    }

    function findRootReadonly(x: NodeId): NodeId {
        let current: NodeId = x;
        while (parent[current] !== current) {
            current = parent[current];
        }
        return current;
    }

    function unionSet(x: NodeId, y: NodeId): string {
        const rx = findRoot(x);
        const ry = findRoot(y);

        if (rx === ry) {
            return `union(${x}, ${y}) -> skip (sudah satu himpunan, root=${rx})`;
        }

        if (rank[rx] < rank[ry]) {
            parent[rx] = ry;
            return `union(${x}, ${y}) -> parent[${rx}] = ${ry}`;
        }

        if (rank[rx] > rank[ry]) {
            parent[ry] = rx;
            return `union(${x}, ${y}) -> parent[${ry}] = ${rx}`;
        }

        if (tieMode === "kanan") {
            parent[rx] = ry;
            rank[ry] += 1;
            return `union(${x}, ${y}) rank sama -> parent[${rx}] = ${ry}, rank[${ry}]++`;
        }

        parent[ry] = rx;
        rank[rx] += 1;
        return `union(${x}, ${y}) rank sama -> parent[${ry}] = ${rx}, rank[${rx}]++`;
    }

    function applyOperation(op: Operation): string {
        if (op.kind === "union") {
            return unionSet(op.x, op.y);
        }

        const root = findRoot(op.x);
        return `find(${op.x}) -> root=${root} (dengan path compression)`;
    }

    function resetState() {
        parent = {
            a: "a",
            b: "b",
            c: "c",
            d: "d",
            e: "e",
            f: "f",
            g: "g",
            h: "h"
        };
        rank = makeFreshRecord(0);
        step = 0;
        message = "Klik Next untuk mulai simulasi operasi DSU.";
    }

    function replayTo(targetStep: number) {
        resetState();
        for (let i = 0; i < targetStep; i += 1) {
            message = applyOperation(operations[i]);
            step = i + 1;
        }

        if (targetStep === 0) {
            message = "Klik Next untuk mulai simulasi operasi DSU.";
        }
    }

    function nextStep() {
        if (step >= operations.length) {
            message = "Semua operasi sudah dijalankan.";
            return;
        }

        message = applyOperation(operations[step]);
        step += 1;
    }

    function prevStep() {
        if (step === 0) {
            return;
        }
        replayTo(step - 1);
    }

    function switchTieMode(mode: TieMode) {
        tieMode = mode;
        replayTo(0);
    }

    function parentVector(): string {
        return nodes.map((node) => parent[node]).join(", ");
    }

    function rankVector(): string {
        return nodes.map((node) => String(rank[node])).join(", ");
    }

    function groupsSummary(): string {
        const groups = new Map<NodeId, NodeId[]>();

        for (const node of nodes) {
            const root = findRootReadonly(node);
            const bucket = groups.get(root) ?? [];
            bucket.push(node);
            groups.set(root, bucket);
        }

        return [...groups.entries()]
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([root, members]) => `${root}: {${members.join(",")}}`)
            .join(" | ");
    }

    function currentOperationText(): string {
        if (step >= operations.length) {
            return "Selesai";
        }

        const op = operations[step];
        if (op.kind === "union") {
            return `union(${op.x}, ${op.y})`;
        }
        return `find(${op.x})`;
    }
</script>

<div class="visualizer-container">
    <div class="header-row">
        <h4>DSU Visualizer</h4>
        <span class="step-badge">Step {step}/{operations.length}</span>
    </div>

    <div class="tie-mode-controls" role="group" aria-label="Pilih tie-break rank sama">
        <button
            class:active={tieMode === "kanan"}
            onclick={() => switchTieMode("kanan")}
        >
            Tie-break: kanan
        </button>
        <button
            class:active={tieMode === "kiri"}
            onclick={() => switchTieMode("kiri")}
        >
            Tie-break: kiri
        </button>
    </div>

    <div class="controls">
        <button onclick={prevStep} disabled={step === 0}>Prev</button>
        <button onclick={nextStep} disabled={step >= operations.length}>Next</button>
        <button onclick={() => replayTo(0)}>Reset</button>
    </div>

    <div class="operation-line">
        <strong>Operasi berikutnya:</strong> <code>{currentOperationText()}</code>
    </div>

    <div class="message">{message}</div>

    <div class="grid-wrap">
        <table class="state-table">
            <thead>
                <tr>
                    <th>Node</th>
                    {#each nodes as node}
                        <th>{node}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>parent</td>
                    {#each nodes as node}
                        <td>{parent[node]}</td>
                    {/each}
                </tr>
                <tr>
                    <td>rank</td>
                    {#each nodes as node}
                        <td>{rank[node]}</td>
                    {/each}
                </tr>
            </tbody>
        </table>
    </div>

    <div class="summary">
        <p><strong>parent[a..h]</strong> = [{parentVector()}]</p>
        <p><strong>rank[a..h]</strong> = [{rankVector()}]</p>
        <p><strong>Komponen saat ini</strong>: {groupsSummary()}</p>
    </div>
</div>

<style>
    .visualizer-container {
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-binder);
        border-radius: 12px;
        padding: 1.25rem;
        margin: 1.25rem 0;
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.12);
    }

    .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-bottom: 0.9rem;
    }

    .header-row h4 {
        margin: 0;
        color: var(--color-ink);
    }

    .step-badge {
        background: var(--color-status-info-soft);
        color: var(--color-status-info-border);
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .tie-mode-controls,
    .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 0.85rem;
    }

    button {
        border: none;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        border-radius: 8px;
        padding: 0.5rem 0.9rem;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;
    }

    button.active {
        background: var(--color-ink-muted);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.08) inset;
    }

    button:hover:not(:disabled) {
        transform: translateY(-1px);
    }

    button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .operation-line,
    .message {
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
    }

    .message {
        background: var(--color-surface-soft);
        border-left: 4px solid var(--color-binder);
        border-radius: 8px;
        padding: 0.65rem 0.75rem;
    }

    .grid-wrap {
        overflow-x: auto;
        margin-bottom: 0.75rem;
    }

    .state-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 520px;
        background: var(--color-paper);
        border-radius: 8px;
        overflow: hidden;
    }

    .state-table th,
    .state-table td {
        border: 1px solid var(--color-line);
        text-align: center;
        padding: 0.5rem;
        font-size: 0.9rem;
    }

    .state-table thead th {
        background: var(--color-surface-soft);
    }

    .state-table tbody td:first-child {
        font-weight: 700;
        background: var(--color-surface-soft);
    }

    .summary p {
        margin: 0.35rem 0;
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .visualizer-container {
            padding: 1rem;
        }

        button {
            padding: 0.5rem 0.7rem;
            font-size: 0.88rem;
        }

        .state-table th,
        .state-table td {
            font-size: 0.85rem;
            padding: 0.42rem;
        }

        .summary p,
        .message,
        .operation-line {
            font-size: 0.87rem;
        }
    }

    @media (max-width: 480px) {
        .header-row {
            align-items: flex-start;
            flex-direction: column;
        }

        .tie-mode-controls,
        .controls {
            gap: 0.45rem;
        }

        button {
            width: 100%;
        }
    }
</style>
