<script lang="ts">
    import type { Semester } from "$lib/data/curriculum";
    import { curriculum } from "$lib/data/curriculum";
</script>

<div class="sidebar-content">
    <!-- Logo/Title -->
    <div class="sidebar-header">
        <h1 class="title">📓 S2IF</h1>
        <p class="subtitle">Digital Notebook</p>
    </div>

    <!-- Navigation -->
    <nav class="nav">
        <a href="/" class="nav-item home">
            <span class="icon">🏠</span>
            <span>Beranda</span>
        </a>

        {#each curriculum as semester}
            <div class="semester-group">
                <h3 class="semester-title">
                    <span class="icon">📅</span>
                    {semester.name}
                </h3>

                <ul class="subject-list">
                    {#each semester.subjects as subject}
                        <li>
                            <a
                                href="/{semester.id}/{subject.id}"
                                class="nav-item"
                            >
                                <span class="icon">{subject.icon}</span>
                                <span>{subject.name}</span>
                                {#if subject.status}
                                    <span class="status-dot {subject.status}"
                                    ></span>
                                {/if}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
        <p>Made with ❤️ for learning</p>
    </div>
</div>

<style>
    .sidebar-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1.5rem;
    }

    .sidebar-header {
        text-align: center;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 1rem;
    }

    .title {
        font-family: var(--font-handwriting);
        font-size: 2rem;
        margin: 0;
        background: linear-gradient(135deg, #f1c40f 0%, #e74c3c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .subtitle {
        font-size: 0.875rem;
        opacity: 0.7;
        margin: 0.25rem 0 0;
    }

    .nav {
        flex: 1;
        overflow-y: auto;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.2s;
        font-size: 0.9rem;
    }

    .nav-item:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    .nav-item.home {
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 1rem;
    }

    .semester-group {
        margin-bottom: 1.5rem;
    }

    .semester-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.5);
        padding: 0.5rem 1rem;
        margin: 0;
    }

    .subject-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .subject-list li {
        margin: 0.25rem 0;
    }

    .icon {
        font-size: 1.1rem;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-left: auto;
    }

    .status-dot.done {
        background: #27ae60;
    }

    .status-dot.wip {
        background: #f39c12;
    }

    .status-dot.todo {
        background: #95a5a6;
    }

    .sidebar-footer {
        text-align: center;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.75rem;
        opacity: 0.5;
    }

    .sidebar-footer p {
        margin: 0;
    }
</style>
