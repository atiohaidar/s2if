<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
    import MinimaxVisualizer from "./components/MinimaxVisualizer.svelte";
    import AlphaBetaVisualizer from "./components/AlphaBetaVisualizer.svelte";
</script>

<svelte:head>
    <title>Adversarial Search - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Adversarial Search (Game AI)"
        date="24 April 2026"
        status="done"
        tags={["Minimax", "Alpha-Beta", "Zero-Sum"]}
    />

    <div class="game-mindset">
      <div class="mindset-header">🎮 Mindset: Mencari Keputusan Terbaik (Game AI)</div>
      <p>
        Kalau A* mencari <strong>jalur</strong> dan GA mencari <strong>konfigurasi</strong>, Adversarial Search mencari 
        <strong>keputusan (langkah)</strong> terbaik dalam situasi kompetitif.
      </p>
      <div class="analogy-card">
        <strong>Analogi: Main Catur atau SOS</strong>
        <p>Kamu tidak sendirian. Setiap kamu melangkah, lawanmu akan membalas dengan langkah yang paling menyulitkanmu. Tugasmu adalah mencari langkah yang tetap membuatmu menang (atau minimal tidak kalah) meskipun lawanmu bermain sangat hebat.</p>
      </div>
    </div>

    <NoteSection title="Definisi & Konsep Dasar">
        <p class="section-intro">
            Pencarian di mana terdapat "musuh" (lawan) yang mencoba menggagalkan kita dengan mengambil langkah yang paling merugikan posisi kita.
        </p>
        <div class="key-concept">
            <ul>
                <li><strong>MAX:</strong> Kita (berusaha memaksimalkan skor).</li>
                <li><strong>MIN:</strong> Lawan (berusaha meminimalkan skor kita).</li>
                <li><strong>Ply:</strong> Satu langkah dari satu pemain.</li>
                <li><strong>Utility:</strong> Nilai numerik pada kondisi akhir (menang/kalah).</li>
            </ul>
        </div>
        <Callout type="tip">
            <strong>💡 Penjelasan Simpel (Analogi Kue):</strong> Adversarial Search seringkali bersifat <strong>Zero-Sum</strong>. Bayangkan ada satu loyang kue. Jika saya mengambil potongan yang lebih besar (keuntungan), maka potongan untukmu pasti mengecil (kerugian). Total kue tetap sama.
        </Callout>
    </NoteSection>

    <NoteSection title="Zero-Sum Heuristic">
        <p>Dalam permainan, kita perlu memberi nilai (utility) pada setiap kondisi untuk menentukan siapa yang lebih unggul:</p>
        <div class="game-grid">
            <div class="game-card">
                <strong>Tic-Tac-Toe</strong>
                <p>Menang: +1 | Seri: 0 | Kalah: -1</p>
            </div>
            <div class="game-card">
                <strong>Catur (Poin Bidak)</strong>
                <p>Pion: 1, Kuda/Gajah: 3, Benteng: 5, Ratu: 9.</p>
                <div class="formula-info">
                    <em>King Value &ge; Queen + (2 &times; Knight) + (2 &times; Bishop) + (2 &times; Rook) + (8 &times; Pawn)</em>
                </div>
            </div>
            <div class="game-card">
                <strong>Reversi</strong>
                <p>Utility dihitung dari selisih: <code>Bidak Putih - Bidak Hitam</code>.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="1. Algoritma Minimax">
        <p>Strategi dasar yang mengasumsikan lawan akan selalu bermain optimal (mengambil langkah terbaik untuk mereka).</p>
        <div class="simple-breakdown">
            <p><strong>Cara Pikir:</strong> "Aku akan pilih langkah yang memberikan hasil terbaik, setelah lawan melakukan hal terburuk padaku."</p>
        </div>
        
        <div class="concept-boxes">
            <div class="c-box">
                <strong>Exhaustive Tree</strong>
                <p>Mengecek SEMUA kemungkinan sampai akhir (terminal state). Hanya mungkin untuk game kecil.</p>
            </div>
            <div class="c-box">
                <strong>Fixed Depth (n-ply)</strong>
                <p>Melihat "n" langkah ke depan (look-ahead) dan menggunakan estimasi heuristik pada batas kedalaman tersebut.</p>
            </div>
        </div>

        <MinimaxVisualizer />
        
        <Callout type="warning">
            <strong>Horizon Effect (Penyakit "Buta Jauh"):</strong> 
            <p>Terjadi karena AI hanya bisa melihat sampai kedalaman tertentu (misal: 3 langkah ke depan). Ia tidak tahu apa yang terjadi di langkah ke-4.</p>
            <div class="horizon-analogy">
                <strong>🔦 Analogi Senter:</strong>
                <p>
                    Bayangkan kamu di hutan gelap dengan senter yang jangkauannya cuma 5 meter. Kamu melihat "Koin Emas" di jarak 4 meter dan langsung mengejarnya. 
                    Tapi kamu tidak tahu bahwa di jarak 6 meter (di luar jangkauan senter) ada <b>Jurang Terjal</b>.
                </p>
                <p style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.8;">
                    AI terjebak karena "buta" terhadap apa yang ada di balik batas cahayanya.
                </p>
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.85rem;"><strong>Analogi Oracle:</strong> Fungsi heuristik yang sempurna adalah seperti "Oracle" (Evaluator Heuristik) yang punya senter tak terbatas—bisa melihat sampai akhir permainan sejak awal.</p>
        </Callout>
    </NoteSection>

    <NoteSection title="2. Alpha-Beta Pruning (Optimasi)">
        <p>Alpha-Beta memangkas (prune) cabang yang sudah pasti tidak akan dipilih untuk menghemat waktu komputasi.</p>
        
        <div class="ab-vars">
            <div class="v-card alpha">
                <strong>&alpha; (Alpha)</strong>
                <p>Nilai terbaik (terbesar) untuk MAX sejauh ini. (Batas Bawah)</p>
            </div>
            <div class="v-card beta">
                <strong>&beta; (Beta)</strong>
                <p>Nilai terbaik (terkecil) untuk MIN sejauh ini. (Batas Atas)</p>
            </div>
        </div>

        <div class="move-ordering">
            <h4>Pentingnya Move Ordering:</h4>
            <div class="order-grid">
                <div class="order-item lucky">
                    <strong>Lucky Ordering</strong>
                    <p>Langkah terbaik diperiksa pertama kali. Pruning maksimal! Efisiensi naik jadi <strong>O(bᵈ/²)</strong>.</p>
                </div>
                <div class="order-item unlucky">
                    <strong>Unlucky Ordering</strong>
                    <p>Langkah terbaik diperiksa terakhir. Tidak ada pruning sama sekali. Performa = Minimax standar.</p>
                </div>
            </div>
        </div>

        <div class="pruning-logic">
            <h4>✂️ Kapan Gunting (Pruning) Beraksi?</h4>
            <p>Pruning terjadi ketika <strong>Alpha (&alpha;) &ge; Beta (&beta;)</strong>. Artinya, pemain di level atas sudah punya pilihan yang lebih baik, sehingga cabang ini tidak perlu dilanjutkan.</p>
            
            <div class="logic-grid">
                <div class="l-card min">
                    <strong>Di Node MIN</strong>
                    <p>Jika ditemukan nilai <code>V &le; &alpha;</code></p>
                    <div class="l-tag">Alpha Cutoff</div>
                </div>
                <div class="l-card max">
                    <strong>Di Node MAX</strong>
                    <p>Jika ditemukan nilai <code>V &ge; &beta;</code></p>
                    <div class="l-tag">Beta Cutoff</div>
                </div>
            </div>
        </div>

        <div class="simple-breakdown">
            <p><strong>💡 Analogi Belanja:</strong> Kamu cari HP termurah (MIN). Toko A harganya Rp5jt. Di Toko B, baru tanya casing-nya saja sudah Rp6jt. Kamu gak perlu cek harga baterainya di Toko B, karena totalnya pasti > Rp6jt. <strong>Gunting!</strong></p>
        </div>

        <AlphaBetaVisualizer />
    </NoteSection>

    <NoteSection title="Implementasi Kode (Python)">
        <CodeBlock
            language="python"
            code={`def alpha_beta(node, depth, alpha, beta, maximizing):
    if depth == 0 or node.is_terminal():
        return node.utility()

    if maximizing:
        value = float('-inf')
        for child in node.children():
            value = max(value, alpha_beta(child, depth-1, alpha, beta, False))
            alpha = max(alpha, value)
            if beta <= alpha: break # Beta cutoff
        return value
    else:
        value = float('inf')
        for child in node.children():
            value = min(value, alpha_beta(child, depth-1, alpha, beta, True))
            beta = min(beta, value)
            if beta <= alpha: break # Alpha cutoff
        return value`}
        />
    </NoteSection>

    <NoteSection title="Perbandingan Performa">
        <div class="table-wrap">
            <table class="recap-table comparison">
                <thead>
                    <tr>
                        <th>Fitur</th>
                        <th>Minimax Standar</th>
                        <th>Alpha-Beta Pruning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Keputusan</strong></td>
                        <td class="cell-good">Optimal</td>
                        <td class="cell-good">Optimal (Sama!)</td>
                    </tr>
                    <tr>
                        <td><strong>Kompleksitas</strong></td>
                        <td class="cell-bad">O(bᵈ)</td>
                        <td class="cell-good">O(bᵈ/²) (Best Case)</td>
                    </tr>
                    <tr>
                        <td><strong>Efisien</strong></td>
                        <td class="cell-bad">Rendah</td>
                        <td class="cell-good">Tinggi</td>
                    </tr>
                    <tr>
                        <td><strong>Jumlah Node</strong></td>
                        <td class="cell-bad">Cek Semua</td>
                        <td class="cell-mid">Potong Cabang</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="table-footnote">Alpha-Beta memungkinkan AI melihat <strong>2x lebih dalam</strong> dengan waktu yang sama.</p>
    </NoteSection>

    <NoteSection title="Kuis Tantangan: Adversarial Search">
        <Quiz 
            title="Quiz Game AI"
            questions={[
                {
                    question: "Apa perbedaan utama antara hasil akhir Minimax standar dengan Alpha-Beta Pruning?",
                    options: ["Alpha-Beta memberikan hasil yang lebih akurat.", "Minimax standar memberikan hasil lebih optimal.", "Hasil akhirnya sama persis, Alpha-Beta hanya lebih cepat.", "Alpha-Beta bisa memberikan hasil yang berbeda tergantung urutan."],
                    correctIndex: 2,
                    explanation: "Alpha-Beta hanyalah optimasi. Ia memotong cabang yang TIDAK mempengaruhi keputusan akhir, sehingga hasilnya dijamin sama dengan Minimax standar."
                },
                {
                    question: "Dalam terminologi Zero-Sum Game, apa yang dimaksud dengan nilai utility +1 pada Tic-Tac-Toe?",
                    options: ["Pemain MAX menang.", "Pemain MIN menang.", "Permainan berakhir seri.", "MAX melakukan langkah ilegal."],
                    correctIndex: 0,
                    explanation: "Biasanya +1 digunakan untuk kemenangan MAX, -1 untuk kemenangan MIN, dan 0 untuk draw."
                },
                {
                    question: "Masalah 'Horizon Effect' paling sering terjadi karena...",
                    options: ["Kapasitas memori RAM habis.", "Pencarian dibatasi pada kedalaman tertentu (fixed depth).", "Fungsi heuristik terlalu rumit.", "Lawan tidak bermain secara optimal."],
                    correctIndex: 1,
                    explanation: "Karena AI hanya bisa melihat sampai kedalaman d, ia mungkin tidak menyadari adanya ancaman besar di kedalaman d+1."
                },
                {
                    question: "Kapan Alpha-Beta Pruning akan bekerja secara PALING tidak efektif (tidak ada cabang yang dipotong)?",
                    options: ["Jika semua node leaf bernilai 0.", "Jika urutan langkah (move ordering) adalah yang terburuk (unlucky ordering).", "Jika branching factor b bernilai genap.", "Jika kedalaman tree ganjil."],
                    correctIndex: 1,
                    explanation: "Jika langkah terbaik justru diperiksa terakhir, Alpha-Beta terpaksa mengecek semua cabang sebelum menyadari bisa memotong, sehingga performanya sama dengan Minimax."
                },
                {
                    question: "Apa yang direpresentasikan oleh variabel Beta (β) dalam pruning?",
                    options: ["Nilai terendah yang dijamin didapat oleh MAX (Batas Bawah).", "Batas atas bagi MAX / Nilai terbaik (terendah) yang dijamin oleh MIN.", "Jumlah node yang sudah dipotong.", "Batas waktu pencarian."],
                    correctIndex: 1,
                    explanation: "Beta adalah batas atas. Karena MIN mencari nilai terkecil, maka Beta merepresentasikan nilai 'paling mending' (terendah) yang sudah ditemukan MIN sejauh ini. MIN tidak akan membiarkan MAX mendapat nilai lebih tinggi dari Beta."
                },
                {
                    question: "Berapakah poin utility bidak Ster/Queen dalam sistem evaluasi catur standar yang disebutkan di materi?",
                    options: ["3 poin", "5 poin", "9 poin", "Tak terhingga"],
                    correctIndex: 2,
                    explanation: "Sesuai standar evaluasi catur: Pion(1), Kuda/Gajah(3), Benteng(5), dan Ratu(9)."
                },
                {
                    question: "Apa kegunaan utama dari 'n-ply look-ahead'?",
                    options: ["Memungkinkan AI untuk melihat seluruh game tree sampai akhir.", "Membatasi kedalaman pencarian agar waktu komputasi masuk akal.", "Menambah jumlah pemain dalam game.", "Menghapus kebutuhan akan fungsi heuristik."],
                    correctIndex: 1,
                    explanation: "Karena game tree catur/Go sangat luas, AI hanya 'melihat ke depan' beberapa langkah (ply) saja dan menggunakan estimasi di sana."
                },
                {
                    question: "Pada node MIN, kapan proses pruning (Alpha Cutoff) terjadi?",
                    options: ["Ketika Alpha < Beta.", "Ketika Alpha ≥ Beta (atau Beta ≤ Alpha).", "Ketika skor node = 0.", "Ketika tidak ada lagi anak node."],
                    correctIndex: 1,
                    explanation: "Pruning terjadi saat kondisi Alpha ≥ Beta terpenuhi. Di node MIN, ini disebut Alpha Cutoff karena kita memotong cabang berdasarkan batas Alpha yang dikirim dari parent MAX."
                },
                {
                    question: "Mengapa move ordering (urutan langkah) sangat penting bagi Alpha-Beta Pruning?",
                    options: ["Karena bisa mengubah hasil akhir permainan.", "Karena menentukan seberapa banyak cabang yang bisa dipotong (efisiensi).", "Agar AI tidak melakukan langkah yang sama dua kali.", "Agar memori tidak meledak."],
                    correctIndex: 1,
                    explanation: "Jika langkah terbaik dicek lebih awal, batas alpha/beta akan cepat terbentuk dan memicu banyak pemotongan cabang lainnya."
                },
                {
                    question: "Utility function biasanya diterapkan pada node jenis apa?",
                    options: ["Root node.", "Internal node.", "Terminal (leaf) node.", "Hanya pada node MAX."],
                    correctIndex: 2,
                    explanation: "Utility (skor kemenangan) hanya bisa ditentukan secara pasti saat permainan berakhir (Terminal node)."
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

    .key-concept { background: var(--color-surface-soft); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); margin: 1rem 0; }
    .key-concept ul { margin: 0; padding-left: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .key-concept li { font-size: 0.9rem; }

    .game-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .game-card { background: var(--color-surface-elevated); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .game-card strong { color: var(--color-binder); display: block; margin-bottom: 0.5rem; }
    .game-card p { font-size: 0.85rem; margin: 0; }

    .formula-info { margin-top: 0.75rem; font-size: 0.75rem; color: var(--color-ink-muted); border-top: 1px dashed var(--color-line); padding-top: 0.5rem; }
    .concept-boxes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .c-box { background: var(--color-surface-soft); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--color-binder); }
    .c-box strong { display: block; margin-bottom: 0.25rem; font-size: 0.9rem; }
    .c-box p { font-size: 0.8rem; margin: 0; }

    .move-ordering { margin: 1.5rem 0; }
    .move-ordering h4 { margin-bottom: 0.75rem; color: var(--color-binder); }
    .order-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .order-item { padding: 1rem; border-radius: 12px; border: 1px solid var(--color-line); }
    .order-item.lucky { border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.05); }
    .order-item.unlucky { border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.05); }
    .order-item strong { display: block; margin-bottom: 0.25rem; }
    .order-item p { font-size: 0.85rem; margin: 0; }

    .simple-breakdown { background: var(--color-surface-soft); padding: 1.25rem; border-radius: 12px; border-left: 4px solid var(--color-binder); margin: 1.5rem 0; font-size: 0.95rem; line-height: 1.6; font-style: italic; }

    .ab-vars { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
    .v-card { padding: 1rem; border-radius: 12px; color: white; }
    .v-card.alpha { background: #3b82f6; }
    .v-card.beta { background: #ec4899; }
    .v-card p { font-size: 0.85rem; margin: 0.5rem 0 0; opacity: 0.9; }

    .table-wrap { overflow-x: auto; margin: 1.5rem 0; border-radius: 12px; border: 1px solid var(--color-line); }
    .recap-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .recap-table th { background: var(--color-surface-soft); text-align: left; padding: 1rem; color: var(--color-binder); border: 1px solid var(--color-line); }
    .recap-table td { padding: 1rem; border: 1px solid var(--color-line); text-align: center; }
    .recap-table.comparison td:first-child { text-align: left; background: var(--color-surface-soft); font-weight: 600; }
    
    .cell-good { background-color: rgba(153, 204, 51, 0.2) !important; color: #4d661a; font-weight: 700; }
    .cell-mid { background-color: rgba(255, 204, 255, 0.2) !important; color: #990099; font-weight: 700; }
    .cell-bad { background-color: rgba(255, 102, 153, 0.2) !important; color: #990033; font-weight: 700; }

    .table-footnote { font-size: 0.8rem; color: var(--color-ink-soft); font-style: italic; margin-top: 0.5rem; }

    .pruning-logic {
        margin: 1.5rem 0;
        padding: 1.5rem;
        background: var(--color-surface-soft);
        border-radius: 16px;
        border: 2px dashed var(--color-status-error-border, var(--color-accent));
    }
    .pruning-logic h4 { margin-top: 0; color: var(--color-binder); margin-bottom: 1rem; }
    .logic-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
    .l-card { padding: 1rem; border-radius: 10px; background: var(--color-surface-elevated); border: 1px solid var(--color-line); text-align: center; }
    .l-card strong { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; }
    .l-card p { font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--color-binder); }
    .l-tag { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-block; }
    .l-card.min .l-tag { background: #3b82f6; color: white; }
    .l-card.max .l-tag { background: #ec4899; color: white; }

    @media (max-width: 768px) {
        .game-grid, .ab-vars, .key-concept ul, .concept-boxes, .order-grid { grid-template-columns: 1fr; }
    }

    .game-mindset {
        margin: 1.5rem 0;
        padding: 1.5rem;
        background: var(--color-surface-soft);
        color: var(--color-ink-strong);
        border-radius: 16px;
        border: 1px solid var(--color-line);
    }
    .mindset-header { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--color-binder); }
    .game-mindset p { font-size: 0.9rem; line-height: 1.6; }
    .analogy-card { 
        margin-top: 1rem; 
        padding: 1rem; 
        background: var(--color-surface-elevated); 
        border-radius: 10px; 
        border-left: 4px solid var(--color-binder); 
    }
    .analogy-card strong { display: block; margin-bottom: 0.25rem; color: var(--color-binder); }
    .analogy-card p { margin: 0; font-size: 0.85rem; font-style: italic; color: var(--color-ink-soft); }
    .horizon-analogy {
        margin: 1rem 0;
        padding: 1.25rem;
        background: color-mix(in srgb, var(--color-status-warning-soft) 40%, var(--color-surface-elevated));
        border-radius: 12px;
        border: 1px solid var(--color-status-warning-border);
        box-shadow: var(--shadow-sm);
    }
    .horizon-analogy strong { 
        display: flex; 
        align-items: center; 
        gap: 0.5rem; 
        margin-bottom: 0.75rem; 
        font-size: 1rem; 
        color: var(--color-status-warning-text, var(--color-binder)); 
    }
    .horizon-analogy p { 
        margin: 0; 
        font-size: 0.9rem; 
        line-height: 1.6; 
        color: var(--color-ink-strong); 
    }
    .horizon-analogy b {
        color: var(--color-status-error-text, #ef4444);
        text-decoration: underline wavy;
        text-underline-offset: 4px;
    }
</style>
