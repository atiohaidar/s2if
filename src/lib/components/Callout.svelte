<script lang="ts">
    import { CALLOUT_ICONS, CALLOUT_TITLES } from "$lib/data/constants";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Props {
        type?: "tip" | "warning" | "info" | "danger";
        title?: string;
        children?: import("svelte").Snippet;
    }

    let { type = "tip", title, children }: Props = $props();
</script>

<blockquote class="callout callout-{type}">
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
        background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
        border-color: #f39c12;
        color: #856404;
    }

    /* Warning - Orange */
    .callout-warning {
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        border-color: #e67e22;
        color: #8a4500;
    }

    /* Info - Blue */
    .callout-info {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border-color: #3498db;
        color: #0c5460;
    }

    /* Danger - Red */
    .callout-danger {
        background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        border-color: #e74c3c;
        color: #721c24;
    }
</style>
