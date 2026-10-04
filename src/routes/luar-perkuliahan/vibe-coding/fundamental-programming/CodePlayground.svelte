<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { Play, RotateCcw, CheckCircle2, AlertCircle, Terminal, Sparkles } from 'lucide-svelte';

  import { EditorView, lineNumbers, highlightActiveLine, highlightActiveLineGutter, keymap } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { javascript } from '@codemirror/lang-javascript';
  import { defaultHighlightStyle, syntaxHighlighting, indentOnInput } from '@codemirror/language';
  import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';

  interface Props {
    initialCode: string;
    title?: string;
    description?: string;
    challenge?: string;
    id?: string;
  }

  let { initialCode, title, description, challenge, id = 'playground' }: Props = $props();

  let editorHostEl = $state<HTMLDivElement | null>(null);
  let editorView: EditorView | null = null;
  let currentCode = $state(initialCode);

  interface LogEntry {
    type: 'log' | 'warn' | 'error';
    text: string;
  }

  let outputLogs = $state<LogEntry[]>([]);
  let errorMessage = $state<string | null>(null);
  let isRunning = $state(false);
  let hasRun = $state(false);
  let isSuccess = $state(false);

  function createEditor() {
    if (!browser || !editorHostEl || editorView) return;

    const runKeymap = keymap.of([
      {
        key: 'Mod-Enter',
        run: () => {
          runCode();
          return true;
        }
      },
      indentWithTab
    ]);

    const state = EditorState.create({
      doc: initialCode,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        javascript(),
        runKeymap,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            currentCode = update.state.doc.toString();
          }
        }),
        EditorView.theme({
          '&': {
            fontSize: '13.5px',
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            backgroundColor: '#ffffff',
            color: '#2c3e50',
            borderRadius: '6px 6px 0 0',
            minHeight: '120px'
          },
          '.cm-content': {
            padding: '10px 0'
          },
          '.cm-gutters': {
            backgroundColor: '#faf6ee',
            color: '#8c786a',
            borderRight: '1px solid #e8dcc8',
            paddingRight: '8px'
          },
          '.cm-activeLine': {
            backgroundColor: '#fbf8f0'
          },
          '.cm-activeLineGutter': {
            backgroundColor: '#f3ece0',
            color: '#3d2b1f'
          },
          '&.cm-focused': {
            outline: 'none'
          }
        })
      ]
    });

    editorView = new EditorView({
      state,
      parent: editorHostEl
    });
  }

  function resetCode() {
    currentCode = initialCode;
    outputLogs = [];
    errorMessage = null;
    hasRun = false;
    isSuccess = false;

    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: initialCode
        }
      });
    }
  }

  async function runCode() {
    isRunning = true;
    hasRun = true;
    outputLogs = [];
    errorMessage = null;

    const logs: LogEntry[] = [];

    const customConsole = {
      log: (...args: any[]) => {
        logs.push({
          type: 'log',
          text: args.map(a => (typeof a === 'object' && a !== null) ? JSON.stringify(a, null, 2) : String(a)).join(' ')
        });
      },
      warn: (...args: any[]) => {
        logs.push({
          type: 'warn',
          text: args.map(a => (typeof a === 'object' && a !== null) ? JSON.stringify(a, null, 2) : String(a)).join(' ')
        });
      },
      error: (...args: any[]) => {
        logs.push({
          type: 'error',
          text: args.map(a => (typeof a === 'object' && a !== null) ? JSON.stringify(a, null, 2) : String(a)).join(' ')
        });
      }
    };

    // Mock API for networking module
    const mockApi = {
      get: async (endpoint: string) => {
        await new Promise(r => setTimeout(r, 200));
        if (endpoint.includes('user')) {
          return {
            status: 200,
            data: [
              { id: 1, nama: 'Budi', role: 'Frontend' },
              { id: 2, nama: 'Siti', role: 'UI/UX' }
            ]
          };
        }
        return { status: 200, data: { info: `Sukses mengambil data dari ${endpoint}` } };
      },
      post: async (endpoint: string, payload: any) => {
        await new Promise(r => setTimeout(r, 250));
        return {
          status: 201,
          message: 'Data berhasil diterima dan diproses oleh server!',
          payloadDiterima: payload,
          waktu: new Date().toLocaleTimeString('id-ID')
        };
      }
    };

    try {
      // Async execution sandbox
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const fn = new AsyncFunction('console', 'mockApi', 'JSON', currentCode);
      await fn(customConsole, mockApi, JSON);
      outputLogs = logs;
      isSuccess = true;
    } catch (err: any) {
      outputLogs = logs;
      errorMessage = err?.message || String(err);
      isSuccess = false;
    } finally {
      isRunning = false;
    }
  }

  onMount(() => {
    createEditor();
  });

  onDestroy(() => {
    editorView?.destroy();
  });
