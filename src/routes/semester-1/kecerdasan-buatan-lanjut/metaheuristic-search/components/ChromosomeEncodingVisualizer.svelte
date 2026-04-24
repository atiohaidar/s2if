<script lang="ts">
  type Mode = 'binary' | 'real' | 'permutation';

  const modes: { id: Mode; label: string; title: string; intro: string }[] = [
    {
      id: 'binary',
      label: 'Binary',
      title: 'Binary Encoding',
      intro:
        'Setiap gen berisi 0 atau 1. Cocok untuk keputusan ya/tidak atau variabel diskrit sederhana.',
    },
    {
      id: 'real',
      label: 'Real-Valued',
      title: 'Real-Valued Encoding',
      intro: 'Setiap gen berisi angka riil. Cocok untuk optimasi parameter numerik kontinu.',
    },
    {
      id: 'permutation',
      label: 'Permutation',
      title: 'Permutation Encoding',
      intro: 'Gen berisi urutan elemen tanpa duplikasi. Cocok untuk masalah rute dan penjadwalan.',
    },
  ];

  const examples = {
    binary: {
      genotype: ['1', '0', '1', '1', '0', '1'],
      phenotype: 'Misal 101 mewakili x1 = 5 dan 101 mewakili x2 = 5.',
      useCase: 'Cocok untuk keputusan sederhana seperti memilih fitur aktif/tidak aktif.',
      note: 'Kelebihan: mudah dimutasi. Kekurangan: kadang kurang natural untuk masalah real-valued.',
    },
    real: {
      genotype: ['1.25', '3.80', '0.45', '7.10'],
      phenotype: 'Bisa dibaca langsung sebagai parameter, misalnya bobot atau koordinat solusi.',
      useCase: 'Cocok untuk tuning parameter atau optimasi fungsi kontinu.',
      note: 'Kelebihan: lebih natural untuk angka riil. Operator crossover/mutasi juga biasanya khusus.',
    },
    permutation: {
      genotype: ['A', 'D', 'B', 'F', 'C', 'E'],
      phenotype: 'Urutan itu dibaca sebagai rute kunjungan: A -> D -> B -> F -> C -> E.',
      useCase: 'Cocok untuk TSP, routing, atau penyusunan urutan pekerjaan.',
      note: 'Kalau operator salah, bisa muncul kota duplikat atau kota yang hilang.',
    },
  } as const;

  let active = $state<Mode>('binary');

  const activeExample = $derived(examples[active]);
</script>

<div class="visual-card">
  <div class="visual-header">
    <div>
      <h4>Visualisasi Representasi Kromosom</h4>
      <p>Lihat bagaimana satu solusi yang sama bisa ditulis dengan format kromosom yang berbeda.</p>
    </div>
    <span class="badge">Genotype -> Phenotype</span>
  </div>

  <div class="tab-row">
    {#each modes as mode}
      <button class:selected={active === mode.id} onclick={() => (active = mode.id)}
        >{mode.label}</button
      >
    {/each}
  </div>

  <div class="content-grid">
    <section class="panel">
      <span class="panel-label">{modes.find((mode) => mode.id === active)?.title}</span>
      <p class="intro">{modes.find((mode) => mode.id === active)?.intro}</p>
      <p class="helper-text">
        <strong>Genotype</strong> adalah bentuk data yang dibaca algoritma. Anggap saja ini seperti "kode
        internal" dari sebuah solusi.
      </p>

      <div class="genes">
        {#each activeExample.genotype as gene, index}
          <div class="gene-box">
            <small>Gen {index + 1}</small>
            <strong>{gene}</strong>
          </div>
        {/each}
      </div>
    </section>

    <section class="panel">
      <div class="info-block">
        <span class="panel-label">Phenotype</span>
        <p>{activeExample.phenotype}</p>
      </div>

      <div class="info-block">
        <span class="panel-label">Contoh Cocok Untuk</span>
        <p>{activeExample.useCase}</p>
      </div>

      <div class="info-block note">
        <span class="panel-label">Catatan Penting</span>
        <p>{activeExample.note}</p>
      </div>
    </section>
  </div>
</div>

<style>
  .visual-card {
    background: linear-gradient(180deg, var(--color-surface-elevated), var(--color-surface-soft));
    border: 1px solid var(--color-line);
    border-radius: 18px;
    padding: 1.1rem;
    margin: 1rem 0 1.5rem;
    box-shadow: var(--shadow-lg);
  }

  .visual-header {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: flex-start;
    margin-bottom: 0.9rem;
  }

  .visual-header h4,
  .visual-header p {
    margin: 0;
  }

  .visual-header p {
    color: var(--color-ink-soft);
    margin-top: 0.2rem;
  }

  .badge {
    background: var(--color-status-info-soft);
    color: var(--color-status-info-border);
    border-radius: 999px;
    padding: 0.28rem 0.75rem;
    font-size: 0.82rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .tab-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 1rem;
  }

  .tab-row button {
    border: 1px solid var(--color-line);
    border-radius: 10px;
    padding: 0.55rem 0.9rem;
    background: var(--color-surface);
    cursor: pointer;
    font-weight: 700;
    color: var(--color-ink);
  }

  .tab-row button.selected {
    background: var(--color-binder);
    color: var(--color-text-on-accent);
    border-color: var(--color-binder);
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 0.9rem;
  }

  .panel {
    background: var(--color-paper);
    border: 1px solid var(--color-line);
    border-radius: 14px;
    padding: 1rem;
  }

  .panel-label {
    display: inline-block;
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-ink-soft);
    margin-bottom: 0.35rem;
  }

  .intro {
    margin: 0 0 0.9rem;
    color: var(--color-ink);
    line-height: 1.55;
  }

  .helper-text {
    margin: 0 0 0.9rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-status-info-border);
    line-height: 1.55;
  }

  .genes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
    gap: 0.65rem;
  }

  .gene-box {
    border-radius: 12px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    padding: 0.7rem 0.55rem;
    text-align: center;
  }

  .gene-box small {
    display: block;
    color: var(--color-ink-soft);
    margin-bottom: 0.25rem;
  }

  .gene-box strong {
    font-family: var(--font-mono, monospace);
    font-size: 1.05rem;
    color: var(--color-binder);
  }

  .info-block + .info-block {
    margin-top: 0.85rem;
  }

  .info-block p {
    margin: 0;
    line-height: 1.55;
  }

  .info-block.note {
    background: var(--color-callout-warning-start);
    border: 1px solid var(--color-callout-warning-border);
    border-radius: 12px;
    padding: 0.8rem;
  }

  @media (max-width: 720px) {
    .visual-header,
    .content-grid {
      grid-template-columns: 1fr;
      display: grid;
    }
  }
</style>
