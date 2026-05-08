<script lang="ts">
  export let arr = [10, 7, 8, 9, 1, 5];
  
  // Simulation of Lomuto Partition for the given array
  const steps = [
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: -1,
      j: 0,
      desc: "Mulai. Pivot = 5. i di luar (-1), j di 0.",
      highlight: [5],
      pointers: { j: 0 }
    },
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: -1,
      j: 0,
      desc: "10 > 5, abaikan. j maju.",
      highlight: [0, 5],
      pointers: { j: 0 }
    },
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: -1,
      j: 1,
      desc: "7 > 5, abaikan. j maju.",
      highlight: [1, 5],
      pointers: { j: 1 }
    },
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: -1,
      j: 2,
      desc: "8 > 5, abaikan. j maju.",
      highlight: [2, 5],
      pointers: { j: 2 }
    },
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: -1,
      j: 3,
      desc: "9 > 5, abaikan. j maju.",
      highlight: [3, 5],
      pointers: { j: 3 }
    },
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: -1,
      j: 4,
      desc: "Sekarang j di indeks 4 (angka 1). 1 <= 5!",
      highlight: [4, 5],
      pointers: { j: 4 }
    },
    {
      arr: [10, 7, 8, 9, 1, 5],
      i: 0,
      j: 4,
      desc: "i maju ke 0, tukar arr[i] (10) dengan arr[j] (1).",
      highlight: [0, 4, 5],
      pointers: { i: 0, j: 4 }
    },
    {
      arr: [1, 7, 8, 9, 10, 5],
      i: 0,
      j: 4,
      desc: "Setelah tukar: 1 sekarang di kiri.",
      highlight: [0, 5],
      pointers: { i: 0 }
    },
    {
      arr: [1, 7, 8, 9, 10, 5],
      i: 0,
      j: 5,
      desc: "Loop selesai. Terakhir, tukar pivot (5) ke posisi i+1 (indeks 1).",
      highlight: [1, 5],
      pointers: { i: 0 }
    },
    {
      arr: [1, 5, 8, 9, 10, 7],
      i: 1,
      j: 5,
      desc: "Selesai! Fungsi mengembalikan indeks 1 (posisi pivot). Angka < 5 sudah terkumpul di kiri, dan > 5 di kanan. Sekarang Quick Sort tinggal memproses sisi kiri dan kanan secara terpisah.",
      highlight: [1],
      isDone: true
    }
  ];

  let currentStep = 0;
</script>

<div class="lomuto-trace">
  <div class="trace-header">
    <div class="step-counter">Langkah {currentStep + 1} / {steps.length}</div>
    <div class="controls">
      <button on:click={() => currentStep = Math.max(0, currentStep - 1)} disabled={currentStep === 0}>Prev</button>
      <button on:click={() => currentStep = Math.min(steps.length - 1, currentStep + 1)} disabled={currentStep === steps.length - 1}>Next</button>
    </div>
  </div>

  <div class="array-view">
    {#each steps[currentStep].arr as val, idx}
      <div class="cell-wrapper">
        <div class="pointers">
          {#if steps[currentStep].pointers?.i === idx}<span class="p-i">i</span>{/if}
          {#if steps[currentStep].pointers?.j === idx}<span class="p-j">j</span>{/if}
        </div>
        <div 
          class="cell" 
          class:highlight={steps[currentStep].highlight.includes(idx)}
          class:pivot={idx === 5 && !steps[currentStep].isDone}
          class:sorted={steps[currentStep].isDone && idx === 1}
        >
          {val}
        </div>
        <div class="idx-label">{idx}</div>
      </div>
    {/each}
  </div>

  <div class="legend">
    <div class="legend-item"><span class="dot p-i"></span> i: Sang Penjaga Batas</div>
    <div class="legend-item"><span class="dot p-j"></span> j: Sang Pencari</div>
    <div class="legend-item"><span class="dot pivot-dot"></span> Pivot: Patokan</div>
  </div>

  <div class="description">
    <p>{steps[currentStep].desc}</p>
    {#if steps[currentStep].isDone}
      <div class="return-badge">Return: {steps[currentStep].i}</div>
    {/if}
  </div>
</div>

<style>
  .lomuto-trace {
    background: var(--color-surface-elevated);
    border: 2px solid var(--color-line);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: var(--shadow-sm);
  }

  .trace-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .step-counter {
    font-weight: bold;
    color: var(--color-ink-muted);
    font-size: 0.9rem;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid var(--color-line);
    background: var(--color-surface);
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
  }

  button:hover:not(:disabled) {
    background: var(--color-link);
    color: white;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .array-view {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin: 2rem 0;
  }

  .cell-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45px;
    position: relative;
  }

  .cell {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface);
    border: 2px solid var(--color-line);
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.3s;
  }

  .cell.highlight {
    border-color: var(--color-link);
    background: var(--color-callout-info-end);
    transform: translateY(-5px);
  }

  .cell.pivot {
    border-color: var(--color-accent);
    border-style: dashed;
  }

  .cell.sorted {
    background: var(--color-status-success-soft);
    border-color: var(--color-status-success-border);
    color: var(--color-status-success-text);
  }

  .pointers {
    height: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    gap: 4px;
  }

  .p-i { color: var(--color-link); }
  .p-j { color: var(--color-status-wip); }

  .idx-label {
    font-size: 0.7rem;
    color: var(--color-ink-muted);
    margin-top: 4px;
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    color: var(--color-ink-muted);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .pivot-dot {
    background: var(--color-accent);
    border: 1px dashed var(--color-accent-border, var(--color-line));
  }

  .description {
    background: var(--color-surface);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border-left: 4px solid var(--color-link);
    min-height: 3rem;
    display: flex;
    align-items: center;
  }

  .description p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
    flex: 1;
  }

  .return-badge {
    background: var(--color-status-success-soft);
    color: var(--color-status-success-text);
    border: 1px solid var(--color-status-success-border);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.85rem;
    white-space: nowrap;
    margin-left: 1rem;
    animation: popIn 0.3s ease-out;
  }

  @keyframes popIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>
