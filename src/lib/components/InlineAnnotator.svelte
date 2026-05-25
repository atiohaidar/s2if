<script lang="ts">
    import { page } from "$app/state";
    import { browser } from "$app/environment";
    import { beforeNavigate } from "$app/navigation";
    import { onMount, onDestroy } from "svelte";
    import { Copy, MessageSquarePlus, Palette, Trash2, PenLine, X } from "lucide-svelte";

    interface TextAnnotation {
        id: string;
        pagePath: string;
        selectedText: string;
        contextBefore: string;
        contextAfter: string;
        comment: string;
        color: 'yellow' | 'blue' | 'green' | 'purple' | 'red';
        createdAt: string;
        updatedAt: string;
    }

    type HighlightColor = TextAnnotation['color'];

    const CONTEXT_LEN = 32;
    const COLORS: HighlightColor[] = ['yellow', 'blue', 'green', 'purple', 'red'];
    const COLOR_LABELS: Record<HighlightColor, string> = {
        yellow: 'Kuning', blue: 'Biru', green: 'Hijau', purple: 'Ungu', red: 'Merah'
    };

    let annotations = $state<TextAnnotation[]>([]);
    let showToolbar = $state(false);
    let toolbarX = $state(0);
    let toolbarY = $state(0);
    let selectedText = $state("");
    let selectionRange: Range | null = null;

    // Comment popover state
    let showComment = $state(false);
    let commentX = $state(0);
    let commentY = $state(0);
    let commentText = $state("");
    let activeAnnotationId = $state<string | null>(null);
    let isEditingComment = $state(false);

    // Color picker sub-menu
    let showColorPicker = $state(false);

    const storageKey = $derived(`s2if-annotations:${page.url.pathname}`);

    function loadAnnotations() {
        if (!browser) return;
        try {
            const raw = localStorage.getItem(storageKey);
            annotations = raw ? JSON.parse(raw) : [];
        } catch { annotations = []; }
    }

    function saveAnnotations() {
        if (!browser) return;
        localStorage.setItem(storageKey, JSON.stringify(annotations));
    }

    function getArticleContainer(): HTMLElement | null {
        return document.querySelector('.note-article');
    }

    // --- Text node utilities ---
    function getTextNodes(container: HTMLElement): Text[] {
        const nodes: Text[] = [];
        const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
        let n: Node | null;
        while ((n = walk.nextNode())) nodes.push(n as Text);
        return nodes;
    }

    function buildFullText(textNodes: Text[]) {
        let full = "";
        const offsets: { node: Text; start: number; end: number }[] = [];
        for (const n of textNodes) {
            const s = full.length;
            full += n.nodeValue || "";
            offsets.push({ node: n, start: s, end: full.length });
        }
        return { full, offsets };
    }

    function findMatchIndex(fullText: string, ann: TextAnnotation): number {
        let idx = 0;
        while ((idx = fullText.indexOf(ann.selectedText, idx)) !== -1) {
            const before = fullText.slice(Math.max(0, idx - CONTEXT_LEN), idx);
            const after = fullText.slice(idx + ann.selectedText.length, idx + ann.selectedText.length + CONTEXT_LEN);
            if (before.endsWith(ann.contextBefore.slice(-Math.min(12, ann.contextBefore.length))) ||
                after.startsWith(ann.contextAfter.slice(0, Math.min(12, ann.contextAfter.length)))) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    }

    function wrapRange(offsets: { node: Text; start: number; end: number }[], startIdx: number, endIdx: number, ann: TextAnnotation) {
        // Collect nodes that overlap our range
        const targets: { node: Text; relStart: number; relEnd: number }[] = [];
        for (const o of offsets) {
            if (o.end <= startIdx || o.start >= endIdx) continue;
            targets.push({
                node: o.node,
                relStart: Math.max(0, startIdx - o.start),
                relEnd: Math.min(o.node.length, endIdx - o.start),
            });
        }
        // Wrap in reverse order to avoid offset shifts
        for (let i = targets.length - 1; i >= 0; i--) {
            const { node, relStart, relEnd } = targets[i];
            if (relStart >= relEnd || !node.parentNode) continue;
            const matchedNode = node.splitText(relStart);
            matchedNode.splitText(relEnd - relStart);
            const mark = document.createElement('mark');
            mark.className = `inline-highlight highlight-${ann.color}`;
            mark.dataset.annotationId = ann.id;
            if (ann.comment) mark.dataset.hasComment = "true";
            matchedNode.parentNode!.replaceChild(mark, matchedNode);
            mark.appendChild(matchedNode);
        }
    }

    function applyAllAnnotations() {
        const container = getArticleContainer();
        if (!container) return;

        const existingMarks = container.querySelectorAll('mark.inline-highlight');
        if (annotations.length === 0 && existingMarks.length === 0) {
            return;
        }

        // Remove existing marks first
        existingMarks.forEach(m => {
            const parent = m.parentNode;
            if (!parent) return;
            while (m.firstChild) parent.insertBefore(m.firstChild, m);
            parent.removeChild(m);
        });

        // Apply each annotation
        for (const ann of annotations) {
            const textNodes = getTextNodes(container);
            const { full, offsets } = buildFullText(textNodes);
            const idx = findMatchIndex(full, ann);
            if (idx === -1) continue;
            wrapRange(offsets, idx, idx + ann.selectedText.length, ann);
        }
    }

    // --- Selection toolbar ---
    function handleSelectionChange() {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !sel.toString().trim()) {
            // Small delay to allow clicks on toolbar
            setTimeout(() => {
                if (!showComment) showToolbar = false;
            }, 200);
            return;
        }
        const container = getArticleContainer();
        if (!container) return;
        const anchor = sel.anchorNode;
        if (!anchor || !container.contains(anchor)) return;

        selectedText = sel.toString().trim();
        selectionRange = sel.getRangeAt(0).cloneRange();
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        toolbarX = rect.left + rect.width / 2;
        toolbarY = rect.top - 8;
        showToolbar = true;
        showColorPicker = false;
    }

    function createHighlight(color: HighlightColor, withComment: boolean) {
        if (!selectionRange || !selectedText) return;
        const container = getArticleContainer();
        if (!container) return;

        // Build context
        const textNodes = getTextNodes(container);
        const { full } = buildFullText(textNodes);
        const idx = full.indexOf(selectedText);
        const ctxBefore = idx > 0 ? full.slice(Math.max(0, idx - CONTEXT_LEN), idx) : "";
        const ctxAfter = full.slice(idx + selectedText.length, idx + selectedText.length + CONTEXT_LEN);

        const ann: TextAnnotation = {
            id: `ann-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            pagePath: page.url.pathname,
            selectedText,
            contextBefore: ctxBefore,
            contextAfter: ctxAfter,
            comment: "",
            color,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        annotations = [...annotations, ann];
        saveAnnotations();
        window.getSelection()?.removeAllRanges();
        showToolbar = false;
        showColorPicker = false;
        applyAllAnnotations();

        if (withComment) {
            // Open comment editor for this new annotation
            setTimeout(() => openCommentForAnnotation(ann.id), 100);
        }
    }

    function copySelectedText() {
        if (selectedText) navigator.clipboard.writeText(selectedText);
        showToolbar = false;
    }

    // --- Comment popover ---
    function openCommentForAnnotation(annId: string) {
        const mark = document.querySelector(`mark[data-annotation-id="${annId}"]`);
        if (!mark) return;
        const rect = mark.getBoundingClientRect();
        commentX = rect.left + rect.width / 2;
        commentY = rect.bottom + 8;
        activeAnnotationId = annId;
        const ann = annotations.find(a => a.id === annId);
        commentText = ann?.comment || "";
        isEditingComment = !ann?.comment;
        showComment = true;
        showToolbar = false;
    }

    function saveComment() {
        if (!activeAnnotationId) return;
        annotations = annotations.map(a =>
            a.id === activeAnnotationId
                ? { ...a, comment: commentText.trim(), updatedAt: new Date().toISOString() }
                : a
        );
        saveAnnotations();
        isEditingComment = false;
        showComment = false;
        applyAllAnnotations();
    }

    function deleteAnnotation(annId: string) {
        annotations = annotations.filter(a => a.id !== annId);
        saveAnnotations();
        showComment = false;
        activeAnnotationId = null;
        applyAllAnnotations();
    }

    function changeAnnotationColor(annId: string, color: HighlightColor) {
        annotations = annotations.map(a =>
            a.id === annId ? { ...a, color, updatedAt: new Date().toISOString() } : a
        );
        saveAnnotations();
        applyAllAnnotations();
    }

    function handleArticleClick(e: MouseEvent) {
        const mark = (e.target as HTMLElement).closest('mark.inline-highlight') as HTMLElement | null;
        if (!mark) return;
        const annId = mark.dataset.annotationId;
        if (annId) {
            e.preventDefault();
            e.stopPropagation();
            openCommentForAnnotation(annId);
        }
    }

    function handleClickOutside(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (!document.documentElement.contains(target)) return;

        if (showComment && !target.closest('.ann-comment-popover') && !target.closest('mark.inline-highlight')) {
            showComment = false;
            activeAnnotationId = null;
            isEditingComment = false;
        }
        if (showToolbar && !target.closest('.ann-selection-toolbar')) {
            // Let handleSelectionChange deal with it
        }
    }

    let selectionTimer: ReturnType<typeof setTimeout>;

    function debouncedSelectionChange() {
        clearTimeout(selectionTimer);
        selectionTimer = setTimeout(handleSelectionChange, 150);
    }

    beforeNavigate(() => {
        const container = getArticleContainer();
        if (!container) return;

        container.querySelectorAll('mark.inline-highlight').forEach(m => {
            const parent = m.parentNode;
            if (!parent) return;
            while (m.firstChild) parent.insertBefore(m.firstChild, m);
            parent.removeChild(m);
        });
    });

    onMount(() => {
        loadAnnotations();
        requestAnimationFrame(() => applyAllAnnotations());

        document.addEventListener('selectionchange', debouncedSelectionChange);
        document.addEventListener('click', handleClickOutside);

        const container = getArticleContainer();
        if (container) {
            container.addEventListener('click', handleArticleClick);
        }

        return () => {
            document.removeEventListener('selectionchange', debouncedSelectionChange);
            document.removeEventListener('click', handleClickOutside);
            container?.removeEventListener('click', handleArticleClick);
        };
    });

    // Re-apply when page changes
    $effect(() => {
        if (!browser) return;
        const _key = storageKey; // react to page change
        loadAnnotations();
        requestAnimationFrame(() => applyAllAnnotations());
    });

    // Clamp popover positions to viewport
    function clampX(x: number, width: number): number {
        return Math.max(width / 2 + 8, Math.min(x, window.innerWidth - width / 2 - 8));
    }
    function clampY(y: number): number {
        return Math.max(8, y);
    }

    const activeAnn = $derived(annotations.find(a => a.id === activeAnnotationId));
</script>

<!-- Selection Toolbar (appears on text select) -->
{#if showToolbar}
    <div
        class="ann-selection-toolbar"
        style="left:{clampX(toolbarX, 200)}px; top:{clampY(toolbarY)}px;"
        role="toolbar"
        aria-label="Alat anotasi teks"
    >
        {#if showColorPicker}
            <div class="ann-color-row">
                {#each COLORS as c}
                    <button
                        class="ann-color-dot color-{c}"
                        title="Highlight {COLOR_LABELS[c]}"
                        onclick={() => createHighlight(c, false)}
                        aria-label="Highlight warna {COLOR_LABELS[c]}"
                    ></button>
                {/each}
            </div>
        {:else}
            <button class="ann-tool-btn" onclick={() => showColorPicker = true} title="Highlight teks">
                <Palette size={15} /> <span>Highlight</span>
            </button>
            <span class="ann-divider"></span>
            <button class="ann-tool-btn" onclick={() => createHighlight('yellow', true)} title="Highlight + tambah catatan">
                <MessageSquarePlus size={15} /> <span>Catatan</span>
            </button>
            <span class="ann-divider"></span>
            <button class="ann-tool-btn" onclick={copySelectedText} title="Salin teks">
                <Copy size={15} />
            </button>
        {/if}
    </div>
{/if}

<!-- Comment Popover (appears on highlight click) -->
{#if showComment && activeAnn}
    <div
        class="ann-comment-popover"
        style="left:{clampX(commentX, 300)}px; top:{commentY}px;"
        role="dialog"
        aria-label="Catatan tersemat"
    >
        <div class="ann-comment-header">
            <span class="ann-comment-quote">"{activeAnn.selectedText.length > 50 ? activeAnn.selectedText.slice(0, 50) + '…' : activeAnn.selectedText}"</span>
            <button class="ann-close-btn" onclick={() => { showComment = false; activeAnnotationId = null; }} aria-label="Tutup">
                <X size={14} />
            </button>
        </div>

        <!-- Color selector row -->
        <div class="ann-color-row compact">
            {#each COLORS as c}
                <button
                    class="ann-color-dot color-{c}"
                    class:active={activeAnn.color === c}
                    onclick={() => changeAnnotationColor(activeAnn.id, c)}
                    aria-label="Ubah ke warna {COLOR_LABELS[c]}"
                    title={COLOR_LABELS[c]}
                ></button>
            {/each}
        </div>

        {#if isEditingComment}
            <textarea
                class="ann-comment-input"
                bind:value={commentText}
                placeholder="Tulis catatan di sini..."
                rows="3"
                onkeydown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveComment(); }}
            ></textarea>
            <div class="ann-comment-actions">
                <span class="ann-hint">Ctrl+Enter untuk simpan</span>
                <div class="ann-actions-right">
                    <button class="ann-btn secondary" onclick={() => { isEditingComment = false; if (!activeAnn.comment) { showComment = false; } }}>Batal</button>
                    <button class="ann-btn primary" onclick={saveComment}>Simpan</button>
                </div>
            </div>
        {:else if activeAnn.comment}
            <p class="ann-comment-body">{activeAnn.comment}</p>
            <div class="ann-comment-actions">
                <span class="ann-comment-date">{new Date(activeAnn.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <div class="ann-actions-right">
                    <button class="ann-btn icon" onclick={() => { isEditingComment = true; commentText = activeAnn.comment; }} title="Edit catatan">
                        <PenLine size={13} />
                    </button>
                    <button class="ann-btn icon danger" onclick={() => deleteAnnotation(activeAnn.id)} title="Hapus highlight">
                        <Trash2 size={13} />
                    </button>
                </div>
            </div>
        {:else}
            <div class="ann-comment-actions no-comment">
                <button class="ann-btn secondary" onclick={() => { isEditingComment = true; commentText = ""; }}>
                    <MessageSquarePlus size={13} /> Tambah Catatan
                </button>
                <button class="ann-btn icon danger" onclick={() => deleteAnnotation(activeAnn.id)} title="Hapus highlight">
                    <Trash2 size={13} />
                </button>
            </div>
        {/if}
    </div>
{/if}

<style>
    /* === Selection Toolbar === */
    .ann-selection-toolbar {
        position: fixed;
        transform: translate(-50%, -100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 2px;
        background: var(--color-surface-elevated, #fff);
        border: 1px solid var(--color-line, #e0d6c8);
        border-radius: 10px;
        padding: 4px 6px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08);
        animation: ann-pop-in 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes ann-pop-in {
        from { opacity: 0; transform: translate(-50%, -100%) scale(0.9); }
        to   { opacity: 1; transform: translate(-50%, -100%) scale(1); }
    }

    .ann-tool-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 10px;
        border: none;
        background: none;
        color: var(--color-ink, #333);
        font-size: 0.8rem;
        font-family: var(--font-body, sans-serif);
        font-weight: 500;
        border-radius: 7px;
        cursor: pointer;
        transition: background 0.15s;
        white-space: nowrap;
    }
    .ann-tool-btn:hover { background: var(--color-surface-muted, #f0e8d8); }

    .ann-divider {
        width: 1px;
        height: 18px;
        background: var(--color-line, #ddd);
        margin: 0 2px;
    }

    /* === Color Picker Row === */
    .ann-color-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 6px;
    }
    .ann-color-row.compact {
        padding: 0 0 6px 0;
        border-bottom: 1px solid var(--color-line, #e8dcc8);
        margin-bottom: 6px;
    }

    .ann-color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        transition: transform 0.15s, border-color 0.15s;
        padding: 0;
    }
    .ann-color-dot:hover { transform: scale(1.2); }
    .ann-color-dot.active { border-color: var(--color-ink, #333); transform: scale(1.15); }
    .ann-color-dot.color-yellow { background: rgba(241, 196, 15, 0.7); }
    .ann-color-dot.color-blue   { background: rgba(52, 152, 219, 0.6); }
    .ann-color-dot.color-green  { background: rgba(39, 174, 96, 0.6); }
    .ann-color-dot.color-purple { background: rgba(155, 89, 182, 0.6); }
    .ann-color-dot.color-red    { background: rgba(231, 76, 60, 0.55); }

    /* === Comment Popover === */
    .ann-comment-popover {
        position: fixed;
        transform: translateX(-50%);
        z-index: 9999;
        width: 300px;
        max-width: calc(100vw - 32px);
        background: var(--color-surface-elevated, #fff);
        border: 1px solid var(--color-line, #e0d6c8);
        border-radius: 12px;
        padding: 12px 14px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08);
        animation: ann-pop-in 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-family: var(--font-body, sans-serif);
    }

    .ann-comment-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
    }

    .ann-comment-quote {
        font-size: 0.78rem;
        color: var(--color-ink-muted, #6d4c41);
        font-style: italic;
        line-height: 1.4;
        flex: 1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .ann-close-btn {
        border: none;
        background: none;
        color: var(--color-ink-soft, #999);
        cursor: pointer;
        padding: 2px;
        border-radius: 4px;
        display: flex;
        flex-shrink: 0;
    }
    .ann-close-btn:hover { color: var(--color-ink, #333); background: var(--color-surface-muted, #f0e8d8); }

    .ann-comment-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--color-line, #ddd);
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 0.85rem;
        font-family: var(--font-body, sans-serif);
        resize: vertical;
        min-height: 60px;
        background: var(--color-surface-soft, #faf7f0);
        color: var(--color-ink, #333);
        line-height: 1.5;
    }
    .ann-comment-input:focus {
        outline: none;
        border-color: var(--color-binder, #8b4513);
        box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.15);
    }

    .ann-comment-body {
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--color-ink, #333);
        margin: 0 0 8px 0;
        white-space: pre-wrap;
        max-height: 250px;
        overflow-y: auto;
        padding-right: 4px;
    }
    .ann-comment-body::-webkit-scrollbar {
        width: 4px;
    }
    .ann-comment-body::-webkit-scrollbar-thumb {
        background: var(--color-line, #ddd);
        border-radius: 4px;
    }

    .ann-comment-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: 8px;
    }
    .ann-comment-actions.no-comment {
        margin-top: 4px;
        justify-content: flex-start;
    }

    .ann-actions-right {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .ann-hint {
        font-size: 0.7rem;
        color: var(--color-ink-soft, #999);
    }

    .ann-comment-date {
        font-size: 0.7rem;
        color: var(--color-ink-soft, #999);
    }

    .ann-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.78rem;
        font-family: var(--font-body, sans-serif);
        font-weight: 500;
        transition: background 0.15s, color 0.15s;
    }
    .ann-btn.primary {
        background: var(--color-binder, #8b4513);
        color: #fff;
        padding: 5px 14px;
    }
    .ann-btn.primary:hover { background: #6d3710; }

    .ann-btn.secondary {
        background: var(--color-surface-muted, #f0e8d8);
        color: var(--color-ink, #333);
        padding: 5px 12px;
    }
    .ann-btn.secondary:hover { background: var(--color-line, #e8dcc8); }

    .ann-btn.icon {
        background: none;
        padding: 4px 6px;
        color: var(--color-ink-soft, #999);
    }
    .ann-btn.icon:hover { background: var(--color-surface-muted, #f0e8d8); color: var(--color-ink, #333); }
    .ann-btn.icon.danger:hover { color: #e74c3c; background: rgba(231,76,60,0.08); }
</style>
