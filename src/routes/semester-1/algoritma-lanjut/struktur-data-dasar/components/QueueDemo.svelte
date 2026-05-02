<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';

    let queue: { id: number; value: string }[] = [];
    let idCounter = 0;
    let inputValue = '';
    let errorMessage = '';

    function enqueue() {
        if (!inputValue.trim()) {
            errorMessage = "Masukkan angka/teks!";
            setTimeout(() => errorMessage = '', 2000);
            return;
        }
        if (queue.length >= 7) {
            errorMessage = "Queue penuh! (Maks 7 untuk demo)";
            setTimeout(() => errorMessage = '', 2000);
            return;
        }
        queue = [...queue, { id: idCounter++, value: inputValue.trim() }];
        inputValue = '';
    }

    function dequeue() {
        if (queue.length === 0) {
            errorMessage = "Queue kosong! Tidak ada yang bisa di-dequeue.";
            setTimeout(() => errorMessage = '', 2000);
            return;
        }
        queue = queue.slice(1);
    }
</script>

<div class="demo-container">
    <div class="controls">
        <input type="text" bind:value={inputValue} placeholder="Nilai..." on:keydown={(e) => e.key === 'Enter' && enqueue()} maxlength="5" />
        <button class="btn-enqueue" on:click={enqueue}>Enqueue (Masuk Belakang)</button>
        <button class="btn-dequeue" on:click={dequeue}>Dequeue (Keluar Depan)</button>
    </div>
    
    {#if errorMessage}
        <div class="error" transition:fade>{errorMessage}</div>
    {/if}

    <div class="visual-area">
        <div class="queue-labels">
            <span class="out-label">Front (Keluar) &larr;</span>
            <span class="in-label">&larr; Back (Masuk)</span>
        </div>
        
        <div class="queue-box">
            {#if queue.length === 0}
                <div class="empty-state">Queue Kosong</div>
            {/if}
            
            {#each queue as item, i (item.id)}
                <div class="queue-item" 
                     animate:flip={{duration: 300}}
                     in:fly={{ x: 50, duration: 300 }}
                     out:fly={{ x: -50, duration: 300 }}
                     class:front-item={i === 0}
                     class:back-item={i === queue.length - 1 && queue.length > 1}>
                    <div class="value">{item.value}</div>
                </div>
            {/each}
        </div>
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
        flex-wrap: wrap;
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

    .btn-enqueue { background: var(--color-link); }
    .btn-dequeue { background: var(--color-status-error-text, #e53e3e); }

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
        min-height: 120px;
        justify-content: center;
        width: 100%;
        overflow-x: auto;
    }

    .queue-labels {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 400px;
        margin-bottom: 5px;
        font-size: 0.85rem;
        font-weight: bold;
    }
    
    .out-label { color: var(--color-status-error); }
    .in-label { color: var(--color-link); }

    .queue-box {
        display: flex;
        align-items: center;
        min-width: 400px;
        height: 70px;
        border-top: 4px solid var(--color-ink-muted);
        border-bottom: 4px solid var(--color-ink-muted);
        padding: 4px 10px;
        background: rgba(0,0,0,0.02);
        gap: 8px;
    }

    .empty-state {
        text-align: center;
        color: var(--color-ink-muted);
        width: 100%;
        font-size: 0.9rem;
    }

    .queue-item {
        background: var(--color-surface-elevated);
        border: 2px solid var(--color-ink-muted);
        min-width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--color-ink);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 0 4px;
    }

    .front-item {
        background: var(--color-callout-error-end);
        border-color: var(--color-status-error);
    }
    
    .back-item {
        background: var(--color-callout-info-end);
        border-color: var(--color-link);
    }
</style>
