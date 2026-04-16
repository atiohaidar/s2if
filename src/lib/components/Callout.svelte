<script lang="ts">
    import { CALLOUT_ICONS, CALLOUT_TITLES } from "$lib/data/constants";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Props {
        type?: "tip" | "warning" | "info" | "danger";
        title?: string;
        scrollX?: boolean;
        children?: import("svelte").Snippet;
    }

    let { type = "tip", title, scrollX = false, children }: Props = $props();
</script>

    <blockquote class="callout callout-{type}" class:scroll-x={scrollX}>
    <span class="callout-icon">
        <ThemeIcon name={CALLOUT_ICONS[type]} size={20} />
    </span>
    <div class="callout-content">
        <strong class="callout-title">{title ?? CALLOUT_TITLES[type]}</strong>
        {#if children}
            <div class="callout-body">
                {@render children()}
            </div>
        {/if}
    </div>
</blockquote>

<style>
    .callout {
        display: flex;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
        margin: 1rem 0;
        border-radius: 0 8px 8px 0;
        border-left: 4px solid;
        font-style: normal;
    }

    .callout-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
    }

    .callout-content {
        flex: 1;
    }

    .callout.scroll-x .callout-content {
        overflow-x: auto;
        overflow-y: hidden;
    }

    .callout-title {
        display: block;
        margin-bottom: 0.25rem;
    }

    .callout-body {
        opacity: 0.9;
    }

    .callout-body :global(p) {
        margin: 0.25rem 0;
    }

    /* Tip - Yellow */
    .callout-tip {
        background: linear-gradient(
            135deg,
            var(--color-callout-tip-start) 0%,
            var(--color-callout-tip-end) 100%
        );
        border-color: var(--color-callout-tip-border);
        color: var(--color-callout-tip-text);
    }

    /* Warning - Orange */
    .callout-warning {
        background: linear-gradient(
            135deg,
            var(--color-callout-warning-start) 0%,
            var(--color-callout-warning-end) 100%
        );
        border-color: var(--color-callout-warning-border);
        color: var(--color-callout-warning-text);
    }

    /* Info - Blue */
    .callout-info {
        background: linear-gradient(
            135deg,
            var(--color-callout-info-start) 0%,
            var(--color-callout-info-end) 100%
        );
        border-color: var(--color-callout-info-border);
        color: var(--color-callout-info-text);
    }

    /* Danger - Red */
    .callout-danger {
        background: linear-gradient(
            135deg,
            var(--color-callout-danger-start) 0%,
            var(--color-callout-danger-end) 100%
        );
        border-color: var(--color-callout-danger-border);
        color: var(--color-callout-danger-text);
    }
</style>