</script>

<div class="playground-card" {id}>
  {#if title || description}
    <div class="playground-header">
      {#if title}
        <h4>{title}</h4>
      {/if}
      {#if description}
        <p class="playground-desc">{description}</p>
      {/if}
    </div>
  {/if}

  {#if challenge}
    <div class="challenge-box">
      <div class="challenge-label">
        <Sparkles size={14} />
        <span>Coba Oprek Santai:</span>
      </div>
      <p>{challenge}</p>
    </div>
  {/if}

  <!-- Editor Container -->
  <div class="editor-wrapper">
    <div class="editor-toolbar">
      <div class="file-tab">
        <span class="dot"></span>
        <span>snippet.js</span>
      </div>
      <div class="toolbar-actions">
        <button
          type="button"
          class="btn-reset"
          onclick={resetCode}
          title="Kembalikan kode awal"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
        <button
          type="button"
          class="btn-run"
          class:running={isRunning}
          onclick={runCode}
          title="Jalankan kode (Ctrl+Enter)"
        >
          <Play size={13} fill="currentColor" />
          <span>{isRunning ? 'Menjalankan...' : 'Jalankan Kode'}</span>
        </button>
      </div>
    </div>

    <!-- CodeMirror mount element -->
    <div class="editor-host" bind:this={editorHostEl}>
      {#if !browser}
        <pre class="fallback-pre"><code>{initialCode}</code></pre>
      {/if}
    </div>

    <!-- Terminal Output -->
    <div class="terminal-panel">
      <div class="terminal-header">
        <div class="terminal-title">
          <Terminal size={14} />
          <span>Terminal Output</span>
        </div>
        {#if hasRun}
          {#if isSuccess}
            <span class="badge success">
              <CheckCircle2 size={12} /> Sukses Dieksekusi
            </span>
          {:else}
            <span class="badge error">
              <AlertCircle size={12} /> Ada Error
            </span>
          {/if}
        {/if}
      </div>

      <div class="terminal-body">
        {#if !hasRun}
          <div class="empty-terminal">
            Tekan tombol <strong>"Jalankan Kode"</strong> (atau Ctrl+Enter) untuk melihat hasilnya di sini.
          </div>
        {:else if errorMessage}
          <div class="error-msg">
            <span class="err-prefix">❌ Error:</span>
            <code>{errorMessage}</code>
          </div>
          {#if outputLogs.length > 0}
            <div class="partial-logs">
              <span class="partial-label">Output sebelum error:</span>
              {#each outputLogs as log}
                <div class="log-line {log.type}">
                  <span class="prompt-symbol">&gt;</span>
                  <pre>{log.text}</pre>
                </div>
              {/each}
            </div>
          {/if}
        {:else if outputLogs.length === 0}
          <div class="empty-terminal success-empty">
            Program berjalan sukses tanpa console.log.
          </div>
        {:else}
          <div class="log-entries">
            {#each outputLogs as log}
              <div class="log-line {log.type}">
                <span class="prompt-symbol">&gt;</span>
                <pre>{log.text}</pre>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .playground-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-line);
    border-radius: 10px;
    padding: 1.25rem;
    margin: 1.5rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }

  .playground-header {
    margin-bottom: 0.75rem;
  }

  .playground-header h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1.15rem;
    color: var(--color-binder);
  }

  .playground-desc {
    margin: 0;
    font-size: 0.92rem;
    color: var(--color-ink-muted);
    line-height: 1.5;
  }

  .challenge-box {
    background: var(--color-surface-soft);
    border-left: 3px solid #27ae60;
    border-radius: 0 6px 6px 0;
    padding: 0.6rem 0.85rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .challenge-label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 700;
    color: #27ae60;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin-bottom: 0.2rem;
  }

  .challenge-box p {
    margin: 0;
    color: var(--color-ink);
  }

  /* Editor Wrapper (Light Mode) */
  .editor-wrapper {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--color-line, #e8dcc8);
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(139, 69, 19, 0.05);
  }

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-surface-soft, #faf7f0);
    padding: 0.45rem 0.85rem;
    border-bottom: 1px solid var(--color-line, #e8dcc8);
  }

  .file-tab {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--color-ink-muted, #6d4c41);
    font-family: var(--font-mono, monospace);
    font-size: 0.82rem;
    font-weight: 600;
  }

  .file-tab .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e67e22;
  }

  .toolbar-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-reset {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    background: #ffffff;
    color: var(--color-ink, #2c3e50);
    border: 1px solid var(--color-line, #e8dcc8);
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-reset:hover {
    background: var(--color-surface-muted, #f5e6c8);
    border-color: var(--color-binder, #8b4513);
  }

  .btn-run {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.85rem;
    background: #27ae60;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-run:hover:not(.running) {
    background: #2ecc71;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(39, 174, 96, 0.25);
  }

  .btn-run.running {
    opacity: 0.7;
    cursor: wait;
  }

  .editor-host {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
  }

  .fallback-pre {
    margin: 0;
    padding: 1rem;
    background: #ffffff;
    color: var(--color-ink, #2c3e50);
    font-family: var(--font-mono, monospace);
    font-size: 0.85rem;
  }

  /* Terminal Panel (Light Mode) */
  .terminal-panel {
    background: #fbf9f5;
    border-top: 1px solid var(--color-line, #e8dcc8);
    font-family: var(--font-mono, monospace);
    font-size: 0.85rem;
  }

  .terminal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.85rem;
    background: #f5efe4;
    border-bottom: 1px solid var(--color-line, #e8dcc8);
    color: var(--color-ink-muted, #6d4c41);
    font-size: 0.78rem;
    font-weight: 600;
  }

  .terminal-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 600;
  }

  .badge.success {
    background: rgba(39, 174, 96, 0.12);
    color: #1e8449;
    border: 1px solid rgba(39, 174, 96, 0.25);
  }

  .badge.error {
    background: rgba(231, 76, 60, 0.12);
    color: #c0392b;
    border: 1px solid rgba(231, 76, 60, 0.25);
  }

  .terminal-body {
    padding: 0.75rem 0.85rem;
    min-height: 50px;
    max-height: 220px;
    overflow-y: auto;
    color: var(--color-ink-strong, #3d2b1f);
  }

  .empty-terminal {
    color: var(--color-ink-muted, #8c786a);
    font-size: 0.82rem;
    font-style: italic;
  }

  .empty-terminal.success-empty {
    color: #1e8449;
  }

  .log-entries {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .log-line {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    line-height: 1.45;
  }

  .prompt-symbol {
    color: #2980b9;
    font-weight: 700;
    user-select: none;
  }

  .log-line pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: inherit;
    font-size: inherit;
    color: var(--color-ink, #2c3e50);
  }

  .error-msg {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background: #fdf2f2;
    border-left: 3px solid #e74c3c;
    padding: 0.5rem 0.75rem;
    border-radius: 0 4px 4px 0;
    color: #c0392b;
  }

  .err-prefix {
    font-weight: 700;
    font-size: 0.8rem;
  }

  .error-msg code {
    white-space: pre-wrap;
    font-size: 0.82rem;
    color: #c0392b;
  }

  .partial-logs {
    margin-top: 0.5rem;
    border-top: 1px dashed var(--color-line, #e8dcc8);
    padding-top: 0.5rem;
  }

  .partial-label {
    display: block;
    color: var(--color-ink-muted, #6d4c41);
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
</style>
