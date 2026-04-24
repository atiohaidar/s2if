<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
    import InformedSearchVisualizer from "./components/InformedSearchVisualizer.svelte";
</script>

<svelte:head>
    <title>Informed Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Informed (Heuristic) Search"
        date="24 April 2026"
        status="done"
        tags={["Heuristic", "A*", "Hill Climbing", "Local Search"]}
    />

    <NoteSection title="Konsep Heuristik h(n)">
        <p class="section-intro">
            <strong>Informed Search</strong> menggunakan fungsi heuristik <em>h(n)</em> untuk memperkirakan biaya termurah dari node n ke goal.
        </p>
        <div class="h-card">
            <div class="h-formula">h(n)</div>
            <div class="h-desc">
                <p>Estimasi biaya dari node <strong>n</strong> ke <strong>Goal</strong>.</p>
                <ul>
                    <li><strong>Admissible:</strong> Estimasi &le; biaya asli (tidak pernah overestimate). Menjamin solusi optimal.</li>
                    <li><strong>Consistency:</strong> Biaya antar node konsisten dengan h (penting untuk graph dengan cycle).</li>
                </ul>
            </div>
        </div>
        <Callout type="tip">
            <strong>💡 Penjelasan Simpel:</strong> Heuristik itu seperti "feeling" atau tebakan jarak. 
            <strong>Admissible</strong> artinya tebakan Anda tidak boleh "lebay" (misal: jarak asli 10km, Anda tebak 15km). Anda harus selalu menebak sama atau lebih kecil dari aslinya agar algoritma tidak sengaja mengabaikan jalan pintas yang sebenarnya bagus.
        </Callout>
    </NoteSection>

    <NoteSection title="1. Hill Climbing & Search Landscapes">
        <p>Hill Climbing adalah strategi <em>greedy</em> lokal. Namun, keberhasilannya sangat bergantung pada bentuk permukaan (landscape) masalah.</p>
        
        <div class="landscape-grid">
            <div class="landscape-item">
                <div class="l-icon">🌊</div>
                <strong>Multimodal</strong>
                <p>Banyak puncak lokal yang bisa menjebak.</p>
            </div>
            <div class="landscape-item">
                <div class="l-icon">⛰️</div>
                <strong>Rugged</strong>
                <p>Permukaan kasar, sulit menentukan arah daki.</p>
            </div>
            <div class="landscape-item">
                <div class="l-icon">🎭</div>
                <strong>Deceptive</strong>
                <p>Jalur yang terlihat bagus malah menjauh dari goal.</p>
            </div>
            <div class="landscape-item">
                <div class="l-icon">💀</div>
                <strong>Nightmare</strong>
                <p>Kombinasi semua masalah di atas.</p>
            </div>
        </div>

        <div class="simple-breakdown">
            <p><strong>Kenapa Hill Climbing bisa gagal?</strong> Bayangkan Anda mendaki gunung di tengah kabut tebal. Anda hanya bisa melihat tanah di bawah kaki Anda. Jika Anda sampai di sebuah bukit kecil, Anda akan mengira itu adalah puncak tertinggi (Local Maxima), padahal puncak aslinya ada di gunung sebelah yang lebih tinggi.</p>
        </div>

        <div class="hc-variants">
            <div class="v-box">
                <h4>Simple Hill Climbing</h4>
                <p>Ambil tetangga lebih baik yang pertama kali ketemu.</p>
            </div>
            <div class="v-box">
                <h4>Steepest-Ascent HC</h4>
                <p>Cek <strong>semua</strong> tetangga, pilih yang peningkatannya paling tajam.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="2. Simulated Annealing (SA)">
        <p>SA mengatasi kelemahan Hill Climbing dengan mengizinkan langkah "buruk" di awal pencarian untuk keluar dari <em>local optima</em>.</p>
        <div class="sa-formula">
            <div class="formula-box">P = e<sup>-ΔE / T</sup></div>
            <div class="formula-note">
                <p><strong>ΔE:</strong> Seberapa buruk langkah tersebut.</p>
                <p><strong>T (Temperature):</strong> Kontrol eksplorasi.</p>
            </div>
        </div>
        <Callout type="info">
            <strong>💡 Penjelasan Simpel:</strong> SA itu seperti orang yang lagi "galau" di awal. Karena <strong>T (Suhu)</strong> masih tinggi, dia berani mencoba jalan yang kelihatannya salah (eksplorasi). Seiring berjalannya waktu (Suhu mendingin), dia jadi semakin serius dan hanya mau mengambil jalan yang benar-benar bagus (eksploitasi).
        </Callout>
    </NoteSection>

    <NoteSection title="3. Best-First Search (Konsep Umum)">
        <p>Menggunakan <code>OPEN</code> (kandidat) dan <code>CLOSED</code> (sudah dievaluasi) list untuk melacak pencarian.</p>
        <div class="method-box">
            <h4>Analogi Daftar Belanja:</h4>
            <ul>
                <li><strong>OPEN:</strong> Daftar toko yang ingin Anda datangi tapi belum sempat.</li>
                <li><strong>CLOSED:</strong> Daftar toko yang sudah Anda masuki dan cek harganya.</li>
            </ul>
        </div>
        
        <CodeBlock
            language="python"
            code={`import heapq

def best_first_search(graph, start, goal, evaluation_func):
    # Priority Queue: menyimpan (skor_evaluasi, node_saat_ini, biaya_jalan)
    pq = [(evaluation_func(start, 0), start, 0)]
    visited = set()
    
    while pq:
        f_val, current, g_val = heapq.heappop(pq)
        if current == goal: return "Sukses!"
        
        visited.add(current)
        for neighbor, cost in graph[current]:
            if neighbor not in visited:
                new_g = g_val + cost
                heapq.heappush(pq, (evaluation_func(neighbor, new_g), neighbor, new_g))`}
        />

        <p><strong>Greedy BFS:</strong> f(n) = h(n). Hanya melihat "feeling" ke depan tanpa peduli sudah seberapa jauh dia jalan.</p>
        <InformedSearchVisualizer algorithm="Greedy" />
    </NoteSection>

    <NoteSection title="4. A* Search & Kontur Biaya">
        <p>A* menggabungkan masa lalu dan masa depan: <strong>f(n) = g(n) + h(n)</strong>.</p>
        <div class="f-contour-explanation">
            <p><strong>Visualisasi Kontur (f-contours):</strong></p>
            <p>Bayangkan Anda menumpahkan air di lantai yang tidak rata. Air akan mengisi area yang paling rendah dulu sebelum meluap ke area yang lebih tinggi. A* bekerja persis seperti itu; dia mengeksplorasi area dengan total biaya (f) terendah dulu, sehingga pencariannya terlihat "terarah" menuju goal, bukan menyebar ke segala arah seperti BFS.</p>
        </div>
        
        <CodeBlock
            language="python"
            code={`# Implementasi A* dalam skema Best-First
def a_star(graph, start, goal, h):
    # evaluation_func = g(n) + h(n)
    return best_first_search(graph, start, goal, lambda n, g: g + h(n))`}
        />
        
        <InformedSearchVisualizer algorithm="AStar" />
    </NoteSection>

    <NoteSection title="Studi Kasus: 8-Puzzle Heuristics">
        <p>Contoh pemodelan heuristik pada permainan puzzle angka:</p>
        <div class="puzzle-grid">
            <div class="puzzle-card">
                <strong>h1: Misplaced Tiles</strong>
                <p>Menghitung jumlah ubin yang tidak berada di posisi target.</p>
                <div class="badge">Sederhana</div>
            </div>
            <div class="puzzle-card">
                <strong>h2: Manhattan Distance</strong>
                <p>Menghitung total jarak pergeseran vertikal & horizontal setiap ubin ke target.</p>
                <div class="badge-blue">Lebih Efektif</div>
            </div>
        </div>
        <div class="formula-list">
            <div class="formula-item">
                <strong>Euclidean Distance:</strong>
                <code>d = √((x₂-x₁)² + (y₂-y₁)²)</code>
            </div>
            <div class="formula-item">
                <strong>Manhattan Distance:</strong>
                <code>d = |x₂-x₁| + |y₂-y₁|</code>
            </div>
        </div>
        <Callout type="info">
            Heuristik yang memberikan nilai lebih besar (namun tetap admissible) disebut <strong>dominating</strong> karena akan mengeksplorasi lebih sedikit node.
        </Callout>
    </NoteSection>

    <NoteSection title="Memory-Bounded Search (Solusi Hemat RAM)">
        <div class="variants-grid">
            <div class="v-card">
                <strong>IDA*</strong>
                <p><strong>Logika:</strong> Lakukan pencarian mendalam (DFS) berkali-kali. Jika mentok karena biaya terlalu mahal, ulangi lagi dengan batas biaya yang lebih longgar.</p>
            </div>
            <div class="v-card">
                <strong>SMA*</strong>
                <p><strong>Logika:</strong> Gunakan semua RAM yang ada. Kalau sudah penuh, hapus jalur yang paling gak menjanjikan. Tapi "catat" skornya supaya kalau ternyata jalur lain lebih busuk, kita bisa balik lagi ke sini.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Tabel Perbandingan Performa">
        <div class="table-wrap">
            <table class="recap-table comparison">
                <thead>
                    <tr>
                        <th></th>
                        <th>Greedy BFS</th>
                        <th>A*</th>
                        <th>Hill Climbing</th>
                        <th>IDA*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Complete</strong></td>
                        <td class="cell-mid">Bisa Gagal</td>
                        <td class="cell-good">Yes</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes</td>
                    </tr>
                    <tr>
                        <td><strong>Optimal</strong></td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes*</td>
                        <td class="cell-bad">No</td>
                        <td class="cell-good">Yes*</td>
                    </tr>
                    <tr>
                        <td><strong>Memory</strong></td>
                        <td class="cell-bad">High (bᵐ)</td>
                        <td class="cell-bad">High (bᵈ)</td>
                        <td class="cell-good">O(1)</td>
                        <td class="cell-good">Low (O(bd))</td>
                    </tr>
                    <tr>
                        <td><strong>Time</strong></td>
                        <td class="cell-mid">Cepat</td>
                        <td class="cell-mid">Moderately Cepat</td>
                        <td class="cell-good">Sangat Cepat</td>
                        <td class="cell-bad">Eksponensial</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="table-footnote">*Optimal jika h(n) admissible. Indikator: <span class="dot-legend good"></span> Bagus | <span class="dot-legend mid"></span> Cukup | <span class="dot-legend bad"></span> Kurang</p>
    </NoteSection>

    <NoteSection title="Kuis Tantangan: Informed Search">
        <Quiz 
            title="Quiz Heuristic Search"
            questions={[
                {
                    question: "Manakah dari berikut ini yang merupakan karakteristik dari lanskap 'Deceptive' dalam Hill Climbing?",
                    options: ["Banyak puncak dengan tinggi yang sama.", "Permukaan sangat halus sehingga mudah daki.", "Jalur yang terlihat menuju puncak global ternyata menjebak ke puncak lokal yang jauh dari goal.", "Tidak ada puncak sama sekali."],
                    correctIndex: 2,
                    explanation: "Deceptive landscape memberikan petunjuk yang menyesatkan bagi algoritma lokal seperti Hill Climbing."
                },
                {
                    question: "Mengapa konsistensi (consistency) pada heuristik dianggap lebih kuat daripada admissibility?",
                    options: ["Karena konsistensi hanya berlaku untuk tree.", "Karena konsistensi menjamin f-value tidak pernah berkurang di sepanjang jalur, mencegah evaluasi ulang node pada graph.", "Karena konsistensi membolehkan overestimate.", "Konsistensi tidak diperlukan untuk A*."],
                    correctIndex: 1,
                    explanation: "Jika h bersifat konsisten, maka f(n) = g(n) + h(n) bersifat monoton, yang menjamin efisiensi optimal pada pencarian graph."
                },
                {
                    question: "Apa tujuan utama dari annealing schedule (penurunan T secara bertahap) dalam Simulated Annealing?",
                    options: ["Untuk mempercepat komputasi.", "Untuk mengubah algoritma dari eksplorasi acak menjadi eksploitasi jalur terbaik secara perlahan.", "Untuk menghemat memori.", "Untuk menghindari goal state."],
                    correctIndex: 1,
                    explanation: "Seiring mendinginnya temperatur, algoritma menjadi lebih selektif dan cenderung hanya menerima langkah yang benar-benar meningkatkan kualitas state."
                },
                {
                    question: "Dalam A*, apa yang dimaksud dengan ekspansi berdasarkan 'f-contours'?",
                    options: ["Ekspansi node secara acak.", "Ekspansi node dalam bentuk lapisan kedalaman.", "Ekspansi node yang memiliki nilai f yang sama atau mirip, membentuk batas pencarian yang terarah.", "Ekspansi hanya pada node leaf."],
                    correctIndex: 2,
                    explanation: "A* beroperasi seperti air yang mengalir mengisi area dengan biaya f terendah terlebih dahulu, membentuk kontur pencarian yang efisien."
                },
                {
                    question: "Manakah varian A* yang paling cocok digunakan jika RAM komputer sangat terbatas namun waktu bukan masalah utama?",
                    options: ["Standard A*", "Greedy BFS", "IDA*", "SMA*"],
                    correctIndex: 2,
                    explanation: "IDA* menggunakan memori linear O(bd) karena ia berbasis DFS, namun mengulang pencarian berkali-kali sehingga memakan waktu lebih lama."
                },
                {
                    question: "Algoritma lokal manakah yang memiliki karakteristik 'membandingkan semua tetangga'?",
                    options: ["Simple Hill Climbing", "Steepest-Ascent Hill Climbing", "Simulated Annealing", "Random Walk"],
                    correctIndex: 1,
                    explanation: "Steepest-Ascent HC melakukan evaluasi pada seluruh tetangga sebelum mengambil keputusan langkah terbaik."
                },
                {
                    question: "Apa yang dilakukan SMA* ketika memorinya penuh tetapi belum mencapai goal?",
                    options: ["Berhenti dan lapor failure.", "Menghapus node dengan nilai f terburuk dan mencatat nilainya pada ancestor node.", "Mengganti fungsi heuristik secara otomatis.", "Meningkatkan limit kedalaman."],
                    correctIndex: 1,
                    explanation: "SMA* bersifat forgetful namun informatif; ia membuang jalur buruk tapi tetap menyimpan 'kenangan' biayanya agar tidak tersesat nanti."
                },
                {
                    question: "Pada masalah 8-puzzle, manakah dari berikut ini yang merupakan heuristik yang TIDAK admissible?",
                    options: ["h(n) = 0", "h(n) = jumlah ubin salah posisi", "h(n) = jarak Manhattan", "h(n) = kuadrat jarak Manhattan"],
                    correctIndex: 3,
                    explanation: "Kuadrat jarak Manhattan dapat menghasilkan nilai yang jauh lebih besar dari biaya asli langkah (overestimate), sehingga melanggar syarat admissibility."
                },
                {
                    question: "Dalam formula Simulated Annealing P = e^(-ΔE/T), jika ΔE = 0 (kualitas state sama), berapakah probabilitas diterimanya state tersebut?",
                    options: ["0", "0.5", "1", "Tergantung T"],
                    correctIndex: 2,
                    explanation: "e^0 = 1. Artinya state dengan kualitas yang sama (atau lebih baik) selalu diterima."
                },
                {
                    question: "Syarat utama agar A* dijamin optimal pada GRAPH (bukan tree) adalah...",
                    options: ["h(n) harus Admissible", "h(n) harus Konsisten (Consistent)", "Branching factor harus tak hingga", "g(n) harus bernilai 0"],
                    correctIndex: 1,
                    explanation: "Pada graph (di mana node bisa dicapai lewat banyak jalur), h yang konsisten menjamin jalur pertama yang mencapai suatu node adalah yang termurah."
                }
            ]}
        />
    </NoteSection>

    <BackLink
        href="/semester-1/kecerdasan-buatan-lanjut"
        label="Kembali ke Kecerdasan Buatan Lanjut"
    />
