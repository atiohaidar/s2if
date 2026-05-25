<style>
/* =============================================================================
   CSS STYLING - IEEE CONFERENCE 2-COLUMN PAPER (SIMULASI PDF PRESISI)
   =============================================================================
   CSS ini dirancang khusus untuk mereplikasi IEEE Conference Paper resmi
   berdasarkan gambar contoh yang diberikan.
*/

body {
    background-color: #525659 !important; /* Latar belakang abu-abu khas PDF Reader */
    margin: 0 !important;
    padding: 30px 0 !important;
}

.ieee-page, 
.ieee-page * {
    font-family: "Times New Roman", Times, serif !important;
}

/* Link/Tautan */
.ieee-page a {
    color: #000000 !important;
    text-decoration: none !important;
}
.ieee-page a:hover {
    text-decoration: underline !important;
}

/* Simulasi Halaman Kertas Fisik IEEE */
.ieee-page {
    background: #ffffff !important;
    width: 8.5in;
    min-height: 11in;
    margin: 0 auto !important;
    padding: 0.75in 0.625in 1.0in 0.625in !important; /* Margin IEEE: Top 0.75", Bottom 1.0", Left/Right 0.625" */
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    box-sizing: border-box;
    color: #000000 !important;
    font-size: 10pt;
    line-height: 1.12;
}

/* Judul Utama (Conference Paper Title) */
.ieee-title {
    font-size: 24pt;
    font-weight: normal;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 5px;
    line-height: 1.15;
}

.ieee-subtitle {
    text-align: center;
    font-size: 10pt;
    font-style: italic;
    margin-bottom: 24px;
    color: #333333;
}

/* Bagian Penulis (Grid Layout 3 Kolom) */
.ieee-authors-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    text-align: center;
    margin-bottom: 24px;
    font-size: 10pt;
}

.ieee-author {
    margin-bottom: 12px;
}

.ieee-author-name {
    font-size: 11pt;
    font-weight: normal;
}

.ieee-author-aff {
    font-style: italic;
    font-size: 10pt;
    line-height: 1.2;
}

/* Layout 2 Kolom untuk Konten Utama (Dimulai tepat di bawah Penulis) */
.ieee-columns {
    column-count: 2;
    column-gap: 0.25in;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
}

/* Bagian Abstrak (Berada di Kolom Pertama Kiri, Tebal, 9pt, TANPA indentasi) */
.ieee-abstract-section {
    font-size: 9pt;
    text-align: justify;
    line-height: 1.25;
    margin-bottom: 15px;
    text-indent: 0 !important; /* Abstrak tidak boleh menjorok */
}

.ieee-abstract-title {
    font-weight: bold;
    font-style: italic;
}

.ieee-abstract-text {
    font-weight: bold;
}

.ieee-keywords-title {
    font-weight: bold;
    font-style: italic;
}

.ieee-keywords-text {
    font-weight: bold;
}

/* Aturan Indentasi Paragraf IEEE (SEMUA paragraf di bawah bab wajib menjorok rata 1.5em) */
.ieee-columns p {
    text-indent: 1.5em !important; /* Sesuai standar resmi IEEE, paragraf pertama maupun kedua dst memiliki tab masuk yang sama */
    margin-top: 0 !important;
    margin-bottom: 0 !important; /* Rapat vertikal */
    text-align: justify;
}

/* Elemen khusus yang dikecualikan dari tab masuk (no-indent) */
.ieee-columns .no-indent {
    text-indent: 0 !important;
}

/* Heading 1 Romawi (I. INTRODUCTION) - Centered, All Caps, Bold */
.ieee-columns h2 {
    font-variant: small-caps;
    text-align: center;
    font-size: 10pt;
    font-weight: normal;
    margin-top: 15px !important;
    margin-bottom: 6px !important;
    border: none !important;
    padding: 0;
    line-height: 1.2;
    color: #000000 !important;
    break-after: avoid;
    -webkit-column-break-after: avoid;
    page-break-after: avoid;
}

