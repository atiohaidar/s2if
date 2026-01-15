<script lang="ts">
    import { page } from "$app/state";
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    interface Props {
        isOpen?: boolean;
        onToggle?: () => void;
    }

    let { isOpen = $bindable(false), onToggle }: Props = $props();

    let notes = $state("");
    let isSaving = $state(false);
    let lastSaved = $state<Date | null>(null);

    // Get storage key based on current page path
    const storageKey = $derived(`s2if-notes:${page.url.pathname}`);

    // Load notes from localStorage on mount and when page changes
    $effect(() => {
        if (!browser) return;
        const key = storageKey;
        const saved = localStorage.getItem(key);
        notes = saved ?? "";
        lastSaved = null;
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
        }
    }

    onDestroy(() => {
        clearTimeout(saveTimeout);
    });
</script>

<!-- Toggle Button (Right side) -->
<button
    class="notes-toggle"
    class:open={isOpen}
    onclick={togglePanel}
    aria-label={isOpen ? "Tutup catatan" : "Buka catatan"}
    title="Catatan Pribadi"
>
    {isOpen ? "✕" : "📝"}
</button>

<!-- Notes Panel -->
<aside class="notes-panel" class:open={isOpen}>
    <div class="notes-header">
        <h3>📝 Catatan Pribadi</h3>
        <span class="page-indicator" title={page.url.pathname}>
            {page.url.pathname.split("/").pop() || "Beranda"}
        </span>
    </div>

    <div class="notes-body">
        <textarea
            bind:value={notes}
            oninput={handleInput}
            placeholder="Tulis catatan pribadimu di sini...

Catatan ini hanya tersimpan di browser kamu dan tidak akan hilang saat refresh halaman."
            class="notes-textarea"
        ></textarea>
    </div>

    <div class="notes-footer">
        <div class="save-status">
            {#if isSaving}
                <span class="saving">💾 Menyimpan...</span>
            {:else if lastSaved}
                <span class="saved">✓ Tersimpan</span>
            {:else if notes.length === 0}
                <span class="empty">Belum ada catatan</span>
            {/if}
        </div>
        {#if notes.length > 0}
            <button
                class="clear-btn"
                onclick={clearNotes}
                title="Hapus catatan"
            >
                🗑️
            </button>
        {/if}
    </div>
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
        color: white;
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
        background: #6d3710;
    }

    .notes-toggle.open {
        right: 320px;
        background: #2c3e50;
    }

    /* Notes Panel */
    .notes-panel {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 320px;
        background: linear-gradient(180deg, #fdf6e3 0%, #f5e6c8 100%);
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
        color: white;
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
        color: var(--color-ink);
        resize: none;
        outline: none;
        background-image: repeating-linear-gradient(
            transparent,
            transparent calc(2rem - 1px),
            #d4c4a8 calc(2rem - 1px),
            #d4c4a8 2rem
        );
        background-size: 100% 2rem;
    }

    .notes-textarea::placeholder {
        color: #999;
        font-style: italic;
    }

    .notes-footer {
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--color-line);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.5);
    }

    .save-status {
        font-size: 0.75rem;
    }

    .saving {
        color: #f39c12;
    }

    .saved {
        color: #27ae60;
    }

    .empty {
        color: #95a5a6;
    }

    .clear-btn {
        background: transparent;
        border: 1px solid #e74c3c;
        color: #e74c3c;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;
    }

    .clear-btn:hover {
        background: #e74c3c;
        color: white;
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
