<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { page } from "$app/state";
  import { Play, Pause, MonitorPlay, X } from "lucide-svelte";

  let videoId = $derived(page.url.searchParams.get("videoId") || "");
  let chapters = $state<Array<{ title: string; time: string; seconds: number }>>([]);
  
  let player: any = $state(null);
  let playerReady = $state(false);
  let isPlaying = $state(false);
  let activeChapterIdx = $state(0);
  let channel: BroadcastChannel | null = null;
  let trackInterval: ReturnType<typeof setInterval> | null = null;
  let chapterListRef: HTMLUListElement | null = $state(null);

  onMount(() => {
    // Set default browser title
    document.title = "Memuat Video Presentasi...";

    // 1. Fetch chapters list from sessionStorage
    const storedChapters = sessionStorage.getItem("popout-chapters-" + videoId);
    if (storedChapters) {
      try {
        chapters = JSON.parse(storedChapters);
        document.title = `Video: ${chapters[0]?.title || "Presentasi"}`;
      } catch (e) {
        console.error("Failed to parse chapters", e);
      }
    }

    // 2. Initialize BroadcastChannel (Namespaced by videoId!)
    channel = new BroadcastChannel("s2if-video-sync-" + videoId);
    
    // 3. Listen for seek requests from the main notebook window
    channel.onmessage = (event) => {
      if (event.data.type === "seekTo") {
        if (player && playerReady) {
          player.seekTo(event.data.seconds, true);
          player.playVideo();
        }
      }
    };

    // 4. Load player and start tracking
    loadPlayer();
    trackInterval = setInterval(updateActiveChapterAndBroadcast, 500);

    return () => {
      if (trackInterval) clearInterval(trackInterval);
      channel?.close();
    };
  });

  function loadPlayer() {
    const win = window as any;

    function createPlayer() {
      const el = document.getElementById("popout-yt-player");
      if (!el) {
        setTimeout(createPlayer, 100);
        return;
      }
      player = new win.YT.Player("popout-yt-player", {
        videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            playerReady = true;
          },
          onStateChange: (e: any) => {
            isPlaying = e.data === 1;
          },
        },
      });
    }

    if (win.YT?.Player) {
      createPlayer();
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
    }
  }

  function updateActiveChapterAndBroadcast() {
    if (!player || !playerReady || typeof player.getCurrentTime !== "function") return;
    try {
      const t = player.getCurrentTime();
      let newIdx = activeChapterIdx;
      for (let i = chapters.length - 1; i >= 0; i--) {
        if (t >= chapters[i].seconds) {
          newIdx = i;
          break;
        }
      }

      if (newIdx !== activeChapterIdx) {
        activeChapterIdx = newIdx;
        if (chapterListRef) {
          const activeLi = chapterListRef.children[activeChapterIdx] as HTMLElement;
          if (activeLi) {
            activeLi.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }

      // Broadcast current ticks to the main page
      channel?.postMessage({
        type: "tick",
        seconds: t,
      });
    } catch {
      // player state not ready
    }
  }

  function handleChapterClick(seconds: number) {
    if (player && playerReady) {
      player.seekTo(seconds, true);
      player.playVideo();
    }
  }

  function togglePlayPause() {
    if (!player || !playerReady) return;
    if (player.getPlayerState() === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }
</script>

<div class="popout-video-container">
  <!-- Header -->
  <div class="popout-header">
    <h3 class="popout-title">
      <MonitorPlay size={16} />
      Jendela Video Presentasi
    </h3>
    <span class="status-badge" class:ready={playerReady}>
      {playerReady ? "Terhubung" : "Menghubungkan..."}
    </span>
  </div>

  <!-- Player wrapper -->
  <div class="player-wrapper">
    <div id="popout-yt-player" class="player-embed"></div>
  </div>

  <!-- Controls -->
  {#if playerReady}
    <div class="popout-controls">
      <button class="play-btn" onclick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {#if isPlaying}<Pause size={14} />{:else}<Play size={14} />{/if}
      </button>
      <span class="chapter-label">
        {chapters[activeChapterIdx]?.title ?? 'Siap diputar'}
      </span>
    </div>
  {/if}

  <!-- Timeline chapters -->
  {#if chapters.length > 0}
    <div class="chapter-list">
      <span class="timeline-title">CHAPTER TIMELINE</span>
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

<style>
  .popout-video-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--color-surface, #fffdf7);
    color: var(--color-ink, #3c2f20);
    overflow: hidden;
    font-family: inherit;
  }

  .popout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-line, #e0d6c2);
    background: var(--color-surface-soft, #f7f3eb);
    flex-shrink: 0;
  }

  .popout-title {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 700;
    font-family: var(--font-handwriting, inherit);
    color: var(--color-ink-strong, #2c1810);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .status-badge {
    font-size: 0.68rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
    color: var(--color-ink-muted, #8a7a6a);
    transition: all 0.3s;
  }

  .status-badge.ready {
    background: color-mix(in srgb, var(--color-binder, #8b4513) 12%, transparent);
    color: var(--color-binder, #8b4513);
  }

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

  .popout-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--color-line, #e0d6c2);
    background: var(--color-surface-soft, #f7f3eb);
    flex-shrink: 0;
  }

  .play-btn {
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

  .play-btn:hover {
    transform: scale(1.1);
  }

  .chapter-label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-ink, #3c2f20);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chapter-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem 0;
  }

  .timeline-title {
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
    content: "";
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
    background: linear-gradient(
      to bottom,
      var(--color-binder, #8b4513) 50%,
      var(--color-line, #e0d6c2) 50%
    );
  }

  .chapter-list li:first-child::before {
    top: 50%;
  }

  .chapter-list li:last-child::before {
    bottom: 50%;
  }

  .chapter-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: calc(100% - 0.5rem);
    margin: 0 0.25rem;
    padding: 0.6rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    border-radius: 8px;
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
    0% {
      box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.3);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(139, 69, 19, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(139, 69, 19, 0);
    }
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
</style>
