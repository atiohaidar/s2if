<script lang="ts">
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import { curriculum, findSubject } from "$lib/data/content";
    import Sticker from "./Sticker.svelte";
    import { STATUS_LABELS } from "$lib/data/constants";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Props {
        title: string;
        date?: string;
        status?: "done" | "wip" | "todo";
        tags?: string[];
    }

    let { title, date, status, tags = [] }: Props = $props();

    const pathSegments = $derived.by(() => {
        const withoutBase =
            base && page.url.pathname.startsWith(base)
                ? page.url.pathname.slice(base.length)
                : page.url.pathname;

        return withoutBase.split("/").filter(Boolean);
    });
    const semesterId = $derived(pathSegments[0] ?? "");
    const subjectId = $derived(pathSegments[1] ?? "");
    const topicId = $derived(pathSegments[2] ?? "");
    const semester = $derived(
        curriculum.find((entry) => entry.id === semesterId),
    );
    const subject = $derived(findSubject(semesterId, subjectId));
    const topicList = $derived((subject?.topics ?? []).slice().sort((left, right) => left.order - right.order));
    const topicIndex = $derived(topicList.findIndex((topic) => topic.id === topicId));
    const previousTopic = $derived(topicIndex > 0 ? topicList[topicIndex - 1] : null);
    const nextTopic = $derived(
        topicIndex >= 0 && topicIndex < topicList.length - 1
            ? topicList[topicIndex + 1]
            : null,
    );
    const showTopicNavigation = $derived(
        Boolean(semester && subject && topicId && topicIndex >= 0),
    );

    function toHref(parts: string[]): string {
        const path = `/${parts.filter(Boolean).join("/")}`;
        return `${base}${path}`;
    }
</script>

<header class="note-header">
    {#if showTopicNavigation}
        <nav class="topic-breadcrumb" aria-label="Breadcrumb topik">
            <a href={toHref([semesterId])}>{semester?.name ?? semesterId}</a>
            <span>/</span>
            <a href={toHref([semesterId, subjectId])}>{subject?.name ?? subjectId}</a>
            <span>/</span>
            <span class="topic-current">{title}</span>
        </nav>
    {/if}

    {#if date}
        <span class="date"><ThemeIcon name="overview" size={14} /> {date}</span>
    {/if}
    <h1>{title}</h1>
    {#if status || tags.length > 0}
        <div class="tags">
            {#if status}
                <Sticker type={status}>{STATUS_LABELS[status]}</Sticker>
            {/if}
            {#each tags as tag}
                <Sticker type="important">{tag}</Sticker>
            {/each}
        </div>
    {/if}

    {#if showTopicNavigation && (previousTopic || nextTopic)}
        <nav class="topic-nav" aria-label="Navigasi topik berikutnya">
            {#if previousTopic}
                <a
                    class="topic-nav-link"
                    href={toHref([semesterId, subjectId, previousTopic.id])}
                >
                    <ThemeIcon name="arrow-left" size={14} />
                    <span>{previousTopic.name}</span>
                </a>
            {:else}
                <span class="topic-nav-spacer"></span>
            {/if}

            {#if nextTopic}
                <a
                    class="topic-nav-link topic-nav-next"
                    href={toHref([semesterId, subjectId, nextTopic.id])}
                >
                    <span>{nextTopic.name}</span>
                    <ThemeIcon name="arrow-right" size={14} />
                </a>
            {/if}
        </nav>
    {/if}
</header>

<style>
    .note-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px dashed var(--color-line);
    }

    .date {
        font-size: 0.875rem;
        opacity: 0.6;
    }

    .topic-breadcrumb {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 0.7rem;
        font-size: 0.85rem;
        opacity: 0.8;
    }

    .topic-breadcrumb a {
        text-decoration: none;
        color: var(--color-link);
    }

    .topic-breadcrumb a:hover {
        text-decoration: underline;
    }

    .topic-current {
        opacity: 0.75;
    }

    .note-header h1 {
        margin: 0.5rem 0;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
        flex-wrap: wrap;
    }

    .topic-nav {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
    }

    .topic-nav-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        text-decoration: none;
        color: var(--color-link);
        padding: 0.45rem 0.7rem;
        border-radius: 8px;
        background: rgba(41, 128, 185, 0.08);
        transition: all 0.2s ease;
        max-width: 48%;
    }

    .topic-nav-link:hover {
        background: rgba(41, 128, 185, 0.15);
    }

    .topic-nav-link span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .topic-nav-next {
        margin-left: auto;
    }

    .topic-nav-spacer {
        min-width: 1px;
    }

    @media (max-width: 768px) {
        .topic-nav {
            flex-direction: column;
            align-items: stretch;
        }

        .topic-nav-link {
            max-width: none;
        }
    }
</style>
