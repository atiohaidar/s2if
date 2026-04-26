<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { curriculum } from '$lib/data/content';
  import SubjectCard from '$lib/components/SubjectCard.svelte';
  import ThemeIcon from '$lib/components/ThemeIcon.svelte';

  let sections: HTMLElement[] = [];
  let visibleSections = new Set();

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target);
            visibleSections = visibleSections; // trigger Svelte reactivity
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>S2IF Notebook - Beranda</title>
  <meta
    name="description"
    content="Buku catatan digital untuk materi kuliah S2 Informatika. Berisi catatan, visualisasi interaktif, dan latihan praktek dengan metode Active Learning."
  />
</svelte:head>

<div class="home-page">
  <div class="background-decorations" aria-hidden="true">
    <div class="decor-item scribble-1">✨</div>
    <div class="decor-item scribble-2">💡</div>
    <div class="decor-item scribble-3">🚀</div>
    <div class="decor-item scribble-4">🧠</div>
    <div class="circle-blur"></div>
  </div>

  <header class="hero">
    <div class="hero-badge">Digital Learning Experience</div>
    <h1>
      <span class="title-main">S2IF</span>
      <span class="title-sub">Notebook</span>
    </h1>
    <p class="subtitle">
      Belajar S2 Informatika jadi lebih <span class="highlight-alt">interaktif</span>, <br />
      bukan sekadar baca teks, tapi membangun pemahaman.
    </p>

    <div class="hero-cta">
      <a class="primary-btn" href="#curriculum">
        <span>Mulai Belajar</span>
        <ThemeIcon name="arrow-right" size={18} />
        <svg class="scribble-circle" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path d="M10,30 Q50,5 100,30 T190,30 Q150,55 100,30 T10,30" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </a>
      <a class="secondary-btn" href="{base}/catalog">Buka Katalog</a>
    </div>
  </header>

  <section 
    id="learning-method" 
    class="learning-method reveal" 
    class:visible={visibleSections.has(sections[0])}
    bind:this={sections[0]}
  >
    <div class="section-header">
      <span class="kicker">Why S2IF Notebook?</span>
      <h2>Metode Belajar Aktif</h2>
      <p>Kita nggak cuma nyatet, kita membangun pemahaman yang nancep di otak.</p>
    </div>

    <div class="bento-grid">
      <div class="bento-item method-card feature-1">
        <div class="method-icon"><ThemeIcon name="topic-catatan" size={32} /></div>
        <div class="card-content">
          <h3>Analogi & Simpel</h3>
          <p>
            Materi berat dibungkus dengan analogi dunia nyata supaya logika dasarnya dapet dulu.
          </p>
          <span
            class="ref-tag"
            title="Menyambungkan informasi baru ke konsep lama yang sudah dipahami."
          >
            Ref: Associative Learning
          </span>
        </div>
      </div>

      <div class="bento-item method-card feature-2">
        <div class="method-icon"><ThemeIcon name="topic-visual" size={32} /></div>
        <div class="card-content">
          <h3>Visualisasi (Jika Ada)</h3>
          <p>
            Tersedia di topik tertentu: lihat langsung cara kerja algoritma lewat grafik interaktif.
          </p>
          <span
            class="ref-tag"
            title="Menggabungkan input verbal (teks) dan visual untuk pemahaman maksimal."
          >
            Ref: Dual Coding Theory
          </span>
        </div>
      </div>

      <div class="bento-item notes-highlight">
        <div class="notes-content">
          <div class="notes-header">
            <ThemeIcon name="note" size={24} />
            <h3>Fitur Notes</h3>
          </div>
          <p>Ini adalah kunci utama penguasaan materi di platform ini:</p>
          <ol>
            <li>Pahami satu topik bahasan.</li>
            <li>Klik ikon <strong>Notes</strong> di pojok kanan atas.</li>
            <li><strong>Tulis ulang</strong> materi pakai bahasamu sendiri.</li>
          </ol>
          <div class="ref-box">
            <strong>Metode Feynman:</strong> "Kalau kamu nggak bisa jelasin dengan bahasa simpel, berarti
            kamu belum benar-benar paham."
          </div>
        </div>
      </div>

      <div class="bento-item method-card feature-3">
        <div class="method-icon"><ThemeIcon name="topic-praktek" size={32} /></div>
        <div class="card-content">
          <h3>Quiz Cepat (Jika Ada)</h3>
          <p>
            Uji pemahamanmu langsung di materi pilihan. Melatih otak untuk manggil data dengan
            aktif.
          </p>
          <span
            class="ref-tag"
            title="Mengambil informasi dari memori memperkuat jalur saraf lebih dari sekadar membaca ulang."
          >
            Ref: Testing Effect
          </span>
        </div>
      </div>
    </div>
  </section>

  <section 
    id="curriculum"
    class="semester-overview reveal"
    class:visible={visibleSections.has(sections[1])}
    bind:this={sections[1]}
  >
    <h2><ThemeIcon name="overview" size={22} /> Jelajahi Kurikulum</h2>

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

  <footer class="main-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <h4>S2IF Notebook</h4>
        <p>Buku catatan digital interaktif untuk mahasiswa S2 Informatika.</p>
      </div>
      <div class="footer-links">
        <div class="link-group">
          <h5>Navigasi</h5>
          <a href="{base}/">Beranda</a>
          <a href="{base}/catalog">Katalog</a>
          <a href="{base}/luar-perkuliahan">Luar Perkuliahan</a>
        </div>
        <div class="link-group">
          <h5>Eksternal</h5>
          <a href="https://github.com/atiohaidar/s2if" target="_blank" rel="noopener noreferrer"
            >GitHub Repo</a
          >
          <a href="https://atiohaidar.github.io" target="_blank" rel="noopener noreferrer"
            >Portfolio</a
          >
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {new Date().getFullYear()} S2IF Notebook. Crafted with AI & Svelte.</p>
    </div>
  </footer>
