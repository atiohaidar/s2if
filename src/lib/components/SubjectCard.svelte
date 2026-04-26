<script lang="ts">
    import Sticker from "./Sticker.svelte";
    import type { Subject } from "$lib/data/content";
    import { STATUS_LABELS } from "$lib/data/constants";
    import { base } from "$app/paths";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface Props {
        subject: Subject;
        semesterId: string;
    }

    let { subject, semesterId }: Props = $props();
</script>

<a href="{base}/{semesterId}/{subject.id}" class="subject-card">
    <div class="paper-texture"></div>
    <div class="folded-corner"></div>
    <div class="card-accent"></div>
    <div class="card-body">
        <div class="icon-container">
            <ThemeIcon name={subject.icon} size={24} />
        </div>
        <div class="content">
            <span class="name">{subject.name}</span>
            {#if subject.summary}
                <span class="summary">{subject.summary}</span>
            {/if}
        </div>
        {#if subject.status}
            <div class="sticker-wrapper">
                <Sticker type={subject.status} small>
                    {STATUS_LABELS[subject.status]}
                </Sticker>
            </div>
        {/if}
    </div>
</a>

<style>
    .subject-card {
        display: flex;
        background: var(--color-surface-elevated);
        border-radius: 20px 4px 20px 4px; /* Hand-drawn look */
        text-decoration: none;
        color: var(--color-ink);
        border: 1px solid var(--color-line);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: hidden;
        position: relative;
        height: 100%;
        box-shadow: var(--shadow-sm);
    }

    .paper-texture {
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.03;
        pointer-events: none;
    }

    .folded-corner {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        background: linear-gradient(135deg, transparent 50%, var(--color-line) 50%, var(--color-surface-soft) 100%);
        box-shadow: -2px 2px 5px rgba(0,0,0,0.05);
        transition: all 0.3s ease;
        z-index: 2;
    }

    .subject-card:hover {
        transform: translateY(-8px) rotate(1deg);
        box-shadow: var(--shadow-lg);
        border-color: var(--color-binder);
    }

    .subject-card:hover .folded-corner {
        width: 25px;
        height: 25px;
    }

    .card-accent {
        width: 6px;
        background: var(--color-binder);
        opacity: 0.2;
        transition: opacity 0.3s ease;
    }

    .subject-card:hover .card-accent {
        opacity: 1;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        gap: 1rem;
        flex: 1;
        position: relative;
        z-index: 1;
    }

    .icon-container {
        width: 44px;
        height: 44px;
        background: var(--color-surface-soft);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-binder);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .subject-card:hover .icon-container {
        background: var(--color-binder);
        color: var(--color-surface-elevated);
        transform: scale(1.15) rotate(-8deg);
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .name {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.3;
        color: var(--color-ink-strong);
    }

    .summary {
        font-size: 0.85rem;
        line-height: 1.5;
        opacity: 0.7;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .sticker-wrapper {
        margin-top: auto;
        padding-top: 0.5rem;
    }
</style>
