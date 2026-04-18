<script lang="ts">
    type Step = {
        title: string;
        description: string;
        focus: 'prior' | 'ipk' | 'psikologi' | 'wawancara' | 'result';
    };

    const priorYa = 8 / 14;
    const priorTidak = 6 / 14;

    const likelihoods = {
        ya: {
            ipk: '3/8',
            psikologi: '1/8',
            wawancara: '3/8',
        },
        tidak: {
            ipk: '1/6',
            psikologi: '3/6',
            wawancara: '1/6',
        },
    };

    const rawYa = 9 / 896;
    const rawTidak = 1 / 168;
    const normalizedYa = 27 / 43;
    const normalizedTidak = 16 / 43;

    const steps: Step[] = [
        {
            title: 'Langkah 1 - Prior',
            description: 'Mulai dari peluang awal tiap kelas sebelum fitur diuji.',
            focus: 'prior',
        },
        {
            title: 'Langkah 2 - Likelihood IPK',
            description: 'Lihat seberapa sering IPK = Bagus muncul pada kelas Ya dan Tidak.',
            focus: 'ipk',
        },
        {
            title: 'Langkah 3 - Likelihood Psikologi',
            description: 'Lanjutkan dengan fitur Psikologi = Rendah.',
            focus: 'psikologi',
        },
        {
            title: 'Langkah 4 - Likelihood Wawancara',
            description: 'Terakhir, masukkan Wawancara = Sangat Baik.',
            focus: 'wawancara',
        },
        {
            title: 'Langkah 5 - Bandingkan skor',
            description: 'Skor kelas yang lebih besar jadi prediksi akhir.',
            focus: 'result',
        },
    ];

    let activeStep = $state(0);

    const features = [
        {
            name: 'IPK = Bagus',
            ya: likelihoods.ya.ipk,
            tidak: likelihoods.tidak.ipk,
            focus: 'ipk' as const,
        },
        {
            name: 'Psikologi = Rendah',
            ya: likelihoods.ya.psikologi,
            tidak: likelihoods.tidak.psikologi,
            focus: 'psikologi' as const,
        },
        {
            name: 'Wawancara = Sangat Baik',
            ya: likelihoods.ya.wawancara,
            tidak: likelihoods.tidak.wawancara,
            focus: 'wawancara' as const,
        },
    ];

    function prev() {
        activeStep = Math.max(0, activeStep - 1);
    }

    function next() {
        activeStep = Math.min(steps.length - 1, activeStep + 1);
    }

    function reset() {
        activeStep = 0;
    }

    function barWidth(score: number) {
        const maxScore = Math.max(rawYa, rawTidak);
        return `${Math.max(12, (score / maxScore) * 100)}%`;
    }
</script>

