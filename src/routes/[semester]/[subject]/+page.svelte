<script lang="ts">
    import { dev } from "$app/environment";
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import { findSubject } from "$lib/data/content";
    import { STATUS_LABELS } from "$lib/data/constants";
    import TopicCard from "$lib/components/TopicCard.svelte";
    import Sticker from "$lib/components/Sticker.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    const semesterId = $derived(page.params.semester ?? "");
    const subjectId = $derived(page.params.subject ?? "");
    const subject = $derived(findSubject(semesterId, subjectId));
    const materiTopics = $derived(
        (subject?.topics ?? []).filter(
            (topic) => (topic.track ?? "materi") === "materi",
        ),
    );
    const bedahSoalTopics = $derived(
        (subject?.topics ?? []).filter((topic) => topic.track === "bedah-soal"),
    );
</script>

<svelte:head>
    <title>{subject?.name ?? "Subject"} - S2IF Notebook</title>
    <meta
        name="description"
        content="Materi {subject?.name ??
            'Subject'} untuk S2 Informatika. Catatan, visualisasi, dan latihan praktek."
    />
</svelte:head>

{#if subject}
    <div class="subject-page">
        <header class="subject-header">
            <span class="subject-icon"><ThemeIcon name={subject.icon} size={36} /></span>
            <div>
                <h1>{subject.name}</h1>
                <p class="breadcrumb">
                    <a href="{base}/">Beranda</a> /
                    <span class="current">{semesterId.replace("-", " ")}</span>
                </p>
            </div>
            {#if subject.status}
                <Sticker type={subject.status}>
                    {STATUS_LABELS[subject.status] || "Belum Mulai"}
                </Sticker>
            {/if}
        </header>

        <section class="topics-section">
            <h2><ThemeIcon name="topics" size={22} /> Materi</h2>

            {#if materiTopics.length > 0}
                <div class="topics-list">
                    {#each materiTopics as topic}
                        <TopicCard {topic} {semesterId} {subjectId} />
                    {/each}
                </div>
            {:else}
                <div class="empty-state">
                    <p><ThemeIcon name="note" size={16} /> Belum ada materi untuk mata kuliah ini.</p>
                    {#if dev}
                        <p class="hint">
                            Tambahkan <code>topic.manifest.ts</code> di folder topic,
                            misalnya <code>src/routes/{semesterId}/{subjectId}/[nama-topic]/topic.manifest.ts</code>
                        </p>
                    {/if}
                </div>
            {/if}
        </section>

        <section class="topics-section bedah-soal-section">
            <h2><ThemeIcon name="edit" size={22} /> Bedah Soal</h2>

            {#if bedahSoalTopics.length > 0}
                <div class="topics-list">
                    {#each bedahSoalTopics as topic}
                        <TopicCard {topic} {semesterId} {subjectId} />
                    {/each}
                </div>
            {:else}
                <div class="empty-state">
                    <p><ThemeIcon name="note" size={16} /> Belum ada bedah soal untuk mata kuliah ini.</p>
                    {#if dev}
                        <p class="hint">
                            Tambahkan topic dengan <code>track: "bedah-soal"</code>
                            pada file <code>topic.manifest.ts</code>
                        </p>
                    {/if}
                </div>
            {/if}
        </section>

        {#if dev}
            <section class="add-note-section">
                <h2><ThemeIcon name="edit" size={22} /> Cara Menambah Catatan Baru</h2>
                <ol class="steps">
                    <li>
                        Buat folder baru di <code>src/routes/{semesterId}/{subjectId}/[nama-topic]</code>
                    </li>
                    <li>
                        Buat file <code>+page.svelte</code> di dalam folder tersebut
                    </li>
                    <li>
                        Buat file <code>topic.manifest.ts</code> dengan metadata
                        lengkap (id/slug/title/type/status/order/tags/prereq/renderMode)
                    </li>
                </ol>
            </section>
        {/if}
    </div>
{:else}
    <div class="not-found">
        <h1>404</h1>
        <p>Mata kuliah tidak ditemukan</p>
        <a href="{base}/">← Kembali ke Beranda</a>
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

    .bedah-soal-section {
        margin-top: -0.5rem;
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
        background: var(--color-surface-soft);
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
        background: var(--color-surface-elevated);
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
