<script lang="ts">
    import { page } from "$app/state";
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
    import { EditorState, Compartment } from "@codemirror/state";
    import {
        EditorView,
        drawSelection,
        dropCursor,
        highlightActiveLine,
        highlightActiveLineGutter,
        highlightSpecialChars,
        keymap,
        lineNumbers,
        rectangularSelection,
        ViewUpdate,
    } from "@codemirror/view";
    import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
    import { defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
    import { markdown } from "@codemirror/lang-markdown";
    import { javascript } from "@codemirror/lang-javascript";
    import { python } from "@codemirror/lang-python";
    import { json } from "@codemirror/lang-json";

    interface Props {
        isOpen?: boolean;
        onToggle?: () => void;
    }

    let { isOpen = $bindable(false), onToggle }: Props = $props();

    let notes = $state("");
    let isSaving = $state(false);
    let lastSaved = $state<Date | null>(null);
    let feedback = $state("");
    let feedbackTone = $state<"info" | "success" | "error">("info");
    let previousOpen = false;
    let toggleButtonEl: HTMLButtonElement | null = null;
    let editorHostEl: HTMLDivElement | null = null;
    let importInputEl: HTMLInputElement | null = null;
    let editorView: EditorView | null = null;
    let isFullscreen = $state(false);
    let editorMode = $state<"notes" | "code">("notes");
    let codeLanguage = $state<"markdown" | "javascript" | "typescript" | "python" | "json">("javascript");
    let prefsLoaded = $state(false);
    let typingStamps = $state<number[]>([]);
    let typingMeterTick = $state(0);

    const languageCompartment = new Compartment();

    // Get storage key based on current page path
    const storageKey = $derived(`s2if-notes:${page.url.pathname}`);
    const modeKey = $derived(`s2if-notes-mode:${page.url.pathname}`);
    const languageKey = $derived(`s2if-notes-language:${page.url.pathname}`);
    const panelId = $derived(`notes-panel-${page.url.pathname.replace(/[^a-zA-Z0-9]+/g, "-")}`);
    const typingRate = $derived.by(() => {
        typingMeterTick;

        const now = Date.now();
        return typingStamps.filter((timestamp) => now - timestamp <= 1000).length;
    });

    const typingRateLabel = $derived(`${typingRate} ketik/detik`);
    const typingFillWidth = $derived(Math.min(100, typingRate * 8));
    const typingState = $derived.by(() => {
        if (typingRate >= 12) {
            return "overdrive";
        }

        if (typingRate >= 5) {
            return "active";
        }

        if (typingRate >= 2) {
            return "warm";
        }

        return "calm";
    });

    function getLanguageExtension() {
        if (editorMode === "notes") {
            return markdown();
        }

        switch (codeLanguage) {
            case "typescript":
                return javascript({ typescript: true });
            case "python":
                return python();
            case "json":
                return json();
            case "markdown":
                return markdown();
            default:
                return javascript();
        }
    }

    function syncEditorContent(nextNotes: string) {
        if (!editorView) {
            return;
        }

        const currentNotes = editorView.state.doc.toString();
        if (currentNotes === nextNotes) {
            return;
        }

        editorView.dispatch({
            changes: {
                from: 0,
                to: editorView.state.doc.length,
                insert: nextNotes,
            },
        });
    }

    function reconfigureLanguage() {
        if (!editorView) {
            return;
        }

        editorView.dispatch({
            effects: languageCompartment.reconfigure(getLanguageExtension()),
        });
    }

    function focusEditor() {
        queueMicrotask(() => {
            editorView?.focus();
        });
    }

    function setFeedback(
        message: string,
        tone: "info" | "success" | "error" = "info",
    ) {
        feedback = message;
        feedbackTone = tone;
    }

    function registerTypingPulse() {
        const now = Date.now();
        typingStamps = [...typingStamps, now];
        typingMeterTick += 1;
    }

    function drainTypingStamps() {
        if (typingStamps.length === 0) {
            return;
        }

        const now = Date.now();
        typingStamps = typingStamps.filter((timestamp) => now - timestamp <= 1000);
        typingMeterTick += 1;
    }

    function loadPreferences() {
        if (!browser) {
            return;
        }

        prefsLoaded = false;

        const storedMode = localStorage.getItem(modeKey);
        editorMode = storedMode === "code" ? "code" : "notes";

        const storedLanguage = localStorage.getItem(languageKey);
        if (
            storedLanguage === "markdown" ||
            storedLanguage === "javascript" ||
            storedLanguage === "typescript" ||
            storedLanguage === "python" ||
            storedLanguage === "json"
        ) {
            codeLanguage = storedLanguage;
        } else if (editorMode === "code") {
            codeLanguage = "javascript";
        }

        prefsLoaded = true;
    }

    // Load notes from localStorage on mount and when page changes
    $effect(() => {
        if (!browser) return;
        const key = storageKey;
        const saved = localStorage.getItem(key);
        notes = saved ?? "";
        lastSaved = null;
        setFeedback("Catatan tersimpan lokal di browser ini.");
        loadPreferences();
    });

    $effect(() => {
        if (previousOpen === isOpen) {
            return;
        }

        if (isOpen) {
            queueMicrotask(() => {
                focusEditor();
            });
        } else {
            queueMicrotask(() => {
                toggleButtonEl?.focus();
            });
        }

        previousOpen = isOpen;
    });

    $effect(() => {
        if (!editorView) {
            return;
        }

        syncEditorContent(notes);
    });

    $effect(() => {
        if (!editorView) {
            return;
        }

        reconfigureLanguage();
    });

    $effect(() => {
        if (!browser || !prefsLoaded) {
            return;
        }

        localStorage.setItem(modeKey, editorMode);
    });

    $effect(() => {
        if (!browser || !prefsLoaded) {
            return;
        }

        localStorage.setItem(languageKey, codeLanguage);
    });

    $effect(() => {
        if (!isOpen) {
            isFullscreen = false;
        }
    });

    // Auto-save with debounce
    let saveTimeout: ReturnType<typeof setTimeout>;

    function handleInput() {
        if (!browser) return;
        isSaving = true;
        registerTypingPulse();
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem(storageKey, notes);
            isSaving = false;
            lastSaved = new Date();
            setFeedback("Perubahan tersimpan otomatis.", "success");
        }, 500);
    }

    function handleEditorUpdate(update: ViewUpdate) {
        if (!update.docChanged) {
            return;
        }

        notes = update.state.doc.toString();
        handleInput();
    }

    function createEditor() {
        if (!browser || !editorHostEl || editorView) {
            return;
        }

        editorView = new EditorView({
            state: EditorState.create({
                doc: notes,
                extensions: [
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    highlightSpecialChars(),
                    history(),
                    drawSelection(),
                    dropCursor(),
                    rectangularSelection(),
                    highlightActiveLine(),
                    indentOnInput(),
                    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                    keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
                    EditorView.lineWrapping,
                    EditorView.contentAttributes.of({
                        spellcheck: "true",
                        autocapitalize: "sentences",
                        autocorrect: "on",
                    }),
                    EditorView.updateListener.of(handleEditorUpdate),
                    languageCompartment.of(getLanguageExtension()),
                ],
            }),
            parent: editorHostEl,
        });
    }

    function destroyEditor() {
        editorView?.destroy();
        editorView = null;
    }

    onMount(() => {
        createEditor();

        const activityInterval = setInterval(() => {
            drainTypingStamps();
        }, 350);

        return () => {
            clearInterval(activityInterval);
            destroyEditor();
        };
    });

    function togglePanel() {
        if (onToggle) {
            onToggle();
        } else {
            isOpen = !isOpen;
        }

        if (!isOpen) {
            isFullscreen = false;
        }
    }

    function closePanel() {
        isFullscreen = false;
        if (onToggle) {
            onToggle();
        } else {
            isOpen = false;
        }
    }

    function toggleEditorMode() {
        editorMode = editorMode === "notes" ? "code" : "notes";

        focusEditor();
    }

    function toggleFullscreen() {
        if (!isOpen) {
            return;
        }

        isFullscreen = !isFullscreen;
        focusEditor();
    }

    function clearNotes() {
        if (confirm("Hapus semua catatan untuk halaman ini?")) {
            notes = "";
            localStorage.removeItem(storageKey);
            lastSaved = null;
            typingStamps = [];
            typingMeterTick += 1;
            setFeedback("Catatan halaman ini dihapus.", "info");
            syncEditorContent("");
        }
    }

    function exportNotes() {
        if (!browser) return;

        const payload = {
            version: 1,
            pagePath: page.url.pathname,
            exportedAt: new Date().toISOString(),
            notes,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
            type: "application/json",
        });

        const safePageName = (page.url.pathname.split("/").pop() || "beranda")
            .replace(/[^a-zA-Z0-9-]/g, "-")
            .toLowerCase();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `notes-${safePageName}.json`;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        setFeedback("Catatan berhasil diexport sebagai JSON.", "success");
    }

    function openImportDialog() {
        importInputEl?.click();
    }

    async function importNotes(event: Event) {
        const target = event.currentTarget as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) {
            return;
        }

        try {
            const raw = await file.text();
            const parsed = JSON.parse(raw) as {
                notes?: unknown;
                pagePath?: unknown;
            };

            if (typeof parsed.notes !== "string") {
                throw new Error("Format file tidak valid.");
            }

            notes = parsed.notes;
            localStorage.setItem(storageKey, notes);
            lastSaved = new Date();
            typingStamps = [];
            typingMeterTick += 1;
            setFeedback("Catatan berhasil diimport.", "success");
            syncEditorContent(notes);

            if (
                typeof parsed.pagePath === "string" &&
                parsed.pagePath !== page.url.pathname
            ) {
                setFeedback(
                    "Catatan diimport dari halaman lain, periksa kembali isinya.",
                    "info",
                );
            }
        } catch (error) {
            setFeedback(
                error instanceof Error
                    ? error.message
                    : "Gagal membaca file catatan.",
                "error",
            );
        } finally {
            target.value = "";
        }
    }

    onDestroy(() => {
        clearTimeout(saveTimeout);
    });
