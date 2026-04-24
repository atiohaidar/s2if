<script lang="ts">
  type City = { id: string; x: number; y: number };

  const cities: City[] = [
    { id: 'A', x: 70, y: 60 },
    { id: 'B', x: 200, y: 40 },
    { id: 'C', x: 320, y: 90 },
    { id: 'D', x: 300, y: 210 },
    { id: 'E', x: 160, y: 230 },
    { id: 'F', x: 55, y: 170 },
  ];

  const routes = [
    {
      label: 'Generasi Awal',
      order: ['A', 'C', 'B', 'E', 'D', 'F', 'A'],
      distance: 865,
      note: 'Rute awal masih acak. Banyak lintasan saling silang, sehingga jaraknya boros.',
    },
    {
      label: 'Setelah Seleksi',
      order: ['A', 'B', 'C', 'E', 'D', 'F', 'A'],
      distance: 742,
      note: 'Solusi yang lebih jelek mulai tersingkir, dan pola rute yang lebih masuk akal bertahan.',
    },
    {
      label: 'Setelah Crossover',
      order: ['A', 'B', 'C', 'D', 'E', 'F', 'A'],
      distance: 688,
      note: 'Crossover menggabungkan potongan rute yang bagus dari dua parent.',
    },
    {
      label: 'Setelah Mutasi',
      order: ['A', 'B', 'C', 'D', 'F', 'E', 'A'],
      distance: 640,
      note: 'Mutasi kecil membantu menemukan rute yang lebih pendek dan mengurangi pola yang kurang efisien.',
    },
  ];

  const cityMap = Object.fromEntries(cities.map((city) => [city.id, city])) as Record<string, City>;
  let index = $state(0);
  const current = $derived(routes[index]);

  function next() {
    index = Math.min(routes.length - 1, index + 1);
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
      <h4>TSP dengan Ilustrasi GA</h4>
      <p>{current.label}: lihat perubahan rute dari generasi ke generasi.</p>
    </div>
    <span class="badge">Jarak {current.distance}</span>
  </div>

  <div class="controls">
    <button onclick={prev} disabled={index === 0}>Sebelumnya</button>
    <button onclick={next} disabled={index === routes.length - 1}>Selanjutnya</button>
    <button class="ghost" onclick={reset}>Reset</button>
  </div>

  <div class="grid">
    <section class="panel map-panel">
      <svg viewBox="0 0 380 280" class="map-svg" aria-label="Visualisasi rute TSP">
        {#each current.order.slice(0, -1) as cityId, routeIndex}
          {@const from = cityMap[cityId]}
          {@const to = cityMap[current.order[routeIndex + 1]]}
          <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} class="route-line" />
        {/each}

        {#each cities as city}
          <g transform={`translate(${city.x}, ${city.y})`}>
            <circle r="18" class="city-dot" />
            <text class="city-label" y="5">{city.id}</text>
          </g>
        {/each}
      </svg>
    </section>

    <section class="panel">
      <span class="label">Urutan Kunjungan</span>
      <p class="helper-text">
        Pada contoh ini, satu solusi dibaca sebagai <strong>urutan kota yang dikunjungi</strong>.
        Biasanya tujuan utamanya adalah mencari urutan dengan total jarak paling kecil.
      </p>
      <div class="route-order">
        {#each current.order as cityId, orderIndex}
          <div class="route-chip">
            <strong>{cityId}</strong>
            {#if orderIndex < current.order.length - 1}
              <span>-></span>
            {/if}
          </div>
        {/each}
      </div>

      <div class="stat-box">
        <span>Total Jarak</span>
        <strong>{current.distance}</strong>
      </div>

      <div class="note-box">
        <strong>Interpretasi:</strong> {current.note}
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
    background: var(--color-status-success-soft);
    color: var(--color-status-success-text);
    border: 1px solid var(--color-status-success-border);
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 0.95rem;
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

  .grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 0.9rem;
  }

  .panel {
    background: var(--color-paper);
    border: 1px solid var(--color-line);
    border-radius: 14px;
    padding: 1rem;
  }

  .map-panel {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .map-svg {
    width: 100%;
    height: auto;
  }

  .route-line {
    stroke: var(--color-binder);
    stroke-width: 4;
    stroke-linecap: round;
    opacity: 0.82;
  }

  .city-dot {
    fill: var(--color-paper);
    stroke: var(--color-callout-warning-border);
    stroke-width: 3;
  }

  .city-label {
    text-anchor: middle;
    font-weight: 800;
    fill: var(--color-ink-strong);
    font-family: var(--font-handwriting);
  }

  .label {
    display: inline-block;
    margin-bottom: 0.7rem;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-ink-soft);
  }

  .route-order {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .helper-text {
    margin: 0 0 0.85rem;
    padding: 0.75rem;
    border-radius: 12px;
    background: var(--color-status-info-soft);
    border: 1px solid var(--color-status-info-border);
    line-height: 1.55;
  }

  .route-chip {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    padding: 0.5rem 0.65rem;
  }

  .route-chip strong {
    color: var(--color-binder);
  }

  .stat-box {
    margin-top: 1rem;
    border-radius: 12px;
    border: 1px solid var(--color-status-success-border);
    background: var(--color-status-success-soft);
    padding: 0.8rem;
  }

  .stat-box span {
    display: block;
    font-size: 0.82rem;
    color: var(--color-ink-soft);
    margin-bottom: 0.2rem;
  }

  .stat-box strong {
    font-size: 1.35rem;
  }

  .note-box {
    margin-top: 1rem;
    border-radius: 12px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-soft);
    padding: 0.85rem;
    line-height: 1.55;
  }

  @media (max-width: 820px) {
    .grid,
    .header-row {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
</style>
