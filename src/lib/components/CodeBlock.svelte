<script lang="ts">
    import Prism from "prismjs";
    import "prismjs/themes/prism-tomorrow.css";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
    // Import languages
    import "prismjs/components/prism-python";
    import "prismjs/components/prism-javascript";
    import "prismjs/components/prism-typescript";
    import "prismjs/components/prism-css";
    import "prismjs/components/prism-markup";
    import "prismjs/components/prism-bash";
    import "prismjs/components/prism-json";

    interface Props {
        code: string;
        language?: string;
        filename?: string;
    }

    let { code, language = "javascript", filename }: Props = $props();
    let copied = $state(false);

    // Get highlighted HTML
    const highlightedCode = $derived(() => {
        const grammar = Prism.languages[language] || Prism.languages.javascript;
        return Prism.highlight(code, grammar, language);
    });

    function copyCode() {
        navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }
</script>

<div class="code-block">
    <div class="code-header">
        <div class="code-meta">
            <span class="language-badge">{language}</span>
            {#if filename}
                <span class="filename">{filename}</span>
            {/if}
        </div>
        <button class="copy-btn" onclick={copyCode} class:copied>
            <span class="copy-icon">
                <ThemeIcon name={copied ? "check" : "copy"} size={14} />
            </span>
            <span class="copy-text">{copied ? "Copied!" : "Copy"}</span>
        </button>
    </div>
    <div class="code-wrapper">
        <pre class="language-{language}"><code class="language-{language}"
                >{@html highlightedCode()}</code
            ></pre>
    </div>
</div>

<style>
    :global(:root) {
        --code-bg: #1e1e1e;
        --code-fg: #d4d4d4;
    }

    :global(:root[data-theme="dark"]) {
        --code-bg: #0f172a;
        --code-fg: #e2e8f0;
    }

    .code-block {
        border-radius: 12px;
        overflow: hidden;
        margin: 1.5rem 0;
        border: 2px solid var(--color-binder);
        box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
        transition: box-shadow 0.2s ease;
    }

    .code-block:hover {
        box-shadow: 0 6px 16px rgba(139, 69, 19, 0.2);
    }

    .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(
            135deg,
            var(--color-binder) 0%,
            var(--color-ink-muted) 100%
        );
        padding: 0.625rem 1rem;
    }

    .code-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .language-badge {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 0.08em;
        background: rgba(0, 0, 0, 0.2);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }

    .filename {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
        font-family: var(--font-mono);
    }

    .copy-btn {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: var(--color-surface-elevated);
        padding: 0.375rem 0.75rem;
        border-radius: 6px;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 500;
    }

    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.28);
        transform: translateY(-1px);
    }

    .copy-btn.copied {
        background: rgba(39, 174, 96, 0.25);
        border-color: rgba(39, 174, 96, 0.45);
    }

    .copy-icon {
        font-size: 0.85rem;
    }

    .code-wrapper {
        max-height: 500px;
        overflow: auto;
    }

    pre {
        margin: 0;
        padding: 1.25rem;
        overflow-x: auto;
        background: var(--code-bg);
        line-height: 1.7;
    }

    pre code {
        font-family: var(--font-mono);
        font-size: 0.875rem;
        white-space: pre;
        color: var(--code-fg);
    }

    /* Custom scrollbar for code */
    .code-wrapper::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .code-wrapper::-webkit-scrollbar-track {
        background: var(--color-surface-soft);
    }

    .code-wrapper::-webkit-scrollbar-thumb {
        background: var(--color-ink-soft);
        border-radius: 4px;
    }

    .code-wrapper::-webkit-scrollbar-thumb:hover {
        background: var(--color-ink-muted);
    }
</style>
