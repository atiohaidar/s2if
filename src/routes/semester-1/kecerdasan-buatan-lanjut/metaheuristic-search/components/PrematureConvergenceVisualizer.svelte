<script lang="ts">
  type Scenario = 'healthy' | 'premature';

  const scenarios = {
    healthy: {
      title: 'Eksplorasi Sehat',
      summary:
        'Populasi masih cukup beragam, jadi algoritma masih punya kesempatan keluar dari solusi lokal.',
      globalChance: 78,
      localTrap: 32,
      individuals: ['10101100', '11100110', '11011010', '11101011', '10111110'],
    },
    premature: {
      title: 'Premature Convergence',
      summary:
        'Banyak individu terlalu mirip. Pencarian terasa stabil, tapi sebenarnya mudah terjebak pada optimum lokal.',
      globalChance: 28,
      localTrap: 84,
      individuals: ['11111110', '11111110', '11111111', '11111110', '11111101'],
    },
  } as const;

  let active = $state<Scenario>('healthy');
  const current = $derived(scenarios[active]);

  function similarityClass(index: number) {
    if (active === 'healthy') return index % 2 === 0 ? 'var-a' : 'var-b';
    return index < 4 ? 'near-same' : 'mutant';
  }
</script>

<div class="visual-card">
  <div class="header-row">
    <div>
      <h4>Premature Convergence</h4>
      <p>
        Bandingkan kondisi populasi yang masih sehat dengan populasi yang terlalu cepat seragam.
      </p>
    </div>
    <div class="toggle-row">
      <button class:selected={active === 'healthy'} onclick={() => (active = 'healthy')}
        >Sehat</button
      >
      <button class:selected={active === 'premature'} onclick={() => (active = 'premature')}
        >Prematur</button
      >
    </div>
  </div>

  <div class="grid">
    <section class="panel">
      <span class="label">{current.title}</span>
      <p class="helper-text">
        <strong>Premature convergence</strong> artinya populasi terlalu cepat menjadi mirip semua, sehingga
        algoritma kehilangan variasi untuk mencoba arah solusi lain.
      </p>
      <div class="population">
        {#each current.individuals as genes, index}
          <div class={`individual ${similarityClass(index)}`}>
            <strong>{genes}</strong>
          </div>
        {/each}
      </div>
      <p class="summary">{current.summary}</p>
    </section>

    <section class="panel">
      <div class="metric">
        <span>Peluang menuju solusi lebih baik</span>
        <div class="meter">
          <div class="fill good" style={`width: ${current.globalChance}%`}></div>
        </div>
        <strong>{current.globalChance}%</strong>
      </div>

      <div class="metric">
        <span>Risiko terjebak optimum lokal</span>
        <div class="meter">
          <div class="fill warning" style={`width: ${current.localTrap}%`}></div>
        </div>
        <strong>{current.localTrap}%</strong>
      </div>

      <div class="note-box">
        <strong>Makna pentingnya:</strong> jika diversity terlalu rendah, populasi memang tampak stabil,
        tetapi kualitas pencarian bisa justru memburuk karena eksplorasi berhenti terlalu cepat.
      </div>
    </section>
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
    margin-bottom: 0.9rem;
  }

  h4,
  .header-row p {
    margin: 0;
  }

  .header-row p {
    margin-top: 0.2rem;
    color: var(--color-ink-soft);
  }

  .toggle-row {
    display: flex;
    gap: 0.5rem;
  }

  .toggle-row button {
    border: 1px solid var(--color-line);
    border-radius: 10px;
    padding: 0.5rem 0.85rem;
    background: var(--color-surface);
    cursor: pointer;
    font-weight: 700;
  }

  .toggle-row button.selected {
    background: var(--color-binder);
    color: var(--color-text-on-accent);
    border-color: var(--color-binder);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .panel {
    background: var(--color-paper);
    border: 1px solid var(--color-line);
    border-radius: 14px;
    padding: 1rem;
  }

  .label {
    display: inline-block;
    margin-bottom: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.78rem;
    color: var(--color-ink-soft);
  }

  .population {
    display: grid;
    gap: 0.55rem;
  }

  .helper-text {
    margin: 0 0 0.8rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-status-info-border);
    line-height: 1.55;
  }

  .individual {
    border-radius: 12px;
    padding: 0.75rem;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    font-family: var(--font-mono, monospace);
  }

  .individual.var-a {
    border-color: var(--color-status-success-border);
  }

  .individual.var-b {
    border-color: var(--color-status-info-border);
  }

  .individual.near-same {
    border-color: var(--color-callout-warning-border);
    background: color-mix(
      in srgb,
      var(--color-callout-warning-start) 70%,
      var(--color-surface-soft)
    );
  }

  .individual.mutant {
    border-color: var(--color-status-info-border);
  }

  .summary {
    margin: 0.9rem 0 0;
    line-height: 1.55;
  }

  .metric + .metric {
    margin-top: 1rem;
  }

  .metric span {
    display: block;
    font-size: 0.92rem;
    margin-bottom: 0.35rem;
  }

  .meter {
    height: 12px;
    background: var(--color-surface-soft);
    border-radius: 999px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: 999px;
  }

  .fill.good {
    background: linear-gradient(90deg, #43a047, #81c784);
  }

  .fill.warning {
    background: linear-gradient(90deg, #ef6c00, #ffb74d);
  }

  .metric strong {
    display: block;
    margin-top: 0.35rem;
  }

  .note-box {
    margin-top: 1rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    padding: 0.85rem;
    line-height: 1.55;
  }

  @media (max-width: 760px) {
    .header-row,
    .grid {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
</style>
