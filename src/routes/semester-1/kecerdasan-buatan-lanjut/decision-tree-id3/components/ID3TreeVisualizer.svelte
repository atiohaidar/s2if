<script lang="ts">
    let step = 1;

    const maxStep = 3;

    function nextStep() {
        step = Math.min(maxStep, step + 1);
    }

    function prevStep() {
        step = Math.max(1, step - 1);
    }

    function reset() {
        step = 1;
    }
</script>

<div class="visualizer" aria-label="Visualisasi decision tree metode ID3">
    <div class="controls">
        <button onclick={prevStep} disabled={step === 1}>Sebelumnya</button>
        <button onclick={nextStep} disabled={step === maxStep}>Selanjutnya</button>
        <button onclick={reset}>Reset</button>
        <p class="step-label">Tahap: {step} / {maxStep}</p>
    </div>

    <div class="tree-scroll" role="region" aria-label="Diagram tree dengan scroll horizontal">
        <div class="tree-canvas">
            <svg class="connectors" viewBox="0 0 1080 760" aria-hidden="true">
                {#if step >= 2}
                    <line x1="540" y1="132" x2="540" y2="170" />
                    <line x1="190" y1="170" x2="890" y2="170" />
                    <line x1="190" y1="170" x2="190" y2="240" />
                    <line x1="890" y1="170" x2="890" y2="240" />
                {/if}

                {#if step >= 2}
                    <line x1="890" y1="348" x2="890" y2="386" />
                    <line x1="570" y1="386" x2="890" y2="386" />
                    <line x1="570" y1="386" x2="570" y2="456" />
                    <line x1="890" y1="386" x2="890" y2="456" />
                {/if}

                {#if step >= 3}
                    <line x1="890" y1="564" x2="890" y2="602" />
                    <line x1="640" y1="602" x2="1000" y2="602" />
                    <line x1="640" y1="602" x2="640" y2="640" />
                    <line x1="820" y1="602" x2="820" y2="640" />
                    <line x1="1000" y1="602" x2="1000" y2="640" />
                {/if}
            </svg>

            {#if step >= 2}
                <div class="branch-label root-left">Baik</div>
                <div class="branch-label root-right">Buruk</div>
            {/if}

            {#if step >= 2}
                <div class="branch-label psy-left">Rendah</div>
                <div class="branch-label psy-right">Sedang</div>
            {/if}

            {#if step >= 3}
                <div class="branch-label ipk-a">Bagus</div>
                <div class="branch-label ipk-b">Cukup</div>
                <div class="branch-label ipk-c">Kurang</div>
            {/if}

            <div class="node split root">
                <p class="title">Wawancara?</p>
                <p class="meta">Gain = 0.404</p>
            </div>

            {#if step >= 2}
                <div class="node leaf-yes yes-l2">
                    <p class="title">Diterima = Ya</p>
                    <p class="meta">6 Ya, 0 Tidak</p>
                </div>

                <div class="node split psikologi-l2">
                    <p class="title">Psikologi?</p>
                    <p class="meta">Gain subset Buruk = 0.420</p>
                </div>

                <div class="node leaf-no no-l3">
                    <p class="title">Diterima = Tidak</p>
                    <p class="meta">0 Ya, 2 Tidak</p>
                </div>
            {/if}

            {#if step >= 3}
                <div class="node split ipk-l3">
                    <p class="title">IPK?</p>
                    <p class="meta">Gain = 0.918</p>
                </div>
            {/if}

            {#if step >= 3}
                <div class="node leaf-yes compact y-a">Ya</div>
                <div class="node leaf-yes compact y-b">Ya</div>
                <div class="node leaf-no compact n-c">Tidak</div>
            {/if}
        </div>
    </div>

    <p class="caption">
        Tahap 1 memilih root, tahap 2 memecah cabang Buruk dengan Psikologi,
        tahap 3 menyelesaikan subset Sedang dengan IPK.
    </p>
</div>

<style>
    .visualizer {
        margin: 1rem 0 1.5rem;
        padding: 1rem;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 12px;
    }

    .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        align-items: center;
        margin-bottom: 1rem;
    }

    button {
        border: none;
        border-radius: 8px;
        padding: 0.5rem 0.9rem;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        color: var(--color-text-on-accent);
        background: var(--color-binder);
    }

    button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .step-label {
        margin: 0 0 0 auto;
        font-size: 0.9rem;
        font-weight: 600;
    }

    .tree-scroll {
        overflow-x: auto;
        padding-bottom: 0.25rem;
    }

    .tree-canvas {
        position: relative;
        width: 1080px;
        height: 760px;
    }

    .connectors {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .connectors line {
        stroke: var(--color-line-dark);
        stroke-width: 3;
        stroke-linecap: round;
        opacity: 0.95;
    }

    .branch-label {
        position: absolute;
        font-size: 0.82rem;
        text-align: center;
        color: var(--color-ink-soft);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    .root-left { left: 140px; top: 198px; }
    .root-right { left: 840px; top: 198px; }
    .psy-left { left: 530px; top: 414px; }
    .psy-right { left: 845px; top: 414px; }
    .ipk-a { left: 605px; top: 620px; }
    .ipk-b { left: 785px; top: 620px; }
    .ipk-c { left: 962px; top: 620px; }

    .node {
        position: absolute;
        width: 260px;
        border: 1px solid var(--color-line);
        border-radius: 10px;
        padding: 0.65rem 0.75rem;
        text-align: center;
        background: var(--color-surface-soft);
        box-sizing: border-box;
    }

    .node.split {
        border-color: var(--color-status-info-border);
        background: var(--color-status-info-soft);
    }

    .node.leaf-yes {
        border-color: var(--color-status-success-border);
        background: var(--color-status-success-soft);
        color: var(--color-status-success-text);
    }

    .node.leaf-no {
        border-color: var(--color-callout-danger-border);
        background: var(--color-callout-danger-start);
        color: var(--color-callout-danger-text);
    }

    .node.compact {
        width: 160px;
        font-weight: 700;
        font-size: 1rem;
        padding: 0.9rem 0.4rem;
    }

    .title {
        margin: 0;
        font-weight: 700;
    }

    .meta {
        margin: 0.25rem 0 0;
        font-size: 0.82rem;
        opacity: 0.86;
    }

    .root { left: 410px; top: 24px; }
    .yes-l2 { left: 60px; top: 240px; }
    .psikologi-l2 { left: 760px; top: 240px; }
    .no-l3 { left: 440px; top: 456px; }
    .ipk-l3 { left: 760px; top: 456px; }
    .y-a { left: 560px; top: 640px; }
    .y-b { left: 740px; top: 640px; }
    .n-c { left: 920px; top: 640px; }

    .caption {
        margin: 0.9rem 0 0;
        color: var(--color-ink-soft);
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .step-label {
            margin-left: 0;
        }

        .branch-label {
            font-size: 0.78rem;
        }
    }

    @media (max-width: 480px) {
        .visualizer {
            padding: 0.8rem;
        }

        button {
            font-size: 0.84rem;
            padding: 0.45rem 0.75rem;
        }
    }
</style>
