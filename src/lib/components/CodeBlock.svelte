<script lang="ts">
    import Prism from "prismjs";
    import "prismjs/themes/prism-tomorrow.css";
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
    }

    let { code, language = "javascript" }: Props = $props();
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
        <span class="language-badge">{language}</span>
        <button class="copy-btn" onclick={copyCode}>
            {copied ? "✓ Copied!" : "📋 Copy"}
        </button>
    </div>
    <pre class="language-{language}"><code class="language-{language}"
            >{@html highlightedCode()}</code
        ></pre>
</div>

<style>
    .code-block {
        border-radius: 8px;
        overflow: hidden;
        margin: 1rem 0;
        border: 2px solid var(--color-binder);
        box-shadow: 3px 3px 0 rgba(139, 69, 19, 0.2);
    }

    .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--color-binder);
        padding: 0.5rem 1rem;
    }

    .language-badge {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 0.05em;
    }

    .copy-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    pre {
        margin: 0;
        padding: 1rem;
        overflow-x: auto;
        background: #2d2d2d !important;
        line-height: 1.6;
    }

    pre code {
        font-family: var(--font-mono);
        font-size: 0.875rem;
        white-space: pre;
    }
</style>
