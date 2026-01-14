<script lang="ts">
    interface Props {
        title: string;
        children?: import("svelte").Snippet;
    }

    let { title, children }: Props = $props();
</script>

<div class="note-section">
    <h3 class="section-title">{title}</h3>
    <div class="section-content">
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>

<style>
    .note-section {
        margin-bottom: 2rem;
    }

    .section-title {
        font-family: var(--font-handwriting);
        color: var(--color-binder);
        border-bottom: 2px solid var(--color-line);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
    }

    .section-content {
        line-height: 1.8;
    }
</style>