</script>

<!-- Toggle Button (Right side) -->
<button
    bind:this={toggleButtonEl}
    class="notes-toggle"
    class:open={isOpen}
    onclick={togglePanel}
    aria-label={isOpen ? "Tutup catatan" : "Buka catatan"}
    aria-expanded={isOpen}
    aria-controls={panelId}
    title="Catatan Pribadi"
>
    <ThemeIcon name={isOpen ? "close" : "note"} size={20} />
</button>

<!-- Notes Panel -->
<aside
    id={panelId}
    class="notes-panel"
    class:open={isOpen}
    class:fullscreen={isFullscreen}
    aria-label="Panel catatan pribadi"
    aria-hidden={!isOpen}
>
    <div class="notes-header">
        <div class="notes-header-main">
            <h3 id="notes-panel-title"><ThemeIcon name="note" size={18} /> Catatan Pribadi</h3>
            <span class="page-indicator" title={page.url.pathname}>
                {page.url.pathname.split("/").pop() || "Beranda"}
            </span>
        </div>

        <div class="notes-header-actions">
            <button
                class="icon-btn mode-btn"
                onclick={toggleEditorMode}
                aria-pressed={editorMode === "code"}
                title={editorMode === "notes" ? "Pindah ke mode kode" : "Pindah ke mode catatan"}
            >
                <ThemeIcon name={editorMode === "notes" ? "edit" : "topic-praktek"} size={16} />
            </button>

            <button
                class="icon-btn fullscreen-btn"
                onclick={toggleFullscreen}
                aria-pressed={isFullscreen}
                title={isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
            >
                <ThemeIcon name={isFullscreen ? "minimize" : "maximize"} size={16} />
            </button>

            <button
                class="icon-btn close-btn"
                onclick={closePanel}
                title="Tutup catatan"
            >
                <ThemeIcon name="close" size={16} />
            </button>
        </div>
    </div>

    <div class="notes-toolbar">
        <div class="mode-switch" role="tablist" aria-label="Mode editor">
            <button
                class:active={editorMode === "notes"}
                onclick={() => (editorMode = "notes")}
                role="tab"
                aria-selected={editorMode === "notes"}
            >
                Catatan
            </button>
            <button
                class:active={editorMode === "code"}
                onclick={() => (editorMode = "code")}
                role="tab"
                aria-selected={editorMode === "code"}
            >
                Kode
            </button>
        </div>

        {#if editorMode === "code"}
            <label class="language-picker">
                <span>Bahasa</span>
                <select bind:value={codeLanguage} aria-label="Pilih bahasa kode">
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="json">JSON</option>
                </select>
            </label>
        {/if}

        <span class="editor-hint">
            Tab untuk indent, {isFullscreen ? "ESC untuk keluar fullscreen" : "editor siap dipakai"}
        </span>
    </div>

    <div class="notes-body">
        <div class="notes-editor" bind:this={editorHostEl} data-mode={editorMode}></div>
    </div>

    <div class="notes-footer">
        <div class="notes-footer-main">
            <div class="save-status" role="status" aria-live="polite">
                {#if isSaving}
                    <span class="saving"><ThemeIcon name="save" size={14} /> Menyimpan...</span>
                {:else if lastSaved}
                    <span class="saved"><ThemeIcon name="check" size={14} /> Tersimpan</span>
                {:else if notes.length === 0}
                    <span class="empty">Belum ada catatan</span>
                {/if}
            </div>

            {#if isFullscreen}
                <section class="writing-frenzy-line" class:calm={typingState === "calm"} class:warm={typingState === "warm"} class:active={typingState === "active"} class:overdrive={typingState === "overdrive"} aria-label="Ketikan per detik">
                    <div class="writing-frenzy-track" aria-hidden="true">
                        <span class="writing-frenzy-fill" style={`--typing-fill:${typingFillWidth}%;`}></span>
                    </div>
                    <span class="writing-frenzy-score">{typingRateLabel}</span>
                </section>
            {/if}
        </div>

        <div class="notes-actions">
            <input
                bind:this={importInputEl}
                class="import-input"
                type="file"
                accept="application/json"
                onchange={importNotes}
            />
            <button class="action-btn" onclick={openImportDialog} title="Import catatan JSON">
                Import
            </button>
            <button class="action-btn" onclick={exportNotes} title="Export catatan JSON">
                Export
            </button>
            {#if notes.length > 0}
                <button
                    class="clear-btn"
                    onclick={clearNotes}
                    title="Hapus catatan"
                >
                    <ThemeIcon name="trash" size={16} />
                </button>
            {/if}
        </div>
    </div>

    <p class="notes-feedback {feedbackTone}" role="status" aria-live="polite">
        {feedback}
    </p>
</aside>

<!-- Backdrop for mobile -->
{#if isOpen}
    <button
        class="notes-backdrop"
        class:fullscreen={isFullscreen}
        onclick={togglePanel}
        aria-label="Tutup panel catatan"
        tabindex="-1"
    ></button>
{/if}

<style>
    /* Toggle Button - Right Side */
    .notes-toggle {
        position: fixed;
        top: 1.5rem;
        right: 0;
        z-index: 101;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        border: none;
        width: 48px;
        height: 48px;
        border-radius: 8px 0 0 8px;
        font-size: 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    .notes-toggle:hover {
        width: 56px;
        background: var(--color-binder);
    }

    .notes-toggle.open {
        right: 320px;
        background: var(--color-ink);
    }

    .notes-toggle.fullscreen {
        right: 1rem;
        top: 1rem;
        border-radius: 999px;
        width: 42px;
        height: 42px;
        z-index: 201;
    }

    /* Notes Panel */
    .notes-panel {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 320px;
        background: linear-gradient(
            180deg,
            var(--color-surface-alt) 0%,
            var(--color-surface-muted) 100%
        );
        border-left: 3px solid var(--color-binder);
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 100;
        display: flex;
        flex-direction: column;
        box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
    }

    .notes-panel.open {
        transform: translateX(0);
    }

    .notes-panel.fullscreen {
        inset: 0.75rem;
        width: auto;
        max-width: none;
        border-left: 3px solid var(--color-binder);
        border-radius: 20px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
        z-index: 200;
    }

    .notes-panel.fullscreen .notes-body {
        padding-bottom: 0.25rem;
    }

    .notes-panel.fullscreen .notes-footer {
        margin-top: 0;
    }

    .notes-header {
        padding: 1rem 1.25rem;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .notes-header-main {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .notes-header h3 {
        margin: 0;
        font-size: 1rem;
        font-family: var(--font-handwriting);
    }

    .page-indicator {
        font-size: 0.7rem;
        background: rgba(255, 255, 255, 0.2);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .notes-header-actions {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        flex-wrap: wrap;
    }

    .icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background: rgba(255, 255, 255, 0.12);
        color: var(--color-text-on-accent);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .icon-btn:hover,
    .icon-btn:focus-visible {
        background: rgba(255, 255, 255, 0.22);
        transform: translateY(-1px);
    }

    .notes-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        flex-wrap: wrap;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--color-line);
        background: var(--color-surface-elevated);
    }

    .mode-switch {
        display: inline-flex;
        gap: 0.35rem;
        padding: 0.2rem;
        background: var(--color-surface-soft);
        border: 1px solid var(--color-line);
        border-radius: 999px;
    }

    .mode-switch button {
        border: none;
        background: transparent;
        color: var(--color-ink-muted);
        border-radius: 999px;
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.2s ease;
    }

    .mode-switch button.active {
        background: var(--color-binder);
        color: var(--color-text-on-accent);
    }

    .language-picker {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.75rem;
        color: var(--color-ink-muted);
    }

    .language-picker select {
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 0.35rem 0.55rem;
        background: var(--color-surface-elevated);
        color: var(--color-ink);
        font: inherit;
    }

    .editor-hint {
        font-size: 0.72rem;
        color: var(--color-ink-soft);
    }

    .notes-body {
        flex: 1;
        padding: 0.75rem;
        overflow: hidden;
        min-height: 0;
    }

    .writing-frenzy-line {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 0.7rem;
        min-width: 0;
        flex: 1;
        transition: color 180ms ease, filter 180ms ease;
    }

    .writing-frenzy-track {
        position: relative;
        display: block;
        align-items: center;
        min-width: 0;
        width: 100%;
        min-width: 10rem;
        height: 0.58rem;
        border-radius: 999px;
        overflow: hidden;
        background: linear-gradient(90deg, rgba(139, 69, 19, 0.18), rgba(255, 196, 112, 0.22));
        box-shadow: inset 0 0 0 1px rgba(139, 69, 19, 0.08);
    }

    .writing-frenzy-track::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 0.08rem;
        border-radius: 999px;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.32);
    }

    .writing-frenzy-fill {
        display: block;
        position: relative;
        z-index: 1;
        height: 100%;
        width: var(--typing-fill);
        border-radius: 999px;
        background: linear-gradient(90deg, rgba(196, 205, 214, 0.95), rgba(139, 69, 19, 0.5));
        transition: width 180ms ease, background 180ms ease, box-shadow 180ms ease, filter 180ms ease;
    }

    .writing-frenzy-line.calm .writing-frenzy-fill {
        background: linear-gradient(90deg, rgba(196, 205, 214, 0.95), rgba(139, 69, 19, 0.42));
    }

    .writing-frenzy-line.warm .writing-frenzy-fill {
        background: linear-gradient(90deg, rgba(255, 214, 145, 0.98), rgba(214, 122, 33, 0.98));
    }

    .writing-frenzy-line.active .writing-frenzy-fill {
        background: linear-gradient(90deg, rgba(255, 196, 112, 0.98), rgba(255, 138, 61, 1));
        box-shadow: 0 0 12px rgba(255, 138, 61, 0.24);
    }

    .writing-frenzy-line.overdrive .writing-frenzy-fill {
        background: linear-gradient(90deg, rgba(255, 117, 89, 1), rgba(204, 51, 63, 1));
        box-shadow: 0 0 16px rgba(204, 51, 63, 0.34);
    }

    .writing-frenzy-line .writing-frenzy-score {
        min-width: 2.75rem;
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--color-binder);
        text-align: right;
    }

    .writing-frenzy-line.calm .writing-frenzy-score {
        color: #8b95a1;
    }

    .writing-frenzy-line.warm .writing-frenzy-score {
        color: #b8751f;
    }

    .writing-frenzy-line.active .writing-frenzy-score {
        color: #c36b1f;
    }

    .writing-frenzy-line.overdrive .writing-frenzy-score {
        color: #c83c31;
    }

    .notes-editor {
        width: 100%;
        height: 100%;
        min-height: 0;
        border: 1px solid var(--color-line);
        border-radius: 14px;
        overflow: hidden;
        background: var(--color-surface-elevated);
    }

    .notes-editor :global(.cm-editor) {
        height: 100%;
        background: transparent;
        color: var(--color-ink-strong);
    }

    .notes-editor :global(.cm-scroller) {
        height: 100%;
        background: transparent;
    }

    .notes-editor :global(.cm-gutters) {
        background: rgba(0, 0, 0, 0.02);
        border: none;
        color: var(--color-ink-soft);
    }

    .notes-editor :global(.cm-content) {
        min-height: 100%;
        padding: 1rem 1rem 1.25rem;
        caret-color: var(--color-ink-strong);
    }

    .notes-editor[data-mode="notes"] :global(.cm-content) {
        font-family: var(--font-handwriting);
        font-size: 1.15rem;
        line-height: 2rem;
        padding-top: 1.15rem;
        padding-bottom: 1.15rem;
        background-image: repeating-linear-gradient(
            transparent,
            transparent calc(2rem - 2px),
            var(--color-note-lines) calc(2rem - 2px),
            var(--color-note-lines) 2rem
        );
        background-size: 100% 2rem;
        background-position: 0 0.7rem;
    }

    .notes-editor[data-mode="notes"] :global(.cm-gutters) {
        display: none;
    }

    .notes-editor[data-mode="notes"] :global(.cm-activeLine),
    .notes-editor[data-mode="notes"] :global(.cm-activeLineGutter) {
        background: transparent;
        border: none;
    }

    .notes-editor[data-mode="code"] :global(.cm-content) {
        font-family: var(--font-mono);
        font-size: 0.9rem;
        line-height: 1.65rem;
    }

    .notes-editor[data-mode="code"] :global(.cm-gutters) {
        background: var(--color-surface-soft);
    }

    .notes-editor :global(.cm-focused) {
        outline: none;
    }

    .notes-editor :global(.cm-activeLine) {
        background: rgba(139, 69, 19, 0.06);
    }

    .notes-editor :global(.cm-selectionBackground) {
        background: rgba(52, 152, 219, 0.18) !important;
    }

    .notes-editor :global(.cm-cursor) {
        border-left-color: var(--color-ink-strong);
    }

    .notes-editor :global(.cm-placeholder) {
        color: var(--color-ink-soft);
        font-style: italic;
    }

    .notes-footer {
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--color-line);
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        align-items: center;
        background: var(--color-surface-elevated);
    }

    .notes-footer-main {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.8rem;
    }

    .save-status {
        font-size: 0.75rem;
        white-space: nowrap;
        flex: 0 0 auto;
    }

    .saving {
        color: var(--color-status-wip-end);
    }

    .saved {
        color: var(--color-status-done-start);
    }

    .empty {
        color: var(--color-ink-soft);
    }

    .clear-btn {
        background: transparent;
        border: 1px solid var(--color-callout-danger-border);
        color: var(--color-callout-danger-border);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;
    }

    .notes-actions {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .import-input {
        display: none;
    }

    .action-btn {
        background: transparent;
        border: 1px solid var(--color-binder);
        color: var(--color-binder);
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.75rem;
        padding: 0.25rem 0.45rem;
        transition: all 0.2s;
    }

    .action-btn:hover {
        background: var(--color-binder);
        color: var(--color-text-on-accent);
    }

    .clear-btn:hover {
        background: var(--color-callout-danger-border);
        color: var(--color-text-on-accent);
    }

    .notes-feedback {
        margin: 0;
        padding: 0.45rem 1rem 0.8rem;
        font-size: 0.72rem;
        border-top: 1px dashed var(--color-line);
    }

    .notes-feedback.info {
        color: var(--color-ink-muted);
    }

    .notes-feedback.success {
        color: var(--color-status-done-start);
    }

    .notes-feedback.error {
        color: var(--color-status-important-start);
    }

    /* Backdrop */
    .notes-backdrop {
        display: none;
        border: none;
        cursor: pointer;
    }

    .notes-backdrop.fullscreen {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        z-index: 180;
    }

    /* Mobile */
    @media (max-width: 768px) {
        .notes-panel {
            width: 100%;
            max-width: 320px;
        }

        .notes-toggle.open {
            right: 280px;
        }

        .notes-panel.fullscreen {
            inset: 0;
            border-radius: 0;
        }

        .notes-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
            border: none;
        }

        .notes-backdrop.fullscreen {
            z-index: 180;
        }

        .notes-toolbar {
            align-items: flex-start;
        }
    }
</style>