/* Heading 2 Abjad (A. Maintaining...) - Italic, Left Aligned */
.ieee-columns h3 {
    font-size: 10pt;
    font-style: italic;
    font-weight: normal;
    text-align: left;
    text-indent: 0 !important; /* Sub-bab tetap rapat kiri */
    margin-top: 10px !important;
    margin-bottom: 4px !important;
    line-height: 1.2;
    color: #000000 !important;
    break-after: avoid;
    -webkit-column-break-after: avoid;
    page-break-after: avoid;
}

/* List Poin (Bullet List) */
.ieee-columns ul, .ieee-columns ol {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-left: 15px;
}
.ieee-columns li {
    margin-bottom: 0 !important;
    text-indent: 0;
    font-size: 9.5pt;
}

/* Tabel Standar IEEE */
.ieee-table-container {
    text-align: center;
    margin: 12px 0;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
}
.ieee-table-title {
    font-size: 8pt;
    font-variant: small-caps;
    text-align: center;
    text-indent: 0;
    margin-bottom: 4px;
}
.ieee-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
    margin: 0 auto;
    border: none !important;
}
.ieee-table th {
    text-align: center;
    padding: 4px 2px;
    border-top: 1.5px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-weight: bold;
}
.ieee-table td {
    padding: 4px 2px;
    border: none !important;
}
.ieee-table tr.last-row td {
    border-bottom: 1.5px solid #000 !important;
}

/* Gambar Standar IEEE */
.ieee-figure-container {
    text-align: center;
    margin: 12px 0;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
}
.ieee-figure-placeholder {
    width: 100%;
    height: 100px;
    background-color: #eee;
    border: 0.5px solid #ccc;
    text-align: center;
    line-height: 100px;
    font-size: 8pt;
    color: #555;
    font-style: italic;
}
.ieee-figure-caption {
    font-size: 8pt;
    text-align: justify;
    text-indent: 0;
    margin-top: 5px;
    line-height: 1.1;
}

/* Heading References */
.ieee-columns h2.references-heading {
    margin-top: 18px !important;
    font-variant: small-caps;
    text-align: center;
}

/* Spacing Daftar Pustaka */
.references-list {
    font-size: 8pt;
    line-height: 1.2;
    margin-top: 8px;
}
.references-list p {
    text-indent: -1.5em !important;
    padding-left: 1.5em !important;
    margin-bottom: 4px !important;
}

/* Footnote Kiri Bawah */
.ieee-footnote {
    border-top: 0.5px solid #000;
    padding-top: 4px;
    margin-top: 20px;
    font-size: 8pt;
    width: 48%; /* Menempati kolom kiri saja */
}

/* Styling inline code blocks agar serasi dengan kertas putih */
.ieee-page code {
    font-family: Consolas, Monaco, "Courier New", Courier, monospace !important;
    background-color: #f4f4f4 !important;
    color: #222222 !important;
    padding: 1px 4px !important;
    border-radius: 3px !important;
    border: 1px solid #dddddd !important;
    font-size: 9pt !important;
}

