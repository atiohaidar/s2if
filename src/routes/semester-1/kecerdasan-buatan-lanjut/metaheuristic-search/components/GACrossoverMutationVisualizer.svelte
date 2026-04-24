<script lang="ts">
  const parent1 = ['1', '0', '1', '1', '0', '1', '0', '0'];
  const parent2 = ['0', '1', '0', '0', '1', '0', '1', '1'];
  const childBeforeMutation = ['1', '0', '1', '1', '1', '0', '1', '1'];
  const childAfterMutation = ['1', '0', '1', '1', '1', '1', '1', '1'];
  const cutPoint = 4;
  const mutatedIndex = 5;

  const steps = [
    {
      title: 'Langkah 1 - Dua Parent',
      description: 'Pilih dua parent yang dianggap cukup baik untuk menghasilkan keturunan baru.',
    },
    {
      title: 'Langkah 2 - Crossover',
      description:
        'Potong kromosom di titik tertentu, lalu gabungkan bagian kiri parent 1 dengan bagian kanan parent 2.',
    },
    {
      title: 'Langkah 3 - Mutation',
      description:
        'Ubah satu gen kecil secara acak agar solusi baru tidak terlalu mirip dan populasi tetap beragam.',
    },
    {
      title: 'Langkah 4 - Child Final',
      description:
        'Anak hasil crossover dan mutasi siap dievaluasi fitness-nya lalu bersaing di generasi berikutnya.',
    },
  ];

  let step = $state(0);

  function next() {
    step = Math.min(steps.length - 1, step + 1);
  }

  function prev() {
    step = Math.max(0, step - 1);
  }

  function reset() {
    step = 0;
  }
</script>

<div class="visual-card">
  <div class="header-row">
    <div>
      <h4>Crossover dan Mutasi</h4>
      <p>{steps[step].title}</p>
    </div>
    <span class="badge">Tahap {step + 1}/{steps.length}</span>
  </div>

  <div class="controls">
    <button onclick={prev} disabled={step === 0}>Sebelumnya</button>
    <button onclick={next} disabled={step === steps.length - 1}>Selanjutnya</button>
    <button class="ghost" onclick={reset}>Reset</button>
  </div>

  <p class="explain">{steps[step].description}</p>
  <div class="mini-glossary">
    <span><strong>Parent</strong> = solusi induk</span>
    <span><strong>Child</strong> = solusi baru hasil proses</span>
    <span><strong>Mutation</strong> = perubahan kecil acak</span>
  </div>

  <div class="grid">
    <section class="panel">
      <span class="label">Parent 1</span>
      <div class="gene-row">
        {#each parent1 as gene, index}
          <div class:cut={index === cutPoint} class="gene">{gene}</div>
        {/each}
      </div>

      <span class="label">Parent 2</span>
      <div class="gene-row">
        {#each parent2 as gene, index}
          <div class:cut={index === cutPoint} class="gene alt">{gene}</div>
        {/each}
      </div>
    </section>

    <section class="panel">
      <span class="label">Child Setelah Crossover</span>
      <div class="gene-row">
        {#each childBeforeMutation as gene, index}
          <div
            class:cut={index === cutPoint}
            class:inherit-p1={index < cutPoint}
            class:inherit-p2={index >= cutPoint}
            class="gene"
          >
            {gene}
          </div>
        {/each}
      </div>

      <span class="label">Child Setelah Mutasi</span>
      <div class="gene-row">
        {#each childAfterMutation as gene, index}
          <div class:mutated={step >= 2 && index === mutatedIndex} class="gene final">{gene}</div>
        {/each}
      </div>
    </section>
  </div>

  <div class="notes">
    <div class="note-box">
      <strong>Titik crossover:</strong> setelah gen ke-{cutPoint}
    </div>
    <div class="note-box">
      <strong>Gen yang dimutasi:</strong> gen ke-{mutatedIndex + 1}
    </div>
  </div>
</div>

<style>
  .visual-card {
    background: var(--color-surface-elevated);
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
    color: var(--color-ink-soft);
    margin-top: 0.2rem;
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
    margin-bottom: 0.75rem;
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

  .explain {
    margin: 0 0 1rem;
    line-height: 1.55;
  }

  .mini-glossary {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .mini-glossary span {
    border-radius: 999px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    padding: 0.38rem 0.75rem;
    font-size: 0.86rem;
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
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-ink-soft);
    margin-bottom: 0.45rem;
  }

  .gene-row {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 0.35rem;
    margin-bottom: 1rem;
  }

  .gene {
    text-align: center;
    padding: 0.7rem 0.2rem;
    border-radius: 10px;
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    font-family: var(--font-mono, monospace);
    font-weight: 700;
    position: relative;
  }

  .gene.alt {
    background: color-mix(in srgb, var(--color-status-info-soft) 65%, var(--color-surface-soft));
  }

  .gene.inherit-p1 {
    background: color-mix(in srgb, var(--color-status-success-soft) 70%, var(--color-surface-soft));
    border-color: var(--color-status-success-border);
  }

  .gene.inherit-p2 {
    background: color-mix(in srgb, var(--color-status-info-soft) 70%, var(--color-surface-soft));
    border-color: var(--color-status-info-border);
  }

  .gene.final {
    background: color-mix(in srgb, var(--color-highlight) 70%, var(--color-surface-soft));
  }

  .gene.cut::before {
    content: '';
    position: absolute;
    left: -0.22rem;
    top: -0.3rem;
    bottom: -0.3rem;
    width: 3px;
    border-radius: 999px;
    background: var(--color-callout-warning-border);
  }

  .gene.mutated {
    background: var(--color-callout-warning-start);
    border-color: var(--color-callout-warning-border);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-callout-warning-border) 22%, transparent);
  }

  .notes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    margin-top: 0.3rem;
  }

  .note-box {
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
    border-radius: 12px;
    padding: 0.75rem;
    font-size: 0.92rem;
  }

  @media (max-width: 760px) {
    .grid,
    .notes {
      grid-template-columns: 1fr;
    }
  }
</style>
