<script lang="ts">
    interface Props {
        title: string;
        children?: import("svelte").Snippet;
    }

    let { title, children }: Props = $props();
</script>

<section class="note-section">
    <h2 class="section-title">
        <span class="title-text">{title}</span>
        <span class="title-underline"></span>
    </h2>
    <div class="section-content">
        {#if children}
            {@render children()}
        {/if}
    </div>
</section>

<style>
    .note-section {
        margin-bottom: 2.5rem;
    }

    .section-title {
        font-family: var(--font-handwriting);
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-ink-strong);
        margin-bottom: 1.25rem;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .title-text {
        position: relative;
        z-index: 1;
    }

    .title-underline {
        display: block;
        height: 3px;
        width: 100%;
        max-width: 200px;
        background: linear-gradient(
            90deg,
            var(--color-binder) 0%,
            rgba(139, 69, 19, 0.3) 70%,
            transparent 100%
        );
        border-radius: 2px;
    }

    .section-content {
        line-height: 1.8;
        padding-left: 0.5rem;
    }
</style>
