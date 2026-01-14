<script lang="ts">
    interface Props {
        type?: "done" | "wip" | "todo" | "important";
        small?: boolean;
        children?: import("svelte").Snippet;
    }

    let { type = "todo", small = false, children }: Props = $props();
</script>

<span class="sticker sticker-{type}" class:small>
    {#if children}
        {@render children()}
    {/if}
</span>

<style>
    .sticker {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    .sticker.small {
        padding: 0.125rem 0.5rem;
        font-size: 0.65rem;
    }

    .sticker-done {
        background-color: #27ae60;
        color: white;
    }

    .sticker-wip {
        background-color: #f39c12;
        color: white;
    }

    .sticker-todo {
        background-color: #95a5a6;
        color: white;
    }

    .sticker-important {
        background-color: #e74c3c;
        color: white;
    }
</style>
