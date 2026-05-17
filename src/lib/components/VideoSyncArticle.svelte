<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { Video } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    /**
     * VideoSyncArticle — Reusable wrapper that enables bidirectional sync
     * between an embedded YouTube video (via VideoSidebar) and note sections.
     *
     * Usage:
     *   1. Wrap your note content with <VideoSyncArticle {sectionMap}>
     *   2. Inside, add data-section-id="..." to any div wrapping a NoteSection
     *   3. The component auto-highlights the active section, scrolls to it,
     *      and shows a floating re-sync button when the user scrolls away.
     *
     * Example:
     *   <VideoSyncArticle sectionMap={[
     *       { id: 'intro', startSeconds: 0, endSeconds: 120 },
     *       { id: 'main', startSeconds: 121, endSeconds: 500 },
     *   ]}>
     *       <div data-section-id="intro">
     *           <NoteSection title="Introduction">...</NoteSection>
     *       </div>
     *       <div data-section-id="main">
     *           <NoteSection title="Main Content">...</NoteSection>
     *       </div>
     *   </VideoSyncArticle>
     */

    interface SectionMapping {
        id: string;
        startSeconds: number;
        endSeconds: number;
    }

    interface Props {
        sectionMap: SectionMapping[];
        children: Snippet;
    }

    let { sectionMap, children }: Props = $props();

    let wrapperEl: HTMLDivElement;
    let activeSection = $state<string | null>(null);
    let userScrolledAway = $state(false);
    let lastScrollTime = 0;
    let isAutoScrolling = false;

    /** Find which section corresponds to the current video time */
    function findActiveSection(seconds: number): string | null {
        for (const s of sectionMap) {
            if (seconds >= s.startSeconds && seconds <= s.endSeconds) return s.id;
        }
        return null;
    }

    /** Update DOM highlight classes (no Svelte bindings needed in pages) */
    function updateHighlight(newId: string | null) {
        if (!wrapperEl) return;
        // Remove old highlight
        const prev = wrapperEl.querySelector('.video-highlight');
        prev?.classList.remove('video-highlight');
        // Add new highlight
        if (newId) {
            const el = wrapperEl.querySelector(`[data-section-id="${newId}"]`);
            el?.classList.add('video-highlight');
        }
    }

    /** Smooth-scroll to the active section element */
    function scrollToSection(sectionId: string) {
        if (!wrapperEl) return;
        const el = wrapperEl.querySelector(`[data-section-id="${sectionId}"]`);
        if (!el) return;

        // Skip if already visible in viewport
        const rect = el.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.top <= window.innerHeight * 0.6;
        if (inView) return;

        isAutoScrolling = true;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { isAutoScrolling = false; }, 800);
    }

    /** Handle video-tick events from VideoSidebar */
    function handleVideoTick(e: Event) {
        const { seconds, autoScroll } = (e as CustomEvent).detail;
        const newSection = findActiveSection(seconds);

        if (newSection && newSection !== activeSection) {
            activeSection = newSection;
            updateHighlight(newSection);

            if (autoScroll && !userScrolledAway) {
                scrollToSection(newSection);
            }
        }
    }

    /** Detect manual scroll → pause auto-scroll */
    function handleUserScroll() {
        if (isAutoScrolling || !activeSection) return;
        const now = Date.now();
        if (now - lastScrollTime < 100) return;
        lastScrollTime = now;
        userScrolledAway = true;
    }

    /** Re-sync button: scroll to current section and re-enable auto-scroll */
    function resyncToVideo() {
        userScrolledAway = false;
        if (activeSection) scrollToSection(activeSection);
    }

    onMount(() => {
        if (!browser) return;
        document.addEventListener('video-tick', handleVideoTick);
        window.addEventListener('scroll', handleUserScroll, { passive: true });
    });

    onDestroy(() => {
        if (!browser) return;
        document.removeEventListener('video-tick', handleVideoTick);
        window.removeEventListener('scroll', handleUserScroll);
    });
</script>

<div bind:this={wrapperEl} class="video-sync-wrapper">
    {@render children()}
</div>

<!-- Floating re-sync HUD (appears when user scrolls away while video is playing) -->
{#if userScrolledAway && activeSection}
    <button class="resync-fab" onclick={resyncToVideo}>
        <Video size={14} />
        <span>Ikuti Video Lagi</span>
    </button>
{/if}

<style>
    .video-sync-wrapper {
        /* Transparent wrapper — no visual impact on layout */
        display: contents;
    }

    /* ── Section Highlight ── */
    .video-sync-wrapper :global([data-section-id]) {
        border-left: 4px solid transparent;
        border-radius: 6px;
        transition:
            border-left-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        margin-left: -8px;
        padding-left: 8px;
    }

    .video-sync-wrapper :global(.video-highlight) {
        border-left-color: var(--color-binder, #8b4513) !important;
        background-color: color-mix(in srgb, var(--color-callout-info-bg, #f0f7ff) 40%, transparent);
        box-shadow: inset 4px 0 12px -4px rgba(139, 69, 19, 0.08);
    }

    /* ── Floating Re-sync Button ── */
    .resync-fab {
        position: fixed;
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 95;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        background: var(--color-binder, #8b4513);
        color: #fff;
        border: none;
        padding: 0.55rem 1.1rem;
        border-radius: 999px;
        cursor: pointer;
        font-size: 0.78rem;
        font-weight: 700;
        font-family: var(--font-handwriting, inherit);
        box-shadow: 0 4px 20px rgba(139, 69, 19, 0.3);
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: resync-entrance 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .resync-fab:hover {
        transform: translateX(-50%) translateY(-2px);
        box-shadow: 0 6px 24px rgba(139, 69, 19, 0.4);
    }

    @keyframes resync-entrance {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
</style>
