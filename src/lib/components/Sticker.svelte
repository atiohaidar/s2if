<script lang="ts">
    import { STICKER_ICONS } from "$lib/data/constants";

    interface Props {
        type?: "done" | "wip" | "todo" | "important";
        small?: boolean;
        children?: import("svelte").Snippet;
    }

    let { type = "todo", small = false, children }: Props = $props();
</script>

<span class="sticker sticker-{type}" class:small>
    <span class="sticker-icon">{STICKER_ICONS[type]}</span>
    <span class="sticker-text">
        {#if children}
            {@render children()}
        {/if}
    </span>
</span>

<style>
    .sticker {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.4rem 1rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: default;
        user-select: none;
    }

    .sticker:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .sticker.small {
        padding: 0.25rem 0.625rem;
        font-size: 0.7rem;
        gap: 0.25rem;
    }

    .sticker.small .sticker-icon {
        font-size: 0.7rem;
    }

    .sticker-icon {
        font-size: 0.85rem;
        line-height: 1;
    }

    .sticker-text {
        line-height: 1;
    }

    .sticker-done {
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        color: white;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .sticker-wip {
        background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%);
        color: white;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .sticker-todo {
        background: linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%);
        color: white;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .sticker-important {
        background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
        color: white;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        animation: glow-important 2s ease-in-out infinite;
    }

    @keyframes glow-important {
        0%,
        100% {
            box-shadow:
                0 2px 4px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 0 0 rgba(231, 76, 60, 0.4);
        }
        50% {
            box-shadow:
                0 2px 4px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 12px 2px rgba(231, 76, 60, 0.3);
        }
    }
</style>
