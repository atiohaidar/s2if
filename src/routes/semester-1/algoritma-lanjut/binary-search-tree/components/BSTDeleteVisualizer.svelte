<script lang="ts">
    type Scenario = 'leaf' | 'one-child' | 'two-children';
    let scenario = $state<Scenario>('leaf');
    let step = $state(0);

    interface StepData {
        title: string;
        description: string;
        nodes: {val: number, x: number, y: number, style: 'normal' | 'target' | 'successor' | 'faded' | 'moved' | 'highlight'}[];
        edges: [number, number, 'normal' | 'cut' | 'new' | 'faded'][];
    }

    const scenarios: Record<Scenario, {label: string, steps: StepData[]}> = {
        leaf: {
            label: 'Daun (0 Anak)',
            steps: [
                {
                    title: "Identifikasi simpul yang akan dihapus",
                    description: "Kita ingin menghapus simpul 4 (bertanda merah). Simpul ini adalah daun — tidak memiliki anak kiri maupun kanan.",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 120, y: 110, style: 'normal'},
                        {val: 20, x: 280, y: 110, style: 'normal'},
                        {val: 4, x: 70, y: 180, style: 'target'},
                        {val: 7, x: 170, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'normal'], [1,4,'normal']]
                },
                {
                    title: "Putuskan hubungan dengan induk",
                    description: "Karena simpul 4 adalah daun, cukup putus hubungan pointer induk.kiri dari simpul 6. Tidak perlu penyesuaian lain.",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 120, y: 110, style: 'highlight'},
                        {val: 20, x: 280, y: 110, style: 'normal'},
                        {val: 4, x: 70, y: 180, style: 'faded'},
                        {val: 7, x: 170, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'cut'], [1,4,'normal']]
                },
                {
                    title: "Selesai! Pohon setelah penghapusan",
                    description: "Simpul 4 berhasil dihapus. Struktur BST tetap valid: semua aturan invarian terjaga.",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 120, y: 110, style: 'normal'},
                        {val: 20, x: 280, y: 110, style: 'normal'},
                        {val: 7, x: 170, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'normal']]
                }
            ]
        },
        'one-child': {
            label: '1 Anak',
            steps: [
                {
                    title: "Identifikasi simpul yang akan dihapus",
                    description: "Kita ingin menghapus simpul 20 (bertanda merah). Simpul ini memiliki satu anak kanan: 25.",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 20, x: 300, y: 110, style: 'target'},
                        {val: 25, x: 350, y: 180, style: 'highlight'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [2,3,'normal']]
                },
                {
                    title: "Gantikan posisi dengan anaknya",
                    description: "Karena simpul 20 hanya punya satu anak (25), kita langsung \"angkat\" anak tersebut menggantikan posisi 20. Pointer induk (15) sekarang langsung menunjuk ke 25.",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 20, x: 300, y: 110, style: 'faded'},
                        {val: 25, x: 350, y: 180, style: 'moved'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'cut'], [2,3,'normal'], [0,3,'new']]
                },
                {
                    title: "Selesai! Pohon setelah penghapusan",
                    description: "Simpul 25 sekarang menempati posisi anak kanan dari 15. Invarian BST tetap valid.",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 25, x: 300, y: 110, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal']]
                }
            ]
        },
        'two-children': {
            label: '2 Anak',
            steps: [
                {
                    title: "Identifikasi simpul yang akan dihapus",
                    description: "Kita ingin menghapus simpul 15 (akar, bertanda merah). Simpul ini memiliki DUA anak: 6 (kiri) dan 20 (kanan).",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'target'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 20, x: 300, y: 110, style: 'normal'},
                        {val: 3, x: 50, y: 180, style: 'normal'},
                        {val: 7, x: 150, y: 180, style: 'normal'},
                        {val: 18, x: 250, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'normal'], [1,4,'normal'], [2,5,'normal']]
                },
                {
                    title: "Cari pengganti: maxBST(p.kiri)",
                    description: "Dicari nilai TERBESAR di sub-pohon KIRI (maxBST). Dari simpul 6, telusuri ke kanan sejauh mungkin. Hasilnya: simpul 7 (berwarna hijau).",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'target'},
                        {val: 6, x: 100, y: 110, style: 'highlight'},
                        {val: 20, x: 300, y: 110, style: 'normal'},
                        {val: 3, x: 50, y: 180, style: 'normal'},
                        {val: 7, x: 150, y: 180, style: 'successor'},
                        {val: 18, x: 250, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'normal'], [1,4,'new'], [2,5,'normal']]
                },
                {
                    title: "Hapus pengganti dari posisi asalnya",
                    description: "Simpul 7 (pengganti) dilepas dari posisi asalnya. Karena 7 adalah daun, cukup putus hubungan dengan induknya (6).",
                    nodes: [
                        {val: 15, x: 200, y: 40, style: 'target'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 20, x: 300, y: 110, style: 'normal'},
                        {val: 3, x: 50, y: 180, style: 'normal'},
                        {val: 7, x: 150, y: 180, style: 'faded'},
                        {val: 18, x: 250, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'normal'], [1,4,'cut'], [2,5,'normal']]
                },
                {
                    title: "Gantikan simpul yang dihapus",
                    description: "Simpul 7 naik ke posisi simpul 15. Anak kiri (6) dan anak kanan (20) sekarang menjadi anak dari simpul 7.",
                    nodes: [
                        {val: 7, x: 200, y: 40, style: 'moved'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 20, x: 300, y: 110, style: 'normal'},
                        {val: 3, x: 50, y: 180, style: 'normal'},
                        {val: 18, x: 250, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'new'], [0,2,'new'], [1,3,'normal'], [2,4,'normal']]
                },
                {
                    title: "Selesai! Pohon setelah penghapusan",
                    description: "Simpul 7 kini menjadi akar baru. Invarian BST tetap valid: semua nilai di kiri (3, 6) lebih kecil dari 7, dan semua di kanan (18, 20) lebih besar.",
                    nodes: [
                        {val: 7, x: 200, y: 40, style: 'normal'},
                        {val: 6, x: 100, y: 110, style: 'normal'},
                        {val: 20, x: 300, y: 110, style: 'normal'},
                        {val: 3, x: 50, y: 180, style: 'normal'},
                        {val: 18, x: 250, y: 180, style: 'normal'},
                    ],
                    edges: [[0,1,'normal'], [0,2,'normal'], [1,3,'normal'], [2,4,'normal']]
                }
            ]
        }
    };

    function setScenario(s: Scenario) {
        scenario = s;
        step = 0;
    }

    function nextStep() {
        const maxStep = scenarios[scenario].steps.length - 1;
        if (step < maxStep) step++;
    }

    function prevStep() {
        if (step > 0) step--;
    }

    const currentStep = $derived(scenarios[scenario].steps[step]);
    const totalSteps = $derived(scenarios[scenario].steps.length);

    function nodeColor(style: string) {
        switch (style) {
            case 'target': return { fill: 'var(--color-status-warning-soft)', stroke: 'var(--color-status-warning-border)' };
            case 'successor': return { fill: '#d4edda', stroke: '#28a745' };
            case 'faded': return { fill: 'var(--color-surface-soft)', stroke: 'var(--color-line)' };
            case 'moved': return { fill: '#d4edda', stroke: '#28a745' };
            case 'highlight': return { fill: 'var(--color-status-info-soft)', stroke: 'var(--color-callout-info-border)' };
            default: return { fill: 'var(--color-surface-elevated)', stroke: 'var(--color-note-lines)' };
        }
    }

    function edgeColor(style: string) {
        switch (style) {
            case 'cut': return { stroke: 'var(--color-status-warning-border)', dash: '6 3' };
            case 'new': return { stroke: '#28a745', dash: '' };
            case 'faded': return { stroke: 'var(--color-line)', dash: '4 4' };
            default: return { stroke: 'var(--color-note-lines)', dash: '' };
        }
    }
