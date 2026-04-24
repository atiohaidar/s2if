<script lang="ts">
  type Individual = {
    genes: string;
    fitness: number;
  };

  type Generation = {
    label: string;
    best: number;
    average: number;
    diversity: number;
    note: string;
    individuals: Individual[];
  };

  const generations: Generation[] = [
    {
      label: 'Generasi 1',
      best: 52,
      average: 39,
      diversity: 92,
      note: 'Populasi awal masih sangat beragam. Banyak solusi jelek, tapi area pencariannya luas.',
      individuals: [
        { genes: '10101100', fitness: 31 },
        { genes: '01010111', fitness: 42 },
        { genes: '11100010', fitness: 52 },
        { genes: '00111001', fitness: 35 },
        { genes: '11001010', fitness: 47 },
      ],
    },
    {
      label: 'Generasi 2',
      best: 61,
      average: 48,
      diversity: 78,
      note: 'Individu bagus mulai lebih sering terpilih. Rata-rata fitness naik.',
      individuals: [
        { genes: '11100010', fitness: 52 },
        { genes: '11101010', fitness: 61 },
        { genes: '11001010', fitness: 47 },
        { genes: '01101011', fitness: 44 },
        { genes: '11100110', fitness: 56 },
      ],
    },
    {
      label: 'Generasi 3',
      best: 69,
      average: 58,
      diversity: 62,
      note: 'Populasi makin membaik. Beberapa pola gen yang bagus mulai mendominasi.',
      individuals: [
        { genes: '11101010', fitness: 61 },
        { genes: '11101110', fitness: 69 },
        { genes: '11100110', fitness: 56 },
        { genes: '11101011', fitness: 58 },
        { genes: '11011010', fitness: 64 },
      ],
    },
    {
      label: 'Generasi 4',
      best: 74,
      average: 66,
      diversity: 48,
      note: 'Fitness terbaik terus naik, tapi keberagaman mulai turun. Ini wajar selama belum terlalu ekstrem.',
      individuals: [
        { genes: '11101110', fitness: 69 },
        { genes: '11111110', fitness: 74 },
        { genes: '11101010', fitness: 61 },
        { genes: '11101111', fitness: 72 },
        { genes: '11011110', fitness: 66 },
      ],
    },
    {
      label: 'Generasi 5',
      best: 78,
      average: 71,
      diversity: 34,
      note: 'Populasi makin kuat, tetapi juga makin mirip. Jika diversity terus turun, risiko premature convergence membesar.',
      individuals: [
        { genes: '11111110', fitness: 74 },
        { genes: '11111111', fitness: 78 },
        { genes: '11101111', fitness: 72 },
        { genes: '11111101', fitness: 70 },
        { genes: '11111110', fitness: 74 },
      ],
    },
  ];

  let index = $state(0);
  const current = $derived(generations[index]);
  const maxFitness = Math.max(
    ...generations.flatMap((generation) => generation.individuals.map((item) => item.fitness)),
  );

  function next() {
    index = Math.min(generations.length - 1, index + 1);
  }

  function prev() {
    index = Math.max(0, index - 1);
  }

  function reset() {
    index = 0;
  }
</script>

