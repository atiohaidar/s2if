<script lang="ts">
    import "../app.css";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import NotesPanel from "$lib/components/NotesPanel.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    // Start closed to avoid hydration mismatch, then check on mount
    let sidebarOpen = $state(false);
    let notesOpen = $state(false);
    let mounted = $state(false);

    onMount(() => {
        // Only check window size after mount (client-side only)
        sidebarOpen = window.innerWidth > 768;
        mounted = true;
    });

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    function toggleNotes() {
        notesOpen = !notesOpen;
    }
</script>

<div
    class="app-container"
    class:sidebar-open={sidebarOpen}
    class:notes-open={notesOpen}
>
    <!-- Sidebar Toggle Button -->
    <button
        class="sidebar-toggle"
        onclick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
    >
        {sidebarOpen ? "◀" : "▶"}
    </button>

    <!-- Sidebar Navigation -->
    <aside class="sidebar" class:open={sidebarOpen}>
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
            #d4b896 0%,
            #c4a882 50%,
            #b89b6a 100%
        );
        color: #3d2b1f;
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 100;
        box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
        border-right: 3px solid #8b4513;
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
        background: #8b4513;
        color: white;
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
        background: #6d3710;
    }

    /* Move toggle button when sidebar is open */
    .sidebar-open .sidebar-toggle {
        left: 280px;
        border-radius: 0 8px 8px 0;
        background: #a0522d;
        opacity: 0.9;
    }

    .sidebar-open .sidebar-toggle:hover {
        background: #8b4513;
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

        /* Dim background when sidebar is open on mobile */
        .sidebar-open::after {
            content: "";
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
        }

        /* Toggle button stays visible or moves */
        .sidebar-open .sidebar-toggle {
            left: 240px;
        }
    }
</style>
