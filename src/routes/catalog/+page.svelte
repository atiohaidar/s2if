<script lang="ts">
    import { catalog, curriculum } from "$lib/data/content";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    let searchQuery = $state("");
    let semesterFilter = $state("all");
    let kindFilter = $state("all");
    let statusFilter = $state("all");
    let trackFilter = $state("all");
    let typeFilter = $state("all");

    const normalizedQuery = $derived(searchQuery.trim().toLowerCase());
    const semesters = $derived(catalog.filter((entry) => entry.kind === "semester"));
    const kindOptions = ["all", "subject", "topic"] as const;
    const statusOptions = ["all", "done", "wip", "todo"] as const;
    const trackOptions = ["all", "materi", "bedah-soal"] as const;
    const typeOptions = ["all", "catatan", "visual", "praktek"] as const;

    const searchResults = $derived(
        catalog.filter((entry) => {
            if (entry.kind === "semester") {
                return false;
            }

            if (semesterFilter !== "all" && entry.semesterId !== semesterFilter) {
                return false;
            }

            if (kindFilter !== "all" && entry.kind !== kindFilter) {
                return false;
            }

            if (statusFilter !== "all" && entry.status !== statusFilter) {
                return false;
            }

            if (trackFilter !== "all" && entry.track !== trackFilter) {
                return false;
            }

            if (typeFilter !== "all" && entry.type !== typeFilter) {
                return false;
            }

            if (normalizedQuery.length === 0) {
                return true;
            }

            const haystack = [
                entry.semesterName,
                entry.subjectName,
                entry.topicName ?? "",
                entry.track ?? "",
                entry.type ?? "",
                entry.status ?? "",
                entry.kind,
            ]
                .join(" ")
                .toLowerCase();

            return haystack.includes(normalizedQuery);
        }),
    );

    const semesterGroups = $derived(
        curriculum.map((semester) => ({
            semester,
            subjects: searchResults.filter(
                (entry) =>
                    entry.semesterId === semester.id &&
                    entry.kind === "subject",
            ),
            topics: searchResults.filter(
                (entry) => entry.semesterId === semester.id && entry.kind === "topic",
            ),
        })),
    );
</script>

<svelte:head>
    <title>Katalog Konten - S2IF Notebook</title>
    <meta
        name="description"
        content="Indeks global materi S2IF Notebook untuk mencari semester, mata kuliah, dan topik dengan cepat."
    />
</svelte:head>

<div class="catalog-page">
    <header class="page-header">
        <h1><ThemeIcon name="topics" size={34} /> Katalog Konten</h1>
        <p>
            Indeks global untuk menelusuri semua semester, mata kuliah, dan topik.
        </p>
    </header>

    <section class="search-panel">
        <label for="catalog-search" class="search-label">Cari konten</label>
        <input
            id="catalog-search"
            type="search"
            bind:value={searchQuery}
            placeholder="Cari berdasarkan nama, jenis, atau status"
        />

        <div class="filter-grid">
            <label>
                <span>Semester</span>
                <select bind:value={semesterFilter}>
                    <option value="all">Semua semester</option>
                    {#each semesters as semester}
                        <option value={semester.semesterId}>{semester.semesterName}</option>
                    {/each}
                </select>
            </label>

            <label>
                <span>Jenis item</span>
                <select bind:value={kindFilter}>
                    {#each kindOptions as option}
                        <option value={option}>{option === "all" ? "Semua jenis" : option}</option>
                    {/each}
                </select>
            </label>

            <label>
                <span>Status</span>
                <select bind:value={statusFilter}>
                    {#each statusOptions as option}
                        <option value={option}>{option === "all" ? "Semua status" : option}</option>
                    {/each}
                </select>
            </label>

            <label>
                <span>Track</span>
                <select bind:value={trackFilter}>
                    {#each trackOptions as option}
                        <option value={option}>{option === "all" ? "Semua track" : option}</option>
                    {/each}
                </select>
            </label>

            <label>
                <span>Tipe</span>
                <select bind:value={typeFilter}>
                    {#each typeOptions as option}
                        <option value={option}>{option === "all" ? "Semua tipe" : option}</option>
                    {/each}
                </select>
            </label>
        </div>

        <div class="stats">
            <span>{searchResults.length} item ditemukan</span>
            <span>{curriculum.length} semester</span>
        </div>
    </section>

    {#each semesterGroups as group}
        <section class="semester-section">
            <h2>{group.semester.name}</h2>

            {#if group.subjects.length > 0}
                <div class="subject-list">
                    {#each group.subjects as subject}
                        <a class="entry-card subject" href={`/${group.semester.id}/${subject.subjectId}`}>
                            <span class="entry-kind">subject</span>
                            <div>
                                <strong>{subject.subjectName}</strong>
                                <p>{group.semester.name}</p>
                            </div>
                        </a>
                    {/each}
                </div>
            {/if}

            {#if group.topics.length > 0}
                <div class="topic-list">
                    {#each group.topics as topic}
                        <a
                            class="entry-card topic"
                            href={`/${group.semester.id}/${topic.subjectId}/${topic.topicId}`}
                        >
                            <span class="entry-kind">topic</span>
                            <div>
                                <strong>{topic.topicName}</strong>
                                <p>{topic.subjectName}</p>
                            </div>
                        </a>
                    {/each}
                </div>
            {/if}

            {#if group.subjects.length === 0 && group.topics.length === 0}
                <div class="empty-state">Tidak ada hasil pada semester ini.</div>
            {/if}
        </section>
    {/each}
</div>

<style>
    .catalog-page {
        max-width: 920px;
        margin: 0 auto;
    }

    .page-header {
        margin-bottom: 1.5rem;
    }

    .page-header h1 {
        margin-bottom: 0.5rem;
    }

    .search-panel {
        margin-bottom: 2rem;
        padding: 1.25rem;
        border: 1px solid var(--color-line);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.55);
    }

    .search-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--color-binder);
    }

    .search-panel input {
        width: 100%;
        padding: 0.9rem 1rem;
        border-radius: 10px;
        border: 1px solid var(--color-line);
        background: white;
        font: inherit;
    }

    .filter-grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 0.75rem;
        margin-top: 1rem;
    }

    .filter-grid label {
        display: grid;
        gap: 0.35rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-binder);
    }

    .filter-grid select {
        width: 100%;
        padding: 0.75rem 0.8rem;
        border-radius: 10px;
        border: 1px solid var(--color-line);
        background: white;
        color: var(--color-ink);
        font: inherit;
    }

    .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 0.75rem;
        font-size: 0.85rem;
        opacity: 0.75;
    }

    .semester-section {
        margin-bottom: 2rem;
    }

    .subject-list,
    .topic-list {
        display: grid;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .entry-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.1rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
        background: white;
        color: var(--color-ink);
        text-decoration: none;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
    }

    .entry-card:hover {
        transform: translateY(-1px);
        border-color: var(--color-binder);
        box-shadow: var(--shadow-md);
    }

    .entry-kind {
        min-width: 70px;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        background: rgba(139, 69, 19, 0.1);
        color: var(--color-binder);
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
    }

    .entry-card strong {
        display: block;
        margin-bottom: 0.2rem;
    }

    .entry-card p {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.72;
    }

    .empty-state {
        padding: 1rem;
        border-radius: 12px;
        border: 1px dashed var(--color-line);
        background: rgba(0, 0, 0, 0.03);
    }

    @media (max-width: 768px) {
        .filter-grid {
            grid-template-columns: 1fr;
        }

        .entry-card {
            align-items: flex-start;
        }

        .entry-kind {
            min-width: 62px;
        }
    }
</style>