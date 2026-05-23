<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
</script>

<svelte:head>
    <title>Deep Learning - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Deep Learning"
        date="22 Mei 2026"
        status="done"
        tags={["Deep Learning", "Neural Network", "History"]}
    />

    <NoteSection title="Apa Itu Deep Learning?">
        <p>
            <strong>Deep Learning</strong> (juga disebut <em>Deep Structured Learning</em>) adalah
            bagian dari machine learning yang berbasis <strong>Artificial Neural Network</strong>.
            Kata <em>deep</em> merujuk pada penggunaan <strong>banyak layer</strong> untuk mengekstraksi
            fitur tingkat tinggi dari data mentah secara bertahap.
        </p>
        <Callout type="info">
            Intinya: semakin banyak layer yang disusun, semakin kompleks pola yang bisa dipelajari.
        </Callout>
    </NoteSection>

    <NoteSection title="Capaian Pembelajaran">
        <ul>
            <li>Memahami konsep deep learning dan alasan disebut "deep".</li>
            <li>Mengenali arsitektur utama neural network modern.</li>
            <li>Mengetahui milestone sejarah dan penerapan kunci deep learning.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Arsitektur Utama">
        <div class="arch-grid">
            <div class="arch-card">
                <h3>Deep Neural Network (DNN)</h3>
                <p>Jaringan feed-forward dengan banyak layer tersembunyi.</p>
            </div>
            <div class="arch-card">
                <h3>Deep Belief Network (DBN)</h3>
                <p>Stacked RBM untuk belajar representasi bertahap.</p>
            </div>
            <div class="arch-card">
                <h3>Graph Neural Network (GNN)</h3>
                <p>Belajar dari data berbentuk graf (node dan edge).</p>
            </div>
            <div class="arch-card">
                <h3>Recurrent Neural Network (RNN)</h3>
                <p>Cocok untuk data berurutan seperti teks dan suara.</p>
            </div>
            <div class="arch-card">
                <h3>Convolutional Neural Network (CNN)</h3>
                <p>Spesialis untuk citra, video, dan pola spasial.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Kernel (Filter) pada CNN">
        <p>
            <strong>Kernel</strong> adalah matriks kecil (misal 3x3 atau 5x5) yang digeser
            di atas gambar untuk mengekstraksi pola lokal seperti tepi, tekstur, atau sudut.
            Setiap pergeseran menghasilkan satu nilai pada <em>feature map</em>.
        </p>
        <div class="kernel-deep">
            <div class="kernel-detail">
                <h4>Bagaimana Kernel Bekerja?</h4>
                <p>
                    Di setiap posisi, kernel melakukan operasi <strong>dot product</strong> dengan
                    patch gambar yang sedang ditutupi. Hasilnya menjadi satu angka di feature map.
                    Proses ini diulang ke seluruh gambar dengan langkah tertentu.
                </p>
                <p class="kernel-formula">
                    Output(i,j) = sum(sum(InputPatch(i,j) * Kernel))
                </p>
            </div>
            <div class="kernel-detail">
                <h4>Makna Ukuran Kernel</h4>
                <ul>
                    <li><strong>3x3:</strong> menangkap pola kecil (tepi halus, tekstur detail).</li>
                    <li><strong>5x5:</strong> menangkap pola lebih besar tapi lebih mahal komputasinya.</li>
                    <li><strong>7x7+:</strong> jarang dipakai langsung; biasanya diganti stack 3x3.</li>
                </ul>
            </div>
            <div class="kernel-detail">
                <h4>Stride, Padding, dan Output Size</h4>
                <ul>
                    <li><strong>Stride</strong> = langkah pergeseran kernel.</li>
                    <li><strong>Padding</strong> = penambahan border agar output tidak mengecil.</li>
                    <li>
                        Formula ukuran output: (W - K + 2P) / S + 1
                    </li>
                </ul>
            </div>
            <div class="kernel-detail">
                <h4>Kenapa Kernel Banyak?</h4>
                <p>
                    Satu layer CNN biasanya punya banyak kernel. Masing-masing kernel belajar
                    mendeteksi pola berbeda (garis vertikal, diagonal, tekstur halus, dll),
                    sehingga outputnya menjadi banyak channel feature map.
                </p>
            </div>
        </div>
        <div class="kernel-grid">
            <div class="kernel-card">
                <h4>Contoh Kernel 3x3</h4>
                <div class="kernel-matrix">
                    <span class="kernel-cell">-1</span>
                    <span class="kernel-cell">0</span>
                    <span class="kernel-cell">1</span>
                    <span class="kernel-cell">-2</span>
                    <span class="kernel-cell">0</span>
                    <span class="kernel-cell">2</span>
                    <span class="kernel-cell">-1</span>
                    <span class="kernel-cell">0</span>
                    <span class="kernel-cell">1</span>
                </div>
                <p class="kernel-caption">Filter ini sering dipakai untuk mendeteksi tepi vertikal.</p>
            </div>
            <div class="kernel-card">
                <h4>Sliding Window</h4>
                <div class="kernel-matrix kernel-patch">
                    <span class="kernel-cell">12</span>
                    <span class="kernel-cell">18</span>
                    <span class="kernel-cell">22</span>
                    <span class="kernel-cell">15</span>
                    <span class="kernel-cell highlight">30</span>
                    <span class="kernel-cell">35</span>
                    <span class="kernel-cell">10</span>
                    <span class="kernel-cell">12</span>
                    <span class="kernel-cell">19</span>
                </div>
                <p class="kernel-caption">Kernel digeser, dihitung dot product, lalu menghasilkan 1 angka.</p>
            </div>
            <div class="kernel-card">
                <h4>Feature Map</h4>
                <div class="feature-map">
                    <div class="feature-bar" style="width: 28%"></div>
                    <div class="feature-bar" style="width: 52%"></div>
                    <div class="feature-bar" style="width: 76%"></div>
                    <div class="feature-bar" style="width: 45%"></div>
                </div>
                <p class="kernel-caption">Semakin kuat pola terdeteksi, nilai feature map makin besar.</p>
            </div>
        </div>
        <Callout type="tip">
            Dua konsep penting: <strong>stride</strong> menentukan langkah pergeseran kernel,
            sedangkan <strong>padding</strong> menjaga ukuran output agar tidak menyusut terlalu cepat.
        </Callout>
    </NoteSection>

    <NoteSection title="Visualisasi Sederhana: Alur Layer">
        <div class="dl-visual" role="img" aria-label="Diagram sederhana alur deep learning">
            <svg viewBox="0 0 860 220" class="dl-svg">
                <defs>
                    <linearGradient id="dlFlow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#4f9cff" />
                        <stop offset="100%" stop-color="#22c55e" />
                    </linearGradient>
                </defs>
                <g class="dl-layer">
                    <rect x="20" y="40" width="140" height="140" rx="16" />
                    <text x="90" y="100" class="dl-label">Input</text>
                    <text x="90" y="125" class="dl-sub">Raw data</text>
                </g>
                <g class="dl-layer accent">
                    <rect x="220" y="30" width="140" height="160" rx="16" />
                    <text x="290" y="90" class="dl-label">Layer 1</text>
                    <text x="290" y="115" class="dl-sub">Low-level</text>
                    <text x="290" y="140" class="dl-sub">features</text>
                </g>
                <g class="dl-layer">
                    <rect x="420" y="20" width="140" height="180" rx="16" />
                    <text x="490" y="90" class="dl-label">Layer 2</text>
                    <text x="490" y="115" class="dl-sub">Mid-level</text>
                    <text x="490" y="140" class="dl-sub">features</text>
                </g>
                <g class="dl-layer accent">
                    <rect x="620" y="30" width="140" height="160" rx="16" />
                    <text x="690" y="90" class="dl-label">Layer 3</text>
                    <text x="690" y="115" class="dl-sub">High-level</text>
                    <text x="690" y="140" class="dl-sub">features</text>
                </g>
                <g class="dl-layer">
                    <rect x="800" y="60" width="40" height="100" rx="12" />
                    <text x="820" y="110" class="dl-label">Out</text>
                </g>
                <path d="M170 110 L220 110" class="dl-arrow" />
                <path d="M360 110 L420 110" class="dl-arrow" />
                <path d="M560 110 L620 110" class="dl-arrow" />
                <path d="M760 110 L800 110" class="dl-arrow" />
                <circle cx="180" cy="110" r="4" class="dl-dot" />
                <circle cx="380" cy="110" r="4" class="dl-dot" />
                <circle cx="580" cy="110" r="4" class="dl-dot" />
                <circle cx="780" cy="110" r="4" class="dl-dot" />
            </svg>
        </div>
        <p class="section-note">
            Layer awal menangkap pola sederhana (tepi, bentuk), layer tengah menggabungkan
            pola menjadi fitur yang lebih kompleks, lalu layer akhir memetakan ke output.
        </p>
    </NoteSection>

    <NoteSection title="Aplikasi Utama">
        <div class="app-grid">
            <div class="app-card">
                <h4>Computer Vision</h4>
                <p>Deteksi objek, pengenalan wajah, klasifikasi citra.</p>
            </div>
            <div class="app-card">
                <h4>Speech Recognition</h4>
                <p>Transkripsi suara, asisten virtual, voice command.</p>
            </div>
            <div class="app-card">
                <h4>Natural Language Processing</h4>
                <p>Terjemahan mesin, ringkasan teks, chatbot.</p>
            </div>
            <div class="app-card">
                <h4>Audio & Social</h4>
                <p>Music tagging, filter konten, rekomendasi sosial.</p>
            </div>
            <div class="app-card">
                <h4>Game & Decision</h4>
                <p>Program game, strategi, dan decision making.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Sejarah Singkat (Milestone)">
        <div class="timeline">
            <div class="timeline-item">
                <span class="year">1998</span>
                <strong>LeNet-5</strong>
                <p>Digunakan untuk membaca kode pos dan digit; dipopulerkan Yann LeCun.</p>
            </div>
            <div class="timeline-item">
                <span class="year">2012</span>
                <strong>ILSVRC & AlexNet</strong>
                <p>AlexNet menang ImageNet dengan CNN yang lebih dalam dan lebar.</p>
            </div>
            <div class="timeline-item">
                <span class="year">2013</span>
                <strong>ZFNet</strong>
                <p>Menang ILSVRC 2013 dan memicu lahirnya arsitektur lebih dalam.</p>
            </div>
            <div class="timeline-item highlight">
                <span class="year">2014+</span>
                <strong>GoogLeNet, VGGNet, ResNet</strong>
                <p>Arsitektur modern dengan kedalaman ekstrem dan performa tinggi.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="AlexNet Ringkas">
        <ul>
            <li>8 layer terlatih: 5 convolution + 3 fully connected.</li>
            <li>Aktivasi ReLU di semua layer terlatih, kecuali layer terakhir memakai softmax.</li>
            <li>Layer non-trainable: pooling, normalization, dan dropout.</li>
        </ul>
        <Callout type="tip">
            AlexNet memperlihatkan bahwa kombinasi data besar + GPU + arsitektur CNN yang dalam
            bisa melampaui metode klasik berbasis feature engineering manual.
        </Callout>
    </NoteSection>

    <NoteSection title="Ringkasan Cepat">
        <ul>
            <li>Deep learning adalah neural network dengan banyak layer.</li>
            <li>Layer demi layer mengekstraksi fitur dari level rendah ke tinggi.</li>
            <li>Terbukti unggul di vision, speech, dan NLP sejak era ImageNet.</li>
        </ul>
    </NoteSection>

    <NoteSection title="Referensi">
        <div class="ref-list">
            <p>• Suyanto. 2018. <em>Machine Learning: Tingkat Dasar dan Lanjut</em>.</p>
            <p>• ILSVRC 2012 (ImageNet). https://www.image-net.org/challenges/LSVRC/2012/</p>
            <p>• AlexNet review: https://medium.com/ai-research-lab-kampala/alexnet-a-brief-review-14979ce7cc84</p>
        </div>
    </NoteSection>

    <NoteSection title="Uji Pemahaman">
        <Quiz
            title="Kuis Deep Learning"
            questions={[
                {
                    question: "Apa makna kata 'deep' pada deep learning?",
                    options: [
                        "Modelnya berjalan sangat cepat",
                        "Jumlah layernya banyak",
                        "Datanya selalu besar",
                        "Menggunakan database relasional"
                    ],
                    correctIndex: 1,
                    explanation: "Istilah deep merujuk pada penggunaan banyak layer untuk ekstraksi fitur bertahap."
                },
                {
                    question: "Arsitektur yang paling identik dengan pengolahan citra adalah...",
                    options: ["RNN", "CNN", "DBN", "GNN"],
                    correctIndex: 1,
                    explanation: "CNN dirancang untuk menangkap pola spasial pada gambar dan video."
                },
                {
                    question: "Komponen yang dipakai di AlexNet untuk mengurangi overfitting adalah...",
                    options: ["Pooling", "Normalization", "Dropout", "Softmax"],
                    correctIndex: 2,
                    explanation: "Dropout digunakan untuk mencegah model terlalu menghafal data latih."
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
    .arch-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .arch-card {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 16px;
        padding: 1rem;
        box-shadow: var(--shadow-sm);
    }

    .arch-card h3 {
        margin: 0 0 0.5rem;
    }

    .kernel-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .kernel-deep {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }

    .kernel-detail {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 16px;
        padding: 1rem;
        box-shadow: var(--shadow-sm);
    }

    .kernel-detail h4 {
        margin: 0 0 0.5rem;
    }

    .kernel-detail ul {
        margin: 0.5rem 0 0;
        padding-left: 1.2rem;
    }

    .kernel-formula {
        margin-top: 0.75rem;
        padding: 0.6rem 0.75rem;
        border-radius: 10px;
        background: var(--color-surface-soft, #f8fafc);
        border: 1px solid var(--color-line);
        font-family: var(--font-mono, "Consolas", "Courier New", monospace);
        font-size: 0.9rem;
    }

    .kernel-card {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 16px;
        padding: 1rem;
        box-shadow: var(--shadow-sm);
    }

    .kernel-card h4 {
        margin: 0 0 0.75rem;
    }

    .kernel-matrix {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.4rem;
    }

    .kernel-cell {
        display: grid;
        place-items: center;
        padding: 0.4rem 0.2rem;
        border-radius: 8px;
        border: 1px solid var(--color-line);
        background: var(--color-surface-soft, #f8fafc);
        font-weight: 600;
        font-size: 0.85rem;
    }

    .kernel-cell.highlight {
        background: rgba(79, 156, 255, 0.18);
        border-color: rgba(79, 156, 255, 0.6);
    }

    .kernel-caption {
        margin-top: 0.75rem;
        color: var(--color-text-muted);
        font-size: 0.9rem;
    }

    .feature-map {
        display: grid;
        gap: 0.4rem;
    }

    .feature-bar {
        height: 10px;
        border-radius: 999px;
        background: linear-gradient(90deg, #4f9cff, #22c55e);
    }

    .dl-visual {
        margin: 1.5rem 0;
        background: linear-gradient(135deg, rgba(79, 156, 255, 0.12), rgba(34, 197, 94, 0.12));
        border: 1px solid var(--color-line);
        border-radius: 18px;
        padding: 1rem;
        overflow-x: auto;
    }

    .dl-svg {
        width: 100%;
        height: auto;
        min-width: 680px;
    }

    .dl-layer rect {
        fill: var(--color-surface-elevated);
        stroke: var(--color-line);
        stroke-width: 2;
    }

    .dl-layer.accent rect {
        fill: rgba(79, 156, 255, 0.18);
    }

    .dl-label {
        font-family: var(--font-display, "Segoe UI");
        font-size: 16px;
        font-weight: 700;
        fill: var(--color-text);
        text-anchor: middle;
    }

    .dl-sub {
        font-family: var(--font-body, "Segoe UI");
        font-size: 12px;
        fill: var(--color-text-muted, #6b7280);
        text-anchor: middle;
    }

    .dl-arrow {
        stroke: url(#dlFlow);
        stroke-width: 4;
        fill: none;
        stroke-linecap: round;
    }

    .dl-dot {
        fill: var(--color-accent, #22c55e);
    }

    .section-note {
        margin-top: 0.75rem;
        color: var(--color-text-muted);
    }

    .app-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
    }

    .app-card {
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-line);
        border-radius: 14px;
        padding: 1rem;
        box-shadow: var(--shadow-sm);
    }

    .timeline {
        display: grid;
        gap: 1rem;
    }

    .timeline-item {
        border: 1px solid var(--color-line);
        border-left: 4px solid var(--color-binder, #4f9cff);
        background: var(--color-surface-elevated);
        border-radius: 14px;
        padding: 1rem;
    }

    .timeline-item.highlight {
        border-left-color: #22c55e;
        box-shadow: var(--shadow-sm);
    }

    .year {
        display: inline-block;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--color-binder, #4f9cff);
    }

    .ref-list p {
        margin: 0.25rem 0;
    }

    @media (max-width: 640px) {
        .dl-svg {
            min-width: 520px;
        }
    }
</style>