/* Penyesuaian Media Cetak (Print & PDF Export) */
@media print {
    body {
        background-color: #ffffff !important;
        background: none !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    .ieee-page {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
        box-shadow: none !important;
        background: #ffffff !important;
    }
    @page {
        size: letter;
        margin: 0.75in !important;
    }
}
</style>

<div class="ieee-page">

<!-- ================= JUDUL UTAMA ================= -->
<div class="ieee-title">S2IF Notebook: An Interactive and Media-Synchronized Study Companion for Postgraduate Computer Science Curriculum</div>
<div class="ieee-subtitle">A SvelteKit-Powered Static Platform Integrating Bidirectional Video-to-Text Sync and Persistent Client-Side Text Annotation</div>

<!-- ================= BLOK PENULIS (GRID 2 KOLOM KUSTOM) ================= -->
<div class="ieee-authors-grid" style="grid-template-columns: repeat(1, 1fr); max-width: 600px; margin: 0 auto 24px auto;">
 
 
   <div class="ieee-author">
    <div class="ieee-author-name"><b>Tio Haidar Hanif</b></div>
    <div class="ieee-author-aff">
      Bandung, Indonesia<br>
        atiohaidar@gmail.com
    </div>
  </div>
</div>

<!-- ================= AREA KOLOM GANDA (DIMULAI LANGSUNG DI BAWAH PENULIS) ================= -->
<div class="ieee-columns">

<!-- ================= KOTAK ABSTRAK (BERADA DI KOLOM PERTAMA SEBELAH KIRI) ================= -->
<div class="ieee-abstract-section">
    <span class="ieee-abstract-title"><i>Abstract</i>—</span><span class="ieee-abstract-text">Postgraduate education in computer science demands high cognitive engagement, often requiring students to analyze complex theoretical concepts alongside long hours of recorded video lectures. Traditional learning interfaces separate static lecture notes from video streams, inducing high cognitive switching costs. This paper presents S2IF Notebook, a high-fidelity web-based learning platform tailored for the Master of Informatics (S2IF) curriculum. S2IF Notebook bridges static documents and dynamic lecture streams through: (1) a retro notebook-style physical binder layout optimized for low-fatigue reading, (2) a bidirectional media-to-text synchronization engine that aligns lecture timelines with notes, (3) a client-side persistent text annotator utilizing DOM range manipulation and local storage persistence, and (4) an automated content validation pipeline featuring topological cycle detection to prevent cyclic prerequisites. We describe the architectural design, algorithmic synchronization, and validation engines that form this robust study companion.</span>
    <br><br>
    <span class="ieee-keywords-title"><i>Index Terms</i>—</span><span class="ieee-keywords-text">SvelteKit, Master of Informatics (S2IF), Bidirectional Video-Sync, Client-Side Text Annotation, Content Validation Engine, DFS Acyclic Graph</span>
</div>

## I. Introduction

Postgraduate courses in computer science, such as Advanced Algorithms (*Desain Algoritma Lanjut*), Advanced Artificial Intelligence (*Kecerdasan Buatan Lanjut*), and Research Methodology (*Metodologi Riset*), involve dense, multi-faceted concepts that span mathematical formulation, implementation, and video lectures. Managing this learning flow creates a high cognitive load when students are forced to constantly context-switch between media players, code editors, and static reading files.

To resolve this friction, we introduce **S2IF Notebook**, a unified, client-side reactive application built specifically to organize and sync Master of Informatics (S2IF) course materials. Designed around a responsive retro notebook/sketch aesthetic, the platform combines standard note-taking with deep interactive widgets and state synchronization, bringing static text to life.

## II. Platform Architecture and Design System

S2IF Notebook is implemented using **SvelteKit** as a modern component framework, utilizing a client-side static compilation adapter (`@sveltejs/adapter-static`) for lightweight and fast deployment. The application styles are constructed using a custom design system inside a centralized `app.css`, maintaining a premium retro paper-bound aesthetic.

The styling is defined using structural CSS custom properties such as `--color-binder` (mimicking a leather ring binder at saddlebrown `#8b4513`) and `--color-surface` (representing natural textured paper background at `#faf7f0`). The custom layout uses handwriting typographies, structured grids, and sticker badges (`Sticker.svelte`) to deliver a visual experience resembling a physical laboratory book. This visual motif is deliberately engineered to provide a soothing, low-fatigue environment suitable for long study sessions.

## III. Core Interactive Systems

### A. Bidirectional Video-to-Text Synchronization
One of the most complex features of the S2IF Notebook is the bidirectional time-sync engine composed of the `VideoSidebar.svelte` panel and the `VideoSyncArticle.svelte` wrapper. The YouTube IFrame API is loaded dynamically, preventing page-load blocking.

The synchronization operates bidirectionally:
1) *Video-to-Text Sync:* When a lecture video plays, it emits events containing the elapsed duration in seconds. The parent wrapper evaluates this time against an array of timecode ranges defined in a metadata structure (`sectionMap`). When a match is found, Svelte injects a highlight class (`video-highlight`) to the active section, drawing the student's eyes to the exact corresponding paragraph, and smoothly scrolls it to the center of the viewport.
2) *Text-to-Video Sync:* Embedded text timestamp badges allow the student to click time anchors (e.g., `0:03 Intro`) directly within the notes. This triggers a delegative click handler, parsing the timestamp string and commanding the video player to seek instantly to the target second.
3) *Scroll Conflict Management:* To prevent visual thrashing if a student manually scrolls the page while the video is playing, the component tracks manual scroll offsets. It suspends auto-scrolling immediately upon user scroll detection, and displays a floating HUD button labeled **'Ikuti Video Lagi'** (Re-sync to Video) so the user can easily restore tracking.

