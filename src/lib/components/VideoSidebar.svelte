<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import { browser } from '$app/environment';
    import { X, Play, Pause, MonitorPlay, Scroll } from 'lucide-svelte';

    /**
     * VideoSidebar — Reusable collapsible sidebar with an embedded YouTube player
     * and interactive chapter timeline.
     *
     * Uses a custom event 'videosidebar' on document to coordinate with
     * the NotesPanel (they share the right-side space and auto-close each other).
     *
     * Usage:
     *   <VideoSidebar bind:this={ref} videoId="Ex0nhOPzLIs" {chapters} />
     */

    interface Chapter {
        title: string;
        time: string;
        seconds: number;
    }

    interface Props {
        videoId: string;
        chapters?: Chapter[];
    }

    let { videoId, chapters = [] }: Props = $props();

    let isOpen = $state(false);
    let player: any = $state(null);
    let playerReady = $state(false);
    let initialized = $state(false);
    let activeChapterIdx = $state(0);
    let isPlaying = $state(false);
    let autoScrollEnabled = $state(true);
    let trackInterval: ReturnType<typeof setInterval> | null = null;
    let chapterListRef: HTMLUListElement | null = $state(null);

    const playerContainerId = `yt-player-${videoId}`;

    /* ── Coordinate with NotesPanel ── */
    function notifyLayout(open: boolean) {
        if (!browser) return;
        // Dispatch event so +layout.svelte can close NotesPanel
        document.dispatchEvent(new CustomEvent('videosidebar', { detail: { open } }));
        // Also set a body attribute so layout CSS can add margin-right
        document.body.toggleAttribute('data-video-sidebar-open', open);
    }

    /* ── Public API ── */

    export function open() {
        isOpen = true;
        notifyLayout(true);
        if (!initialized) initOnFirstOpen();
    }

    export function close() {
        isOpen = false;
        notifyLayout(false);
    }

    export function toggle() {
        if (isOpen) { close(); } else { open(); }
    }

    export function seekTo(seconds: number) {
        if (!isOpen) open();
        const attempt = () => {
            if (player && playerReady) {
                player.seekTo(seconds, true);
                player.playVideo();
            } else {
                setTimeout(attempt, 200);
            }
        };
        tick().then(attempt);
    }

    /* ── Internal ── */

    function initOnFirstOpen() {
        if (!browser || initialized) return;
        initialized = true;
        loadPlayer();
    }

    function loadPlayer() {
        const win = window as any;

        function createPlayer() {
            const el = document.getElementById(playerContainerId);
            if (!el) { setTimeout(createPlayer, 100); return; }
            player = new win.YT.Player(playerContainerId, {
                videoId,
                playerVars: { playsinline: 1, rel: 0, modestbranding: 1, origin: window.location.origin },
                events: {
                    onReady: () => { playerReady = true; },
                    onStateChange: (e: any) => { isPlaying = e.data === 1; }
                }
            });
        }

        if (win.YT?.Player) {
            createPlayer();
        } else {
            if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(tag);
            }
            const prev = win.onYouTubeIframeAPIReady;
            win.onYouTubeIframeAPIReady = () => { prev?.(); createPlayer(); };
        }
    }

    function updateActiveChapter() {
        if (!player || !playerReady || typeof player.getCurrentTime !== 'function') return;
        try {
            const t = player.getCurrentTime();
            let newIdx = activeChapterIdx;
            for (let i = chapters.length - 1; i >= 0; i--) {
                if (t >= chapters[i].seconds) { newIdx = i; break; }
            }
            
            if (newIdx !== activeChapterIdx) {
                activeChapterIdx = newIdx;
                if (browser && chapterListRef) {
                    const activeLi = chapterListRef.children[activeChapterIdx] as HTMLElement;
                    if (activeLi) {
                        activeLi.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }

            // Dispatch tick event for bidirectional sync
            if (browser && isOpen) {
                document.dispatchEvent(new CustomEvent('video-tick', {
                    detail: { seconds: t, autoScroll: autoScrollEnabled }
                }));
            }
        } catch { /* player not ready */ }
    }

    function handleChapterClick(seconds: number) {
        if (player && playerReady) {
            player.seekTo(seconds, true);
            player.playVideo();
        }
    }

    function togglePlayPause() {
        if (!player || !playerReady) return;
        if (player.getPlayerState() === 1) { player.pauseVideo(); }
        else { player.playVideo(); }
    }

    // Listen for NotesPanel opening → close ourselves
    function handleNotesPanelEvent() {
        if (isOpen) {
            isOpen = false;
            notifyLayout(false);
        }
    }

    onMount(() => {
        if (!browser) return;
        trackInterval = setInterval(updateActiveChapter, 500);

        // When NotesPanel opens via Ctrl+., auto-close video sidebar
        document.addEventListener('notespanel-open', handleNotesPanelEvent);
    });

    onDestroy(() => {
        if (trackInterval) clearInterval(trackInterval);
        if (browser) {
            document.removeEventListener('notespanel-open', handleNotesPanelEvent);
            document.body.removeAttribute('data-video-sidebar-open');
        }
    });
</script>

<button 
    class="video-fab" 
    class:open={isOpen} 
    onclick={toggle} 
    aria-label={isOpen ? "Tutup panel video" : "Buka Video Presentasi"}
>
    {#if isOpen}
        <X size={20} />
    {:else}
        <MonitorPlay size={18} />
        <span class="fab-label">Video</span>
    {/if}
</button>

<!-- Sidebar drawer -->
<aside class="video-sidebar" class:open={isOpen}>
    <div class="sidebar-inner">
        <!-- Header -->
        <div class="sidebar-header">
            <h3 class="sidebar-title">
                <MonitorPlay size={16} />
                Video Presentasi
            </h3>
            <button class="close-btn" onclick={close} aria-label="Tutup panel video">
                <X size={16} />
            </button>
        </div>

        <!-- Player -->
        <div class="player-wrapper">
            {#if initialized}
                <div id={playerContainerId} class="player-embed"></div>
            {:else}
                <div class="player-placeholder">
                    <Play size={32} />
                    <span>Klik chapter untuk mulai</span>
                </div>
            {/if}
        </div>

        <!-- Mini controls -->
        {#if playerReady}
            <div class="mini-controls">
                <button class="play-pause-btn" onclick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
                    {#if isPlaying}<Pause size={14} />{:else}<Play size={14} />{/if}
                </button>
                <span class="now-playing-label">
                    {chapters[activeChapterIdx]?.title ?? 'Siap diputar'}
                </span>
            </div>
        {/if}

        <!-- Auto-scroll toggle -->
        <div class="sync-toggle">
            <label class="toggle-label">
                <Scroll size={13} />
                <span>Auto-scroll catatan</span>
                <button
                    class="toggle-switch"
                    class:active={autoScrollEnabled}
                    onclick={() => autoScrollEnabled = !autoScrollEnabled}
                    role="switch"
                    aria-checked={autoScrollEnabled}
                    aria-label="Toggle auto-scroll catatan"
                >
                    <span class="toggle-knob"></span>
                </button>
            </label>
        </div>

        <!-- Chapter timeline -->
        {#if chapters.length > 0}
            <div class="chapter-list">
                <span class="chapter-list-title">CHAPTER TIMELINE</span>
                <ul bind:this={chapterListRef}>
                    {#each chapters as chapter, i}
                        <li 
                            class:active={i === activeChapterIdx && playerReady}
                            class:passed={i < activeChapterIdx && playerReady}
                        >
                            <button class="chapter-btn" onclick={() => handleChapterClick(chapter.seconds)}>
                                <span class="chapter-dot"></span>
                                <span class="chapter-time">{chapter.time}</span>
                                <span class="chapter-name">{chapter.title}</span>
                            </button>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</aside>

<style>
    /* ── Floating Action Button ── */
    .video-fab {
        position: fixed;
        right: 0;
        top: calc(1.5rem + 56px);
        z-index: 101; /* Sit above the sidebar shadow */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        background: var(--color-binder, #8b4513);
        color: #fff;
        border: none;
        padding: 0.6rem 0.8rem 0.6rem 0.7rem;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 700;
        font-family: var(--font-handwriting, inherit);
        box-shadow: -2px 2px 12px rgba(0,0,0,0.15);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .video-fab:hover {
        padding-right: 1.1rem;
        box-shadow: -4px 4px 20px rgba(0,0,0,0.2);
    }
    .video-fab.open {
        right: 340px;
        background: var(--color-ink, #2c1810);
        width: 48px;
        height: 48px;
        padding: 0;
        border-radius: 8px 0 0 8px;
    }
    .video-fab.open:hover {
        width: 56px;
        padding-right: 0;
    }
    .fab-label { letter-spacing: 0.03em; }

    /* ── Sidebar Drawer ── */
    .video-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 340px;
        height: 100vh;
        z-index: 100;
        background: var(--color-surface, #fffdf7);
        border-left: 2px solid var(--color-line, #e0d6c2);
        box-shadow: -4px 0 24px rgba(0,0,0,0.08);
        transform: translateX(100%);
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    }
    .video-sidebar.open {
        transform: translateX(0);
    }

    .sidebar-inner {
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    /* ── Header ── */
    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--color-line, #e0d6c2);
        background: var(--color-surface-soft, #f7f3eb);
    }
    .sidebar-title {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 700;
        font-family: var(--font-handwriting, inherit);
        color: var(--color-ink-strong, #2c1810);
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }
    .close-btn {
        background: none;
        border: 1px solid transparent;
        border-radius: 6px;
        padding: 0.3rem;
        cursor: pointer;
        color: var(--color-ink-muted, #8a7a6a);
        transition: all 0.15s;
    }
    .close-btn:hover {
        background: var(--color-surface-soft, #f7f3eb);
        border-color: var(--color-line, #e0d6c2);
        color: var(--color-ink-strong, #2c1810);
    }

    /* ── Player ── */
    .player-wrapper {
        aspect-ratio: 16 / 9;
        width: 100%;
        background: #000;
        flex-shrink: 0;
    }
    .player-wrapper :global(iframe) {
        width: 100% !important;
        height: 100% !important;
    }
    .player-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: #666;
        font-size: 0.8rem;
        background: #1a1a1a;
    }
    .player-placeholder :global(svg) { color: #888; }

    /* ── Mini Controls ── */
    .mini-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid var(--color-line, #e0d6c2);
        background: var(--color-surface-soft, #f7f3eb);
    }
    .play-pause-btn {
        background: var(--color-binder, #8b4513);
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.15s;
        flex-shrink: 0;
    }
    .play-pause-btn:hover { transform: scale(1.1); }
    .now-playing-label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--color-ink, #3c2f20);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* ── Chapter List ── */
    .chapter-list {
        flex: 1;
        overflow-y: auto;
        padding: 0.75rem 0;
    }
    .chapter-list-title {
        display: block;
        font-size: 0.6rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: var(--color-ink-muted, #8a7a6a);
        padding: 0 1rem 0.5rem;
        text-transform: uppercase;
    }
    .chapter-list ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .chapter-list li { 
        position: relative; 
        margin: 0;
        padding: 0;
    }
    .chapter-list li::before {
        content: '';
        position: absolute;
        left: 1.625rem;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--color-line, #e0d6c2);
        z-index: 0;
    }
    .chapter-list li.passed::before {
        background: var(--color-binder, #8b4513);
    }
    .chapter-list li.active::before {
        background: linear-gradient(to bottom, var(--color-binder, #8b4513) 50%, var(--color-line, #e0d6c2) 50%);
    }
    .chapter-list li:first-child::before { top: 50%; }
    .chapter-list li:last-child::before { bottom: 50%; }

    .chapter-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.6rem 1rem;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: inherit;
        border-radius: 8px;
        margin: 0 0.25rem;
        width: calc(100% - 0.5rem);
    }
    .chapter-btn:hover { 
        background: var(--color-surface-soft, #f7f3eb); 
        transform: translateX(2px);
    }

    .chapter-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid var(--color-line, #e0d6c2);
        background: var(--color-surface, #fffdf7);
        flex-shrink: 0;
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .chapter-btn:hover .chapter-dot {
        border-color: var(--color-binder, #8b4513);
        transform: scale(1.2);
    }
    
    @keyframes pulse-playing {
        0% { box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.3); }
        70% { box-shadow: 0 0 0 6px rgba(139, 69, 19, 0); }
        100% { box-shadow: 0 0 0 0 rgba(139, 69, 19, 0); }
    }

    li.active .chapter-dot {
        background: var(--color-binder, #8b4513);
        border-color: var(--color-binder, #8b4513);
        transform: scale(1.2);
        animation: pulse-playing 2s infinite cubic-bezier(0.66, 0, 0, 1);
    }

    .chapter-time {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--color-binder, #8b4513);
        font-variant-numeric: tabular-nums;
        min-width: 36px;
        transition: color 0.2s;
    }
    .chapter-name {
        font-size: 0.78rem;
        color: var(--color-ink, #3c2f20);
    }
    li.active .chapter-name {
        font-weight: 700;
        color: var(--color-ink-strong, #2c1810);
    }

    /* ── Sync Toggle ── */
    .sync-toggle {
        padding: 0.5rem 1rem;
        border-bottom: 1px solid var(--color-line, #e0d6c2);
    }
    .toggle-label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.72rem;
        font-weight: 600;
        color: var(--color-ink-muted, #8a7a6a);
        cursor: pointer;
    }
    .toggle-label span { flex: 1; }
    .toggle-switch {
        position: relative;
        width: 34px;
        height: 18px;
        border-radius: 999px;
        background: var(--color-line, #d4c9b6);
        border: none;
        cursor: pointer;
        transition: background 0.25s;
        flex-shrink: 0;
        padding: 0;
    }
    .toggle-switch.active {
        background: var(--color-binder, #8b4513);
    }
    .toggle-knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        transition: transform 0.25s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .toggle-switch.active .toggle-knob {
        transform: translateX(16px);
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
        .video-sidebar { width: 100vw; }
        .video-fab { top: auto; bottom: 1.5rem; right: 1rem; border-radius: 10px; transform: none; }
        .video-fab.open { display: none; }
    }
</style>