<div class="visualizer-container">
    <div class="header-row">
        <div>
            <h4>Alur Naive Bayes</h4>
            <p class="step-title">{steps[activeStep].title}</p>
        </div>
        <span class="badge">Tahap {activeStep + 1}/{steps.length}</span>
    </div>

    <div class="controls">
        <button onclick={prev} disabled={activeStep === 0}>Sebelumnya</button>
        <button onclick={next} disabled={activeStep === steps.length - 1}>Selanjutnya</button>
        <button onclick={reset}>Reset</button>
    </div>

    <p class="meta">{steps[activeStep].description}</p>

    <div class="query-card">
        <span class="query-label">Data uji</span>
        <strong>IPK = Bagus, Psikologi = Rendah, Wawancara = Sangat Baik</strong>
        <p>Target yang dicari: Diterima = Ya atau Tidak.</p>
    </div>

    <div class="grid">
        <section class="panel">
            <h5>Kelas Ya</h5>
            <div class="formula-row" class:active={steps[activeStep].focus === 'prior'}>
                <span>Prior</span>
                <strong>{priorYa.toFixed(4)}</strong>
            </div>
            <div class="formula-row" class:active={steps[activeStep].focus === 'ipk'}>
                <span>P(IPK = Bagus | Ya)</span>
                <strong>{likelihoods.ya.ipk}</strong>
            </div>
            <div class="formula-row" class:active={steps[activeStep].focus === 'psikologi'}>
                <span>P(Psikologi = Rendah | Ya)</span>
                <strong>{likelihoods.ya.psikologi}</strong>
            </div>
            <div class="formula-row" class:active={steps[activeStep].focus === 'wawancara'}>
                <span>P(Wawancara = Sangat Baik | Ya)</span>
                <strong>{likelihoods.ya.wawancara}</strong>
            </div>
            <div class="score-row">
                <span>Skor Ya</span>
                <strong>{rawYa.toFixed(6)}</strong>
            </div>
            <div class="score-bar score-bar-ya" style={`width: ${barWidth(rawYa)}`}></div>
        </section>

        <section class="panel">
            <h5>Kelas Tidak</h5>
            <div class="formula-row" class:active={steps[activeStep].focus === 'prior'}>
                <span>Prior</span>
                <strong>{priorTidak.toFixed(4)}</strong>
            </div>
            <div class="formula-row" class:active={steps[activeStep].focus === 'ipk'}>
                <span>P(IPK = Bagus | Tidak)</span>
                <strong>{likelihoods.tidak.ipk}</strong>
            </div>
            <div class="formula-row" class:active={steps[activeStep].focus === 'psikologi'}>
                <span>P(Psikologi = Rendah | Tidak)</span>
                <strong>{likelihoods.tidak.psikologi}</strong>
            </div>
            <div class="formula-row" class:active={steps[activeStep].focus === 'wawancara'}>
                <span>P(Wawancara = Sangat Baik | Tidak)</span>
                <strong>{likelihoods.tidak.wawancara}</strong>
            </div>
            <div class="score-row">
                <span>Skor Tidak</span>
                <strong>{rawTidak.toFixed(6)}</strong>
            </div>
            <div class="score-bar score-bar-tidak" style={`width: ${barWidth(rawTidak)}`}></div>
        </section>
    </div>

    <div class="result-card" class:show-result={steps[activeStep].focus === 'result'}>
        <div>
            <span class="query-label">Hasil normalisasi</span>
            <p>
                P(Ya | X) = {normalizedYa.toFixed(4)} dan P(Tidak | X) = {normalizedTidak.toFixed(4)}.
            </p>
        </div>
        <strong class="winner">Prediksi: Diterima = Ya</strong>
    </div>

    <div class="feature-list">
        {#each features as feature}
            <div class="feature-item" class:active={steps[activeStep].focus === feature.focus}>
                <span>{feature.name}</span>
                <small>Ya: {feature.ya} · Tidak: {feature.tidak}</small>
            </div>
        {/each}
    </div>
</div>

<style>
    .visualizer-container {
        background: linear-gradient(180deg, var(--color-surface-elevated), var(--color-surface-soft));
        border: 2px solid var(--color-binder);
        border-radius: 16px;
        padding: 1.25rem;
        margin: 1rem 0 1.25rem;
    }

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.9rem;
    }

    h4,
    .step-title,
    p {
        margin: 0;
    }

    .step-title {
        color: var(--color-text-muted);
        font-size: 0.92rem;
        margin-top: 0.15rem;
    }

    .badge {
        background: var(--color-status-info-soft);
        color: var(--color-status-info-border);
        border-radius: 999px;
        padding: 0.2rem 0.7rem;
        font-size: 0.85rem;
        font-weight: 700;
        white-space: nowrap;
    }

    .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
        margin-bottom: 0.8rem;
    }

    button {
        border: none;
        border-radius: 8px;
        padding: 0.5rem 0.9rem;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        cursor: pointer;
        font-weight: 600;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .meta {
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
    }

    .query-card,
    .panel,
    .result-card {
        border-radius: 14px;
        border: 1px solid var(--color-line);
        background: var(--color-paper);
        padding: 0.9rem;
    }

    .query-card {
        margin-bottom: 1rem;
    }

    .query-label {
        display: inline-block;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text-muted);
        margin-bottom: 0.35rem;
    }

    .query-card strong,
    .result-card strong,
    .panel strong {
        display: block;
    }

    .query-card p {
        margin-top: 0.35rem;
        color: var(--color-text-muted);
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.9rem;
    }

    .panel h5 {
        margin: 0 0 0.6rem;
        font-size: 1rem;
    }

    .formula-row,
    .score-row {
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        align-items: center;
        border-radius: 10px;
        padding: 0.5rem 0.6rem;
        margin-bottom: 0.45rem;
        background: var(--color-surface-soft);
        border: 1px solid transparent;
    }

    .formula-row.active,
    .feature-item.active,
    .result-card.show-result {
        background: var(--color-callout-warning-start);
        border-color: var(--color-callout-warning-border);
    }

    .score-row {
        margin-top: 0.75rem;
        background: var(--color-surface-elevated);
    }

    .score-bar {
        height: 10px;
        border-radius: 999px;
        margin-top: 0.35rem;
    }

    .score-bar-ya {
        background: linear-gradient(90deg, #1f7a4d, #4caf50);
    }

    .score-bar-tidak {
        background: linear-gradient(90deg, #8b2d2d, #ef5350);
    }

    .result-card {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
    }

    .winner {
        color: var(--color-binder);
        text-align: right;
        white-space: nowrap;
    }

    .feature-list {
        margin-top: 0.9rem;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.6rem;
    }

    .feature-item {
        border: 1px solid var(--color-line);
        border-radius: 10px;
        padding: 0.65rem;
        background: var(--color-surface-soft);
    }

    .feature-item span {
        display: block;
        font-weight: 700;
        margin-bottom: 0.2rem;
    }

    .feature-item small {
        color: var(--color-text-muted);
    }

    @media (max-width: 768px) {
        .grid,
        .feature-list {
            grid-template-columns: 1fr;
        }

        .result-card {
            align-items: flex-start;
            flex-direction: column;
        }

        .winner {
            text-align: left;
            white-space: normal;
        }
    }

    @media (max-width: 480px) {
        .visualizer-container {
            padding: 1rem;
        }

        .controls {
            gap: 0.45rem;
        }

        button {
            width: 100%;
        }
    }
</style>