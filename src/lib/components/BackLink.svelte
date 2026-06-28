<script lang="ts">
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import { curriculum, findSubject } from "$lib/data/content";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Props {
        href: string;
        label?: string;
    }

    let { href, label = "Kembali" }: Props = $props();

    // Prepend base path if href starts with /
    const fullHref = $derived(href.startsWith("/") ? `${base}${href}` : href);

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

<div class="note-navigation">
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

    <footer class="back-link">
        <a href={fullHref}>← {label}</a>
    </footer>
</div>

<style>
    .note-navigation {
        margin-top: 3rem;
    }

    .topic-nav {
        margin-bottom: 2rem;
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
        font-size: 0.9rem;
    }

    .topic-nav-next {
        margin-left: auto;
    }

    .topic-nav-spacer {
        min-width: 1px;
    }

    .back-link {
        padding-top: 1rem;
        border-top: 1px solid var(--color-line);
    }

    .back-link a {
        color: var(--color-link);
        text-decoration: none;
        font-weight: 500;
        transition: opacity 0.2s;
    }

    .back-link a:hover {
        text-decoration: underline;
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        .topic-nav {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
        }

        .topic-nav-link {
            max-width: none;
            justify-content: center;
        }

        .topic-nav-next {
            margin-left: 0;
        }
    }
</style>