</article>

<style>
    .section-intro { margin-bottom: 1.5rem; color: var(--color-ink-soft); }

    .h-card {
        display: flex;
        align-items: center;
        gap: 2rem;
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
        margin: 1.5rem 0;
    }
    .h-formula { font-size: 2.5rem; font-weight: 800; color: var(--color-binder); font-family: var(--font-mono); }
    .h-desc p { margin-top: 0; font-weight: 600; }
    .h-desc ul { margin: 0.5rem 0 0; padding-left: 1.25rem; font-size: 0.9rem; color: var(--color-ink-soft); }

    .case-study-mini { margin-top: 1rem; font-size: 0.9rem; color: var(--color-ink-soft); }
    .case-study-mini ul { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; list-style: none; padding: 0; }
    .case-study-mini li { background: var(--color-surface-elevated); padding: 0.5rem; border-radius: 6px; border-left: 3px solid var(--color-line); }

    .landscape-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .landscape-item {
        background: var(--color-surface-soft);
        padding: 1rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid var(--color-line);
    }
    .l-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .landscape-item strong { display: block; font-size: 0.85rem; color: var(--color-binder); }
    .landscape-item p { font-size: 0.75rem; color: var(--color-ink-soft); margin: 0.25rem 0 0; }

    .simple-breakdown {
        background: var(--color-surface-soft);
        padding: 1.25rem;
        border-radius: 12px;
        border-left: 4px solid var(--color-binder);
        margin: 1.5rem 0;
        font-size: 0.95rem;
        line-height: 1.6;
        font-style: italic;
    }

    .hc-variants, .variants-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1rem 0;
    }
    .v-box, .v-card {
        background: var(--color-surface-elevated);
        padding: 1.25rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }
    .v-box h4 { margin-top: 0; color: var(--color-binder); }
    .v-box p, .v-card p { font-size: 0.85rem; margin: 0.5rem 0 0; line-height: 1.5; }

    .hc-problems {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--color-surface-soft);
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .prob-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .prob-tags span { background: var(--color-line); padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }

    .sa-formula {
        display: flex;
        align-items: center;
        gap: 2rem;
        background: #1a1a1a;
        color: #fff;
        padding: 1.5rem;
        border-radius: 16px;
        margin: 1rem 0;
    }
    .formula-box { font-size: 1.8rem; font-family: var(--font-mono); color: #ffcc33; }
    .formula-note { font-size: 0.85rem; opacity: 0.8; }

    .method-box { background: var(--color-surface-elevated); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--color-line); margin: 1rem 0; }
    .method-box h4 { margin-top: 0; color: var(--color-binder); }
    .method-box ol { padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; }

    .f-contour-explanation { background: var(--color-status-info-soft); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--color-status-info-border); margin: 1rem 0; font-size: 0.9rem; }

    .puzzle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1rem 0; }
    .puzzle-card { background: var(--color-surface-soft); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--color-line); text-align: center; }
    .badge { display: inline-block; margin-top: 0.75rem; background: #e0e0e0; color: #666; padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
    .badge-blue { display: inline-block; margin-top: 0.75rem; background: #e3f2fd; color: #1976d2; padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }

    .table-wrap { overflow-x: auto; margin: 1.5rem 0; border-radius: 12px; border: 1px solid var(--color-line); }
    .recap-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .recap-table th { background: var(--color-surface-soft); text-align: left; padding: 1rem; color: var(--color-binder); border: 1px solid var(--color-line); }
    .recap-table td { padding: 1rem; border: 1px solid var(--color-line); text-align: center; }
    .recap-table.comparison td:first-child { text-align: left; background: var(--color-surface-soft); font-weight: 600; }
    
    .cell-good { background-color: rgba(153, 204, 51, 0.2) !important; color: #4d661a; font-weight: 700; }
    .cell-mid { background-color: rgba(255, 204, 255, 0.2) !important; color: #990099; font-weight: 700; }
    .cell-bad { background-color: rgba(255, 102, 153, 0.2) !important; color: #990033; font-weight: 700; }

    :global(html.dark) .cell-good { background-color: rgba(153, 204, 51, 0.15) !important; color: #bde070; }
    :global(html.dark) .cell-mid { background-color: rgba(255, 204, 255, 0.15) !important; color: #f0a0f0; }
    :global(html.dark) .cell-bad { background-color: rgba(255, 102, 153, 0.15) !important; color: #ff99bb; }

    .table-footnote { font-size: 0.8rem; color: var(--color-ink-soft); font-style: italic; display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; }
    .dot-legend { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .dot-legend.good { background: #99cc33; }
    .dot-legend.mid { background: #ffccff; }
    .dot-legend.bad { background: #ff6699; }

    @media (max-width: 768px) {
        .hc-variants, .variants-grid, .puzzle-grid, .sa-formula, .case-study-mini ul { grid-template-columns: 1fr; }
    }
</style>
