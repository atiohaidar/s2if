<script lang="ts">
    import { page } from "$app/state";
    import { findSubject } from "$lib/data/curriculum";
    import TopicCard from "$lib/components/TopicCard.svelte";
    import Sticker from "$lib/components/Sticker.svelte";

    const semesterId = $derived(page.params.semester ?? "");
    const subjectId = $derived(page.params.subject ?? "");
    const subject = $derived(findSubject(semesterId, subjectId));
</script>

<svelte:head>
    <title>{subject?.name ?? "Subject"} - S2IF Notebook</title>
</svelte:head>

{#if subject}
    <div class="subject-page">
        <header class="subject-header">
            <span class="subject-icon">{subject.icon}</span>
            <div>
                <h1>{subject.name}</h1>
                <p class="breadcrumb">
                    <a href="/">Beranda</a> /
                    <span class="current">{semesterId.replace("-", " ")}</span>
                </p>
            </div>
            {#if subject.status}
                <Sticker type={subject.status}>
                    {subject.status === "done"
                        ? "Selesai"
                        : subject.status === "wip"
                          ? "Dalam Proses"
                          : "Belum Mulai"}
                </Sticker>
            {/if}
        </header>

        <section class="topics-section">
            <h2>📚 Materi</h2>

            {#if subject.topics && subject.topics.length > 0}
                <div class="topics-list">
                    {#each subject.topics as topic}
                        <TopicCard {topic} {semesterId} {subjectId} />
                    {/each}
                </div>
            {:else}
                <div class="empty-state">
                    <p>📝 Belum ada materi untuk mata kuliah ini.</p>
                    <p class="hint">
                        Tambahkan topic di <code
                            >src/lib/data/curriculum.ts</code
                        >
                    </p>
                </div>
            {/if}
        </section>

        <section class="add-note-section">
            <h2>➕ Cara Menambah Catatan Baru</h2>
            <ol class="steps">
                <li>
                    Buat folder baru di <code
                        >src/routes/{semesterId}/{subjectId}/[nama-topic]</code
                    >
                </li>
                <li>
                    Buat file <code>+page.svelte</code> di dalam folder tersebut
                </li>
                <li>
                    Tambahkan topic di <code>src/lib/data/curriculum.ts</code>
                </li>
            </ol>
        </section>
    </div>
{:else}
    <div class="not-found">
        <h1>404</h1>
        <p>Mata kuliah tidak ditemukan</p>
        <a href="/">← Kembali ke Beranda</a>
    </div>
{/if}

<style>
    .subject-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .subject-icon {
        font-size: 3rem;
    }

    .subject-header h1 {
        margin: 0;
    }

    .breadcrumb {
        font-size: 0.875rem;
        margin: 0.25rem 0 0;
        opacity: 0.7;
    }

    .breadcrumb a {
        color: var(--color-link);
        text-decoration: none;
    }

    .breadcrumb a:hover {
        text-decoration: underline;
    }

    .current {
        text-transform: capitalize;
    }

    .topics-section {
        margin-bottom: 2rem;
    }

    .topics-section h2 {
        margin-bottom: 1rem;
    }

    .topics-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .empty-state {
        text-align: center;
        padding: 3rem;
        background: rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        border: 2px dashed var(--color-line);
    }

    .empty-state p {
        margin: 0.5rem 0;
    }

    .hint {
        font-size: 0.875rem;
        opacity: 0.6;
    }

    .add-note-section {
        background: rgba(255, 255, 255, 0.5);
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--color-line);
    }

    .add-note-section h2 {
        margin-top: 0;
    }

    .steps {
        padding-left: 1.5rem;
        line-height: 2;
    }

    .steps code {
        font-size: 0.85rem;
    }

    .not-found {
        text-align: center;
        padding: 4rem 2rem;
    }

    .not-found h1 {
        font-size: 6rem;
        margin: 0;
        opacity: 0.2;
    }

    .not-found a {
        color: var(--color-link);
    }
</style>
