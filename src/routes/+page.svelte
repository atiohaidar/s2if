<script lang="ts">
    import { curriculum } from "$lib/data/curriculum";
    import Sticker from "$lib/components/Sticker.svelte";
    import SubjectCard from "$lib/components/SubjectCard.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
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
        <h1><ThemeIcon name="notebook" size={34} /> Catatan S2 Informatika</h1>
        <p class="subtitle">
            Materi untuk menunjang keberlangsungan studi sebagai mahasiswa S2.
        </p>
    </header>

    <section class="intro">
        <h2><ThemeIcon name="edit" size={22} /> Selamat Datang!</h2>
        <p>
            Ini adalah <span class="highlight">buku catatan digital</span> untuk
            semua materi kuliah S2 Informatika. Setiap catatan dibuat dengan Svelte
            untuk fleksibilitas maksimal dalam visualisasi dan interaktivitas.
        </p>
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
        background: linear-gradient(
            135deg,
            var(--color-binder) 0%,
            var(--color-accent) 100%
        );
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

    .intro p {
        font-size: 1.1rem;
        line-height: 1.8;
    }

    .semester-overview {
        margin-bottom: 2rem;
    }

    .semester-card {
        background: rgba(255, 255, 255, 0.5);
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
        background: white;
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
        .guide-grid {
            grid-template-columns: 1fr;
        }

        .hero h1 {
            font-size: 2.5rem;
        }
    }
</style>
