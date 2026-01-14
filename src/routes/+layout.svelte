<script lang="ts">
    import "../app.css";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import { page } from "$app/state";

    let { children } = $props();

    // Default to closed on mobile, open on desktop
    // (Check window existence for safety, though ssr=false makes it available)
    let sidebarOpen = $state(
        typeof window !== "undefined" ? window.innerWidth > 768 : false,
    );

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
</script>

<div class="app-container" class:sidebar-open={sidebarOpen}>
    <!-- Sidebar Toggle Button (Mobile) -->
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
        background: linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%);
        color: white;
        overflow-y: auto;
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 100;
        box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .main-content {
        flex: 1;
        margin-left: 0;
        transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
    }

    /* Desktop behavior: Push content */
    @media (min-width: 769px) {
        .sidebar-open .main-content {
            margin-left: 280px;
        }
    }

    /* Toggle Button - Bookmark Style */
    .sidebar-toggle {
        position: fixed;
        top: 1.5rem;
        left: 0; /* Sticks to the edge */
        z-index: 101;
        background: var(--color-accent); /* Red bookmark */
        color: white;
        border: none;
        width: 48px;
        height: 48px;
        border-radius: 0 8px 8px 0; /* Rounded right side only */
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    .sidebar-toggle:hover {
        width: 56px; /* Pops out on hover */
        background: #c0392b;
    }

    /* Move toggle button when sidebar is open */
    .sidebar-open .sidebar-toggle {
        left: 280px; /* Sticks to the right edge of sidebar */
        border-radius: 0 8px 8px 0;
        background: #2c3e50; /* Match sidebar color when open */
        opacity: 0.8;
    }

    .sidebar-open .sidebar-toggle:hover {
        background: #34495e;
        opacity: 1;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .sidebar {
            width: 100%;
            max-width: 280px; /* Sidebar width on mobile */
        }

        /* On mobile, content is NOT pushed, sidebar is overlay */
        .sidebar-open .main-content {
            margin-left: 0;
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
            left: 240px; /* Inside the sidebar area roughly */
        }
    }
</style>
