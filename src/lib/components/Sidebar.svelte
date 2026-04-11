<script lang="ts">
    import { curriculum } from "$lib/data/content";
    import { STATUS_LABELS } from "$lib/data/constants";
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import { browser } from "$app/environment";
    import { onDestroy, tick } from "svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

    interface OutlineItem {
        id: string;
        text: string;
        level: 2 | 3;
    }

    const semesterStorageKey = "s2if-sidebar-semester-open";

    let semesterOpenMap = $state<Record<string, boolean>>({});
    let outlineItems = $state<OutlineItem[]>([]);
    let activeOutlineId = $state("");
    let outlineCollapsed = $state(false);
    let outlineObserver: IntersectionObserver | null = null;

    const pathSegments = $derived.by(() => {
        const withoutBase = base && page.url.pathname.startsWith(base)
            ? page.url.pathname.slice(base.length)
            : page.url.pathname;

        return withoutBase
            .split("/")
            .map((segment) => segment.trim())
            .filter(Boolean);
    });

    const showOutline = $derived(pathSegments.length >= 3 && outlineItems.length > 0);

    // Check if current path matches
    function isActive(path: string): boolean {
        const currentPath = page.url.pathname;
        const fullPath = base + path;
        return (
            currentPath === fullPath || currentPath.startsWith(fullPath + "/")
        );
    }

    function isSemesterOpen(semesterId: string): boolean {
        if (semesterId in semesterOpenMap) {
            return semesterOpenMap[semesterId];
        }

        const currentSemesterId = pathSegments[0] ?? "";
        return semesterId === currentSemesterId;
    }

    function toggleSemester(semesterId: string): void {
        semesterOpenMap = {
            ...semesterOpenMap,
            [semesterId]: !isSemesterOpen(semesterId),
        };

        if (browser) {
            localStorage.setItem(semesterStorageKey, JSON.stringify(semesterOpenMap));
        }
    }

    function getDefaultSemesterOpenMap(): Record<string, boolean> {
        const currentSemesterId = pathSegments[0] ?? "";
        const nextState: Record<string, boolean> = {};

        for (const semester of curriculum) {
            nextState[semester.id] = semester.id === currentSemesterId;
        }

        return nextState;
    }

    function sanitizeSemesterOpenMap(raw: unknown): Record<string, boolean> {
        const defaults = getDefaultSemesterOpenMap();
        if (!raw || typeof raw !== "object") {
            return defaults;
        }

        const candidate = raw as Record<string, unknown>;
        const nextState: Record<string, boolean> = { ...defaults };

        for (const semester of curriculum) {
            const value = candidate[semester.id];
            if (typeof value === "boolean") {
                nextState[semester.id] = value;
            }
        }

        return nextState;
    }

    function slugify(value: string): string {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-") || "section";
    }

    function assignUniqueId(el: HTMLElement, text: string, usedIds: Set<string>): string {
        const preferred = el.id || slugify(text);
        let candidate = preferred;
        let suffix = 2;

        while (true) {
            const existing = document.getElementById(candidate);
            if (!usedIds.has(candidate) && (!existing || existing === el)) {
                break;
            }

            candidate = `${preferred}-${suffix}`;
            suffix += 1;
        }

        el.id = candidate;
        usedIds.add(candidate);
        return candidate;
    }

    function updateActiveFromScroll(): void {
        if (!browser || outlineItems.length === 0) {
            return;
        }

        let currentId = outlineItems[0]?.id ?? "";

        for (const item of outlineItems) {
            const heading = document.getElementById(item.id);
            if (!heading) {
                continue;
            }

            if (heading.getBoundingClientRect().top <= 140) {
                currentId = item.id;
            }
        }

        activeOutlineId = currentId;
    }

    function setupOutlineObserver(): void {
        outlineObserver?.disconnect();
        outlineObserver = null;

        if (!browser || outlineItems.length === 0) {
            return;
        }

        outlineObserver = new IntersectionObserver(
            () => {
                updateActiveFromScroll();
            },
            {
                root: null,
                rootMargin: "-90px 0px -60% 0px",
                threshold: [0, 1],
            },
        );

        for (const item of outlineItems) {
            const heading = document.getElementById(item.id);
            if (heading) {
                outlineObserver.observe(heading);
            }
        }

        updateActiveFromScroll();
    }

    async function rebuildOutline(): Promise<void> {
        if (!browser || pathSegments.length < 3) {
            outlineItems = [];
            activeOutlineId = "";
            outlineObserver?.disconnect();
            outlineObserver = null;
            return;
        }

        await tick();

        const contentRoot = document.querySelector(".main-content .notebook-page");
        if (!contentRoot) {
            outlineItems = [];
            activeOutlineId = "";
            return;
        }

        const headings = Array.from(
            contentRoot.querySelectorAll<HTMLElement>("h2.section-title, .note-section h3"),
        );

        const usedIds = new Set<string>();
        const nextItems: OutlineItem[] = [];

        for (const heading of headings) {
            const text = heading.textContent?.trim() ?? "";
            if (!text) {
                continue;
            }

            const id = assignUniqueId(heading, text, usedIds);
            const level = heading.matches("h2.section-title") ? 2 : 3;

            nextItems.push({ id, text, level });
        }

        outlineItems = nextItems;
        const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
        activeOutlineId = nextItems.some((item) => item.id === hashId)
            ? hashId
            : nextItems[0]?.id ?? "";
        setupOutlineObserver();
    }

    $effect(() => {
        if (!browser) {
            return;
        }

        const stored = localStorage.getItem(semesterStorageKey);
        if (!stored) {
            semesterOpenMap = getDefaultSemesterOpenMap();
            return;
        }

        try {
            const parsed = JSON.parse(stored) as Record<string, boolean>;
            semesterOpenMap = sanitizeSemesterOpenMap(parsed);
        } catch {
            semesterOpenMap = getDefaultSemesterOpenMap();
        }
    });

    $effect(() => {
        page.url.pathname;
        if (!browser) {
            return;
        }

        void rebuildOutline();
    });

    onDestroy(() => {
        outlineObserver?.disconnect();
    });
