<script lang="ts">
    import "../app.css";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import NotesPanel from "$lib/components/NotesPanel.svelte";
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";

    let { children } = $props();
    const sidebarDesktopKey = "s2if-sidebar-open-desktop";
    const sidebarMobileKey = "s2if-sidebar-open-mobile";

    // Start closed to avoid hydration mismatch, then check on mount
    let sidebarOpen = $state(false);
    let notesOpen = $state(false);
    let theme = $state<"light" | "dark">("light");
    let mounted = $state(false);
    let previousSidebarOpen = false;
    let sidebarToggleEl: HTMLButtonElement | null = null;
    let sidebarEl: HTMLElement | null = null;
    let mainContentEl: HTMLElement | null = null;
    let detachKeydownListener: (() => void) | null = null;
    let detachResizeListener: (() => void) | null = null;

    function isDesktopViewport(): boolean {
        return window.innerWidth > 768;
    }

    function getSidebarStorageKey(isDesktop: boolean): string {
        return isDesktop ? sidebarDesktopKey : sidebarMobileKey;
    }

    function getDefaultSidebarState(isDesktop: boolean): boolean {
        return isDesktop;
    }

    function readStoredSidebarState(isDesktop: boolean): boolean {
        if (!browser) {
            return getDefaultSidebarState(isDesktop);
        }

        const raw = localStorage.getItem(getSidebarStorageKey(isDesktop));
        if (raw === "true") {
            return true;
        }

        if (raw === "false") {
            return false;
        }

        return getDefaultSidebarState(isDesktop);
    }

    function setSidebarOpen(next: boolean): void {
        sidebarOpen = next;

        if (!browser) {
            return;
        }

        localStorage.setItem(getSidebarStorageKey(isDesktopViewport()), String(next));
    }

    function getFocusableElements(container: HTMLElement): HTMLElement[] {
        return Array.from(
            container.querySelectorAll<HTMLElement>(
                "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])",
            ),
        ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
    }

    function trapFocusInSidebar(event: KeyboardEvent): void {
        if (!sidebarOpen || !sidebarEl || isDesktopViewport()) {
            return;
        }

        const focusable = getFocusableElements(sidebarEl);
        if (focusable.length === 0) {
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
            return;
        }

        if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        }
    }

    onMount(() => {
        const storedTheme = browser ? localStorage.getItem("s2if-theme") : null;
        theme = storedTheme === "dark" ? "dark" : "light";
        document.documentElement.dataset.theme = theme;

        // Only check window size after mount (client-side only)
        let wasDesktop = isDesktopViewport();
        sidebarOpen = readStoredSidebarState(wasDesktop);
        mounted = true;

        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === "Tab") {
                trapFocusInSidebar(event);
                return;
            }

            // Shortcut Buka/Tutup Sidebar (Ctrl + B)
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
                event.preventDefault();
                toggleSidebar();
                return;
            }

            // Shortcut Buka/Tutup Catatan Pribadi (Ctrl + .)
            if ((event.ctrlKey || event.metaKey) && event.key === ".") {
                event.preventDefault();
                toggleNotes();
                return;
            }

            if (event.key !== "Escape" || event.defaultPrevented) {
                return;
            }

            const target = event.target as HTMLElement | null;
            if (target?.closest("input, textarea, select, [contenteditable='true']")) {
                return;
            }

            if (!notesOpen && !sidebarOpen) {
                return;
            }

            if (notesOpen) {
                notesOpen = false;
            }

            if (sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        const handleResize = () => {
            const isDesktop = isDesktopViewport();
            if (isDesktop === wasDesktop) {
                return;
            }

            sidebarOpen = readStoredSidebarState(isDesktop);
            wasDesktop = isDesktop;
        };

        document.addEventListener("keydown", handleKeydown);
        window.addEventListener("resize", handleResize);
        detachKeydownListener = () => {
            document.removeEventListener("keydown", handleKeydown);
        };
        detachResizeListener = () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    onDestroy(() => {
        detachKeydownListener?.();
        detachResizeListener?.();
    });

    $effect(() => {
        if (!mounted || !mainContentEl) {
            return;
        }

        if (sidebarOpen && !isDesktopViewport()) {
            mainContentEl.setAttribute("inert", "");
            return;
        }

        mainContentEl.removeAttribute("inert");
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
        setSidebarOpen(!sidebarOpen);
    }

    function closeSidebar() {
        setSidebarOpen(false);
    }

    function handleSidebarClick(event: MouseEvent): void {
        if (isDesktopViewport()) {
            return;
        }

        const target = event.target as HTMLElement | null;
        if (!target?.closest("a[href]")) {
            return;
        }

        setSidebarOpen(false);
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
        <span class="sidebar-toggle-icon" aria-hidden="true">{sidebarOpen ? "◀" : "▶"}</span>
        <span class="sidebar-toggle-label">{sidebarOpen ? "Tutup" : "Navigasi"}</span>
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
        inert={!sidebarOpen}
        aria-label="Navigasi utama"
        onclick={handleSidebarClick}
    >
        <Sidebar theme={theme} onToggleTheme={toggleTheme} />
    </aside>

    <!-- Main Content Area -->
    <main bind:this={mainContentEl} class="main-content">
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
        gap: 0.45rem;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    .sidebar-toggle:hover,
    .sidebar-toggle:focus-visible {
        width: 116px;
        background: var(--color-binder);
    }

    .sidebar-toggle-icon {
        font-size: 1.25rem;
        line-height: 1;
    }

    .sidebar-toggle-label {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        white-space: nowrap;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-width 0.2s ease, opacity 0.2s ease;
    }

    .sidebar-toggle:hover .sidebar-toggle-label,
    .sidebar-toggle:focus-visible .sidebar-toggle-label {
        max-width: 72px;
        opacity: 1;
    }

    /* Move toggle button when sidebar is open */
    .sidebar-open .sidebar-toggle {
        left: 280px;
        border-radius: 0 8px 8px 0;
        background: #a0522d;
        opacity: 0.9;
        width: 48px;
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
            width: 48px;
        }

        .sidebar-toggle:hover {
            width: 48px;
        }

        .sidebar-toggle-label {
            display: none;
        }
    }
</style>
