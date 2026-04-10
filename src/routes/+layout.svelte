<script lang="ts">
    import "../app.css";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import NotesPanel from "$lib/components/NotesPanel.svelte";
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";

    let { children } = $props();

    // Start closed to avoid hydration mismatch, then check on mount
    let sidebarOpen = $state(false);
    let notesOpen = $state(false);
    let theme = $state<"light" | "dark">("light");
    let mounted = $state(false);
    let previousSidebarOpen = false;
    let sidebarToggleEl: HTMLButtonElement | null = null;
    let sidebarEl: HTMLElement | null = null;
    let detachKeydownListener: (() => void) | null = null;

    onMount(() => {
        const storedTheme = browser ? localStorage.getItem("s2if-theme") : null;
        theme = storedTheme === "dark" ? "dark" : "light";
        document.documentElement.dataset.theme = theme;

        // Only check window size after mount (client-side only)
        sidebarOpen = window.innerWidth > 768;
        mounted = true;

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") {
                return;
            }

            if (notesOpen) {
                notesOpen = false;
            }

            if (sidebarOpen) {
                sidebarOpen = false;
            }
        };

        document.addEventListener("keydown", handleKeydown);
        detachKeydownListener = () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    });

    onDestroy(() => {
        detachKeydownListener?.();
    });

    $effect(() => {
        if (!mounted || previousSidebarOpen === sidebarOpen) {
            return;
        }

        if (sidebarOpen) {
            queueMicrotask(() => {
                const focusTarget = sidebarEl?.querySelector(
                    "a, button, [tabindex]:not([tabindex='-1'])",
                ) as HTMLElement | null;
                focusTarget?.focus();
            });
        } else {
            queueMicrotask(() => {
                sidebarToggleEl?.focus();
            });
        }

        previousSidebarOpen = sidebarOpen;
    });

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    function closeSidebar() {
        sidebarOpen = false;
    }

    function toggleNotes() {
        notesOpen = !notesOpen;
    }

    function toggleTheme() {
        theme = theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("s2if-theme", theme);
    }
</script>

<div
    class="app-container"
    class:sidebar-open={sidebarOpen}
    class:notes-open={notesOpen}
>
    <!-- Sidebar Toggle Button -->
    <button
        bind:this={sidebarToggleEl}
        class="sidebar-toggle"
        onclick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={sidebarOpen}
        aria-controls="primary-sidebar"
    >
        {sidebarOpen ? "◀" : "▶"}
    </button>

    <button
        class="theme-toggle"
        onclick={toggleTheme}
        aria-label={theme === "light" ? "Pindah ke mode gelap" : "Pindah ke mode terang"}
        aria-pressed={theme === "dark"}
        title={theme === "light" ? "Mode terang" : "Mode gelap"}
    >
        {theme === "light" ? "☾" : "☀"}
    </button>

    {#if sidebarOpen}
        <button
            class="sidebar-backdrop"
            onclick={closeSidebar}
            aria-label="Tutup sidebar"
            tabindex="-1"
        ></button>
    {/if}

    <!-- Sidebar Navigation -->
    <aside
        bind:this={sidebarEl}
        id="primary-sidebar"
        class="sidebar"
        class:open={sidebarOpen}
        aria-hidden={!sidebarOpen}
        aria-label="Navigasi utama"
    >
        <Sidebar />
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
        <div class="notebook-page">
            <div class="margin-line"></div>
            {@render children()}
        </div>
    </main>

    <!-- Notes Panel (Right side) -->
    <NotesPanel bind:isOpen={notesOpen} onToggle={toggleNotes} />
</div>

<style>
    .app-container {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 280px;
        background: linear-gradient(
            180deg,
            var(--color-surface-muted) 0%,
            var(--color-surface-elevated) 50%,
            var(--color-surface-soft) 100%
        );
        color: var(--color-ink-strong);
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 100;
        box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
        border-right: 3px solid var(--color-binder);
    }

    .sidebar-backdrop {
        display: none;
        border: none;
        cursor: pointer;
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .main-content {
        flex: 1;
        margin-left: 0;
        margin-right: 0;
        transition:
            margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
    }

    /* Desktop behavior: Push content from both sides */
    @media (min-width: 769px) {
        .sidebar-open .main-content {
            margin-left: 280px;
        }

        .notes-open .main-content {
            margin-right: 320px;
        }
    }

    /* Toggle Button - Bookmark Style */
    .sidebar-toggle {
        position: fixed;
        top: 1.5rem;
        left: 0;
        z-index: 101;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        border: none;
        width: 48px;
        height: 48px;
        border-radius: 0 8px 8px 0;
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    .sidebar-toggle:hover {
        width: 56px;
        background: var(--color-binder);
    }

    .theme-toggle {
        position: fixed;
        top: 1.5rem;
        right: 3.6rem;
        z-index: 101;
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 9999px;
        background: var(--color-surface-elevated);
        color: var(--color-ink-strong);
        box-shadow: var(--shadow-md);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .theme-toggle:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-lg);
    }

    /* Move toggle button when sidebar is open */
    .sidebar-open .sidebar-toggle {
        left: 280px;
        border-radius: 0 8px 8px 0;
        background: #a0522d;
        opacity: 0.9;
    }

    .sidebar-open .sidebar-toggle:hover {
        background: var(--color-binder);
        opacity: 1;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            max-width: 280px;
        }

        /* On mobile, content is NOT pushed, sidebar is overlay */
        .sidebar-open .main-content {
            margin-left: 0;
        }

        .notes-open .main-content {
            margin-right: 0;
        }

        .sidebar-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
            border: none;
        }

        /* Toggle button stays visible or moves */
        .sidebar-open .sidebar-toggle {
            left: 240px;
        }

        .theme-toggle {
            right: 3.1rem;
        }
    }
</style>