### B. Client-Side Persistent Annotator
The S2IF Notebook integrates a client-side persistent highlighter and comment annotator in `InlineAnnotator.svelte`.

When a user selects text within the `.note-article` block, the annotator intercepts native `selectionchange` events. It displays a floating context toolbar exactly above the selected region, offering:
* Multi-colored highlights in five distinct HSL tailored colors (Yellow, Blue, Green, Purple, and Red).
* Sticky note attaching (inline comment annotations).
* Quick clipboard copying.

Technically, once a highlight color is chosen, the annotator retrieves the exact selection range and executes a native DOM split text node routine (`splitText`). It wraps the target text segment inside a `<mark>` node with the custom annotation ID and color classes. Any sticky note commentaries are persisted inside a structured JSON array within the browser's `localStorage`, dynamically keyed by the page's route path. This ensures all highlights and sticky notes survive page refreshes and route transitions.

## IV. Data Pipeline and CLI Validation Engine

### A. Manifest-Driven Topic Discovery
Rather than relying on database queries or slow runtime lookups, the platform uses a manifest-driven architecture. Every topic directory (e.g., `src/routes/[semester]/[subject]/[slug]`) contains a `topic.manifest.ts` file declaring structural metadata (slug, title, summary, prereq, tags, order, type, renderMode). At build time, SvelteKit utilizes Vite's eager glob pattern scanner `import.meta.glob` to inspect these manifests in a single pass (`discovery.ts`), dynamically constructing the curriculum hierarchy and global indexes in-memory.


### B. Automated CLI Validation Engine
Maintaining data integrity across multiple academic topics can be error-prone. S2IF Notebook employs a robust, custom validation pipeline (`validate-content.ts` and `sync-indexes.ts`) executing key checks:
1) *Uniqueness Constraints:* Enforces that semester IDs, semester order indexes, and subject keys are strictly unique.
2) *Layout-Manifest Consistency:* Parses Svelte route files (`+page.svelte`) via regular expressions to verify that the visual header `<NoteHeader title="..." />` matches the title declared in `topic.manifest.ts` perfectly.
3) *Acyclic Prerequisite Validation:* Topics can declare prerequisite slugs. The validator constructs a directed dependency graph of the curriculum and executes a **Depth-First Search (DFS) topological cycle-detection algorithm**. If a prerequisite loop is found, it raises a compilation error, preventing cyclic dependency traps.

This validation process runs prior to Svelte compiler checks, ensuring content issues are detected before any production compilation.

