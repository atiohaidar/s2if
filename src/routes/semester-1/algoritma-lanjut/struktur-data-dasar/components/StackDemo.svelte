<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';

    let stack: { id: number; value: string }[] = [];
    let idCounter = 0;
    let inputValue = '';
    let errorMessage = '';

    function push() {
        if (!inputValue.trim()) {
            errorMessage = "Masukkan angka/teks!";
            setTimeout(() => errorMessage = '', 2000);
            return;
        }
        if (stack.length >= 7) {
            errorMessage = "Stack penuh! (Maks 7 untuk demo)";
            setTimeout(() => errorMessage = '', 2000);
            return;
        }
        stack = [...stack, { id: idCounter++, value: inputValue.trim() }];
        inputValue = '';
    }

    function pop() {
        if (stack.length === 0) {
            errorMessage = "Stack kosong! Tidak ada yang bisa di-pop.";
            setTimeout(() => errorMessage = '', 2000);
            return;
        }
        stack = stack.slice(0, -1);
    }
</script>

<div class="demo-container">
    <div class="controls">
        <input type="text" bind:value={inputValue} placeholder="Nilai..." on:keydown={(e) => e.key === 'Enter' && push()} maxlength="5" />
        <button class="btn-push" on:click={push}>Push (Masuk)</button>
        <button class="btn-pop" on:click={pop}>Pop (Keluar)</button>
    </div>
    
    {#if errorMessage}
        <div class="error" transition:fade>{errorMessage}</div>
    {/if}

    <div class="visual-area">
        <div class="stack-box">
            {#if stack.length === 0}
                <div class="empty-state">Stack Kosong</div>
            {/if}
            
            <!-- Stack ditaruh dari bawah ke atas, tapi visualnya dari atas ke bawah. 
                 Kita reverse array saat loop agar index terakhir (top) tampil di atas. -->
            {#each [...stack].reverse() as item, i (item.id)}
                <div class="stack-item" 
                     animate:flip={{duration: 300}}
                     in:fly={{ y: -50, duration: 300 }}
                     out:fly={{ x: 50, duration: 300 }}
                     class:top-item={i === 0}>
                    <div class="value">{item.value}</div>
                    {#if i === 0}
                        <div class="top-badge">&larr; Top</div>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="stack-base">Dasar Stack</div>
    </div>
</div>

<style>
    .demo-container {
        background: var(--color-surface-alt);
        border: 1px solid var(--color-line);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1rem 0;
        font-family: inherit;
    }

    .controls {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin-bottom: 1rem;
    }

    input {
        width: 80px;
        padding: 0.5rem;
        border: 1px solid var(--color-line);
        border-radius: 4px;
        text-align: center;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        color: white;
        transition: transform 0.1s, opacity 0.2s;
    }
    
    button:active { transform: scale(0.95); }
    button:hover { opacity: 0.9; }

    .btn-push { background: var(--color-link); }
    .btn-pop { background: var(--color-status-error-text, #e53e3e); }

    .error {
        text-align: center;
        color: var(--color-status-error);
        font-size: 0.85rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    .visual-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 250px;
        justify-content: flex-end;
    }

    .stack-box {
        width: 120px;
        min-height: 50px;
        border-left: 4px solid var(--color-ink-muted);
        border-right: 4px solid var(--color-ink-muted);
        border-bottom: 4px solid var(--color-ink-muted);
        border-radius: 0 0 8px 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 4px;
        background: rgba(0,0,0,0.02);
        position: relative;
    }

    .stack-base {
        margin-top: 5px;
        font-size: 0.8rem;
        color: var(--color-ink-muted);
        font-weight: bold;
    }

    .empty-state {
        text-align: center;
        color: var(--color-ink-muted);
        padding: 1rem 0;
        font-size: 0.9rem;
    }

    .stack-item {
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-link);
        margin-bottom: 4px;
        border-radius: 4px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--color-ink);
        position: relative;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .top-item {
        background: var(--color-callout-success-end);
        border-color: var(--color-status-success-border);
    }

    .top-badge {
        position: absolute;
        left: 105%;
        color: var(--color-status-success-text);
        font-size: 0.8rem;
        white-space: nowrap;
        font-weight: bold;
    }
</style>
