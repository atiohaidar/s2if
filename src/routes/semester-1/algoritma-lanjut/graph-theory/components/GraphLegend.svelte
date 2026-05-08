<script lang="ts">
    interface LegendItem {
        color: string;
        label: string;
        type?: 'node' | 'edge';
    }
    let { items = [] }: { items: LegendItem[] } = $props();
</script>

<div class="legend">
    {#each items as item}
        <div class="legend-item">
            {#if item.type === 'edge'}
                <span class="legend-line" style="background: {item.color}"></span>
            {:else}
                <span class="legend-circle" style="background: {item.color}; border: 1px solid #ccc"></span>
            {/if}
            <span class="legend-label">{item.label}</span>
        </div>
    {/each}
</div>

<style>
    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1rem;
        padding: 0.5rem;
        background: #fdfdfd;
        border-radius: 8px;
        font-size: 0.85rem;
    }
    .legend-item { display: flex; align-items: center; gap: 0.5rem; }
    .legend-circle { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }
    .legend-line { width: 20px; height: 3px; display: inline-block; }
    .legend-label { color: #666; }
</style>
