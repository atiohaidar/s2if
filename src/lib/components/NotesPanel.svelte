<script lang="ts">
    import { page } from "$app/state";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";

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
    let textareaEl: HTMLTextAreaElement | null = null;
    let importInputEl: HTMLInputElement | null = null;

    // Get storage key based on current page path
    const storageKey = $derived(`s2if-notes:${page.url.pathname}`);
    const panelId = $derived(`notes-panel-${page.url.pathname.replace(/[^a-zA-Z0-9]+/g, "-")}`);

    function setFeedback(
        message: string,
        tone: "info" | "success" | "error" = "info",
    ) {
        feedback = message;
        feedbackTone = tone;
    }

    // Load notes from localStorage on mount and when page changes
    $effect(() => {
        if (!browser) return;
        const key = storageKey;
        const saved = localStorage.getItem(key);
        notes = saved ?? "";
        lastSaved = null;
        setFeedback("Catatan tersimpan lokal di browser ini.");
    });

    $effect(() => {
        if (previousOpen === isOpen) {
            return;
        }

        if (isOpen) {
            queueMicrotask(() => {
                textareaEl?.focus();
            });
        } else {
            queueMicrotask(() => {
                toggleButtonEl?.focus();
            });
        }

        previousOpen = isOpen;
    });

    // Auto-save with debounce
    let saveTimeout: ReturnType<typeof setTimeout>;

    function handleInput() {
        if (!browser) return;
        isSaving = true;
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem(storageKey, notes);
            isSaving = false;
            lastSaved = new Date();
            setFeedback("Perubahan tersimpan otomatis.", "success");
        }, 500);
    }

    function togglePanel() {
        if (onToggle) {
            onToggle();
        } else {
            isOpen = !isOpen;
        }
    }

    function clearNotes() {
        if (confirm("Hapus semua catatan untuk halaman ini?")) {
            notes = "";
            localStorage.removeItem(storageKey);
            lastSaved = null;
            setFeedback("Catatan halaman ini dihapus.", "info");
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
            setFeedback("Catatan berhasil diimport.", "success");

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
    aria-label="Panel catatan pribadi"
    aria-hidden={!isOpen}
>
    <div class="notes-header">
        <h3 id="notes-panel-title"><ThemeIcon name="note" size={18} /> Catatan Pribadi</h3>
        <span class="page-indicator" title={page.url.pathname}>
            {page.url.pathname.split("/").pop() || "Beranda"}
        </span>
    </div>

    <div class="notes-body">
        <textarea
            bind:this={textareaEl}
            bind:value={notes}
            oninput={handleInput}
            placeholder="Tulis catatan pribadimu di sini...

Catatan ini hanya tersimpan di browser kamu dan tidak akan hilang saat refresh halaman."
            class="notes-textarea"
        ></textarea>
    </div>

    <div class="notes-footer">
        <div class="save-status" role="status" aria-live="polite">
            {#if isSaving}
                <span class="saving"><ThemeIcon name="save" size={14} /> Menyimpan...</span>
            {:else if lastSaved}
                <span class="saved"><ThemeIcon name="check" size={14} /> Tersimpan</span>
            {:else if notes.length === 0}
                <span class="empty">Belum ada catatan</span>
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

    .notes-header {
        padding: 1rem 1.25rem;
        background: var(--color-binder);
        color: var(--color-text-on-accent);
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    .notes-body {
        flex: 1;
        padding: 1rem;
        overflow: hidden;
    }

    .notes-textarea {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        font-family: var(--font-handwriting);
        font-size: 1.1rem;
        line-height: 2rem;
        color: var(--color-ink-strong);
        resize: none;
        outline: none;
        background-image: repeating-linear-gradient(
            transparent,
            transparent calc(2rem - 1px),
            var(--color-note-lines) calc(2rem - 1px),
            var(--color-note-lines) 2rem
        );
        background-size: 100% 2rem;
    }

    .notes-textarea::placeholder {
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

    .save-status {
        font-size: 0.75rem;
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

    /* Mobile */
    @media (max-width: 768px) {
        .notes-panel {
            width: 100%;
            max-width: 320px;
        }

        .notes-toggle.open {
            right: 280px;
        }

        .notes-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
            border: none;
        }
    }
</style>
