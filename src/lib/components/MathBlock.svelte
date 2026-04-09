<script lang="ts">
    import katex from "katex";
    import "katex/dist/katex.min.css";

    interface Props {
        latex: string;
        displayMode?: boolean;
    }

    let { latex, displayMode = true }: Props = $props();

    const renderedMath = $derived(() =>
        katex.renderToString(latex, {
            throwOnError: false,
            displayMode
        })
    );
</script>

<div class="math-block" class:inline={!displayMode}>
    {@html renderedMath()}
</div>

<style>
    .math-block {
        margin: 1rem 0;
        overflow-x: auto;
        padding: 0.25rem 0;
    }

    .math-block.inline {
        display: inline;
        margin: 0;
        padding: 0;
    }

    .math-block :global(.katex-display) {
        margin: 0.5rem 0;
    }
</style>
