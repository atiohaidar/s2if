<script lang="ts">
  type Mode = 'LL' | 'RR' | 'LR' | 'RL';
  let mode = $state<Mode>('LL');
  let step = $state(0); // 0: Unbalanced, 1: Detected/Type, 2: Rotated

  const layouts: Record<Mode, any> = {
    LL: {
      type: 'Single Right Rotation',
      desc: 'Terjadi karena penyisipan di sub-pohon KIRI dari anak KIRI.',
      nodes: [
        { id: 'A', val: 30, x: 200, y: 40, x2: 280, y2: 110, bf: 2, bf2: 0 },
        { id: 'B', val: 20, x: 120, y: 110, x2: 200, y2: 40, bf: 1, bf2: 0 },
        { id: 'C', val: 10, x: 60, y: 180, x2: 120, y2: 110, bf: 0, bf2: 0 }
      ],
      edges: [[0, 1], [1, 2]],
      edges2: [[1, 2], [1, 0]]
    },
    RR: {
      type: 'Single Left Rotation',
      desc: 'Terjadi karena penyisipan di sub-pohon KANAN dari anak KANAN.',
      nodes: [
        { id: 'A', val: 10, x: 200, y: 40, x2: 120, y2: 110, bf: -2, bf2: 0 },
        { id: 'B', val: 20, x: 280, y: 110, x2: 200, y2: 40, bf: -1, bf2: 0 },
        { id: 'C', val: 30, x: 340, y: 180, x2: 280, y2: 110, bf: 0, bf2: 0 }
      ],
      edges: [[0, 1], [1, 2]],
      edges2: [[1, 0], [1, 2]]
    },
    LR: {
      type: 'Double Rotation (Left-Right)',
      desc: 'Lakukan Rotasi Kiri pada anak (B), lalu Rotasi Kanan pada akar (A).',
      nodes: [
        { id: 'A', val: 30, x: 200, y: 40, x2: 280, y2: 110, bf: 2, bf2: 0 },
        { id: 'B', val: 10, x: 120, y: 110, x2: 120, y2: 110, bf: -1, bf2: 0 },
        { id: 'C', val: 20, x: 180, y: 180, x2: 200, y2: 40, bf: 0, bf2: 0 }
      ],
      edges: [[0, 1], [1, 2]],
      edges2: [[2, 1], [2, 0]]
    },
    RL: {
      type: 'Double Rotation (Right-Left)',
      desc: 'Lakukan Rotasi Kanan pada anak (B), lalu Rotasi Kiri pada akar (A).',
      nodes: [
        { id: 'A', val: 10, x: 200, y: 40, x2: 120, y2: 110, bf: -2, bf2: 0 },
        { id: 'B', val: 30, x: 280, y: 110, x2: 280, y2: 110, bf: 1, bf2: 0 },
        { id: 'C', val: 20, x: 220, y: 180, x2: 200, y2: 40, bf: 0, bf2: 0 }
      ],
      edges: [[0, 1], [1, 2]],
      edges2: [[2, 0], [2, 1]]
    }
  };

  function setMode(newMode: Mode) {
    mode = newMode;
    step = 0;
  }

  const current = $derived(layouts[mode]);
</script>

<div class="viz-container">
  <div class="viz-header">
    <h4>⚖️ Visualisasi Rotasi AVL Tree</h4>
    <div class="tabs">
      {#each ['LL', 'RR', 'LR', 'RL'] as m}
        <button class:active={mode === m} onclick={() => setMode(m as Mode)}>{m}</button>
      {/each}
    </div>
  </div>

  <div class="viz-body">
    <div class="tree-canvas">
      <svg viewBox="0 0 400 230">
        {#each (step < 2 ? current.edges : current.edges2) as [f, t]}
          {@const from = current.nodes[f]}
          {@const to = current.nodes[t]}
          <line
            x1={step < 2 ? from.x : from.x2}
            y1={step < 2 ? from.y : from.y2}
            x2={step < 2 ? to.x : to.x2}
            y2={step < 2 ? to.y : to.y2}
            stroke="var(--color-note-lines)"
            stroke-width="1.5"
            style="transition: all 0.6s ease;"
          />
        {/each}

        {#each current.nodes as node}
          <g
            style="transform: translate({step < 2 ? node.x : node.x2}px, {step < 2
              ? node.y
              : node.y2}px); transition: all 0.6s ease;"
          >
            <circle
              r="20"
              fill={step === 1 && Math.abs(node.bf) > 1
                ? 'var(--color-status-warning-soft)'
                : 'var(--color-surface-elevated)'}
              stroke={step === 1 && Math.abs(node.bf) > 1
                ? 'var(--color-status-warning-border)'
                : 'var(--color-link)'}
              stroke-width="2"
            />
            <text dy="5" text-anchor="middle" font-weight="700" font-size="14" fill="var(--color-ink-strong)"
              >{node.val}</text
            >
            {#if step >= 1}
              <text
                y="-25"
                text-anchor="middle"
                font-size="10"
                font-weight="700"
                fill={Math.abs(step < 2 ? node.bf : node.bf2) > 1
                  ? 'var(--color-status-danger)'
                  : 'var(--color-ink-soft)'}
              >
                BF: {step < 2 ? node.bf : node.bf2}
              </text>
            {/if}
          </g>
        {/each}
      </svg>
    </div>

    <div class="step-panel">
      <div class="step-title">
        {#if step === 0}
          Kondisi Awal ({mode})
        {:else if step === 1}
          Deteksi: {current.type}
        {:else}
          Hasil Rotasi: Setimbang!
        {/if}
      </div>
      <p class="step-desc">
        {#if step === 0}
          Penyisipan simpul baru membuat pohon miring ke satu sisi. Klik "Cek Saldo" untuk melihat faktor
          keseimbangan.
        {:else if step === 1}
          Simpul {current.nodes[0].val} memiliki <strong>BF = {current.nodes[0].bf}</strong>. Karena > 1 atau
          &lt; -1, maka perlu <strong>{current.type}</strong>.
        {:else}
          Pohon sekarang seimbang dengan semua BF di antara -1 dan 1. Operasi pencarian kembali efisien.
        {/if}
      </p>
      <div class="step-nav">
        {#if step === 0}
          <button class="viz-btn primary" onclick={() => (step = 1)}>Cek Saldo (BF) →</button>
        {:else if step === 1}
          <button class="viz-btn primary" onclick={() => (step = 2)}>Lakukan Rotasi →</button>
        {:else}
          <button class="viz-btn secondary" onclick={() => (step = 0)}>↺ Reset</button>
        {/if}
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
  }
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
    .viz-body {
      grid-template-columns: 1fr;
    }
  }
  .tree-canvas {
    background: var(--color-surface);
    border-radius: 8px;
    border: 1px solid var(--color-line);
    padding: 0.5rem;
  }
  .step-panel {
    background: var(--color-surface);
    border-radius: 8px;
    border: 1px solid var(--color-line);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .step-title {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--color-ink-strong);
  }
  .step-desc {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--color-ink);
    flex: 1;
  }
  .viz-btn {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    transition: 0.2s;
  }
  .viz-btn.primary {
    background: var(--color-link);
    color: var(--color-text-on-accent);
  }
  .viz-btn.secondary {
    background: var(--color-surface-soft);
    border: 1px solid var(--color-line);
  }
</style>