<div class="ieee-table-container">
    <div class="ieee-table-title">Table I<br>Validation CLI Pipeline Helper Test Cases</div>
    <table class="ieee-table">
        <thead>
            <tr>
                <th style="text-align: left;">Script Name</th>
                <th>Target Function</th>
                <th>Test Case Purpose</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align: left;">validate-content.ts</td>
                <td>hasDuplicates()</td>
                <td>Detects duplicates in arrays</td>
                <td>Passed</td>
            </tr>
            <tr>
                <td style="text-align: left;">validate-content.ts</td>
                <td>findCycle()</td>
                <td>Returns null for acyclic graph</td>
                <td>Passed</td>
            </tr>
            <tr>
                <td style="text-align: left;">validate-content.ts</td>
                <td>findCycle()</td>
                <td>Detects circular prerequisites</td>
                <td>Passed</td>
            </tr>
            <tr>
                <td style="text-align: left;">sync-indexes.ts</td>
                <td>toTitleFromSlug()</td>
                <td>Converts hyphenated slug to title</td>
                <td>Passed</td>
            </tr>
            <tr class="last-row">
                <td style="text-align: left;">sync-indexes.ts</td>
                <td>serializeArray()</td>
                <td>Serializes tags with safe quotes</td>
                <td>Passed</td>
            </tr>
        </tbody>
    </table>
</div>

## V. Reusable Component Suite

S2IF Notebook includes a rich library of reusable Svelte components designed to enrich text notes:
*   **`Quiz.svelte`**: Renders multiple-choice questions with real-time score calculation, immediate option checking, and detailed explanations to reinforce understanding.
*   **`CodeBlock.svelte`**: A syntax-highlighted code viewer powered by CodeMirror and PrismJS, supporting clean copy-paste actions and language markers.
*   **`MathBlock.svelte`**: Utilizes KaTeX to render complex mathematical formulas in standard LaTeX formatting.
*   **`Callout.svelte`**: Renders alerts (tip, warning, info, danger) inside beautiful callout boxes.

These components are fully utilized across S2IF subjects to provide students with high-fidelity, interactive representations of advanced computing curricula.

## VI. Conclusion

S2IF Notebook successfully bridges the gap between static lecture notes and dynamic video streams for postgraduate computer science students. By introducing bidirectional timeline synchronization, persistent client-side annotations, a retro physical layout, and an automated CLI validation pipeline with cycle detection, the system provides a robust and focused environment for learning complex academic subjects. All these components are strictly integrated without external dependencies, showcasing the efficiency of modern SvelteKit development.

<h2 class="references-heading">References</h2>

<div class="references-list">

<p>[1] S2IF Developer Guidelines, “Panduan Standardisasi Penulisan dan Penambahan Materi Kuliah Baru,” *S2IF Workspace Docs*, 2026. [Online]. Available: <a href="./Tambah-Materi.md">Tambah-Materi.md</a></p>

<p>[2] S2IF Developer Guidelines, “Sintaks Markdown, KaTeX Math, dan Callout Reference,” *S2IF Workspace Docs*, 2026. [Online]. Available: <a href="./Tambah-Materi-Reference.md">Tambah-Materi-Reference.md</a></p>

<p>[3] S2IF Developer Guidelines, “Integrasi Video YouTube dan Tag Sinkronisasi Timestamp Detik,” *S2IF Workspace Docs*, 2026. [Online]. Available: <a href="./Tambah-Video-Sync.md">Tambah-Video-Sync.md</a></p>

<p>[4] S2IF Academic Resources, “Panduan dan Metode Mengkritisi Paper Ilmiah secara Komprehensif,” *S2IF Reference Library*, 2026. [Online]. Available: <a href="./sumber-referensi/panduan-mengkritisi-paper.md">panduan-mengkritisi-paper.md</a></p>

<p>[5] S2IF Study Companion Guides, “Strategi dan Metode Fokus Belajar Berjam-jam: 7+ Tips Efektif,” *S2IF Reference Library*, 2026. [Online]. Available: <a href="./sumber-referensi/Cara%20fokus%20belajar%20berjam-jam%20(7+%20tips%20efektif).md">Cara fokus belajar berjam-jam.md</a></p>

</div>

</div>

<!-- ================= FOOTNOTE ================= -->
<div class="ieee-footnote">
  *Identify applicable funding agency here. If none, delete this.
</div>

</div>
