<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade, fly } from 'svelte/transition';

    let list: { id: number; value: string }[] = [
        { id: 100, value: "7" },
        { id: 101, value: "9" }
    ];
    let idCounter = 102;
    let inputValue = '';
    let errorMessage = '';

    function insertHead() {
        if (!inputValue.trim()) {
            showError("Masukkan nilai!");
            return;
        }
        if (list.length >= 6) {
            showError("Maksimal 6 node untuk demo");
            return;
        }
        list = [{ id: idCounter++, value: inputValue.trim() }, ...list];
        inputValue = '';
    }

    function insertTail() {
        if (!inputValue.trim()) {
            showError("Masukkan nilai!");
            return;
        }
        if (list.length >= 6) {
            showError("Maksimal 6 node untuk demo");
            return;
        }
        list = [...list, { id: idCounter++, value: inputValue.trim() }];
        inputValue = '';
    }

    function deleteHead() {
        if (list.length === 0) {
            showError("List sudah kosong!");
            return;
        }
        list = list.slice(1);
    }

    function showError(msg: string) {
        errorMessage = msg;
        setTimeout(() => errorMessage = '', 2000);
    }
</script>

<div class="demo-container">
    <div class="controls">
        <input type="text" bind:value={inputValue} placeholder="Nilai..." on:keydown={(e) => e.key === 'Enter' && insertTail()} maxlength="5" />
        <button class="btn-head" on:click={insertHead}>Insert Head</button>
        <button class="btn-tail" on:click={insertTail}>Insert Tail</button>
        <button class="btn-del" on:click={deleteHead}>Delete Head</button>
    </div>
    
    {#if errorMessage}
        <div class="error" transition:fade>{errorMessage}</div>
    {/if}

    <div class="visual-area">
        <div class="ll-container">
            {#if list.length === 0}
                <div class="empty-state">Linked List Kosong (Head -> Null)</div>
            {:else}
                <div class="head-pointer" transition:fade>
                    <span class="label">Head</span>
                    <span class="arrow">&darr;</span>
                </div>
                
                {#each list as node, i (node.id)}
                    <div class="node-wrapper" 
                         animate:flip={{duration: 300}}
                         in:fly={{ y: -30, duration: 300 }}
                         out:fly={{ y: 30, duration: 300 }}>
                        <div class="ll-node">
                            <div class="ll-data">{node.value}</div>
                            <div class="ll-ptr" class:null-ptr={i === list.length - 1}>
                                {i === list.length - 1 ? 'Null' : '•'}
                            </div>
                        </div>
                        {#if i < list.length - 1}
                            <div class="ll-arrow" transition:fade>&rarr;</div>
                        {/if}
                    </div>
                {/each}
            {/if}
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
        width: 70px;
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
        font-size: 0.9rem;
    }
    
    button:active { transform: scale(0.95); }
    button:hover { opacity: 0.9; }

    .btn-head { background: var(--color-status-success-text); }
    .btn-tail { background: var(--color-link); }
    .btn-del { background: var(--color-status-error-text, #e53e3e); }

    .error {
        text-align: center;
        color: var(--color-status-error);
        font-size: 0.85rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    .visual-area {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 140px;
        overflow-x: auto;
        padding: 1rem 0;
    }

    .ll-container {
        display: flex;
        align-items: center;
        position: relative;
        padding-top: 30px;
    }

    .head-pointer {
        position: absolute;
        top: -5px;
        left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--color-accent);
        font-weight: bold;
    }
    
    .head-pointer .arrow {
        font-size: 1.2rem;
        margin-top: -5px;
    }

    .empty-state {
        color: var(--color-ink-muted);
        font-weight: bold;
    }

    .node-wrapper {
        display: flex;
        align-items: center;
    }

    .ll-node {
        display: flex;
        border: 2px solid var(--color-status-wip);
        border-radius: 6px;
        overflow: hidden;
        background: var(--color-surface-elevated);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .ll-data {
        padding: 10px 14px;
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--color-ink);
        border-right: 2px solid var(--color-status-wip);
        min-width: 30px;
        text-align: center;
    }

    .ll-ptr {
        padding: 10px;
        background: rgba(0, 0, 0, 0.03);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: var(--color-link);
    }
    
    .null-ptr {
        color: var(--color-status-error);
        font-size: 0.8rem;
    }

    .ll-arrow {
        margin: 0 8px;
        color: var(--color-ink-muted);
        font-weight: bold;
        font-size: 1.5rem;
    }
</style>