</div>

<style>
  .home-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
  }

  /* Background Decorations */
  .background-decorations {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }

  .decor-item {
    position: absolute;
    font-size: 2rem;
    opacity: 0.15;
    filter: grayscale(1);
    animation: float 6s ease-in-out infinite;
  }

  .scribble-1 {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }
  .scribble-2 {
    top: 15%;
    right: 5%;
    animation-delay: 1s;
  }
  .scribble-3 {
    bottom: 20%;
    left: 10%;
    animation-delay: 2s;
  }
  .scribble-4 {
    bottom: 25%;
    right: 10%;
    animation-delay: 3.5s;
  }

  .circle-blur {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(139, 69, 19, 0.05) 0%, transparent 70%);
    filter: blur(60px);
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  /* Hero Section */
  .hero {
    text-align: center;
    padding: 6rem 0 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-badge {
    background: var(--color-surface-elevated);
    padding: 0.5rem 1rem;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-binder);
    border: 1px solid var(--color-line);
    margin-bottom: 2rem;
    box-shadow: var(--shadow-sm);
  }

  .hero h1 {
    font-size: clamp(3.5rem, 10vw, 5rem);
    margin: 0;
    line-height: 0.9;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-main {
    font-family: var(--font-body);
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-ink) 0%, var(--color-ink-muted) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.05em;
  }

  @keyframes floating-title {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-5px) rotate(1deg);
    }
    66% {
      transform: translateY(2px) rotate(-1deg);
    }
  }

  .title-sub {
    font-family: var(--font-handwriting);
    color: var(--color-binder);
    margin-top: -0.5rem;
    display: inline-block;
    padding-right: 0.5rem;
    clip-path: inset(0 100% 0 0);
    /* Menggabungkan animasi reveal dan floating */
    animation: 
      write-reveal 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards,
      floating-title 4s ease-in-out 2.3s infinite;
  }

  @keyframes write-reveal {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }

  .title-sub .dot {
    color: var(--color-accent);
  }

  .subtitle {
    font-size: 1.35rem;
    color: var(--color-ink);
    opacity: 0.85;
    margin: 2rem 0 2rem;
    line-height: 1.6;
    max-width: 600px;
  }

  /* Hero Search */
  .hero-search {
    width: 100%;
    max-width: 500px;
    margin-bottom: 3rem;
  }

  .search-input-wrapper {
    display: flex;
    align-items: center;
    background: var(--color-surface-elevated);
    border: 2px solid var(--color-line);
    border-radius: 16px;
    padding: 0.5rem 0.5rem 0.5rem 1.25rem;
    gap: 1rem;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
  }

  .search-input-wrapper:focus-within {
    border-color: var(--color-binder);
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  .search-input-wrapper input {
    flex: 1;
    border: none;
    background: transparent;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-ink);
    outline: none;
  }

  .search-input-wrapper button {
    background: var(--color-binder);
    color: white;
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .search-input-wrapper button:hover {
    opacity: 0.9;
  }

  .highlight-alt {
    position: relative;
    z-index: 1;
    font-weight: 600;
  }

  .highlight-alt::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: -2px;
    right: -2px;
    height: 8px;
    background: rgba(241, 196, 15, 0.4);
    z-index: -1;
    transform: skew(-15deg);
  }

  .hero-cta {
    display: flex;
    gap: 1.25rem;
    justify-content: center;
  }

  .primary-btn {
    padding: 1rem 2rem;
    background: var(--color-binder);
    color: var(--color-surface-elevated);
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 0 var(--color-ink-strong);
  }

  .primary-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 0 var(--color-ink-strong);
  }

  .primary-btn:active {
    transform: translateY(0);
    box-shadow: 0 0 0 var(--color-ink-strong);
  }

  .primary-btn .scribble-circle {
    position: absolute;
    inset: -10px -15px;
    width: calc(100% + 30px);
    height: calc(100% + 20px);
    pointer-events: none;
    color: var(--color-accent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .primary-btn .scribble-circle path {
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
  }

  .primary-btn:hover .scribble-circle {
    opacity: 0.6;
  }

  .primary-btn:hover .scribble-circle path {
    animation: draw 0.8s ease-out forwards;
  }

  @keyframes draw {
    to { stroke-dashoffset: 0; }
  }

  /* Reveal Animations */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
                transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .secondary-btn {
    padding: 1rem 2rem;
    background: var(--color-surface-elevated);
    border: 2px solid var(--color-line);
    color: var(--color-ink);
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .secondary-btn:hover {
    background: var(--color-surface-soft);
    border-color: var(--color-binder);
  }

  /* Bento Grid */
  .learning-method {
    padding: 6rem 0;
    margin-bottom: 4rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .kicker {
    font-family: var(--font-handwriting);
    color: var(--color-accent);
    font-size: 1.5rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .section-header h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .section-header p {
    font-size: 1.15rem;
    opacity: 0.7;
    max-width: 500px;
    margin: 0 auto;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(200px, auto);
    gap: 1.5rem;
  }

  .bento-item {
    background: var(--color-surface-elevated);
    border-radius: 24px;
    border: 1px solid var(--color-line);
    padding: 2.5rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .bento-item:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-binder);
  }

  .feature-1 {
    grid-column: span 1;
  }
  .feature-2 {
    grid-column: span 1;
  }
  .feature-3 {
    grid-column: span 2;
    flex-direction: row;
    align-items: center;
  }

  .notes-highlight {
    grid-column: span 1;
    grid-row: span 2;
    background: linear-gradient(
      165deg,
      var(--color-surface-elevated) 0%,
      var(--color-surface-soft) 100%
    );
    border-left: 6px solid var(--color-binder);
  }

  .notes-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: var(--color-binder);
  }

  .notes-header h3 {
    margin: 0;
  }

  .method-icon {
    width: 64px;
    height: 64px;
    background: var(--color-surface-soft);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-binder);
    flex-shrink: 0;
  }

  .card-content h3 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
  }
  .card-content p {
    margin: 0 0 1.25rem;
    font-size: 1rem;
    opacity: 0.8;
    line-height: 1.6;
  }

  .ref-tag {
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--color-status-warning-soft);
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
  }

  .ref-box {
    margin-top: 2rem;
    font-style: italic;
    background: var(--color-surface-soft);
    padding: 1.25rem;
    border-radius: 12px;
    font-size: 0.9rem;
    border: 1px dashed var(--color-line);
  }

  /* Quick Stats */
  .quick-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    margin-top: 4rem;
    background: var(--color-surface-elevated);
    padding: 2rem;
    border-radius: 24px;
    border: 1px solid var(--color-line);
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--color-binder);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
    margin-top: 0.25rem;
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--color-line);
  }

  /* Semester Overview */
  .semester-overview {
    margin-bottom: 6rem;
  }
  .semester-overview h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .semester-card {
    background: var(--color-surface-elevated);
    border-radius: 24px;
    padding: 2.5rem;
    margin-bottom: 2.5rem;
    border: 1px solid var(--color-line);
    box-shadow: var(--shadow-sm);
  }

  .semester-card h3 {
    margin: 0 0 2rem;
    font-size: 1.75rem;
    color: var(--color-binder);
    border-bottom: 2px solid var(--color-line);
    padding-bottom: 0.75rem;
    display: inline-block;
  }

  .subjects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  /* Browse All */
  .browse-all {
    padding: 5rem 2rem;
    text-align: center;
    background: var(--color-ink);
    color: var(--color-ink-light);
    border-radius: 32px;
    margin-bottom: 6rem;
    position: relative;
    overflow: hidden;
  }

  .browse-all::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 20% 30%, var(--color-line) 0%, transparent 50%);
    opacity: 0.1;
    pointer-events: none;
  }

  .browse-content h3 {
    color: var(--color-ink-light);
    margin: 1.5rem 0 1rem;
    font-size: 2rem;
  }
  .browse-content p {
    opacity: 0.6;
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
  }

  .catalog-btn {
    display: inline-block;
    padding: 1rem 2.5rem;
    background: var(--color-surface-elevated);
    color: var(--color-ink);
    text-decoration: none;
    font-weight: 700;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .catalog-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  /* Footer */
  .main-footer {
    margin-top: 4rem;
    padding: 4rem 0 2rem;
    border-top: 1px solid var(--color-line);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .footer-brand h4 {
    font-family: var(--font-body);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }

  .footer-brand h4 span {
    color: var(--color-accent);
  }
  .footer-brand p {
    opacity: 0.7;
    max-width: 300px;
  }

  .footer-links {
    display: flex;
    gap: 4rem;
    justify-content: flex-end;
  }

  .link-group h5 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-binder);
    margin-bottom: 1.5rem;
  }

  .link-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .link-group a {
    text-decoration: none;
    color: var(--color-ink);
    opacity: 0.65;
    transition: all 0.2s;
    font-size: 0.95rem;
  }

  .link-group a:hover {
    opacity: 1;
    color: var(--color-binder);
  }

  .footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--color-line);
    text-align: center;
    font-size: 0.85rem;
    opacity: 0.5;
  }

  @media (max-width: 1024px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .feature-3 {
      grid-column: span 2;
    }
    .notes-highlight {
      grid-row: span 1;
      grid-column: span 2;
    }
    .quick-stats {
      gap: 1.5rem;
      padding: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 3.5rem;
    }
    .hero-cta {
      flex-direction: column;
      width: 100%;
      max-width: 300px;
    }
    .hero-search {
      padding: 0 1rem;
    }
    .bento-grid {
      grid-template-columns: 1fr;
    }
    .bento-item,
    .feature-3,
    .notes-highlight {
      grid-column: span 1;
    }
    .feature-3 {
      flex-direction: column;
      text-align: center;
    }
    .quick-stats {
      flex-direction: column;
      gap: 2rem;
      width: 100%;
    }
    .stat-divider {
      width: 40px;
      height: 1px;
    }
    .section-header h2 {
      font-size: 2.25rem;
    }
    .semester-card {
      padding: 1.5rem;
    }
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .footer-links {
      justify-content: flex-start;
      gap: 2rem;
    }
  }
</style>