<div class="visual-card">
  <div class="header-row">
    <div>
      <h4>Evolusi Populasi GA</h4>
      <p>{current.label}: amati bagaimana fitness naik dan diversity berubah.</p>
    </div>
    <span class="badge">{index + 1}/{generations.length}</span>
  </div>

  <div class="controls">
    <button onclick={prev} disabled={index === 0}>Sebelumnya</button>
    <button onclick={next} disabled={index === generations.length - 1}>Selanjutnya</button>
    <button class="ghost" onclick={reset}>Reset</button>
  </div>

  <div class="mini-glossary">
    <span><strong>Fitness</strong> = nilai kualitas solusi</span>
    <span><strong>Diversity</strong> = seberapa beragam isi populasi</span>
    <span><strong>Generasi</strong> = satu putaran perbaikan</span>
  </div>

  <div class="summary-grid">
    <div class="metric-card best">
      <span>Best Fitness</span>
      <strong>{current.best}</strong>
    </div>
    <div class="metric-card avg">
      <span>Average Fitness</span>
      <strong>{current.average}</strong>
    </div>
    <div class="metric-card diversity">
      <span>Diversity</span>
      <strong>{current.diversity}%</strong>
    </div>
  </div>

  <div class="individuals">
    {#each current.individuals as individual}
      <div class:best-individual={individual.fitness === current.best} class="individual-card">
        <div class="row-top">
          <strong>{individual.genes}</strong>
          <span>fitness {individual.fitness}</span>
        </div>
        <div class="bar-wrap">
          <div class="bar" style={`width: ${(individual.fitness / maxFitness) * 100}%`}></div>
        </div>
      </div>
    {/each}
  </div>

  <div class="trend-grid">
    {#each generations as generation, generationIndex}
      <div class:active={generationIndex === index} class="trend-card">
        <span>{generation.label}</span>
        <small>best {generation.best}</small>
        <small>div {generation.diversity}%</small>
      </div>
    {/each}
  </div>

  <div class="note-box">
    <strong>Interpretasi:</strong>
    {current.note}
  </div>
</div>

<style>
  .visual-card {
    background: linear-gradient(180deg, var(--color-surface-elevated), var(--color-surface-soft));
    border: 1px solid var(--color-line);
    border-radius: 18px;
    padding: 1rem;
    margin: 1rem 0 1.5rem;
    box-shadow: var(--shadow-lg);
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: flex-start;
    margin-bottom: 0.85rem;
  }

  h4,
  .header-row p {
    margin: 0;
  }

  .header-row p {
    margin-top: 0.2rem;
    color: var(--color-ink-soft);
  }

  .badge {
    background: var(--color-status-info-soft);
    color: var(--color-status-info-border);
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 0.9rem;
  }

  button {
    border: none;
    border-radius: 9px;
    padding: 0.52rem 0.95rem;
    background: var(--color-binder);
    color: var(--color-text-on-accent);
    cursor: pointer;
    font-weight: 700;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  button.ghost {
    background: var(--color-surface-soft);
    color: var(--color-ink);
    border: 1px solid var(--color-line);
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.8rem;
    margin-bottom: 0.95rem;
  }

  .mini-glossary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 0.95rem;
  }

  .mini-glossary span {
    border-radius: 999px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    padding: 0.38rem 0.75rem;
    font-size: 0.86rem;
  }

  .metric-card {
    border-radius: 14px;
    padding: 0.9rem;
    border: 1px solid var(--color-line);
    background: var(--color-paper);
  }

  .metric-card span {
    display: block;
    font-size: 0.82rem;
    color: var(--color-ink-soft);
    margin-bottom: 0.2rem;
  }

  .metric-card strong {
    font-size: 1.4rem;
  }

  .metric-card.best {
    border-color: var(--color-status-success-border);
  }

  .metric-card.avg {
    border-color: var(--color-status-info-border);
  }

  .metric-card.diversity {
    border-color: var(--color-callout-warning-border);
  }

  .individuals {
    display: grid;
    gap: 0.7rem;
  }

  .individual-card {
    border-radius: 12px;
    border: 1px solid var(--color-line);
    padding: 0.8rem;
    background: var(--color-paper);
  }

  .individual-card.best-individual {
    border-color: var(--color-status-success-border);
    background: color-mix(in srgb, var(--color-status-success-soft) 60%, var(--color-paper));
  }

  .row-top {
    display: flex;
    justify-content: space-between;
    gap: 0.6rem;
    align-items: center;
    font-family: var(--font-mono, monospace);
    margin-bottom: 0.45rem;
  }

  .row-top span {
    font-family: var(--font-body);
    color: var(--color-ink-soft);
    font-size: 0.88rem;
  }

  .bar-wrap {
    height: 10px;
    border-radius: 999px;
    background: var(--color-surface-soft);
    overflow: hidden;
  }

  .bar {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
  }

  .trend-grid {
    margin-top: 0.95rem;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.55rem;
  }

  .trend-card {
    border-radius: 12px;
    padding: 0.7rem 0.55rem;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    display: grid;
    gap: 0.1rem;
    text-align: center;
  }

  .trend-card.active {
    border-color: var(--color-binder);
    background: color-mix(in srgb, var(--color-highlight) 75%, var(--color-surface-soft));
  }

  .trend-card span {
    font-weight: 700;
    font-size: 0.85rem;
  }

  .trend-card small {
    color: var(--color-ink-soft);
  }

  .note-box {
    margin-top: 0.9rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    background: var(--color-paper);
    padding: 0.9rem;
    line-height: 1.55;
  }

  @media (max-width: 760px) {
    .summary-grid,
    .trend-grid {
      grid-template-columns: 1fr;
    }

    .row-top {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
