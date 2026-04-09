<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
</script>

<svelte:head>
    <title>AI Searching dan Visualisasi Tree - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="AI Searching: Jenis dan Contoh Visualisasi Tree"
        date="09 April 2026"
        status="done"
        tags={["Search", "Tree"]}
    />

    <NoteSection title="Konsep Search Tree">
        <p>
            Search tree digunakan untuk merepresentasikan semua kemungkinan
            langkah dari sebuah masalah. Setiap node adalah state, dan setiap
            edge adalah aksi.
        </p>
        <ul>
            <li><strong>Root</strong>: state awal.</li>
            <li><strong>Child</strong>: state hasil aksi dari parent.</li>
            <li><strong>Goal node</strong>: state tujuan yang ingin dicapai.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Macam-Macam Search di AI">
        <ol>
            <li><strong>Blind Search</strong> (tanpa heuristic): BFS, DFS, UCS.</li>
            <li><strong>Informed Search</strong> (pakai heuristic): Greedy, A*.</li>
            <li><strong>Adversarial Search</strong>: Minimax, Alpha-Beta.</li>
            <li><strong>Metaheuristic Search</strong>: GA, SA, ACO, PSO.</li>
        </ol>
    </NoteSection>

    <NoteSection title="Contoh Visualisasi Tree Pencarian">
        <p>
            Misalkan kita ingin mencari node tujuan <strong>G</strong> dari
            root <strong>S</strong>:
        </p>

        <div class="tree-wrap" aria-label="Visualisasi tree pencarian sederhana">
            <div class="tree-level">
                <div class="node root">S</div>
            </div>

            <div class="tree-lines">
                <span></span>
            </div>

            <div class="tree-level level-2">
                <div class="node">A</div>
                <div class="node">B</div>
                <div class="node">C</div>
            </div>

            <div class="tree-lines triple">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div class="tree-level level-3">
                <div class="node">D</div>
                <div class="node">E</div>
                <div class="node">F</div>
                <div class="node goal">G</div>
                <div class="node">H</div>
                <div class="node">I</div>
            </div>
        </div>

        <p>
            Jika menggunakan BFS, node diperiksa per level: S, A-B-C, lalu D-E-F-G...
            sehingga G ditemukan lebih cepat untuk kasus goal yang dangkal.
        </p>

        <Callout type="tip">
            Visualisasi tree membantu membandingkan perilaku algoritma: mana yang
            hemat memori, mana yang cepat menemukan goal, dan mana yang optimal.
        </Callout>
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .tree-wrap {
        margin: 1rem 0 1.5rem;
        padding: 1rem;
        background: #fff;
        border: 1px solid var(--color-line);
        border-radius: 10px;
    }

    .tree-level {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .tree-level.level-2 {
        gap: 3rem;
    }

    .tree-level.level-3 {
        gap: 1.2rem;
    }

    .node {
        min-width: 42px;
        height: 42px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        font-weight: 700;
        background: #f8efe4;
        border: 1px solid #c9a67a;
        color: #5a4331;
    }

    .node.root {
        background: #ffe8cc;
        border-color: #b7772f;
    }

    .node.goal {
        background: #dff2bf;
        border-color: #6b9b37;
        color: #2f5d12;
    }

    .tree-lines {
        display: flex;
        justify-content: center;
        margin: 0.25rem 0 0.5rem;
    }

    .tree-lines span {
        display: block;
        width: 2px;
        height: 16px;
        background: #b8a08b;
    }

    .tree-lines.triple {
        gap: 7.2rem;
    }

    @media (max-width: 720px) {
        .tree-level.level-2 {
            gap: 1.2rem;
        }

        .tree-lines.triple {
            gap: 2.2rem;
        }
    }
</style>
