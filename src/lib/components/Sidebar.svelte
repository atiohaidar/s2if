<script lang="ts">
    import type { Semester } from "$lib/data/curriculum";
    import { curriculum } from "$lib/data/curriculum";
    import { STATUS_LABELS } from "$lib/data/constants";
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    // Check if current path matches
    function isActive(path: string): boolean {
        const currentPath = page.url.pathname;
        const fullPath = base + path;
        return (
            currentPath === fullPath || currentPath.startsWith(fullPath + "/")
        );
    }
</script>

<div class="sidebar-content">
    <!-- Logo/Title -->
    <div class="sidebar-header">
        <div class="logo-icon"><ThemeIcon name="notebook" size={28} /></div>
        <h1 class="title">S2IF</h1>
        <p class="subtitle">Digital Notebook</p>
    </div>

    <!-- Navigation -->
    <nav class="nav">
        <a
            href="{base}/"
            class="nav-item home"
            class:active={page.url.pathname === base + "/" ||
                page.url.pathname === base}
        >
            <span class="icon"><ThemeIcon name="home" size={18} /></span>
            <span class="label">Beranda</span>
        </a>

        {#each curriculum as semester}
            <div class="semester-group">
                <div class="semester-header">
                    <span class="semester-icon"><ThemeIcon name="semester" size={16} /></span>
                    <h3 class="semester-title">{semester.name}</h3>
                </div>

                <ul class="subject-list">
                    {#each semester.subjects as subject}
                        {@const subjectPath = `/${semester.id}/${subject.id}`}
                        <li>
                            <a
                                href="{base}{subjectPath}"
                                class="nav-item subject"
                                class:active={isActive(subjectPath)}
                            >
                                <span class="icon">
                                    <ThemeIcon name={subject.icon} size={18} />
                                </span>
                                <span class="label">{subject.name}</span>
                                {#if subject.status}
                                    <span
                                        class="status-indicator {subject.status}"
                                        title={STATUS_LABELS[subject.status] ||
                                            "Belum Mulai"}
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
        <div class="footer-divider"></div>
        <p>Semoga Bermanfaat</p>
    </div>
</div>

<style>
    .sidebar-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1.25rem;
    }

    /* ===== Header ===== */
    .sidebar-header {
        text-align: center;
        padding: 1rem 0 1.5rem;
        margin-bottom: 0.5rem;
        position: relative;
    }

    .sidebar-header::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 20%;
        right: 20%;
        height: 2px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(241, 196, 15, 0.5),
            transparent
        );
    }

    .logo-icon {
        font-size: 2.5rem;
        margin-bottom: 0.25rem;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    .title {
        font-family: var(--font-handwriting);
        font-size: 2.25rem;
        margin: 0;
        background: linear-gradient(
            135deg,
            #8b4513 0%,
            #a0522d 50%,
            #6d4c41 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
        letter-spacing: 0.02em;
    }

    .subtitle {
        font-size: 0.8rem;
        color: #6d4c41;
        margin: 0.375rem 0 0;
        font-weight: 500;
        letter-spacing: 0.05em;
    }

    /* ===== Navigation ===== */
    .nav {
        flex: 1;
        overflow-y: auto;
        padding-right: 0.25rem;
    }

    .nav::-webkit-scrollbar {
        width: 4px;
    }

    .nav::-webkit-scrollbar-thumb {
        background: rgba(139, 69, 19, 0.3);
        border-radius: 2px;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        padding: 0.875rem 1rem;
        color: #5d4037;
        text-decoration: none;
        border-radius: 10px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 0.925rem;
        position: relative;
        margin-bottom: 0.25rem;
    }

    .nav-item:hover {
        background: rgba(139, 69, 19, 0.15);
        color: #3d2b1f;
        transform: translateX(4px);
    }

    .nav-item.active {
        background: rgba(255, 255, 255, 0.5);
        color: #8b4513;
        font-weight: 600;
        box-shadow: inset 0 0 0 2px #8b4513;
    }

    .nav-item.active::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background: linear-gradient(135deg, #8b4513, #a0522d);
        border-radius: 0 2px 2px 0;
    }

    .nav-item.home {
        background: rgba(255, 255, 255, 0.3);
        margin-bottom: 1.25rem;
        border: 1px solid rgba(139, 69, 19, 0.2);
    }

    .nav-item.home:hover {
        background: rgba(255, 255, 255, 0.5);
        border-color: rgba(139, 69, 19, 0.3);
    }

    /* ===== Semester Group ===== */
    .semester-group {
        margin-bottom: 1.25rem;
    }

    .semester-header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.625rem 0.75rem;
        margin-bottom: 0.375rem;
    }

    .semester-icon {
        font-size: 1rem;
        opacity: 0.7;
    }

    .semester-title {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #8b4513;
        margin: 0;
        font-family: var(--font-body);
    }

    .subject-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .subject-list li {
        margin: 0.125rem 0;
    }

    /* ===== Icons ===== */
    .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        text-align: center;
        flex-shrink: 0;
    }

    .label {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* ===== Status Indicator ===== */
    .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s ease;
    }

    .nav-item:hover .status-indicator {
        transform: scale(1.2);
    }

    .status-indicator.done {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        box-shadow: 0 0 6px rgba(39, 174, 96, 0.5);
    }

    .status-indicator.wip {
        background: linear-gradient(135deg, #e67e22, #f39c12);
        box-shadow: 0 0 6px rgba(243, 156, 18, 0.5);
        animation: pulse-wip 2s ease-in-out infinite;
    }

    .status-indicator.todo {
        background: linear-gradient(135deg, #7f8c8d, #95a5a6);
    }

    @keyframes pulse-wip {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
    }

    /* ===== Footer ===== */
    .sidebar-footer {
        text-align: center;
        padding-top: 1rem;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
    }

    .footer-divider {
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        margin-bottom: 1rem;
    }

    .sidebar-footer p {
        margin: 0;
    }

    .heart {
        display: inline-block;
        animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
</style>
