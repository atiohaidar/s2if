<script lang="ts">
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
</script>

<header class="note-header">
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

    .note-header h1 {
        margin: 0.5rem 0;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
        flex-wrap: wrap;
    }
</style>