</script>

<div class="viz-container">
    <div class="viz-header">
        <h4>🗑️ Visualisasi Penghapusan BST</h4>
        <div class="tabs">
            {#each (['leaf', 'one-child', 'two-children'] as const) as s}
                <button class:active={scenario === s} onclick={() => setScenario(s)}>
                    {scenarios[s].label}
                </button>
            {/each}
        </div>
    </div>

    <div class="viz-body">
        <div class="tree-canvas">
            <svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid meet">
                <!-- Edges -->
                {#each currentStep.edges as [fromIdx, toIdx, style]}
                    {@const from = currentStep.nodes[fromIdx]}
                    {@const to = currentStep.nodes[toIdx]}
                    {@const ec = edgeColor(style)}
                    <line
                        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                        stroke={ec.stroke}
                        stroke-width={style === 'new' ? 2.5 : style === 'cut' ? 2 : 1.5}
                        stroke-dasharray={ec.dash}
                        stroke-linecap="round"
                        class="tree-edge"
                    />
                {/each}

                <!-- Nodes -->
                {#each currentStep.nodes as node}
                    {@const nc = nodeColor(node.style)}
                    <g class="tree-node" style="opacity: {node.style === 'faded' ? 0.35 : 1};">
                        <circle
                            cx={node.x} cy={node.y} r="20"
                            fill={nc.fill}
                            stroke={nc.stroke}
                            stroke-width="2.5"
                        />
                        {#if node.style === 'target'}
                            <line x1={node.x - 8} y1={node.y - 8} x2={node.x + 8} y2={node.y + 8} stroke="var(--color-status-warning-border)" stroke-width="2" />
                            <line x1={node.x + 8} y1={node.y - 8} x2={node.x - 8} y2={node.y + 8} stroke="var(--color-status-warning-border)" stroke-width="2" />
                        {/if}
                        {#if node.style === 'successor'}
                            <text x={node.x} y={node.y - 30} text-anchor="middle" font-size="10" fill="#28a745" font-weight="700">pengganti</text>
                        {/if}
                        <text
                            x={node.x} y={node.y}
                            dy="5"
                            text-anchor="middle"
                            fill={node.style === 'faded' ? 'var(--color-ink-muted)' : 'var(--color-ink-strong)'}
                            font-weight="700"
                            font-size="14"
                        >
                            {node.val}
                        </text>
                    </g>
                {/each}
            </svg>
        </div>

        <div class="step-panel">
            <div class="step-indicator">
                {#each Array(totalSteps) as _, i}
                    <div class="step-dot" class:active={i === step} class:done={i < step}></div>
                {/each}
            </div>
            <div class="step-content">
                <div class="step-title">{currentStep.title}</div>
                <p class="step-desc">{currentStep.description}</p>
            </div>
            <div class="step-nav">
                <button class="viz-btn secondary" onclick={prevStep} disabled={step === 0}>← Sebelumnya</button>
                <span class="step-counter">{step + 1} / {totalSteps}</span>
                <button class="viz-btn primary" onclick={nextStep} disabled={step === totalSteps - 1}>Selanjutnya →</button>
            </div>
        </div>
    </div>
</div>

<style>
    .viz-container {
        background: var(--color-surface-soft);
        border: 1px solid var(--color-line);
        border-radius: 12px;
        padding: 1.25rem;
        margin: 1.5rem 0;
    }
    .viz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .viz-header h4 { margin: 0; color: var(--color-ink-strong); font-size: 1.1rem; }
    .tabs {
        display: flex;
        gap: 0.25rem;
        background: var(--color-surface);
        padding: 0.25rem;
        border-radius: 8px;
        border: 1px solid var(--color-line);
    }
    .tabs button {
        border: none;
        background: none;
        padding: 0.35rem 0.7rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-ink-soft);
        transition: all 0.2s;
    }
    .tabs button.active {
        background: var(--color-link);
        color: var(--color-text-on-accent);
    }

    .viz-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    @media (max-width: 640px) {
        .viz-body { grid-template-columns: 1fr; }
    }

    .tree-canvas {
        background: var(--color-surface);
        border-radius: 8px;
        border: 1px solid var(--color-line);
        padding: 0.5rem;
    }
    .tree-edge { transition: all 0.5s ease; }
    .tree-node { transition: opacity 0.5s ease; }
    .tree-node circle { transition: all 0.5s ease; }

    .step-panel {
        background: var(--color-surface);
        border-radius: 8px;
        border: 1px solid var(--color-line);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .step-indicator {
        display: flex;
        gap: 0.4rem;
        justify-content: center;
    }
    .step-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-line);
        transition: all 0.3s;
    }
    .step-dot.active { background: var(--color-link); transform: scale(1.3); }
    .step-dot.done { background: var(--color-status-success-border); }

    .step-content { flex: 1; }
    .step-title {
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--color-ink-strong);
        margin-bottom: 0.4rem;
    }
    .step-desc {
        font-size: 0.82rem;
        line-height: 1.6;
        color: var(--color-ink);
        margin: 0;
    }

    .step-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px dashed var(--color-line);
    }
    .step-counter {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-ink-muted);
    }
    .viz-btn {
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.78rem;
        transition: all 0.2s;
    }
    .viz-btn.primary { background: var(--color-link); color: var(--color-text-on-accent); }
    .viz-btn.secondary { background: var(--color-surface-soft); border: 1px solid var(--color-line); color: var(--color-ink-soft); }
    .viz-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
