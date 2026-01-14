<script lang="ts">
    import type { Topic } from "$lib/data/curriculum";

    interface Props {
        topic: Topic;
        semesterId: string;
        subjectId: string;
    }

    let { topic, semesterId, subjectId }: Props = $props();

    const typeIcons: Record<string, string> = {
        catatan: "📝",
        visual: "📊",
        praktek: "💻",
    };

    const typeLabels: Record<string, string> = {
        catatan: "Catatan",
        visual: "Visualisasi",
        praktek: "Praktek",
    };
</script>

<a href="/{semesterId}/{subjectId}/{topic.id}" class="topic-card">
    <div class="topic-icon">{typeIcons[topic.type]}</div>
    <div class="topic-info">
        <h4 class="topic-name">{topic.name}</h4>
        <span class="topic-type">{typeLabels[topic.type]}</span>
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
