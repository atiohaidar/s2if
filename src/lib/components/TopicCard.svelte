<script lang="ts">
    import type { Topic } from "$lib/data/content";
    import { TOPIC_TYPE_ICONS, TOPIC_TYPE_LABELS } from "$lib/data/constants";
    import { base } from "$app/paths";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Props {
        topic: Topic;
        semesterId: string;
        subjectId: string;
    }

    let { topic, semesterId, subjectId }: Props = $props();
</script>

<a href="{base}/{semesterId}/{subjectId}/{topic.id}" class="topic-card">
    <div class="topic-icon">
        <ThemeIcon name={TOPIC_TYPE_ICONS[topic.type]} size={20} />
    </div>
    <div class="topic-info">
        <h4 class="topic-name">{topic.name}</h4>
        {#if topic.summary}
            <p class="topic-summary">{topic.summary}</p>
        {/if}
        <span class="topic-type">{TOPIC_TYPE_LABELS[topic.type]}</span>
    </div>
    {#if topic.status}
        <span class="status-dot {topic.status}"></span>
    {/if}
</a>

<style>
    .topic-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border: 1px solid var(--color-line);
        border-radius: 8px;
        text-decoration: none;
        color: var(--color-ink);
        transition: all 0.2s;
    }

    .topic-card:hover {
        transform: translateX(4px);
        border-color: var(--color-binder);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .topic-icon {
        font-size: 1.5rem;
    }

    .topic-info {
        flex: 1;
    }

    .topic-name {
        margin: 0;
        font-size: 1rem;
        font-family: var(--font-handwriting);
    }

    .topic-type {
        font-size: 0.75rem;
        opacity: 0.6;
    }

    .topic-summary {
        margin: 0.25rem 0;
        font-size: 0.85rem;
        line-height: 1.5;
        opacity: 0.72;
    }

    .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .status-dot.done {
        background: var(--color-status-done);
    }

    .status-dot.wip {
        background: var(--color-status-wip);
    }

    .status-dot.todo {
        background: var(--color-status-todo);
    }
</style>