</script>

<div class="sidebar-content">
    <!-- Logo/Title -->
    <div class="sidebar-header">
        <div class="logo-icon"><ThemeIcon name="notebook" size={28} /></div>
        <h1 class="title">S2IF</h1>
        <p class="subtitle">My Catatan Ku</p>
    </div>

    <!-- Navigation -->
    <nav class="nav" aria-label="Daftar semester dan mata kuliah">
        <a
            href="{base}/"
            class="nav-item home"
            class:active={page.url.pathname === base + "/" ||
                page.url.pathname === base}
            title="Beranda"
        >
            <span class="icon"><ThemeIcon name="home" size={18} /></span>
            <span class="label" title="Beranda">Beranda</span>
        </a>

        {#if showOutline}
            <div class="outline-group">
                <button
                    type="button"
                    class="outline-toggle"
                    onclick={() => (outlineCollapsed = !outlineCollapsed)}
                    aria-expanded={!outlineCollapsed}
                >
                    <span class="outline-chevron">{outlineCollapsed ? "▸" : "▾"}</span>
                    <span class="outline-title">Outline Materi</span>
                </button>

                {#if !outlineCollapsed}
                    <ul class="outline-list">
                        {#each outlineItems as item}
                            <li>
                                <a
                                    href={`#${item.id}`}
                                    class="outline-item"
                                    class:subheading={item.level === 3}
                                    class:active={activeOutlineId === item.id}
                                    title={item.text}
                                    onclick={() => {
                                        activeOutlineId = item.id;
                                    }}
                                >
                                    {item.text}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        {/if}

        {#each curriculum as semester}
            <div class="semester-group">
                <button
                    type="button"
                    class="semester-header"
                    onclick={() => toggleSemester(semester.id)}
                    aria-expanded={isSemesterOpen(semester.id)}
                    title={semester.name}
                >
                    <span class="semester-chevron">{isSemesterOpen(semester.id) ? "▾" : "▸"}</span>
                    <span class="semester-icon"><ThemeIcon name="semester" size={16} /></span>
                    <h3 class="semester-title">{semester.name}</h3>
                </button>

                {#if isSemesterOpen(semester.id)}
                    <ul class="subject-list">
                        {#each semester.subjects as subject}
                            {@const subjectPath = `/${semester.id}/${subject.id}`}
                            <li>
                                <a
                                    href="{base}{subjectPath}"
                                    class="nav-item subject"
                                    class:active={isActive(subjectPath)}
                                    title={subject.name}
                                >
                                    <span class="icon">
                                        <ThemeIcon name={subject.icon} size={18} />
                                    </span>
                                    <span class="label" title={subject.name}>{subject.name}</span>
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
                {/if}
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
            rgba(241, 196, 15, 0.45),
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
            var(--color-binder) 0%,
            #a0522d 50%,
            var(--color-ink-muted) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
        letter-spacing: 0.02em;
    }

    .subtitle {
        font-size: 0.8rem;
        color: var(--color-ink-muted);
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
        color: var(--color-ink-strong);
        text-decoration: none;
        border-radius: 10px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 0.925rem;
        position: relative;
        margin-bottom: 0.25rem;
    }

    .nav-item:hover {
        background: rgba(139, 69, 19, 0.15);
        color: var(--color-ink-strong);
        transform: translateX(4px);
    }

    .nav-item.active {
        background: var(--color-surface-elevated);
        color: var(--color-binder);
        font-weight: 600;
        box-shadow: inset 0 0 0 2px var(--color-binder);
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
        background: var(--color-surface-soft);
        margin-bottom: 1.25rem;
        border: 1px solid rgba(139, 69, 19, 0.2);
    }

    .nav-item.home:hover {
        background: var(--color-surface-elevated);
        border-color: rgba(139, 69, 19, 0.3);
    }

    /* ===== Semester Group ===== */
    .semester-group {
        margin-bottom: 1.25rem;
    }

    .outline-group {
        margin-bottom: 1.25rem;
        padding: 0.5rem 0.5rem 0.375rem;
        border: 1px solid rgba(139, 69, 19, 0.2);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.35);
    }

    .outline-toggle {
        width: 100%;
        border: none;
        background: transparent;
        color: var(--color-binder);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        cursor: pointer;
        padding: 0.35rem 0.25rem 0.5rem;
        text-align: left;
    }


    .outline-chevron,
    .semester-chevron {
        width: 0.9rem;
        text-align: center;
        color: var(--color-ink-muted);
        font-size: 0.8rem;
        flex-shrink: 0;
    }

    .outline-list {
        list-style: none;
        margin: 0;
        padding: 0.125rem 0;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        max-height: 300px;
        overflow-y: auto;
    }

    .outline-list li {
        margin: 0;
    }

    .outline-item {
        display: block;
        color: var(--color-ink-strong);
        text-decoration: none;
        font-size: 0.84rem;
        line-height: 1.35;
        padding: 0.38rem 0.55rem;
        border-radius: 8px;
        border-left: 2px solid transparent;
        transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .outline-item:hover {
        background: rgba(139, 69, 19, 0.12);
    }

    .outline-item.active {
        background: var(--color-surface-elevated);
        border-left-color: var(--color-binder);
        color: var(--color-binder);
        font-weight: 600;
    }

    .outline-item.subheading {
        margin-left: 0.75rem;
        font-size: 0.79rem;
        opacity: 0.9;
    }

    .semester-header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.625rem 0.75rem;
        margin-bottom: 0.375rem;
        width: 100%;
        border: none;
        background: transparent;
        cursor: pointer;
        text-align: left;
        border-radius: 8px;
        transition: background-color 0.2s ease;
    }

    .semester-header:hover {
        background: rgba(139, 69, 19, 0.08);
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
        color: var(--color-binder);
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
        color: var(--color-ink-soft);
    }

    .footer-divider {
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 69, 19, 0.12),
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
