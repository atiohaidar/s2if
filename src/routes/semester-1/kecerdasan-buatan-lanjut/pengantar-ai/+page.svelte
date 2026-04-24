<script lang="ts">
    import NoteSection from "$lib/components/NoteSection.svelte";
    import NoteHeader from "$lib/components/NoteHeader.svelte";
    import BackLink from "$lib/components/BackLink.svelte";
    import Callout from "$lib/components/Callout.svelte";
    import ThemeIcon from "$lib/components/ThemeIcon.svelte";
    import Quiz from "$lib/components/Quiz.svelte";
</script>

<svelte:head>
    <title>Pengantar AI - S2IF Notebook</title>
</svelte:head>

<article class="note-article">
    <NoteHeader
        title="Pengantar Kecerdasan Buatan"
        date="24 April 2026"
        status="done"
        tags={["AI", "Dasar", "History"]}
    />

    <NoteSection title="Capaian Pembelajaran & Prasyarat">
        <div class="overview-grid">
            <div class="overview-card">
                <h3>Prasyarat Pengetahuan</h3>
                <ul>
                    <li>Matematika Diskrit</li>
                    <li>Probabilitas dan Statistika</li>
                    <li>Algoritma & Pemrograman Dasar</li>
                    <li>Logika Matematika</li>
                </ul>
            </div>
            <div class="overview-card highlight">
                <h3>Objektif Mata Kuliah</h3>
                <ol>
                    <li>Memahami konsep dasar dan definisi AI.</li>
                    <li>Mampu menjelaskan teknik AI (Searching, Reasoning, Learning).</li>
                    <li>Mampu mendesain, mengimplementasi, dan menganalisis solusi berbasis AI.</li>
                </ol>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Definisi AI (4 Kategori)">
        <p class="section-intro">
            Kecerdasan Buatan dikelompokkan menjadi 4 kategori berdasarkan dimensi 
            <strong>Berpikir vs Bertindak</strong> dan <strong>Manusiawi vs Rasional</strong>:
        </p>
        
        <div class="def-grid">
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-brain" size={24} /></div>
                <h3>Thinking Humanly</h3>
                <p>"Upaya membuat komputer berpikir... mesin dengan pikiran, dalam arti sepenuhnya dan harfiah." (Haugeland, '85)</p>
                <span class="focus-tag">Model Kognitif</span>
            </div>
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-scale" size={24} /></div>
                <h3>Thinking Rationally</h3>
                <p>"Studi tentang komputasi yang memungkinkan untuk mempersepsikan, menalar, dan bertindak." (Winston, '92)</p>
                <span class="focus-tag">Hukum Logika</span>
            </div>
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-user" size={24} /></div>
                <h3>Acting Humanly</h3>
                <p>"Seni menciptakan mesin yang melakukan fungsi yang membutuhkan kecerdasan bila dilakukan oleh orang." (Kurzweil, '90)</p>
                <span class="focus-tag">Turing Test</span>
            </div>
            <div class="def-card">
                <div class="card-icon"><ThemeIcon name="ai-bot" size={24} /></div>
                <h3>Acting Rationally</h3>
                <p>"Cabang ilmu komputer yang berkaitan dengan otomatisasi perilaku cerdas." (Luger & Stubblefield, '93)</p>
                <span class="focus-tag">Rational Agent</span>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Deep Dive: Turing Test & The Imitation Game">
        <div class="turing-section">
            <div class="turing-header">
                <div class="turing-badge">Konsep 1950</div>
                <p>
                    Banyak yang bertanya: <em>"Bagaimana mungkin ada uji percakapan teks di tahun 1950 saat komputer masih sebesar ruangan dan belum ada Generative AI?"</em>
                </p>
            </div>
            
            <div class="turing-grid">
                <div class="turing-box">
                    <h4>The Imitation Game</h4>
                    <p>
                        Alan Turing merancang uji ini sebagai eksperimen pemikiran (thought experiment) untuk menjawab pertanyaan <strong>"Can machines think?"</strong>. Ia membayangkan sebuah sekat di mana seorang interogator berkomunikasi via teks (teletype) dengan dua pihak: manusia dan mesin.
                    </p>
                </div>
                <div class="turing-box">
                    <h4>Kenapa Teks?</h4>
                    <p>
                        Turing sengaja memilih teks untuk menghindari bias fisik (suara atau penampilan). Fokusnya murni pada <strong>kapasitas intelektual</strong> dan kemampuan menalar, bukan kemampuan meniru fisik manusia.
                    </p>
                </div>
            </div>

            <Callout type="info">
                <strong>Requirement untuk Lolos Turing Test:</strong>
                <p>Meskipun belum ada teknologi canggih saat itu, Turing merumuskan bahwa mesin membutuhkan 4 hal dasar:</p>
                <ul class="req-list">
                    <li><strong>Natural Language Processing:</strong> Untuk berkomunikasi dalam bahasa alami.</li>
                    <li><strong>Knowledge Representation:</strong> Untuk menyimpan informasi yang diketahui.</li>
                    <li><strong>Automated Reasoning:</strong> Untuk menjawab pertanyaan & menarik kesimpulan.</li>
                    <li><strong>Machine Learning:</strong> Untuk beradaptasi dengan situasi baru.</li>
                </ul>
            </Callout>

            <p class="turing-footer">
                Turing Test bukan tentang "kebenaran" jawaban, tapi tentang <strong>"kemiripan"</strong> dengan perilaku manusia. ELIZA (1966) adalah program pertama yang mencoba ini hanya dengan pencocokan pola sederhana.
            </p>
        </div>
    </NoteSection>

    <NoteSection title="Teknik AI Utama (Scope Kuliah)">
        <p>Mata kuliah ini berfokus pada tiga pilar utama teknik AI:</p>
        <div class="tech-grid">
            <div class="tech-item">
                <strong>Searching</strong>
                <p>A* Search, Simulated Annealing, Genetic Algorithm (GA)</p>
            </div>
            <div class="tech-item">
                <strong>Reasoning</strong>
                <p>Fuzzy Logic (Mamdani & Sugeno)</p>
            </div>
            <div class="tech-item">
                <strong>Learning</strong>
                <p>ID3, k-Nearest Neighbors (k-NN), Naïve Bayes</p>
            </div>
        </div>
        <Callout type="info">
            <strong>Planning</strong> merupakan salah satu pilar AI, namun tidak dibahas dalam kurikulum mata kuliah ini.
        </Callout>
    </NoteSection>

    <NoteSection title="Sejarah Singkat AI (Evolusi & AI Winter)">
        <div class="timeline">
            <div class="timeline-item">
                <span class="year">1951</span>
                <strong>Awal Mula</strong>
                <p>UNIVAC I: Komputer digital pertama untuk bisnis, berhasil memprediksi pemilu AS 1952.</p>
            </div>
            <div class="timeline-item">
                <span class="year">1952 - 1969</span>
                <strong>Early Development</strong>
                <p>General Problem Solver (Newell & Simon), LISP (McCarthy), Mark I Perceptron (Rosenblatt), dan ELIZA chatbot.</p>
            </div>
            <div class="timeline-item winter">
                <span class="year">1966 - 1974</span>
                <strong>1st AI Winter</strong>
                <p>Keterbatasan struktur dasar dan kegagalan pada masalah kompleks menyebabkan penghentian pendanaan besar-besaran.</p>
            </div>
            <div class="timeline-item">
                <span class="year">1969 - 1979</span>
                <strong>Knowledge-based Systems</strong>
                <p>Era dominasi sistem berbasis pengetahuan dan logika formal sebelum akhirnya melambat kembali.</p>
            </div>
            <div class="timeline-item">
                <span class="year">1980 - 1988</span>
                <strong>Era Industri & Expert Systems</strong>
                <p>AI mulai masuk ke industri (robot pabrik, sistem pakar). Kembalinya Jaringan Syaraf Tiruan lewat Back-Propagation (1986).</p>
            </div>
            <div class="timeline-item winter">
                <span class="year">1990-an</span>
                <strong>2nd AI Winter & Era Ekstraksi Fitur</strong>
                <p>Keterbatasan data dan daya komputasi. Fokus bergeser ke teknik ekstraksi fitur manual sebelum revolusi Deep Learning.</p>
            </div>
            <div class="timeline-item highlight">
                <span class="year">2006 - Sekarang</span>
                <strong>Revolusi Deep Learning & AI Boom</strong>
                <p>Geoff Hinton mengoptimalkan Deep Learning (2006). IBM Watson menang Jeopardy (2011), AlphaGo (2016), OpenAI Dota 2 (2017-2019), hingga maraknya AI Art & Generative AI.</p>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Aplikasi AI Modern">
        <div class="app-grid">
            <div class="app-category">
                <h4>Visi & Persepsi</h4>
                <ul>
                    <li>Visual Recognition</li>
                    <li>Face & Fingerprint Detection</li>
                    <li>Image Captioning</li>
                </ul>
            </div>
            <div class="app-category">
                <h4>Bahasa & Teks</h4>
                <ul>
                    <li>Speech Recognition</li>
                    <li>Text Summarization</li>
                    <li>Real-time Translation</li>
                </ul>
            </div>
            <div class="app-category">
                <h4>Otomatisasi</h4>
                <ul>
                    <li>Self-driving Cars</li>
                    <li>Navigation Systems</li>
                    <li>Smart Home Systems</li>
                </ul>
            </div>
            <div class="app-category">
                <h4>Kreativitas & Game</h4>
                <ul>
                    <li>Game NPC AI</li>
                    <li>AI Art (GAN, Deep Dream)</li>
                    <li>Music Composition (AIVA)</li>
                </ul>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Masa Depan AI">
        <div class="future-box">
            <p>"AI is the new electricity."</p>
            <div class="analogy-grid">
                <div class="analogy-item">
                    <span>Data</span>
                    <strong>The New Oil</strong>
                </div>
                <div class="analogy-item">
                    <span>Machine Learning</span>
                    <strong>The Combustion Engine</strong>
                </div>
                <div class="analogy-item">
                    <span>Computing</span>
                    <strong>Becoming Free</strong>
                </div>
            </div>
        </div>
    </NoteSection>

    <NoteSection title="Referensi Utama">
        <div class="ref-list">
            <p>• Suyanto. 2007. <em>Introduction to Artificial Intelligence: Searching, Reasoning, Planning and Learning</em>.</p>
            <p>• Russel, Stuart and Norvig, Peter. 1995. <em>Artificial Intelligence: A Modern Approach</em>.</p>
            <p>• Suyanto. 2018. <em>Machine Learning: Tingkat Dasar dan Lanjut</em>.</p>
        </div>
    </NoteSection>

    <NoteSection title="Uji Pemahaman">
        <Quiz 
            title="Kuis Dasar AI"
            questions={[
                {
                    question: "Sebuah chatbot yang dirancang untuk memberikan jawaban yang secara logis benar dan optimal dalam setiap situasi, tanpa harus meniru cara manusia berpikir, masuk ke dalam kategori...",
                    options: ["Thinking Humanly", "Thinking Rationally", "Acting Humanly", "Acting Rationally"],
                    correctIndex: 3,
                    explanation: "Fokus pada pencapaian hasil terbaik (optimal) adalah ciri dari 'Acting Rationally' atau pendekatan Rational Agent."
                },
                {
                    question: "Manakah dari komponen berikut yang merupakan syarat mutlak agar sebuah mesin dapat lolos Turing Test standar (bukan Total Turing Test)?",
                    options: ["Computer Vision", "Robotics", "Automated Reasoning", "Speech Synthesis"],
                    correctIndex: 2,
                    explanation: "Automated Reasoning diperlukan untuk menggunakan informasi yang disimpan guna menjawab pertanyaan dan menarik kesimpulan dalam percakapan."
                },
                {
                    question: "Apa penyebab utama terjadinya AI Winter pertama pada periode 1966-1974?",
                    options: ["Munculnya masalah 'vanishing gradient'", "Kurangnya ketersediaan Big Data", "Keterbatasan daya komputasi dan kegagalan pada masalah kompleks", "Ditemukannya algoritma Back-propagation yang rumit"],
                    correctIndex: 2,
                    explanation: "AI Winter pertama dipicu oleh keterbatasan struktur dasar dan kegagalan program AI saat menghadapi masalah dunia nyata yang kompleks."
                },
                {
                    question: "Jika Anda membangun sistem rekomendasi film berdasarkan pola perilaku pengguna, teknik AI manakah yang paling relevan digunakan?",
                    options: ["Searching", "Reasoning", "Learning", "Planning"],
                    correctIndex: 2,
                    explanation: "Sistem rekomendasi membutuhkan kemampuan untuk mengenali pola dari data masa lalu, yang merupakan domain utama dari Machine Learning."
                },
                {
                    question: "Mengapa tahun 2006 dianggap sebagai titik balik kembalinya Neural Networks setelah era 'AI Winter' kedua?",
                    options: ["Kemenangan IBM Watson di Jeopardy", "Optimasi Deep Learning oleh Geoff Hinton", "Keberhasilan AlphaGo mengalahkan Lee Sedol", "Munculnya internet berkecepatan tinggi"],
                    correctIndex: 1,
                    explanation: "Geoff Hinton memperkenalkan metode optimasi lapis-demi-lapis yang memicu revolusi Deep Learning modern."
                },
                {
                    question: "Pendekatan AI yang mencoba meniru proses kognitif manusia melalui eksperimen psikologis atau introspeksi disebut...",
                    options: ["Thinking Humanly", "Thinking Rationally", "Acting Humanly", "Acting Rationally"],
                    correctIndex: 0,
                    explanation: "Thinking Humanly berfokus pada pemodelan kognitif dan bagaimana manusia sebenarnya berpikir di dalam otak."
                },
                {
                    question: "Apa hambatan utama dalam pendekatan 'Thinking Rationally' (Hukum Logika) saat diterapkan pada dunia nyata?",
                    options: ["Komputer tidak bisa menjalankan logika", "Sulit menyatakan pengetahuan informal dalam notasi logika formal", "Logika tidak bisa digunakan untuk matematika", "Membutuhkan sensor fisik"],
                    correctIndex: 1,
                    explanation: "Banyak pengetahuan dunia nyata bersifat tidak pasti atau sulit diformalkan ke dalam simbol logika yang kaku."
                },
                {
                    question: "Dalam variasi 'Total Turing Test', mesin harus memiliki dua kemampuan fisik tambahan yaitu...",
                    options: ["Audio & Video", "Computer Vision & Robotics", "Database & Server", "Touchscreen & Sensor"],
                    correctIndex: 1,
                    explanation: "Total Turing Test mencakup interaksi fisik dengan dunia, sehingga membutuhkan penglihatan komputer dan penggerak robotik."
                },
                {
                    question: "Istilah 'Artificial Intelligence' pertama kali diperkenalkan secara resmi pada konferensi di tahun 1956. Siapa tokoh utamanya?",
                    options: ["Alan Turing", "John McCarthy", "Geoff Hinton", "Elon Musk"],
                    correctIndex: 1,
                    explanation: "John McCarthy mengusulkan istilah tersebut pada Konferensi Dartmouth tahun 1956 yang menjadi titik lahirnya AI sebagai bidang ilmu."
                },
                {
                    question: "Teknik AI yang digunakan untuk menemukan urutan aksi terbaik guna mencapai target (misal jalur terpendek di peta) adalah...",
                    options: ["Searching", "Reasoning", "Learning", "Perception"],
                    correctIndex: 0,
                    explanation: "Searching adalah teknik fundamental untuk mencari solusi melalui eksplorasi ruang keadaan (state space)."
                },
                {
                    question: "Program ELIZA (1966) sering disebut sebagai chatbot pertama. Teknik apa yang sebenarnya ia gunakan?",
                    options: ["Deep Learning", "Pattern Matching (Pencocokan Pola)", "Neural Networks", "Reinforcement Learning"],
                    correctIndex: 1,
                    explanation: "ELIZA tidak memiliki 'pemahaman'. Ia hanya mencocokkan kata kunci dari input pengguna untuk memberikan jawaban template."
                },
                {
                    question: "Apa yang dimaksud dengan 'AI Winter' dalam sejarah perkembangan kecerdasan buatan?",
                    options: ["Musim dingin di laboratorium AI", "Periode di mana dana dan minat terhadap riset AI menurun drastis", "Penemuan komputer super cepat", "Penggunaan AI untuk memprediksi cuaca"],
                    correctIndex: 1,
                    explanation: "AI Winter terjadi ketika janji-janji AI tidak terpenuhi, sehingga investor dan pemerintah menarik dukungan dana mereka."
                },
                {
                    question: "Bahasa pemrograman LISP dikembangkan oleh John McCarthy (1958) karena sangat cocok untuk AI. Apa kelebihannya?",
                    options: ["Sangat cepat untuk grafis", "Kemampuan manipulasi simbolik yang kuat", "Bisa berjalan di smartphone", "Otomatis memperbaiki hardware"],
                    correctIndex: 1,
                    explanation: "LISP dirancang untuk pemrosesan simbolik yang merupakan inti dari AI klasik (Good Old Fashioned AI)."
                },
                {
                    question: "Pilar AI manakah yang disebutkan dalam referensi materi sebagai bagian yang TIDAK dibahas secara mendalam dalam kuliah ini?",
                    options: ["Searching", "Reasoning", "Learning", "Planning"],
                    correctIndex: 3,
                    explanation: "Berdasarkan agenda kuliah, pilar 'Planning' (perencanaan) tidak masuk dalam cakupan pembahasan kurikulum ini."
                },
                {
                    question: "Apa maksud dari pernyataan Andrew Ng bahwa 'AI is the new electricity'?",
                    options: ["AI membutuhkan banyak listrik", "AI akan mentransformasi setiap industri seperti halnya listrik di masa lalu", "AI hanya bisa menyala jika ada listrik", "AI adalah pengganti PLN"],
                    correctIndex: 1,
                    explanation: "Maksudnya adalah AI akan menjadi teknologi dasar yang mengubah cara kerja hampir semua sektor industri di masa depan."
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
    .section-intro {
        margin-bottom: 1.5rem;
        color: var(--color-ink-soft);
    }

    .overview-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }
    .overview-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--color-line);
    }
    .overview-card.highlight {
        border-color: var(--color-binder);
        background: rgba(var(--color-binder-rgb), 0.05);
    }
    .overview-card h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: var(--color-binder);
    }
    .overview-card ul, .overview-card ol {
        margin: 0;
        padding-left: 1.25rem;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .def-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.25rem;
        margin: 1.5rem 0;
    }
    .def-card {
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border-radius: 20px;
        border: 1px solid var(--color-line);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        position: relative;
        overflow: hidden;
    }
    .def-card:hover {
        transform: translateY(-5px);
        border-color: var(--color-binder);
        box-shadow: 0 10px 30px -10px rgba(var(--color-binder-rgb), 0.2);
    }
    .card-icon {
        color: var(--color-binder);
        margin-bottom: 0.25rem;
    }
    .def-card h3 {
        font-size: 1.05rem;
        font-weight: 700;
        margin: 0;
        color: var(--color-binder);
    }
    .def-card p {
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0;
        color: var(--color-ink-soft);
    }
    .focus-tag {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-binder);
        opacity: 0.8;
        margin-top: auto;
    }

    .turing-detail {
        font-size: 0.75rem;
        line-height: 1.4;
        background: rgba(var(--color-binder-rgb), 0.08);
        padding: 0.75rem;
        border-radius: 8px;
        color: var(--color-ink-soft);
        border-left: 3px solid var(--color-binder);
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin: 1.5rem 0;
    }
    .tech-item {
        background: var(--color-surface-elevated);
        padding: 1rem;
        border-radius: 12px;
        border-left: 4px solid var(--color-binder);
    }
    .tech-item strong {
        display: block;
        margin-bottom: 0.25rem;
    }
    .tech-item p {
        font-size: 0.85rem;
        margin: 0;
        color: var(--color-ink-soft);
    }

    .timeline {
        border-left: 2px solid var(--color-line);
        padding-left: 2rem;
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .timeline-item {
        position: relative;
    }
    .timeline-item::before {
        content: "";
        position: absolute;
        left: -2.45rem;
        top: 0.5rem;
        width: 14px;
        height: 14px;
        background: var(--color-surface);
        border: 2px solid var(--color-binder);
        border-radius: 50%;
        z-index: 1;
    }
    .timeline-item.winter::before {
        border-color: #3b82f6;
    }
    .timeline-item.winter strong {
        color: #3b82f6;
    }
    .year {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        background: var(--color-line);
        padding: 2px 8px;
        border-radius: 10px;
        margin-bottom: 0.5rem;
    }
    .timeline-item strong {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    .timeline-item p {
        font-size: 0.9rem;
        line-height: 1.6;
        color: var(--color-ink-soft);
        margin: 0;
    }

    .app-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin: 1.5rem 0;
    }
    .app-category h4 {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-binder);
        margin-bottom: 0.75rem;
        border-bottom: 1px solid var(--color-line);
        padding-bottom: 0.5rem;
    }
    .app-category ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .app-category li {
        font-size: 0.9rem;
        color: var(--color-ink-soft);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .app-category li::before {
        content: "•";
        color: var(--color-binder);
    }

    .future-box {
        background: linear-gradient(135deg, var(--color-binder), #6366f1);
        color: white;
        padding: 2.5rem;
        border-radius: 24px;
        text-align: center;
        margin: 1.5rem 0;
    }
    .future-box p {
        font-size: 1.8rem;
        font-weight: 800;
        font-style: italic;
        margin-bottom: 2rem;
    }
    .analogy-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    .analogy-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.25rem;
        border-radius: 16px;
        backdrop-filter: blur(10px);
    }
    .analogy-item span {
        display: block;
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 0.25rem;
    }
    .analogy-item strong {
        font-size: 1rem;
    }

    .ref-list {
        font-size: 0.9rem;
        color: var(--color-ink-soft);
        line-height: 1.6;
    }
    .ref-list p {
        margin-bottom: 0.5rem;
    }

    .turing-section {
        background: var(--color-surface-soft);
        padding: 2rem;
        border-radius: 20px;
        border: 1px solid var(--color-line);
    }
    .turing-header {
        margin-bottom: 1.5rem;
    }
    .turing-badge {
        display: inline-block;
        background: var(--color-binder);
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 20px;
        margin-bottom: 1rem;
    }
    .turing-header p {
        font-size: 1.1rem;
        font-style: italic;
        color: var(--color-ink-soft);
        line-height: 1.5;
    }
    .turing-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .turing-box {
        background: var(--color-surface);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid var(--color-line);
    }
    .turing-box h4 {
        margin-bottom: 0.75rem;
        color: var(--color-binder);
    }
    .turing-box p {
        font-size: 0.9rem;
        line-height: 1.6;
    }
    .req-list {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
    }
    .req-list li {
        font-size: 0.85rem;
        background: rgba(var(--color-binder-rgb), 0.1);
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        border-left: 3px solid var(--color-binder);
    }
    .turing-footer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: var(--color-ink-soft);
        text-align: center;
        border-top: 1px solid var(--color-line);
        padding-top: 1rem;
    }

    @media (max-width: 768px) {
        .overview-grid, .tech-grid, .analogy-grid, .turing-grid, .req-list {
            grid-template-columns: 1fr;
        }
    }
</style>
