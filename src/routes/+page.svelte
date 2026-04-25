<script lang="ts">
  import { base } from '$app/paths';
  import { catalog, curriculum } from '$lib/data/content';
  import Sticker from '$lib/components/Sticker.svelte';
  import SubjectCard from '$lib/components/SubjectCard.svelte';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';

  let searchQuery = $state('');

  const normalizedQuery = $derived(searchQuery.trim().toLowerCase());
  const searchableCatalog = $derived(catalog.filter((entry) => entry.kind !== 'semester'));
  const filteredCatalog = $derived(
    normalizedQuery.length === 0
      ? searchableCatalog
      : searchableCatalog.filter((entry) => {
          const haystack = [
            entry.semesterName,
            entry.subjectName,
            entry.topicName ?? '',
            entry.track ?? '',
            entry.type ?? '',
          ]
            .join(' ')
            .toLowerCase();

          return haystack.includes(normalizedQuery);
        }),
  );
</script>

<svelte:head>
  <title>S2IF Notebook - Beranda</title>
  <meta
    name="description"
    content="Buku catatan digital untuk materi kuliah S2 Informatika. Berisi catatan, visualisasi interaktif, dan latihan praktek."
  />
</svelte:head>

<div class="home-page">
  <header class="hero">
    <h1><ThemeIcon name="notebook" size={34} /> Catatan Ketika S2 Informatika</h1>
    <p class="subtitle">
      Nyatet pake Google Docs ❌ <br />
      Nyatet pake svelte ✅
    </p>
  </header>

  <section class="intro">
    <h2><ThemeIcon name="edit" size={22} /> Welkom!</h2>
    <p>
      Sekedar catatan yang dibuat dengan Generative AI (Vibe Coding). Konten disini <span
        class="highlight"
        >bisa jadi tidak 100% akurat
      </span>karena hampir keseluruhan konten disini dibuat dengan AI. sedikit sekali yang dilakukan
      manual
    </p>
    <a class="catalog-link" href="{base}/catalog">Buka katalog konten lengkap</a>
  </section>

  <section class="semester-overview">
    <h2><ThemeIcon name="overview" size={22} /> Overview Semester</h2>

    {#each curriculum as semester}
      <div class="semester-card">
        <h3>{semester.name}</h3>
        <div class="subjects-grid">
          {#each semester.subjects as subject}
            <SubjectCard {subject} semesterId={semester.id} />
          {/each}
        </div>
      </div>
    {/each}
  </section>
  <section class="catalog-search">
    <h2><ThemeIcon name="topics" size={22} /> Katalog Konten</h2>
    <label class="search-field" for="catalog-search-input">
      <span class="search-label">Cari materi</span>
      <input
        id="catalog-search-input"
        type="search"
        bind:value={searchQuery}
        placeholder="Contoh: blind search, visualisasi, algoritma"
      />
    </label>

    <div class="catalog-meta">
      <span>{filteredCatalog.length} hasil</span>
      <span>{curriculum.length} semester aktif</span>
    </div>

    <div class="catalog-results">
      {#if filteredCatalog.length > 0}
        {#each filteredCatalog as entry}
          <a
            class="catalog-item"
            href={entry.topicId
              ? `${base}/${entry.semesterId}/${entry.subjectId}/${entry.topicId}`
              : `${base}/${entry.semesterId}/${entry.subjectId}`}
          >
            <span class="catalog-kind">{entry.kind}</span>
            <div class="catalog-copy">
              <strong>{entry.topicName ?? entry.subjectName}</strong>
              <span>
                {entry.semesterName} / {entry.subjectName}
              </span>
            </div>
          </a>
        {/each}
      {:else}
        <div class="catalog-empty">Tidak ada konten yang cocok dengan pencarian ini.</div>
      {/if}
    </div>
  </section>

  <section class="quick-guide">
    <h2><ThemeIcon name="topics" size={22} /> Tipe Catatan</h2>
    <div class="guide-grid">
      <div class="guide-item">
        <span class="icon"><ThemeIcon name="topic-catatan" size={26} /></span>
        <h4>Catatan Biasa</h4>
        <p>Penjelasan teori, konsep, dan materi kuliah</p>
      </div>
      <div class="guide-item">
        <span class="icon"><ThemeIcon name="topic-visual" size={26} /></span>
        <h4>Visualisasi</h4>
        <p>Grafik interaktif, diagram, dan animasi</p>
      </div>
      <div class="guide-item">
        <span class="icon"><ThemeIcon name="topic-praktek" size={26} /></span>
        <h4>Praktek</h4>
        <p>Kode playground, mini-quiz, dan latihan</p>
      </div>
    </div>
  </section>
</div>

<style>
  .home-page {
    max-width: 900px;
    margin: 0 auto;
  }

  .hero {
    text-align: center;
    padding: 2rem 0 3rem;
    border-bottom: 2px dashed var(--color-line);
    margin-bottom: 2rem;
  }

  .hero h1 {
    font-size: 3.5rem;
    margin: 0;
    background: linear-gradient(135deg, var(--color-binder) 0%, var(--color-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-family: var(--font-handwriting);
    font-size: 1.5rem;
    color: var(--color-ink);
    opacity: 0.7;
    margin: 0.5rem 0 1rem;
  }

  .intro {
    margin-bottom: 2rem;
  }

  .catalog-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 9999px;
    background: var(--color-binder);
    color: var(--color-text-on-accent);
    text-decoration: none;
    font-weight: 600;
    box-shadow: var(--shadow-sm);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .catalog-link:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .catalog-search {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--color-line);
    border-radius: 14px;
    background: var(--color-surface-elevated);
    box-shadow: var(--shadow-sm);
  }

  .search-field {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .search-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-binder);
  }

  .search-field input {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    color: var(--color-ink);
    font: inherit;
    outline: none;
  }

  .search-field input:focus {
    border-color: var(--color-binder);
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.12);
  }

  .catalog-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    font-size: 0.85rem;
    opacity: 0.75;
    margin-bottom: 1rem;
  }

  .catalog-results {
    display: grid;
    gap: 0.75rem;
  }

  .catalog-item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.9rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--color-line);
    background: var(--color-surface-elevated);
    text-decoration: none;
    color: var(--color-ink);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .catalog-item:hover {
    transform: translateY(-1px);
    border-color: var(--color-binder);
    box-shadow: var(--shadow-md);
  }

  .catalog-kind {
    min-width: 72px;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    background: rgba(139, 69, 19, 0.1);
    color: var(--color-binder);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
  }

  .catalog-copy {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .catalog-copy strong {
    font-size: 1rem;
  }

  .catalog-copy span {
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .catalog-empty {
    padding: 1rem;
    border-radius: 10px;
    background: var(--color-surface-soft);
    border: 1px dashed var(--color-line);
    color: var(--color-ink);
  }

  .intro p {
    font-size: 1.1rem;
    line-height: 1.8;
  }

  .semester-overview {
    margin-bottom: 2rem;
  }

  .semester-card {
    background: var(--color-surface-elevated);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-line);
  }

  .semester-card h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
  }

  .subjects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .quick-guide {
    margin-bottom: 2rem;
  }

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .guide-item {
    text-align: center;
    padding: 1.5rem;
    background: var(--color-surface-elevated);
    border-radius: 8px;
    border: 1px solid var(--color-line);
  }

  .guide-item .icon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .guide-item h4 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
  }

  .guide-item p {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .catalog-item {
      align-items: flex-start;
    }

    .catalog-kind {
      min-width: 62px;
    }
  }

  @media (max-width: 768px) {
    .guide-grid {
      grid-template-columns: 1fr;
    }

    .hero h1 {
      font-size: 2.5rem;
    }
  }
</style>
